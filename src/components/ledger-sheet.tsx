import { Link } from "@tanstack/react-router";
import type { LedgerRow } from "@/lib/ledgers";

export function LedgerSheet({
  title,
  deck,
  game,
  wiki,
  f2p,
  members,
  foot,
}: {
  title: string;
  deck: string;
  game: string;
  wiki: string;
  f2p: LedgerRow[];
  members: LedgerRow[];
  foot: string;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <p className="text-xs text-muted">
          <Link to="/" className="text-parchment">
            Banner Studio
          </Link>
        </p>
        <h1 className="page-h1 mt-1">{title}</h1>
        <p className="mt-2 max-w-2xl text-center text-sm text-muted">{deck}</p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main className="mx-auto grid max-w-4xl gap-8 px-5 py-6 md:grid-cols-2 md:px-8">
        <Column heading="Free-to-play" rows={f2p} />
        <Column heading="Members" rows={members} />
      </main>
      <p className="mx-auto max-w-4xl px-5 pb-8 text-sm text-muted md:px-8">
        {foot}{" "}
        <a href={wiki} target="_blank" rel="noopener noreferrer" className="text-parchment">
          {game} money making guide
        </a>
      </p>
    </div>
  );
}

function Column({ heading, rows }: { heading: string; rows: LedgerRow[] }) {
  return (
    <section>
      <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">{heading}</h2>
      <ul className="flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.name} className="px-1 py-2">
            <a href={row.href} target="_blank" rel="noopener noreferrer" className="text-sm text-parchment">
              {row.name}
            </a>
            <p className="text-xs text-muted">{row.what}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
