import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { JAGEX_X_MODS, JAGEX_X_OFFICIAL, type JagexX } from "@/lib/jagex-x";

import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/jmods")({
  head: () => ({ meta: [{ title: pageTitle("Jagex directory") }] }),
  component: JmodsPage,
});

function JmodsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">
          Jagex X accounts
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          This page is a directory, not Jagex. Public handles only. Staff
          leave and titles change. Prefer{" "}
          <a href="https://www.jagex.com/" className="text-parchment" target="_blank" rel="noreferrer">
            jagex.com
          </a>
          ,{" "}
          <a href="https://www.runescape.com/" className="text-parchment" target="_blank" rel="noreferrer">
            runescape.com
          </a>
          , and{" "}
          <a href="https://oldschool.runescape.com/" className="text-parchment" target="_blank" rel="noreferrer">
            oldschool.runescape.com
          </a>
          .
        </p>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">
            OFFICIAL
          </h2>
          <List rows={JAGEX_X_OFFICIAL} />
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">
            J-MOD HANDLES
          </h2>
          <List rows={JAGEX_X_MODS} />
        </section>
        <p className="text-xs text-faint">
          Old School also keeps a live list from{" "}
          <a
            href="https://x.com/OldSchoolRS"
            className="text-parchment"
            target="_blank"
            rel="noreferrer"
          >
            @OldSchoolRS
          </a>
          . Views on personal J-Mod posts are their own.
        </p>
      </main>
    </div>
  );
}

function List({ rows }: { rows: JagexX[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((row) => (
        <li key={row.handle}>
          <a
            href={`https://x.com/${row.handle}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-line bg-raised px-3 py-3"
          >
            <span>
              <span className="block text-sm font-medium">{row.name}</span>
              <span className="text-xs text-muted">{row.role}</span>
            </span>
            <span className="text-sm text-parchment">@{row.handle}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
