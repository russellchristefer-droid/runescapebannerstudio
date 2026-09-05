import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { CHANNELS, discordUrl, facebookUrl, instagramUrl, kickUrl, tiktokUrl, twitchUrl, type Channel, xUrl } from "@/data/channels";
import { OfficialSites } from "@/components/official-sites";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/streamers")({
  head: () => pageMeta("Streamers", "Independent Twitch directory for Old School RuneScape and RuneScape."),
  component: StreamersPage,
});

type Badge = "live" | "offline" | null;

function hrefs(row: Channel) {
  const out: [string, string][] = [];
  const add = (label: string, href: string) => {
    if (href) out.push([label, href]);
  };
  if (row.twitch) add("Twitch", twitchUrl(row.twitch));
  if (row.x) add("X", xUrl(row.x));
  if (row.kick) add("Kick", kickUrl(row.kick));
  if (row.tiktok) add("TikTok", tiktokUrl(row.tiktok));
  if (row.instagram) add("Instagram", instagramUrl(row.instagram));
  if (row.facebook) add("Facebook", facebookUrl(row.facebook));
  if (row.discord) add("Discord", discordUrl(row.discord));
  return out;
}

function gameLabel(game: Channel["game"]) {
  return game === "osrs" ? "Old School RuneScape" : "RuneScape";
}

function Row({ row, live, showGame }: { row: Channel; live: Record<string, Badge>; showGame?: boolean }) {
  const badge = row.twitch ? live[row.twitch.toLowerCase()] ?? null : null;
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm">
        {row.name}
        {row.official ? <span className="ml-2 text-[10px] text-faint">Official</span> : null}
        {showGame ? <span className="ml-2 text-[10px] text-faint">{gameLabel(row.game)}</span> : null}
        {badge === "live" ? (
          <span className="ml-2 rounded-sm border border-parchment px-1.5 py-0.5 text-[10px] text-parchment">Live</span>
        ) : null}
        {badge === "offline" ? <span className="ml-2 text-[10px] text-faint">Offline</span> : null}
      </span>
      <span className="flex flex-wrap gap-3 text-sm text-parchment">
        {hrefs(row).map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${row.name} on ${label}`}>
            {label}
          </a>
        ))}
        <button
          type="button"
          className="text-faint"
          onClick={() => void navigator.clipboard.writeText(row.name.replace(/[^A-Za-z0-9 _-]/g, "").slice(0, 12))}
        >
          Copy name
        </button>
      </span>
    </li>
  );
}

function StreamersPage() {
  const [livePeople, setLivePeople] = useState<Channel[]>([]);
  const [probe, setProbe] = useState<"off" | "ok" | "down">("down");
  const [q, setQ] = useState("");
  const [cut, setCut] = useState<"all" | "osrs" | "rs3" | "live">("all");
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
          for (const row of list) {
            if (!row || typeof row !== "object") continue;
            const handle = String((row as { handle?: string }).handle ?? "").toLowerCase().replace(/^@/, "");
            if (!handle || (row as { live?: unknown }).live !== true) continue;
            const game = (row as { game?: string }).game === "rs3" ? "rs3" : "osrs";
            const known = CHANNELS.find((item) => item.twitch?.toLowerCase() === handle);
            if (known) {
              if (seen.has(known.id)) continue;
              seen.add(known.id);
              next.push({ ...known, game });
              continue;
            }
            const id = `live-${handle}`;
            if (seen.has(id)) continue;
            seen.add(id);
            next.push({
              id,
              name: String((row as { displayName?: string }).displayName || handle),
              game,
              twitch: handle,
            });
          }
          setLivePeople(next);
          setProbe("ok");
        })
        .catch(() => {
          setProbe("down");
          setLivePeople([]);
        })
        .finally(() => window.clearTimeout(timer));
    };
    poll();
    const id = window.setInterval(poll, 120_000);
    document.addEventListener("visibilitychange", poll);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", poll);
      ctrl?.abort();
    };
  }, []);

  const needle = q.trim().toLowerCase();
  const match = (row: Channel) =>
    !needle ||
    row.name.toLowerCase().includes(needle) ||
    (row.twitch ?? "").toLowerCase().includes(needle);
  const gameOk = (row: Channel) =>
    cut === "all" || cut === "live" || row.game === cut;
  const official = CHANNELS.filter((row) => row.official && hrefs(row).length && match(row) && gameOk(row));
  const foundation = CHANNELS.filter((row) => row.era === "foundation" && hrefs(row).length && match(row) && gameOk(row) && cut !== "live").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const liveHandles = new Set(livePeople.map((row) => row.twitch?.toLowerCase()).filter(Boolean) as string[]);
  const officialLive: Record<string, Badge> = {};
  for (const row of official) {
    if (row.twitch && liveHandles.has(row.twitch.toLowerCase())) officialLive[row.twitch.toLowerCase()] = "live";
  }
  const liveNow = livePeople
    .filter((row) => !row.official && match(row) && (cut === "all" || cut === "live" || row.game === cut))
    .sort((a, b) => a.name.localeCompare(b.name));
  const liveBadges: Record<string, Badge> = {};
  for (const row of liveNow) {
    if (row.twitch) liveBadges[row.twitch.toLowerCase()] = "live";
  }
  const osrsRest = CHANNELS.filter(
    (row) =>
      cut !== "live" &&
      cut !== "rs3" &&
      row.game === "osrs" &&
      !row.official &&
      row.era !== "foundation" &&
      hrefs(row).length &&
      match(row) &&
      !(row.twitch && liveHandles.has(row.twitch.toLowerCase())),
  ).sort((a, b) => a.name.localeCompare(b.name));
  const rsRest = CHANNELS.filter(
    (row) =>
      cut !== "live" &&
      cut !== "osrs" &&
      row.game === "rs3" &&
      !row.official &&
      row.era !== "foundation" &&
      hrefs(row).length &&
      match(row) &&
      !(row.twitch && liveHandles.has(row.twitch.toLowerCase())),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Streamers</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent directory. We hope the links work.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          {probe === "off" || probe === "down"
            ? "Live check is off."
            : "Live badges when the check works. A missing badge is not a verdict. Open the channel to be sure."}
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <label className="mx-auto mt-3 block max-w-sm text-[10px] text-muted">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
          />
        </label>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {(["all", "osrs", "rs3", "live"] as const).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={cut === id}
              className={`min-h-11 rounded-md border px-3 text-xs ${
                cut === id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"
              }`}
              onClick={() => setCut(id)}
            >
              {id === "all" ? "All" : id === "osrs" ? "Old School" : id === "rs3" ? "RuneScape" : "Live only"}
            </button>
          ))}
        </div>
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialSites />
        {needle && !official.length && !foundation.length && !liveNow.length && !osrsRest.length && !rsRest.length ? (
          <p className="text-sm text-muted">No names match.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Official</h2>
          <ul className="flex flex-col gap-2">
            {official.map((row) => (
              <Row key={row.id} row={row} live={officialLive} showGame />
            ))}
          </ul>
        </section>
        {foundation.length ? (
          <section>
            <h2 className="mb-3 text-sm font-semibold text-parchment">Foundation</h2>
            <ul className="flex flex-col gap-2">
              {foundation.map((row) => (
                <Row key={row.id} row={row} live={{}} showGame />
              ))}
            </ul>
          </section>
        ) : null}
        {liveNow.length ? (
          <section>
            <h2 className="mb-3 text-sm font-semibold text-parchment">Live now</h2>
            <ul className="flex flex-col gap-2">
              {liveNow.map((row) => (
                <Row key={row.id} row={row} live={liveBadges} showGame />
              ))}
            </ul>
          </section>
        ) : probe === "ok" ? (
          <p className="text-sm text-muted">No listed Twitch channel is live.</p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Old School RuneScape</h2>
          <ul className="flex flex-col gap-2">
            {osrsRest.map((row) => (
              <Row key={row.id} row={row} live={{}} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">RuneScape</h2>
          <ul className="flex flex-col gap-2">
            {rsRest.map((row) => (
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
