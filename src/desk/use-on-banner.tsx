import { useStill } from "./use-still";
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
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        still.putOnDesk({ locationId: placeId, edition });
        const desk = document.getElementById("desk");
        if (desk) {
          desk.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.location.assign(still.deskHref(edition, placeId));
      }}
    >
      {label}
    </a>
  );
}
