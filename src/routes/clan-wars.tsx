import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Fight Pits",
      "TzHaar built a bowl. Last one standing. Tokkul, not a flag.",
    ),
  component: ClanWarsPage,
});

const PLACES = [
  { href: "#pits", label: "Pits" },
  { href: "#doors", label: "Portals" },
  { href: "https://oldschool.runescape.wiki/w/Ferox_Enclave", label: "Ferox" },
  { href: "https://runescape.wiki/w/Gamers%27_Grotto", label: "Grotto" },
  { href: "/pvp", label: "PvP" },
] as const;

function Watch({
  href,
  kicker,
  title,
  line,
}: {
  href: string;
  kicker: string;
  title: string;
  line: string;
}) {
  return (
    <a className="cw-watch" href={href} target="_blank" rel="noopener noreferrer">
      <span className="cw-watch-k">{kicker}</span>
      <span className="cw-watch-t">{title}</span>
      <span className="cw-watch-l">{line}</span>
    </a>
  );
}

function Chip({ href, label }: { href: string; label: string }) {
  const cls = "rs-chip min-h-11 text-xs";
  if (href.startsWith("http") || href.startsWith("#")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
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
        <h1 className="page-h1 mt-1">Fight Pits</h1>
        <p className="cw-deck mx-auto mt-2 max-w-2xl text-center text-sm">
          TzHaar built a bowl. Last one standing. Tokkul, not a flag.
        </p>
        <p className="mt-3 text-center">
          <a href="#doors" className="rs-chip min-h-11 text-xs">
            Clan Wars portals
          </a>
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Places to visit">
          {PLACES.map((p) => (
            <Chip key={p.label} href={p.href} label={p.label} />
          ))}
        </nav>
      </header>

      <main className="page-band flex flex-col gap-8 px-5 py-6">
        <section id="pits" className="scroll-mt-20">
          <div className="grid gap-3 lg:grid-cols-3">
            <article className="rs-panel overflow-hidden">
              <img
                src="/pits/mor-ul-rek.jpg"
                alt="Old School Fight Pit in Mor Ul Rek"
                width={1200}
                height={750}
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <h2 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">Mor Ul Rek</h2>
              <p className="px-3 pb-3 text-center text-[10px] text-muted">Old School · the red bowl</p>
            </article>
            <article className="rs-panel overflow-hidden">
              <img
                src="/pits/bowl.jpg"
                alt="The Fight Pit bowl"
                width={1600}
                height={876}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <h2 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">The bowl</h2>
              <p className="px-3 pb-3 text-center text-[10px] text-muted">RuneScape · inside the circle</p>
            </article>
            <article className="rs-panel overflow-hidden">
              <img
                src="/pits/tzhaar-city.jpg"
                alt="Fight Pit in TzHaar City"
                width={1600}
                height={951}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <h2 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">TzHaar City</h2>
              <p className="px-3 pb-3 text-center text-[10px] text-muted">RuneScape · the city pit</p>
            </article>
          </div>
        </section>

        <section className="rs-panel p-4 text-center">
          <h2 className="section-h2">The bowl</h2>
          <h3 className="mt-4 text-sm">19 September 2005</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Fight Pits land with the TzHaar. The update is called Massive minigame — Fight Pits.
            You walk in. You do not leave until one body stands. The last name wears a red skull.
            Tokkul is the purse, counted off the combat levels you put down. Your items stay.
            This is not a clan portal.
          </p>
          <h3 className="mt-5 text-sm">The city under the volcano</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            TzHaar are not humans in a costume. They are lava with a law.
            The pit is how they measure a fighter without breaking the city.
            Fight Cave is you against waves. The Inferno is a later cave.
            The Elder Kiln and the TokHaar are a different fight. Do not mix those rules into this bowl.
          </p>
          <h3 className="mt-5 text-sm">How a leader settled it</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            A wipe costs the clan name. A lot of leaders would not pay that for one argument.
            They sent one fighter. Sometimes the whole clan walked into the circle and stayed until one skull was left.
            No flag. No purple contract. The argument ended when the champion walked out.
            That habit is older than Ferox. The coloured door came in December 2007, when captains wanted terms instead of a circle.
            This is how players used the bowl. It is not a Jagex rule.
          </p>
          <h3 className="mt-5 text-sm">Old School — Mor Ul Rek</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            West of the inner city. Fairy ring BLP, or the minigame teleport.
            The public activity world is 362. The bag stays.
            The bowl fills on a clock. Tz-Kih at ninety seconds. Then Tz-Kek, Tok-Xil, Ket-Zek, then TzTok-Jad.
            At eleven and a half minutes the gas hits every tick.
            The skull lasts about an hour. It falls off if you teleport, change a weapon, pray overhead, hop, log out, or take a hit from a monster.
            Wiki for the live clock. Do not paste Ferox doors onto this bowl.
          </p>
          <h3 className="mt-5 text-sm">RuneScape — TzHaar City</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Same bowl. Later grammar. TokKul-Zo is the fast door. Death is safe.
            On 13 May 2008 the waiting room was not safe. That was the day TokTz-Ket-Dill came out.
            People lost bags. It was fixed the same day, and the abuse was banned.
            That hour is history. It is not the rule now.
            On 17 March 2009 the entrance was put back. A global pit existed from June 2011 to February 2012, then left.
            The kiln is still not this pit.
          </p>
          <h3 className="mt-5 text-sm">What the pit is not</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Not Clan Wars. Not Castle Wars. Not Deadman All Stars. Not a creator purse.
            A pit is a circle. A clan war is a contract on a coloured door.
          </p>
          <h3 className="mt-5 text-sm">Champion</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            One name at a time. Tokkul in the purse. No team flag.
          </p>
          <div className="cw-watch-row">
            <Watch
              href="https://oldschool.runescape.wiki/w/TzHaar_Fight_Pit"
              kicker="Old School"
              title="Fight Pit"
              line="Mor Ul Rek. The live clock is on the wiki."
            />
            <Watch
              href="https://runescape.wiki/w/TzHaar_Fight_Pit"
              kicker="RuneScape"
              title="Fight Pit"
              line="TzHaar City. Same bowl. Later grammar."
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="section-h2">The circle people watch</h2>
          <p className="text-center text-sm text-muted">
            Same heat as the bowl. Not this desk. Not a ranked door. Public record.
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
              <Watch
                href="https://www.youtube.com/watch?v=rS_ob_TvQ4w"
                kicker="Watch"
                title="500 versus 500"
                line="Public upload. F2P spectacle. Not Ferox."
              />
            </article>
            <article className="rs-panel p-4">
              <h3 className="site-title mx-auto block w-full text-center text-sm no-underline">Creator payouts</h3>
              <p className="mt-2 text-center text-[10px] text-muted">A purse on a stream. Not the pit. Not Ferox.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Crusader Classic 2026. Public clips and posts said Odablock beat PetaOSRS
                in the finale for $5,000.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                EVScape has run creator battle-royale fields with the prize in the title.
                One public one was $20,000, with Odablock on the card.
              </p>
              <Watch
                href="https://www.youtube.com/shorts/JFjapFMT0iw"
                kicker="Watch"
                title="Crusader Classic"
                line="Finale. Public clip. Purse on the stream."
              />
              <Watch
                href="https://www.youtube.com/watch?v=Gkyo8b34ljA"
                kicker="Watch"
                title="EVScape purse"
                line="Creator field. The prize was in the title."
              />
            </article>
            <article className="rs-panel p-4">
              <h3 className="site-title mx-auto block w-full text-center text-sm no-underline">Deadman All Stars</h3>
              <p className="mt-2 text-center text-[10px] text-muted">A stage. Not your live world. Not the bowl.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Jagex put Season 3 on a LAN at the Rosemont Theatre, Chicago, 20 June 2026.
                Special instance. Not the world you log into.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Official result: Team Dino Nuggets. Dino, B0aty, 61M, Sick Nerd, MMORPG.
                They beat Rhys Rhinos in the final. The rest of the official field was
                Odablock Warriors, Framed Friends, Westham Weasels, and Purpp Rebels.
              </p>
              <Watch
                href="https://www.jagex.com/news/dino-nuggets-takes-the-crown-in-an-epic-old-school-runescape-all-stars-live-final"
                kicker="Official"
                title="Dino Nuggets"
                line="Jagex recap. Chicago. 20 June 2026."
              />
              <Watch
                href="https://secure.runescape.com/m=news/deadman-all-stars-season-3-finale---live-now?oldschool=1"
                kicker="Official"
                title="All Stars news"
                line="Old School news post. Not a world you can log."
              />
            </article>
          </div>
        </section>

        <section id="doors" className="scroll-mt-20">
          <h2 className="section-h2">Clan Wars</h2>
          <p className="mx-auto mb-3 max-w-xl text-center text-sm text-muted">
            The portal is the law. The money fights are usually somewhere else.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
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
          </div>
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
            The bowl is above this. Last one standing. No captain. No wall.
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
          <div className="cw-watch-row">
            <Watch
              href="https://oldschool.runescape.wiki/w/Clan_Wars"
              kicker="Portal"
              title="Old School"
              line="Ferox. Wiki for the current door."
            />
            <Watch
              href="https://runescape.wiki/w/Clan_Wars"
              kicker="Portal"
              title="RuneScape"
              line="Grotto. Wiki for the current door."
            />
          </div>
        </section>
      </main>
    </div>
  );
}
