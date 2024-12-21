import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "ui";
import {
  IdentificationCard,
  House,
  Note,
  BracketsCurly,
  Compass,
  ArrowSquareOut,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
  GithubLogo,
  X,
  XLogo,
  CaretUp,
} from "@phosphor-icons/react"
import clsx from "clsx";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const { pathname } = useRouter();
  const [mobileNav, showMobileNav] = useState(false);
  const { theme, setTheme } = useTheme();

  const SOCIAL_LINKS = [
    {
      title: "X",
      url: "https://x.com/okaynils",
      icon: <XLogo />,
    },
    /* {
      title: "Instagram",
      url: "https://instagram.com/okaynils",
      icon: <InstagramLogo />,
    }, */
    {
      title: "LinkedIn",
      url: "https://linkedin.com/in/nilsfahrni/",
      icon: <LinkedinLogo />,
    },
    {
      title: "GitHub",
      url: "https://github.com/okaynils",
      icon: <GithubLogo />,
    },
  ];

  const LINKS = [
    {
      title: (
        <div className="md:w-5 md:h-5 flex items-center justify-center">
          <House size={16} className="hidden md:flex" />
          <span className="flex md:hidden">Home</span>
        </div>
      ),
      url: "/",
      icon: <House size={16} />,
      active: pathname === "/",
    },
    {
      title: "Notes",
      url: "/notes",
      icon: <Note size={16} />,
      active: pathname.includes("/notes"),
    },
    {
      title: "Projects",
      url: "/projects",
      icon: <BracketsCurly size={16} />,
      active: pathname.includes("/projects"),
    },
    //{
    //  title: "Travel Map",
    //  url: "/map",
    //  icon: <Compass size={16} />,
    //  active: pathname === "/map",
    //},
    {
      title: "Resume",
      url: "https://drive.google.com/file/d/1NfSnIGHWlv_rA0XkSeKOYPvOLNtplc3c",
      icon: <IdentificationCard size={16} />,
      active: false,
      external: true,
    },
  ];

  const SOCIAL = [
    {
      title: "Github",
      url: `https://github.com/okaynils`,
      icon: <GithubLogo size={16} />,
      external: true,
    },
    {
      title: "X",
      url: `https://x.com/${process.env.twitter}`,
      icon: <XLogo size={16} />,
      external: true,
    },
    /* {
      title: "Instagram",
      url: `https://instagram.com/${process.env.instagram}`,
      icon: <InstagramLogo size={16} />,
      external: true,
    }, */
  ];

  const RenderLinks = ({ sectionTitle, sectionItems }) => {
    return (
      <>
        <div className="flex md:flex-row flex-col space-y-2 my-2 md:my-0 px-2 md:px-0 md:space-y-0 text-base md:text-sm">
          {sectionItems.map((link, index) => (
            <div className="px-1" key={index}>
              <Link
                href={link.url}
                target={link.external ? "_blank" : ""}
                className={clsx(
                  "flex items-center w-full py-[6px] md:py-[3px] px-[8px] transition-all duration-150 ease-in-out rounded-lg ",
                  link?.active
                    ? "outline outline-1 outline-gray-200 dark:outline-gray-700"
                    : "text-gray-800 hover:bg-gray-200 hover:bg-opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
              >
                <span>{link?.title}</span>
                {link?.external ? (
                  <span className="ml-1 text-gray-400 dark:text-gray-600">
                    <ArrowSquareOut size={14} />
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderPrefs = () => {
    return (
      <div>
        <h4 className="mt-4 mb-2 text-gray-500">Theme</h4>
        <div className="mx-4 dark:bg-[#111] border border-gray-200 rounded-lg cursor-pointer dark:border-gray-800 hover:border-gray-800 dark:hover:border-gray-300">
          <select
            onChange={(e) => setTheme(e.target.value)}
            className="w-full dark:bg-[#111] outline-none appearance-none cursor-pointer py-1 px-2 rounded-lg"
            defaultValue={theme}
            placeholder="Select theme"
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed w-full top-0 left-0 z-20 flex items-center justify-center backdrop-blur-sm bg-cream/50 dark:bg-gray-900/50">
      <div className="max-w-[500px] w-full hidden md:flex">
        <aside className="sticky top-[30px] overflow-auto flex text-sm py-2 rounded-[12px] my-1 w-full">
          <RenderLinks sectionItems={LINKS} />
          <div className="flex gap-3 items-center ml-auto">
            {SOCIAL_LINKS?.map((item, index) => (
              <Link
                className="text-lg opacity-50 hover:opacity-80"
                href={item?.url}
                target="_blank"
                key={index}
              >
                {item?.icon}
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <div className="text-sm fixed left-0 bottom-0 p-2 rounded-full w-full md:hidden z-10 text-center flex items-center justify-center">
        <Button
          variant="secondary"
          className="w-full !py-[12px] dark:!shadow-[0_0_20px_rgba(0,0,0,0.7)] shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-white/70 backdrop-blur-md dark:bg-black/70"
          onClick={() => showMobileNav(!mobileNav)}
        >
          {!mobileNav ? (
            <div className="flex items-center">
              <CaretUp className="mr-2" />
              Menu
            </div>
          ) : (
            "Close"
          )}
        </Button>
      </div>
      <AnimatePresence>
        {mobileNav ? (
          <nav className="fixed bottom-0 left-0 z-10 block w-full p-2 md:hidden h-full">
            {mobileNav ? (
              <div
                className="absolute inset-0 bg-black/20 dark:bg-black/50 w-full h-full "
                onClick={() => showMobileNav(false)}
              />
            ) : (
              ""
            )}

            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 200, transition: { duration: 0.1 } }}
              className="border border-b-0 border-gray-200 bg-white/90 backdrop-filter backdrop-blur dark:bg-gray-900/90 dark:border-gray-700 bottom-0 absolute left-0 w-full py-4 rounded-t-lg text-sm"
            >
              {mobileNav ? (
                <div>
                  <div onClick={() => showMobileNav(false)} className="">
                    <div className="absolute top-[-50px] right-[10px] z-20">
                      <Button
                        variant="secondary"
                        className="w-full !py-2"
                        onClick={() => showMobileNav(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <RenderLinks sectionItems={LINKS} />
                    <RenderLinks sectionItems={SOCIAL} sectionTitle="Social" />
                  </div>
                  {renderPrefs()}
                </div>
              ) : (
                ""
              )}
            </motion.div>
          </nav>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
}
