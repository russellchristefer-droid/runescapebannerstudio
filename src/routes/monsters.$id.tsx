import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { StillPhoto } from "@/components/still-photo";
import { monsterById, monsterHuntLine, monsterKillLine, monsterSlayerLink, monsterStillLine, monsterStillSrc, monsterTaskLine, monsterWatchLine, sisterMonster } from "@/lib/monsters";
import { deskOpenPath } from "@/lib/desk-link";
import { writeStudioSave } from "@/lib/studio-save";
import { OfficialPulse } from "@/components/official-pulse";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/monsters/$id")({
  head: ({ params }) => pageMeta(monsterById(params.id)?.name ?? "Bestiary", "Hunt notes. The wiki keeps the hour."),
  component: MonsterPage,
});

function MonsterPage() {
  const { id } = Route.useParams();
  const row = monsterById(id);
  if (!row) throw notFound();
  const game = row.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
  const src = monsterStillSrc(row);
  const sister = sisterMonster(row);
  const note = "You already know the room. The creature is the constant. You are the variable.";
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <p className="eyebrow text-center text-[10px] uppercase tracking-[0.18em] text-muted">
          Bestiary · {row.slayer ? "Slayer" : "Monster"} · {game}
        </p>
        <h1 className="page-h1 site-title mt-1">{row.name}</h1>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <OfficialPulse
          note="Official wiki for this creature. Official news wins."
          links={[
            { label: `${row.name} · ${game} wiki`, href: row.wiki },
            sister ? { label: `${sister.name} · ${sister.edition === "OSRS" ? "Old School RuneScape" : "RuneScape"} wiki`, href: sister.wiki } : null,
          ].filter((row): row is { label: string; href: string } => Boolean(row))}
        />
        {src ? (
          <StillPhoto
            src={src}
            alt={`${row.name} in ${game}`}
            className="aspect-[21/9] w-full border border-[#c6a45a] bg-surface object-cover"
          />
        ) : (
          <p className="border border-[#c6a45a] bg-surface px-3 py-10 text-center text-sm text-muted">Even the beast declined to appear.</p>
        )}
        <p className="mt-2 text-center font-[Fondamento] text-lg text-parchment">{note}</p>
        <p className="mt-1 text-center text-[11px] text-muted">{monsterStillLine(row)}</p>
        <p className="mt-1 text-center text-[11px] text-muted">{row.slayer ? "Slayer" : "Monster"} · {game}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="section-h2">Where</h2>
            <p className="text-sm text-muted">{row.where}</p>
            {row.gate ? <p className="mt-2 text-sm text-muted">{row.gate}</p> : null}
            <p className="mt-2 text-sm text-muted">{monsterTaskLine(row)}</p>
          </section>
          <section>
            <h2 className="section-h2">Hunt</h2>
            <p className="text-sm text-muted">{monsterHuntLine(row)}</p>
          </section>
        </div>
        <section className="mt-6">
          <h2 className="section-h2">Watch</h2>
          <p className="text-sm text-muted">{monsterWatchLine(row)}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Kill</h2>
          <p className="text-sm text-muted">{monsterKillLine(row)}</p>
        </section>
        <p className="mt-6 text-sm text-muted">
          <a href={row.wiki} target="_blank" rel="noopener noreferrer" className="text-parchment">
            Live wiki
          </a>
          {row.slayer && monsterSlayerLink(row) ? (
            <>
              {" · "}
              <a href={monsterSlayerLink(row)} target="_blank" rel="noopener noreferrer" className="text-parchment">
                Slayer task
              </a>
            </>
          ) : null}
          {sister ? (
            <>
              {" · "}
              <Link to="/monsters/$id" params={{ id: sister.id }} className="text-parchment">
                Same name in the other game
              </Link>
            </>
          ) : null}
          {row.placeId ? (
            <>
              {" · "}
              <a
                href={deskOpenPath(row.edition, row.placeId, { still: src })}
                className="text-parchment"
                onClick={() =>
                  writeStudioSave({
                    locationId: row.placeId,
                    edition: row.edition,
                    skillPicks: [],
                    stillSrc: src,
                  })
                }
              >
                Use on banner
              </a>
            </>
          ) : null}
        </p>
      </main>
    </div>
  );
}