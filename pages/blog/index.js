import { BlogList } from "components";
import { getAllPosts } from "pages/api/blog";
import { NextSeo } from "next-seo";
import { ContentWrapper } from "ui";

export default function Blog({ allPosts }) {
  return (
    <>
      <NextSeo
        title="Blog - Nils Fahrni"
        description="I am a dedicated Data Science undergraduate at the University of Applied Sciences Northwestern Switzerland."
        openGraph={{
          site_name: "Blog - Nils Fahrni",
          title: "Blog - Nils Fahrni",
          description:
            "I am a dedicated Data Science undergraduate at the University of Applied Sciences Northwestern Switzerland.",
        }}
        twitter={{
          handle: "@okaynils",
          site: "@okaynils",
          cardType: "summary_large_image",
        }}
      />

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
  ]);

  return {
    props: { allPosts },
  };
}
