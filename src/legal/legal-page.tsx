import { Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";

export function LegalPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Legal</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent fan studio. Not a Jagex product. Not a law firm.
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
            This page is a notice, not legal advice. If Jagex, a host, or a court writes, that letter
            wins over this paragraph.
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
          <h2 className="mb-2 font-semibold text-parchment">What a hostile reader will try</h2>
          <p>
            Passing off — we do not use official Jagex logos, we do not say endorsed, and we do not
            sell gold, bonds, or accounts. Confusion with a client — this origin does not log in,
            does not touch your cache, and does not run a world. Licence overreach — original code
            and original prose are studio-owned; the stills, icons, and names stay Jagex or their
            licensors. User clips — the bench records on your machine; if you export someone else’s
            stream, that is your problem, not a studio licence. Guides — PvP and skills are
            commentary from public pages and public fights. They are not a coaching contract and
            not a cheat client.
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-parchment">Jagex property</h2>
          <p>
            RuneScape, Old School RuneScape, RuneScape Classic, Jagex, Gielinor, skill icons, marks,
            partyhats, and in-game stills belong to Jagex Limited or its licensors. Shown here for
            identification under Jagex's Fan Content Policy.
          </p>
          <p className="mt-3">
            Created using intellectual property belonging to Jagex Limited under the terms of
            Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.
          </p>
          <p className="mt-3">
            That policy is permission, not a sale. If Jagex withdraws it or sends a clear take-down,
            the named file comes off. We do not print official marks on merch. We do not claim the
            Hiscores, the wiki, or a streamer's face.
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
          <h2 className="mb-2 font-semibold text-parchment">Your files</h2>
          <p>
            Desk JPEGs and clip WebMs stay on your device unless you upload them somewhere else. We
            do not want your Bank PIN, recovery, or other people's accounts. If you stamp a still
            you do not have a right to use, the export is still your file.
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
            Provided as-is. No promise of uptime, Hiscores accuracy, drop tables, or income. Use at
            your own risk. To the extent the law allows, the operator is not liable for lost bags,
            banned accounts, or a JPEG you posted.
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
            Honour a clear notice from Jagex, a rights holder, or the wiki projects. Say what file,
            what page, and why. Write to{" "}
            <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
              russell.christefer@gmail.com
            </a>
            . This origin is not a registered DMCA agent. A letter still gets read.
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
