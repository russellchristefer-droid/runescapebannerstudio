import { useHourClock } from "@/hooks/use-hour-clock";
import { bossWiki, combatStamp } from "@/lib/combat-meta";
import type { BossNote } from "@/lib/boss-notes";

export function CombatMeta({ note }: { note: BossNote }) {
  const { hour } = useHourClock();
  const links = bossWiki(note);
  return (
    <section className="text-sm">
      <h2 className="mb-1 text-sm font-semibold text-parchment">
        Live meta
      </h2>
      <p className="mb-2 text-[10px] text-faint">{combatStamp()}</p>
      <p className="text-xs text-muted">
        Desk notes below are the usual high-level order. Gear and ticks move.
        The wiki page is the sheet for this hour ({hour}).
      </p>
      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        <a href={links.page} target="_blank" rel="noreferrer" className="text-parchment">
          Official wiki
        </a>
        <a
          href={links.strategies}
          target="_blank"
          rel="noreferrer"
          className="text-parchment"
        >
          Strategies
        </a>
        {note.edition === "RS3" ? (
          <a href={links.pvme} target="_blank" rel="noreferrer" className="text-parchment">
            Community PvM Encyclopedia — not Jagex
          </a>
        ) : null}
      </p>
    </section>
  );
}
