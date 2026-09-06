import { useState } from "react";
import { StillPhoto } from "@/components/still-photo";
import { AppLink } from "./place-chip";

type PlaceTo = "/towns/$id" | "/bosses/$id" | "/gods/$god" | "/monsters/$id";

function hrefFor(to: PlaceTo, params: { id?: string; god?: string }) {
  if (to === "/gods/$god") return `/gods/${params.god ?? ""}`;
  if (to === "/towns/$id") return `/towns/${params.id ?? ""}`;
  if (to === "/bosses/$id") return `/bosses/${params.id ?? ""}`;
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
}: {
  to: PlaceTo;
  params: { id: string } | { god: string };
  src?: string;
  name: string;
  kind: "Town" | "Boss" | "God" | "Monster" | "Slayer";
  game: string;
  god?: string;
  caption?: string;
}) {
  const alt = `${name} in ${game}`;
  const href = hrefFor(to, params);
  const [gone, setGone] = useState(false);
  if (!src) return null;
  return (
    <li className="[contain-intrinsic-size:auto_220px] [content-visibility:auto]">
      <div className="overflow-hidden rounded-md border border-line bg-raised hover:border-[#F5C400]">
        <AppLink href={href} className="block [touch-action:manipulation]">
          {gone ? (
            <span className="flex aspect-video w-full items-center justify-center bg-[#1a1610] text-[11px] text-faint">
              Still needed
            </span>
          ) : (
            <StillPhoto
              src={src}
              alt={alt}
              className="aspect-video w-full bg-surface object-cover [content-visibility:auto]"
              onError={() => setGone(true)}
            />
          )}
        </AppLink>
        <AppLink href={href} className="site-title block truncate px-2 pt-1.5 text-center text-sm no-underline">
          {name}
        </AppLink>
        {caption ? (
          <p className="px-2 pb-2 text-center text-[10px] text-muted">{caption}</p>
        ) : (
          <p className="px-2 pb-2 text-center text-[10px] text-faint">
            {kind} · {game}
          </p>
        )}
      </div>
    </li>
  );
}

export function PlaceGrid({ children }: { children: React.ReactNode }) {
  return <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">{children}</ul>;
}
