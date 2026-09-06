import type { CSSProperties, ReactNode } from "react";
import { GOD_SLUGS } from "@/lib/gods";
import type { God } from "@/lib/locations";

function sameOriginPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#");
}

/** Real <a href>. No preventDefault — the browser follows the path. */
export function AppLink({
  href,
  children,
  className,
  style,
  current,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  current?: boolean;
}) {
  return (
    <a href={href} aria-current={current ? "page" : undefined} className={className} style={style}>
      {children}
    </a>
  );
}

export function PlaceChip({
  href,
  children,
  current,
  style,
}: {
  href: string;
  children: ReactNode;
  current?: boolean;
  style?: CSSProperties;
}) {
  return (
    <AppLink
      href={href}
      current={current}
      style={style}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 text-xs [touch-action:manipulation] ${
        current ? "border-parchment bg-raised text-parchment" : "border-line text-muted"
      }`}
    >
      {children}
    </AppLink>
  );
}

export function VisitPlaces({
  items,
}: {
  items: { href: string; label: string; current?: boolean; color?: string }[];
}) {
  const seen = new Set<string>();
  const chips = items.filter((item) => {
    if (!item.href || item.href === "#" || !sameOriginPath(item.href)) return false;
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
  if (!chips.length) return null;
  return (
    <nav aria-label="Places to visit" className="flex flex-wrap gap-2">
      {chips.map((item) => (
        <PlaceChip key={item.href} href={item.href} current={item.current} style={item.color ? { color: item.color } : undefined}>
          {item.label}
        </PlaceChip>
      ))}
    </nav>
  );
}

export function godPath(god: God) {
  return `/gods/${GOD_SLUGS[god]}`;
}

export function townPath(id: string) {
  return `/towns/${id}`;
}

export function bossPath(id: string) {
  return `/bosses/${id}`;
}
