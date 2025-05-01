import { BlogList } from "components";
import { getAllPosts } from "pages/api/notes";
import { ContentWrapper } from "ui";

export default function Blog({ allPosts }) {
  return (
    <>
      <ContentWrapper width="500px">
        <h2 className="font-medium text-black text-2xl mb-4 mt-4">Notes</h2>
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
