import { BlogList } from "components";
import { getAllPosts } from "lib/content.mjs";
import { ContentWrapper } from "ui";

export default function Blog({ allPosts }) {
  return (
    <>
      <ContentWrapper width="720px">
        <section className="old-box">
          <h1 className="old-box-title">
            notes
            <span className="float-right font-normal">
              <a href="/feed.xml" aria-label="Subscribe to Notes feed">rss</a>
            </span>
          </h1>
          <div className="old-box-body">
            <p>
              A home for my sparsely researched ideas and thoughts.
            </p>
            <BlogList data={allPosts} />
          </div>
        </section>
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
