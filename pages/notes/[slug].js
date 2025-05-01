import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "pages/api/notes";
import { BlogList, PostContent } from "components";
import { ContentWrapper } from "ui";

export default function Post({ allPosts, post }) {
  const router = useRouter();

  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

  if (!router.isFallback && !post?.slug) {
    return <div>Error</div>;
  }

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <div className="flex w-full md:pt-5">
      <ContentWrapper width="500px">
        <PostContent post={post} />
        {otherPosts.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800">
            <h2 className="mb-2 mt-10 text-xl font-medium text-black dark:text-white">
              More notes
            </h2>
          </div>
        )}
        <BlogList data={otherPosts.slice(0, 10)} />
      </ContentWrapper>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
    "link",
    "ogImage",
  ]);

  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "evergreen",
    "slug",
    "image",
    "content",
    "excerpt",
    "link",
    "ogImage",
  ]);

  return {
    props: {
      allPosts,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
