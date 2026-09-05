import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { noteFor } from "@/lib/boss-notes";
import { LOCATIONS } from "@/lib/locations";
import { OfficialPulse } from "@/components/official-pulse";
import { deskOpenPath } from "@/lib/desk-link";
import { writeStudioSave } from "@/lib/studio-save";
import { placeLore } from "@/lib/place-lore";

export const Route = createFileRoute("/bosses/$id")({
  component: BossNotePage,
});

function BossNotePage() {
  const { id } = Route.useParams();
  const note = noteFor(id);
  const loc = LOCATIONS.find((item) => item.id === id);
  if (!note || !loc) throw notFound();
  const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape 3";
  const team = /raid|duo|trio|5-man|team/i.test(note.role);
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
      <main className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8">
        <OfficialPulse />
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="aspect-[21/9] w-full rounded-md border border-line object-cover bg-surface"
        />
        <p className="text-sm">
          <span className="text-muted">Where. </span>
          {loc.name}
        </p>
        {placeLore(loc) ? (
          <section>
            <h2 className="mb-2 text-sm font-semibold text-parchment">Lore</h2>
            <p className="text-sm text-muted">{placeLore(loc)!.brief}</p>
            <p className="mt-2 text-sm">
              <a
                href={placeLore(loc)!.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-parchment"
              >
                Read the live page
              </a>
            </p>
          </section>
        ) : null}
        {note.start[0] ? (
          <p className="text-sm">
            <span className="text-muted">Gate. </span>
            {note.start[0]}
          </p>
        ) : null}
        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">THE FIGHT</h2>
          <p className="mb-2 text-sm text-muted">{note.style}</p>
          <p className="mb-3 text-sm text-muted">{note.pray}</p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {note.route.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
        {note.kit[0] ? (
          <p className="text-sm">
            <span className="text-muted">What to bring. </span>
            {note.kit[0]}
          </p>
        ) : null}
        {team ? (
          <p className="text-sm">
            <span className="text-muted">Roles. </span>
            {note.role}. {note.pray}
          </p>
        ) : null}
        {note.method[0] ? (
          <p className="text-sm">
            <span className="text-muted">Step up. </span>
            {note.method[0]}
          </p>
        ) : null}
        <p className="text-sm text-muted">
          Do not say on stream: unpublished drop rates, “this week’s patch loot,” or a fossil rotation as if it were live.
        </p>
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
          Use this town on a banner
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
        {edition === "OSRS" ? "Same name in RuneScape 3" : "Same name in Old School RuneScape"}
      </Link>
    </p>
  );
}
