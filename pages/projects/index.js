import { WorkList } from "components";
import { getAllProjects } from "lib/content.mjs";
import { ContentWrapper } from "ui";

export default function Home({ allProjects }) {
  return (
    <>
      <ContentWrapper width="720px">
        <WorkList allPosts={allProjects} />
      </ContentWrapper>
    </>
  );
}

export async function getStaticProps() {
  const allProjects = getAllProjects([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
    "icon",
  ]);

  return {
    props: { allProjects },
  };
}
