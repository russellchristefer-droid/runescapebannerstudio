import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { AppLink } from "@/places/place-chip";
import { SKILL_GUIDES, type SkillGuide } from "@/lib/skill-guides";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/skills/")({
  head: () => pageMeta("Skills", "Two canons. Afk and fast. Wiki keeps the hour."),
  component: SkillsPage,
});

function SkillsPage() {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = SKILL_GUIDES.filter(
    (row) =>
      !needle ||
      row.skill.name.toLowerCase().includes(needle) ||
      row.slug.includes(needle.replace(/\s+/g, "-")),
  );
  const osrs = rows.filter((row) => row.skill.editions.includes("OSRS"));
  const rs3 = rows.filter((row) => row.skill.editions.includes("RS3"));
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Skills</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">
          Sequence as the client lists them. Afk and fast. Wiki keeps the hour. Sailing moves — confirm that page.
        </p>
        <p className="mt-1 text-center text-sm">
          <Link to="/monsters" className="text-parchment">
            Bestiary
          </Link>
          {" · "}
          <Link to="/pvp" className="text-parchment">
            PvP
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3 flex flex-wrap justify-center gap-2">
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
        <GameBlock title="Old School RuneScape" rows={osrs} />
        <GameBlock title="RuneScape" rows={rs3} />
      </main>
    </div>
  );
}

function GameBlock({ title, rows }: { title: string; rows: SkillGuide[] }) {
  return (
    <section className="mb-10">
      <h2 className="section-h2 mb-3 text-center">{title}</h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {rows.map((row) => (
          <li key={row.slug}>
            <AppLink
              href={`/skills/${row.slug}`}
              className="flex min-h-11 flex-col items-center gap-2 rounded-md border border-line bg-raised px-3 py-3 hover:border-[#F5C400]"
            >
              <img
                src={row.skill.src}
                alt={`${row.skill.name} in ${title}`}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 object-contain"
              />
              <span className="site-title text-center text-sm">{row.skill.name}</span>
              <span className="line-clamp-2 text-center text-[11px] text-muted">{row.fast}</span>
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
