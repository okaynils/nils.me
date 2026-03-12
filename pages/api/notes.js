import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "data/notes");

function parseDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

function formatDate(value) {
  const date = parseDate(value);

  if (!date || Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const items = {};
  const parsedDate = parseDate(data.date);

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
    if (field === "date") {
      items[field] = formatDate(data[field]);
    }
    if (field === "dateRaw" && parsedDate) {
      items[field] = parsedDate.toISOString();
    }
  });

  items["readtime"] = Math.ceil(content.split(" ").length / 265);

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => {
      const left = parseDate(post1.dateRaw ?? post1.date);
      const right = parseDate(post2.dateRaw ?? post2.date);

      return right - left;
    });

  return posts;
}
