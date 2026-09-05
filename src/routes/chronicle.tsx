import { Link, createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/page-title";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/chronicle")({
  head: () => ({ meta: [{ title: pageTitle("Chronicle") }] }),
  component: ChroniclePage,
});

function ChroniclePage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Chronicle</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          A fan ledger of public memory. Not Jagex. Not a hiscores rank.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="chronicle prose-desk mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 text-sm text-muted md:px-8">
        <p className="text-parchment">
          Gielinor is not a timeline so much as a palimpsest: each age writes through the last
          and leaves the edges showing. This desk keeps a sill, not a throne. The bank is a
          ledger of appetite; the sill is a ledger of looking.
        </p>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">How to read this</h2>
          <p>
            Old School RuneScape and RuneScape are two live grammars. What is crater and edict
            in one is not geography in the other. If this page and the official wiki disagree,
            the wiki keeps the hour.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">Old School RuneScape — the 2007-era grammar</h2>
          <h3 className="mt-4 mb-1 text-fg">Lumbridge</h3>
          <p>
            Threshold, not capital. The castle is a first theorem: walls, chapel, river road.
            Tutorial Island remains a pedagogic ghost — a place players remember more than they inhabit.
            Duke Horacio’s stone is still the sermon at the start of the map.
          </p>
          <p className="mt-2">
            <a href="https://oldschool.runescape.wiki/w/Lumbridge" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Lumbridge (Old School)
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Varrock</h3>
          <p>
            The square is agora and rumour mill. Palace and slums share a street grid; Gertrude’s
            household sits in the domestic grain of the city. Bob the Cat is the unappointed
            archivist of the sill. Grand Exchange later becomes the city’s other heart — price
            as public speech.
          </p>
          <p className="mt-2">
            <a href="https://oldschool.runescape.wiki/w/Varrock" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Varrock (Old School)
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Falador</h3>
          <p>
            White walls as performed virtue. Knights, party room, and the joke of piety sharing
            a postcode. The city teaches that order is a costume the Wilderness does not rent.
          </p>
          <p className="mt-2">
            <a href="https://oldschool.runescape.wiki/w/Falador" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Falador (Old School)
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Wilderness</h3>
          <p>
            A contract with risk. Skull, ditch, and the ethics of the attack option. Public
            memory holds mass events and law-changes as weather, not as this desk’s gossip column.
          </p>
          <p className="mt-2">
            <a href="https://oldschool.runescape.wiki/w/Wilderness" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Wilderness (Old School)
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Names in the culture</h3>
          <p>
            Early hiscores myth (the single name at the top of a board) taught a generation that
            time could be a spectacle. Later, quest-guide voices and iron theatre — series watched
            as civic ritual — taught another generation that constraint is content. This page lists
            no private scandal and confers no rank.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">RuneScape — the later grammar</h2>
          <h3 className="mt-4 mb-1 text-fg">Lumbridge after the world moved</h3>
          <p>
            In this client the town is a palimpsest over war: crater-memory, rebuild, and the
            Sixth Age as weather. Do not export that crater onto an Old School still.
          </p>
          <p className="mt-2">
            <a href="https://runescape.wiki/w/Lumbridge" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Lumbridge (RuneScape)
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Prifddinas</h3>
          <p>
            A city of hours. Voice of Seren turns on the clock; this desk will not invent clan names
            to decorate a banner.
          </p>
          <p className="mt-2">
            <a href="https://runescape.wiki/w/Prifddinas" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Prifddinas
            </a>
          </p>
          <h3 className="mt-4 mb-1 text-fg">Senntisten and the ledger</h3>
          <p>
            Zarosian stone, archaeology of empire, a city that treats history as an extractable
            skill. Money methods belong on the wiki’s hour, not frozen here.
          </p>
          <p className="mt-2">
            <a href="https://runescape.wiki/w/Senntisten" rel="noopener noreferrer" target="_blank" className="text-parchment">
              Live page · Senntisten
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">The sill</h2>
          <p>
            Bob keeps better books than the bank. Twelve glyphs make a name. A JPEG is not a
            coronation. The best reading of Gielinor is still to stand in a place and examine it.
          </p>
        </section>
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/history">History</Link>
          {" · "}
          <Link to="/legal">Legal</Link>
        </p>
      </main>
    </div>
  );
}
