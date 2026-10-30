import type { ReactElement } from "react";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { NotePage } from "./pages/note";
import { notes, loadNoteHtml } from "./notes";

export interface Page {
  title: string;
  description?: string;
  /** Notes stay out of search engines, as they always have. */
  noindex?: boolean;
  element: ReactElement;
}

/** Every path that gets a prerendered HTML file. */
export const paths = ["/", "/about", ...notes.map((note) => `/notes/${note.slug}`)];

// GitHub Pages serves /about from about.html, and old links still say
// about.html, so both spellings resolve to the same page.
function normalise(pathname: string) {
  const path = pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1");
  return path || "/";
}

export async function resolve(pathname: string): Promise<Page | undefined> {
  const path = normalise(pathname);

  if (path === "/") {
    return {
      title: "nils fahrni",
      description: "nils fahrni: statistics, machine learning, computer vision, notes and music.",
      element: <Home />,
    };
  }

  if (path === "/about") {
    return {
      title: "about · nils fahrni",
      description: "cornerstones, things i like, and where else to find me.",
      element: <About />,
    };
  }

  const slug = /^\/notes\/([^/]+)$/.exec(path)?.[1];
  const index = notes.findIndex((note) => note.slug === slug);
  if (slug && index >= 0) {
    const html = (await loadNoteHtml(slug))!;
    const note = notes[index];
    return {
      title: `${note.title} · nils fahrni`,
      noindex: true,
      element: <NotePage note={note} html={html} newer={notes[index - 1]} older={notes[index + 1]} />,
    };
  }

  return undefined;
}
