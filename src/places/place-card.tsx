import { useState } from "react";
import { StillPhoto } from "@/components/still-photo";
import { AppLink } from "./place-chip";
import { useStill } from "@/desk/use-still";
import type { Edition } from "@/lib/locations";

type PlaceTo = "/towns/$id" | "/bosses/$id" | "/gods/$god" | "/monsters/$id";

function hrefFor(to: PlaceTo, params: { id?: string; god?: string }) {
  if (to === "/gods/$god") return `/gods/${params.god ?? ""}`;
  if (to === "/towns/$id") return `/towns/${params.id ?? ""}`;
  if (to === "/bosses/$id") return `/bosses/${params.id ?? ""}`;
  return `/monsters/${params.id ?? ""}`;
}

function editionOf(game: string): Edition {
  return game.startsWith("Old School") ? "OSRS" : "RS3";
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
  const still = useStill(src);
  const [gone, setGone] = useState(false);
  if (!src || gone) return null;
  const placeId = "id" in params ? params.id : undefined;
  return (
    <li className="[contain-intrinsic-size:auto_220px] [content-visibility:auto]">
      <div className="overflow-hidden rounded-md border border-line bg-raised hover:border-[#F5C400]">
        <button
          type="button"
          className="block w-full text-left [touch-action:manipulation]"
          onClick={() => still.putOnDesk({ locationId: placeId, edition: editionOf(game) })}
        >
          <StillPhoto
            src={src}
            alt={alt}
            className="aspect-video w-full bg-surface object-cover [content-visibility:auto]"
            onError={() => setGone(true)}
          />
        </button>
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
