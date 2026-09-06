import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { UtcClock } from "@/components/utc-clock";
import { eggToast } from "@/lib/eggs";
import { useEffect, useRef, useState } from "react";

export const STUDIO_NAV = [
  ["/", "Banner Studio"],
  ["/edit", "Video editor"],
  ["/classic", "Classic"],
  ["/gods", "Gods"],
  ["/bosses", "Bosses"],
  ["/pvp", "PvP"],
  ["/monsters", "Bestiary"],
  ["/towns", "Towns"],
  ["/knowledge", "Sites"],
  ["/jmods", "Jagex directory"],
  ["/brief", "Brief"],
  ["/history", "History"],
  ["/chronicle", "Chronicle"],
  ["/streamers", "Streamers"],
  ["/youtubers", "Youtubers"],
  ["/legal", "Legal"],
] as const;

function navActive(path: string, to: string) {
  if (to === "/") return path === "/";
  return path === to || path.startsWith(`${to}/`);
}

export function StudioNavLinks({ onPick }: { onPick?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {STUDIO_NAV.map(([to, label], i) => (
        <span key={to}>
          {i ? " · " : null}
          <Link
            to={to}
            preload={to === "/streamers" || to === "/youtubers" ? "intent" : false}
            aria-current={navActive(path, to) ? "page" : undefined}
            className={navActive(path, to) ? "font-semibold text-parchment underline decoration-parchment/60 underline-offset-4" : ""}
            onClick={() => onPick?.()}
          >
            {label}
          </Link>
        </span>
      ))}
    </>
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-20 focus:bg-raised focus:px-3 focus:py-2"
        >
          {skip.label}
        </a>
      ) : null}
      <div className="rs-stone-header mb-3 px-1 py-1 text-center">
        <p
          className="cursor-default text-[10px] tracking-[0.2em] text-faint uppercase"
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
          Independent studio · not a Jagex product
        </p>
        <p className="mt-1">
          <Link to="/" className="site-title page-h1 no-underline">
            RuneScape Banner Studio
          </Link>
        </p>
        <UtcClock />
        <nav
          aria-label="Studio"
          className="mt-1.5 hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-parchment md:flex"
        >
          <StudioNavLinks />
        </nav>
        <div className="mt-2 md:hidden">
          <button
            type="button"
            className="min-h-11 min-w-11 rounded-md border border-line px-3 text-sm text-parchment"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            Menu
          </button>
          {menu ? (
            <div className="mt-2 flex flex-col gap-1 border border-line bg-[#1a1610] p-2 text-sm text-parchment">
              <StudioNavLinks onPick={() => setMenu(false)} />
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
