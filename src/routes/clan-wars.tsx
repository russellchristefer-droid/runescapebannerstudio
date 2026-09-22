import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "Two clients. Two doors. Do not mix the sheets.",
    ),
  component: ClanWarsPage,
});

const PLACES = [
  { href: "/pvp", label: "PvP", external: false },
  { href: "/towns", label: "Towns", external: false },
  { href: "/towns/osrsedge", label: "Edgeville", external: false },
  { href: "#osrs", label: "Ferox (OS)", external: false },
  { href: "#rs3", label: "Grotto (RS3)", external: false },
] as const;

function Chip({ href, label }: { href: string; label: string }) {
  const cls = "rs-chip min-h-11 text-xs";
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
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
    <div className="min-h-dvh bg-bg text-fg">
      <header className="page-band px-5 py-5">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          Two clients. Two doors. Do not mix the sheets.
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
            <ul className="space-y-1 px-3 pb-3 text-center text-sm text-muted">
              <li>Safe pocket in the Wilderness.</li>
              <li>Chat-channel sides. Captain sets the terms.</li>
              <li>Purple is the contract. White is practice.</li>
            </ul>
            <p className="px-3 pb-3 text-center">
              <a href="#called" className="rs-chip min-h-11 text-xs">
                Open Ferox notes
              </a>
            </p>
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
            <ul className="space-y-1 px-3 pb-3 text-center text-sm text-muted">
              <li>North of Falador.</li>
              <li>Friends Chat sides. Captain sets the terms.</li>
              <li>Purple is the war. Red is dangerous FFA.</li>
            </ul>
            <p className="px-3 pb-3 text-center">
              <a href="#called" className="rs-chip min-h-11 text-xs">
                Open Grotto notes
              </a>
            </p>
          </article>
        </section>

        <section className="rs-panel p-4">
          <h2 className="section-h2">Doors</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
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

        <section id="called" className="rs-panel scroll-mt-20 p-4">
          <h2 className="section-h2">How a fight is called</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>A captain (or higher) sends the challenge. If you cannot open the sheet, you are not the captain.</li>
            <li>Old School: chat-channel rank. RuneScape: Friends Chat.</li>
            <li>Read every box. Food off is a different fight than food on.</li>
            <li>Two-minute wall. Late is a spectator.</li>
            <li>One caller. One name. The pile clicks that name.</li>
          </ul>
          <h3 className="mt-5 text-center text-sm text-parchment">Old School — Ferox</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Ring of dueling, minigame teleport, or a waka canoe. Pool first. Purple when
            the terms are agreed. White is practice — stats restore. Mage and range can
            fire while the wall is up; melee waits. LMS, Bounty Hunter, and Castle Wars
            are other doors in the same pocket. They are not this match.
          </p>
          <h3 className="mt-5 text-center text-sm text-parchment">RuneScape — Grotto</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            North of Falador. Friends Chat. Purple is the war. White is safe FFA. Red
            drops the bag — Protect Item. Play the bar or Legacy as the chat called; do
            not mix those two grammars in one pile. Rated, if the lobby is up, is Clan
            Camp. Citadels are a skill. This cave is a fight.
          </p>
        </section>

        <section>
          <h2 className="section-h2">Fight Pits</h2>
          <p className="mb-3 text-center text-sm text-muted">A different game. Last one standing. No captain. No wall.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rs-panel overflow-hidden">
              <img
                src="/clan-wars/pits/osrs-champion.png"
                alt="Fight Pit champion, Old School"
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <h3 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">Mor Ul Rek</h3>
              <p className="px-3 pb-3 text-center text-sm text-muted">
                Old School. TzHaar Fight Pit. Fairy ring BLP. The bag stays. Tokkul for
                the champion. LMS in Ferox is a different building.
              </p>
            </article>
            <article className="rs-panel overflow-hidden">
              <img
                src="/clan-wars/pits/rs3-pits.jpg"
                alt="Fight Pit bowl, RuneScape"
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover"
              />
              <h3 className="site-title mx-auto block w-full px-3 pt-2 text-center text-sm no-underline">TzHaar City</h3>
              <p className="px-3 pb-3 text-center text-sm text-muted">
                RuneScape. Same bowl. TokKul-Zo is the fast door. 13 May 2008 waiting
                room was not safe; that hour is history, not the current rule.
              </p>
            </article>
          </div>
        </section>

        <section className="rs-panel p-4">
          <h2 className="section-h2">History</h2>
          <ol className="mt-3 space-y-3 text-sm text-muted">
            <li>
              <span className="text-parchment">4 Jan 2001.</span> Classic. No Wilderness.
              PK mode on a character. Clans picked a tile and a world.
            </li>
            <li>
              <span className="text-parchment">13 Aug 2001.</span> The ditch. PvP became a
              place. Skull is the tax.
            </li>
            <li>
              <span className="text-parchment">13 Dec 2004.</span> Castle Wars. Flag game
              west of Yanille. Not this minigame.
            </li>
            <li>
              <span className="text-parchment">19 Sep 2005.</span> Fight Pit. TzHaar bowl.
            </li>
            <li>
              <span className="text-parchment">10 Dec 2007.</span> Clan Wars named. Captains,
              terms, purple portal, two-minute wall.
            </li>
            <li>
              <span className="text-parchment">1 Feb 2011.</span> Main client: Grotto north of
              Falador. Wild comes home. The hall leaves it.
            </li>
            <li>
              <span className="text-parchment">19 Jun 2014.</span> Old School names the room.
              Giants’ Plateau first. Ferox takes it on 16 Jul 2020.
            </li>
            <li>
              <span className="text-parchment">Now.</span> Ferox on Old School. Grotto on
              RuneScape. Two chats on a wild tile is still the tax — that is{" "}
              <Link to="/pvp" className="text-parchment">
                PvP
              </Link>
              , not these doors.
            </li>
          </ol>
          <p className="mt-4 text-center text-sm">
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
          </p>
        </section>
      </main>
    </div>
  );
}
