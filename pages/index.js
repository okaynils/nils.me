import Link from "next/link";
import { BlogList } from "components";
import { MusicList } from "components";
import { getAllPosts, getAllProjects } from "lib/content.mjs";
import { ContentWrapper } from "ui";

export default function Home({ allPosts, allProjects, post }) {
  return (
    <div>
      <ContentWrapper
        width="100%"
        className="space-y-3"
      >
        <section className="site-banner">
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
            <div>
              <h1 className="mb-1 text-2xl">
                nils fahrni's home page
              </h1>
              <p className="m-0">
                Statistics and Machine Learning student, driverless systems tinkerer, and collector of notes.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 md:justify-end">
              <span className="tiny-badge">plain html spirit</span>
              <span className="tiny-badge alt">wiki mode</span>
              <span className="tiny-badge hot">under construction</span>
            </div>
          </div>
        </section>

        <div className="grid gap-3 md:grid-cols-[180px_1fr]">
          <aside className="space-y-3">
            <section className="old-box">
              <h2 className="old-box-title">contents</h2>
              <div className="old-box-body">
                <ol className="ml-5 list-decimal space-y-1">
                  <li><a href="#about">about</a></li>
                  <li><a href="#projects">projects</a></li>
                  <li><a href="#notes">notes</a></li>
                  <li><a href="#music">music</a></li>
                </ol>
              </div>
            </section>

            <section className="old-box">
              <h2 className="old-box-title">elsewhere</h2>
              <div className="old-box-body">
                <ul className="ml-4 list-disc space-y-1">
                  <li><a href="https://github.com/okaynils" target="_blank" rel="noopener noreferrer">github</a></li>
                  <li><a href="https://linkedin.com/in/nilsfahrni/" target="_blank" rel="noopener noreferrer">linkedin</a></li>
                  <li><a href="https://x.com/okaynils" target="_blank" rel="noopener noreferrer">x</a></li>
                  <li><a href="https://okaynils.github.io/resume/main.pdf" target="_blank" rel="noopener noreferrer">resume.pdf</a></li>
                </ul>
              </div>
            </section>

            <section className="old-box">
              <h2 className="old-box-title">site notes</h2>
              <div className="old-box-body plain-meta">
                no cookies for layout. no hero image. best viewed with curiosity.
              </div>
            </section>
          </aside>

          <div className="space-y-3">
            <section id="about" className="old-box">
              <h2 className="old-box-title">
                about
              </h2>
              <div className="old-box-body">
                <p>
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
                  {" "}I study Statistics and Machine Learning at <a href="https://liu.se/en" target="_blank" rel="noopener noreferrer">Linköping University</a>. I am part of the driverless team at <a href="https://liuformulastudent.se/" target="_blank" rel="noopener noreferrer">LiU Formula Student</a> where I work on <a href="https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping" target="_blank" rel="noopener noreferrer">SLAM</a> and computer vision for the autonomous race car.
                </p>
              </div>
            </section>

            {allProjects && allProjects.length > 0 && (
              <section id="projects" className="old-box">
                <h2 className="old-box-title">
                  personal projects
                </h2>
                <div className="old-box-body p-0">
                  <table className="link-table">
                    <tbody>
                      {allProjects.map((project) => (
                        <tr key={project?.title}>
                          <th>
                            {project?.active ? <span className="tiny-badge">active</span> : <span className="plain-meta">archive</span>}
                          </th>
                          <td>
                            <Link href={`/projects/${project?.slug}` || "/"}>
                              <strong>{project?.title}</strong>
                            </Link>
                            {project?.tagline && (
                              <span> - {project?.tagline}</span>
                            )}
                            {(project?.ios || project?.web) && (
                              <span>
                                {" "}[
                                <a href={project?.ios || project?.web} target="_blank" rel="noopener noreferrer">
                                  external
                                </a>
                                ]
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section id="notes" className="old-box">
              <h2 className="old-box-title">
                notes
                <span className="float-right font-normal">
                  <Link href="/notes">all notes</Link>
                  {" | "}
                  <a href="/feed.xml" aria-label="Subscribe to Notes feed">rss</a>
                </span>
              </h2>
              <div className="old-box-body">
                <BlogList data={allPosts?.slice(0, 6)} activeSlug={post?.slug} />
              </div>
            </section>

            <section id="music" className="old-box">
              <h2 className="old-box-title">
                music
                <span className="float-right font-normal">
                  <Link
                    href="https://open.spotify.com/user/tofusandwich4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    spotify
                  </Link>
                </span>
              </h2>
              <div className="old-box-body">
                <p>
                  Here are my top five artists of the last 30 days.
                </p>
                <MusicList />
              </div>
            </section>
          </div>
        </div>

        <section className="old-box">
          <h2 className="old-box-title">links and miscellany</h2>
          <div className="old-box-body">
            <p className="m-0">
              This site intentionally keeps the old-web habit of putting everything useful near the surface:
              {" "}<Link href="/notes">notes</Link>,{" "}
              <Link href="/projects">projects</Link>,{" "}
              <a href="/feed.xml">rss</a>, and{" "}
              <a href="https://okaynils.github.io/resume/main.pdf" target="_blank" rel="noopener noreferrer">resume.pdf</a>.
            </p>
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
