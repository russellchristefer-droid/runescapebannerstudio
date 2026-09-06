import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { YOUTUBERS, tubeUrl, type Youtuber } from "@/data/youtubers";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/youtubers")({
  head: () => pageMeta("Youtubers", "Hall of known RuneScape YouTube channels. Not complete. Not Jagex."),
  component: YoutubersPage,
});

type Pulse = { live?: boolean; title?: string; latest?: string };

function Row({ row, pulse }: { row: Youtuber; pulse?: Pulse }) {
  const href = tubeUrl(row.youtube);
  if (!href) return null;
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm">
        {row.name}
        {row.official || row.era === "official" ? (
          <span className="ml-2 text-[10px] text-faint">Official</span>
        ) : row.era === "foundation" ? (
          <span className="ml-2 text-[10px] text-faint">Pillar</span>
        ) : null}
        {pulse?.live ? (
          <span className="ml-2 rounded-sm border border-parchment px-1.5 py-0.5 text-[10px] text-parchment">Live</span>
        ) : null}
        {pulse?.live && pulse.title ? (
          <span className="mt-1 block text-[12px] text-muted">{pulse.title}</span>
        ) : null}
        {!pulse?.live && pulse?.latest ? (
          <span className="mt-1 block text-[12px] text-muted">Latest: {pulse.latest}</span>
        ) : null}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${row.name} on YouTube`}
        className="text-sm text-parchment"
      >
        YouTube
      </a>
    </li>
  );
}

function YoutubersPage() {
  const [q, setQ] = useState("");
  const [probe, setProbe] = useState<"off" | "ok" | "down">("down");
  const [pulse, setPulse] = useState<Record<string, Pulse>>({});

  useEffect(() => {
    if (import.meta.env.VITE_YOUTUBE_LIVE === "false") {
      setProbe("off");
      return;
    }
    let ctrl: AbortController | undefined;
    const poll = () => {
      if (document.visibilityState !== "visible") return;
      ctrl?.abort();
      ctrl = new AbortController();
      const mine = ctrl;
      const timer = window.setTimeout(() => mine.abort(), 4000);
      fetch("/api/youtube-live", { cache: "no-store", signal: mine.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!data || data.off || data.ok === false) {
            setProbe(data?.off ? "off" : "down");
            setPulse({});
            return;
          }
          const next: Record<string, Pulse> = {};
          const list = Array.isArray(data.rows) ? data.rows : [];
          for (const raw of list) {
            if (!raw || typeof raw !== "object") continue;
            const row = raw as { id?: string; live?: boolean; title?: string; latest?: string };
            if (!row.id) continue;
            next[row.id] = {
              live: row.live === true,
              title: row.title ? String(row.title).slice(0, 80) : undefined,
              latest: row.latest ? String(row.latest).slice(0, 80) : undefined,
            };
          }
          setPulse(next);
          setProbe("ok");
        })
        .catch(() => {
          setProbe("down");
          setPulse({});
        })
        .finally(() => window.clearTimeout(timer));
    };
    poll();
    const id = window.setInterval(poll, 60_000);
    const onVis = () => {
      if (document.visibilityState === "visible") poll();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      ctrl?.abort();
    };
  }, []);

  const needle = q.trim().toLowerCase();
  const match = (row: Youtuber) =>
    !needle || row.name.toLowerCase().includes(needle) || row.youtube.toLowerCase().includes(needle);
  const official = YOUTUBERS.filter((row) => (row.official || row.era === "official") && match(row));
  const pillars = YOUTUBERS.filter((row) => row.era === "foundation" && match(row)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const liveNow = YOUTUBERS.filter((row) => match(row) && pulse[row.id]?.live);
  const rest = YOUTUBERS.filter(
    (row) =>
      match(row) &&
      row.era !== "official" &&
      !row.official &&
      row.era !== "foundation" &&
      !pulse[row.id]?.live,
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Youtubers</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent hall. Twitch stays on Streamers.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          {probe === "off" || probe === "down"
            ? "Live check is off."
            : "Live or latest upload when the Data API answers. No subscriber counts."}
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <label className="mx-auto mt-3 block max-w-sm text-[10px] text-muted">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
            placeholder="Name"
            spellCheck={false}
            autoComplete="off"
          />
        </label>
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        {needle && !official.length && !pillars.length && !liveNow.length && !rest.length ? (
          <p className="text-sm text-muted">No names match.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Official</h2>
          <ul className="flex flex-col gap-2">
            {official.map((row) => (
              <Row key={row.id} row={row} pulse={pulse[row.id]} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Pillars</h2>
          <ul className="flex flex-col gap-2">
            {pillars.map((row) => (
              <Row key={row.id} row={row} pulse={pulse[row.id]} />
            ))}
          </ul>
        </section>
        {liveNow.length ? (
          <section>
            <h2 className="mb-3 text-sm font-semibold text-parchment">Live now</h2>
            <ul className="flex flex-col gap-2">
              {liveNow.map((row) => (
                <Row key={row.id} row={row} pulse={pulse[row.id]} />
              ))}
            </ul>
          </section>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Hall</h2>
          <ul className="flex flex-col gap-2">
            {rest.map((row) => (
              <Row key={row.id} row={row} pulse={pulse[row.id]} />
            ))}
          </ul>
        </section>
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/streamers">Streamers</Link>
        </p>
      </main>
    </div>
  );
}
