import { UseOnBanner } from "@/desk/use-on-banner";
import { localFight, nearbyTowns, regionAnchor, sisterTown } from "@/lib/town-doors";
import type { Location } from "@/lib/locations";
import { PlaceChip, godPath, townPath } from "./place-chip";

export function TownVisit({ loc }: { loc: Location }) {
  const sister = sisterTown(loc);
  const nearby = nearbyTowns(loc);
  const fight = localFight(loc);
  const region = loc.region.replace(/\s·\sOSRS$/, "");
  const sisterLabel = loc.edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School";
  return (
    <nav aria-label="Places to visit" className="flex flex-wrap gap-2">
      <UseOnBanner src={loc.viewA} edition={loc.edition} placeId={loc.id} />
      {sister ? <PlaceChip href={townPath(sister.id)}>{sisterLabel}</PlaceChip> : null}
      <PlaceChip href={`/towns#${regionAnchor(loc.region)}`}>{region}</PlaceChip>
      {nearby.map((row) => (
        <PlaceChip key={row.id} href={townPath(row.id)}>
          {row.name}
        </PlaceChip>
      ))}
      <PlaceChip href={godPath(loc.god)}>
        {loc.god}
      </PlaceChip>
      {fight ? <PlaceChip href={fight.href}>{fight.label}</PlaceChip> : null}
    </nav>
  );
}
