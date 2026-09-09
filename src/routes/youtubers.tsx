import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { YOUTUBERS, tubeUrl, type Youtuber } from "@/data/youtubers";
import { OfficialSites } from "@/components/official-sites";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/youtubers")({
  head: () => pageMeta("Youtubers", "Independent YouTube directory for Old School RuneScape and RuneScape."),
  component: YoutubersPage,
});

type Badge = "live" | null;

function Row({
  row,
  live,
  viewers,
  titles,
}: {
  row: Youtuber;
  live: Record<string, Badge>;
  viewers?: Record<string, number>;
  titles?: Record<string, string>;
}) {
  const href = tubeUrl(row.youtube);
  if (!href) return null;
  const key = row.youtube.replace(/^@/, "").toLowerCase();
  const badge = live[key] ?? live[row.id] ?? null;
  const count = viewers?.[key] ?? viewers?.[row.id];
  const title = titles?.[key] ?? titles?.[row.id];
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm">
        {row.name}
        {row.official || row.era === "official" ? (
          <span className="ml-2 text-[10px] text-faint">Official</span>
        ) : row.era === "foundation" ? (
          <span className="ml-2 text-[10px] text-faint">Pillar</span>
        ) : null}
        {badge === "live" ? (
          <span className="ml-2 text-[10px] text-faint">
            {row.game === "rs3" ? "RuneScape" : row.game === "both" ? "Both" : "Old School"}
          </span>
        ) : null}
        {badge === "live" ? (
          <span className="ml-2 rounded-sm bg-[#9b1b1b] px-1.5 py-0.5 text-[10px] tracking-[0.08em] text-[#efe4c8] uppercase">
            Live{typeof count === "number" ? ` · ${count.toLocaleString("en-GB")}` : ""}
          </span>
        ) : null}
        {badge === "live" && title ? <span className="mt-1 block text-[12px] text-muted">{title}</span> : null}
      </span>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${row.name} on YouTube`} className="text-sm text-parchment">
        YouTube
      </a>
    </li>
  );
}

function YoutubersPage() {
  const [livePeople, setLivePeople] = useState<Youtuber[]>([]);
  const [viewers, setViewers] = useState<Record<string, number>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [probe, setProbe] = useState<"off" | "ok" | "down">("down");
  const [q, setQ] = useState("");

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
      const timer = window.setTimeout(() => mine.abort(), 25000);
      fetch("/api/youtube-live", { cache: "no-store", signal: mine.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!data) {
            setProbe((was) => (was === "ok" ? "ok" : "down"));
            return;
          }
          if (data.off) {
            setProbe("off");
            setLivePeople([]);
            return;
          }
          if (data.ok === false) {
            setProbe((was) => (was === "ok" ? "ok" : "down"));
            return;
          }
          const list = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : [];
          const next: Youtuber[] = [];
          const seen = new Set<string>();
          const counts: Record<string, number> = {};
          const nextTitles: Record<string, string> = {};
          for (const raw of list) {
            if (!raw || typeof raw !== "object") continue;
            const row = raw as {
              id?: string;
              handle?: string;
              live?: unknown;
              game?: string;
              viewers?: number;
              displayName?: string;
              title?: string;
            };
            const handle = String(row.handle ?? "").toLowerCase().replace(/^@/, "");
            if (!handle || row.live !== true) continue;
            const watch = Number(row.viewers);
            if (Number.isFinite(watch) && watch > 0) counts[handle] = watch;
            const heading = String(row.title ?? "").trim();
            if (heading) nextTitles[handle] = heading.slice(0, 80);
            const known = YOUTUBERS.find(
              (item) =>
                item.id === row.id ||
                item.youtube.replace(/^@/, "").toLowerCase() === handle ||
                item.youtube.toLowerCase().endsWith(`/${handle}`),
            );
            if (known) {
              if (seen.has(known.id)) continue;
              seen.add(known.id);
              next.push(known);
              continue;
            }
            const id = `live-${handle}`;
            if (seen.has(id)) continue;
            seen.add(id);
            next.push({
              id,
              name: String(row.displayName || handle),
              game: row.game === "rs3" ? "rs3" : "osrs",
              youtube: handle,
              era: "current",
            });
          }
          setLivePeople(next);
          setViewers(counts);
          setTitles(nextTitles);
          setProbe("ok");
        })
        .catch(() => {
          setProbe((was) => (was === "ok" ? "ok" : "down"));
        })
        .finally(() => window.clearTimeout(timer));
    };
    poll();
    const id = window.setInterval(poll, 45_000);
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
    !needle ||
    row.name.toLowerCase().includes(needle) ||
    row.youtube.toLowerCase().includes(needle);
  const liveKeys = new Set(
    livePeople.flatMap((row) => [row.id, row.youtube.replace(/^@/, "").toLowerCase()]),
  );
  const liveBadges: Record<string, Badge> = {};
  for (const key of liveKeys) liveBadges[key] = "live";

  const liveNow = livePeople
    .filter((row) => match(row))
    .sort((a, b) => {
      const av = viewers[a.youtube.replace(/^@/, "").toLowerCase()] ?? 0;
      const bv = viewers[b.youtube.replace(/^@/, "").toLowerCase()] ?? 0;
      return bv - av || a.name.localeCompare(b.name);
    });
  const rest = YOUTUBERS.filter((row) => match(row) && !liveKeys.has(row.id) && !liveKeys.has(row.youtube.replace(/^@/, "").toLowerCase())).sort(
    (a, b) =>
      Number(Boolean(b.official || b.era === "official")) - Number(Boolean(a.official || a.era === "official")) ||
      Number(b.era === "foundation") - Number(a.era === "foundation") ||
      a.name.localeCompare(b.name),
  );
  const hall = [...liveNow, ...rest.filter((row) => !liveNow.some((live) => live.id === row.id))];

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Youtubers</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Who is live on Old School and RuneScape right now. The hall stays underneath. Twitch stays on Streamers.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          {probe === "off" || probe === "down"
            ? "Live check is off."
            : `${liveNow.filter((row) => row.game !== "rs3").length} live Old School · ${liveNow.filter((row) => row.game === "rs3").length} live RuneScape. Refresh every 45s while this tab is open.`}
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
        <OfficialSites />
        {needle && !hall.length ? <p className="text-sm text-muted">No names match.</p> : null}
        {probe === "ok" && !liveNow.length ? (
          <p className="text-sm text-muted">No listed YouTube channel is live.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Hall</h2>
          <ul className="flex flex-col gap-2">
            {hall.map((row) => (
              <Row key={row.id} row={row} live={liveBadges} viewers={viewers} titles={titles} />
            ))}
          </ul>
        </section>
        <p className="text-sm text-muted">
          Live worlds sit on{" "}
          <a
            className="text-parchment"
            href="https://www.youtube.com/results?search_query=old+school+runescape&sp=EgJAAQ%253D%253D"
            target="_blank"
            rel="noopener noreferrer"
          >
            Old School
          </a>
          {" · "}
          <a
            className="text-parchment"
            href="https://www.youtube.com/results?search_query=runescape+3&sp=EgJAAQ%253D%253D"
            target="_blank"
            rel="noopener noreferrer"
          >
            RuneScape
          </a>
          . This hall is the names we keep. No subscriber counts.
        </p>
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/streamers">Streamers</Link>
        </p>
      </main>
    </div>
  );
}
