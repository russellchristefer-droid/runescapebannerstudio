import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
});

function DonatePage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Cash App</h1>
      </header>
      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-5 py-8 md:px-8">
        <p className="text-sm text-muted">
          Christefer Lee Russell-Barnett. Optional tip for the person who built this fan studio. Not Jagex.
          Not a guild bank.
        </p>
        <p className="text-sm">
          <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
            russell.christefer@gmail.com
          </a>
        </p>
        <a
          href="https://cash.app/$takemymoneypleaseok"
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-parchment px-4 py-3 text-center font-medium text-ink"
        >
          $takemymoneypleaseok
        </a>
        <p className="text-xs text-faint">
          Opens Cash App. Send only what you mean to send.
        </p>

        <figure className="overflow-hidden rounded-md border-4 border-[#c8a24a] bg-[#1a140c] shadow-[inset_0_0_0_2px_#5a3e16]">
          <div className="flex items-center justify-between border-b border-[#5a3e16] bg-[#2a2114] px-3 py-1.5">
            <span className="text-[11px] tracking-[0.16em] text-[#e8d5a3] uppercase">
              Player-owned house
            </span>
            <span className="text-[10px] text-[#8a7a55]">RS3 · 3 Sep 2026</span>
          </div>
          <video
            className="aspect-video w-full bg-black"
            controls
            playsInline
            preload="metadata"
            poster="/media/poh.jpg"
            src="/media/poh.mp4"
          >
            Your browser cannot play this house clip.
          </video>
          <figcaption className="border-t border-[#5a3e16] bg-[#2a2114] px-3 py-2 text-xs text-[#c8b78a]">
            House walkthrough from the builder. Fan clip. Not an official
            Jagex trailer.
          </figcaption>
        </figure>
      </main>
    </div>
  );
}
