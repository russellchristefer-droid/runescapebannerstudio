import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { StreamDesk } from "@/components/stream-desk";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/stream")({
  head: () => pageMeta("Stream", "Go-live notes. Category is Old School RuneScape or RuneScape."),
  component: StreamPage,
});

function StreamPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Stream</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Go-live notes. This desk does not log in or encode your stream.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto max-w-3xl px-5 py-6 md:px-8">
        <StreamDesk />
      </main>
    </div>
  );
}
