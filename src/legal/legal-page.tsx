import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";

/** Bump when a Public record still is replaced so phones drop the old file. */
const RECORD = "20260914d";

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
            RuneScape Banner Studio · runescapebannerstudio.grok.me
          </p>
          <p className="mt-1 text-xs text-faint">Effective 22 September 2026</p>
          <p className="mt-4 text-sm text-muted">
            This page is a notice, not a contract for hire and not legal advice.
          </p>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-xs text-parchment">
            <a href="#operator">1. Operator</a>
            <a href="#nature">2. Nature</a>
            <a href="#jagex">3. Jagex</a>
            <a href="#marks">4. Marks</a>
            <a href="#data">5. Data</a>
            <a href="#warranty">6. Warranty</a>
            <a href="#liability">7. Liability</a>
            <a href="#takedown">8. Takedown</a>
            <a href="#record">9. Exhibits</a>
          </nav>

          <Clause id="operator" n="1" title="Operator">
            <p>
              The <Term>Operator</Term> of the <Term>Studio</Term> is Christefer Lee Russell-Barnett.
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
              <Fact label="Tips">
                <a
                  className="text-parchment"
                  href="https://cash.app/$takemymoneypleaseok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cash.app/$takemymoneypleaseok
                </a>
                <span className="mt-1 block text-xs text-faint">Optional. Not a sale of Jagex property.</span>
              </Fact>
            </dl>
            <p className="mt-4">
              Takedown and operator correspondence is to be sent to{" "}
              <strong className="font-semibold text-fg">russell.christefer@gmail.com</strong> only.
            </p>
          </Clause>

          <Clause id="nature" n="2" title="Nature of the service">
            <p>
              The Studio is a free identification <Term>Desk</Term> and a local <Term>Clip bench</Term>.
              It is not a game, not a game client, not Jagex Support, not a bank, not a marketplace,
              and not a live studio.
            </p>
            <p className="mt-3">
              The Studio does not log into RuneScape, sell gold, or print official Jagex logos.
              Guides are notes drawn from public pages. Clips remain on the user’s device. Export
              only material the user has a right to use.
            </p>
          </Clause>

          <Clause id="jagex" n="3" title="Jagex intellectual property">
            <p>
              RuneScape®, Old School RuneScape®, RuneScape Classic, RuneScape: Dragonwilds™, Jagex®,
              Gielinor, skill icons, marks, partyhats, and in-game stills belong to Jagex Limited or
              its licensors. Shown here for identification.
            </p>
            <p className="mt-3">
              Created using intellectual property belonging to Jagex Limited under the terms of
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

          <Clause id="marks" n="4" title="Other marks">
            <p>
              RuneLite (BSD-2-Clause) and Alt1 Toolkit are third-party tools. The Studio does not
              ship them. GitHub sidecars are fan add-ons: they do not click, they are not on Plugin
              Hub, and they are not official Jagex®, RuneLite, or Alt1 products. Twitch®, YouTube®, X,
              and Discord® remain with their owners. Halls are directories. This origin does not host
              Discord or take a login.
            </p>
          </Clause>

          <Clause id="data" n="5" title="Data and exports">
            <p>
              No account is required. Desk JPEGs and clip MP4s stay on the user’s device unless the
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

          <Clause id="warranty" n="6" title="Warranty">
            <p>
              THE STUDIO IS PROVIDED “AS IS”. The Operator makes no warranty of uptime, accuracy,
              fitness for a particular purpose, or income.
            </p>
          </Clause>

          <Clause id="liability" n="7" title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, the Operator is not liable for indirect or
              consequential loss arising from use of a free fan desk.
            </p>
          </Clause>

          <Clause id="takedown" n="8" title="Takedown">
            <p>
              Write{" "}
              <a className="font-semibold text-parchment" href="mailto:russell.christefer@gmail.com">
                russell.christefer@gmail.com
              </a>
              . A clear notice from Jagex, a rights holder, or the wiki projects is honoured.
            </p>
          </Clause>

          <section id="record" className="mt-8 border-t border-[#c4a35a]/40 pt-6">
            <h2 className="mb-1 font-serif text-lg tracking-wide text-fg">
              <span className="mr-2 font-serif text-sm text-[#c4a35a]">9.</span>
              Operator exhibits
            </h2>
            <p className="mb-4 text-xs uppercase tracking-[0.14em] text-faint">
              Operator personal record. Not Jagex. Not part of the desk product. Not an endorsement.
            </p>
            <ul className="flex flex-col divide-y divide-line/40 overflow-hidden rounded-md border border-line">
              <RecordLink
                href="https://jmail.world"
                name="Jmail"
                note="Public Epstein-file archive. Official site."
                label="jmail.world"
              />
              <RecordLink
                href="https://trumpepsteinreadingroom.com"
                name="Trump & Epstein Memorial Reading Room"
                note="Institute for Primary Facts. Official site."
                label="trumpepsteinreadingroom.com"
              />
              <RecordLink
                href="https://worldcrimesyndicate.blogspot.com/2020/03/drumpf.html"
                name="World Crime Syndicate"
                note="Third-party essay, March 2020."
                label="blogspot"
              />
              <RecordLink
                href="https://commons.wikimedia.org/wiki/File:Elon_Musk_claims_Donald_Trump_is_in_the_Epstein_Files.png"
                name="Wikimedia Commons"
                note="Public-domain still of an X post, 5 June 2025."
                label="commons"
              />
            </ul>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Exhibit
                mark="A"
                caption={
                  <>
                    Commons still. Source:{" "}
                    <a
                      className="text-parchment"
                      href="https://x.com/elonmusk/status/1930703865801810022"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @elonmusk
                    </a>
                    , 5 June 2025.
                  </>
                }
              >
                <a
                  href={`/legal/elon-musk-x-2025-06-05.png?v=${RECORD}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`/legal/elon-musk-x-2025-06-05.png?v=${RECORD}`}
                    alt="Wikimedia Commons still of an X post by Elon Musk dated 5 June 2025."
                    width={1492}
                    height={802}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full max-w-full"
                  />
                </a>
              </Exhibit>
              <Exhibit mark="B" caption="Operator stamp, 5 June 2025. Screenshot_20250605_174900_Truth Social.png.">
                <a
                  href={`/legal/truth-social-2025-06-05.png?v=${RECORD}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`/legal/truth-social-2025-06-05.png?v=${RECORD}`}
                    alt="Device stamp: 5 June 2025, 5:49 PM, Screenshot_20250605_174900_Truth Social.png."
                    width={640}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full max-w-full"
                  />
                </a>
              </Exhibit>
            </div>

            <Exhibit
              className="mt-4"
              mark="C"
              caption="Third-party chart of Jeffrey Epstein's network. Click for the full still."
            >
              <a
                href={`/legal/epstein-network-map.jpg?v=${RECORD}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-x-auto"
              >
                <img
                  src={`/legal/epstein-network-map.jpg?v=${RECORD}`}
                  alt="Third-party investigative chart of Jeffrey Epstein's network."
                  width={1600}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full max-w-full"
                />
              </a>
            </Exhibit>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Exhibit mark="D" caption="CIA threats. Operator still of an email, 14 September 2026.">
                <a
                  href={`/legal/cia-threats-2026-09-14.png?v=${RECORD}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`/legal/cia-threats-2026-09-14.png?v=${RECORD}`}
                    alt="Operator still of an email dated 14 September 2026, labelled CIA threats."
                    width={720}
                    height={1280}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full max-w-full"
                  />
                </a>
              </Exhibit>
              <Exhibit mark="E" caption="Epstein Island. Operator clip from the water. Controls only — no autoplay.">
                <video
                  className="aspect-video w-full bg-black"
                  controls
                  playsInline
                  preload="metadata"
                  poster={`/legal/epstein-island.jpg?v=${RECORD}`}
                  src={`/legal/epstein-island.mp4?v=${RECORD}`}
                >
                  Your browser cannot play this clip.{" "}
                  <a className="text-parchment" href={`/legal/epstein-island.mp4?v=${RECORD}`}>
                    Download the file
                  </a>
                  .
                </video>
              </Exhibit>
            </div>
          </section>

          <p className="mt-8 text-[11px] text-faint">
            <a
              href="https://www.subgenius.com/"
              className="text-faint"
              target="_blank"
              rel="noopener noreferrer"
            >
              Church of the SubGenius
            </a>
          </p>
          <p className="mt-3 text-parchment">
            <Link to="/">Desk</Link>
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

function RecordLink({
  href,
  name,
  note,
  label,
}: {
  href: string;
  name: string;
  note: string;
  label: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-between gap-3 bg-bg/40 px-3 py-3"
      >
        <span>
          <span className="block text-sm font-medium text-fg">{name}</span>
          <span className="text-xs text-muted">{note}</span>
        </span>
        <span className="shrink-0 text-xs tracking-[0.08em] text-parchment uppercase">{label}</span>
      </a>
    </li>
  );
}

function Exhibit({
  mark,
  caption,
  children,
  className = "",
}: {
  mark: string;
  caption: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-md border border-line bg-bg ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="text-[10px] tracking-[0.16em] text-parchment uppercase">Exhibit {mark}</span>
      </div>
      {children}
      <figcaption className="border-t border-line px-3 py-2 text-xs text-faint">{caption}</figcaption>
    </figure>
  );
}
