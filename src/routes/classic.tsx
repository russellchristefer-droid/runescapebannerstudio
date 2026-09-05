import { createFileRoute, Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { HERO_STILLS, type HeroStill } from "@/lib/still-pool";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/classic")({
  head: () => pageMeta("Classic", "RuneScape Classic archive gallery. Memory. Not a live world."),
  component: ClassicPage,
});

function ClassicPage() {
  const classic = HERO_STILLS.filter((card) => card.era === "rsc" && card.src.startsWith("/stills/rsc/"));
  const places = classic.filter((card) => card.kind === "place");
  const play = classic.filter((card) => card.kind === "play");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Classic</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Memory lives here. The worlds do not.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        <h2 className="mb-3 text-sm font-semibold text-parchment">Places</h2>
        <ClassicGrid cards={places} />

        <h2 className="mb-3 mt-8 text-sm font-semibold text-parchment">Play shots</h2>
        {play.length ? (
          <ClassicGrid cards={play} />
        ) : (
          <p className="text-sm text-muted">No honest Classic play still is hosted yet.</p>
        )}

        <h2 className="mb-2 mt-8 text-sm font-semibold text-parchment">Note</h2>
        <p className="max-w-2xl text-sm text-muted">
          RuneScape opened in January 2001 as a tiled Java world. Combat was slow. The map felt
          hand-sized, then suddenly not. In 2004 the later engine took the main name; Classic stayed
          as the older grammar. Jagex closed official Classic worlds in 2018. That is public record.
          This page is memory: hosted stills, not a world you can log into. It is not a private
          server and it will not pretend otherwise.
        </p>
        <p className="mt-3 text-sm text-parchment">
          <a href="https://classic.runescape.wiki/" target="_blank" rel="noopener noreferrer">
            RuneScape Classic wiki
          </a>
          {" · "}
          <Link to="/history">History</Link>
        </p>
        <p className="mt-3 text-sm text-parchment">
          <Link to="/">Banner desk</Link>
          {" · "}
          <Link to="/egg" className="text-faint">
            There is a box here
          </Link>
        </p>
      </main>
    </div>
  );
}

function ClassicGrid({ cards }: { cards: HeroStill[] }) {
  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {cards.map((card) => (
        <li key={card.src + card.name} className="overflow-hidden rounded-md border border-line bg-raised">
          <img
            src={card.src}
            alt={`${card.name}, ${card.kind}, RuneScape Classic`}
            width={1200}
            height={480}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full bg-surface object-cover"
          />
          <p className="site-title px-2 pt-1.5 text-center text-sm">{card.name}</p>
          <p className="px-2 text-center text-[10px] text-faint">
            {card.name} · {card.kind} · RuneScape Classic
          </p>
          <p className="px-3 pb-3 text-center text-[11px] text-faint">
            Gallery only.
            {card.filePage ? (
              <>
                {" "}
                <a href={card.filePage} target="_blank" rel="noopener noreferrer" className="text-parchment">
                  File page
                </a>
              </>
            ) : null}
            {card.waybackUrl ? (
              <>
                {" "}
                <a href={card.waybackUrl} target="_blank" rel="noopener noreferrer" className="text-parchment">
                  Wayback
                </a>
              </>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}
