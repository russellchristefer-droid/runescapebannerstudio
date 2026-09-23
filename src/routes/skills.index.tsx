import { useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { AppLink } from "@/places/place-chip";
import { SKILL_GUIDES, capeStyle, type SkillGuide } from "@/lib/skill-guides";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/skills/")({
  head: () => pageMeta("Skills", "Pick one edition. Wiki keeps the number. This page is the route."),
  component: SkillsPage,
});

function SkillsPage() {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const osrs = SKILL_GUIDES.filter((row) => row.skill.editions.includes("OSRS")).filter(
    (row) => !needle || row.skill.name.toLowerCase().includes(needle),
  );
  const rs3 = SKILL_GUIDES.filter((row) => row.skill.editions.includes("RS3")).filter(
    (row) => !needle || row.skill.name.toLowerCase().includes(needle),
  );
  return (
    <div className="skills-atlas min-h-dvh">
      <header className="section-head px-5 pt-2 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Skills</h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
          Two clients. Open a skill for the route: unlock, cost, early / mid / late, what to wear, and the mistake that
          burns the hour.
        </p>
        <p className="mx-auto mt-1 max-w-2xl text-center text-sm text-muted">
          XP rates move. Use the live wiki for the number. This page is the route.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c4a35a]/80" aria-hidden="true" />
        <div className="mt-3 flex justify-center">
          <input
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search by skill"
            aria-label="Search skills"
            className="min-h-11 w-48 rounded-md border border-line bg-surface px-3 text-sm text-parchment"
          />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-6 md:px-8">
        <SkillGrid id="osrs" title="Old School" rows={osrs} />
        <SkillGrid id="rs3" title="RuneScape" rows={rs3} />
      </main>
    </div>
  );
}

function SkillGrid({ id, title, rows }: { id: string; title: string; rows: SkillGuide[] }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="section-h2 mb-4 text-center">
        {title}
        <span className="ml-2 text-[11px] font-normal text-faint">{rows.length}</span>
      </h2>
      {rows.length ? (
        <ul className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:grid-cols-4">
          {rows.map((row) => (
            <SkillTile key={row.slug} row={row} game={title} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-muted">Nothing here. Clear search.</p>
      )}
    </section>
  );
}

function SkillTile({ row, game }: { row: SkillGuide; game: string }) {
  return (
    <li className="w-full max-w-[11rem]">
      <AppLink
        href={`/skills/${row.slug}`}
        className="skill-card rs-panel flex h-full min-h-[12rem] flex-col items-center justify-center gap-2 rounded-md px-3 py-4 text-center"
        style={capeStyle(row.skill.name) as CSSProperties}
      >
        <span className="flex h-16 w-16 items-center justify-center">
          <img
            src={row.skill.src}
            alt={`${row.skill.name} in ${game}`}
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="max-h-14 max-w-14 object-contain"
          />
        </span>
        <span className="site-title">{row.skill.name}</span>
        <span className="skill-hook px-1 text-[10px] leading-snug text-muted">{row.tagline}</span>
        <span className="skill-open mt-1 rounded-md border border-line px-2 py-1 text-[10px] text-parchment">Open guide</span>
      </AppLink>
    </li>
  );
}