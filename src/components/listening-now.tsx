import { useEffect, useState } from "react";
import { NowPlaying } from "@nils/ui";

// Spotify scrobbles to Last.fm, and Last.fm's read-only API key is meant to
// be public and allows browser requests, so this static site can ask directly.
const USER = "okaynils";
const API_KEY = "6ff7403ce54c66b7c251088944ff8df2";
const ENDPOINT = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USER}&api_key=${API_KEY}&format=json&limit=1`;
const POLL_MS = 30_000;

// Last.fm's grey star, sent when a track has no cover.
const PLACEHOLDER = "2a96cbd8b46e442fc41c2b86b821562f";

interface Scrobble {
  title: string;
  artist: string;
  artwork?: string;
  href: string;
  nowPlaying: boolean;
  /** Unix seconds; only for finished plays. */
  playedAt?: number;
}

interface LastFmTrack {
  name: string;
  url: string;
  artist: { "#text": string };
  image: { size: string; "#text": string }[];
  "@attr"?: { nowplaying?: string };
  date?: { uts: string };
}

type Status = { kind: "loading" } | { kind: "offline" } | { kind: "ok"; scrobble: Scrobble | null };

async function latest(): Promise<Scrobble | null> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(String(res.status));
  const data = await res.json();
  const tracks = data.recenttracks?.track;
  const t: LastFmTrack | undefined = Array.isArray(tracks) ? tracks[0] : tracks;
  if (!t) return null;
  const artwork = t.image.find((i) => i.size === "medium")?.["#text"];
  return {
    title: t.name,
    artist: t.artist["#text"],
    artwork: artwork && !artwork.includes(PLACEHOLDER) ? artwork : undefined,
    href: t.url,
    nowPlaying: t["@attr"]?.nowplaying === "true",
    playedAt: t.date ? Number(t.date.uts) : undefined,
  };
}

export function ListeningNow() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });

  useEffect(() => {
    let timer = 0;
    let stopped = false;

    async function poll() {
      if (document.visibilityState === "visible") {
        try {
          const scrobble = await latest();
          if (!stopped) setStatus({ kind: "ok", scrobble });
        } catch {
          if (!stopped) setStatus({ kind: "offline" });
        }
      }
      if (!stopped) timer = window.setTimeout(poll, POLL_MS);
    }

    // Catch up straight away when the tab comes back instead of waiting a poll.
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      clearTimeout(timer);
      poll();
    };

    poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stopped = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (status.kind === "loading") return <NowPlaying variant="row" track={null} loading className="max-w-none" />;

  const s = status.kind === "ok" ? status.scrobble : null;
  if (s?.nowPlaying) {
    // Last.fm doesn't report a position, so the row shows the track and the
    // equaliser without a progress line.
    return (
      <NowPlaying
        variant="row"
        track={{ title: s.title, artist: s.artist, artwork: s.artwork, href: s.href }}
        className="max-w-none [&_.text-xs]:lowercase"
      />
    );
  }

  // Not playing: say so, and what played last. The component's own idle copy
  // is sentence case; the site speaks lowercase.
  return (
    <div className="flex h-8 min-w-0 items-center gap-2 text-ui text-ink-3">
      {s?.artwork ? (
        <img src={s.artwork} alt="" className="size-6 shrink-0 rounded-[3px] opacity-60 grayscale" />
      ) : (
        <span aria-hidden className="size-6 shrink-0 rounded-[3px] bg-panel" />
      )}
      <span className="min-w-0 flex-1 truncate">
        {status.kind === "offline" ? (
          "can't reach last.fm right now"
        ) : s ? (
          <>
            last played{" "}
            <a href={s.href} className="text-ink-2 hover:text-ink">{s.title}</a>
            <span> · {s.artist}</span>
          </>
        ) : (
          "nothing playing right now"
        )}
      </span>
      {s?.playedAt ? <span className="shrink-0 font-mono text-xs tabular-nums">{ago(s.playedAt)}</span> : null}
    </div>
  );
}

function ago(unix: number) {
  const minutes = Math.max(0, Math.round((Date.now() / 1000 - unix) / 60));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 48 * 60) return `${Math.round(minutes / 60)}h ago`;
  return `${Math.round(minutes / 1440)}d ago`;
}
