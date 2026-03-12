import { BlogList } from "components";
import { getAllPosts } from "pages/api/notes";
import { ContentWrapper } from "ui";
import { Rss } from "@phosphor-icons/react";

export default function Blog({ allPosts }) {
  return (
    <>
      <ContentWrapper width="440px">
        <div className="mt-4 flex items-center gap-2">
          <h2 className="font-medium text-black text-2xl">Notes</h2>
          <a
            href="/feed.xml"
            aria-label="Subscribe to Notes feed"
            className="ml-auto text-gray-500 transition-colors hover:text-black"
          >
            <Rss size={16} weight="bold" />
          </a>
        </div>
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
    "dateRaw",
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
