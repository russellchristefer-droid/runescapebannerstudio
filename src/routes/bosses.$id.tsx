import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { BossSheet } from "@/components/boss-sheet";
import { OfficialPulse } from "@/components/official-pulse";
import { noteFor } from "@/lib/boss-notes";
import { hubFor, sheetFor } from "@/lib/boss-sheets";
import { deskOpenPath } from "@/lib/desk-link";
import { LOCATIONS, type Location } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";
import { placeLore } from "@/lib/place-lore";
import { writeStudioSave } from "@/lib/studio-save";

function sisterWiki(loc: Location) {
  const sister = LOCATIONS.find(
    (row) => row.name === loc.name && row.edition !== loc.edition && row.kind === loc.kind,
  );
  if (!sister) return null;
  const lore = placeLore(sister);
  if (!lore) return null;
  const game = sister.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return { label: `${sister.name} · ${game} wiki`, href: lore.sourceUrl };
}

export const Route = createFileRoute("/bosses/$id")({
  head: ({ params }) => {
    const note = noteFor(params.id);
    return pageMeta(note?.title ?? "Boss", "Working PvM sheet. Wiki keeps the hour.");
  },
  component: BossNotePage,
});

function BossNotePage() {
  const { id } = Route.useParams();
  const note = noteFor(id);
  const sheet = sheetFor(id);
  const loc = LOCATIONS.find((item) => item.id === id);
  if (!note || !sheet || !loc) throw notFound();
  const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const sister = sisterWiki(loc);
  const wiki = sheet.sources.find((s) => s.rank === 2);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">{note.title}</h1>
        <p className="mt-1 text-center text-sm text-muted">
          {game} · {note.role}
        </p>
        <span className="mt-2 mx-auto block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 md:px-8">
        <OfficialPulse
          note="Live method sits on the official news desk and the wiki. This sheet does not freeze a patch. Unofficial clips lose if they disagree."
          links={[
            { label: `${game} official desk`, href: hubFor(note.edition) },
            wiki ? { label: wiki.label, href: wiki.href } : null,
            sister,
          ].filter((row): row is { label: string; href: string } => Boolean(row))}
        />
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="aspect-[21/9] w-full rounded-md border border-line object-cover bg-surface"
        />

        <p className="text-sm text-muted">
          {note.style} First kill from the grid. Next rung from the wiki.
        </p>

        <BossSheet sheet={sheet} />

        <SisterBoss name={loc.name} edition={loc.edition} id={loc.id} />
        <a
          href={deskOpenPath(loc.edition, loc.id)}
          className="text-sm text-parchment"
          onClick={() =>
            writeStudioSave({
              locationId: loc.id,
              edition: loc.edition,
              skillPicks: [],
            })
          }
        >
          Use this place on a banner
        </a>
      </main>
    </div>
  );
}

function SisterBoss({
  name,
  edition,
  id,
}: {
  name: string;
  edition: "OSRS" | "RS3";
  id: string;
}) {
  const sister = LOCATIONS.find(
    (item) => item.kind === "boss" && item.name === name && item.edition !== edition && item.id !== id,
  );
  if (!sister) return null;
  return (
    <p className="text-sm">
      <Link to="/bosses/$id" params={{ id: sister.id }} className="text-parchment">
        {edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School RuneScape"}
      </Link>
    </p>
  );
}
