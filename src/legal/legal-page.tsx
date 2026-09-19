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
        <h1 className="page-h1 mt-1">Legal</h1>
        <p className="mt-2 text-center text-sm text-muted">
          Independent fan studio. Not a Jagex product.
        </p>
        <p className="mt-1 text-center text-[11px] text-faint">
          Notice · 14 September 2026 · Not legal advice
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-6 text-sm leading-relaxed text-muted md:px-8">
        <nav aria-label="On this page" className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-parchment">
          <a href="#operator">Operator</a>
          <a href="#studio">Studio</a>
          <a href="#jagex">Jagex</a>
          <a href="#marks">Marks</a>
          <a href="#origin">Origin</a>
          <a href="#warranty">Warranty</a>
          <a href="#record">Public record</a>
        </nav>

        <Notice id="operator" title="Operator">
          <p className="text-base text-fg">Christefer Lee Russell-Barnett</p>
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            <Fact label="Mail">
              <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
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
                runescapebannerstudio.grok.me
              </a>
            </Fact>
            <Fact label="Tip">
              <a
                className="text-parchment"
                href="https://cash.app/$takemymoneypleaseok"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cash App
              </a>
            </Fact>
          </dl>
          <p className="mt-3 text-xs text-faint">
            Who runs the desk. Tips are optional and not a purchase of Jagex property.
          </p>
        </Notice>

        <Notice id="studio" title="What this is">
          <p>
            A free identification desk: stills, banners, halls, skill and fight notes, and a local
            clip bench. It is not a game, not a client, not Support, not a bank, and not a store. It
            does not log into the game, sell gold, or print official Jagex logos. Guides are notes
            from public pages. Clips stay on your machine. Export only what you have a right to use.
          </p>
        </Notice>

        <Notice id="jagex" title="Jagex property">
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
            . Official news and the wiki win on numbers.
          </p>
        </Notice>

        <Notice id="marks" title="Other marks">
          <p>
            RuneLite (BSD-2-Clause) and Alt1 Toolkit are third-party tools. This studio does not
            ship them. GitHub sidecars are fan add-ons: they do not click, they are not on Plugin
            Hub, and they are not official Jagex®, RuneLite, or Alt1 products. Twitch®, YouTube®, X,
            and Discord® stay with their owners. Halls are directories. This origin does not host
            Discord or take a login.
          </p>
        </Notice>

        <Notice id="origin" title="On this origin">
          <p>
            No account is required for a JPEG. Name and stamps may sit in this browser. Desk JPEGs
            and clip MP4s stay on your device unless you upload them. Do not export a Bank PIN.
            Hiscores are public Jagex boards, fail-soft. Wiki links go to the wiki projects. Live
            badges only if a key is configured — a missing key is not a fake Live. History rooms
            (Myths, Legends, Wizards) are public work only, not a paid endorsement.
          </p>
        </Notice>

        <Notice id="warranty" title="Warranty and takedown">
          <p>
            Provided as-is. No promise of uptime, Hiscores accuracy, or income. Honour a clear
            notice from Jagex, a rights holder, or the wiki projects. Write to{" "}
            <a className="text-parchment" href="mailto:russell.christefer@gmail.com">
              russell.christefer@gmail.com
            </a>
            . A letter still gets read.
          </p>
        </Notice>

        <section id="record" className="rounded-md border border-line bg-raised px-4 py-4">
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">PUBLIC RECORD</h2>
          <p className="mb-4">
            Third-party pages and operator exhibits. Not Jagex. Not this desk. Open a row or an
            exhibit.
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

        <p className="text-[11px] text-faint">
          <a
            href="https://www.subgenius.com/"
            className="text-faint"
            target="_blank"
            rel="noopener noreferrer"
          >
            Church of the SubGenius
          </a>
        </p>
        <p className="text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/brief">Brief</Link>
          {" · "}
          <Link to="/donate">Donate</Link>
          {" · "}
          <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
        </p>
      </main>
    </div>
  );
}

function Notice({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="rounded-md border border-line bg-raised px-4 py-4">
      <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">{title.toUpperCase()}</h2>
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
