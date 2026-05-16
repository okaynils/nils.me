import Head from "next/head";

export default function PostContent({ post }) {
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div
        key={post.title}
        className="w-full"
      >
        <article className="old-box">
          <h1 className="old-box-title page-title flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <span>{post.title}</span>
            <span className="wiki-small font-normal">
              {post.readtime} min read
            </span>
          </h1>
          <div className="old-box-body">
            {post?.link && post?.image ? (
              <div className="mx-auto mb-4 max-w-[640px]">
                <img src={post.image} className="border border-gray-400" alt={post.title} />
              </div>
            ) : null}
            <div className="plain-meta mb-4">
              {post?.evergreen ? "Last updated: " : ""}
              {post?.date}
            </div>
            <div
              className="post-content mb-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {post?.link ? (
              <p>
                [
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  visit link
                </a>
                ]
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}
