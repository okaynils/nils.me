import { execSync } from "node:child_process";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { renderNote } from "./scripts/markdown";

// Notes are markdown with a small frontmatter block. They compile to two
// exports so the home page can import every note's `meta` without pulling in
// every note's `html`.
function notes(): Plugin {
  return {
    name: "notes",
    enforce: "pre",
    transform(source, id) {
      if (!id.endsWith(".md")) return;
      const slug = id.split("/").pop()!.replace(/\.md$/, "");
      const { meta, html } = renderNote(source);
      return {
        code: `export const meta = ${JSON.stringify({ ...meta, slug })};\nexport const html = ${JSON.stringify(html)};`,
        map: null,
      };
    },
  };
}

function git(args: string) {
  try {
    return execSync(`git ${args}`, { encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

// What's running, for the footer's deploy stamp. The client and server builds
// are separate processes, so scripts/build.ts hands both the same DEPLOYED_AT
// and the prerendered stamp matches the hydrated one.
const deploy = {
  deployedAt: process.env.DEPLOYED_AT ?? new Date().toISOString(),
  commit: process.env.GITHUB_SHA ?? git("rev-parse HEAD"),
  branch: process.env.GITHUB_REF_NAME ?? git("branch --show-current"),
};

export default defineConfig({
  plugins: [notes(), react(), tailwindcss()],
  define: { __DEPLOY__: JSON.stringify(deploy) },
  // @nils/ui is installed from a local checkout that has its own dev copy of
  // React; two Reacts in one bundle break every hook.
  resolve: { dedupe: ["react", "react-dom"] },
});
