import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { LOCATIONS, townHasStill, townRegionHead, townStillLine, type Location } from "@/lib/locations";
import { bannerFor, clothFor, hasBanner } from "@/lib/region-banners";
import { regionAnchor } from "@/lib/town-doors";
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
  "Kharidian",
  "Morytania",
  "Great Kourend",
  "Varlamore",
  "Tirannwn",
  "Fremennik",
  "Karamja",
  "Southern Sea",
  "Lost City",
  "Lumbridge Swamp",
  "Varrock",
  "God Wars",
  "The Heart",
  "Underworld",
  "The Arc",
  "Anachronia",
  "Fossil Island",
  "Otherworld",
  "PvM hub",
  "Abyss",
  "Wilderness",
  "Forinthry",
];

const CIVIC: Record<string, string> = {
  Misthalin: "Capital Lumbridge · stone and river",
  Asgarnia: "Capital Falador · white stone",
  Kandarin: "Capital East Ardougne · east and west",
  Kharidian: "Capital Al Kharid · the desert gate",
  Morytania: "Canifis · the swamp road",
  "Great Kourend": "Five houses · Kourend Castle",
  Varlamore: "Capital Civitas illa Fortis",
  Tirannwn: "Capital Prifddinas · crystal",
  Fremennik: "Capital Rellekka · the longhall",
  "Southern Sea": "Marim · Ape Atoll",
  Karamja: "Musa Point · the banana dock",
  "Lost City": "Zanaris · the other side of the ring",
  Wilderness: "No capital · the ditch",
  Forinthry: "No capital · the ditch",
};

function polityName(region: string) {
  if (region === "Burtrope") return "Burthorpe";
  if (region === "Great Kourend") return "Kourend";
  return region;
}

function RegionSeal({ slug, name }: { slug: string; name: string }) {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <img
      src={`/banners/${slug}.png`}
      alt={name}
      width={64}
      height={64}
      className="region-seal"
      onError={() => setGone(true)}
    />
  );
}

function listedTowns(edition: Location["edition"]) {
  return LOCATIONS.filter(
    (loc) =>
      loc.kind === "town" &&
      loc.edition === edition &&
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
  const { edition, setEdition } = usePlaceFilter("OSRS");
  const groups = byRegion(listedTowns(edition));
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <div className="towns-atlas min-h-dvh">
      <header className="section-head px-5 pt-2 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Towns</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two grammars. Same name is not the same street. Pick a client first. The guard on the card talks for that game only.
        </p>
        <span className="towns-rule" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="towns" edition={edition} onEdition={setEdition} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[72rem] flex-col px-5 py-2 md:px-8">
        {groups.length ? (
          groups.map(([region, rows]) => {
            const banner = bannerFor(region);
            const cloth = clothFor(region);
            const label = polityName(region);
            return (
            <section
              key={region}
              id={regionAnchor(region)}
              className="region-band"
              style={{ "--region-ink": cloth.line, "--region-accent": cloth.accent } as CSSProperties}
            >
              {hasBanner(region) ? <RegionSeal slug={banner.slug} name={label} /> : null}
              <h2 className="region-band-title">{label}</h2>
              <p className="region-civic">{CIVIC[region] ?? "Streets of this ground."}</p>
              <PlaceGrid className="town-grid">
                {rows.map((loc) => (
                  <PlaceCard
                    key={loc.id}
                    to="/towns/$id"
                    params={{ id: loc.id }}
                    src={loc.viewA}
                    name={loc.name === "Burtrope" ? "Burthorpe" : loc.name}
                    kind="Town"
                    game={game}
                    god={loc.god}
                    region={townRegionHead(loc.region)}
                    caption={townStillLine(loc.id)}
                    edition={loc.edition}
                    placeId={loc.id}
                  />
                ))}
              </PlaceGrid>
            </section>
            );
          })
        ) : (
          <p className="text-center text-sm text-muted">Nothing on that filter.</p>
        )}
        <section id="wilderness" className="region-band" style={{ "--region-ink": "#8a3030", "--region-accent": "#c4a35a" } as CSSProperties}>
          <RegionSeal slug="wilderness" name="Wilderness" />
          <h2 className="region-band-title">Wilderness</h2>
          <p className="region-civic">No capital. The ditch begins at Edgeville.</p>
        </section>
      </main>
    </div>
  );
}
