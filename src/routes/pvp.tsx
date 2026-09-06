import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BackLink } from "@/components/back-link";
import { PlaceRail } from "@/components/place-rail";
import { eggToast } from "@/lib/eggs";
import { pageMeta } from "@/lib/page-title";
import {
  PVP_BH,
  PVP_LMS,
  PVP_METHODS,
  PVP_RISK,
  PVP_SOURCES,
  PVP_TREE,
  PVP_WILDY,
  PVP_WORLD,
  type ModeSheet,
} from "@/lib/pvp-sheet";

export const Route = createFileRoute("/pvp")({
  head: () =>
    pageMeta(
      "PvP",
      "Old School. What each method is. Freeze then spec. Eat the incoming. Risk first. Wiki keeps the skull rule.",
    ),
  component: PvpPage,
});

function PvpPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">PvP</h1>
        <p className="mt-1 text-center text-sm text-parchment">
          Old School. Risk is the tax. What each method is.
        </p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-[12px] text-muted">
          {PVP_SOURCES.map((src) => (
            <a
              key={src.href}
              href={src.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-parchment"
            >
              {src.rank}. {src.label}
            </a>
          ))}
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
        <div className="mt-3">
          <PlaceRail section="pvp" edition="OSRS" />
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-7 px-5 py-6 md:px-8">
        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">In the fight</h2>
          <ol className="space-y-3">
            {PVP_TREE.map((row, i) => (
              <li key={row.q} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="pt-0.5 text-sm text-parchment">{i + 1}.</span>
                <div>
                  <p className="text-sm text-fg">{row.q}</p>
                  <p className="mt-1 text-sm text-muted">{row.no}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-sm tracking-[0.16em] text-parchment">Methods</h2>
          <ul className="space-y-5">
            {PVP_METHODS.map((m) => (
              <li key={m.name}>
                <p className="text-sm text-fg">{m.name}</p>
                <p className="mt-1 text-sm text-muted">{m.what}</p>
                <p className="mt-1 text-[12px] text-faint">Wipe: {m.wipe}</p>
              </li>
            ))}
          </ul>
        </section>

        <ModeCard sheet={PVP_WILDY} />
        <ModeCard sheet={PVP_WORLD} />

        <div className="grid gap-4 sm:grid-cols-2">
          <ModeCard sheet={PVP_LMS} compact />
          <ModeCard sheet={PVP_BH} compact />
        </div>
        <p className="-mt-3 text-[11px] text-faint">LMS and BH are different bags. Do not gear them with the wildy grid.</p>

        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">Wildy risk</h2>
          <dl className="divide-y divide-line/40 rounded-md border border-line">
            {(
              [
                ["Budget", PVP_RISK.budget],
                ["Mid", PVP_RISK.mid],
                ["Max", PVP_RISK.max],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-3 py-2 text-sm">
                <dt className="text-parchment">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <ProtectItemBox />
      </main>
    </div>
  );
}

function ModeCard({ sheet, compact }: { sheet: ModeSheet; compact?: boolean }) {
  return (
    <section className={compact ? "rounded-md border border-line bg-raised px-3 py-3" : ""}>
      <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">{sheet.title}</h2>
      <dl className="space-y-2 text-sm">
        <Row k="Grid" v={sheet.grid} />
        <Row k="Opener" v={sheet.opener} />
        <Row k="Wipe" v={sheet.wipe} />
      </dl>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 md:grid-cols-[6.5rem_1fr]">
      <dt className="text-parchment">{k}</dt>
      <dd className="text-muted">{v}</dd>
    </div>
  );
}

function ProtectItemBox() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  if (!open) return null;
  return (
    <input
      value={value}
      maxLength={12}
      spellCheck={false}
      autoComplete="off"
      aria-label=" "
      className="mt-10 min-h-11 w-40 border border-transparent bg-transparent px-1 text-[11px] text-faint/30 outline-none focus:border-line/30"
      onChange={(event) => {
        const next = event.target.value.slice(0, 12);
        setValue(next);
        if (next.toLowerCase().replace(/\s+/g, " ") === "protect item") {
          eggToast("Good.");
          setOpen(false);
        }
      }}
    />
  );
}
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 md:grid-cols-[6.5rem_1fr]">
      <dt className="text-parchment">{k}</dt>
      <dd className="text-muted">{v}</dd>
    </div>
  );
}
