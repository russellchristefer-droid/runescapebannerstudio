import { putStillOnDesk } from "@/lib/desk-store";
import { deskOpenPath } from "@/lib/desk-link";
import type { Edition } from "@/lib/locations";

/** One still path for the card face and Use on banner. */
export function useStill(src?: string) {
  function putOnDesk(extra?: { locationId?: string; edition?: Edition }) {
    if (!src) return;
    putStillOnDesk({
      stillSrc: src,
      locationId: extra?.locationId,
      edition: extra?.edition,
    });
  }

  function deskHref(edition: Edition, placeId: string) {
    if (!src) return "/#desk";
    return deskOpenPath(edition, placeId, { still: src });
  }

  return { src, putOnDesk, deskHref };
}
