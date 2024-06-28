import { ExternalLinkIcon } from "lib/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';

export default function PostContent({ post }) {
  return (
    <div
      key={post.title}
      className="inline-flex flex-col items-center justify-start w-full"
    >
      {post?.link && post?.image ? (
        <div className="max-w-[620px] mx-auto">
          <img src={post.image} className="mb-4 rounded-lg" alt={post.title} />
        </div>
      ) : null}
      <div className="text-center text-gray-400 dark:text-gray-400 text-sm">
        {new Date(post?.date.slice(0, 10)).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <h1 className="post-title text-4xl font-black md:text-4xl text-center max-w-[620px] mx-auto dark:text-white">
        {post.title}
      </h1>
      <div className="text-center mb-10 text-gray-400 dark:text-gray-400 text-sm">
        {post.readtime} min read
      </div>
      <div className="inline-block mx-auto post-content max-w-[620px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      {post?.link ? (
        <a
          href={post?.link}
          target="_blank"
          className="w-full py-1 bg-black rounded-lg shadow-lg max-w-[620px] text-white text-lg text-center flex items-center justify-center dark:bg-white dark:text-black"
          rel="noopener noreferrer"
        >
          <span className="w-5 h-5 mr-2">{ExternalLinkIcon}</span>
          <span>Visit Link</span>
        </a>
      ) : null}
    </div>
  );
}
