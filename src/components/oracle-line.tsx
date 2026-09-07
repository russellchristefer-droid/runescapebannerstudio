import { placeSlug, rememberBobPlace } from "@/lib/bob-lines";
import { bobWord } from "@/lib/sill-words";
import { useVisibleNow } from "@/hooks/use-visible-now";
import type { Edition } from "@/lib/locations";
import { useEffect } from "react";

export function OracleLine({
  place,
  edition,
}: {
  place: string;
  edition: Edition;
}) {
  const now = useVisibleNow();
  const game = edition === "OSRS" ? "osrs" : "rs3";
  const slug = placeSlug(place);
  useEffect(() => {
    rememberBobPlace(game, slug);
  }, [game, slug]);
  const word = bobWord(now);
  const date = new Date(now).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return (
    <div className="page-band py-6">
      <figure className="bob-cite mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <img
          src="/stills/osrs/bob-the-cat.png"
          alt="Bob the Cat, Old School RuneScape"
          width={72}
          height={72}
          className="h-[72px] w-[72px] shrink-0 object-contain object-bottom"
        />
        <div className="min-w-[12rem] flex-1 text-center">
          <p className="bob-word text-sm leading-snug text-parchment/80">
            <span className="mr-1 text-[11px] text-muted">Bob teaches</span>
            <strong className="font-semibold text-parchment">{word.t}</strong>
            <span className="text-muted"> ({word.p})</span>
            <span style={{ fontFamily: "Fondamento, serif" }}> — {word.g}</span>
          </p>
        </div>
        <img
          src="/stills/rs3/bob-the-cat.png"
          alt="Bob the Cat, RuneScape"
          width={72}
          height={72}
          className="h-[72px] w-[72px] shrink-0 object-contain object-bottom"
        />
        <figcaption className="w-full text-center text-[11px] text-muted">
          Bob the Cat
        </figcaption>
      </figure>
      <p className="mt-2 text-center text-[11px] text-muted">Kept by a player who looks first and banks second.</p>
      <p className="mt-1 text-center text-[11px] text-faint">Word turns every thirty seconds. New list at midnight UTC.</p>
      <p className="mt-2 text-center text-xs text-muted">Today · {date}</p>
    </div>
  );
}
