import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { MONSTERS, monsterStillLine, monsterStillSrc, monsterWash } from "@/lib/monsters";
import { pageMeta } from "@/lib/page-title";
import type { Edition } from "@/lib/locations";
import type { Monster } from "@/lib/monsters";

export const Route = createFileRoute("/monsters/")({
  head: () => pageMeta("Bestiary", "Slayer and dungeon creatures. Bosses have their own page."),
  component: BestiaryPage,
});

type Canon = Edition | "both";

function familyOf(row: Monster) {
  const key = `${row.slug} ${row.name} ${row.where}`.toLowerCase();
  if (key.includes("dragon")) return "Dragons";
  if (key.includes("stronghold of security") || key.includes("vault of war") || key.includes("catacomb of famine") || key.includes("pit of pestilence") || key.includes("sepulchre"))
    return "Stronghold of Security";
  if (key.includes("legends")) return "Legends' Guild";
  if (key.includes("demon") || key.includes("hellhound") || key.includes("abyssal") || key.includes("ripper") || key.includes("tormented"))
    return "Demons";
  if (key.includes("slayer tower") || key.includes("spectre") || key.includes("gargoyle") || key.includes("nechryael") || key.includes("banshee") || key.includes("bloodveld") || key.includes("crawling"))
    return "Slayer Tower";
  if (key.includes("god wars") || key.includes("spiritual")) return "God Wars";
  if (key.includes("anachronia") || key.includes("dinosaur")) return "Anachronia";
  if (row.slayer) return "Slayer rooms";
  return "Yard and dungeon";
}

const FAMILY_ORDER = [
  "Dragons",
  "Demons",
  "Slayer Tower",
  "Stronghold of Security",
  "Legends' Guild",
  "God Wars",
  "Anachronia",
  "Slayer rooms",
  "Yard and dungeon",
];

function BestiaryPage() {
  const [slayerOnly, setSlayerOnly] = useState(false);
  const [canon, setCanon] = useState<Canon>("OSRS");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = useMemo(() => {
    return MONSTERS.filter((row) => row.kind === "monster")
      .filter((row) => (slayerOnly ? row.slayer : true))
      .filter((row) => (canon === "both" ? true : row.edition === canon))
      .filter((row) => !needle || row.name.toLowerCase().includes(needle) || row.slug.includes(needle.replace(/\s+/g, "-")));
  }, [canon, slayerOnly, needle]);
  const osrsCount = MONSTERS.filter((row) => row.edition === "OSRS").length;
  const rs3Count = MONSTERS.filter((row) => row.edition === "RS3").length;
  const osrs = rows.filter((row) => row.edition === "OSRS");
  const rs3 = rows.filter((row) => row.edition === "RS3");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Bestiary</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          One canon at a time. Search a name. Slayer hides the yard. Bosses have their own page.
        </p>
        <p className="mt-1 text-center text-sm">
          <Link to="/bosses" className="text-parchment">
            Bosses
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <CanonChip current={canon} value="OSRS" label={`Old School (${osrsCount})`} onClick={setCanon} />
          <CanonChip current={canon} value="RS3" label={`RuneScape (${rs3Count})`} onClick={setCanon} />
          <CanonChip current={canon} value="both" label="Both" onClick={setCanon} />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
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
        {canon === "both" ? (
          <p className="mt-2 flex flex-wrap justify-center gap-3 text-center text-[12px] text-muted">
            <a href="#osrs" className="text-parchment">
              Jump to Old School
            </a>
            <a href="#rs3" className="text-parchment">
              Jump to RuneScape
            </a>
          </p>
        ) : null}
      </header>
      <main className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        {canon !== "RS3" ? <GameBlock id="osrs" title="Old School RuneScape" rows={osrs} /> : null}
        {canon !== "OSRS" ? <GameBlock id="rs3" title="RuneScape" rows={rs3} /> : null}
      </main>
    </div>
  );
}

function CanonChip({
  current,
  value,
  label,
  onClick,
}: {
  current: Canon;
  value: Canon;
  label: string;
  onClick: (value: Canon) => void;
}) {
  const on = current === value;
  return (
    <button
      type="button"
      aria-pressed={on}
      className={`min-h-11 rounded-md border px-3 text-xs ${on ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

function GameBlock({ id, title, rows }: { id: string; title: string; rows: Monster[] }) {
  const groups = FAMILY_ORDER.map((family) => ({
    family,
    rows: rows.filter((row) => familyOf(row) === family),
  })).filter((group) => group.rows.length);
  return (
    <section id={id} className="mb-10 scroll-mt-20">
      <h2 className="section-h2 mb-3 text-center">
        {title}
        <span className="ml-2 text-[11px] font-normal text-faint">{rows.length}</span>
      </h2>
      {groups.length ? (
        groups.map((group) => (
          <div key={group.family} className="mb-8">
            <h3 className="mb-3 text-center text-sm text-parchment">{group.family}</h3>
            <PlaceGrid>
              {group.rows.map((row) => (
                <PlaceCard
                  key={row.id}
                  to="/monsters/$id"
                  params={{ id: row.id }}
                  src={monsterStillSrc(row)}
                  name={row.name}
                  kind={row.slayer ? "Slayer" : "Monster"}
                  game={title}
                  caption={monsterStillLine(row)}
                  wash={monsterWash(row)}
                />
              ))}
            </PlaceGrid>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-muted">Nothing here yet. Clear Slayer or search.</p>
      )}
    </section>
  );
}
