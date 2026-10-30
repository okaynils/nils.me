import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { resolve } from "./site";
import { App } from "./app";
import "./styles.css";

const root = document.getElementById("root")!;
const page = await resolve(location.pathname);

if (!page) {
  // Only reachable in dev, where every path falls back to index.html.
  root.textContent = "Not found.";
} else if (import.meta.env.DEV) {
  document.title = page.title;
  createRoot(root).render(<StrictMode><App>{page.element}</App></StrictMode>);
} else {
  hydrateRoot(root, <StrictMode><App>{page.element}</App></StrictMode>);
}
