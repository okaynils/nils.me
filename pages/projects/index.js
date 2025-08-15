import { WorkList } from "components";
import { getAllProjects } from "pages/api/projects";
import { ContentWrapper } from "ui";

export default function Home({ allProjects }) {
  return (
    <>
      <ContentWrapper width="440px">
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
