import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { resolve, paths } from "./site";
import { notes } from "./notes";
import { App } from "./app";

export { paths, notes };

export async function render(pathname: string) {
  const page = await resolve(pathname);
  if (!page) throw new Error(`No page for ${pathname}`);
  const html = renderToString(<StrictMode><App>{page.element}</App></StrictMode>);
  return { ...page, html };
}
