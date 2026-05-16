import Link from "next/link";
import clsx from "clsx";

export default function WorkList({ allPosts, activeSlug }) {
  return (
    <div className="w-full">
      <section>
        <h1 className="mb-2 text-2xl">
          Side projects
        </h1>
        <ul className="space-y-2">
          {allPosts?.map((post) => (
            <li
              key={post.slug}
              className={clsx(activeSlug == post.slug && "font-bold")}
            >
              <Link href={`/projects/${post.slug}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
