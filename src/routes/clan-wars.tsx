import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The minigame. Two canons. Before the ditch you could fight almost anywhere. Wiki keeps the hour.",
    ),
  component: ClanWarsPage,
});

const STRIP_WHAT = [
  { src: "/clan-wars/osrs-ferox.png", name: "Ferox" },
  { src: "/clan-wars/rs3-grotto.png", name: "Grotto" },
  { src: "/stills/rsc/rsc-ranging.jpg", name: "Classic fight" },
] as const;

const STRIP_OSRS = [
  { src: "/locations/catherby.jpg", name: "Catherby" },
  { src: "/locations/yanille.jpg", name: "Yanille" },
  { src: "/locations/ardougne.jpg", name: "Ardougne" },
] as const;

const STRIP_RS3 = [
  { src: "/clan-wars/more/rs3-arena.png", name: "The field" },
  { src: "/locations/falador.jpg", name: "Falador gate" },
  { src: "/locations/burthorpe.jpg", name: "Burthorpe" },
] as const;

const STRIP_HISTORY = [
  { src: "/stills/rsc/rsc-lumbridge.jpg", name: "The walk" },
  { src: "/clan-wars/rsc-edge-store.png", name: "Edgeville store" },
  { src: "/clan-wars/classic-wild1.jpg", name: "2001 wild" },
] as const;

const STRIP_WIN = [
  { src: "/locations/varrock.jpg", name: "Varrock" },
  { src: "/locations/osrsfalador.jpg", name: "Falador east bank" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville road" },
] as const;

const STRIP_DOORS = [
  { src: "/clan-wars/more/osrs-portal-green.png", name: "Green — Ferox exit" },
  { src: "/clan-wars/more/osrs-portal-teal.png", name: "Teal — Ferox exit" },
  { src: "/clan-wars/more/rs3-rated-portal.png", name: "Rated door" },
  { src: "/clan-wars/more/rs3-clan-wars-portal.png", name: "RuneScape — the war" },
  { src: "/clan-wars/more/rs3-clan-wars-exit.png", name: "RuneScape — exit" },
  { src: "/clan-wars/more/rs3-ffa.png", name: "Grotto FFA" },
] as const;

const CURRENT_DOORS = [
  { src: "/clan-wars/more/osrs-portal-magenta.png", name: "Purple portal", era: "Current Clan Wars", note: "Ferox. The arranged war." },
  { src: "/clan-wars/osrs-ffa-portal.png", name: "White portal", era: "Current FFA", note: "Ferox. Practice. No terms." },
] as const;

const CASTLE_DOORS = [
  { src: "/clan-wars/more/osrs-cw-portal.png", name: "The door", era: "Castle Wars", note: "West of Yanille. You pick a colour inside." },
  { src: "/clan-wars/more/osrs-cw-blue.png", name: "Saradomin", era: "Blue portal", note: "The white castle. Bandages, not food." },
  { src: "/clan-wars/more/osrs-cw-red.png", name: "Zamorak", era: "Red portal", note: "The dark castle. Twenty minutes." },
] as const;

const PIT_STILLS = [
  { src: "/clan-wars/pits/osrs-champion.png", name: "Champion", era: "Old School", note: "Last one standing. Tokkul, not a flag." },
  { src: "/clan-wars/pits/rs3-pits.jpg", name: "The bowl", era: "RuneScape", note: "TzHaar City. People in the pit." },
  { src: "/clan-wars/pits/rs3-waiting.jpg", name: "Waiting room", era: "RuneScape", note: "Safe now. 13 May 2008 was not." },
  { src: "/clan-wars/pits/rs3-celebration.jpg", name: "The win", era: "RuneScape", note: "The city watches." },
] as const;

const ROOMS = [
  {
    place: "Wilderness",
    era: "RuneScape Classic",
    note: "People on the grass. Before the portals.",
    srcs: [
      "/clan-wars/fresh/rsc-combat.gif",
      "/stills/rsc/rsc-woodcutting.jpg",
      "/clan-wars/classic-wild2.jpg",
    ],
  },
  {
    place: "Edgeville",
    era: "Old School",
    note: "The last town before you mean it.",
    srcs: ["/clan-wars/osrs-edgeville-shot.png"],
  },
] as const;

function doorInk(label: string) {
  const t = label.toLowerCase();
  if (t.includes("purple") || t.includes("magenta") || t.includes("the war")) return "#9b4dff";
  if (t.includes("white")) return "#efe4c8";
  if (t.includes("green")) return "#3d9b5c";
  if (t.includes("teal")) return "#3aa8a8";
  if (t.includes("saradomin") || t.includes("blue")) return "#4a7ec8";
  if (t.includes("zamorak") || (t.includes("red") && !t.includes("rated"))) return "#9b1b1b";
  if (t.includes("rated") || t.includes("gold") || t.includes("exit")) return "#c6a45a";
  return "#c6a45a";
}

function ShotStrip({ items }: { items: readonly { src: string; name: string }[] }) {
  return (
    <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
      {items.map((item) => (
        <figure
          key={item.src}
          className="w-[240px] shrink-0 snap-start overflow-hidden rounded-md border bg-[#120e0a]"
          style={{ borderColor: "rgba(198,164,90,0.55)" }}
        >
          <div className="h-0.5 bg-[#c6a45a]" aria-hidden="true" />
          <div className="flex h-44 items-center justify-center bg-[#0c0a08] px-2">
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="max-h-40 w-full object-contain"
            />
          </div>
          <figcaption className="px-2 py-1.5 text-[11px] tracking-[0.08em] text-[#c6a45a] uppercase">{item.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function StillGrid({
  items,
}: {
  items: readonly { src: string; name: string; era?: string; note?: string }[];
}) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-md border bg-[#120e0a]"
          style={{ borderColor: doorInk(item.name) }}
        >
          <div className="h-0.5" style={{ background: doorInk(item.name) }} aria-hidden="true" />
          <div className="flex h-40 items-center justify-center bg-[#0c0a08] px-2 md:h-48">
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="max-h-36 w-full object-contain md:max-h-44"
            />
          </div>
          <figcaption className="border-t border-[#c6a45a]/20 px-2 py-1.5">
            <p className="text-[12px] text-[#efe4c8]">{item.name}</p>
            {item.era ? (
              <p className="text-[11px] tracking-[0.12em] text-[#c6a45a] uppercase">{item.era}</p>
            ) : null}
            {item.note ? <p className="mt-0.5 text-[11px] text-[#b7a989]">{item.note}</p> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function RoomDeck({
  place,
  era,
  note,
  srcs,
}: (typeof ROOMS)[number]) {
  const [i, setI] = useState(0);
  const src = srcs[i] ?? srcs[0];
  const n = srcs.length;
  return (
    <figure className="overflow-hidden rounded-md border border-[#c6a45a]/70 bg-[#120e0a] shadow-[inset_0_0_0_1px_rgba(198,164,90,0.15)]">
      <div className="h-0.5 bg-[#c6a45a]" aria-hidden="true" />
      <div className="relative flex min-h-[280px] items-center justify-center bg-[#0c0a08] md:min-h-[340px]">
        <img src={src} alt={`${place}, ${era}`} className="max-h-[340px] w-full object-contain md:max-h-[400px]" />
        {n > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-md border border-[#c6a45a]/60 bg-[#120e0a]/80 text-[#efe4c8]"
              aria-label={`Previous still, ${place}`}
              onClick={() => setI((n + i - 1) % n)}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-md border border-[#c6a45a]/60 bg-[#120e0a]/80 text-[#efe4c8]"
              aria-label={`Next still, ${place}`}
              onClick={() => setI((i + 1) % n)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      <figcaption className="border-t border-[#c6a45a]/25 px-3 py-2">
        <p className="text-sm text-[#efe4c8]">{place}</p>
        <p className="text-[11px] tracking-[0.12em] text-[#c6a45a] uppercase">{era}</p>
        <p className="mt-1 text-[12px] text-[#b7a989]">{note}</p>
        {n > 1 ? (
          <p className="mt-1 text-[11px] text-[#8a7a5a]">
            {i + 1} / {n}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function ClanWarsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-[11px] tracking-[0.22em] text-[#c6a45a] uppercase">
          The hall
        </p>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          The minigame. Not a login. Two chats walk through a purple portal and agree the
          terms. The ditch came first. The flag game is a different map. Wiki keeps the hour.
        </p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-sm">
          <a className="text-parchment" href="https://oldschool.runescape.wiki/w/Clan_Wars" target="_blank" rel="noopener noreferrer">
            Old School wiki
          </a>
          <a className="text-parchment" href="https://runescape.wiki/w/Clan_Wars" target="_blank" rel="noopener noreferrer">
            RuneScape wiki
          </a>
          <a className="text-parchment" href="https://oldschool.runescape.wiki/w/Castle_Wars" target="_blank" rel="noopener noreferrer">
            Castle Wars
          </a>
          <a className="text-parchment" href="https://oldschool.runescape.wiki/w/TzHaar_Fight_Pit" target="_blank" rel="noopener noreferrer">
            Fight Pit
          </a>
          <a className="text-parchment" href="https://runescape.wiki/w/TzHaar_Fight_Pit" target="_blank" rel="noopener noreferrer">
            Fight Pit · RS
          </a>
          <Link to="/pvp" className="text-parchment">
            PvP
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="clan-wars" />
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <section>
          <h2 className="section-h2">What it is</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Two sides fight under rules the captains picked. On Old School those sides are
            chat-channels — not the clan tab, not a citadel. On RuneScape they are Friends
            Chats. It is PvP with a ceiling. Most wars are safe: you keep the bag. That is
            why clans practice here and why F2P masses still fill a world. The Wilderness is
            a different tax. Before August 2001 there was not even a ditch — Player Killer
            mode meant most of the map. Do not mix those sheets.
          </p>
          <ShotStrip items={STRIP_WHAT} />
        </section>

        <section>
          <h2 className="section-h2">The doors</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Colour is the contract. Read it before you step.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <span className="text-fg">Purple / magenta.</span> Current Clan Wars at
              Ferox. Captains already agreed the terms. Two-minute wall. This is the match.
            </li>
            <li>
              <span className="text-fg">White.</span> Free-for-all. Practice. Stats restore.
              No terms. Do not treat it like a scheduled fight.
            </li>
            <li>
              <span className="text-fg">Green and teal.</span> Ferox exits. They take you out
              of the pocket. They are not the war.
            </li>
            <li>
              <span className="text-fg">Red and blue at Castle Wars.</span> Zamorak and
              Saradomin. That is the flag game west of Yanille, not this minigame.
            </li>
            <li>
              <span className="text-fg">Red on RuneScape FFA.</span> Dangerous. Items drop.
              Protect Item is the keep. White on that client is the safe FFA.
            </li>
            <li>
              <span className="text-fg">RuneScape purple.</span> The current Clan Wars
              portal in Gamers’ Grotto. Same job as Old School magenta: the arranged war.
              The gold door next to it is the exit.
            </li>
            <li>
              <span className="text-fg">Rated door.</span> Clan Camp sheet. If the lobby is
              quiet, the wiki is the verdict.
            </li>
          </ul>
          <StillGrid items={STRIP_DOORS} />
        </section>

        <section>
          <h2 className="section-h2">History</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The Wilderness is not the first PvP law. Clan Wars is not the first clan
            fight. Dates below are from the live wikis and the official newsposts they
            cite. If a lobby went quiet, the wiki is the verdict.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">4 January 2001 — fight almost anywhere</h3>
          <p className="text-sm leading-relaxed text-muted">
            RuneScape Classic launched. There was no Wilderness. A character was Player
            Killer or not. PK mode put an Attack option on other players in most of the
            world. Lumbridge and banks were the usual safe tiles. Guards tried to stop a
            fight in town. You could flip PK / non-PK a few times; after that the choice
            stuck. Combat colour on the name told you higher, even, or lower. Multi was
            the default weather. Clans did not have a portal. They had a world, a time,
            and a tile people already used — Varrock road, Edgeville, the walk out of
            Lumbridge. That is how the first piles formed. Official Classic wiki:
            player killing, before 13 August 2001.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">13 August 2001 — the ditch is born</h3>
          <p className="text-sm leading-relaxed text-muted">
            Update: Wilderness system online. Forinthry on the map. The world roughly
            doubled. PK / non-PK modes left with that patch. PvP became a place, not a
            character flag. Combat bracket walks with the level number painted on the
            ground. A skull means you attacked first and you keep fewer pieces. That is
            the original tax. Jagex put the ditch in because players could not leave
            Lumbridge without walking into a pile. Free players learned PKing here
            because there was nowhere else that dropped the bag. Clans still did not
            need a minigame. Two chats picked a multi tile north of Edgeville and
            walked. Worlds are closed on Classic. The letters still remember that walk.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">13 December 2004 — the flag</h3>
          <p className="text-sm leading-relaxed text-muted">
            Castle Wars is capture the flag. Saradomin and Zamorak west of Yanille.
            Twenty minutes. Bandages, not food. Tickets at the exchange. It taught
            clans to pile without the skull. It is not Clan Wars. If someone says they
            warred at the ditch with a standard on their back, they are mixing two maps.
          </p>
          <StillGrid items={CASTLE_DOORS} />

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">19 September 2005 — the pit</h3>
          <p className="text-sm leading-relaxed text-muted">
            TzHaar Fight Pit. Last player standing under Karamja. Not a clan room. Not
            the Cave. Not the Kiln. Tokkul for the champion. Safe PvP on both live
            clients unless a bug made the waiting room hot — 13 May 2008 on the main
            client, fixed the same day. The live sheet sits under Fight Pits below.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">18 April 2007 — the ditch you have to confirm</h3>
          <p className="text-sm leading-relaxed text-muted">
            The Wilderness ditch went in so a lure could not walk you over the line
            without a click. Old School still wears that fence. The Doomsayer can
            quiet the warning. The line is still the line.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">10 December 2007 — the law breaks and the room is named</h3>
          <p className="text-sm leading-relaxed text-muted">
            Official post: Wilderness Changes, Bounty Hunter and Clan Wars. Free trade
            and open Wilderness PvP left the main client in a fight about real-world
            gold. Revenants took the monster slot. The PKing crater was renamed Bounty
            Hunter. Clan Wars was the first named clan room: captains, terms, purple
            portal, two-minute wall. The first house sat in the wild as compensation,
            not as a skin. Clans that had lived on the ditch learned a ceiling. The bag
            could stay. That is why the minigame still exists.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">9 September 2008 — white and red</h3>
          <p className="text-sm leading-relaxed text-muted">
            Clan Wars Update on the main client. White portal: safe free-for-all.
            Red portal: dangerous free-for-all, items drop. Purple stayed the arranged
            war. People still mix those three colours. Read the door.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">2008–2009 — PvP worlds and bounty worlds</h3>
          <p className="text-sm leading-relaxed text-muted">
            15 October 2008: PvP worlds, so the tax could live on a server instead of
            only on a crater. 6 May 2009: Bounty Hunter worlds put target PvP across
            the Wilderness on those worlds. Those sheets were for the main client of
            that hour. Confirm what is live on the wiki before you describe them as
            current.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">Winter 2010 — the vote</h3>
          <p className="text-sm leading-relaxed text-muted">
            24 December 2010 to 14 January 2011: a referendum to bring back the old
            Wilderness and free trade. Ninety-one percent said yes. That number is why
            the next date exists.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">1 February 2011 — the wild comes home, the hall leaves</h3>
          <p className="text-sm leading-relaxed text-muted">
            Open PvP and free trade returned on the main client. Revenants were pushed
            into Forinthry Dungeon. Clan Wars, Fist of Guthix, and Stealing Creation
            left the Wilderness for Gamers’ Grotto, north of Falador. The old Clan Wars
            house became the Bone Yard. Bounty worlds of that era were stood down. The
            ditch was a ditch again. The named room kept the ceiling in a cave.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">22 February 2013 — two grammars</h3>
          <p className="text-sm leading-relaxed text-muted">
            Old School RuneScape is the 2007-era client voted back. It inherits the
            ditch, the skull, and the combat bracket. It does not inherit the 2011
            Grotto as its first Clan Wars house. That comes later, by poll.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">19 June 2014 — Old School names the room</h3>
          <p className="text-sm leading-relaxed text-muted">
            A priority poll put Clan Wars on the 2007-era client. First house: Giants’
            Plateau. 26 June added Soggy Swamp as a free-to-play arena. 6 November added
            the Classic Arena. 16 April 2015 added timed deathmatch and Oddskull. The
            maps changed. The rule did not: captain to captain, then the wall. The
            Wilderness outside that house stayed the tax.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">The main client after the split</h3>
          <p className="text-sm leading-relaxed text-muted">
            RuneScape kept the Grotto. Deep Wilderness opened to free players on 9
            October 2017. PvP on that client is opt-in now — Vala in Edgeville is the
            switch the wiki names. Skulled in a dangerous tile still means a fight.
            The first two tiles north of the wall are safe. Confirm the current toggle
            on the RuneScape wiki. Do not paste an Old School skull onto that well.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">16 July 2020 — Ferox</h3>
          <p className="text-sm leading-relaxed text-muted">
            Official Old School news: Ferox Enclave. Carrallanger’s old stone, a safe
            pocket in Wilderness 13–16. Bank. Pool of Refreshment. Clan Wars and Last
            Man Standing moved here from Giants’ Plateau. White portal to practice.
            Purple for the war. Ring of dueling, minigame teleport, or a waka canoe.
            Teleblocked players stay outside. A Castle Wars portal sits on the east of
            the LMS house — that is the flag game, not this minigame. The Old Nite is a
            pub in this enclave, named for an early hiscores board; the plaque is on
            History. Bounty Hunter’s door is here too, and it leads to Daimon’s Crater,
            not the purple wall. Do not mix those three rooms.
          </p>
          <StillGrid items={CURRENT_DOORS} />

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">23 May 2024 — Classic F2P magic</h3>
          <p className="text-sm leading-relaxed text-muted">
            Official Old School patch: a Magic dropdown option so Bind is the only freeze
            if that box is ticked. Captains who want 2007 F2P grammar use that switch.
            Food, overheads, specs, and the team cap are still the other boxes. Read them.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">13 November 2024 — blighted in the pocket</h3>
          <p className="text-sm leading-relaxed text-muted">
            Blighted supplies may be eaten inside Ferox. The pocket is still a pocket.
            The ditch outside is still the tax.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">2025 — Bounty Hunter is a crater</h3>
          <p className="text-sm leading-relaxed text-muted">
            On the live Old School wiki, Bounty Hunter is Daimon’s Crater, not Clan Wars.
            You walk from a Ferox portal, put coins in a coffer, and take a target. The
            PvP-world rota is a rota — worlds move; the wiki prints this week’s list.
            Official news dated 7 September 2026 named Period A for that week. Do not
            tattoo a world number on this page.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">28 January 2026 — Oddskull still a mode</h3>
          <p className="text-sm leading-relaxed text-muted">
            Official Old School patch: the opposing team can pick up a dropped Oddskull
            again. Last team standing, first to X kills, king of the hill, most kills,
            and Oddskull are still the purple-portal scores. Twelve maps. Classic arena
            is one of them. The 29 June 2026 RuneScape patch that cleared bleeds after
            death is the same proof on the other client: the Grotto is still live.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">27 May 2026 — thirty seconds</h3>
          <p className="text-sm leading-relaxed text-muted">
            Old School Wilderness: if you die without another player in combat for the
            last thirty seconds, that death is PvM, not PvP — even if someone tagged you
            earlier. 8 July 2026 added a warning when you walk in with untradeables that
            need a Trouver parchment. File those on the wiki. They are ditch law, not
            Ferox terms.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">The current hour</h3>
          <p className="text-sm leading-relaxed text-muted">
            Old School Clan Wars still lives in Ferox. Official FFA world is printed on
            the wiki. LMS Competitive is a different building in the same enclave.
            Fight Pit is still a TzHaar bowl. Castle Wars is still west of Yanille, with
            a portal from Ferox if you want the flag without the walk. RuneScape Clan
            Wars still lives in Gamers’ Grotto. Rated Clan Wars, when it is on, is Clan
            Camp — confirm the lobby on the RuneScape wiki. Vala in Edgeville is still
            the opt-in for that client’s wild. Official news dated 7 September 2026
            pointed Pete Kayer’s PvP Challenges at Ferox from 7 October. That is a
            posted hour, not a live room until the post says it is.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">How the piles actually worked</h3>
          <p className="text-sm leading-relaxed text-muted">
            Classic, before the ditch: call a world, stand on a road people already
            used, hope the non-PK flag was off. After August 2001: call a wilderness
            level and a landmark — graveyard, green dragons, Chaos Temple, the ditch
            north of Edgeville. Multi meant the pile. Single meant you picked one
            name. A runner into multi was bait, not a kill. Old School still uses
            that grammar on the ditch and on PvP worlds. RuneScape 3 moved the opt-in
            to Vala in Edgeville and kept dangerous FFA behind the red Grotto door.
            Official Clan Wars on both live clients is the ceiling: captains, terms,
            two-minute wall, bag usually stays. Wilderness clan wars after that are
            still just two chats and a tile. Protect Item or you are sightseeing.
            Named clans from public memory belong on History. This page keeps the
            rooms.
          </p>

          <h3 className="mt-5 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">The ditch after the portal</h3>
          <p className="text-sm leading-relaxed text-muted">
            Wilderness clan wars after the minigame still happen: two chats pick a
            multi tile and a world. That is not Ferox. That is not the Grotto. That is
            the tax. Protect Item is on or you are sightseeing. PvP worlds on Old
            School treat the map outside the wild as level 15 for the bracket. Bounty
            Hunter is its own crater and its own world list — file it on the wiki, not
            as a second Clan Wars. This page keeps the portals. The PvP page keeps the
            skull.
          </p>
          <ShotStrip items={STRIP_HISTORY} />
        </section>

        <section>
          <h2 className="section-h2">Old School</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Ferox Enclave — a safe pocket of the Wilderness. Ring of dueling,
            minigame teleport, or a waka canoe. Edgeville is the last ordinary town on
            the walk north. Yanille is west-country; the Castle Wars door sits past it,
            and a portal from Ferox will take you there. Giants’ Plateau was the first
            Old School house. It is not the house anymore. LMS is the next building.
            Bounty Hunter is the crater through its own door. The Old Nite is the pub.
          </p>
          <ShotStrip items={STRIP_OSRS} />
        </section>

        <section>
          <h2 className="section-h2">RuneScape</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Gamers’ Grotto, a cave north of Falador. Same idea: captain to
            captain, Friends Chat, up to a hundred a side. The field after the purple
            portal is the war. White is the safe FFA. Red is the dangerous FFA — items
            drop, Protect Item is the keep. Falador east bank was the merch lawn —
            people stood there to trade, not to pile. Burthorpe is the next hill, not
            the Grotto. Rated Clan Wars, if the lobby is up, is Clan Camp. A June 2026
            bleed patch is why this desk still calls the Grotto live. Clan citadels are
            a different skill. Do not mix them.
          </p>
          <ShotStrip items={STRIP_RS3} />
        </section>

        <section>
          <h2 className="section-h2">Fight Pits</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            TzHaar-Xil built a bowl for sport. 19 September 2005. You walk in with a
            crowd. You walk out alone or you sit the orb. There is no captain and no
            two-minute wall. The jingle is called Last Man Standing. That name later
            went to a different minigame in Ferox. The Cave is Jad. The Kiln is a later
            vow. This page is people. Do not mix those sheets.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Safe on both live clients. The bag stays. Hardcore group iron may stand
            here. Anything goes — the armour you wore in is the armour you fight in.
            A kill puts them back in the waiting room. Last one standing is champion.
            Tokkul is the combined combat of the people you beat, not a bank dump.
            Leave early and you do not count.
          </p>

          <h3 className="mt-4 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">Old School — Mor Ul Rek</h3>
          <p className="text-sm leading-relaxed text-muted">
            West of the inner city, under the volcano. Members. Minigame teleport:
            TzHaar Fight Pit. Fairy ring BLP, then north and west. Official world is
            printed on the wiki — do not tattoo a number here. The waiting room is a
            small enclosure. The pillar is the orb. TzHaar-Mej-Kah outside toggles
            combat experience (25 March 2026). The red skull on the champion lasts an
            hour unless you teleport, swap kit, pray overhead, hop, log, or eat a
            monster hit. Hard Karamja diary wants that crown.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The bowl will not wait forever. Official Old School hour, 4 February 2026:
            the Cave’s roster walks in as the clock runs. Tz-Kih at ninety seconds.
            Tz-Kek at three and a half minutes. Tok-Xil at five and a half. Ket-Zek at
            seven and a half. Jad at nine and a half. At eleven and a half the gas
            fills and you take a hit every tick until one name is left. 8 July 2026
            fixed aggro range. Hide in a corner, pile with a chat, or stall — the
            volcano does not care which. File the live wave table on the wiki if this
            desk drifts.
          </p>

          <h3 className="mt-4 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">RuneScape — TzHaar City</h3>
          <p className="text-sm leading-relaxed text-muted">
            Same bowl, later grammar. TokKul-Zo is the fast door. Official world is
            printed on the wiki when the city is quiet. The waiting room still has the
            pillar. Next fight starts when a champion is named or two people are
            waiting. Waves of TzHaar can rush a stall — Tz-Kih, Tz-Kek, Tok-Xil — then
            the floor starts taking life until one is left. That finish is this
            client’s. Champion Tokkul still scales with who you beat. A hybrid robe
            can drop. Confirm the current table on the RuneScape wiki.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            13 May 2008 was not safe. The waiting room went hot the day TokTz-Ket-Dill
            shipped. People died for the bag. Jagex closed it the same day and banned
            the ones who farmed it. Street name: TzHaar massacre. File it as history,
            not as the current rule. 21 June 2011 tried a global instance so any world
            could fill a pit. 14 February 2012 took that search off. It is not coming
            back on the live page. If the lobby is empty this month, the wiki is the
            verdict. Elder Kiln, Brink of Extinction, Fight Cauldron, and Zuk are other
            doors under the same mountain. They are not this minigame.
          </p>

          <h3 className="mt-4 mb-1 text-sm tracking-[0.14em] text-[#c6a45a] uppercase">How the pit is won</h3>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Stand in the waiting room. Two names or the last champion ends the last round.</li>
            <li>2. The orb is for watching. Walking in is for fighting.</li>
            <li>3. A kill is an eject, not a loot pile. The bag stays.</li>
            <li>4. Do not treat the gas / TzHaar waves as optional. The clock is a third team.</li>
            <li>5. The jingle is the pit. LMS in Ferox is a different building. The Cave is Jad. Leave them on their own pages.</li>
          </ol>
          <StillGrid items={PIT_STILLS} />
        </section>

        <section>
          <h2 className="section-h2">How to not donate the hour</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Read the terms. Food off is a different fight than food on.</li>
            <li>2. Enter before the wall drops. Late is a spectator.</li>
            <li>3. One target. Solo in a pile is the loot even when the bag is safe.</li>
            <li>4. Do not chase through a rule you disabled.</li>
            <li>5. White is practice. Purple is the match. Red on RuneScape is the tax.</li>
          </ol>
          <ShotStrip items={STRIP_WIN} />
        </section>

        <section>
          <h2 className="section-h2 mb-3 text-center">The rooms</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ROOMS.map((room) => (
              <RoomDeck key={`${room.place}-${room.era}`} {...room} />
            ))}
          </div>
        </section>

        <p className="text-sm text-parchment">
          <Link to="/pvp">PvP</Link>
          {" · "}
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/history">History</Link>
        </p>
      </main>
    </div>
  );
}
