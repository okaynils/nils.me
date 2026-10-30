import { Marked } from "marked";

export interface NoteMeta {
  title: string;
  date: string;
  description?: string;
}

const marked = new Marked({
  gfm: true,
  renderer: {
    // A paragraph that is only an image is a figure; its alt text names the
    // painting, so it doubles as the caption.
    paragraph(token) {
      const [only] = token.tokens;
      if (token.tokens.length === 1 && only?.type === "image") {
        const alt = escape(only.text);
        return `<figure><img src="${only.href}" alt="${alt}" loading="lazy" decoding="async" /><figcaption>${alt}</figcaption></figure>\n`;
      }
      return false;
    },
  },
});

export function renderNote(source: string): { meta: NoteMeta; html: string } {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(source);
  if (!match) throw new Error("Note is missing its frontmatter block.");

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(":");
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  if (!meta.title || !meta.date) throw new Error("Note frontmatter needs a title and a date.");

  const html = marked.parse(source.slice(match[0].length), { async: false });
  return { meta: meta as unknown as NoteMeta, html };
}

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
