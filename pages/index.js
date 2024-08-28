import Link from "next/link";
import { ArrowSquareOut, SpotifyLogo } from "@phosphor-icons/react"
import { BlogList } from "components";
import { MusicList } from "components";
import { getAllPosts } from "pages/api/blog";
import { getAllProjects } from "pages/api/projects";
import { ContentWrapper, Button } from "ui";

export default function Home({ allPosts, allProjects, post }) {
  return (
    <div className="grid md:grid-cols-1 mt-0">
      <ContentWrapper
        width="500px"
        className="divide-y divide-gray-200 dark:divide-gray-800 space-y-4"
      >
        <div className="">
          <img src="/images\pages\home\moras.jpg"
            alt="Walter Moras - Im Spreewald"
            className="rounded-md mb-5 shadow-sm"
          />
          <h2 className="mb-3 md:mb-4 text-4xl">
            <span className="font-bold text-black dark:text-white">
              nils fahrni
            </span>
          </h2>
          <div>
            Exploring machine learning and building things.
          </div>
        </div>
        <div className="pt-6 pb-2">
          <h2 className="text-xl font-medium text-black dark:text-white mb-4">
            Personal Projects
          </h2>
          <ul className="mt-4 space-y-4">
            {allProjects?.map((project) => (
              <li key={project?.title} className="relative border border-gray-200 dark:border-gray-700/70 rounded-lg hover:bg-gray-100 dark:bg-gray-800/70 dark:hover:bg-gray-800 dark:hover:border-gray-700 transition-colors duration-300 ease-in-out">
                <Link
                  href={`/projects/${project?.slug}` || "/"}
                  className="flex items-center justify-between px-4 py-3 w-full h-full"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {project?.icon ? (
                        <img
                          className="w-[40px]"
                          src={project?.icon}
                          alt={project?.title}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-[42px] h-[42px] text-lg font-medium text-white bg-black border border-gray-100 rounded-full dark:border-gray-800">
                          {project?.title?.slice(0, 1)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-[6px]">
                        <h3 className="font-medium text-base">{project?.title}</h3>
                        {project?.active && (
                          <div
                            className="w-[8px] h-[8px] rounded-full bg-green-500"
                            title="Active"
                          />
                        )}
                      </div>
                      {project?.tagline && (
                        <p className="text-sm opacity-80">{project?.tagline}</p>
                      )}
                    </div>
                  </div>
                </Link>
                {(project?.ios || project?.web) && (
                  <Link
                    href={project?.ios || project?.web}
                    target="_blank"
                    title={project?.title}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-10 opacity-50 hover:opacity-100 hover:scale-[1.1] duration-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowSquareOut className="text-base" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-8 pb-2">
          <div className="flex items-center gap-3 pb-3">
            <h2 className=" text-xl font-medium text-black dark:text-white">
              Notes
            </h2>
            <Link
              className="bg-transparent border-gray-200 dark:border-gray-700/70 border text-sm px-2 py-px rounded-lg flex gap-1 items-center"
              href="/blog"
            >
              View all notes →
            </Link>
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
