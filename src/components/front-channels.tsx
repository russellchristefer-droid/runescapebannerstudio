import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DIRECTORIES, STREAMERS, type Streamer } from "@/lib/streamers";
import { checkTwitchLive, twitchHref, twitchLogin } from "@/lib/live";

function takeLive(rows: Streamer[], live: Record<string, string>, n: number) {
  return rows
    .filter((person) => person.twitch && live[twitchLogin(person.twitch)])
    .sort((a, b) =>
      live[twitchLogin(b.twitch)].localeCompare(live[twitchLogin(a.twitch)]),
    )
    .slice(0, n);
}

export function FrontChannels() {
  const [list, setList] = useState<Streamer[]>(STREAMERS);
  const [live, setLive] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = false;
    const tick = () => {
      const hour = Math.floor(Date.now() / 3_600_000);
      fetch(`/streamers.json?h=${hour}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (stop) return {};
          const next = Array.isArray(data) && data.length ? data : STREAMERS;
          setList(next);
          const logins = next
            .map((person: Streamer) => person.twitch)
            .filter(Boolean) as string[];
          return checkTwitchLive(logins);
        })
        .then((nextLive) => {
          if (stop) return;
          if (nextLive && typeof nextLive === "object") {
            setLive(nextLive as Record<string, string>);
          }
          setReady(true);
        })
        .catch(() => {
          if (!stop) setReady(true);
        });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const onNow = useMemo(() => takeLive(list, live, 3), [list, live]);

  return (
    <section className="border-b border-line px-3 py-3 md:px-8">
      <h2 className="mb-2 text-center text-sm font-semibold">
        Live streamers
      </h2>
      {onNow.length ? (
        <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-3">
          {onNow.map((person) => (
            <li key={person.name}>
              <a
                href={twitchHref(person.twitch)}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md border border-line bg-raised px-3 py-2 text-center text-sm"
              >
                <span className="font-medium text-fg">{person.name}</span>
                <span className="mt-1 block text-[10px] tracking-wide text-[#c62828]">
                  LIVE · {live[twitchLogin(person.twitch)]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-xs text-muted">
          {ready ? "No listed channel is live." : "Checking who is live…"}
        </p>
      )}
      <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
        <Link to="/streamers" className="text-parchment">
          All channels
        </Link>
        {DIRECTORIES.slice(0, 2).map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-parchment"
          >
            {item.name}
          </a>
        ))}
      </p>
    </section>
  );
}
