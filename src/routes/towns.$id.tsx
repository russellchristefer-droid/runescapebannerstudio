import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { townNote } from "@/lib/town-notes";
import { LOCATIONS, townStillLine, type Location } from "@/lib/locations";
import { godInk, GOD_SLUGS } from "@/lib/gods";
import { placeLore } from "@/lib/place-lore";
import { noticeFor } from "@/data/townNotices";
import { citizenFor } from "@/data/citizens";
import { streetTalk } from "@/data/streetTalk";
import { stillIndex } from "@/lib/still-clock";
import { deskOpenPath } from "@/lib/desk-link";
import { OfficialPulse } from "@/components/official-pulse";
import { writeStudioSave } from "@/lib/studio-save";

function townWikiLinks(title: string, loc?: Location) {
  const path = encodeURI(title.replace(/ /g, "_"));
  const osrs = loc?.edition === "OSRS" ? placeLore(loc)?.sourceUrl : undefined;
  const rs3 = loc?.edition === "RS3" ? placeLore(loc)?.sourceUrl : undefined;
  const sister = loc
    ? LOCATIONS.find((row) => row.name === loc.name && row.edition !== loc.edition && row.kind === "town")
    : undefined;
  const sisterUrl = sister ? placeLore(sister)?.sourceUrl : undefined;
  return [
    { label: `${title} · Old School wiki`, href: osrs || (loc?.edition !== "RS3" ? `https://oldschool.runescape.wiki/w/${path}` : sisterUrl) },
    { label: `${title} · RuneScape wiki`, href: rs3 || (loc?.edition !== "OSRS" ? `https://runescape.wiki/w/${path}` : sisterUrl) },
  ].filter((row): row is { label: string; href: string } => Boolean(row.href));
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
            <Link
              to="/gods/$god"
              params={{ god: GOD_SLUGS[loc.god] }}
              className="no-underline"
              style={{ color: godInk(loc.god) }}
            >
              {loc.god}
            </Link>
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">{note.region}</p>
        )}
        <span className="mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8">
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
        <p className="text-xs text-faint">
          Fan desk notes. Live page: the official wiki for this game.
        </p>
        <a
          href={loc ? deskOpenPath(loc.edition, loc.id) : "/#desk"}
          className="text-sm text-parchment"
          onClick={() => {
            if (!loc) return;
            writeStudioSave({ locationId: loc.id, edition: loc.edition, skillPicks: [] });
          }}
        >
          Use this town on a banner
        </a>
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
  const now = useVisibleNow(60_000);
  const game = loc.edition === "OSRS" ? "osrs" : "rs3";
  const lines = streetTalk(loc.id, game);
  const line = lines[stillIndex(lines.length, now)] ?? lines[0];
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
