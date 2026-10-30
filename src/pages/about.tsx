import { Layout, Row, Section, resume } from "../components/layout";

const cornerstones = [
  { year: "2001", text: "i was born in switzerland" },
  { year: "2017", text: "apprenticeship as a software engineer at swiss post and postfinance" },
  { year: "2021", text: "high school diploma (matura)" },
  { year: "2022", text: "bachelor's in data science and ai (i wish it was less buzzwordy)" },
  { year: "2025", text: "moved to sweden for my master's in statistics and machine learning" },
];

const likes = [
  "drawing", "reading books", "hiking", "lifting", "road biking", "running", "skateboarding",
  "robot perception", "architecture", "conservation", "birds", "moths",
];

const values = [
  "humans are fundamentally good",
  "ai is not a bubble",
  "free markets are the optimal solution",
];

const elsewhere = [
  { name: "github", href: "https://github.com/okaynils" },
  { name: "x", href: "https://x.com/okaynils" },
  { name: "instagram", href: "https://instagram.com/okaynils" },
  { name: "strava", href: "https://www.strava.com/athletes/116522759" },
  { name: "letterboxd", href: "https://letterboxd.com/okaynils" },
  { name: "goodreads", href: "https://www.goodreads.com/user/show/70064031-nils-fahrni" },
  { name: "spotify", href: "https://open.spotify.com/user/tofusandwich4" },
  { name: "resume", href: resume },
];

const link = "text-accent underline decoration-accent/35 underline-offset-[3px] hover:decoration-accent";

export function About() {
  return (
    <Layout current="about">
      <Section label="cornerstones">
        <ul>
          {cornerstones.map((c) => (
            <Row key={c.year} lead={c.year} leadWidth="w-9">
              <span className="text-ink">{c.text}</span>
            </Row>
          ))}
        </ul>
        <p className="mt-1.5 text-xs text-ink-3">to get to know about the interesting and exciting things that happened between these, you will have to talk to me in person ;)</p>
      </Section>

      <Section label="things i like">
        <p className="text-ui leading-6 text-ink">
          {likes.map((like, i) => (
            <span key={like}>
              {like}
              {i < likes.length - 1 ? <span className="text-ink-3"> · </span> : null}
            </span>
          ))}
        </p>
        <p className="mt-2 text-ui leading-6 text-ink-2">
          i try to be as renaissance as possible. life feels pretty short, so becoming a polymath feels like the right
          thing to do. that doesn't mean i don't let myself go deep: i pick a handful of things to dedicate real thought
          to, ideally ones that become a career, and rotate new hobbies through the rest of the space.
        </p>
      </Section>

      <Section label="values">
        <ul>
          {values.map((value) => (
            <Row key={value} lead="-" leadWidth="w-2">
              <span className="text-ink">{value}</span>
            </Row>
          ))}
        </ul>
        <p className="mt-1.5 text-xs text-ink-3">happy to argue about these over a coffee.</p>
      </Section>

      <Section label="elsewhere">
        <ul>
          {elsewhere.map((place) => (
            <Row key={place.name} href={place.href} external>
              <span className="text-ink">{place.name}</span>
            </Row>
          ))}
        </ul>
      </Section>

      <Section label="this site">
        <p className="text-ui leading-6 text-ink-2">
          static html, prerendered from react and{" "}
          <a className={link} href="https://ui.nils.me/">nils/ui</a>. it used to be hand-written html with a few lines
          of css; that's still in the{" "}
          <a className={link} href="https://github.com/okaynils/nils.me">git history</a>.
        </p>
      </Section>
    </Layout>
  );
}
