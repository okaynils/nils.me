import Link from "next/link";
import { ArrowSquareOut, SpotifyLogo } from "@phosphor-icons/react"
import { BlogList } from "components";
import { MusicList } from "components";
import { getAllPosts } from "pages/api/blog";
import { getAllProjects } from "pages/api/projects";
import { ContentWrapper, Button } from "ui";

export default function Home({ allPosts, allProjects, post }) {
  return (
    <div className="grid md:grid-cols-1 mt-0 md:mt-8">
      <ContentWrapper
        width="620px"
        className="divide-y divide-gray-200 dark:divide-gray-800 space-y-6"
      >
        <div className="">
          <h2 className="mb-3 md:mb-4 text-3xl">
            <span className="font-bold text-black dark:text-white">
              Nils Fahrni
            </span>
          </h2>
          <div>
            I am a dedicated Data Science undergraduate in the fourth semester at <Link className="border-b" href="https://fhnw.ch/en/" target="_blank">FHNW</Link>.
            <br />
            I am very passionate about machine learning and the math behind it.
          </div>
          <div className="flex items-center my-4">
            <div>
              For my last year of undergraduate studies, I am looking for opportunities to work in the field of machine learning. If you are interested or know someone, <Link className="border-b" href="mailto:hi@nils.me">let's talk!</Link>
            </div>
          </div>
        </div>
        <div className="pt-6 pb-2">
          <h2 className="text-xl font-medium text-black dark:text-white mb-4">
            Side-projects
          </h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProjects?.map((project) => (
              <div className="min-w-[120px] flex-col px-4 py-2 border border-gray-200 dark:border-gray-700/70 rounded-lg hover:bg-gray-100 dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:shadow-[0_0_8px_rgba(0,0,0,0.8)] shadow-[0_0_8px_rgba(0,0,0,0.06)] flex relative ">
                {project?.ios ? (
                  <Link
                    href={project?.ios}
                    target="_blank"
                    title={project?.title}
                  >
                    <div className="absolute top-[10%] right-[10%] z-10 opacity-50 hover:opacity-100 hover:scale-[1.1] duration-100">
                      <ArrowSquareOut className="text-base" />
                    </div>
                  </Link>
                ) : project?.web ? (
                  <Link
                    href={project?.web}
                    target="_blank"
                    title={project?.title}
                  >
                    <div className="absolute top-[10%] right-[10%] z-10 opacity-50 hover:opacity-100 hover:scale-[1.1] duration-100">
                      <ArrowSquareOut className="text-base" />
                    </div>
                  </Link>
                ) : (
                  ""
                )}
                <Link
                  href={`/projects/${project?.slug}` || "/"}
                  key={project?.title}
                >
                  <div className="py-3 relative">
                    {project?.icon ? (
                      <img
                        className="w-[40px] drop-shadow-xl"
                        src={project?.icon}
                        alt={project?.title}
                      />
                    ) : (
                      <>
                        <div className="flex items-center justify-center w-[42px] h-[42px] text-lg font-medium text-white bg-black border border-gray-100 rounded-full dark:border-gray-800 drop-shadow-xl">
                          {project?.title?.slice(0, 1)}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center gap-[6px] mt-1">
                      <h3 className="font-medium text-base">
                        {project?.title}
                      </h3>
                      {project?.active ? (
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-green-500"
                          title="Active"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {project?.tagline ? (
                      <p className="text-sm opacity-80">{project?.tagline}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 pb-2">
          <div className="flex items-center gap-3 pb-3">
            <h2 className=" text-xl font-medium text-black dark:text-white">
              Thoughts & Writings
            </h2>
            <Button variant="secondary" className="text-sm" href="/blog" as="a">
              View all writings →
            </Button>
          </div>
          <BlogList data={allPosts?.slice(0, 12)} activeSlug={post?.slug} />
        </div>

        <div>
          <div className="flex items-center mt-10 gap-3">
            <h2 className=" text-xl font-medium text-black dark:text-white">
              Music
            </h2>
            <Link
              className="bg-transparent border-gray-200 dark:border-gray-700/70 border text-sm px-2 py-px rounded-lg flex gap-1 items-center"
              href="https://open.spotify.com/user/tofusandwich4"
              target="_blank"
            >
              <SpotifyLogo /> Spotify
              <ArrowSquareOut />
            </Link>
          </div>

          <div className="mt-2 mb-8">
            <p>
              I think music says a lot about someone and it's a great way to connect with people, so here are my top five artists of the last 30 days.
            </p>
            <MusicList />
          </div>
        </div>
      </ContentWrapper>
    </div>
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
