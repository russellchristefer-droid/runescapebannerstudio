import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { LOCATIONS, townHasStill, townRegionHead, townStillLine, type Location } from "@/lib/locations";
import { townNote } from "@/lib/town-notes";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/towns/")({
  head: () => pageMeta("Towns", "Towns in Old School RuneScape and RuneScape. Correct client stills."),
  component: TownIndex,
});

const REGION_ORDER = [
  "Misthalin",
  "Asgarnia",
  "Kandarin",
  "Morytania",
  "Kharidian",
  "Tirannwn",
  "Fremennik",
  "Great Kourend",
  "Varlamore",
  "Southern Sea",
  "Lost City",
  "Lumbridge Swamp",
  "Wilderness",
  "Forinthry",
  "God Wars",
  "The Heart",
  "Underworld",
  "The Arc",
  "Anachronia",
  "Fossil Island",
  "Otherworld",
  "PvM hub",
  "Abyss",
  "Varrock",
];

function listedTowns(edition: Location["edition"], god: Location["god"] | null) {
  return LOCATIONS.filter(
    (loc) =>
      loc.kind === "town" &&
      loc.edition === edition &&
      (!god || loc.god === god) &&
      townNote(loc.id) &&
      townHasStill(loc),
  );
}

function byRegion(towns: Location[]) {
  const groups = new Map<string, Location[]>();
  for (const loc of towns) {
    const head = townRegionHead(loc.region);
    const list = groups.get(head) ?? [];
    list.push(loc);
    groups.set(head, list);
  }
  const keys = [...groups.keys()].sort((a, b) => {
    const ia = REGION_ORDER.indexOf(a);
    const ib = REGION_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return keys.map((key) => [key, groups.get(key)!] as const);
}

function TownIndex() {
  const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
  const groups = byRegion(listedTowns(edition, god));
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Towns</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two grammars. Same name is not the same street. Pick a client first.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="towns" edition={edition} god={god} onEdition={setEdition} onGod={setGod} />
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        {groups.length ? (
          groups.map(([region, rows]) => (
            <section key={region}>
              <h2 className="mb-2 text-[11px] tracking-[0.14em] text-faint">{region}</h2>
              <PlaceGrid>
                {rows.map((loc) => (
                  <PlaceCard
                    key={loc.id}
                    to="/towns/$id"
                    params={{ id: loc.id }}
                    src={loc.viewA}
                    name={loc.name}
                    kind="Town"
                    game={game}
                    caption={townStillLine(loc.id)}
                    ontoPlate
                  />
                ))}
              </PlaceGrid>
            </section>
          ))
        ) : (
          <p className="text-center text-sm text-muted">Nothing on that filter.</p>
        )}
      </main>
    </div>
  );
}
