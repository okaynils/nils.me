import type { ReactNode } from "react";
import { Button, Tooltip } from "@nils/ui";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

type Current = "home" | "about" | "note";

export const resume = "https://okaynils.github.io/resume/main.pdf";

export function Layout({ current, children }: { current: Current; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[600px] flex-col px-4 pt-5 pb-6 sm:pt-8">
      <header className="flex h-7 items-center justify-between font-mono text-xs">
        <a href="/" className="flex items-center gap-1.5 rounded-ui font-medium text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
          <span aria-hidden className="fern size-3.5" />
          nils fahrni
        </a>
        <nav className="flex items-center gap-3">
          <NavLink href="/" active={current === "home"}>home</NavLink>
          <NavLink href="/about" active={current === "about"}>about</NavLink>
          <NavLink href={resume}>resume<span aria-hidden className="text-ink-3">↗</span></NavLink>
          <ThemeToggle />
        </nav>
      </header>
      <main className="mt-8 min-w-0 flex-1">{children}</main>
      <footer className="mt-10 flex items-center justify-between font-mono text-xs text-ink-3">
        <span>written in linköping, sweden</span>
        <a href="/feed.xml" className="hover:text-ink">rss</a>
      </footer>
    </div>
  );
}

// Blue marks where you are; everything else in the nav stays quiet until pointed at.
function NavLink({ href, active = false, children }: { href: string; active?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? "text-accent" : "text-ink-2 transition-colors duration-120 hover:text-ink"}
    >
      {children}
    </a>
  );
}

function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons render and CSS picks one, so the prerendered HTML is right for
  // either theme before React has hydrated.
  return (
    <Tooltip content="switch theme">
      <Button icon size="sm" variant="ghost" aria-label="Switch theme" onClick={toggle} className="-mr-1.5 size-6">
        <MoonIcon className="size-3.5 dark:hidden" />
        <SunIcon className="hidden size-3.5 dark:block" />
      </Button>
    </Tooltip>
  );
}

/** A section headed by a lowercase mono label. */
export function Section({ id, label, children }: { id?: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-7 scroll-mt-6 first:mt-0">
      <h2 className="mb-1.5 font-mono text-xs text-ink-3">
        <span aria-hidden>// </span>{label}
      </h2>
      {children}
    </section>
  );
}

/** One dense line: a mono lead (date, year, name), the text, and an optional ↗ for links that leave. */
export function Row({ lead, leadWidth = "w-[5.5rem]", href, external, children }: {
  lead?: ReactNode;
  /** Wide enough for the longest lead in the list, so the text column lines up. */
  leadWidth?: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const body = (
    <>
      {lead !== undefined ? <span className={`${leadWidth} shrink-0 font-mono text-xs leading-5 text-ink-3 tabular-nums`}>{lead}</span> : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {external ? <span aria-hidden className="font-mono text-xs text-ink-3">↗</span> : null}
    </>
  );
  const row = "-mx-2 flex min-h-[26px] items-baseline gap-3 rounded-ui px-2 py-[3px] text-ui";
  return (
    <li>
      {href ? (
        <a href={href} className={`${row} group outline-none transition-colors duration-120 hover:bg-hover focus-visible:bg-hover`}>
          {body}
        </a>
      ) : (
        <div className={row}>{body}</div>
      )}
    </li>
  );
}
