import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Sidebar() {
  const { pathname } = useRouter();

  const SOCIAL_LINKS = [
    { title: "github", url: "https://github.com/okaynils" },
    { title: "linkedin", url: "https://linkedin.com/in/nilsfahrni/" },
    { title: "x", url: "https://x.com/okaynils" },
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
      title: "projects",
      url: "/projects",
      active: pathname.includes("/projects"),
    },
    {
      title: "resume",
      url: "https://okaynils.github.io/resume/main.pdf",
      active: false,
      external: true,
    },
  ];

  const RenderLinks = ({ items }) => (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
      {items.map((link, idx) => (
        <span key={idx} className="inline-flex items-center gap-x-1">
          {idx > 0 && <span className="text-gray-500">|</span>}
          <Link
            href={link.url}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-current={link.active ? "page" : undefined}
            className={clsx(link.active && "font-bold text-black")}
          >
            {link.title}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <header className="mb-8 border-b border-gray-400 pb-2 text-sm">
      <nav className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
        <RenderLinks items={LINKS} />
        <RenderLinks items={SOCIAL_LINKS.map((link) => ({ ...link, external: true }))} />
      </nav>
    </header>
  );
}
