import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const notesDirectory = join(process.cwd(), "data/notes");
const projectsDirectory = join(process.cwd(), "data/projects");

export function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

export function formatDate(value) {
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

function getMarkdownFiles(directory) {
  return fs.readdirSync(directory).filter((file) => file.endsWith(".md"));
}

function getItemBySlug(directory, slug, fields = [], { includeReadTime } = {}) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(directory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const parsedDate = parseDate(data.date);
  const item = {};

  fields.forEach((field) => {
    if (field === "slug") {
      item[field] = realSlug;
      return;
    }

    if (field === "content") {
      item[field] = content;
      return;
    }

    if (field === "date") {
      item[field] = formatDate(data[field]);
      return;
    }

    if (field === "dateRaw" && parsedDate) {
      item[field] = parsedDate.toISOString();
      return;
    }

    if (typeof data[field] !== "undefined") {
      item[field] = data[field];
    }
  });

  if (includeReadTime) {
    item.readtime = Math.ceil(content.split(/\s+/).filter(Boolean).length / 265);
  }

  return item;
}

export function getPostSlugs() {
  return getMarkdownFiles(notesDirectory);
}

export function getPostBySlug(slug, fields = []) {
  return getItemBySlug(notesDirectory, slug, fields, { includeReadTime: true });
}

export function getAllPosts(fields = []) {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    .sort((left, right) => {
      const leftDate = parseDate(left.dateRaw ?? left.date);
      const rightDate = parseDate(right.dateRaw ?? right.date);

      return rightDate - leftDate;
    });
}

export function getProjectSlugs() {
  return getMarkdownFiles(projectsDirectory);
}

export function getProjectBySlug(slug, fields = []) {
  return getItemBySlug(projectsDirectory, slug, fields);
}

export function getAllProjects(fields = []) {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug, fields))
    .sort((left, right) => (left.date > right.date ? -1 : 1));
}
