import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { YOUTUBERS, tubeUrl, type Youtuber } from "@/data/youtubers";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/youtubers")({
  head: () => pageMeta("Youtubers", "Hall of known RuneScape YouTube channels. Not complete. Not Jagex."),
  component: YoutubersPage,
});

function eraCaption(row: Youtuber) {
  if (row.era === "official") return "Official";
  if (row.era === "foundation") return "Older / foundation";
  return "Current";
}

function Row({ row }: { row: Youtuber }) {
  const href = tubeUrl(row.youtube);
  if (!href) return null;
  return (
    <li className="flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm">
        {row.name}
        <span className="ml-2 text-[10px] text-faint">{eraCaption(row)}</span>
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${row.name} on YouTube`}
        className="text-sm text-parchment"
      >
        YouTube
      </a>
    </li>
  );
}

function Block({ title, rows }: { title: string; rows: Youtuber[] }) {
  if (!rows.length) return null;
  return (
    <section>
      <h3 className="mb-2 text-xs font-semibold text-muted">{title}</h3>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </ul>
    </section>
  );
}

function GameDesk({
  heading,
  official,
  current,
  older,
}: {
  heading: string;
  official: Youtuber[];
  current: Youtuber[];
  older: Youtuber[];
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-sm font-semibold text-parchment">{heading}</h2>
      <Block title="Official" rows={official} />
      <Block title="Still making videos" rows={current} />
      <Block title="Older / archive" rows={older} />
    </section>
  );
}

function YoutubersPage() {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const rows = useMemo(
    () => (needle ? YOUTUBERS.filter((row) => row.name.toLowerCase().includes(needle) || row.youtube.toLowerCase().includes(needle)) : YOUTUBERS),
    [needle],
  );
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Youtubers</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Hall of known channels. Not complete. Not Jagex.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <label className="mx-auto mt-3 block max-w-sm text-[10px] text-muted">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-1 h-10 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
          />
        </label>
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-6 md:px-8">
        {needle && !rows.length ? <p className="text-sm text-muted">No names match.</p> : null}
        <section className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-parchment">Official</h2>
          <Block
            title="Official"
            rows={rows.filter((row) => row.era === "official")}
          />
        </section>
        <section className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold text-parchment">Foundation</h2>
          <Block
            title="Older / foundation"
            rows={rows.filter((row) => row.era === "foundation" && row.game !== "both").sort((a, b) =>
              a.name.localeCompare(b.name),
            )}
          />
        </section>
        <GameDesk
          heading="Old School RuneScape"
          official={[]}
          current={rows.filter((row) => row.game === "osrs" && row.era === "current").sort((a, b) =>
            a.name.localeCompare(b.name),
          )}
          older={[]}
        />
        <GameDesk
          heading="RuneScape"
          official={[]}
          current={rows.filter((row) => row.game === "rs3" && row.era === "current").sort((a, b) =>
            a.name.localeCompare(b.name),
          )}
          older={[]}
        />
        <Block title="Both games" rows={rows.filter((row) => row.game === "both")} />
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/streamers">Streamers</Link>
        </p>
      </main>
    </div>
  );
}
