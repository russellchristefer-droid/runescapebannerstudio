import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { useEggGestures } from "@/hooks/use-egg-gestures";
import { GOD_BRIEFS, GOD_SLUGS, deskGodPath, godFromSlug } from "@/lib/gods";
import { godStill, godStillLine } from "@/lib/god-stills";
import { GODS, LOCATIONS } from "@/lib/locations";
import { BackLink } from "@/components/back-link";
import { OfficialPulse } from "@/components/official-pulse";

export const Route = createFileRoute("/gods/$god")({
  component: GodPage,
});

function GodPage() {
  const { god: slug } = Route.useParams();
  const god = godFromSlug(slug);
  if (!god) throw notFound();
  const brief = GOD_BRIEFS[god];
  const towns = LOCATIONS.filter((loc) => loc.god === god);
  const osrsDesk = deskGodPath(slug, "osrs");
  const rs3Desk = deskGodPath(slug, "rs3");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">
          {brief.god}
        </h1>
        <p className="mt-1 text-sm text-parchment">{brief.title}</p>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 md:px-8">
        <OfficialPulse
          note="Official wiki for this god. Official news wins."
          links={[
            { label: `${brief.god} · Old School wiki`, href: brief.wikiOsrs },
            { label: `${brief.god} · RuneScape wiki`, href: brief.wikiRs3 },
          ]}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {godStill(god, "OSRS") ? (
            <GodFigure
              src={godStill(god, "OSRS")!}
              alt={`${brief.god} in Old School RuneScape`}
              caption={godStillLine(god, "OSRS")}
            />
          ) : (
            <p className="text-sm text-muted">Still needed — Old School RuneScape.</p>
          )}
          {godStill(god, "RS3") ? (
            <GodFigure
              src={godStill(god, "RS3")!}
              alt={`${brief.god} in RuneScape`}
              caption={godStillLine(god, "RS3")}
            />
          ) : (
            <p className="text-sm text-muted">Still needed — RuneScape.</p>
          )}
        </div>
        <p className="text-sm text-muted">{brief.summary}</p>
        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">
            TWO CANONS
          </h2>
          <p className="text-sm text-muted">
            <span className="text-fg">Old School RuneScape. </span>
            {brief.osrs}
          </p>
          <p className="mt-3 text-sm text-muted">
            <span className="text-fg">RuneScape. </span>
            {brief.rs3}
          </p>
          <p className="mt-3 text-sm">
            <a href={brief.wikiOsrs} className="text-parchment" target="_blank" rel="noopener noreferrer">
              Read the live page · Old School
            </a>
            {" · "}
            <a href={brief.wikiRs3} className="text-parchment" target="_blank" rel="noopener noreferrer">
              Read the live page · RuneScape
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">
            SIGNS
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {brief.notes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">
            FIGHT THAT BELONGS HERE
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {brief.play.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        {god === "Zaros" ? (
          <details className="px-1 py-2 text-sm text-muted">
            <summary className="cursor-pointer text-xs tracking-[0.14em] text-faint">
              Senntisten ledger
            </summary>
            <p className="mt-3">
              RuneScape methods only. No GP/hour on this desk.{" "}
              <Link to="/senntisten" className="text-parchment">
                Open the Senntisten ledger
              </Link>
              .
            </p>
          </details>
        ) : null}
        {god === "Guthix" ? (
          <p className="text-xs text-faint">
            There is a balance sheet.{" "}
            <Link to="/guthix-ledger" className="text-muted">
              Guthix ledger
            </Link>
          </p>
        ) : null}
        {(osrsDesk || rs3Desk) ? (
          <p className="flex flex-wrap gap-3 text-sm">
            {osrsDesk ? (
              <a href={osrsDesk} className="text-parchment">
                Use on a banner · Old School
              </a>
            ) : null}
            {rs3Desk ? (
              <a href={rs3Desk} className="text-parchment">
                Use on a banner · RuneScape
              </a>
            ) : null}
          </p>
        ) : null}
        <section>
          <h2 className="mb-3 text-sm font-medium text-muted">
            Towns you can banner
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {towns.map((loc) => (
              <Link
                key={loc.id}
                to="/"
                className="px-1 py-2 text-sm"
              >
                <div className="font-medium">{loc.name}</div>
                <div className="text-xs text-faint">
                  {loc.edition} · {loc.region}
                </div>
              </Link>
            ))}
          </div>
        </section>
        <nav className="flex flex-wrap gap-2 text-xs">
          {GODS.map((item) => (
            <Link
              key={item}
              to="/gods/$god"
              params={{ god: GOD_SLUGS[item] }}
              className={`rounded-md border px-3 py-1.5 ${
                item === god ? "border-parchment bg-raised" : "border-line"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-faint">
          Fan desk notes. Live page: the official wiki for this game.{" "}
          <a href={brief.wikiOsrs} target="_blank" rel="noopener noreferrer" className="text-parchment">
            Old School
          </a>
          {" · "}
          <a href={brief.wikiRs3} target="_blank" rel="noopener noreferrer" className="text-parchment">
            RuneScape
          </a>
        </p>
        <Link to="/" className="text-sm text-parchment">
          Back to banners
        </Link>
      </main>
    </div>
  );
}

function GodFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const ref = useRef<HTMLElement | null>(null);
  useEggGestures(ref, () => "The stone remembers a name.");
  return (
    <figure ref={ref}>
      <img
        src={src}
        alt={alt}
        className="aspect-video w-full rounded-md border border-line bg-surface object-cover"
      />
      <figcaption className="mt-1 text-center text-[11px] text-faint">{caption}</figcaption>
    </figure>
  );
}
