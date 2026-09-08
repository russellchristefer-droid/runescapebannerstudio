import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { OfficialSites } from "@/components/official-sites";
import { KNOWLEDGE_SITES, type KnowledgeSite } from "@/lib/knowledge-sites";
import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: pageTitle("Sites") }] }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const clients = KNOWLEDGE_SITES.filter((site) => site.group === "client");
  const wikis = KNOWLEDGE_SITES.filter((site) => site.group === "wiki");
  const boards = KNOWLEDGE_SITES.filter((site) => site.group === "board");
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Sites</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Official first. Then the clients people actually open. Not this desk.
        </p>
      </header>
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialSites />
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Clients</h2>
          <p className="mb-3 text-xs text-muted">
            Jagex Launcher is official. RuneLite and Alt1 are third-party. Official rules
            win. They do not click.
          </p>
          <List sites={clients} />
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Wikis and boards</h2>
          <List sites={wikis} />
        </section>
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Community</h2>
          <List sites={boards} />
        </section>
      </main>
    </div>
  );
}

function List({ sites }: { sites: KnowledgeSite[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {sites.map((site) => (
        <li key={site.href}>
          <a
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md border border-line bg-raised px-3 py-3"
          >
            <span className="block text-sm font-medium text-parchment">{site.name}</span>
            <span className="text-xs text-muted">{site.use}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
