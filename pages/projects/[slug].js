import { WorkContent } from "components";
import { getAllProjects, getProjectBySlug } from "lib/content.mjs";
import { renderMarkdown } from "lib/markdown.mjs";
import { ContentWrapper } from "ui";

export default function Post({ post }) {
  return (
    <div className="w-full">
      <ContentWrapper width="640px">
        <WorkContent post={post} />
      </ContentWrapper>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getProjectBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "image",
    "content",
    "excerpt",
    "link",
    "tech",
    "web",
    "ios",
    "icon",
  ]);

  const content = renderMarkdown(post.content || post.excerpt || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllProjects(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
