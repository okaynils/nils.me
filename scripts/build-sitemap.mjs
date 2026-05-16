import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

async function generate() {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const pages = await globby([
    "pages/**/*.js",
    "data/notes/*.md",
    "data/projects/*.md",
    "!pages/_*.js",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .filter((page) => !page.includes("["))
          .map((page) => {
            const path = page
              .replace("pages", "")
              .replace("data", "")
              .replace(".js", "")
              .replace(".md", "");
            const route = path.replace(/\/index$/, "") || "";
            const encodedRoute = route
              .split("/")
              .map((segment) => encodeURIComponent(segment))
              .join("/");

            return `
              <url>
                  <loc>${`https://nils.me${encodedRoute}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
    printWidth: 1000,
  });

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", formatted);
}

generate();
