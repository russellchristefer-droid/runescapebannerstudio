import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { BackLink } from "@/components/back-link";
import { BossSheet } from "@/components/boss-sheet";
import { noteFor } from "@/lib/boss-notes";
import { sheetFor } from "@/lib/boss-sheets";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";
import { godNeon } from "@/lib/gods";
import { PlaceRail } from "@/components/place-rail";
import { UseOnBanner } from "@/components/use-on-banner";
import { VisitPlaces, godPath, townPath } from "@/components/place-chip";
import { townNote } from "@/lib/town-notes";

export const Route = createFileRoute("/bosses/$id")({
  head: ({ params }) => {
    const note = noteFor(params.id);
    return pageMeta(note?.title ?? "Boss", "Working PvM sheet. Wear, eat, spec, wipe. Wiki keeps the hour.");
  },
  component: BossNotePage,
});

function BossNotePage() {
  const { id } = Route.useParams();
  const note = noteFor(id);
  const sheet = sheetFor(id);
  const loc = LOCATIONS.find((item) => item.id === id);
  if (!note || !sheet || !loc) throw notFound();
  const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const floor =
    loc.god === "Saradomin" ? "#0c1420"
    : loc.god === "Zamorak" ? "#1a0a0a"
    : loc.god === "Guthix" ? "#0c160e"
    : loc.god === "Armadyl" ? "#10141a"
    : loc.god === "Bandos" ? "#16120a"
    : loc.god === "Seren" ? "#0c1818"
    : loc.god === "Zaros" ? "#140e1a"
    : loc.god === "Sliske" ? "#121018"
    : loc.god === "Tumeken" ? "#16140a"
    : loc.god === "Elidinis" ? "#0c1616"
    : loc.god === "Marimbo" ? "#160e12"
    : "#120e10";
  return (
    <div className="boss-page min-h-dvh" style={{ "--boss-bg": floor } as CSSProperties}>
      <header className="px-5 py-5 md:px-8">
        <BackLink />
        <div className="mt-3">
          <PlaceRail section="bosses" />
        </div>
      </header>
      <main id="content" className="boss-door px-5 pb-10">
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="boss-still"
          loading="eager"
          decoding="async"
        />
        <h1 className="boss-name page-h1 mt-5">{note.title}</h1>
        <p className="boss-sub">
          {game}
          {" · "}
          {sheet.role}
          {loc.god ? (
            <>
              {" · "}
              <span style={{ color: godNeon(loc.god) }}>{loc.god}</span>
            </>
          ) : null}
        </p>
        <span className="boss-rule" aria-hidden="true" />
        <section className="boss-visit">
          <h2 className="sr-only">Places to visit</h2>
          <VisitPlaces
            items={[
              { href: "/monsters", label: "Bestiary" },
              { href: godPath(loc.god), label: loc.god },
              ...LOCATIONS.filter((row) => row.kind === "town" && row.god === loc.god && townNote(row.id))
                .slice(0, 4)
                .map((row) => ({ href: townPath(row.id), label: row.name })),
            ]}
          />
          <div className="mt-3 flex justify-center">
            <UseOnBanner src={loc.viewA} edition={loc.edition} placeId={loc.id} />
          </div>
          <SisterBoss name={loc.name} edition={loc.edition} id={loc.id} />
        </section>
        <div className="boss-guide">
          <BossSheet sheet={sheet} />
        </div>
      </main>
    </div>
  );
}

function SisterBoss({
  name,
  edition,
  id,
}: {
  name: string;
  edition: "OSRS" | "RS3";
  id: string;
}) {
  const sister = LOCATIONS.find(
    (item) => item.kind === "boss" && item.name === name && item.edition !== edition && item.id !== id,
  );
  if (!sister) return null;
  return (
    <p className="mt-4 text-center text-sm">
      <Link to="/bosses/$id" params={{ id: sister.id }} className="text-parchment">
        {edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School RuneScape"}
      </Link>
    </p>
  );
}
