import { useStill } from "@/hooks/use-still";
import type { Edition } from "@/lib/locations";

export function UseOnBanner({
  src,
  edition,
  placeId,
  label = "Use on banner",
}: {
  src?: string;
  edition: Edition;
  placeId: string;
  label?: string;
}) {
  const still = useStill(src);
  if (!src || !placeId) return null;
  return (
    <a
      href={still.deskHref(edition, placeId)}
      className="min-h-11 text-sm text-parchment [touch-action:manipulation]"
      onClick={() => still.putOnDesk({ locationId: placeId, edition })}
    >
      {label}
    </a>
  );
}
