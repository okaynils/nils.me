import Link from "next/link";
import clsx from "clsx";

export default function BlogList({ data, activeSlug }) {
  const sortedData = data?.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    return new Date(b.dateRaw ?? b.date) - new Date(a.dateRaw ?? a.date);
  });

  return (
    <div
      className={clsx(
        "w-full text-sm",
        activeSlug != undefined && "hidden lg:flex flex-col"
      )}
    >
      <ol className="space-y-1">
        {sortedData?.map((post) => (
          <li
            key={post.slug}
            className={clsx(
              "grid gap-x-4 md:grid-cols-[1fr_auto]",
              activeSlug === post.slug && "font-bold"
            )}
          >
            <Link href={`/notes/${post.slug}`}>
              {post.pinned ? "[pinned] " : ""}
              {post?.title}
            </Link>
            <span className="plain-meta md:text-right">
              {post?.evergreen ? (
                `updated ${post?.date instanceof Date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : post?.date
                }`
              ) : (
                post?.date instanceof Date
                  ? new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : post?.date
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
