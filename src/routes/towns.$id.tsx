import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { townNote } from "@/lib/town-notes";
import { LOCATIONS, townStillLine, type Location } from "@/lib/locations";
import { godInk, godNeon, godPageStyle } from "@/lib/gods";
import { placeLore } from "@/lib/place-lore";
import { noticeFor } from "@/data/townNotices";
import { citizenForSpeaker } from "@/data/citizens";
import { streetFlipRemain, streetLine } from "@/data/streetTalk";
import { OfficialPulse } from "@/components/official-pulse";
import { PlaceRail } from "@/components/place-rail";
import { AppLink, godPath } from "@/components/place-chip";
import { TownVisit } from "@/places/town-visit";

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
  const sheet = loc ? godPageStyle(loc.god) : undefined;
  return (
    <div className={loc ? "god-page min-h-dvh" : "min-h-dvh bg-bg text-fg"} style={sheet}>
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1
          className="page-h1 site-title mt-1"
          style={loc ? { color: godInk(loc.god) } : undefined}
        >
          {note.title}
        </h1>
        {loc ? (
          <p className="mt-1 text-center text-sm text-muted">
            {loc.region.replace(/\s·\sOSRS$/, "")} ·{" "}
            <AppLink href={godPath(loc.god)} className="no-underline" style={{ color: godNeon(loc.god) }}>
              {loc.god}
            </AppLink>
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">{note.region}</p>
        )}
        <span
          className="mt-2 block h-px w-24"
          style={{ background: loc ? godNeon(loc.god) : "#c6a45a" }}
          aria-hidden="true"
        />
        <div className="mt-3">
          <PlaceRail section="towns" />
        </div>
      </header>
      <main
        id="content"
        className={
          loc
            ? "god-page-well mx-auto mt-6 mb-8 flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8"
            : "mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8"
        }
      >
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
          <section>
            <h2 className="text-sm font-semibold text-parchment">Places to visit</h2>
            <TownVisit loc={loc} />
          </section>
        ) : null}
        <p className="text-xs text-faint">
          Fan desk notes. Live page: the official wiki for this game.
        </p>
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

function StreetAndHour({ loc, wiki }: { loc: (typeof LOCATIONS)[number]; wiki?: string }) {
  const now = useVisibleNow(1_000);
  const game = loc.edition === "OSRS" ? "osrs" : "rs3";
  const bit = streetLine(loc.id, game, now);
  const notice = noticeFor(loc.id, game);
  const citizen = citizenForSpeaker(loc.id, game, bit.speaker, now);
  const [headGone, setHeadGone] = useState(false);
  return (
    <>
      <h2 className="text-sm font-semibold text-parchment">From the street</h2>
      <figure className="street citizen-cite flex flex-wrap items-center gap-3">
        {citizen.src && !headGone ? (
          <img
            src={citizen.src}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="h-[72px] w-[72px] shrink-0 object-contain object-bottom"
            onError={() => setHeadGone(true)}
          />
        ) : null}
        <blockquote
          className="min-w-[12rem] flex-1 text-sm leading-snug text-parchment/80"
          style={{ fontFamily: "Fondamento, serif" }}
        >
          <strong>{bit.speaker}.</strong> {bit.line}
        </blockquote>
        <figcaption className="w-full text-[11px] text-muted">
          From the street · flips in {streetFlipRemain(now)}
        </figcaption>
      </figure>
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
