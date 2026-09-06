import { useState } from "react";
import { PlaceChip, AppLink, godPath } from "./place-chip";
import { GODS, type Edition, type God } from "@/lib/locations";
import { godInk } from "@/lib/gods";

export type PlaceSection = "towns" | "gods" | "bosses" | "pvp";

const SECTIONS: { id: PlaceSection; href: string; label: string }[] = [
  { id: "towns", href: "/towns", label: "Towns" },
  { id: "gods", href: "/gods", label: "Gods" },
  { id: "bosses", href: "/bosses", label: "Bosses" },
  { id: "pvp", href: "/pvp", label: "PvP" },
];

export function PlaceRail({
  section,
  edition,
  god,
  onEdition,
  onGod,
  onSection,
}: {
  section: PlaceSection;
  edition?: Edition;
  god?: God | null;
  onEdition?: (next: Edition) => void;
  onGod?: (next: God | null) => void;
  onSection?: (next: PlaceSection) => void;
}) {
  return (
    <nav aria-label="Places" className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-2">
        {SECTIONS.map((row) => (
          <PlaceChip key={row.id} href={row.href} current={section === row.id}>
            {row.label}
          </PlaceChip>
        ))}
      </div>
      {onEdition ? (
        <div className="flex flex-wrap justify-center gap-2">
          {([
            ["OSRS", "OSRS"],
            ["RS3", "RS3"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={edition === id}
              onClick={() => onEdition(id)}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 text-xs [touch-action:manipulation] ${
                edition === id ? "border-parchment bg-raised text-parchment" : "border-line text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap justify-center gap-1">
        {GODS.map((name) => {
          const on = god === name;
          return (
            <PlaceChip key={name} href={godPath(name)} current={on} style={{ color: godInk(name) }}>
              {name}
            </PlaceChip>
          );
        })}
      </div>
    </nav>
  );
}

export function usePlaceFilter(start: Edition = "OSRS") {
  const [edition, setEdition] = useState<Edition>(start);
  const [god, setGod] = useState<God | null>(null);
  return { edition, setEdition, god, setGod };
}

export function PlaceTitle({ href, children }: { href: string; children: string }) {
  return (
    <AppLink href={href} className="site-title block truncate px-2 pt-1.5 text-center text-sm no-underline">
      {children}
    </AppLink>
  );
}
