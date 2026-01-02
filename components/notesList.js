import Link from "next/link";
import clsx from "clsx";
import { PushPin } from "@phosphor-icons/react";

export default function BlogList({ data, activeSlug }) {
  const sortedData = data?.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div
      className={clsx(
        "w-full text-sm",
        activeSlug != undefined && "hidden lg:flex flex-col"
      )}
    >
      <div className="last:!border-b-0">
        {sortedData?.map((post) => (
          <div key={post.slug} className="">
            <Link href={`/notes/${post.slug}`}>
              <article
                className={clsx(
                  "flex border-dashed font-medium w-full py-3 md:py-[8px] border-b border-gray-200 flex-col md:flex-row hover:border-gray-400",
                  activeSlug == post.slug ? "text-black" : "text-gray-800"
                )}
              >
                <p
                  className={clsx(
                    "inline-flex items-center",
                    activeSlug === post.slug
                      ? "text-black"
                      : "text-gray-600"
                  )}
                >
                  {post.pinned && (
                    <span className="mr-1 flex items-center">
                      <PushPin size={12} />
                    </span>
                  )}
                  <span>{post?.title}</span>
                </p>
                <div
                  className={clsx(
                    "md:pl-2 md:ml-auto font-normal opacity-60"
                  )}
                >
                  {post?.evergreen ? (
                    `Last updated: ${post?.date instanceof Date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : post?.date
                    }`
                  ) : (
                    post?.date instanceof Date
                      ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : post?.date
                  )}
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
