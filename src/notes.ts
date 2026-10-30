import type { NoteMeta } from "../scripts/markdown";

export type Note = NoteMeta & { slug: string };

// Only `meta` is imported here, so the home page doesn't ship every note's body.
const metas = import.meta.glob<Note>("../content/notes/*.md", { eager: true, import: "meta" });
const bodies = import.meta.glob<string>("../content/notes/*.md", { import: "html" });

/** Every note, newest first. */
export const notes: Note[] = Object.values(metas).sort((a, b) => b.date.localeCompare(a.date));

export function loadNoteHtml(slug: string): Promise<string> | undefined {
  return bodies[`../content/notes/${slug}.md`]?.();
}
