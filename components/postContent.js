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
        {post?.link && post?.image ? (
          <div className="mx-auto mb-4 max-w-[640px]">
            <img src={post.image} className="border border-gray-400" alt={post.title} />
          </div>
        ) : null}
        <div className="plain-meta">
          {post?.evergreen ? "Last updated: " : ""}
          {post?.date}
        </div>
        <h1 className="mx-auto mb-1 max-w-[640px] text-3xl">
          {post.title}
        </h1>
        <div className="plain-meta mb-8">
          {post.readtime} min read
        </div>
        <div
          className="post-content mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post?.link ? (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit link
          </a>
        ) : null}
      </div>
    </div>
  );
}
