import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { townNote } from "@/lib/town-notes";
import { LOCATIONS, townStillLine, type Location } from "@/lib/locations";
import { godInk } from "@/lib/gods";
import { placeLore } from "@/lib/place-lore";
import { noticeFor } from "@/data/townNotices";
import { citizenFor } from "@/data/citizens";
import { streetLine } from "@/data/streetTalk";
import { OfficialPulse } from "@/components/official-pulse";
import { PlaceRail } from "@/components/place-rail";
import { UseOnBanner } from "@/components/use-on-banner";
import { AppLink, VisitPlaces, godPath, townPath, bossPath } from "@/components/place-chip";
import { noteFor } from "@/lib/boss-notes";

function townWikiLinks(title: string, loc?: Location) {
  const path = encodeURI(title.replace(/ /g, "_"));
  if (!loc) return [];
  if (loc.edition === "OSRS") {
    const href = placeLore(loc)?.sourceUrl ?? `https://oldschool.runescape.wiki/w/${path}`;
    return [{ label: `${title} · Old School wiki`, href }];
  }
  const href = placeLore(loc)?.sourceUrl ?? `https://runescape.wiki/w/${path}`;
  return [{ label: `${title} · RuneScape wiki`, href }];
}

export const Route = createFileRoute("/towns/$id")({
  component: TownNotePage,
});

function TownNotePage() {
  const { id } = Route.useParams();
  const note = townNote(id);
  const loc = LOCATIONS.find((item) => item.id === id) ?? LOCATIONS.find((item) => item.name === note?.title);
  if (!note) throw notFound();
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">{note.title}</h1>
        {loc ? (
          <p className="mt-1 text-center text-sm text-muted">
            {loc.region.replace(/\s·\sOSRS$/, "")} ·{" "}
            <AppLink href={godPath(loc.god)} className="no-underline" style={{ color: godInk(loc.god) }}>
              {loc.god}
            </AppLink>
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">{note.region}</p>
        )}
        <span className="mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="towns" />
        </div>
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8">
        <OfficialPulse
          note="Official wiki for this street. Official news wins."
          links={townWikiLinks(note.title, loc)}
        />
        {loc ? <TownCycle loc={loc} title={note.title} /> : null}
        <h2 className="text-sm font-semibold text-parchment">Lore</h2>
        {note.lore.map((para) => (
          <p key={para} className="text-sm text-muted">
            {para}
          </p>
        ))}
        {note.history?.length ? (
          <>
            <h2 className="text-sm font-semibold text-parchment">History</h2>
            {note.history.map((para) => (
              <p key={para} className="text-sm text-muted">
                {para}
              </p>
            ))}
          </>
        ) : null}
        {loc ? <StreetAndHour loc={loc} wiki={placeLore(loc)?.sourceUrl} /> : null}
        {loc && placeLore(loc) ? (
          <p className="text-sm">
            <a
              href={placeLore(loc)!.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment"
            >
              Read the live page
            </a>
          </p>
        ) : null}
        {loc ? (
          <SisterPlace id={loc.id} name={loc.name} edition={loc.edition} />
        ) : null}
        {loc ? (
          <section>
            <h2 className="text-sm font-semibold text-parchment">Places to visit</h2>
            <VisitPlaces
              items={[
                { href: godPath(loc.god), label: loc.god },
                ...LOCATIONS.filter(
                  (row) =>
                    row.id !== loc.id &&
                    row.kind === "town" &&
                    row.god === loc.god &&
                    townNote(row.id),
                )
                  .slice(0, 8)
                  .map((row) => ({ href: townPath(row.id), label: row.name })),
                ...LOCATIONS.filter((row) => row.kind === "boss" && row.god === loc.god && noteFor(row.id))
                  .slice(0, 4)
                  .map((row) => ({ href: bossPath(row.id), label: row.name })),
              ]}
            />
          </section>
        ) : null}
        <p className="text-xs text-faint">
          Fan desk notes. Live page: the official wiki for this game.
        </p>
        {loc ? <UseOnBanner src={loc.viewA} edition={loc.edition} placeId={loc.id} /> : null}
      </main>
    </div>
  );
}

function TownCycle({
  loc,
  title,
}: {
  loc: (typeof LOCATIONS)[number];
  title: string;
}) {
  const src = loc.viewA;
  const game = loc.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <figure>
      <img
        src={src}
        alt={`${title} in ${game}`}
        className="aspect-[21/9] w-full rounded-md border border-line object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <figcaption className="mt-1 text-xs text-faint">
        {townStillLine(loc.id)}
      </figcaption>
    </figure>
  );
}

function SisterPlace({
  id,
  name,
  edition,
}: {
  id: string;
  name: string;
  edition: "OSRS" | "RS3";
}) {
  const sister =
    edition === "OSRS"
      ? LOCATIONS.find((item) => item.edition === "RS3" && item.name === name)
      : LOCATIONS.find((item) => item.edition === "OSRS" && item.name === name);
  if (!sister) return null;
  return (
    <p className="text-sm">
      <Link to="/towns/$id" params={{ id: sister.id }} className="text-parchment">
        {edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School RuneScape"}
      </Link>
    </p>
  );
}

function StreetAndHour({ loc, wiki }: { loc: (typeof LOCATIONS)[number]; wiki?: string }) {
  const now = useVisibleNow(1_000);
  const game = loc.edition === "OSRS" ? "osrs" : "rs3";
  const line = streetLine(loc.id, game, now);
  const notice = noticeFor(loc.id, game);
  const citizen = citizenFor(loc.id, game, now);
  const gameLabel = game === "osrs" ? "Old School RuneScape" : "RuneScape";
  const alt = `${citizen.role} of ${loc.name}, ${gameLabel}`;
  return (
    <>
      <h2 className="text-sm font-semibold text-parchment">From the street</h2>
      <figure className="citizen-cite flex flex-wrap items-center gap-3">
        {citizen.src ? (
          <img
            src={citizen.src}
            alt={alt}
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="h-[72px] w-[72px] shrink-0 object-contain object-bottom"
            onError={(e) => {
              e.currentTarget.remove();
            }}
          />
        ) : null}
        <blockquote
          className="min-w-[12rem] flex-1 text-sm leading-snug text-parchment/80"
          style={{ fontFamily: "Fondamento, serif" }}
        >
          “{line}”
        </blockquote>
        <figcaption className="w-full text-[11px] text-muted">
          {citizen.role} · {gameLabel}
        </figcaption>
      </figure>
      <p className="text-xs text-faint">Fan flavour.</p>
      <h2 className="text-sm font-semibold text-parchment">This hour</h2>
      {notice ? (
        <p className="text-sm text-muted">
          {notice.line}{" "}
          <a href={notice.url} target="_blank" rel="noopener noreferrer" className="text-parchment">
            {notice.kind === "news" ? "Official news" : "Wiki"}
          </a>
          <span className="text-faint"> · {notice.date}</span>
        </p>
      ) : (
        <p className="text-sm text-muted">
          No official notice for this street. The wiki keeps the hour.
          {wiki ? (
            <>
              {" "}
              <a href={wiki} target="_blank" rel="noopener noreferrer" className="text-parchment">
                Wiki
              </a>
            </>
          ) : null}
        </p>
      )}
    </>
  );
}
