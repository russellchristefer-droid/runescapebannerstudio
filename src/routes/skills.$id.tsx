import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { BackLink } from "@/components/back-link";
import { OfficialPulse } from "@/components/official-pulse";
import { pageMeta } from "@/lib/page-title";
import { sisterSkill, skillGuideById, capeStyle, skillPageStyle, type SkillBand } from "@/lib/skill-guides";

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
    <div className="skill-page min-h-dvh" style={skillPageStyle(row.skill.name)}>
      <header className="border-b px-5 py-5 md:px-8">
        <BackLink />
        <p className="eyebrow mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted">Skills · {game}</p>
        <h1 className="page-h1 site-title skill-page-title mt-1">{row.skill.name}</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted">{row.deck}</p>
        <span className="skill-rule mx-auto mt-3 block h-px w-24" aria-hidden="true" />
      </header>
      <main id="content" className="skill-page-well mx-auto mt-6 mb-8 max-w-2xl rounded-md px-5 py-6 md:px-8">
        <div className="skill-mark">
          <img
            src={row.skill.src}
            alt={`${row.skill.name} in ${game}`}
            width={72}
            height={72}
            className="h-16 w-16 object-contain"
          />
        </div>
        {row.moving ? (
          <p className="mt-4 text-center text-sm text-parchment">Methods still moving. Wiki is the source.</p>
        ) : null}
        <section className="mt-6">
          <h2 className="section-h2">Unlock</h2>
          <p className="text-sm leading-relaxed text-muted">{row.unlock}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">The route</h2>
          <ul className="grid gap-3">
            {row.route.map((band) => (
              <Band key={band.band} band={band} />
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Inventory</h2>
          <p className="text-sm leading-relaxed text-muted">{row.inventory}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Money fork</h2>
          <p className="text-sm leading-relaxed text-muted">{row.money}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Iron fork</h2>
          <p className="text-sm leading-relaxed text-muted">{row.iron}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Kit</h2>
          <p className="text-sm leading-relaxed text-muted">{row.kit}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Mistakes</h2>
          <p className="text-sm leading-relaxed text-muted">{row.mistakes}</p>
        </section>
        <section className="mt-6">
          <h2 className="section-h2">Stop</h2>
          <p className="text-sm leading-relaxed text-muted">{row.stop}</p>
        </section>
        <OfficialPulse
          note="XP rates move. Use the live wiki for the number. This page is the route."
          links={[
            { label: "Live wiki", href: row.wiki },
            { label: "Training", href: row.train },
          ]}
        />
        <p className="skill-links mt-6 text-sm text-muted">
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
        <p className="skill-links mt-4 text-sm">
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
    <li className="skill-band rs-panel rounded-md px-4 py-4">
      <p className="skill-band-name text-sm">{band.band}</p>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
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