import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceCard, PlaceGrid } from "@/components/place-card";
import { PlaceRail, usePlaceFilter } from "@/components/place-rail";
import { BOSS_NOTES, bossWash } from "@/lib/boss-notes";
import { sheetFor } from "@/lib/boss-sheets";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/bosses/")({
  head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
  component: BossIndex,
});

const HALLS: { title: string; line: string; ids: string[] }[] = [
  {
    title: "God Wars",
    line: "Four generals, then Nex. The other client is a sister, not this room.",
    ids: ["graardor", "kril", "zilyana", "kree", "nex", "rs3graardor", "rs3kril", "rs3zilyana", "rs3kree", "rs3nex"],
  },
  {
    title: "Heart of Gielinor",
    line: "RuneScape commanders. Not the four generals.",
    ids: ["helwyr", "vindicta", "gregorovic", "aod"],
  },
  {
    title: "Elder God Wars",
    line: "RuneScape only. Not the old dungeon.",
    ids: ["kerapac", "glacor", "croesus", "zamorakboss"],
  },
  {
    title: "Desert",
    line: "Kalphite Queen, then the path bosses that have a still. Wardens stay on the raid card.",
    ids: ["kq", "rs3kq", "kk", "zebak", "kephri", "akkha", "baba"],
  },
  {
    title: "Wilderness",
    line: "King Black Dragon lives in this block. Protect item past the ditch.",
    ids: ["kbd", "rs3kbd", "chaosel", "vetion", "calvarion", "callisto", "artio", "venenatis", "spindel", "scorpia", "crazyarch", "fanatic"],
  },
  {
    title: "Slayer halls",
    line: "The boss of the task. The small ones stay in the Bestiary.",
    ids: ["kraken", "cerberus", "sire", "guardians", "hydra", "smoke"],
  },
  {
    title: "Dragon and wyrm",
    line: "Vorkath, Zulrah, Muspah. Queen Black Dragon is the RuneScape dragon.",
    ids: ["vorkath", "zulrah", "muspah", "qbd"],
  },
  {
    title: "Raids",
    line: "Chambers, Theatre, Tombs. RuneScape raids stay on this sheet.",
    ids: ["cox", "tob", "toa", "vorago", "solak", "bm", "yaka", "sanctum"],
  },
  {
    title: "Desert Treasure II",
    line: "Four bosses. One quest. Not God Wars.",
    ids: ["duke", "leviathan", "whisperer", "vardorvis"],
  },
  {
    title: "Isle and cave",
    line: "The Gauntlet is a prep, not a wilderness walk.",
    ids: ["gauntlet"],
  },
  {
    title: "Infernal",
    line: "Jad, then Zuk. Fight Pits stay on Clan Wars.",
    ids: ["jad", "inferno", "zuk"],
  },
  {
    title: "Other",
    line: "Named fights with a still. No empty card.",
    ids: ["mole", "sarachnis", "scurrius", "corp", "nightmare", "royal", "yama", "colosseum", "huey", "amox", "telos", "raksha", "rasial", "araxxor", "ambassador"],
  },
];

function BossIndex() {
  const { edition, setEdition } = usePlaceFilter("OSRS");
  const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const ready = new Set(
    Object.values(BOSS_NOTES)
      .filter((note) => {
        if (note.edition !== edition) return false;
        const loc = LOCATIONS.find((item) => item.id === note.id);
        return Boolean(loc?.viewA && sheetFor(note.id));
      })
      .map((note) => note.id),
  );
  const halls = HALLS.map((hall) => ({
    ...hall,
    ids: hall.ids.filter((id) => ready.has(id)),
  })).filter((hall) => hall.ids.length > 0);
  return (
    <div className="bosses-atlas min-h-dvh">
      <header className="section-head px-5 pt-2 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Bosses</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Two clients. Same card. God Wars is a hall, not a footnote. A fight without a still is not on this page.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#8a3030]" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="bosses" edition={edition} onEdition={setEdition} />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[72rem] flex-col px-5 py-2 md:px-8">
        {halls.length ? (
          halls.map((hall) => (
            <section key={hall.title} className="boss-hall">
              <h2 className="boss-hall-title">{hall.title}</h2>
              <p className="boss-hall-line">{hall.line}</p>
              <PlaceGrid className="boss-grid">
                {hall.ids.map((id) => {
                  const note = BOSS_NOTES[id];
                  const loc = LOCATIONS.find((item) => item.id === id);
                  if (!note || !loc) return null;
                  return (
                    <PlaceCard
                      key={note.id}
                      to="/bosses/$id"
                      params={{ id: note.id }}
                      src={loc.viewA}
                      name={note.title}
                      kind="Boss"
                      game={game}
                      god={note.id === "royal" ? undefined : loc.god}
                      region={loc.region}
                      caption={note.wipe ?? note.role}
                      wash={bossWash(note.id, loc.god)}
                      edition={loc.edition}
                      placeId={loc.id}
                    />
                  );
                })}
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
