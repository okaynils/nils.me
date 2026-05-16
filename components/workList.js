import Link from "next/link";
import clsx from "clsx";

export default function WorkList({ allPosts, activeSlug }) {
  return (
    <div className="w-full">
      <section className="old-box">
        <h1 className="old-box-title">
          side projects
        </h1>
        <div className="old-box-body p-0">
          <table className="link-table">
            <tbody>
              {allPosts?.map((post) => (
                <tr
                  key={post.slug}
                  className={clsx(activeSlug == post.slug && "font-bold")}
                >
                  <th>project</th>
                  <td>
                    <Link href={`/projects/${post.slug}`}>
                      {post.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
