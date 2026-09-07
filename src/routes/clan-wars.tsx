import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/clan-wars")({
  head: () =>
    pageMeta(
      "Clan Wars",
      "The minigame. Two canons. The ditch came first. Wiki keeps the portals.",
    ),
  component: ClanWarsPage,
});

const STRIP_WHAT = [
  { src: "/clan-wars/osrs-ferox.png", name: "Ferox" },
  { src: "/clan-wars/rs3-grotto.png", name: "Grotto" },
  { src: "/stills/rsc/rsc-ranging.jpg", name: "Classic fight" },
] as const;

const STRIP_OSRS = [
  { src: "/clan-wars/osrs-edgeville-shot.png", name: "Edgeville" },
  { src: "/locations/yanille.jpg", name: "Yanille" },
  { src: "/locations/ardougne.jpg", name: "Ardougne" },
] as const;

const STRIP_RS3 = [
  { src: "/clan-wars/more/rs3-arena.png", name: "The field" },
  { src: "/locations/falador.jpg", name: "Falador gate" },
  { src: "/locations/burthorpe.jpg", name: "Burthorpe" },
] as const;

const STRIP_HISTORY = [
  { src: "/stills/rsc/rsc-lumbridge.jpg", name: "The walk" },
  { src: "/clan-wars/rsc-edge-store.png", name: "Edgeville store" },
  { src: "/clan-wars/classic-wild1.jpg", name: "2001 wild" },
] as const;

const STRIP_WIN = [
  { src: "/locations/varrock.jpg", name: "Varrock" },
  { src: "/locations/osrsfalador.jpg", name: "Falador east bank" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville road" },
] as const;

const ROOMS = [
  {
    place: "Wilderness",
    era: "RuneScape Classic",
    note: "People on the grass. Before the portals.",
    srcs: [
      "/clan-wars/fresh/rsc-combat.gif",
      "/stills/rsc/rsc-woodcutting.jpg",
      "/clan-wars/classic-wild2.jpg",
    ],
  },
  {
    place: "Edgeville",
    era: "Old School",
    note: "The last town before you mean it.",
    srcs: ["/locations/edgeville.jpg"],
  },
] as const;

function ShotStrip({ items }: { items: readonly { src: string; name: string }[] }) {
  return (
    <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
      {items.map((item) => (
        <figure
          key={item.src}
          className="w-[220px] shrink-0 snap-start overflow-hidden rounded-md border border-[#c6a45a]/35 bg-[#120e0a]"
        >
          <div className="flex h-40 items-center justify-center bg-[#0c0a08] px-2">
            <img
              src={item.src}
              alt={item.name}
              loading="lazy"
              decoding="async"
              className="max-h-36 w-full object-contain"
            />
          </div>
          <figcaption className="px-2 py-1 text-[11px] text-[#c6a45a]">{item.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function RoomDeck({
  place,
  era,
  note,
  srcs,
}: (typeof ROOMS)[number]) {
  const [i, setI] = useState(0);
  const src = srcs[i] ?? srcs[0];
  const n = srcs.length;
  return (
    <figure className="overflow-hidden rounded-md border border-[#c6a45a]/40 bg-[#120e0a]">
      <div className="relative flex min-h-[260px] items-center justify-center bg-[#0c0a08] md:min-h-[320px]">
        <img src={src} alt={`${place}, ${era}`} className="max-h-[340px] w-full object-contain md:max-h-[400px]" />
        {n > 1 ? (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-md border border-[#c6a45a]/60 bg-[#120e0a]/80 text-[#efe4c8]"
              aria-label={`Previous still, ${place}`}
              onClick={() => setI((n + i - 1) % n)}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 min-h-11 min-w-11 -translate-y-1/2 rounded-md border border-[#c6a45a]/60 bg-[#120e0a]/80 text-[#efe4c8]"
              aria-label={`Next still, ${place}`}
              onClick={() => setI((i + 1) % n)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      <figcaption className="border-t border-[#c6a45a]/25 px-3 py-2">
        <p className="text-sm text-[#efe4c8]">{place}</p>
        <p className="text-[11px] tracking-[0.12em] text-[#c6a45a] uppercase">{era}</p>
        <p className="mt-1 text-[12px] text-[#b7a989]">{note}</p>
        {n > 1 ? (
          <p className="mt-1 text-[11px] text-[#8a7a5a]">
            {i + 1} / {n}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function ClanWarsPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Clan Wars</h1>
        <p className="mt-2 mx-auto max-w-2xl text-center text-sm text-muted">
          The minigame. Not a login. Two chats walk through a purple portal and agree the
          terms. The ditch came first. The flag game is a different map.
        </p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-sm">
          <a className="text-parchment" href="https://oldschool.runescape.wiki/w/Clan_Wars" target="_blank" rel="noopener noreferrer">
            Old School wiki
          </a>
          <a className="text-parchment" href="https://runescape.wiki/w/Clan_Wars" target="_blank" rel="noopener noreferrer">
            RuneScape wiki
          </a>
          <a className="text-parchment" href="https://oldschool.runescape.wiki/w/Castle_Wars" target="_blank" rel="noopener noreferrer">
            Castle Wars
          </a>
          <Link to="/pvp" className="text-parchment">
            PvP
          </Link>
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="clan-wars" />
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8">
        <section>
          <h2 className="section-h2">What it is</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Two Friends Chat / chat-channel sides fight under rules the captains picked.
            It is PvP with a ceiling. Most wars are safe: you keep the bag. That is why
            clans practice here and why F2P masses still fill a world. The Wilderness is
            a different tax. Do not mix the two sheets.
          </p>
          <ShotStrip items={STRIP_WHAT} />
        </section>

        <section>
          <h2 className="section-h2">History</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Three rooms used the same words. Veterans keep them unmingled. Dates are from
            the live wikis.
          </p>
          <h3 className="mt-5 mb-1 text-fg">Before the name</h3>
          <p className="text-sm leading-relaxed text-muted">
            Classic and early RS2 clans walked north of Edgeville and fought in multi.
            That was a clan war because two chats agreed to stand on the same ditch.
            The bag was live. The skull was live. Worlds are closed on Classic.
          </p>
          <h3 className="mt-5 mb-1 text-fg">13 December 2004 — the flag</h3>
          <p className="text-sm leading-relaxed text-muted">
            Castle Wars is capture the flag. Saradomin and Zamorak west of Yanille.
            Twenty minutes. Bandages, not food. Clan Wars never asked for a flag.
          </p>
          <h3 className="mt-5 mb-1 text-fg">10 December 2007 — the minigame</h3>
          <p className="text-sm leading-relaxed text-muted">
            Jagex named Clan Wars the day it pulled free PvP out of the main-client
            Wilderness. First house sat in the wild. Captains picked terms. Purple
            portal. Two-minute wall.
          </p>
          <h3 className="mt-5 mb-1 text-fg">1 February 2011 — the Grotto</h3>
          <p className="text-sm leading-relaxed text-muted">
            Free trade and the old Wilderness came back. Clan Wars moved into Gamers’
            Grotto, north of Falador. The old house became the Bone Yard.
          </p>
          <h3 className="mt-5 mb-1 text-fg">19 June 2014 — Old School</h3>
          <p className="text-sm leading-relaxed text-muted">
            A priority poll put the minigame on the 2007-era client. First house:
            Giants’ Plateau. Oddskull arrived 16 April 2015.
          </p>
          <h3 className="mt-5 mb-1 text-fg">16 July 2020 — Ferox</h3>
          <p className="text-sm leading-relaxed text-muted">
            The Old School room moved into Ferox Enclave. Still Wilderness level.
            Still a safe pocket. White portal to practice. Purple for the war.
          </p>
          <ShotStrip items={STRIP_HISTORY} />
        </section>

        <section>
          <h2 className="section-h2">Old School</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Ferox Enclave. A captain challenges a captain. Two-minute wall.
            One hundred a side. Twelve maps. Death is the jail. The bag stays.
          </p>
          <ShotStrip items={STRIP_OSRS} />
        </section>

        <section>
          <h2 className="section-h2">RuneScape</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lives in Gamers’ Grotto. Safe unless the terms tick unsafe. White portal
            is practice. Red portal is the tax. Rated Clan Wars is a different lobby.
          </p>
          <ShotStrip items={STRIP_RS3} />
        </section>

        <section>
          <h2 className="section-h2">How to not donate the hour</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            <li>1. Read the terms. Food off is a different fight than food on.</li>
            <li>2. Enter before the wall drops. Late is a spectator.</li>
            <li>3. One target. Solo in a pile is the loot even when the bag is safe.</li>
            <li>4. Do not chase through a rule you disabled.</li>
            <li>5. White is practice. Purple is the match. Red on RuneScape is the tax.</li>
          </ol>
          <ShotStrip items={STRIP_WIN} />
        </section>

        <section>
          <h2 className="section-h2 mb-3 text-center">The rooms</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ROOMS.map((room) => (
              <RoomDeck key={`${room.place}-${room.era}`} {...room} />
            ))}
          </div>
        </section>

        <p className="text-sm text-parchment">
          <Link to="/pvp">PvP</Link>
          {" · "}
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/history">History</Link>
        </p>
      </main>
    </div>
  );
}
