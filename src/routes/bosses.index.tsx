import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { OfficialPulse } from "@/components/official-pulse";
import { BOSS_NOTES } from "@/lib/boss-notes";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/bosses/")({
  head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
  component: BossIndex,
});

function BossIndex() {
  const osrs = Object.values(BOSS_NOTES).filter(
    (n) => n.edition === "OSRS" && LOCATIONS.some((l) => l.id === n.id),
  );
  const rs3 = Object.values(BOSS_NOTES).filter(
    (n) => n.edition === "RS3" && LOCATIONS.some((l) => l.id === n.id),
  );
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Bosses</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Arenas and raids · pick a game first.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialPulse />
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Old School RuneScape</h2>
          <PlaceGrid>
            {osrs.map((note) => {
              const loc = LOCATIONS.find((item) => item.id === note.id);
              return (
                <PlaceCard
                  key={note.id}
                  to="/bosses/$id"
                  params={{ id: note.id }}
                  src={loc?.viewA}
                  name={note.title}
                  kind="Boss"
                  game="Old School RuneScape"
                />
              );
            })}
          </PlaceGrid>
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">RuneScape 3</h2>
          <PlaceGrid>
            {rs3.map((note) => {
              const loc = LOCATIONS.find((item) => item.id === note.id);
              return (
                <PlaceCard
                  key={note.id}
                  to="/bosses/$id"
                  params={{ id: note.id }}
                  src={loc?.viewA}
                  name={note.title}
                  kind="Boss"
                  game="RuneScape 3"
                />
              );
            })}
          </PlaceGrid>
        </section>
      </main>
    </div>
  );
}
