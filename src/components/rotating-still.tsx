import { useEffect, useMemo, useRef, useState } from "react";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { formatRemain, msUntilNext, stillIndex } from "@/lib/still-clock";
import {
  canUseOnDesk,
  heroCaption,
  stillPool,
  type HeroFilter,
  type HeroStill,
} from "@/lib/still-pool";
import { eggToast } from "@/lib/eggs";
import { useEggGestures } from "@/hooks/use-egg-gestures";

const FILTERS: { id: HeroFilter; label: string }[] = [
  { id: "rsc", label: "Classic" },
  { id: "osrs", label: "Old School" },
  { id: "rs3", label: "RuneScape" },
];

export function RotatingStill({
  onUse,
}: {
  onUse?: (card: HeroStill) => void;
}) {
  const [filter, setFilter] = useState<HeroFilter>("rsc");
  const frameRef = useRef<HTMLDivElement | null>(null);
  const displayRef = useRef<HeroStill | null>(null);
  const pool = useMemo(() => stillPool(filter), [filter]);
  const now = useVisibleNow();
  const [shown, setShown] = useState<HeroStill | null>(null);

  const idx = stillIndex(pool.length, now);
  const nextIdx = pool.length ? (idx + 1) % pool.length : 0;
  const current = pool[idx];
  const upcoming = pool[nextIdx];


  useEffect(() => {
    if (!current) {
      setShown(null);
      return;
    }
    const img = new Image();
    img.src = current.src;
    const apply = () => setShown(current);
    if (typeof img.decode === "function") {
      void img.decode().then(apply).catch(apply);
    } else {
      img.onload = apply;
    }
  }, [current?.src, current?.name, current?.era]);

  useEffect(() => {
    if (!upcoming) return;
    const img = new Image();
    img.src = upcoming.src;
  }, [upcoming?.src]);

  const remain = msUntilNext(now);
  const display = shown ?? current;
  displayRef.current = display ?? null;

  useEggGestures(frameRef, () => {
    const card = displayRef.current;
    if (!card) return "It's a picture.";
    const game = card.gameLabel;
    const bosses = /telos|vorago|raksha|vorkath|zul|tomb|inferno|olm|theatre|tob|fight cave/i;
    if (bosses.test(card.name)) {
      return `It's ${card.name}, ${game}. I wouldn't like to fight that from here.`;
    }
    if (/saradomin|zamorak|guthix|armadyl|bandos|seren|zaros|sliske|tumeken|elidinis|marimbo/i.test(card.name)) {
      return `It's ${card.name}, ${game}. The stone remembers a name.`;
    }
    return `It's ${card.name}, ${game}.`;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname !== "/still") return;
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === seq[i]) {
        i += 1;
        if (i === seq.length) {
          i = 0;
          const classic = stillPool("rsc");
          if (classic.length) {
            setFilter("rsc");
            eggToast("You feel a longing for 2001.");
          } else {
            eggToast("The memories aren't hosted yet.");
          }
        }
      } else if (key === seq[0]) {
        i = 1;
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!display) {
    return <p className="px-3 py-4 text-sm text-muted">Nothing here yet. Try another era chip.</p>;
  }

  const deskOk = canUseOnDesk(display);
  const useHref = deskOk
    ? `/?place=${encodeURIComponent(display.placeId!)}&game=${display.era}&view=${display.view ?? "a"}`
    : "";

  return (
    <section className="border-b border-line bg-raised">
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden bg-[#1a1612]"
        style={{ aspectRatio: "1200 / 480" }}
      >
        <img
          key={display.src}
          src={display.src}
          width={1200}
          height={480}
          alt={heroCaption(display)}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 px-3 py-3 md:px-8">
        <p className="text-sm text-fg">{heroCaption(display)}</p>
        <p className="text-[11px] text-faint">
          Next still in {formatRemain(remain)}
          {" · "}
          <a href={display.filePage} target="_blank" rel="noopener noreferrer" className="text-parchment">
            File page
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              aria-pressed={filter === chip.id}
              className={`min-h-11 rounded-md border px-3 text-xs ${
                filter === chip.id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"
              }`}
              onClick={() => setFilter(chip.id)}
            >
              {chip.label}
            </button>
          ))}
          {deskOk && onUse ? (
            <button
              type="button"
              className="min-h-11 rounded-md border border-parchment px-3 text-xs text-parchment"
              onClick={() => onUse(display)}
            >
              Use on desk
            </button>
          ) : deskOk ? (
            <a
              href={useHref}
              className="inline-flex min-h-11 items-center rounded-md border border-parchment px-3 text-xs text-parchment"
            >
              Use on desk
            </a>
          ) : (
            <p className="self-center text-[11px] text-faint">Gallery only — not a desk still.</p>
          )}
        </div>
      </div>
    </section>
  );
}
