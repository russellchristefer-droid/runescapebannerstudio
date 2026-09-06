import type { ReactNode } from "react";
import type { FightSheet, PrayerPhase } from "@/lib/boss-sheets";

function InventoryGrid({ items, note }: { items: string[]; note: string }) {
  const cells = items.slice(0, 28);
  while (cells.length < 28) cells.push("");
  return (
    <div>
      <p className="mb-2 text-[11px] text-faint">{note}</p>
      <div
        className="mx-auto grid w-full max-w-[22rem] grid-cols-4 gap-1 rounded-md border border-line bg-[#1c1410] p-1.5"
        role="list"
        aria-label="Old School inventory, four by seven"
      >
        {cells.map((item, i) => (
          <div
            key={`${item}-${i}`}
            role="listitem"
            title={item || "Empty"}
            className="flex min-h-[3.15rem] items-center justify-center rounded-[3px] border border-[#3a2a18] bg-[#2a2016] px-1 py-1 text-center text-[10px] leading-tight text-fg"
          >
            {item || <span className="text-faint">·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PrayerRow({ prayers }: { prayers: PrayerPhase[] }) {
  return (
    <ul className="divide-y divide-line/40 rounded-md border border-line">
      {prayers.map((row) => (
        <li key={row.phase} className="grid grid-cols-[7.5rem_1fr] gap-3 px-3 py-2 text-sm md:grid-cols-[9rem_1fr]">
          <span className="text-parchment">{row.phase}</span>
          <span className="text-muted">{row.pray}</span>
        </li>
      ))}
    </ul>
  );
}

function AbilityBar({ bar, revolution }: { bar: string[]; revolution: string }) {
  return (
    <div>
      <ol className="flex flex-wrap gap-1">
        {bar.map((name, i) => (
          <li
            key={name + i}
            className="min-w-[4.5rem] flex-1 rounded-sm border border-line bg-raised px-2 py-2 text-center text-[11px] text-fg"
          >
            <span className="block text-[9px] text-faint">{i + 1}</span>
            {name}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11px] text-faint">{revolution}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-sm tracking-[0.16em] text-parchment">{title}</h2>
      {children}
    </section>
  );
}

export function BossSheet({ sheet }: { sheet: FightSheet }) {
  return (
    <div className="flex flex-col gap-6">
      <Block title="Role">
        <p className="text-sm text-fg">{sheet.role}</p>
        <p className="mt-2 text-sm text-muted">{sheet.style}</p>
      </Block>

      <Block title="Opener">
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
          {sheet.opener.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Block>

      {sheet.osrs ? (
        <>
          <Block title="Inventory">
            <InventoryGrid items={sheet.osrs.inventory} note={sheet.osrs.inventoryNote} />
          </Block>
          <Block title="Prayer">
            <PrayerRow prayers={sheet.osrs.prayers} />
          </Block>
          <Block title="Tiles">
            <p className="text-sm text-muted">{sheet.osrs.tiles}</p>
            {sheet.osrs.stand?.length ? (
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                {sheet.osrs.stand.map((line) => (
                  <li key={line}>{line.replace(/^\d+\s/, "")}</li>
                ))}
              </ol>
            ) : null}
          </Block>
          <Block title="Spec / thrall / death charge">
            <p className="text-sm text-muted">{sheet.osrs.spec}</p>
          </Block>
        </>
      ) : null}

      {sheet.rs3 ? (
        <>
          <Block title="Ability bar">
            <AbilityBar bar={sheet.rs3.bar} revolution={sheet.rs3.revolution} />
          </Block>
          <Block title="Familiar / pocket / relic">
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Familiar — {sheet.rs3.familiar}</li>
              <li>Pocket — {sheet.rs3.pocket}</li>
              <li>Relic — {sheet.rs3.relic}</li>
            </ul>
          </Block>
          {sheet.rs3.enrage ? (
            <Block title="Enrage / streak">
              <p className="text-sm text-muted">{sheet.rs3.enrage}</p>
            </Block>
          ) : null}
        </>
      ) : null}

      <Block title="Wipe">
        <p className="text-sm text-muted">{sheet.wipe}</p>
      </Block>
    </div>
  );
}
