import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const SOCIAL_LINKS = [
    { title: "X", url: "https://x.com/okaynils", icon: <XLogo size={16} /> },
    { title: "LinkedIn", url: "https://linkedin.com/in/nilsfahrni/", icon: <LinkedinLogo size={16} /> },
    { title: "GitHub", url: "https://github.com/okaynils", icon: <GithubLogo size={16} /> },
  ];

  const LINKS = [
    {
      title: "home",
      url: "/",
      active: pathname === "/",
    },
    {
      title: "notes",
      url: "/notes",
      active: pathname.includes("/notes"),
    },
    {
      title: "resume",
      url: "https://okaynils.github.io/resume/main.pdf",
      active: false,
      external: true,
    },
  ];

  const RenderLinks = ({ items }) => (
    <div className="flex flex-row space-x-2 my-0 gap-2 text-sm">
      {items.map((link, idx) => (
        <Link
          key={idx}
          href={link.url}
          target={link.external ? "_blank" : undefined}
          className={clsx(
            "flex items-center py-[3px] transition-all duration-150 ease-in-out",
            link.active
              ? "font-bold text-black"
              : "text-gray-400 hover:text-black",
          )}
        >
          <span className="flex items-center">
            {typeof link.title === 'string' ? link.title : link.title}
          </span>
          {link.external && (
            <ArrowSquareOut size={14} className="ml-1 text-gray-400" />
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="w-full backdrop-blur-sm bg-cream/50">
      <div className="max-w-[440px] w-full">
        <aside className="flex justify-between items-center text-sm py-2 rounded-[12px] my-1 w-full relative">
          <RenderLinks items={LINKS} />
          <div className="flex items-center absolute right-0 gap-2">
            {SOCIAL_LINKS.map((item, idx) => (
              <Link key={idx} href={item.url} target="_blank" className="flex items-center py-[3px] text-lg opacity-50 hover:opacity-80 transition-all duration-150 ease-in-out rounded-lg">
                {item.icon}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
