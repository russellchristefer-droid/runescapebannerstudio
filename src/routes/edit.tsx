import { createFileRoute } from "@tanstack/react-router";
import { ClipBench, StreamDesk } from "@/edit";
import { SiteHeader } from "@/components/site-header";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/edit")({
  head: () => pageMeta("Clips", "Local clip bench. Trim and save a file. This page does not go live."),
  component: EditPage,
});

function EditPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader skip={{ href: "#content", label: "Skip to clips" }} />
      <main id="content" className="mx-auto max-w-[72rem] px-3 py-6 md:px-8">
        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-3">
            <h1 className="page-h1 m-0 text-left">Clips</h1>
            <p className="text-[11px] tracking-wide text-muted">Local clips. Not a live studio.</p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ClipBench />
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>Upload a clip you own.</li>
          <li>Don't export a Bank PIN.</li>
        </ol>
        <StreamDesk />
        <p className="mt-3 text-xs text-faint">Banners are on the home desk.</p>
      </main>
    </div>
  );
}
