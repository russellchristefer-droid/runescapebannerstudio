import { Link, createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/page-title";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/history")({
  head: () => pageMeta("History", "A fan story of public RuneScape memory. Two games. Named work. Not a rank."),
  component: HistoryPage,
});

function HistoryPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
      </header>
      <main id="content" className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <article className="history-story flex flex-col gap-5 text-sm leading-relaxed text-muted">
          <h1 className="page-h1 site-title m-0">The sill and the bank</h1>
          <p className="text-sm text-parchment">A fan story of public memory. Not Jagex. Not a certificate.</p>
          <p className="font-flavor text-base text-parchment">
            There are two ways to keep Gielinor. One is the bank: stacks, prices, the vulgar
            arithmetic of appetite. The other is the sill — a narrow stone in Varrock where a
            domestic tom has watched palaces inflate and slums persist and called neither of
            them the point. This desk writes from the sill. Boasts are cheap. Looking is not.
          </p>
          <p>
            Before that sill had a city under it there was a student draught. Andrew Gower
            wrote the first client; Paul and Ian Gower kept the world from being a one-man
            notebook. On 4 January 2001 the thing opened as RuneScape: tiles, slow combat, a
            map that felt hand-sized and then, suddenly, not. Players learned Lumbridge because
            the client pointed their gaze at a castle and named it beginning. Tutorial Island
            came later as a pedagogic ghost. The first sermon is still the courtyard.
          </p>
          <p>
            Members arrived in 2002. Christmas 2001 and 2002 left paper hats from crackers —
            partyhats as identification, not a mid this desk will print. In March 2004 the body
            of the game was remade. The crowd still calls that year RS2. Cameras lifted. Crowds
            thickened. The world learned to look expensive. Summoning, grand exchanges, and
            a free-trade argument that would last a decade all sat on that rebuild.
          </p>
          <p>
            Mid-decade the street minted its civic jokes and its civic wounds. On 6 June 2006
            the Falador Party Room turned celebration into a massacre the crowd never stopped
            citing: piety and slapstick sharing a postcode, with a casualty list. Wilderness
            law and trade law became politics — what may be taken, what may be sold, whether a
            ditch is a border or a dare. On 1 December 2007 free trade and the Wilderness as
            players had known them were pulled. They came back in February 2011 after a public
            fight that taught Jagex the street could vote with its feet. Bots and bans entered
            the weather. So did hiscores as spectacle.
          </p>
          <p>
            Zezima was first to the old 99s in a way the boards could see. The name became a
            tense: <em>to be maxed</em> as public work, not a private Discord. Years later
            Lynx Titan sat on the 200 million XP boards until the numbers looked like weather.
            This story will not rummage anyone’s bins. Public work is enough. The boards are
            a different window from the sill. Both are true.
          </p>
          <p>
            The map kept growing: new rooms, new gods’ floors, God Wars as a building you
            could die in. High detail split tastes the way cosmetics always do. Then 20
            November 2012’s Evolution of Combat broke the paragraph. A large public refused
            the new grammar. On 22 February 2013 a poll-backed 2007-era client opened as Old
            School RuneScape — own hiscores, own Wednesday, own Twitch category. The other
            client kept the name RuneScape and walked into the Sixth Age. From that year the
            history is braided, not single.
          </p>
          <p>
            Keep the two Lumbridges unmingled. In Old School the castle is still a first
            theorem: river, chapel, gate, the road that pretends the world is simple. In
            RuneScape the same name is a rebuild over the Battle of Lumbridge. Export the
            crater onto an Old School still and you are only touring your own confusion.
            Varrock is agora and drain in both grammars; Gertrude’s household stays the
            unfashionable centre; Bob says <em>here</em>. Falador still performs virtue in
            limestone. The Wilderness remains the honest contract: skull, ditch, the ethics
            of the right-click. Law has moved. Memory has not.
          </p>
          <p>
            Old School’s public years were polls as constitution. Deadman as a weekend skull.
            Chambers of Xeric in January 2017, Theatre of Blood in 2018, Tombs of Amascut in
            August 2022 — raids as labour, not a highlight reel. The Inferno opened in June
            2017; Woox walked out with the first cape the street could watch. Mobile put the
            client in a pocket. Ironman became a vow you could spectate. Leagues became
            carnival. Zeah and later Varlamore widened the map without moving Lumbridge.
            Sailing was a long argument that became a skill. None of that is a costume of
            2007. It is a maintained dialect.
          </p>
          <p>
            RuneScape’s public years after the split were world events, Prifddinas as an
            hour-city (Voice of Seren is a civic pulse on that client only), Senntisten as
            archaeology of empire, Invention in 2016, Mining and Smithing rebuilt in 2019,
            Necromancy in 2023 with Rasial as the exam. Telos and Vorago taught enrage as a
            dialect. Treasure Hunter stayed a standing quarrel. War’s Retreat became the
            lobby that is not the fight. This desk will not stencil clan hours onto Prif.
            Neither list is complete. Both are true as weather.
          </p>
          <p>
            The chorus that taught the street how to look was public, and it had names.
            Slayermusiq1 and A Friend spoke quest steps like liturgy so a first account could
            finish a door without a second tab of rumour. B0aty made the weekly grind a room
            other people could sit in. Settled turned a limited tile and a UIM bag into
            stories the wiki could footnote. Torvesta walked the ditch in public so the skull
            rule was not a private theory. Sparc Mac kept both clients on a camera without
            pretending they were one grammar. Guide voices on the iron vow — Mr Mammal and
            the later iron rooms — treated a restriction as craft. The Old School wiki and
            the RuneScape wiki are the quiet labour under all of that: unnamed editors, named
            pages. Mod Ash answered the Old School street in public Q&A without becoming
            a mascot. You do not need this page to enlarge them. You need it to say they
            worked in the open, and that gossip is low-resolution history.
          </p>
          <p>
            The high-resolution history is a street that still exists in two engines at once.
            The present is two live games, two categories — Old School RuneScape and
            RuneScape — two wikis, one midnight UTC when shops restock and worlds hitch. A
            JPEG from this desk is a window, not a coronation. Twelve glyphs make a name. A
            cat makes a witness. Most people bank. A few look.
          </p>
          <p>
            When official news and this story disagree, official news wins. When the wiki
            and this story disagree, the wiki keeps the hour. When Bob and the bank disagree,
            follow the cat.
          </p>
          <p>
            Street-level notes live on the town sheets: lore for that client, a short history
            of that grammar, then the live wiki. Start at{" "}
            <Link to="/towns" className="text-parchment">
              Towns
            </Link>
            . Ages and doors sit on{" "}
            <Link to="/chronicle" className="text-parchment">
              Chronicle
            </Link>
            . The long story stays here.
          </p>
        </article>
        <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-sm text-parchment">
          <a href="https://oldschool.runescape.wiki/" target="_blank" rel="noopener noreferrer">
            Old School wiki
          </a>
          <a href="https://runescape.wiki/" target="_blank" rel="noopener noreferrer">
            RuneScape wiki
          </a>
          <Link to="/">Desk</Link>
          <Link to="/chronicle">Chronicle</Link>
        </p>
      </main>
    </div>
  );
}
