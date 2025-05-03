import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import clsx from "clsx";
import {
  House,
  Note,
  BracketsCurly,
  IdentificationCard,
  ArrowSquareOut,
  XLogo,
  LinkedinLogo,
  GithubLogo,
} from "@phosphor-icons/react";

export default function Sidebar() {
  const { pathname } = useRouter();
  const { theme, setTheme } = useTheme();

  const SOCIAL_LINKS = [
    { title: "X", url: "https://x.com/okaynils", icon: <XLogo size={16} /> },
    { title: "LinkedIn", url: "https://linkedin.com/in/nilsfahrni/", icon: <LinkedinLogo size={16} /> },
    { title: "GitHub", url: "https://github.com/okaynils", icon: <GithubLogo size={16} /> },
  ];

  const LINKS = [
    {
      title: <House size={16} />,
      url: "/",
      active: pathname === "/",
    },
    {
      title: "Notes",
      url: "/notes",
      active: pathname.includes("/notes"),
    },
    {
      title: "Projects",
      url: "/projects",
      active: pathname.includes("/projects"),
    },
    {
      title: "Resume",
      url: "https://okaynils.github.io/resume/main.pdf",
      active: false,
      external: true,
    },
  ];

  const RenderLinks = ({ items }) => (
    <div className="flex flex-row space-x-2 my-0 px-0 text-sm">
      {items.map((link, idx) => (
        <Link
          key={idx}
          href={link.url}
          target={link.external ? "_blank" : undefined}
          className={clsx(
            "flex items-center py-[3px] px-[8px] transition-all duration-150 ease-in-out rounded-lg box-border",
            link.active
              ? "outline outline-1 outline-gray-200 dark:outline-gray-700"
              : "text-gray-800 hover:bg-gray-200 hover:bg-opacity-50 dark:text-gray-400 dark:hover:bg-gray-800"
          )}
        >
          <span className="flex items-center">
            {typeof link.title === 'string' ? link.title : link.title}
          </span>
          {link.external && (
            <ArrowSquareOut size={14} className="ml-1 text-gray-400 dark:text-gray-600" />
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="fixed w-full top-0 left-0 z-20 flex items-center justify-center backdrop-blur-sm bg-cream/50 dark:bg-gray-900/50">
      <div className="max-w-[500px] w-full">
        <aside className="sticky top-[30px] overflow-hidden flex text-sm py-2 rounded-[12px] my-1 pl-[1px] w-full">
          <RenderLinks items={LINKS} />
          <div className="flex gap-3 items-center ml-auto">
            {SOCIAL_LINKS.map((item, idx) => (
              <Link key={idx} href={item.url} target="_blank" className="text-lg opacity-50 hover:opacity-80">
                {item.icon}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
