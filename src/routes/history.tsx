import { Link, createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/page-title";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/history")({
  head: () => pageMeta("History", "A fan story of public RuneScape memory. Two games. Not a rank."),
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
            Before that sill had a city under it there was a student draught with another
            name. In January 2001 the thing opened as RuneScape: tiles, slow combat, a map
            that felt hand-sized and then, suddenly, not. Players learned Lumbridge because
            the client pointed their gaze at a castle and named it beginning.
          </p>
          <p>
            The early years accreted quests, members’ gates, and a folk economy around paper
            crowns from Christmas crackers. That relic-talk is memory, not a shop this desk
            runs. In 2004 the body of the game was remade — what the crowd still calls RS2.
            Cameras lifted. Crowds thickened. The world learned to look expensive.
          </p>
          <p>
            Mid-decade the street minted its civic jokes and its civic wounds. In June 2006
            the Falador Party Room turned celebration into a glitch-massacre the crowd never
            stopped citing: piety and slapstick sharing a postcode, with a casualty list.
            Wilderness law and trade law became politics — what may be taken, what may be
            sold, whether a ditch is a border or a dare. Bots and bans entered the weather.
            So did hiscores as spectacle: a single name at the top of a board teaching grind
            as theatre. Zezima was less a person than a tense. This story will not rummage
            anyone’s bins. Public work is enough.
          </p>
          <p>
            The map kept growing: new rooms, new gods’ floors, God Wars as a building you
            could die in. High detail split tastes the way cosmetics always do. Then 2012’s
            Evolution of Combat broke the paragraph. A large public refused the new grammar.
            In 2013 a poll returned a 2007-era client as Old School RuneScape — own hiscores,
            own Wednesday, own Twitch category. The other client kept the name RuneScape and
            walked into world events. From that year the history is braided, not single.
          </p>
          <p>
            Keep the two Lumbridges unmingled. In Old School the castle is still a first
            theorem: river, chapel, gate, the road that pretends the world is simple. In
            RuneScape the same name is a rebuild over war. Export the crater onto an Old
            School still and you are only touring your own confusion. Varrock is agora and
            drain in both grammars; Gertrude’s household stays the unfashionable centre; Bob
            says <em>here</em>. Falador still performs virtue in limestone. The Wilderness
            remains the honest contract: skull, ditch, the ethics of the right-click. Law
            has moved. Memory has not.
          </p>
          <p>
            Old School’s public years were polls, Deadman, raids as labour (Chambers, Theatre,
            Tombs), leagues as carnival, iron as vow, mobile in the pocket, sailing as a long
            argument that became a skill. RuneScape’s public years were world events,
            Prifddinas as an hour-city, Senntisten as archaeology of empire, Invention and
            later Necromancy as new combat grammars, Treasure Hunter as a standing quarrel,
            boss ladders that treat enrage as a dialect. Voice of Seren is a civic pulse on
            that client only. This desk will not stencil clan names onto it. Neither list is
            complete. Both are true as weather.
          </p>
          <p>
            Streamers and guide-voices became a chorus without becoming a government: quest
            steps spoken like liturgy, raids as public labour, the iron vow as spectator
            sport. You know the names. They do not need this page to enlarge them. Gossip is
            low-resolution history. The high-resolution history is a street that still exists
            in two engines at once.
          </p>
          <p>
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
