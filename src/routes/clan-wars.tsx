import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The minigame. Two canons. Safe unless the terms say otherwise. Wiki keeps the portals.",
    ),
  component: ClanWarsPage,
});

function ClanWarsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          The minigame. Not a login. Two chat-channels walk through a purple portal and
          agree the terms. The wiki owns the current maps.
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
          <Link to="/pvp" className="text-parchment">
            PvP
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="pvp" />
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
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
          <h2 className="section-h2">How to not donate the hour</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Read the terms. Food off is a different fight than food on.</li>
            <li>2. Enter before the wall drops. Late is a spectator.</li>
            <li>3. One target. If you are solo in a pile, you are the loot even when the bag is safe.</li>
            <li>4. Do not chase through a rule you disabled. Freeze immunity still exists.</li>
            <li>5. White portal is practice. Purple is the match. Red on RuneScape is the tax.</li>
          </ol>
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
