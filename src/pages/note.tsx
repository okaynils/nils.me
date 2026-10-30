import { Layout } from "../components/layout";
import type { Note } from "../notes";

interface NotePageProps {
  note: Note;
  html: string;
  newer?: Note;
  older?: Note;
}

export function NotePage({ note, html, newer, older }: NotePageProps) {
  return (
    <Layout current="note">
      <article>
        <header className="flex items-baseline justify-between gap-4">
          <h1 className="text-[17px] leading-6 font-semibold tracking-[-0.01em] text-ink">{note.title}</h1>
          <time dateTime={note.date} className="shrink-0 font-mono text-xs text-ink-3 tabular-nums">{note.date}</time>
        </header>
        <div className="prose mt-5" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <nav aria-label="More notes" className="mt-10 grid grid-cols-2 gap-4 font-mono text-xs">
        <div>{older ? <Adjacent label="← older" note={older} /> : <a className="text-ink-2 hover:text-ink" href="/#writing">← all writing</a>}</div>
        <div className="text-right">{newer ? <Adjacent label="newer →" note={newer} /> : null}</div>
      </nav>
    </Layout>
  );
}

function Adjacent({ label, note }: { label: string; note: Note }) {
  return (
    <a href={`/notes/${note.slug}`} className="group block">
      <span className="text-ink-3">{label}</span>
      <span className="block text-ink-2 group-hover:text-ink">{note.title}</span>
    </a>
  );
}
