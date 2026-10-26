import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";

export function LegalPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
      </header>
      <main id="content" className="px-4 py-8 md:px-8">
        <article
          className="mx-auto max-w-[42rem] border border-[#c4a35a] bg-[#0b0b0b] px-5 py-8 text-sm leading-[1.55] text-[#e8d9a8] md:px-9"
          style={{ boxShadow: "inset 0 0 0 1px #0b0a08, 0 8px 24px rgba(0,0,0,.35)" }}
        >
          <h1 className="page-h1 m-0 text-left">Legal</h1>
          <p className="mt-2 text-xs tracking-[0.08em] text-[#c4a35a]">
            RuneScape Banner Studio · XDruid I [Alpha] · runescapebannerstudio.grok.me
          </p>
          <p className="mt-1 text-xs text-faint">Effective 26 October 2026</p>
          <p className="mt-4 text-sm text-muted">
            This page is a notice, not a contract for hire and not legal advice.
          </p>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-parchment">
            <a href="#operator">1. Operator</a>
            <a href="#nature">2. Nature</a>
            <a href="#xdruid">3. XDruid I</a>
            <a href="#jagex">4. Jagex</a>
            <a href="#marks">5. Marks</a>
            <a href="#data">6. Data</a>
            <a href="#warranty">7. Warranty</a>
            <a href="#liability">8. Liability</a>
            <a href="#takedown">9. Takedown</a>
          </nav>

          <Clause id="operator" n="1" title="Operator">
            <p>
              The <Term>Operator</Term> of the <Term>Studio</Term> is Christefer Lee Russell-Barnett.
              The Studio operates RuneScape Banner Studio and develops XDruid I [Alpha] (also known as Assay Homestead / Druidi).
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <Fact label="Mail (takedown)">
                <a className="font-semibold text-parchment" href="mailto:russell.christefer@gmail.com">
                  russell.christefer@gmail.com
                </a>
              </Fact>
              <Fact label="Origin">
                <a
                  className="text-parchment"
                  href="https://runescapebannerstudio.grok.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://runescapebannerstudio.grok.me/
                </a>
              </Fact>
              <Fact label="XDruid I">
                <a
                  className="text-parchment"
                  href="https://xdruidi.grok.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://xdruidi.grok.me/
                </a>
              </Fact>
              <Fact label="Tips">
                <a
                  className="text-parchment"
                  href="https://cash.app/$takemymoneypleaseok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cash.app/$takemymoneypleaseok
                </a>
                <span className="mt-1 block text-xs text-faint">Optional. Not a sale of any third-party property.</span>
              </Fact>
            </dl>
            <p className="mt-4">
              Takedown and operator correspondence is to be sent to{" "}
              <strong className="font-semibold text-fg">russell.christefer@gmail.com</strong> only.
            </p>
            <p className="mt-3 text-xs text-faint">
              Original work, assets, and code of XDruid I [Alpha] and the Studio tools are © 2026 Christefer Lee Russell-Barnett / RuneScape Banner Studio. All rights reserved where applicable.
            </p>
          </Clause>

          <Clause id="nature" n="2" title="Nature of the service">
            <p>
              RuneScape Banner Studio is a free identification <Term>Desk</Term> and a local <Term>Clip bench</Term>.
              It is not a game, not a game client, not Jagex Support, not a bank, not a marketplace,
              and not a live studio.
            </p>
            <p className="mt-3">
              The Studio does not log into RuneScape, sell gold, or print official Jagex logos.
              Guides are notes drawn from public pages. Clips remain on the user’s device. Export
              only material the user has a right to use.
            </p>
          </Clause>

          <Clause id="xdruid" n="3" title="XDruid I [Alpha]">
            <p>
              XDruid I [Alpha] (Assay Homestead / Druidi) is an independent original game developed by the Studio.
              It is a SNES-style homestead / farming life sim played in a desktop browser. It is not affiliated with,
              endorsed by, or connected to Jagex or RuneScape.
            </p>
            <p className="mt-3">
              The game is an alpha / work in progress. The yard, gates, spells, days, and systems can change between builds.
              There is no warranty and no promise of save compatibility across versions. Saves are stored locally in the browser
              on the user’s device. No account is required for ordinary play. Do not store passwords or private information in the game.
            </p>
            <p className="mt-3">
              Original game art, code, and design belong to the Operator / Studio. Third-party pixel art (such as certain fish and rod icons)
              is used only within the game and is not offered for separate reuse or redistribution. Do not extract or redistribute third-party assets.
            </p>
            <p className="mt-3 text-xs text-faint">
              Live at https://xdruidi.grok.me/ · GitHub: russellchristefer-droid/XDruidI--ALPHA-PUBLIC
            </p>
          </Clause>

          <Clause id="jagex" n="4" title="Jagex intellectual property">
            <p>
              RuneScape®, Old School RuneScape®, RuneScape Classic, RuneScape: Dragonwilds™, Jagex®,
              Gielinor, skill icons, marks, partyhats, and in-game stills belong to Jagex Limited or
              its licensors. Shown on the Banner Studio desk for identification only.
            </p>
            <p className="mt-3">
              Banner Studio content is created using intellectual property belonging to Jagex Limited under the terms of
              Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.
              Identification only. If Jagex or a rights holder asks for a file to come down, it comes
              down.
            </p>
            <p className="mt-3">
              <a
                href="https://legal.jagex.com/docs/policies/fan-content-policy"
                className="text-parchment"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jagex Fan Content Policy
              </a>
            </p>
          </Clause>

          <Clause id="marks" n="5" title="Other marks">
            <p>
              RuneLite (BSD-2-Clause) and Alt1 Toolkit are third-party tools. The Studio does not
              ship them. GitHub sidecars are fan add-ons: they do not click, they are not on Plugin
              Hub, and they are not official Jagex®, RuneLite, or Alt1 products. Twitch®, YouTube®, X,
              and Discord® remain with their owners. Halls are directories. This origin does not host
              Discord or take a login.
            </p>
          </Clause>

          <Clause id="data" n="6" title="Data and exports">
            <p>
              No account is required for the Banner Studio desk. Desk JPEGs and clip MP4s stay on the user’s device unless the
              user uploads them elsewhere. Do not export a Bank PIN.
            </p>
            <p className="mt-3">
              Hiscores are public Jagex boards and fail-soft. Live badges appear only if a key is
              configured. A missing key is not a Live badge. Name and stamps may sit in this browser.
              Wiki links go to the wiki projects. History rooms (Myths, Legends, Wizards) are public
              work only, not a paid endorsement. Alt1 and RuneLite sidecars on GitHub are the same
              two jobs (still compositor, clip bench); they are not this origin and they are not
              Plugin Hub.
            </p>
          </Clause>

          <Clause id="warranty" n="7" title="Warranty">
            <p>
              THE STUDIO AND XDRUID I [ALPHA] ARE PROVIDED “AS IS”. The Operator makes no warranty of uptime, accuracy,
              fitness for a particular purpose, save compatibility, or income.
            </p>
          </Clause>

          <Clause id="liability" n="8" title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, the Operator is not liable for indirect or
              consequential loss arising from use of the free fan desk or the alpha game.
            </p>
          </Clause>

          <Clause id="takedown" n="9" title="Takedown">
            <p>
              Write{" "}
              <a className="font-semibold text-parchment" href="mailto:russell.christefer@gmail.com">
                russell.christefer@gmail.com
              </a>
              . A clear notice from Jagex, a rights holder, or the wiki projects is honoured.
            </p>
          </Clause>

          <p className="mt-8 text-parchment">
            <Link to="/">Desk</Link>
            {" · "}
            <a href="https://xdruidi.grok.me/" target="_blank" rel="noopener noreferrer">XDruid I</a>
            {" · "}
            <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
          </p>
        </article>
      </main>
    </div>
  );
}

function Term({ children }: { children: ReactNode }) {
  return <span className="font-medium text-fg">{children}</span>;
}

function Clause({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-8 border-t border-[#c4a35a]/25 pt-6">
      <h2 className="mb-3 font-serif text-lg tracking-wide text-fg">
        <span className="mr-2 font-serif text-sm text-[#c4a35a]">{n}.</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.14em] text-faint uppercase">{label}</dt>
      <dd className="mt-1 break-all text-sm">{children}</dd>
    </div>
  );
}
