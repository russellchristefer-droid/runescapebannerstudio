import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { UtcClock } from "@/components/utc-clock";
import { eggToast } from "@/lib/eggs";
import { useEffect, useRef, useState } from "react";

import { GAME_NAV, STUDIO_NAV } from "@/places/nav";

function navActive(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

function ChipRow({
  items,
  label,
  tracking,
  onPick,
  stacked,
}: {
  items: readonly (readonly [string, string])[];
  label: string;
  tracking?: string;
  onPick?: () => void;
  stacked?: boolean;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label={label} className={stacked ? "flex flex-col gap-1" : `flex flex-wrap items-center justify-center gap-2 ${tracking ?? ""}`}>
      {stacked ? <p className="px-2 pt-1 text-[10px] uppercase tracking-widest text-faint">{label}</p> : null}
      {items.map(([to, name]) => {
        const on = navActive(path, to);
        return (
          <Link
            key={to}
            to={to}
            preload={false}
            aria-current={on ? "page" : undefined}
            className={`rs-chip min-h-11 text-xs [touch-action:manipulation] ${on ? "rs-chip-on" : ""} ${stacked ? "w-full" : ""}`}
            onClick={() => onPick?.()}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
}

export function StudioNavLinks({ onPick, stacked }: { onPick?: () => void; stacked?: boolean }) {
  return (
    <div className={stacked ? "flex flex-col gap-3" : "flex w-full flex-col items-center gap-2"}>
      <ChipRow items={GAME_NAV} label="Game" onPick={onPick} stacked={stacked} />
      <ChipRow items={STUDIO_NAV} label="Studio" tracking="tracking-tight" onPick={onPick} stacked={stacked} />
    </div>
  );
}

export function SiteHeader({
  onMarkClick,
  children,
  skip,
}: {
  onMarkClick?: () => void;
  children?: ReactNode;
  skip?: { href: string; label: string };
}) {
  const pete = useRef({ n: 0, t: 0 });
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  return (
    <>
      {skip ? (
        <a
          href={skip.href}
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-20 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-raised focus:px-3 focus:py-2"
        >
          {skip.label}
        </a>
      ) : null}
      <div className="rs-stone-header mb-3 px-1 py-1 text-center">
        <div className="studio-lockup">
          <p
            className="studio-kicker"
            onClick={onMarkClick ?? (() => {
              const now = Date.now();
              if (now - pete.current.t > 2000) pete.current.n = 0;
              pete.current.t = now;
              pete.current.n += 1;
              if (pete.current.n >= 7) {
                pete.current.n = 0;
                eggToast("You've got mail. (You haven't.)");
              }
            })}
          >
            Independent studio
          </p>
          <p className="studio-wordmark">
            <Link to="/" className="site-title">
              RuneScape Banner Studio
            </Link>
          </p>
          <p className="studio-legal">Not a Jagex product</p>
        </div>
        <UtcClock />
        <div className="mt-2 hidden md:block">
          <StudioNavLinks />
        </div>
        <div className="mt-2 md:hidden">
          <button
            type="button"
            className="rs-chip min-h-11 min-w-11 text-sm"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            Menu
          </button>
          {menu ? (
            <div className="mt-2 border border-[#e6d000] bg-[#0b0b0b] p-2 text-sm text-parchment">
              <StudioNavLinks stacked onPick={() => setMenu(false)} />
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </>
  );
}

export function BackLink() {
  return <SiteHeader skip={{ href: "#content", label: "Skip to content" }} />;
}
