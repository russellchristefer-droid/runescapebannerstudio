import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The portal is the law. The money fights are usually somewhere else.",
    ),
  component: ClanWarsPage,
});

const PLACES = [
  { href: "/pvp", label: "PvP" },
  { href: "/towns/osrsedge", label: "Edgeville" },
  { href: "https://oldschool.runescape.wiki/w/Ferox_Enclave", label: "Ferox" },
  { href: "https://runescape.wiki/w/Gamers%27_Grotto", label: "Grotto" },
] as const;

function Chip({ href, label }: { href: string; label: string }) {
  const cls = "rs-chip min-h-11 text-xs";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link to={href} className={cls}>
      {label}
    </Link>
  );
}

function ClanWarsPage() {
  return (
    <div className="cw-page min-h-dvh">
      <header className="page-band px-5 py-5">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="cw-deck mx-auto mt-2 max-w-2xl text-center text-sm">
          The portal is the law. The money fights are usually somewhere else.
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Places to visit">
          {PLACES.map((p) => (
            <Chip key={p.label} href={p.href} label={p.label} />
          ))}
        </nav>
      </header>

      <main className="page-band flex flex-col gap-8 px-5 py-6">
        <section className="grid gap-3 sm:grid-cols-2">
          <article id="osrs" className="rs-panel scroll-mt-20 overflow-hidden">
            <img
              src="/clan-wars/osrs-ferox.png"
              alt="Ferox Enclave, Old School"
              width={1200}
              height={480}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            <h2 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">Ferox Enclave</h2>
            <p className="px-3 pb-1 text-center text-[10px] text-muted">Old School</p>
            <ul className="space-y-1 px-3 pb-4 text-center text-sm text-muted">
              <li>Safe pocket in the Wilderness.</li>
              <li>Chat-channel sides. Captain sets the terms.</li>
              <li>Purple is the contract. White is practice.</li>
            </ul>
          </article>
          <article id="rs3" className="rs-panel scroll-mt-20 overflow-hidden">
            <img
              src="/clan-wars/rs3-grotto.png"
              alt="Gamers’ Grotto, RuneScape"
              width={1200}
              height={480}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
            <h2 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">Gamers’ Grotto</h2>
            <p className="px-3 pb-1 text-center text-[10px] text-muted">RuneScape</p>
            <ul className="space-y-1 px-3 pb-4 text-center text-sm text-muted">
              <li>North of Falador.</li>
              <li>Friends Chat sides. Captain sets the terms.</li>
              <li>Purple is the war. Red is dangerous FFA.</li>
            </ul>
          </article>
        </section>

        <section className="rs-panel p-4">
          <h2 className="section-h2">Doors</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="cw-table w-full text-center text-sm">
              <thead>
                <tr className="text-parchment">
                  <th className="py-2 pr-3 font-normal">Colour</th>
                  <th className="py-2 pr-3 font-normal">Old School</th>
                  <th className="py-2 font-normal">RuneScape</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">Purple</td>
                  <td className="py-2 pr-3">Ferox. Arranged war. Two-minute wall.</td>
                  <td className="py-2">Grotto. Arranged war. Same job.</td>
                </tr>
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">White</td>
                  <td className="py-2 pr-3">FFA. Practice. No terms.</td>
                  <td className="py-2">Safe FFA. Bag stays.</td>
                </tr>
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">Red</td>
                  <td className="py-2 pr-3">Castle Wars Zamorak — not this minigame.</td>
                  <td className="py-2">Dangerous FFA. Items drop. Protect Item.</td>
                </tr>
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">Blue</td>
                  <td className="py-2 pr-3">Castle Wars Saradomin — flag game, Yanille.</td>
                  <td className="py-2">Not a Grotto Clan Wars door.</td>
                </tr>
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">Green / teal</td>
                  <td className="py-2 pr-3">Ferox exits. Not the war.</td>
                  <td className="py-2">—</td>
                </tr>
                <tr className="border-t border-line/40">
                  <td className="py-2 pr-3 text-fg">Gold / rated</td>
                  <td className="py-2 pr-3">—</td>
                  <td className="py-2">Exit, or Clan Camp if the lobby is up. Wiki is the verdict.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="section-h2">Wars people actually watch</h2>
          <p className="text-center text-sm text-muted">
            Not this origin. Not Jagex Support. Public record.
          </p>
          <div className="grid gap-3 lg:grid-cols-3">
            <article className="rs-panel p-4">
              <h3 className="site-title mx-auto block w-full text-center text-sm no-underline">Clan pile</h3>
              <p className="mt-2 text-center text-[10px] text-muted">In the game. Scene names, not a ranking.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Free-to-play and members piles still happen at Clan Wars and on the ditch.
                Names that show up on public wars: Reign of Terror (ROT), Infliction, CWC, TF.
                Whoever is calling the next world is the rest of the list.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Odablock hosted a public free-to-play spectacle against ROT, CWC, TF, and
                Infliction. The title was 500 versus 500. The world filled and they restarted.
                That is a show war. It is not the rated door.
              </p>
              <p className="mt-3 text-center text-sm">
                <a
                  className="text-parchment"
                  href="https://www.youtube.com/watch?v=rS_ob_TvQ4w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Public upload
                </a>
              </p>
            </article>
            <article className="rs-panel p-4">
              <h3 className="site-title mx-auto block w-full text-center text-sm no-underline">Creator payouts</h3>
              <p className="mt-2 text-center text-[10px] text-muted">A purse on a stream. Not Ferox.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Crusader Classic 2026. Public clips and posts said Odablock beat PetaOSRS
                in the finale for $5,000.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                EVScape has run creator battle-royale fields with the prize in the title.
                One public one was $20,000, with Odablock on the card.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                These are staged fights with a purse. They are not the Ferox rated door.
              </p>
              <p className="mt-3 text-center text-sm">
                <a
                  className="text-parchment"
                  href="https://www.youtube.com/shorts/JFjapFMT0iw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crusader finale
                </a>
                {" · "}
                <a
                  className="text-parchment"
                  href="https://www.youtube.com/watch?v=Gkyo8b34ljA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EVScape purse
                </a>
              </p>
            </article>
            <article className="rs-panel p-4">
              <h3 className="site-title mx-auto block w-full text-center text-sm no-underline">Deadman All Stars</h3>
              <p className="mt-2 text-center text-[10px] text-muted">A stage. Not your live world.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Jagex put Season 3 on a LAN at the Rosemont Theatre, Chicago, 20 June 2026.
                Special instance. Not the world you log into.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Official result: Team Dino Nuggets. Dino, B0aty, 61M, Sick Nerd, MMORPG.
                They beat Rhys Rhinos in the final. The rest of the official field was
                Odablock Warriors, Framed Friends, Westham Weasels, and Purpp Rebels.
              </p>
              <p className="mt-3 text-center text-sm">
                <a
                  className="text-parchment"
                  href="https://www.jagex.com/news/dino-nuggets-takes-the-crown-in-an-epic-old-school-runescape-all-stars-live-final"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jagex recap
                </a>
                {" · "}
                <a
                  className="text-parchment"
                  href="https://secure.runescape.com/m=news/deadman-all-stars-season-3-finale---live-now?oldschool=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official news
                </a>
              </p>
            </article>
          </div>
        </section>

        <section id="called" className="rs-panel scroll-mt-20 p-4 text-center">
          <h2 className="section-h2">How a fight is called</h2>
          <ul className="cw-notes mt-3 space-y-2 text-sm text-muted">
            <li>A captain sends the challenge. If you cannot open the sheet, you are not the captain.</li>
            <li>Old School uses a chat-channel rank. RuneScape uses Friends Chat.</li>
            <li>Read every box. Food off is a different fight.</li>
            <li>Two-minute wall. Late is a spectator.</li>
            <li>One caller. One name. The pile clicks that name.</li>
          </ul>
          <h3 className="mt-5 text-sm">Old School — Ferox</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Ring of dueling, minigame teleport, or a waka canoe. Pool first. Purple when
            the terms are agreed. White is practice. Mage and range can fire while the
            wall is up. Melee waits.
          </p>
          <h3 className="mt-5 text-sm">RuneScape — Grotto</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            North of Falador. Purple is the war. White keeps the bag. Red drops it, so
            turn Protect Item on. Do not mix the ability bar and Legacy in one pile.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Fight Pits is a different game. Last one standing, no captain, no wall.
            Old School is the TzHaar bowl at Mor Ul Rek. RuneScape is the same bowl in TzHaar City.
          </p>
        </section>

        <section className="rs-panel p-4 text-center">
          <h2 className="section-h2">Official notes</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Wiki for the current portals. This desk does not run a prize pool and does not
            rank clans. The names above are from public wars and streams.
          </p>
          <ol className="cw-notes mx-auto mt-4 max-w-xl space-y-2 text-sm text-muted">
            <li><span className="text-parchment">4 Jan 2001.</span> Classic. No Wilderness. Clans picked a world.</li>
            <li><span className="text-parchment">13 Aug 2001.</span> The ditch. PvP became a place.</li>
            <li><span className="text-parchment">13 Dec 2004.</span> Castle Wars. A flag game. Not this door.</li>
            <li><span className="text-parchment">19 Sep 2005.</span> Fight Pit. The TzHaar bowl.</li>
            <li><span className="text-parchment">10 Dec 2007.</span> Clan Wars named. Purple portal. Two-minute wall.</li>
            <li><span className="text-parchment">1 Feb 2011.</span> Grotto, north of Falador.</li>
            <li><span className="text-parchment">16 Jul 2020.</span> Old School moves the room to Ferox.</li>
          </ol>
          <p className="mt-4 text-sm">
            <a
              className="text-parchment"
              href="https://oldschool.runescape.wiki/w/Clan_Wars"
              target="_blank"
              rel="noopener noreferrer"
            >
              Old School wiki
            </a>
            {" · "}
            <a
              className="text-parchment"
              href="https://runescape.wiki/w/Clan_Wars"
              target="_blank"
              rel="noopener noreferrer"
            >
              RuneScape wiki
            </a>
            {" · "}
            <Link to="/pvp" className="text-parchment">
              PvP
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
