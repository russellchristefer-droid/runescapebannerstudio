import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { StillPhoto } from "@/components/still-photo";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The minigame. Two canons. Safe unless the terms say otherwise. Wiki keeps the portals.",
    ),
  component: ClanWarsPage,
});

const SHOTS = [
  {
    src: "/clan-wars/classic-wild1.jpg",
    name: "Wilderness",
    era: "RuneScape Classic",
    note: "2001 preview. The walk north of the ditch.",
  },
  {
    src: "/clan-wars/rsc-edge-store.png",
    name: "Edgeville",
    era: "RuneScape Classic",
    note: "The general store. Last bank before the wild.",
  },
  {
    src: "/clan-wars/osrs-ferox.png",
    name: "Ferox Enclave",
    era: "Old School",
    note: "The current house. Safe pocket. Purple and white.",
  },
  {
    src: "/clan-wars/osrs-edgeville-shot.png",
    name: "Edgeville",
    era: "Old School",
    note: "The last town before you mean it.",
  },
  {
    src: "/clan-wars/osrs-giants-plateau.png",
    name: "Giants' Plateau",
    era: "Old School",
    note: "The first Old School house. 19 June 2014.",
  },
  {
    src: "/clan-wars/osrs-clan-wars.png",
    name: "Clan Wars",
    era: "Old School",
    note: "The hall the wiki still uses.",
  },
  {
    src: "/clan-wars/osrs-ffa-portal.png",
    name: "White portal",
    era: "Old School",
    note: "Free-for-all. Stats come back when you leave.",
  },
  {
    src: "/clan-wars/osrs-castle-wars.png",
    name: "Castle Wars",
    era: "Old School",
    note: "The flag. 13 December 2004. Not this minigame.",
  },
  {
    src: "/locations/yanille.jpg",
    name: "Yanille",
    era: "Old School",
    note: "West of here is the members Castle Wars door.",
  },
  {
    src: "/clan-wars/rs3-grotto.png",
    name: "Gamers' Grotto",
    era: "RuneScape",
    note: "North of Falador since 1 February 2011.",
  },
  {
    src: "/clan-wars/rs3-clan-wars.png",
    name: "Clan Wars",
    era: "RuneScape",
    note: "Challenge hall. Captain to captain.",
  },
  {
    src: "/clan-wars/rs3-castle-wars.png",
    name: "Castle Wars",
    era: "RuneScape",
    note: "Same flag on the main client.",
  },
  {
    src: "/locations/falador.jpg",
    name: "Falador",
    era: "RuneScape",
    note: "The Grotto is north. White walls stay white.",
  },
] as const;

function ClanWarsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          The minigame. Not a login. Two chat-channels walk through a purple portal and
          agree the terms. Stills from the wikis and the Classic wilderness that came first.
        </p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-sm">
          <a
            className="text-parchment"
            href="https://oldschool.runescape.wiki/w/Clan_Wars"
            target="_blank"
            rel="noopener noreferrer"
          >
            Old School wiki
          </a>
          <a
            className="text-parchment"
            href="https://runescape.wiki/w/Clan_Wars"
            target="_blank"
            rel="noopener noreferrer"
          >
            RuneScape wiki
          </a>
          <a
            className="text-parchment"
            href="https://oldschool.runescape.wiki/w/Castle_Wars"
            target="_blank"
            rel="noopener noreferrer"
          >
            Castle Wars
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
            Two Friends Chat / chat-channel sides fight under rules the captains picked.
            It is PvP with a ceiling. Most wars are safe: you keep the bag. That is why
            clans practice here and why F2P masses still fill a world. The Wilderness is
            a different tax. Do not mix the two sheets.
          </p>
        </section>

        <section>
          <h2 className="section-h2">Old School</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Ferox Enclave — a safe pocket of the Wilderness. Ring of dueling,
            minigame teleport, or a waka canoe if you have the woodcutting. The white
            portal is free-for-all practice. The purple portal is the arranged war.
            Official FFA world is printed on the wiki; masses use whatever world the
            host named.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              A captain or higher challenges another captain. Both agree the terms. A
              two-minute wall goes up. Walk in or you are watching.
            </li>
            <li>
              Cap is one hundred a side. Twelve maps. Some are members. The current list
              is on the wiki.
            </li>
            <li>
              Modes: last team standing, first to a kill count, most kills on a timer,
              king of the hill, Oddskull. Combat can ban a style, lock a spellbook,
              strip overheads, or cap the team at 5v5.
            </li>
            <li>
              Death sends you to the jail inside the game. Rejoin only if the terms allow
              it. Items stay. Hardcore group iron is safe here because the wiki says this
              is safe PvP.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            How you win is the mode you signed. Last team standing: the other colour
            leaves the field. Kill races: the number on the board. Hill and Oddskull:
            hold the object, do not chase a runner into a rule you did not read. Call
            the pile. Freeze first if magic is on. F2P Classic magic is Bind only if
            that box was ticked. Do not spec into a PJ timer you asked for.
          </p>
        </section>

        <section>
          <h2 className="section-h2">RuneScape</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Gamers’ Grotto. Same idea: captain challenges captain, purple
            portal, two-minute call. Up to one hundred a side. Win by the kill points
            you agreed or by clearing the other team.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              Safe wars keep the bag. Unsafe wars are a term you have to tick — treat
              that like a skull. Confirm it on the challenge screen before you walk in.
            </li>
            <li>
              White portal is safe FFA. Red portal is dangerous FFA: items drop, no
              gravestone. Protect Item is the only prayer that still means a keep.
            </li>
            <li>
              Rated Clan Wars is a different sheet at the Clan Camp. If that lobby is
              quiet this month, the wiki is the verdict. Do not describe a dead rating
              as live.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            How you win on this client is the same grammar: the terms, then the pile,
            then the board. Revolution bars do not replace a caller. Leave the enrage
            bosses on Bosses.
          </p>
        </section>

        <section>
          <h2 className="section-h2">History</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Three rooms used the same words. Veterans keep them unmingled.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Before there was a portal there was the Wilderness. Classic and early RS2
            clans walked north of Edgeville and fought in multi. That was a clan war
            because two chats agreed to stand on the same ditch. The bag was live. The
            skull was live. Worlds are closed on Classic. The letters still remember
            that walk.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Jagex named the minigame on 10 December 2007. It was compensation when the
            main client pulled free PvP out of the wild. The first house sat in the
            Wilderness. On 1 February 2011 the hall moved into Gamers’ Grotto, north of
            Falador, with Stealing Creation and the rest of that cave. Rated Clan Wars
            at the Clan Camp is a later sheet. If that lobby is quiet, the wiki is the
            verdict.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Old School put Clan Wars back on 19 June 2014 after a priority poll. The
            first house was Giants’ Plateau. On 16 July 2020 the whole room moved into
            Ferox Enclave — still Wilderness level, still a safe pocket. White portal
            for practice. Purple for the arranged war. Official F2P chaos still uses a
            numbered world when Jagex hosts it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The flag game is Castle Wars. 13 December 2004. Saradomin and Zamorak
            castles west of Yanille, later a Ferox portal for free-to-play. Twenty
            minutes. Take their standard home. Bandages, not food. Tickets at the
            exchange. That is capture the flag. Clan Wars never asked for a flag. If
            someone says they warred at the ditch with a standard on their back, they
            are mixing two maps.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Wilderness clan wars after the minigame still happen: two chats pick a
            multi tile and a world. That is not Ferox. That is the tax. Protect Item
            is on or you are sightseeing. The PvP page keeps that skull. This page
            keeps the portals.
          </p>
        </section>

        <section>
          <h2 className="section-h2">How to not donate the hour</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Read the terms. Food off is a different fight than food on.</li>
            <li>2. Enter before the wall drops. Late is a spectator.</li>
            <li>3. One target. If you are solo in a pile, you are the loot even when the bag is safe.</li>
            <li>4. Do not chase through a rule you disabled. Freeze immunity still exists.</li>
            <li>5. White portal is practice. Purple is the match. Red on RuneScape is the tax.</li>
          </ol>
        </section>

        <section>
          <h2 className="section-h2 mb-3 text-center">The rooms</h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SHOTS.map((shot) => (
              <li key={shot.src} className="overflow-hidden rounded-md border border-line bg-raised">
                <StillPhoto
                  src={shot.src}
                  alt={`${shot.name}, ${shot.era}`}
                  className="aspect-[5/3] w-full bg-[#1a1612] object-cover"
                />
                <p className="px-3 pt-2 text-sm text-fg">{shot.name}</p>
                <p className="px-3 text-[11px] text-parchment">{shot.era}</p>
                <p className="px-3 pb-3 text-[12px] text-muted">{shot.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center text-[11px] text-faint">
            Identification stills from official wiki File pages and the Classic archive on this origin.
          </p>
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

