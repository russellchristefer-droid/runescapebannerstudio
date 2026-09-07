import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The minigame. Two canons. The ditch came first. Wiki keeps the portals.",
    ),
  component: ClanWarsPage,
});

const STILLS = [
  { src: "/stills/rsc/rsc-ranging.jpg", name: "Classic fight", era: "RuneScape Classic", note: "Two chats on the grass. The bag was live." },
  { src: "/stills/rsc/rsc-lumbridge.jpg", name: "The walk", era: "RuneScape Classic", note: "Before anyone named a portal." },
  { src: "/clan-wars/rsc-edge-store.png", name: "Edgeville store", era: "RuneScape Classic", note: "Last counter before the ditch." },
  { src: "/clan-wars/osrs-edgeville-shot.png", name: "Edgeville", era: "Old School", note: "The same road. Newer letters." },
  { src: "/locations/osrsedge.jpg", name: "Edgeville bank road", era: "Old School", note: "The last town before you mean it." },
  { src: "/locations/edgeville.jpg", name: "Edgeville", era: "Old School", note: "North of here the tax starts." },
  { src: "/clan-wars/osrs-ferox.png", name: "Ferox Enclave", era: "Old School", note: "16 July 2020. Safe pocket. Purple and white." },
  { src: "/locations/yanille.jpg", name: "Yanille", era: "Old School", note: "West is Castle Wars. That is the flag game." },
  { src: "/locations/ardougne.jpg", name: "East Ardougne", era: "Old School", note: "Members country. The door is further west." },
  { src: "/clan-wars/rs3-grotto.png", name: "Gamers' Grotto", era: "RuneScape", note: "1 February 2011. North of Falador." },
  { src: "/clan-wars/more/rs3-arena.png", name: "The field", era: "RuneScape", note: "The hall after the purple portal." },
  { src: "/locations/falador.jpg", name: "Falador", era: "RuneScape", note: "White walls. The Grotto is north." },
  { src: "/locations/rs3-falador-a.jpg", name: "Falador square", era: "RuneScape", note: "Same city. Later grammar." },
  { src: "/Falador.png", name: "Falador", era: "Old School", note: "The walk north is a different client." },
  { src: "/locations/osrsfalador.jpg", name: "Falador walls", era: "Old School", note: "Order is a costume the wild does not rent." },
] as const;

function ClanWarsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          The minigame. Not a login. Two chats walk through a purple portal and agree the
          terms. The ditch came first. The flag game is a different map.
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
          <h2 className="section-h2">History</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Three rooms used the same words. Veterans keep them unmingled. Dates below
            are from the live wikis. If a lobby went quiet, the wiki is the verdict.
          </p>

          <h3 className="mt-5 mb-1 text-fg">Before the name</h3>
          <p className="text-sm leading-relaxed text-muted">
            Classic and early RS2 clans walked north of Edgeville and fought in multi.
            That was a clan war because two chats agreed to stand on the same ditch.
            There was no purple portal and no two-minute wall. The bag was live. The
            skull was live. Worlds are closed on Classic. The letters still remember
            that walk. This origin files that tax on PvP. This page files the minigame
            that came after.
          </p>

          <h3 className="mt-5 mb-1 text-fg">13 December 2004 — the flag</h3>
          <p className="text-sm leading-relaxed text-muted">
            Castle Wars is capture the flag. Saradomin and Zamorak castles west of
            Yanille. Twenty minutes. Take their standard home. Bandages, not food.
            Tickets at the exchange. Later a Ferox portal opened the same game to
            free-to-play. Clan Wars never asked for a flag. If someone says they warred
            at the ditch with a standard on their back, they are mixing two maps.
          </p>

          <h3 className="mt-5 mb-1 text-fg">10 December 2007 — the minigame</h3>
          <p className="text-sm leading-relaxed text-muted">
            Jagex named Clan Wars on the same day it pulled free PvP and free trade out
            of the main-client Wilderness. The update sat next to Bounty Hunter. The
            first house was in the wild: a challenge hall so clans could still fight
            when the ditch stopped being the law. Compensation, not a skin. Captains
            picked terms. Purple portal. Two-minute wall. That grammar is still the
            grammar.
          </p>

          <h3 className="mt-5 mb-1 text-fg">1 February 2011 — the Grotto</h3>
          <p className="text-sm leading-relaxed text-muted">
            Free trade and the old Wilderness came back on the main client. Clan Wars
            left the wild and moved into Gamers’ Grotto, north of Falador, with Stealing
            Creation and a door to Fist of Guthix. The old Wilderness house became the
            Bone Yard. Rated Clan Wars at the Clan Camp is a later sheet. If that lobby
            is quiet this month, do not describe it as live.
          </p>

          <h3 className="mt-5 mb-1 text-fg">19 June 2014 — Old School</h3>
          <p className="text-sm leading-relaxed text-muted">
            A priority poll put Clan Wars on the 2007-era client. The first house was
            Giants’ Plateau. 26 June added Soggy Swamp as a free-to-play arena. 6
            November added the Classic Arena. 16 April 2015 added timed deathmatch and
            Oddskull. The maps changed. The rule did not: captain to captain, then the
            wall.
          </p>

          <h3 className="mt-5 mb-1 text-fg">16 July 2020 — Ferox</h3>
          <p className="text-sm leading-relaxed text-muted">
            The whole Old School room moved into Ferox Enclave. Still a Wilderness
            level. Still a safe pocket. White portal for practice. Purple for the
            arranged war. Ring of dueling, minigame teleport, or a waka canoe. Official
            F2P chaos still uses a numbered world when Jagex hosts it. 23 May 2024 added
            Classic F2P magic — Bind as the only freeze if that box is ticked.
          </p>

          <h3 className="mt-5 mb-1 text-fg">The ditch after the portal</h3>
          <p className="text-sm leading-relaxed text-muted">
            Wilderness clan wars after the minigame still happen: two chats pick a multi
            tile and a world. That is not Ferox. That is not the Grotto. That is the tax.
            Protect Item is on or you are sightseeing. The PvP page keeps that skull.
          </p>
        </section>

        <section>
          <h2 className="section-h2">Old School</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Ferox Enclave. A captain or higher challenges another captain.
            Both agree the terms. A two-minute wall goes up. Walk in or you are
            watching. Cap is one hundred a side. Twelve maps. Some are members. The
            current list is on the wiki.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              Modes: last team standing, first to a kill count, most kills on a timer,
              king of the hill, Oddskull.
            </li>
            <li>
              Combat can ban a style, lock a spellbook, strip overheads, or cap the team
              at 5v5.
            </li>
            <li>
              Death sends you to the jail inside the game. Rejoin only if the terms
              allow it. Items stay. Hardcore group iron is safe here because the wiki
              says this is safe PvP.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            How you win is the mode you signed. Last team standing: the other colour
            leaves the field. Kill races: the number on the board. Hill and Oddskull:
            hold the object. Call the pile. Freeze first if magic is on. Do not spec
            into a PJ timer you asked for.
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
              Rated Clan Wars is a different sheet at the Clan Camp. Confirm it on
              official news.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Revolution bars do not replace a caller. Leave the enrage bosses on Bosses.
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STILLS.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-md border border-[#c6a45a]/40 bg-[#120e0a]"
              >
                <div className="flex min-h-[220px] items-center justify-center bg-[#0c0a08] md:min-h-[280px]">
                  <img
                    src={shot.src}
                    alt={`${shot.name}, ${shot.era}`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[320px] w-full object-contain md:max-h-[380px]"
                  />
                </div>
                <figcaption className="border-t border-[#c6a45a]/25 px-3 py-2">
                  <p className="text-sm text-[#efe4c8]">{shot.name}</p>
                  <p className="text-[11px] tracking-[0.12em] text-[#c6a45a] uppercase">{shot.era}</p>
                  <p className="mt-1 text-[12px] text-[#b7a989]">{shot.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-faint">
            Places and people. No portal icons. No map charts.
          </p>
        </section>

        <p className="text-sm text-parchment">
          <Link to="/pvp">PvP</Link>
          {" · "}
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/history">History</Link>
          {" · "}
          <Link to="/chronicle">Chronicle</Link>
        </p>
      </main>
    </div>
  );
}
