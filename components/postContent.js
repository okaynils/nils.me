import Head from "next/head";
import { ArrowSquareOut } from "@phosphor-icons/react";

export default function PostContent({ post }) {
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
      <div
        key={post.title}
        className="inline-flex flex-col items-center justify-start w-full"
      >
        {post?.link && post?.image ? (
          <div className="max-w-[440px] mx-auto">
            <img src={post.image} className="mb-4 rounded-lg" alt={post.title} />
          </div>
        ) : null}
        <div className="text-center text-gray-400 text-sm">
          {post?.evergreen ? "Last updated: " : ""}
          {post?.date}
        </div>
        <h1 className="text-4xl font-black md:text-4xl text-center max-w-[620px] mx-auto">
          {post.title}
        </h1>
        <div className="text-center mb-10 text-gray-400 text-sm">
          {post.readtime} min read
        </div>
        <div
          className="inline-block mx-auto post-content max-w-[620px] mb-10 leading-[1.4]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post?.link ? (
          <a
            href={post.link}
            target="_blank"
            className="w-full py-1 bg-black rounded-lg shadow-lg max-w-[620px] text-white text-lg text-center flex items-center justify-center"
            rel="noopener noreferrer"
          >
            <ArrowSquareOut className="w-5 h-5 mr-2" />
            <span>Visit Link</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
