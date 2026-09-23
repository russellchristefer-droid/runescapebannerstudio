import { createFileRoute, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { BackLink } from "@/components/back-link";
import { BossSheet } from "@/components/boss-sheet";
import { noteFor } from "@/lib/boss-notes";
import { sheetFor } from "@/lib/boss-sheets";
import { LOCATIONS, type Edition } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";
import { godNeon } from "@/lib/gods";
import { PlaceRail } from "@/components/place-rail";
import { UseOnBanner } from "@/components/use-on-banner";
import { PlaceChip, bossPath, godPath, townPath } from "@/components/place-chip";
import { townNote } from "@/lib/town-notes";
import { MONSTERS } from "@/lib/monsters";

export const Route = createFileRoute("/bosses/$id")({
  head: ({ params }) => {
    const note = noteFor(params.id);
    return pageMeta(note?.title ?? "Boss", "Working PvM sheet. Wear, eat, spec, wipe. Wiki keeps the hour.");
  },
  component: BossNotePage,
});

function BossNotePage() {
  const { id } = Route.useParams();
  const note = noteFor(id);
  const sheet = sheetFor(id);
  const loc = LOCATIONS.find((item) => item.id === id);
  if (!note || !sheet || !loc) throw notFound();
  const god = note.id === "royal" ? undefined : loc.god;
  const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const floor =
    god === "Saradomin" ? "#0c1420"
    : god === "Zamorak" ? "#1a0a0a"
    : god === "Guthix" ? "#0c160e"
    : god === "Armadyl" ? "#10141a"
    : god === "Bandos" ? "#16120a"
    : god === "Seren" ? "#0c1818"
    : god === "Zaros" ? "#140e1a"
    : god === "Sliske" ? "#121018"
    : god === "Tumeken" ? "#16140a"
    : god === "Elidinis" ? "#0c1616"
    : god === "Marimbo" ? "#160e12"
    : "#120e10";
  return (
    <div className="boss-page min-h-dvh" style={{ "--boss-bg": floor } as CSSProperties}>
      <header className="px-5 py-5 md:px-8">
        <BackLink />
        <div className="mt-3">
          <PlaceRail section="bosses" />
        </div>
      </header>
      <main id="content" className="boss-door px-5 pb-10">
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="boss-still"
          loading="eager"
          decoding="async"
        />
        <h1 className="boss-name page-h1 mt-5">{note.title}</h1>
        <p className="boss-sub">
          {game}
          {" · "}
          {sheet.role}
          {god ? (
            <>
              {" · "}
              <span style={{ color: godNeon(god) }}>{god}</span>
            </>
          ) : null}
        </p>
        <span className="boss-rule" aria-hidden="true" />
        <section className="boss-visit">
          <h2 className="sr-only">Places to visit</h2>
          <BossVisit id={loc.id} name={loc.name} edition={loc.edition} god={god} title={note.title} src={loc.viewA} />
        </section>
        <div className="boss-guide">
          <BossSheet sheet={sheet} />
        </div>
      </main>
    </div>
  );
}

/** The plated town that is the door. No chip when that street is not on the atlas. */
const BOSS_DOOR: Record<string, string> = {
  rs3graardor: "heart",
  rs3kril: "heart",
  rs3zilyana: "heart",
  rs3kree: "heart",
  rs3nex: "heart",
  helwyr: "heart",
  vindicta: "heart",
  gregorovic: "heart",
  aod: "heart",
  telos: "heart",
  kq: "osrsshan",
  rs3kq: "shantay",
  kk: "sophanem",
  kbd: "osrsedge",
  rs3kbd: "edgeville",
  chaosel: "osrsedge",
  vetion: "osrsedge",
  calvarion: "osrsedge",
  callisto: "osrsedge",
  artio: "osrsedge",
  venenatis: "osrsedge",
  spindel: "osrsedge",
  scorpia: "osrsedge",
  crazyarch: "osrsedge",
  fanatic: "osrsedge",
  corp: "osrsedge",
  kraken: "osrspisc",
  cerberus: "osrstav",
  guardians: "osrscani",
  smoke: "osrspoll",
  hydra: "shayzien",
  cox: "shayzien",
  yama: "shayzien",
  sarachnis: "hosidius",
  vorkath: "osrsrel",
  tob: "osrsmeiyer",
  gauntlet: "osrsprif",
  jad: "osrsmor",
  inferno: "osrsmor",
  mole: "osrsfalador",
  scurrius: "osrsvarrock",
  nightmare: "osrsslepe",
  colosseum: "fortis",
  huey: "osrscamtorum",
  amox: "osrscamtorum",
  kerapac: "anachronia",
  raksha: "anachronia",
  glacor: "senntisten",
  croesus: "senntisten",
  zamorakboss: "senntisten",
  rasial: "cityofum",
  sanctum: "cityofum",
  solak: "lostgrove",
  qbd: "falls",
  araxxor: "canifis",
  zuk: "morulrek",
  ambassador: "daemonheim",
};

function BossVisit({
  id,
  name,
  edition,
  god,
  title,
  src,
}: {
  id: string;
  name: string;
  edition: Edition;
  god?: (typeof LOCATIONS)[number]["god"];
  title: string;
  src: string;
}) {
  const sister = LOCATIONS.find(
    (item) => item.kind === "boss" && item.name === name && item.edition !== edition && item.id !== id && noteFor(item.id),
  );
  const doorId = BOSS_DOOR[id];
  const door = doorId
    ? LOCATIONS.find((item) => item.id === doorId && item.kind === "town" && item.edition === edition && townNote(item.id))
    : undefined;
  const beast = MONSTERS.find((row) => row.edition === edition && row.name.toLowerCase() === title.toLowerCase());
  const sisterLabel = edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School";
  return (
    <nav aria-label="Places to visit" className="town-visit">
      <UseOnBanner src={src} edition={edition} placeId={id} />
      {sister ? <PlaceChip href={bossPath(sister.id)}>{sisterLabel}</PlaceChip> : null}
      {door ? <PlaceChip href={townPath(door.id)}>{door.name}</PlaceChip> : null}
      {god ? <PlaceChip href={godPath(god)}>{god}</PlaceChip> : null}
      {beast ? <PlaceChip href={`/monsters/${beast.id}`}>Bestiary</PlaceChip> : null}
    </nav>
  );
}
