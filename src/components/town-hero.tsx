import { useEffect, useState } from "react";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { PERIOD_MS, formatRemain, stillIndex } from "@/lib/still-clock";
import { type Edition } from "@/lib/locations";
import { type HeroChip, gameLabel, heroPool } from "@/lib/hero-pools";

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
  const idx = n ? (stillIndex(n, clock) + skip) % n : 0;
  const shot = pool[idx] ?? pool[0];
  const next = n ? pool[(idx + 1) % n] : undefined;
  const [shown, setShown] = useState(shot?.src);
  const remain = PERIOD_MS - (clock % PERIOD_MS);

  useEffect(() => {
    if (!shot?.src) return;
    setShown(shot.src);
    const img = new Image();
    img.src = shot.src;
    img.onerror = () => setSkip((count) => count + 1);
    if (typeof img.decode === "function") void img.decode().catch(() => setSkip((count) => count + 1));
  }, [shot?.src]);

  useEffect(() => {
    if (!next?.src) return;
    const img = new Image();
    img.src = next.src;
  }, [next?.src]);

  useEffect(() => {
    if (shot && edition !== "RSC") onTown?.(shot.name, edition);
  }, [shot?.name, edition]);

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
  const name = shot?.name ?? "Town";

  return (
    <section id="hero" className="border-b border-line bg-raised">
      <div className="flex flex-wrap justify-center gap-2 px-3 py-3 md:px-8">
        {(
          [
            ["RSC", "Classic"],
            ["OSRS", "Old School"],
            ["RS3", "RuneScape"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={edition === id}
            className={`min-h-11 rounded-md border px-3 text-xs ${
              edition === id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"
            }`}
            onClick={() => pick(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="relative w-full overflow-hidden border-y border-[#c6a45a] bg-[#1a1612]" style={{ aspectRatio: "1200 / 480" }}>
        {shown ? (
          <img
            src={shown}
            width={1200}
            height={480}
            alt={`${name}, town, ${game}`}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted">Still needed.</p>
        )}
      </div>
      <p className="px-3 py-2 text-center text-sm text-fg md:px-8">
        {name} · {game}
      </p>
      <p className="pb-2 text-center text-[11px] text-faint">
        {edition === "RSC" ? "Archive. The worlds are not on this page." : `Next still in ${formatRemain(remain)}`}
      </p>
    </section>
  );
}