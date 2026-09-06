import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { GOD_BRIEFS, GOD_SLUGS } from "@/lib/gods";
import { godStill, godStillLine } from "@/lib/god-stills";
import { GODS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/gods/")({
  head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
  component: GodsIndex,
});

function GodsIndex() {
  const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
  const rows = GODS.filter((name) => !god || name === god);
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Gods</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two sealed canons. Prayer book and God Wars on one client. Landfall and edicts on the other. Wiki keeps the hour.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="gods" edition={edition} god={god} onEdition={setEdition} onGod={setGod} />
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <PlaceGrid>
          {rows.map((name) => (
            <PlaceCard
              key={`${edition}-${name}`}
              to="/gods/$god"
              params={{ god: GOD_SLUGS[name] }}
              src={godStill(name, edition)}
              name={GOD_BRIEFS[name].god}
              kind="God"
              game={game}
              caption={godStillLine(name, edition)}
            />
          ))}
        </PlaceGrid>
      </main>
    </div>
  );
}
