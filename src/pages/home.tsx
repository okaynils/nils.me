import { useEffect, useState } from "react";
import { Link, LocalTime } from "@nils/ui";
import { Layout, Row, Section } from "../components/layout";
import { notes } from "../notes";
import { Moth } from "../components/moth";
import { ListeningNow } from "../components/listening-now";

const projects = [
  { name: "turbine", href: "https://turbine.so/", about: "agentic autopilot for your calendar, todos and email" },
  { name: "fs-cone-kit", href: "https://github.com/okaynils/fs-cone-kit", about: "computer vision pipeline for formula student teams" },
  { name: "fs-openpilot", href: "https://github.com/okaynils/fs-openpilot", about: "camera-only formula student driving for everyone" },
  { name: "lil memory", href: "https://lilmemory.nils.me/", about: "local, markdown-based memory for agents" },
  { name: "nils/ui", href: "https://ui.nils.me/", about: "my ui kit, which this site is built with" },
];

const playlists = [
  { name: "you still wired in?", href: "https://open.spotify.com/playlist/7hf5AgLvr3xQreZTEgTJKA", about: "study and work" },
  { name: "frog pond", href: "https://open.spotify.com/playlist/2Imr2xjwFhowul5fbRrsrR" },
  { name: "midwest", href: "https://open.spotify.com/playlist/0YPcPdEEgp4A9CBpDJzIyt" },
];

export function Home() {
  return (
    <Layout current="home">
      <p className="text-sm leading-6 text-ink">
        master's student in statistics and machine learning at linköping university, sweden. i build the slam system
        and other computer vision for the liu formula student driverless team.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink">
        i want to spend my career teaching robots to see. right now i'm looking for a master's thesis on robot
        perception at a company. if that's you, <SayHi />.
      </p>
      <LocalTime timeZone="Europe/Stockholm" label="linköping" showDifference className="mt-2 lowercase" />

      <Section id="now" label="now">
        <ul>
          {projects.map((p) => (
            <Row key={p.name} lead={<span className="text-ink">{p.name}</span>} href={p.href} external>
              <span className="text-ink-2">{p.about}</span>
            </Row>
          ))}
        </ul>
      </Section>

      <Section id="writing" label="writing">
        <ul>
          {notes.map((note) => (
            <Row key={note.slug} lead={<time dateTime={note.date}>{note.date}</time>} href={`/notes/${note.slug}`}>
              <span className="text-ink">{note.title}</span>
            </Row>
          ))}
        </ul>
      </Section>

      <Section id="listening" label="listening">
        <ListeningNow />
        <ul>
          {playlists.map((p) => (
            <Row key={p.name} href={p.href} external>
              <span className="text-ink">{p.name}</span>
              {p.about ? <span className="text-ink-3"> · {p.about}</span> : null}
            </Row>
          ))}
        </ul>
      </Section>

      <Moth />
    </Layout>
  );
}

// The address never appears whole in the prerendered HTML, so scrapers reading
// the page don't find it; without JavaScript the link falls back to the about
// page, where it's written out.
function SayHi() {
  const [href, setHref] = useState("/about#elsewhere");
  useEffect(() => setHref(`mailto:${["nilsfahrni", "protonmail.com"].join("@")}`), []);
  return <Link href={href}>say hi</Link>;
}
