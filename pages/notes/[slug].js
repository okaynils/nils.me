import { getPostBySlug, getAllPosts } from "lib/content.mjs";
import { renderMarkdown } from "lib/markdown.mjs";
import { BlogList, PostContent } from "components";
import { ContentWrapper } from "ui";

export default function Post({ allPosts, post }) {
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <div className="w-full">
      <ContentWrapper width="720px">
        <PostContent post={post} />
        {otherPosts.length > 0 && (
          <section className="old-box mt-3">
            <h2 className="old-box-title">
              More notes
            </h2>
            <div className="old-box-body">
              <BlogList data={otherPosts.slice(0, 5)} />
            </div>
          </section>
        )}
      </ContentWrapper>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const allPosts = getAllPosts([
    "title",
    "date",
    "dateRaw",
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
    "dateRaw",
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
      post: {
        ...post,
        content: renderMarkdown(post.content),
      },
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
