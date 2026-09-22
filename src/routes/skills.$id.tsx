import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { OfficialPulse } from "@/components/official-pulse";
import { pageMeta } from "@/lib/page-title";
import { sisterSkill, skillGuideById } from "@/lib/skill-guides";

export const Route = createFileRoute("/skills/$id")({
  head: ({ params }) => {
    const row = skillGuideById(params.id);
    return pageMeta(row?.skill.name ?? "Skills", row?.tagline ?? "Unlocks, cost, methods. Wiki keeps the number.");
  },
  component: SkillPage,
});

function SkillPage() {
  const { id } = Route.useParams();
  const row = skillGuideById(id);
  if (!row) throw notFound();
  const game = row.skill.editions.includes("OSRS") ? "Old School RuneScape" : "RuneScape";
  const sister = sisterSkill(row);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <p className="eyebrow text-center text-[10px] uppercase tracking-[0.18em] text-muted">
          Skills · {game}
        </p>
        <h1 className="page-h1 site-title mt-1">{row.skill.name}</h1>
        <p className="mt-2 text-center text-sm text-muted">{row.tagline}</p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#2db85a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <img
          src={row.skill.src}
          alt={`${row.skill.name} in ${game}`}
          width={96}
          height={96}
          className="mx-auto h-24 w-24 object-contain"
        />
        <p className="mt-3 text-center text-[11px] text-muted">{game}</p>
        {row.moving ? (
          <p className="mt-3 text-center text-sm text-[#ffff00]">Methods still moving. Wiki is the source.</p>
        ) : null}
        <section className="mt-6">
          <h2 className="section-h2">Need</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.need}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Money</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.money}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Early</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.early}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Mid</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.mid}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Late</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.late}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Wear</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.wear}</p>
        </section>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section>
            <h2 className="section-h2">Afk</h2>
            <p className="text-sm leading-relaxed text-muted">{row.afk}</p>
          </section>
          <section>
            <h2 className="section-h2">Fast</h2>
            <p className="text-sm leading-relaxed text-muted">{row.fast}</p>
          </section>
        </div>
        <section className="mt-6">
          <h2 className="section-h2">Watch</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.watch}</p>
        </section>
        <OfficialPulse
          note="XP rates move. Use the live wiki for the number."
          links={[
            { label: "Live wiki", href: row.wiki },
            { label: "Training", href: row.train },
          ]}
        />
        <p className="mt-6 text-sm text-muted">
          <a href={row.wiki} target="_blank" rel="noopener noreferrer" className="text-parchment">
            Live wiki
          </a>
          {" · "}
          <a href={row.train} target="_blank" rel="noopener noreferrer" className="text-parchment">
            Training
          </a>
          {sister ? (
            <>
              {" · "}
              <Link to="/skills/$id" params={{ id: sister.slug }} className="text-parchment">
                {sister.skill.editions.includes("OSRS") ? "Old School" : "RuneScape"}
              </Link>
            </>
          ) : null}
        </p>
        <p className="mt-4 text-sm">
          <Link to="/skills" className="text-parchment">
            All skills
          </Link>
        </p>
      </main>
    </div>
  );
}
