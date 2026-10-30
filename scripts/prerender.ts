// Renders every page to static HTML after `vite build`, so GitHub Pages can
// serve the site as plain files and the first paint needs no JavaScript.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const site = "https://nils.me";
const dist = join(import.meta.dir, "../dist");
const server = join(import.meta.dir, "../dist-server");

const { render, paths, notes } = await import(join(server, "entry-server.js"));
const template = await readFile(join(dist, "index.html"), "utf8");

for (const path of paths as string[]) {
  const page = await render(path);
  const head = [
    `<title>${escape(page.title)}</title>`,
    page.description ? `<meta name="description" content="${escape(page.description)}" />` : "",
    page.noindex ? `<meta name="robots" content="noindex, nofollow" />` : "",
  ].filter(Boolean).join("\n    ");
  const html = template.replace("<!--head-->", head).replace("<!--app-->", page.html);
  await write(path === "/" ? "index.html" : `${path.slice(1)}.html`, html);
}

// Pages that existed before the redesign, so old links land somewhere useful.
const moved: Record<string, string> = {
  "projects.html": "/",
  "notes/index.html": "/#writing",
};
for (const [file, to] of Object.entries(moved)) {
  await write(file, `<!doctype html><meta charset="utf-8"><title>Moved</title><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${site}${to}"><a href="${to}">This page moved.</a>\n`);
}

const items = (notes as { slug: string; title: string; date: string }[]).map((note) => {
  const url = `${site}/notes/${note.slug}`;
  return `    <item>
      <title>${escape(note.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${note.date}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
});
await write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nils Fahrni's notes</title>
    <link>${site}/</link>
    <description>Sparsely researched ideas and thoughts.</description>
    <language>en</language>
    <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`);

await write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc></url>
  <url><loc>${site}/about</loc></url>
</urlset>
`);

await rm(server, { recursive: true });
console.log(`Prerendered ${paths.length} pages.`);

async function write(file: string, contents: string) {
  const target = join(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
