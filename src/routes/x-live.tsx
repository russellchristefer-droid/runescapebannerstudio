import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { readDesk } from "@/desk/store";
import { sanitizeDisplayName, sanitizeWorld } from "@/lib/rsText";
import { pageMeta } from "@/lib/page-title";
import { OfficialSites } from "@/components/official-sites";
import { X_HALL, xGameLabel, xProfile, type XGame, type XVoice } from "@/data/x-hall";

export const Route = createFileRoute("/x-live")({
  head: () =>
    pageMeta(
      "X live",
      "Go live on X with Old School RuneScape, RuneScape, or Dragonwilds. Hall of public handles. This desk never takes a stream key.",
    ),
  component: XLivePage,
});

type Badge = "live" | null;

function titleLine() {
  const saved = readDesk();
  const name = sanitizeDisplayName(saved.streamer ?? "");
  const world = sanitizeWorld(saved.world ?? "");
  const category = saved.edition === "RS3" ? "RuneScape" : "Old School RuneScape";
  return [name || "Display name", world ? `World ${world}` : "", category].filter(Boolean).join(" · ");
}

function Row({
  row,
  live,
  viewers,
  titles,
}: {
  row: XVoice;
  live: Record<string, Badge>;
  viewers?: Record<string, number>;
  titles?: Record<string, string>;
}) {
  const href = xProfile(row.handle);
  if (!href) return null;
  const key = row.handle.replace(/^@/, "").trim();
  const badge = live[key.toLowerCase()] ?? live[row.id] ?? null;
  const count = viewers?.[key.toLowerCase()] ?? viewers?.[row.id];
  const title = titles?.[key.toLowerCase()] ?? titles?.[row.id];
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-start sm:justify-between">
      <span className="text-sm">
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-parchment">
          {row.name}
        </a>
        {row.official ? <span className="ml-2 text-[10px] text-faint">Official</span> : null}
        {badge === "live" ? <span className="ml-2 text-[10px] text-faint">{xGameLabel(row.game)}</span> : null}
        {badge === "live" ? (
          <span className="ml-2 rounded-sm bg-[#9b1b1b] px-1.5 py-0.5 text-[10px] tracking-[0.08em] text-[#efe4c8] uppercase">
            Live{typeof count === "number" ? ` · ${count.toLocaleString("en-GB")}` : ""}
          </span>
        ) : null}
        {badge === "live" && title ? <span className="mt-1 block text-[12px] text-muted">{title}</span> : null}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${row.name} on X`}
        className="min-h-11 text-sm text-parchment [touch-action:manipulation]"
      >
        @{key}
      </a>
    </li>
  );
}

function XLivePage() {
  const [note, setNote] = useState("");
  const [livePeople, setLivePeople] = useState<XVoice[]>([]);
  const [viewers, setViewers] = useState<Record<string, number>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [probe, setProbe] = useState<"off" | "ok" | "down">("down");
  const [q, setQ] = useState("");
  const title = titleLine();

  useEffect(() => {
    if (import.meta.env.VITE_X_LIVE === "false") {
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
      fetch("/api/x-live", { cache: "no-store", signal: mine.signal })
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
          const next: XVoice[] = [];
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
            const known = X_HALL.find((item) => item.id === row.id || item.handle.replace(/^@/, "").toLowerCase() === handle);
            if (known) {
              if (seen.has(known.id)) continue;
              seen.add(known.id);
              next.push(known);
              continue;
            }
            const id = `live-${handle}`;
            if (seen.has(id)) continue;
            seen.add(id);
            const game: XGame = row.game === "rs3" ? "rs3" : row.game === "dw" ? "dw" : "osrs";
            next.push({
              id,
              name: String(row.displayName || handle),
              handle,
              game,
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
  const match = (row: XVoice) =>
    !needle || row.name.toLowerCase().includes(needle) || row.handle.toLowerCase().includes(needle);
  const liveKeys = new Set(livePeople.flatMap((row) => [row.id, row.handle.replace(/^@/, "").toLowerCase()]));
  const liveBadges: Record<string, Badge> = {};
  for (const key of liveKeys) liveBadges[key] = "live";
  const liveNow = livePeople
    .filter((row) => match(row))
    .sort((a, b) => {
      const av = viewers[a.handle.replace(/^@/, "").toLowerCase()] ?? 0;
      const bv = viewers[b.handle.replace(/^@/, "").toLowerCase()] ?? 0;
      return bv - av || a.name.localeCompare(b.name);
    });
  const rest = X_HALL.filter(
    (row) => match(row) && !liveKeys.has(row.id) && !liveKeys.has(row.handle.replace(/^@/, "").toLowerCase()),
  ).sort(
    (a, b) => Number(Boolean(b.official)) - Number(Boolean(a.official)) || a.name.localeCompare(b.name),
  );
  const hall = [...liveNow, ...rest.filter((row) => !liveNow.some((live) => live.id === row.id))];
  const liveOsrs = liveNow.filter((row) => row.game === "osrs").length;
  const liveRs3 = liveNow.filter((row) => row.game === "rs3").length;
  const liveDw = liveNow.filter((row) => row.game === "dw").length;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">X live</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Who is on X for Old School, RuneScape, and Dragonwilds. Live first if the probe is on — only when the Space title is one of those games. How to go live stays underneath. This page never takes a stream key.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          {probe === "off" || probe === "down"
            ? "Live check is off."
            : `${liveOsrs} live Old School · ${liveRs3} live RuneScape · ${liveDw} live Dragonwilds. Refresh every 45s while this tab is open.`}
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
          <p className="text-sm text-muted">No listed X Space is live.</p>
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
          Live check looks for Spaces when a bearer token exists. Media Studio broadcasts stay on X. Twitch stays on Twitch Streamers. YouTube stays on YouTube.
        </p>

        <p className="text-sm leading-relaxed text-muted">
          Pick the grammar you are actually logged into. Do not put both clients on one canvas. Dragonwilds is a third name — not these two. Phone is for talking. The raid door is OBS capturing that Jagex window, then X Live Studio.
        </p>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h2 className="mb-2 text-sm font-semibold text-parchment">Old School RuneScape</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>
                Open the{" "}
                <a className="text-parchment" href="https://www.jagex.com/launcher" target="_blank" rel="noopener noreferrer">
                  Jagex Launcher
                </a>
                . Play Old School RuneScape. Official client window is usually named Old School RuneScape. If you use RuneLite, capture the RuneLite window instead — still one game.
              </li>
              <li>Log in. Park somewhere safe before you go live: Lumbridge, a POH, a bank that is not about to show a PIN. Write the world number down. It goes in the title.</li>
              <li>
                Title on X must say <span className="font-mono text-xs text-fg">Old School RuneScape</span> in full once. Then the activity: ToB learners, Inferno attempts, 99 RC, wildy roam. Example:{" "}
                <span className="font-mono text-xs text-fg">OSRS ToB learners · W418</span>. One hashtag at most: #OSRS.
              </li>
              <li>OBS Window Capture or Game Capture that one window. Not the launcher. Not Discord. Not the second client.</li>
              <li>House, GE, raids: 0–2s delay so callouts stay tight. Slayer: about 3s. Wilderness or a PvP world: 6–8s, and do not call exact tiles. You are allowed to enjoy the fight.</li>
            </ol>
          </div>
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h2 className="mb-2 text-sm font-semibold text-parchment">RuneScape</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>
                Same{" "}
                <a className="text-parchment" href="https://www.jagex.com/launcher" target="_blank" rel="noopener noreferrer">
                  Jagex Launcher
                </a>
                . Play RuneScape — the NXT client, not Old School. Window name is usually RuneScape. Alt1 is an overlay; capture the game window, not a tiny Alt1 panel.
              </li>
              <li>Log in. Park at a bank, Prif, or War’s Retreat before you go live. World 84 is the public PvM hall if that is the session — put the world in the title if it matters.</li>
              <li>
                Title on X must say <span className="font-mono text-xs text-fg">RuneScape</span> once. Then the boss or skill: Telos streak, Rasial log, first Solak. Example:{" "}
                <span className="font-mono text-xs text-fg">Telos streak · maxed · W84</span>. One hashtag at most: #RuneScape. Do not write Old School in that post.
              </li>
              <li>OBS Window Capture that RuneScape window. NXT eats a GPU. 1080p60 is fine if the machine is calm; 720p60 is the honest default when the kill is busy.</li>
              <li>Raids and boss rooms: short delay. Overworld: a couple of seconds. Do not show the PIN pad, the GE offer you would rather keep, or a second account’s login.</li>
            </ol>
          </div>
        </section>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Put that window on X</h2>
            <p className="mt-2 text-sm text-muted">
              Same steps for both games. You already have one client open. OBS encodes it. Live Studio is the door. Desktop RTMP needs X Premium — confirm the current tier on X help.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2.5 px-4 py-4 pl-9 text-sm leading-relaxed text-muted">
            <li>Plug into wired ethernet if you can. Wifi will drop an ice barrage. Close other uploads.</li>
            <li>
              Install{" "}
              <a className="text-parchment" href="https://obsproject.com/" target="_blank" rel="noopener noreferrer">
                OBS Studio
              </a>{" "}
              if you do not have it. New scene: LIVE. + Sources → Window Capture. Pick Old School RuneScape, RuneLite, or RuneScape — the window you just logged into. If it is black, try Game Capture on that same window.
            </li>
            <li>Audio Input Capture for the mic. Game audio on its own slider. Speak. Mic bar moves. Game sits under your voice. Old School sound is quiet; do not bury the prayer flick.</li>
            <li>Settings → Video: 1920×1080, or 1280×720 for NXT. 60fps, or 30 on a bank stand. Output → Streaming: H.264, CBR 6000, keyframe 3 seconds, AAC 128. Apply.</li>
            <li>Second scene: PIN. Cam or a still from this desk. Hotkey it now. Bank, login, and Jagex account mail never sit on LIVE.</li>
            <li>
              Open{" "}
              <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
                Live Studio
              </a>
              . New livestream. Paste the title below — it already has Old School RuneScape or RuneScape from your desk. Public unless you are testing.
            </li>
            <li>Create an RTMP source if you do not have one. Region closest to you. Copy the RTMP URL and stream key into OBS only: Settings → Stream → Custom. Never into this site, Discord, or a screenshot.</li>
            <li>Start Streaming in OBS. Watch Live Studio. You should see Gielinor, not a desktop. Wrong window: pick again. Then Go Live. Pin the post.</li>
            <li>Play that one game. If you hop to the other client, end this stream and start a new post with the other name. Do not leave both in the title.</li>
            <li>
              Stop Streaming in OBS, then End in Live Studio. After a kc, cut on{" "}
              <Link to="/edit" className="text-parchment">
                Clips
              </Link>
              .
            </li>
          </ol>
        </div>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Phone</h2>
            <p className="mt-2 text-sm text-muted">
              Talking about the game, not encoding the client. Say which grammar. Public account. No stream key.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2.5 px-4 py-4 pl-9 text-sm leading-relaxed text-muted">
            <li>Open the X app on the account people already follow for RuneScape. Public, not locked.</li>
            <li>Composer → Live. Allow camera and mic if the phone asks.</li>
            <li>
              Title still names one game: Old School RuneScape or RuneScape, then the activity. Same line as the desk. Do not point the camera at a Bank PIN, mail, or a mobile login.
            </li>
            <li>Go live. Talk like a clan call. If you hold the phone at a laptop, the laptop should already be on that one client — not your desktop full of tabs.</li>
            <li>Stop and confirm when you are done. A clip of the client itself still wants the OBS door above.</li>
          </ol>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">Title</h2>
          <p className="mb-3 text-sm leading-relaxed text-muted">
            Pulled from the name, world, and edition on your still desk. Change those there if you swapped from Old School to RuneScape. Copy so the X post matches the window you captured.
          </p>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              className="min-h-11 rounded-md border border-line px-3 py-2 text-parchment"
              onClick={() => {
                void navigator.clipboard.writeText(title);
                setNote("Title copied. Paste it into Live Studio.");
              }}
            >
              Copy title
            </button>
            <span className="font-mono text-xs text-muted">{title}</span>
            {note ? <span className="text-[10px] text-faint">{note}</span> : null}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Header still is 1500×500 on the{" "}
            <Link to="/" className="text-parchment">
              still desk
            </Link>
            , X header crop. Make it before the hour, not during a freeze.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">OBS, in one glance</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              <li>Capture Old School RuneScape, RuneLite, or RuneScape — one window.</li>
              <li>Custom RTMP. Key stays in OBS. 1080p60 CBR 6000, or 720p60 if NXT is hot. Keyframe 3s. AAC 128.</li>
              <li>PIN scene on a hotkey. Wildy: 6–8s delay, no tile calls.</li>
            </ul>
          </div>
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">If something sulks</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              <li>Black preview: you captured the launcher or Discord. Pick the game window.</li>
              <li>Two clients visible: end the stream. One grammar per post.</li>
              <li>NXT choppy: 720p60 before you raise bitrate.</li>
              <li>No Live Studio: Premium. X help is the rule.</li>
              <li>Failed to connect: new RTMP source, paste into OBS only.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-md border border-line bg-raised px-3 py-3">
          <h3 className="mb-2 text-sm font-semibold text-parchment">Kind rules</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
            <li>One game name. Old School RuneScape or RuneScape. Not both. Dragonwilds is its own post.</li>
            <li>Do not paste a stream key here. Do not show a PIN, mail, or recovery.</li>
            <li>Do not promise Drops you do not control.</li>
            <li>Do not call wildy tiles on 0 delay.</li>
          </ul>
        </section>

        <p className="text-sm leading-relaxed text-muted">
          Official notes:{" "}
          <a className="text-parchment" href="https://oldschool.runescape.com/" target="_blank" rel="noopener noreferrer">
            Old School
          </a>
          {" · "}
          <a className="text-parchment" href="https://www.runescape.com/" target="_blank" rel="noopener noreferrer">
            RuneScape
          </a>
          {" · "}
          <a className="text-parchment" href="https://help.x.com/en/using-x/x-live" target="_blank" rel="noopener noreferrer">
            Go live on X
          </a>
          {" · "}
          <a className="text-parchment" href="https://help.x.com/en/using-x/live-studio" target="_blank" rel="noopener noreferrer">
            Live Studio
          </a>
          {" · "}
          <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
            Open Live Studio
          </a>
          . Fan sheet. Jagex and X keep the rules. You keep the key.
        </p>
        <p className="text-sm text-parchment">
          <Link to="/stream">Stream</Link>
          {" · "}
          <Link to="/streamers">Twitch Streamers</Link>
          {" · "}
          <Link to="/youtubers">YouTube</Link>
          {" · "}
          <Link to="/discord">Discord</Link>
          {" · "}
          <Link to="/edit">Clips</Link>
          {" · "}
          <Link to="/">Desk</Link>
        </p>
      </main>
    </div>
  );
}
