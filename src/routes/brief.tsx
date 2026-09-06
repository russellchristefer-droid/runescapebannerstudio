import { Link, createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/page-title";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/brief")({
  head: () => pageMeta("Brief", "What RuneScape Banner Studio is and is not. Independent fan desk. Not Jagex."),
  component: BriefPage,
});

function In({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="text-parchment">
      {children}
    </Link>
  );
}

function BriefPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Brief</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">What this desk is, what it does, what it does not.</p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="prose-desk mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 text-sm text-muted md:px-8">
        <section>
          <h2 className="section-h2">What it is</h2>
          <p>
            RuneScape Banner Studio is an independent fan desk in the browser. It is not Jagex, not a game client, and not an official overlay. Old School RuneScape and RuneScape stay two games. Twitch categories are Old School RuneScape and RuneScape.
          </p>
        </section>
        <section>
          <h2 className="section-h2">What it does</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <In to="/">Banner Studio</In> — title still of a town. Chips Classic / Old School / RuneScape cycle that picture every five minutes. Bob sits under it. The desk below is one plate: pick a place, type a 12-letter display name (yellow on the JPEG only), stamp skills and marks, drag to move, wheel to resize, Look up Hiscores (Jagex first; Wise Old Man is Old School only). One Download under Postie Pete.
            </li>
            <li>
              Sizes — 1200×480 Twitch profile banner, 1280×720 YouTube thumb, 1920×1080 offline / player banner, 1920×480 wide panel. The preview can look smaller. The file is those pixels.
            </li>
            <li>
              <In to="/towns">Towns</In> — one sheet per town and game: still, lore, history, street talk, wiki. Use on banner opens the desk on that still.
            </li>
            <li>
              <In to="/gods">Gods</In> — two canons. Use on banner loads a home town for that god, not a statue as the whole plate.
            </li>
            <li>
              <In to="/bosses">Bosses</In> — arenas and raid rooms. Hunt notes. Live method on the wiki.
            </li>
            <li>
              <In to="/pvp">PvP</In> — two canons. Wilderness, PvP worlds, LMS, Bounty Hunter. Risk is the tax. Official rules win.
            </li>
            <li>
              <In to="/monsters">Bestiary</In> — slayer and common creatures only. Not bosses. Where, task, hunt, wiki.
            </li>
            <li>
              <In to="/classic">Classic</In> — RuneScape Classic archive. Places and play shots. Official Classic worlds are not on this desk.
            </li>
            <li>
              <In to="/history">History</In> — one fan story of public memory. <In to="/chronicle">Chronicle</In> — ages and doors, still two canons.
            </li>
            <li>
              <In to="/knowledge">Sites</In> — official Jagex and wiki links. <In to="/jmods">Jagex directory</In> — official pages, not a staff login.
            </li>
            <li>
              <In to="/stream">Stream</In> — go-live notes. <In to="/streamers">Streamers</In> — curated Twitch hall, optional live check. No YouTube buttons there. <In to="/youtubers">Youtubers</In> — YouTube hall only.
            </li>
            <li>
              <In to="/edit">Clips</In> — local video editor. Cut and save on this device. It does not go live and does not take a stream key off the tab.
            </li>
            <li>
              <In to="/legal">Legal</In> — Fan Content Policy sentence and the quiet rules. Counsel-plain.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="section-h2">What it cannot do</h2>
          <p>
            Run the game. Reset a PIN. Sell gold. Write the patch. Price the Grand Exchange. Host a stream like OBS. Licence stills or icons for merch. Print official Jagex logos. Invent a live world report for every street.
          </p>
        </section>
        <section>
          <h2 className="section-h2">Truth</h2>
          <p>If this desk and official news disagree, official news wins. If this desk and the wiki disagree, the wiki keeps the hour.</p>
        </section>
        <p className="text-sm text-muted">Independent studio · not a Jagex product</p>
        <p className="text-parchment">
          <Link to="/">Home</Link>
          {" · "}
          <Link to="/legal">Legal</Link>
          {" · "}
          <Link to="/knowledge">Sites</Link>
          {" · "}
          <a href="https://oldschool.runescape.wiki/" target="_blank" rel="noopener noreferrer">
            Old School wiki
          </a>
          {" · "}
          <a href="https://runescape.wiki/" target="_blank" rel="noopener noreferrer">
            RuneScape wiki
          </a>
          {" · "}
          <a href="https://support.jagex.com/" target="_blank" rel="noopener noreferrer">
            Jagex Support
          </a>
          {" · "}
          <a href="https://legal.jagex.com/docs/policies/fan-content-policy" target="_blank" rel="noopener noreferrer">
            Fan Content Policy
          </a>
        </p>
      </main>
    </div>
  );
}