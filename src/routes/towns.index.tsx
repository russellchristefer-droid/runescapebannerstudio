import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { OfficialPulse } from "@/components/official-pulse";
import { LOCATIONS } from "@/lib/locations";
import { townNote } from "@/lib/town-notes";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/towns/")({
  head: () => pageMeta("Towns", "Towns in Old School RuneScape and RuneScape. Correct client stills."),
  component: TownIndex,
});

function TownIndex() {
  const towns = LOCATIONS.filter((loc) => loc.kind === "town" && townNote(loc.id));
  const rs3 = towns.filter((loc) => loc.edition === "RS3");
  const osrs = towns.filter((loc) => loc.edition === "OSRS");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Towns</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Cities and landmarks · pick a game first.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialPulse />
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Old School RuneScape</h2>
          <PlaceGrid>
            {osrs.map((loc) => (
              <PlaceCard
                key={loc.id}
                to="/towns/$id"
                params={{ id: loc.id }}
                src={loc.viewA}
                name={loc.name}
                kind="Town"
                game="Old School RuneScape"
                god={loc.god}
              />
            ))}
          </PlaceGrid>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">RuneScape 3</h2>
          <PlaceGrid>
            {rs3.map((loc) => (
              <PlaceCard
                key={loc.id}
                to="/towns/$id"
                params={{ id: loc.id }}
                src={loc.viewA}
                name={loc.name}
                kind="Town"
                game="RuneScape 3"
                god={loc.god}
              />
            ))}
          </PlaceGrid>
        </section>
      </main>
    </div>
  );
}
