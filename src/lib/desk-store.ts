import type { Edition } from "./locations";
import { loadStudioSave, writeStudioSave, type StudioSave } from "./studio-save";

export type DeskStore = StudioSave;

export function readDesk(): DeskStore {
  return loadStudioSave();
}

export function writeDesk(next: DeskStore) {
  writeStudioSave(next);
}

/** Card / Use on banner → plate. One write. */
export function putStillOnDesk(input: {
  stillSrc: string;
  locationId?: string;
  edition?: Edition;
}) {
  const prev = readDesk();
  writeStudioSave({
    ...prev,
    stillSrc: input.stillSrc,
    locationId: input.locationId ?? prev.locationId,
    edition: input.edition ?? prev.edition,
  });
}

export function deskName() {
  return readDesk().streamer ?? "";
}
