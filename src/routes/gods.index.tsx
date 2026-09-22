import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { AppLink } from "@/components/place-chip";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { GOD_SLUGS, godHueClass, godNeon } from "@/lib/gods";
import { godStill, godStillLine } from "@/lib/god-stills";
import { type God } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/gods/")({
  head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
  component: GodsIndex,
});

const ALTAR: God[] = ["Saradomin", "Zamorak", "Guthix"];
const COURT: God[] = ["Armadyl", "Bandos", "Seren"];
const BENCH: God[] = ["Zaros", "Sliske", "Tumeken", "Elidinis", "Marimbo"];

function GodsIndex() {
  const { edition, setEdition } = usePlaceFilter("OSRS");
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <div className="gods-index min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Gods</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two sealed canons. Prayer book and God Wars on one client. Landfall and edicts on the other. Do not file a Sixth Age walk onto an Old School plate. Wiki keeps the hour.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c4a35a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="gods" edition={edition} onEdition={setEdition} />
        </div>
      </header>
      <main className="god-stage mx-auto px-5 py-8 md:px-8">
        <GodRow tier="altar" names={ALTAR} edition={edition} game={game} />
        <GodRow tier="court" names={COURT} edition={edition} game={game} />
        <GodRow tier="bench" names={BENCH} edition={edition} game={game} />
      </main>
    </div>
  );
}

function GodRow({
  tier,
  names,
  edition,
  game,
}: {
  tier: "altar" | "court" | "bench";
  names: God[];
  edition: "OSRS" | "RS3";
  game: string;
}) {
  return (
    <ul className={`god-row god-row-${tier}`}>
      {names.map((name) => (
        <GodAltar key={`${edition}-${name}`} name={name} edition={edition} game={game} />
      ))}
    </ul>
  );
}

function GodAltar({
  name,
  edition,
  game,
}: {
  name: God;
  edition: "OSRS" | "RS3";
  game: string;
}) {
  const src = godStill(name, edition);
  const [gone, setGone] = useState(false);
  const hue = godNeon(name);
  return (
    <li>
      <AppLink
        href={`/gods/${GOD_SLUGS[name]}`}
        className={`god-altar ${godHueClass(name)}`}
        style={{ "--god": hue } as CSSProperties}
      >
        {src && !gone ? (
          <img
            src={src}
            alt={`${name} in ${game}`}
            className="god-still"
            loading="lazy"
            decoding="async"
            onError={() => setGone(true)}
          />
        ) : (
          <span className="god-still god-still-empty">Still needed</span>
        )}
        <span className="god-name">{name}</span>
        <span className="god-line">{godStillLine(name, edition)}</span>
      </AppLink>
    </li>
  );
}
