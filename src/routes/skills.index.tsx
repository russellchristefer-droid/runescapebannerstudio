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

type Canon = "OSRS" | "RS3";

function SkillsPage() {
  const [q, setQ] = useState("");
  const [canon, setCanon] = useState<Canon>("OSRS");
  const needle = q.trim().toLowerCase();
  const rows = SKILL_GUIDES.filter((row) => row.skill.editions.includes(canon)).filter(
    (row) =>
      !needle ||
      row.skill.name.toLowerCase().includes(needle) ||
      row.slug.includes(needle.replace(/\s+/g, "-")),
  );
  const title = canon === "OSRS" ? "Old School RuneScape" : "RuneScape";
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 site-title mt-1">Skills</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          One canon at a time. Sequence as the client lists them. Open a card for early, mid, late, and what to wear.
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
          <button
            type="button"
            aria-pressed={canon === "OSRS"}
            className={`min-h-11 rounded-md border px-3 text-xs ${canon === "OSRS" ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`}
            onClick={() => setCanon("OSRS")}
          >
            Old School
          </button>
          <button
            type="button"
            aria-pressed={canon === "RS3"}
            className={`min-h-11 rounded-md border px-3 text-xs ${canon === "RS3" ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`}
            onClick={() => setCanon("RS3")}
          >
            RuneScape
          </button>
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
      <main className="mx-auto max-w-4xl px-5 py-6 md:px-8">
        <h2 className="section-h2 mb-4 text-center">
          {title}
          <span className="ml-2 text-[11px] font-normal text-faint">{rows.length}</span>
        </h2>
        {rows.length ? (
          <ul className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:grid-cols-4">
            {rows.map((row) => (
              <SkillTile key={`${canon}-${row.slug}`} row={row} game={title} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted">Nothing here. Clear search.</p>
        )}
      </main>
    </div>
  );
}

function SkillTile({ row, game }: { row: SkillGuide; game: string }) {
  return (
    <li className="w-full max-w-[11rem]">
      <AppLink
        href={`/skills/${row.slug}`}
        className="flex h-full min-h-[10.5rem] flex-col items-center justify-center gap-2 rounded-md border border-line bg-raised px-3 py-4 text-center hover:border-[#F5C400]"
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
        <span className="site-title text-sm leading-tight">{row.skill.name}</span>
        <span className="px-1 text-[10px] leading-snug text-muted">{row.hook}</span>
      </AppLink>
    </li>
  );
}
