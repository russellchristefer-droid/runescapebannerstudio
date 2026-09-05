import { Link, createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/page-title";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/chronicle")({
  head: () =>
    pageMeta(
      "Chronicle",
      "A fan ledger of Old School RuneScape and RuneScape public memory. Two games. Not Jagex.",
    ),
  component: ChroniclePage,
});

function Wiki({ href, children }: { href: string; children: string }) {
  return (
    <p className="mt-2">
      <a href={href} rel="noopener noreferrer" target="_blank" className="text-parchment">
        {children}
      </a>
    </p>
  );
}

function ChroniclePage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Chronicle</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Ages and doors. Two live games. Not Jagex. Not a hiscores rank.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="chronicle prose-desk mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 text-sm text-muted md:px-8">
        <p className="text-parchment">
          Gielinor is not one timeline. It is two grammars that share names. This page is a
          ledger of public doors — towns, ages, and the hours that actually shipped. The long
          story lives on History. Official news and the wikis keep the hour if we drift.
        </p>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">How to read this</h2>
          <p>
            <strong className="font-normal text-fg">Old School RuneScape</strong> is the 2007-era
            client voted back in 2013. No Sixth Age landfall. No Edicts as current weather. No
            Battle of Lumbridge crater as the town you stand in.
          </p>
          <p className="mt-2">
            <strong className="font-normal text-fg">RuneScape</strong> is the later
            main client. World events, hour-cities, Invention, Necromancy,
            War’s Retreat. Twitch category is <em>RuneScape</em>.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">Old School RuneScape</h2>
          <p>
            A maintained dialect. Polls are the constitution. Wednesday is the usual update
            caution — this desk does not write the patch. Daily reset is 00:00 UTC. Worlds hitch
            after.
          </p>

          <h3 className="mt-4 mb-1 text-fg">2013 — the split</h3>
          <p>
            Evolution of Combat split the tongue in 2012. A large public refused the new grammar.
            In 2013 a poll returned a 2007-era client as Old School RuneScape: its own hiscores,
            its own category name, its own map continuity. That is the start of this column, not
            a costume of nostalgia.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Old_School_RuneScape">Live page · Old School RuneScape</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Lumbridge</h3>
          <p>
            Threshold, not capital. Castle, chapel, River Lum, the road that pretends the world
            is simple. Tutorial Island is a pedagogic ghost. Duke Horacio’s stone is still the
            first sermon. Do not stamp an RS3 crater on this still.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Lumbridge">Live page · Lumbridge (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Varrock</h3>
          <p>
            Square as agora. Palace and slums on one grid. Gertrude’s house is the domestic grain.
            Bob keeps the sill. The Grand Exchange is the city’s other heart — price as public
            speech. This desk will not freeze a GE rate here.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Varrock">Live page · Varrock (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Falador</h3>
          <p>
            White Knights as performed virtue. Party room as civic farce in the same postcode.
            The 2006 massacre is public weather from the older engine; Old School still wears
            the white walls. Order is a costume the Wilderness does not rent.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Falador">Live page · Falador (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Wilderness</h3>
          <p>
            Skull, ditch, the ethics of the attack option. Law has moved more than once. Memory
            has not. Mass events belong to official news and the wiki, not to a fake live wire
            on this page.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Wilderness">Live page · Wilderness (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">God Wars</h3>
          <p>
            In this client the gods are worshipped, prayed to, and fought as commanders behind
            doors: Graardor, Kree’arra, Zilyana, K’ril. The commander is not the god. Nex is a
            later door in the same mountain. GWD stills on this desk are Old School rooms only
            when the card says Old School.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/God_Wars_Dungeon">Live page · God Wars Dungeon (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Raids and arenas</h3>
          <p>
            Chambers of Xeric, Theatre of Blood, Tombs of Amascut — public labour with named
            rooms. Inferno and Fight Caves are vows you can watch. Desert Treasure II bosses
            are later doors, still this grammar. Methods rot. The wiki keeps the hour. This
            desk will not print a frozen rotation.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Raids">Live page · Raids (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Iron, leagues, sailing</h3>
          <p>
            Ironman is an official mode and a spectator vow. Leagues and Deadman are festivals.
            Mobile carried the dialect into pockets. Sailing is a long public argument that
            became a skill — file the current rules on the wiki, not here.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Ironman_Mode">Live page · Ironman (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Prifddinas in this client</h3>
          <p>
            After Song of the Elves the crystal city exists here as that quest’s city — not the
            RS3 clan-district clock. Do not paste Voice of Seren hours onto an Old School card.
          </p>
          <Wiki href="https://oldschool.runescape.wiki/w/Prifddinas">Live page · Prifddinas (Old School)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Names in the culture</h3>
          <p>
            Early hiscores myth taught grind as theatre. Guide-voices and iron serials taught
            constraint as content. This page lists no private scandal and confers no rank.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">RuneScape</h2>
          <p>
            The later grammar. Monday is the usual update caution. Daily reset is still 00:00 UTC.
            Voice of Seren flips on the hour — this desk does not invent clan names. Twitch
            category: RuneScape.
          </p>

          <h3 className="mt-4 mb-1 text-fg">After the split</h3>
          <p>
            The main client kept the name RuneScape and walked into world events. Sixth Age,
            Edicts broken after Guthix’s death, gods walking. That weather is this column only.
            Do not export it onto an Old School still.
          </p>
          <Wiki href="https://runescape.wiki/w/Sixth_Age">Live page · Sixth Age</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Lumbridge after the world moved</h3>
          <p>
            Rebuilt street over crater-memory. Battle of Lumbridge is how this client remembers
            the start of the Sixth Age. The castle still stands. The scar is part of the map
            here and only here.
          </p>
          <Wiki href="https://runescape.wiki/w/Lumbridge">Live page · Lumbridge (RuneScape)</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Prifddinas</h3>
          <p>
            A city of hours and clan districts. Voice of Seren is a civic pulse on the UTC clock.
            Initiation is standing there when the hour changes, not stencilling a clan pair on
            a banner.
          </p>
          <Wiki href="https://runescape.wiki/w/Prifddinas">Live page · Prifddinas</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Senntisten</h3>
          <p>
            Zarosian stone. Archaeology of empire. History as an extractable skill. Money methods
            belong on the wiki’s hour. A quiet twin ledger hides on Guthix for Old School only.
          </p>
          <Wiki href="https://runescape.wiki/w/Senntisten">Live page · Senntisten</Wiki>

          <h3 className="mt-4 mb-1 text-fg">War’s Retreat and the ladder</h3>
          <p>
            High-end PvM in this client is a different book: Telos, Vorago, Raksha, Solak,
            Arch-Glacor, Rasial, Kerapac, Zuk. Enrage is a dialect. War’s Retreat is the lobby
            that grammar uses. Live method: the wiki, and PVME labelled as community — not Jagex.
          </p>
          <Wiki href="https://runescape.wiki/w/War%27s_Retreat">Live page · War’s Retreat</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Invention and Necromancy</h3>
          <p>
            New skills, new bars. They exist in this client. They do not exist as stamps on an
            Old School plate. Weakness types and ability bars belong to the living method page,
            not a fossil list here.
          </p>
          <Wiki href="https://runescape.wiki/w/Necromancy">Live page · Necromancy</Wiki>

          <h3 className="mt-4 mb-1 text-fg">Fort and the later map</h3>
          <p>
            Fort Forinthry and other Sixth Age works are this client’s geography. If a still is
            labelled Old School, it is not that fort.
          </p>
          <Wiki href="https://runescape.wiki/w/Fort_Forinthry">Live page · Fort Forinthry</Wiki>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">The sill</h2>
          <p>
            Two clocks. Two wikis. One midnight UTC when shops restock. Twelve glyphs make a
            name. A JPEG is not a coronation. Stand in the right town for the right game, then
            examine it.
          </p>
        </section>

        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/history">History</Link>
          {" · "}
          <Link to="/towns">Towns</Link>
          {" · "}
          <Link to="/legal">Legal</Link>
        </p>
        <p className="text-xs text-faint">Independent studio · not a Jagex product</p>
      </main>
    </div>
  );
}
