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

export default defineConfig({
  plugins: [notes(), react(), tailwindcss()],
  // @nils/ui is installed from a local checkout that has its own dev copy of
  // React; two Reacts in one bundle break every hook.
  resolve: { dedupe: ["react", "react-dom"] },
});
