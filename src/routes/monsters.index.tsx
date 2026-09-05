import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { MONSTERS, monsterStillSrc } from "@/lib/monsters";
import { pageMeta } from "@/lib/page-title";
import type { Monster } from "@/lib/monsters";

export const Route = createFileRoute("/monsters/")({
  head: () => pageMeta("Bestiary", "Slayer and dungeon creatures. Bosses have their own page."),
  component: BestiaryPage,
});

function BestiaryPage() {
  const [slayerOnly, setSlayerOnly] = useState(false);
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = MONSTERS.filter((row) => row.kind === "monster")
    .filter((row) => (slayerOnly ? row.slayer : true))
    .filter((row) => !needle || row.name.toLowerCase().includes(needle) || row.slug.includes(needle.replace(/\s+/g, "-")));
  const osrs = rows.filter((row) => row.edition === "OSRS");
  const rs3 = rows.filter((row) => row.edition === "RS3");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Bestiary</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          A fan ledger of creatures. Not Jagex. Bosses are elsewhere.
        </p>
        <p className="mt-1 text-center text-sm">
          <Link to="/bosses" className="text-parchment">
            Bosses have their own page.
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <input
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search by name"
            aria-label="Search bestiary"
            className="min-h-11 w-48 rounded-md border border-line bg-surface px-3 text-sm text-parchment"
          />
          <button
            type="button"
            aria-pressed={slayerOnly}
            className={`min-h-11 rounded-md border px-3 text-xs ${
              slayerOnly ? "border-parchment bg-surface text-parchment" : "border-line text-muted"
            }`}
            onClick={() => setSlayerOnly((on) => !on)}
          >
            Slayer
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        <GameBlock title="Old School RuneScape" rows={osrs} />
        <GameBlock title="RuneScape" rows={rs3} />
      </main>
    </div>
  );
}

function GameBlock({ title, rows }: { title: string; rows: Monster[] }) {
  return (
    <section className="mb-10">
      <h2 className="section-h2 mb-3 text-center">{title}</h2>
      {rows.length ? (
        <PlaceGrid>
          {rows.map((row) => (
            <PlaceCard
              key={row.id}
              to="/monsters/$id"
              params={{ id: row.id }}
              src={monsterStillSrc(row)}
              name={row.name}
              kind={row.slayer ? "Slayer" : "Monster"}
              game={title}
              caption={`${row.name} in ${title}`}
            />
          ))}
        </PlaceGrid>
      ) : (
        <p className="text-center text-sm text-muted">Nothing here yet. Clear Slayer if it is on.</p>
      )}
    </section>
  );
}