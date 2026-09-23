import { useState, type CSSProperties } from "react";
import { StillPhoto } from "@/components/still-photo";
import { UseOnBanner } from "@/desk/use-on-banner";
import { godChipClass, godInk, godNeon } from "@/lib/gods";
import { bannerFor, clothFor } from "@/lib/region-banners";
import type { Edition } from "@/lib/locations";
import { AppLink, bossPath, townPath } from "./place-chip";

type PlaceTo = "/towns/$id" | "/bosses/$id" | "/gods/$god" | "/monsters/$id";

function hrefFor(to: PlaceTo, params: { id?: string; god?: string }) {
  if (to === "/gods/$god") return `/gods/${params.god ?? ""}`;
  if (to === "/towns/$id") return townPath(params.id ?? "");
  if (to === "/bosses/$id") return bossPath(params.id ?? "");
  return `/monsters/${params.id ?? ""}`;
}

export function PlaceCard({
  to,
  params,
  src,
  name,
  kind,
  game,
  caption,
  wash,
  field,
  edition,
  placeId,
  god,
  region,
}: {
  to: PlaceTo;
  params: { id: string } | { god: string };
  src?: string;
  name: string;
  kind: "Town" | "Boss" | "God" | "Monster" | "Slayer";
  game: string;
  god?: string;
  region?: string;
  caption?: string;
  wash?: string;
  field?: boolean;
  edition?: Edition;
  placeId?: string;
}) {
  const banner = kind === "Town" ? bannerFor(region) : null;
  const cloth = kind === "Town" ? clothFor(region) : null;
  const hue = cloth
    ? cloth.line
    : (kind === "Town" || kind === "Boss") && god
      ? godNeon(god)
      : kind === "God"
        ? godInk(name)
        : undefined;
  const alt = `${name} in ${game}`;
  const href = hrefFor(to, params);
  const [gone, setGone] = useState(false);
  const canBanner = Boolean(src && edition && placeId);
  if (!src) return null;
  if (kind === "Boss") {
    return (
      <li className="boss-slot">
        <article className="boss-card">
          <AppLink href={href} className="boss-card-still">
            {gone ? (
              <span className="boss-card-empty">Still needed</span>
            ) : (
              <img
                src={src}
                alt={alt}
                className="boss-card-img"
                loading="lazy"
                decoding="async"
                onError={() => setGone(true)}
              />
            )}
          </AppLink>
          <AppLink href={href} className="boss-card-name" style={hue ? { color: hue } : undefined}>
            {name}
          </AppLink>
          <p className="boss-card-line">{caption || `${game}`}</p>
          <div className="boss-card-actions">
            {canBanner ? (
              <>
                <AppLink href={href} className="rs-chip">
                  Open
                </AppLink>
                <UseOnBanner src={src} edition={edition!} placeId={placeId!} />
              </>
            ) : null}
          </div>
        </article>
      </li>
    );
  }
  return (
    <li
      className={
        kind === "Town"
          ? "town-slot"
          : "[content-visibility:auto] [contain-intrinsic-size:auto_220px]"
      }
    >
      <div
        className={`rs-panel overflow-hidden rounded-md ${
          kind === "God"
            ? godChipClass(name)
            : kind === "Town"
              ? "town-card region-card"
              : "hover:border-line"
        }`}
        style={
          banner
            ? ({
                "--region": banner.primary,
                "--region-accent": cloth?.accent ?? "#8aa35a",
                "--region-ink": cloth?.line ?? "#8aa35a",
              } as CSSProperties)
            : field && wash
              ? { borderColor: wash }
              : undefined
        }
      >
        <AppLink href={href} className="block [touch-action:manipulation]">
          {gone ? (
            <span className="grid aspect-video w-full place-items-center text-[11px] text-faint">
              Still needed
            </span>
          ) : (
            <StillPhoto
              src={src}
              alt={alt}
              className={`aspect-video w-full object-cover ${field ? "object-contain" : "bg-surface"}`}
              style={
                field && wash
                  ? {
                      objectFit: "contain",
                      backgroundColor: wash,
                      backgroundImage: `radial-gradient(ellipse at 50% 58%, color-mix(in srgb, ${wash} 62%, white) 0%, ${wash} 42%, color-mix(in srgb, ${wash} 48%, #120c08) 100%)`,
                    }
                  : wash
                    ? { boxShadow: `inset 0 3px 0 0 ${wash}` }
                    : undefined
              }
              onError={() => setGone(true)}
            />
          )}
          <span
            className={
              kind === "Town"
                ? "site-title town-name"
                : "site-title mx-auto block w-full px-2 pt-1.5 text-center text-sm no-underline"
            }
            style={
              banner
                ? undefined
                : { color: hue, display: "block", width: "100%", textAlign: "center" }
            }
          >
            {name}
          </span>
        </AppLink>
        {kind === "Town" && god ? (
          <p className="town-meta w-full px-2 text-center text-[10px]">
            <span className="text-muted">{(region ?? "").replace(/\s·\sOSRS$/, "")}</span>
            {region ? " · " : ""}
            <span style={{ color: godNeon(god) }}>{god}</span>
          </p>
        ) : caption ? (
          <p className="w-full px-2 pb-1 text-center text-[10px] text-muted">{caption}</p>
        ) : (
          <p className="w-full px-2 pb-1 text-center text-[10px] text-faint">
            {kind} · {game}
          </p>
        )}
        {canBanner ? (
          <div className={kind === "Town" ? "town-actions" : "flex flex-wrap justify-center gap-1 px-2 pb-2"}>
            <AppLink href={href} className="rs-chip min-h-11 text-xs">
              Open
            </AppLink>
            <UseOnBanner src={src} edition={edition!} placeId={placeId!} />
          </div>
        ) : (
          <div className="pb-1" />
        )}
      </div>
    </li>
  );
}

export function PlaceGrid({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <ul className={`grid grid-cols-2 gap-2 sm:grid-cols-3 ${className}`}>{children}</ul>;
}
