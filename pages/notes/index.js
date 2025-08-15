import { BlogList } from "components";
import { getAllPosts } from "pages/api/notes";
import { ContentWrapper } from "ui";

export default function Blog({ allPosts }) {
  return (
    <>
      <ContentWrapper width="440px">
        <h2 className="font-medium text-black text-2xl mt-4">Notes</h2>
        <p className="mb-4">
          A home for my sparsely researched ideas and thoughts.
        </p>
        <BlogList data={allPosts} />
      </ContentWrapper>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "external",
    "pinned",
    "evergreen"
  ]);

  return {
    props: { allPosts },
  };
}
