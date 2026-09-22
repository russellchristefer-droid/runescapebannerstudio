import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { HERO_PERIOD_MS, formatRemain, heroStillIndex } from "@/lib/still-clock";
import { bobLine, placeSlug } from "@/lib/bob-lines";
import { type Edition } from "@/lib/locations";
import { type HeroChip, gameLabel, heroPool } from "@/lib/hero-pools";
import { BobPic } from "@/components/bob-pic";

const HALLS = [
  { to: "/streamers", label: "Twitch", aria: "Twitch Streamers", src: "/brands/twitch.svg" },
  { to: "/youtubers", label: "YouTube", aria: "YouTube", src: "/brands/youtube.svg" },
  { to: "/x-live", label: "X", aria: "X", src: "/brands/x.svg" },
] as const;

const ERAS = [
  ["RSC", "Classic"],
  ["OSRS", "Old School"],
  ["RS3", "RuneScape"],
] as const;

function HallChip({
  to,
  label,
  aria,
  src,
}: {
  to: string;
  label: string;
  aria: string;
  src: string;
}) {
  const [mark, setMark] = useState(true);
  return (
    <Link
      to={to}
      aria-label={aria}
      className="rs-chip min-h-11 gap-2 text-xs"
    >
      {mark ? (
        <img
          src={src}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4"
          onError={() => setMark(false)}
        />
      ) : null}
      {label}
    </Link>
  );
}

function heroFromSearch(): HeroChip {
  if (typeof window === "undefined") return "OSRS";
  const hero = new URLSearchParams(window.location.search).get("hero")?.toLowerCase();
  if (hero === "classic" || hero === "rsc") return "RSC";
  if (hero === "rs3") return "RS3";
  return "OSRS";
}

export function TownHero({
  onTown,
}: {
  onTown?: (name: string, edition: Edition) => void;
}) {
  const [edition, setEdition] = useState<HeroChip>(heroFromSearch);
  const [origin, setOrigin] = useState(() => Date.now());
  const [skip, setSkip] = useState(0);
  const pool = heroPool(edition);
  const now = useVisibleNow();
  const clock = Math.max(0, now - origin);
  const n = pool.length;
  const idx = n ? (heroStillIndex(n, clock) + skip) % n : 0;
  const shot = pool[idx] ?? pool[0];
  const next = n ? pool[(idx + 1) % n] : undefined;
  const [shown, setShown] = useState(shot?.src);
  const remain = HERO_PERIOD_MS - (clock % HERO_PERIOD_MS);
  const gameKey = edition === "RS3" ? "rs3" : edition === "RSC" ? "rsc" : "osrs";
  const quote = bobLine(gameKey, placeSlug(shot?.name || ""), now);

  const [caption, setCaption] = useState(shot?.name ?? "");

  useEffect(() => {
    if (!shot?.src) return;
    const img = new Image();
    img.onload = () => {
      setShown(shot.src);
      setCaption(shot.name);
      if (edition !== "RSC") onTown?.(shot.name, edition);
    };
    img.onerror = () => setSkip((count) => count + 1);
    img.src = shot.src;
  }, [shot?.src, shot?.name, edition]);

  useEffect(() => {
    if (!next?.src) return;
    const img = new Image();
    img.src = next.src;
  }, [next?.src]);

  function pick(nextChip: HeroChip) {
    setEdition(nextChip);
    setOrigin(Date.now());
    setSkip(0);
    const first = heroPool(nextChip)[0];
    if (first) setShown(first.src);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("hero", nextChip === "RSC" ? "classic" : nextChip === "RS3" ? "rs3" : "osrs");
      window.history.replaceState(null, "", url);
    }
  }

  const game = gameLabel(edition);
  const name = caption || shot?.name || "Town";

  return (
    <section id="hero" className="border-b border-line bg-raised">
      <nav aria-label="Stream halls" className="flex flex-wrap justify-center gap-2 px-3 py-3 md:px-8">
        {HALLS.map((hall) => (
          <HallChip key={hall.to} {...hall} />
        ))}
      </nav>
      <div className="rs-panel relative w-full overflow-hidden bg-[#1a1612]" style={{ aspectRatio: "1200 / 480" }}>
        {shown ? (
          <img
            src={shown}
            width={1200}
            height={480}
            alt={`${name}, town, ${game}`}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">Still needed.</p>
        )}
        <div className="absolute bottom-2 left-2 z-10 flex flex-wrap gap-1 rounded-md bg-[#0b0a08]/70 p-1">
          {ERAS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={edition === id}
              className={`rs-chip min-h-11 text-xs ${edition === id ? "rs-chip-on" : ""}`}
              onClick={() => pick(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="px-3 py-2 text-center text-sm text-fg md:px-8">
        {name} · {game}
      </p>
      <div className="flex items-center justify-center gap-2 px-3 pb-1 md:px-8">
        <BobPic edition={edition === "RS3" ? "rs3" : edition === "RSC" ? "rsc" : "osrs"} />
        <p
          className="text-center text-sm text-parchment/80"
          style={{ fontFamily: "Fondamento, serif" }}
          aria-live="polite"
        >
          “{quote}”
        </p>
      </div>
      <p className="text-center text-[11px] text-muted">— Bob the Cat</p>
      <p className="pb-2 text-center text-[11px] text-faint">
        {edition === "RSC" ? "Archive. The worlds are not on this page." : `Next still in ${formatRemain(remain)}`}
      </p>
    </section>
  );
}
