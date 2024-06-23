import { NextSeo } from "next-seo";
import { WorkList } from "components";
import { getAllProjects } from "pages/api/projects";
import { ContentWrapper } from "ui";

export default function Home({ allProjects }) {
  return (
    <>
      <NextSeo
        title="Projects – Nils Fahrni"
        description="A list of all my side-projects."
        openGraph={{
          site_name: "Projects – Nils Fahrni",
          title: "Projects – Nils Fahrni",
          description:
            "A list of all my side-projects.",
        }}
        twitter={{
          handle: "@okaynils",
          site: "@okaynils",
          cardType: "summary_large_image",
        }}
      />
      <ContentWrapper width="620px">
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
