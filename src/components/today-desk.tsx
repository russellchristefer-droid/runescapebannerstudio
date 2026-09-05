import { pad, untilUtcHour, untilUtcMidnight } from "@/lib/clock";
import { eggToast, sessionOnce } from "@/lib/eggs";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { useEffect, useRef, useState } from "react";

function weekday(now: Date) {
  return now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function TodayDesk() {
  const stamp = useVisibleNow();
  const now = new Date(stamp);
  const [stale, setStale] = useState(false);
  const prevHour = useRef<number | null>(null);
  useEffect(() => {
    const hour = now.getUTCHours();
    if (prevHour.current === 23 && hour === 0 && sessionOnce("rs-egg-midnight")) {
      eggToast("Bob has seen the shops restock. He is unmoved.");
    }
    prevHour.current = hour;
    setStale(false);
  }, [stamp]);
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") return;
      setStale(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  const reset = untilUtcMidnight(now);
  const hour = untilUtcHour(now);
  const day = now.getUTCDay();
  const utcH = now.getUTCHours();
  return (
    <section className="page-band py-6">
      <h2 className="mb-1 text-center text-sm font-semibold">Today</h2>
      <p className="mb-3 text-center font-mono text-xs tabular-nums text-muted">
        {weekday(now)} · {pad(utcH)}:{pad(now.getUTCMinutes())}:
        {pad(now.getUTCSeconds())} UTC
        {stale ? " · clock stale" : ""}
      </p>
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        <article>
          <h3 className="mb-2 text-sm font-semibold">Old School RuneScape</h3>
          <ul className="space-y-1.5 text-xs text-muted">
            <li>
              Daily reset in {reset} (00:00 UTC). Herb runs, birdhouses, battlestaves,
              and shop caps flip then. Worlds hitch for a few minutes after.
            </li>
            <li>
              {day === 3
                ? "Wednesday update window. Do not title the stream as a patch until the official post is live."
                : "Updates usually Wednesday. Do not promise a patch stream today unless Jagex already posted."}
            </li>
            <li>
              Set the Twitch category to Old School RuneScape before you go live.
              Title the activity, not the gear.
            </li>
            <li>
              {utcH >= 18 && utcH < 23
                ? "Peak EU/US overlap. Expect full worlds and longer GE queues."
                : "Off-peak relative to EU prime. Good for teaching and first-hour bosses."}
            </li>
            <li>
              Drops and league promos only count when the official LootScape or news
              post says they are on.
            </li>
          </ul>
        </article>
        <article>
          <h3 className="mb-2 text-sm font-semibold">RuneScape</h3>
          <ul className="space-y-1.5 text-xs text-muted">
            <li>
              Daily reset in {reset} (00:00 UTC). Challenges, ports, cache, Fort
              contracts, and travelling merchant stock flip then.
            </li>
            <li>
              Voice of Seren flips on the hour. Next in {hour} (UTC hour). Desk
              estimate — not a clan table.{" "}
              <a
                href="https://runescape.wiki/w/Voice_of_Seren"
                className="text-parchment"
                target="_blank"
                rel="noreferrer"
              >
                Wiki
              </a>
              .
            </li>
            <li>
              {day === 1
                ? "Monday update window. Wait for the official post before you read notes on stream."
                : "Updates usually Monday. Do not promise a patch stream today unless Jagex already posted."}
            </li>
            <li>
              Set the Twitch category to RuneScape, not Old School. Title the boss
              or grind, not the overlay.
            </li>
            <li>
              {utcH >= 18 && utcH < 23
                ? "Peak overlap. War's Retreat and hubs will be busy."
                : "Quieter worlds. Good for learner PvM and first enrage holds."}
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
