import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { VisitPlaces } from "@/components/place-chip";
import { pageMeta } from "@/lib/page-title";
import { PVP_OSRS, PVP_RS3, PVP_SOURCES } from "@/lib/pvp-sheet";

export const Route = createFileRoute("/pvp")({
  head: () =>
    pageMeta(
      "PvP",
      "Two canons. Risk is the tax. Official rules win. Wilderness, PvP worlds, LMS, Bounty Hunter. Wiki keeps the skull rule.",
    ),
  component: PvpPage,
});

function PvpPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">PvP</h1>
        <p className="mt-1 text-center text-sm text-parchment">Two canons. Risk is the tax. Official rules win.</p>
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
        <div className="mt-3 flex justify-center">
          <VisitPlaces
            items={[
              { href: "/gods", label: "Gods" },
              { href: "/towns", label: "Towns" },
              { href: "/bosses", label: "Bosses" },
              { href: "/pvp", label: "PvP", current: true },
            ]}
          />
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <p className="text-sm text-muted">
          Fan sheet. Not a cheat page. The live wiki keeps the skull rule. Official news keeps the mode list. This desk
          does not invent ticks, GP, or a guaranteed loot pile.
        </p>

        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">Old School RuneScape</h2>
          <p className="mb-4 text-sm text-muted">
            You already know the ditch. The depth is the bracket. The skull is the invoice.
          </p>

          <Block title="Where it is legal">
            <Lines items={PVP_OSRS.legal} />
          </Block>
          <Block title="Skull / protect item / what you lose">
            <Lines items={PVP_OSRS.skull} />
          </Block>
          <Block title="Solo sheet">
            <Lines items={PVP_OSRS.solo} />
          </Block>
          <Block title="Multi / clan">
            <Lines items={PVP_OSRS.multi} />
          </Block>
          <Block title="Anti-PK">
            <Lines items={PVP_OSRS.anti} />
          </Block>

          <div className="grid gap-4 sm:grid-cols-2">
            <Box title="Last Man Standing">
              <Lines items={PVP_OSRS.lms} />
            </Box>
            <Box title="Bounty Hunter">
              <Lines items={PVP_OSRS.bh} />
            </Box>
          </div>

          <Block title="Risk tiers">
            <dl className="divide-y divide-line/40 rounded-md border border-line">
              {(
                [
                  ["Budget", PVP_OSRS.risk.budget],
                  ["Mid", PVP_OSRS.risk.mid],
                  ["Max", PVP_OSRS.risk.max],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-3 py-2 text-sm md:grid-cols-[7.5rem_1fr]">
                  <dt className="text-parchment">{k}</dt>
                  <dd className="text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[11px] text-faint">Risk, not a bank dump. Prices move. Wiki wins.</p>
          </Block>
        </section>

        <section>
          <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">RuneScape</h2>
          <p className="mb-4 text-sm text-muted">
            Sixth Age Wilderness is not the 2007 ditch. Vala is the door. Do not copy an Old School skull count onto this
            client.
          </p>
          <Block title="Where PvP actually exists">
            <Lines items={PVP_RS3.legal} />
          </Block>
          <Block title="Death cost vs OSRS skull">
            <Lines items={PVP_RS3.death} />
          </Block>
          <Block title="Camp vs switch">
            <Lines items={PVP_RS3.bar} />
          </Block>
          <Block title="Skip">
            <Lines items={PVP_RS3.skip} />
          </Block>
        </section>

        <p className="text-xs text-faint">
          Fan desk notes. Live skull and mode lists: the official wiki for that game, then official rules. Hundreds of
          blogs will not beat a live wiki on the current skull rule.
        </p>
      </main>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="mb-2 text-sm font-semibold text-parchment">{title}</h3>
      {children}
    </section>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-line bg-raised px-3 py-3">
      <h3 className="mb-2 text-sm font-semibold text-parchment">{title}</h3>
      {children}
    </section>
  );
}

function Lines({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
      {items.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
