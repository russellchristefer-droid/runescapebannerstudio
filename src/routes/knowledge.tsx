import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { OfficialSites } from "@/components/official-sites";
import { OfficialPulse } from "@/components/official-pulse";
import { KNOWLEDGE_SITES } from "@/lib/knowledge-sites";

import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: pageTitle("Sites") }] }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const osrs = KNOWLEDGE_SITES.filter((site) => site.edition !== "RS3");
  const rs3 = KNOWLEDGE_SITES.filter((site) => site.edition !== "OSRS");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Sites</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">Official · not this desk.</p>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialSites />
        <OfficialPulse />
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">
            Old School RuneScape
          </h2>
          <List sites={osrs} />
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">
            RuneScape 3
          </h2>
          <List sites={rs3} />
        </section>
      </main>
    </div>
  );
}

function List({ sites }: { sites: typeof KNOWLEDGE_SITES }) {
  return (
    <ul className="flex flex-col gap-2">
      {sites.map((site) => (
        <li key={site.href}>
          <a
            href={site.href}
            target="_blank"
            rel="noreferrer"
            className="block rounded-md border border-line bg-raised px-3 py-3"
          >
            <span className="block text-sm font-medium text-parchment">
              {site.name}
            </span>
            <span className="text-xs text-muted">{site.use}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
