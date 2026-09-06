import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { BossSheet } from "@/components/boss-sheet";
import { noteFor } from "@/lib/boss-notes";
import { sheetFor } from "@/lib/boss-sheets";
import { deskOpenPath } from "@/lib/desk-link";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/page-title";
import { writeStudioSave } from "@/lib/studio-save";

export const Route = createFileRoute("/bosses/$id")({
  head: ({ params }) => {
    const note = noteFor(params.id);
    return pageMeta(note?.title ?? "Boss", "Working PvM sheet. Wear, eat, spec, wipe. Wiki keeps the hour.");
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
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">{note.title}</h1>
        <p className="mt-1 text-center text-sm text-muted">
          {game} · {sheet.role}
        </p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-[12px] text-muted">
          {sheet.sources.map((src) => (
            <a
              key={src.href}
              href={src.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment"
            >
              {src.rank}. {src.label}
            </a>
          ))}
        </p>
        <span className="mt-2 mx-auto block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 md:px-8">
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="aspect-[21/9] w-full rounded-md border border-line object-cover bg-surface"
        />

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
