import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { OfficialPulse } from "@/components/official-pulse";
import { GOD_BRIEFS, GOD_SLUGS } from "@/lib/gods";
import { godStill } from "@/lib/god-stills";
import { GODS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/gods/")({
  head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
  component: GodsIndex,
});

function stillFor(god: (typeof GODS)[number], edition: "OSRS" | "RS3") {
  return godStill(god, edition);
}

function GodsIndex() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Gods</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two sealed canons. Old School RuneScape first, then RuneScape 3. Not a Jagex page.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialPulse />
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Old School RuneScape</h2>
          <PlaceGrid>
            {GODS.map((god) => (
              <PlaceCard
                key={`osrs-${god}`}
                to="/gods/$god"
                params={{ god: GOD_SLUGS[god] }}
                src={stillFor(god, "OSRS")}
                name={GOD_BRIEFS[god].god}
                kind="God"
                game="Old School RuneScape"
              />
            ))}
          </PlaceGrid>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">RuneScape 3</h2>
          <PlaceGrid>
            {GODS.map((god) => (
              <PlaceCard
                key={`rs3-${god}`}
                to="/gods/$god"
                params={{ god: GOD_SLUGS[god] }}
                src={stillFor(god, "RS3")}
                name={GOD_BRIEFS[god].god}
                kind="God"
                game="RuneScape 3"
              />
            ))}
          </PlaceGrid>
        </section>
      </main>
    </div>
  );
}
