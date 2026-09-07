import { Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";

export function LegalPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Legal</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent fan studio. Not a Jagex product.
        </p>
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
          <p className="mt-3">
            This page says who runs the desk and what the stills are. It is not legal advice.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">What this is</h2>
          <p>
            A free identification desk: stills, banners, halls, skill and fight notes, and a local
            clip bench. It is not a game, not a client, not an official overlay, not a bank, not a
            store, and not Jagex Support.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Clear lines</h2>
          <p>
            This origin does not log into the game, does not sell gold or accounts, and does not
            print official Jagex logos. Guides are notes from public pages. The clip bench stays on
            your machine. If you export a file you do not have a right to use, that file is still
            yours.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Jagex property</h2>
          <p>
            RuneScape®, Old School RuneScape®, RuneScape Classic, Jagex®, Gielinor, skill icons, marks,
            partyhats, and in-game stills belong to Jagex Limited or its licensors. Shown here for
            identification under Jagex's Fan Content Policy.
          </p>
          <p className="mt-3">
            Created using intellectual property belonging to Jagex Limited under the terms of
            Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.
          </p>
          <p className="mt-3">
            Identification only. If Jagex or a rights holder asks for a file to come down, it comes
            down. We do not print official marks on merch.
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
          <p className="mt-3">Official news and the wiki win on numbers. This page does not call anyone a god player.</p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Other software</h2>
          <p>
            RuneLite is a third-party Old School client (BSD-2-Clause). Alt1 Toolkit is skillbert /
            runeapps.org. This studio does not ship those programs. Sidecar plugins on GitHub are
            fan add-ons: they do not click, they are not on Plugin Hub, and they are not official
            Jagex, RuneLite, or Alt1 products.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Your files</h2>
          <p>
            Desk JPEGs and clip WebMs stay on your device unless you upload them somewhere else.
            Do not export a Bank PIN or someone else's account.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Boards, wiki, and live</h2>
          <p>
            Hiscores: public Jagex boards, fail-soft. Wise Old Man is an Old School community board,
            not Jagex. Wiki links go to the wiki projects — their licence and talk pages, not ours.
          </p>
          <p className="mt-3">
            Live: Twitch or YouTube only if a key is configured. Otherwise the hall is a directory.
            Those platforms keep their own terms. A missing key is not a fake Live badge.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Names on History</h2>
          <p>
            The Legends' Guild sill uses public names and public work. It is a fan plaque, not a
            paid endorsement and not a private Discord dump.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Privacy</h2>
          <p>
            No account is required for a JPEG. The desk may keep a name and stamps in this browser.
            If Live is on, Twitch or YouTube sees the same public request any site would make.
            Contact mail is only the address above. This origin is not a shop, so it is not trying
            to sell your list.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Warranty</h2>
          <p>
            Provided as-is. No promise of uptime, Hiscores accuracy, or income.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Donate</h2>
          <p>Optional tip for the operator. Not a purchase of Jagex property. Not a refundable product.</p>
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
            Honour a clear notice from Jagex, a rights holder, or the wiki projects. Write to{" "}
            <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
              russell.christefer@gmail.com
            </a>
            . A letter still gets read.
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
