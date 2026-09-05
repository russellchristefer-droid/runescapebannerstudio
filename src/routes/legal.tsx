import { createFileRoute, Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/legal")({
  head: () => pageMeta("Legal", "Independent fan studio. Fan Content Policy. Not endorsed by Jagex."),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Legal</h1>
        <p className="mt-2 text-center text-sm text-muted">Independent fan studio. Not a Jagex product.</p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 text-sm leading-relaxed text-muted md:px-8">
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Operator</h2>
          <p>Christefer Lee Russell-Barnett</p>
          <p className="mt-2">
            <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
              russell.christefer@gmail.com
            </a>
          </p>
          <p className="mt-2">
            <a
              className="text-parchment"
              href="https://runescapebannerstudio.grok.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              runescapebannerstudio.grok.me
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">What this is</h2>
          <p>
            A free identification desk: stills, banners, halls, and a local clip bench. It is not a
            game, not a client, not an official overlay, not a bank.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Jagex property</h2>
          <p>
            RuneScape, Old School RuneScape, RuneScape Classic, Jagex, Gielinor, skill icons, marks,
            and in-game stills belong to Jagex Limited or its licensors. Shown here for
            identification under Jagex's Fan Content Policy.
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
          <p className="mt-3">Official news and the wiki win on numbers.</p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Your files</h2>
          <p>
            Exports stay on your device unless you upload them. Do not export other people's
            accounts or a bank PIN.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Boards and live</h2>
          <p>
            Hiscores: public Jagex boards, fail-soft. Wise Old Man is an Old School community board,
            not Jagex.
          </p>
          <p className="mt-3">
            Live: Twitch only if a key is configured. Otherwise the hall is a list.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Privacy</h2>
          <p>
            No account is required for a JPEG. If Live is on, Twitch sees the same public request
            any site would make. Contact mail is only the address above.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Warranty</h2>
          <p>Provided as-is. No promise of uptime, Hiscores accuracy, or income.</p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Donate</h2>
          <p>Optional. Not a purchase of Jagex property.</p>
          <p className="mt-2">
            <a
              className="text-parchment"
              href="https://cash.app/$takemymoneypleaseok"
              target="_blank"
              rel="noopener noreferrer"
            >
              cash.app/$takemymoneypleaseok
            </a>
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Takedown</h2>
          <p>
            Honour a clear notice from Jagex or the wiki projects. Write to{" "}
            <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
              russell.christefer@gmail.com
            </a>
            .
          </p>
        </section>
        <p className="text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/brief">Brief</Link>
          {" · "}
          <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
        </p>
      </main>
    </div>
  );
}
