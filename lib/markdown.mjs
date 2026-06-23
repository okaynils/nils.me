import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const defaultImageRenderer =
  markdown.renderer.rules.image ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const src = token.attrGet("src");
  const alt = token.content || token.attrGet("alt") || "";
  const title = token.attrGet("title");

  if (!src) {
    return defaultImageRenderer(tokens, idx, options, env, self);
  }

  const escapedSrc = markdown.utils.escapeHtml(src);
  const escapedAlt = markdown.utils.escapeHtml(alt);
  const titleAttr = title
    ? ` title="${markdown.utils.escapeHtml(title)}"`
    : "";
  const caption = alt
    ? `<figcaption>${escapedAlt}</figcaption>`
    : "";

  return `<figure class="highlight"><img src="${escapedSrc}" alt="${escapedAlt}"${titleAttr}>${caption}</figure>`;
};

export function renderMarkdown(content = "") {
  return markdown
    .render(content)
    .replaceAll("<p><figure", "<figure")
    .replaceAll("</figure></p>", "</figure>");
}
