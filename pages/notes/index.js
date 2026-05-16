import { BlogList } from "components";
import { getAllPosts } from "lib/content.mjs";
import { ContentWrapper } from "ui";

export default function Blog({ allPosts }) {
  return (
    <>
      <ContentWrapper width="640px">
        <div className="mb-2 flex items-baseline gap-2">
          <h1 className="text-2xl">Notes</h1>
          <a
            href="/feed.xml"
            aria-label="Subscribe to Notes feed"
            className="ml-auto text-sm"
          >
            rss
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
