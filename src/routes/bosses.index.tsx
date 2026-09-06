import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { BOSS_NOTES } from "@/lib/boss-notes";
import { sheetFor } from "@/lib/boss-sheets";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/bosses/")({
  head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
  component: BossIndex,
});

function BossIndex() {
  const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const rows = Object.values(BOSS_NOTES).filter((note) => {
    if (note.edition !== edition) return false;
    const loc = LOCATIONS.find((item) => item.id === note.id);
    if (!loc) return false;
    if (!sheetFor(note.id)) return false;
    if (!loc.viewA) return false;
    if (god && loc.god !== god) return false;
    return true;
  });
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Bosses</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Working sheets. Combat, slayer, unlock, instance, death. OSRS tiers, bag, supplies, spec, skip, bank. Sanity only where the fight uses it. RS3 camp, ultimates, familiar. Team seats only on group fights. Three links.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="bosses" edition={edition} god={god} onEdition={setEdition} onGod={setGod} />
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        {rows.length ? (
          <PlaceGrid>
            {rows.map((note) => {
              const loc = LOCATIONS.find((item) => item.id === note.id);
              return (
                <PlaceCard
                  key={note.id}
                  to="/bosses/$id"
                  params={{ id: note.id }}
                  src={loc?.viewA}
                  name={note.title}
                  kind="Boss"
                  game={game}
                />
              );
            })}
          </PlaceGrid>
        ) : (
          <p className="text-center text-sm text-muted">Nothing on that filter.</p>
        )}
      </main>
    </div>
  );
}
