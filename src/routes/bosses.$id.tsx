import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BackLink } from "@/components/back-link";
import { bossPvme, bossStrategy, bossWiki, bossWipe, noteFor } from "@/lib/boss-notes";
import { LOCATIONS, type Location } from "@/lib/locations";
import { OfficialPulse } from "@/components/official-pulse";
import { deskOpenPath } from "@/lib/desk-link";
import { writeStudioSave } from "@/lib/studio-save";
import { placeLore } from "@/lib/place-lore";

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
  component: BossNotePage,
});

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">{title}</h2>
      {children}
    </section>
  );
}

function BossNotePage() {
  const { id } = Route.useParams();
  const note = noteFor(id);
  const loc = LOCATIONS.find((item) => item.id === id);
  if (!note || !loc) throw notFound();
  const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const live = bossWiki(note);
  const strat = bossStrategy(note);
  const pvme = bossPvme(note);
  const sister = sisterWiki(loc);
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
          note="Live method sits on the wiki. This sheet does not freeze a patch."
          links={[
            { label: `${note.title} · ${game} wiki`, href: live },
            sister,
          ].filter((row): row is { label: string; href: string } => Boolean(row))}
        />
        <img
          src={loc.viewA}
          alt={`${note.title} arena, ${game}`}
          className="aspect-[21/9] w-full rounded-md border border-line object-cover bg-surface"
        />

        <Block title="Role">
          <p className="text-sm text-muted">{note.role}. {note.style}</p>
        </Block>

        <Block title="Stack">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {note.kit.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>{note.pray}</li>
          </ul>
        </Block>

        <Block title="Opener">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {note.start.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Block>

        <Block title="Mechanics">
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {note.route.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Block>

        <Block title="Wipe">
          <p className="text-sm text-muted">{bossWipe(note)}</p>
        </Block>

        <Block title="PVM hub / wiki">
          <p className="text-sm text-muted">
            Confirm ticks, gear, and this hour’s method on the live page. This desk does not freeze a rotation.
          </p>
          <p className="mt-2 flex flex-col gap-1 text-sm">
            <a href={live} target="_blank" rel="noopener noreferrer" className="text-parchment">
              {game} wiki · {note.title}
            </a>
            {note.edition === "OSRS" ? (
              <a href={strat} target="_blank" rel="noopener noreferrer" className="text-parchment">
                Strategies page
              </a>
            ) : null}
            {pvme ? (
              <a href={pvme} target="_blank" rel="noopener noreferrer" className="text-parchment">
                Community PvM Encyclopedia — not Jagex
              </a>
            ) : null}
            {sister ? (
              <a href={sister.href} target="_blank" rel="noopener noreferrer" className="text-parchment">
                {sister.label}
              </a>
            ) : null}
          </p>
        </Block>

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
