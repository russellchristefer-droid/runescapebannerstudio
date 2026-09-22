import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { BackLink } from "@/components/back-link";
import { OfficialPulse } from "@/components/official-pulse";
import { pageMeta } from "@/lib/page-title";
import { sisterSkill, skillGuideById, capeStyle, type SkillBand } from "@/lib/skill-guides";

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
        <p className="eyebrow text-center text-[10px] uppercase tracking-[0.18em] text-muted">Skills · {game}</p>
        <h1
          className="page-h1 site-title skill-page-title mt-1"
          style={capeStyle(row.skill.name) as CSSProperties}
        >
          {row.skill.name}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted">{row.deck}</p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c4a35a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <img
          src={row.skill.src}
          alt={`${row.skill.name} in ${game}`}
          width={96}
          height={96}
          className="mx-auto h-24 w-24 object-contain"
        />
        {row.moving ? (
          <p className="mt-3 text-center text-sm text-[#ffff00]">Methods still moving. Wiki is the source.</p>
        ) : null}
        <section className="mt-6">
          <h2 className="section-h2">Unlock</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.unlock}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">The route</h2>
          <ul className="mt-3 grid gap-3">
            {row.route.map((band) => (
              <Band key={band.band} band={band} />
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Inventory</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.inventory}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Money fork</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.money}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Iron fork</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.iron}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Kit</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.kit}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Mistakes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.mistakes}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Stop</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{row.stop}</p>
        </section>
        <OfficialPulse
          note="XP rates move. Use the live wiki for the number. This page is the route."
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
              <Link
                to="/skills/$id"
                params={{ id: sister.slug }}
                className="skill-link text-parchment"
                style={capeStyle(sister.skill.name) as CSSProperties}
              >
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

function Band({ band }: { band: SkillBand }) {
  const cells = [
    ["Method", band.method],
    ["Place", band.place],
    ["Click", band.click],
    ["Leave", band.leave],
  ];
  return (
    <li className="rs-panel rounded-md px-4 py-3">
      <p className="text-sm text-parchment">{band.band}</p>
      <dl className="mt-2 grid gap-2">
        {cells.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] uppercase tracking-[0.14em] text-faint">{label}</dt>
            <dd className="text-sm leading-relaxed text-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}