import { createFileRoute, Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/legal")({
  head: () => pageMeta("Legal", "Independent studio. Fan Content Policy. Not endorsed by Jagex."),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Legal</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Read this slowly.
        </p>
        <p className="mt-1 text-center text-sm text-muted">
          Independent studio · not a Jagex product
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 text-sm leading-relaxed text-muted md:px-8">
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Not Jagex</h2>
          <p>
            RuneScape Banner Studio is a fan-made browser desk for banners and local clips. It is
            not owned, endorsed, or operated by Jagex. RuneScape and Old School RuneScape are
            trademarks of Jagex Limited.
          </p>
          <p className="mt-3">
            Created using intellectual property belonging to Jagex Limited under the terms of
            Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.
          </p>
          <p className="mt-2">
            <a
              href="https://legal.jagex.com/docs/policies/fan-content-policy"
              className="text-parchment"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jagex Fan Content Policy
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">What you may do</h2>
          <p>
            Download a JPEG or clip for personal stream overlays and identification. Identification
            only — not an official logotype.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">What you may not do</h2>
          <p>
            Treat stills, icons, or exports as licensed for merch, paid ads, or as a Jagex product.
            Do not impersonate Jagex staff in a display name.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Stills and icons</h2>
          <p>
            In-game pictures and skill/mark icons are Jagex copyright. Some files also have wiki
            file-page terms. This studio does not grant those rights. Plate type: RS Chat Bold (fan
            replica of in-game chat bold). Not a Jagex font file. Not RuneScape UF.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Uploads and clips</h2>
          <p>
            Files you add stay in this browser session unless you download them. You warrant you may
            use them. Do not export a Bank PIN or login screen.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Hiscores</h2>
          <p>
            Public name lookup only. Jagex first. Wise Old Man is an Old School community board, not
            Jagex. No login.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Channels</h2>
          <p>The directory is independent. Not those streamers and not Jagex.</p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">No warranty</h2>
          <p>
            The desk is offered as-is. Official news and the official wikis win if this copy
            disagrees.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Takedown</h2>
          <p>
            Honour a clear notice from Jagex or the wiki projects. Takedown address is not published
            yet.
          </p>
        </section>
        <p className="text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/brief">Brief</Link>
        </p>
      </main>
    </div>
  );
}
