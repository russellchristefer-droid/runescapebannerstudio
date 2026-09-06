import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { CHANNELS, discordUrl, kickUrl, twitchUrl, type Channel, xUrl } from "@/data/channels";
import { OfficialSites } from "@/components/official-sites";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/streamers")({
  head: () => pageMeta("Streamers", "Independent Twitch directory for Old School RuneScape and RuneScape."),
  component: StreamersPage,
});

type Badge = "live" | null;

function hallLinks(row: Channel) {
  const out: [string, string][] = [];
  if (row.twitch) out.push(["Twitch", twitchUrl(row.twitch)]);
  if (row.kick) out.push(["Kick", kickUrl(row.kick)]);
  if (row.x) out.push(["X", xUrl(row.x)]);
  if (row.discord) out.push(["Discord", discordUrl(row.discord)]);
  return out;
}

function Row({
  row,
  live,
  viewers,
  titles,
}: {
  row: Channel;
  live: Record<string, Badge>;
  viewers?: Record<string, number>;
  titles?: Record<string, string>;
}) {
  const key = row.twitch?.toLowerCase() ?? "";
  const badge = key ? live[key] ?? null : null;
  const count = key ? viewers?.[key] : undefined;
  const title = key ? titles?.[key] : undefined;
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm">
        {row.name}
        {row.official ? <span className="ml-2 text-[10px] text-faint">Official</span> : null}
        {badge === "live" ? (
          <span className="ml-2 rounded-sm border border-parchment px-1.5 py-0.5 text-[10px] text-parchment">
            Live{typeof count === "number" ? ` · ${count}` : ""}
          </span>
        ) : null}
        {badge === "live" && title ? <span className="mt-1 block text-[12px] text-muted">{title}</span> : null}
      </span>
      <span className="flex flex-wrap gap-3 text-sm text-parchment">
        {hallLinks(row).map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${row.name} on ${label}`}>
            {label}
          </a>
        ))}
      </span>
    </li>
  );
}

function StreamersPage() {
  const [livePeople, setLivePeople] = useState<Channel[]>([]);
  const [viewers, setViewers] = useState<Record<string, number>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [probe, setProbe] = useState<"off" | "ok" | "down">("down");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (import.meta.env.VITE_TWITCH_LIVE === "false") {
      setProbe("off");
      return;
    }
    let ctrl: AbortController | undefined;
    const poll = () => {
      if (document.visibilityState !== "visible") return;
      ctrl?.abort();
      ctrl = new AbortController();
      const mine = ctrl;
      const timer = window.setTimeout(() => mine.abort(), 3000);
      fetch("/api/twitch-live", { cache: "no-store", signal: mine.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!data) {
            setProbe("down");
            setLivePeople([]);
            return;
          }
          if (data.off) {
            setProbe("off");
            setLivePeople([]);
            return;
          }
          if (data.ok === false) {
            setProbe("down");
            setLivePeople([]);
            return;
          }
          const list = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : [];
          const next: Channel[] = [];
          const seen = new Set<string>();
          const counts: Record<string, number> = {};
          const nextTitles: Record<string, string> = {};
          for (const raw of list) {
            if (!raw || typeof raw !== "object") continue;
            const row = raw as {
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
            if (Number.isFinite(watch)) counts[handle] = watch;
            const heading = String(row.title ?? "").trim();
            if (heading) nextTitles[handle] = heading.slice(0, 80);
            const known = CHANNELS.find((item) => item.twitch?.toLowerCase() === handle);
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
              twitch: handle,
            });
          }
          setLivePeople(next);
          setViewers(counts);
          setTitles(nextTitles);
          setProbe("ok");
        })
        .catch(() => {
          setProbe("down");
          setLivePeople([]);
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
  const match = (row: Channel) =>
    !needle ||
    row.name.toLowerCase().includes(needle) ||
    (row.twitch ?? "").toLowerCase().includes(needle);
  const liveHandles = new Set(livePeople.map((row) => row.twitch?.toLowerCase()).filter(Boolean) as string[]);
  const liveBadges: Record<string, Badge> = {};
  for (const handle of liveHandles) liveBadges[handle] = "live";

  const official = CHANNELS.filter((row) => row.official && hallLinks(row).length && match(row));
  const liveNow = livePeople
    .filter((row) => match(row))
    .sort((a, b) => {
      const av = viewers[a.twitch?.toLowerCase() ?? ""] ?? 0;
      const bv = viewers[b.twitch?.toLowerCase() ?? ""] ?? 0;
      return bv - av || a.name.localeCompare(b.name);
    });
  const rest = CHANNELS.filter(
    (row) =>
      !row.official &&
      hallLinks(row).length &&
      match(row) &&
      !(row.twitch && liveHandles.has(row.twitch.toLowerCase())),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Streamers</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent hall. YouTube stays on Youtubers.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          {probe === "off" || probe === "down"
            ? "Live check is off."
            : "Live first when Helix answers. A missing badge is not a verdict."}
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
        {needle && !official.length && !liveNow.length && !rest.length ? (
          <p className="text-sm text-muted">No names match.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Official</h2>
          <ul className="flex flex-col gap-2">
            {official.map((row) => (
              <Row key={row.id} row={row} live={liveBadges} viewers={viewers} titles={titles} />
            ))}
          </ul>
        </section>
        {liveNow.length ? (
          <section>
            <h2 className="mb-3 text-sm font-semibold text-parchment">Live now</h2>
            <ul className="flex flex-col gap-2">
              {liveNow.map((row) => (
                <Row key={row.id} row={row} live={liveBadges} viewers={viewers} titles={titles} />
              ))}
            </ul>
          </section>
        ) : probe === "ok" ? (
          <p className="text-sm text-muted">No listed Twitch channel is live.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Hall</h2>
          <ul className="flex flex-col gap-2">
            {rest.map((row) => (
              <Row key={row.id} row={row} live={{}} />
            ))}
          </ul>
        </section>
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/youtubers">Youtubers</Link>
        </p>
      </main>
    </div>
  );
}
