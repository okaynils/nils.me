import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const SITE_URL = "https://nils.me";
const notesDirectory = join(process.cwd(), "data/notes");
const outputPath = join(process.cwd(), "public/feed.xml");
const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function parseDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

function escapeXml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapCdata(value = "") {
  return `<![CDATA[${String(value).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function toAbsoluteUrls(html = "") {
  return html.replace(/(href|src)="\/(.*?)"/g, (_, attr, path) => {
    return `${attr}="${SITE_URL}/${path}"`;
  });
}

function getPosts() {
  return fs.readdirSync(notesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(join(notesDirectory, file), "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title,
        excerpt: data.excerpt ?? "",
        slug,
        date: parseDate(data.date),
        contentHtml: toAbsoluteUrls(markdown.render(content)),
      };
    })
    .sort((left, right) => right.date - left.date);
}

function buildFeed(posts) {
  const items = posts.map((post) => {
    const url = `${SITE_URL}/notes/${encodeURIComponent(post.slug)}`;

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${wrapCdata(post.excerpt)}</description>
      <content:encoded>${wrapCdata(post.contentHtml)}</content:encoded>
    </item>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nils Fahrni Notes</title>
    <link>${SITE_URL}/notes</link>
    <description>A home for sparsely researched ideas and thoughts.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

const feed = buildFeed(getPosts());

fs.writeFileSync(outputPath, feed);
