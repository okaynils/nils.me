import Link from "next/link";
import { BlogList } from "components";
import { MusicList } from "components";
import { getAllPosts, getAllProjects } from "lib/content.mjs";
import { ContentWrapper } from "ui";

export default function Home({ allPosts, allProjects, post }) {
  return (
    <div>
      <ContentWrapper
        width="640px"
        className="space-y-8"
      >
        <section>
          <div className="mb-4">
            <img src="/images/pages/home/arborelius.jpg"
              alt="Olof Arborelius — Lake view at Engelsberg, Västmanland (1893)"
              className="select-none border border-gray-400"
              draggable="false" />
            <p className="plain-meta mt-1">
              Olof Arborelius, Lake view at Engelsberg, Västmanland, 1893.
            </p>
          </div>
          <h1 className="mb-3 text-3xl">
            <span className="inline-flex items-start gap-1 font-bold text-black">
              <span>nils fahrni</span>
              <a href="/media/switzerland.mp4" target="_blank" rel="noopener noreferrer" title="Switzerland">
                <img
                  src="/images/pages/home/switzerland.png"
                  alt="Switzerland"
                  className="mt-[5px] h-3 w-3 border-0"
                />
              </a>
            </span>
          </h1>
          <p>
            I study Statistics and Machine Learning at <a href="https://liu.se/en" target="_blank" rel="noopener noreferrer">Linköping University</a>. I am part of the driverless team at <a href="https://liuformulastudent.se/" target="_blank" rel="noopener noreferrer">LiU Formula Student</a> where I work on <a href="https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping" target="_blank" rel="noopener noreferrer">SLAM</a> and computer vision for the autonomous race car.
          </p>
        </section>

        {/* Personal Projects */}
        {allProjects && allProjects.length > 0 && ( 
          <section className="document-rule pt-4">
            <h2 className="mb-2 text-xl">
              Personal projects
            </h2>
            <ul className="space-y-3">
              {allProjects.map((project) => (
                <li key={project?.title}>
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <Link href={`/projects/${project?.slug}` || "/"}>
                      <strong>{project?.title}</strong>
                    </Link>
                    {project?.active && (
                      <span className="plain-meta">active</span>
                    )}
                    {(project?.ios || project?.web) && (
                      <a href={project?.ios || project?.web} target="_blank" rel="noopener noreferrer">
                        external
                      </a>
                    )}
                  </div>
                  {project?.tagline && (
                    <p className="m-0 text-sm">{project?.tagline}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="document-rule pt-4">
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            <h2 className="text-xl">
              Notes
            </h2>
            <Link
              className="ml-auto text-sm"
              href="/notes"
            >
              view all notes
            </Link>
            <a
              href="/feed.xml"
              aria-label="Subscribe to Notes feed"
            >
              rss
            </a>
          </div>
          <BlogList data={allPosts?.slice(0, 6)} activeSlug={post?.slug} />
        </section>

        <section className="document-rule pt-4">
          <div className="mb-2 flex flex-wrap items-baseline gap-2">
            <h2 className="text-xl">
              Music
            </h2>
            <Link
              className="text-sm"
              href="https://open.spotify.com/user/tofusandwich4"
              target="_blank"
              rel="noopener noreferrer"
            >
              spotify
            </Link>
          </div>

          <div>
            <p>
              Here are my top five artists of the last 30 days.
            </p>
            <MusicList />
          </div>
        </section>
      </ContentWrapper>
    </div>
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

  const allProjects = getAllProjects([
    "title",
    "date",
    "slug",
    "author",
    "image",
    "excerpt",
    "content",
    "icon",
    "active",
    "tagline",
    "web",
    "ios",
  ]);

  return {
    props: {
      allPosts,
      allProjects: allProjects
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .sort((left, right) =>
          left.hasOwnProperty("active")
            ? -1
            : right.hasOwnProperty("active")
              ? 1
              : 0
        ),
    },
  };
}
