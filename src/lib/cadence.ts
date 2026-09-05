export const TICK = {
  hour: 3_600_000,
  word: 600_000,
  poll: 15_000,
} as const;

export function hourKey(now = Date.now()) {
  return Math.floor(now / TICK.hour);
}

export function wordKey(now = Date.now()) {
  return Math.floor(now / TICK.word);
}

export function dayKey(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 10);
}

export function hourLabel(now = Date.now()) {
  return new Date(now).toISOString().slice(0, 13).replace("T", " ") + "h UTC";
}

export const SCHEDULE = {
  places: "Every hour, UTC",
  postie: "Every hour, UTC",
  patches: "Checked hourly. OSRS news is usually Wednesday. RS3 is usually Monday.",
  streamers: "Every hour, UTC",
  hiscores: "Live when you look up a name",
  lore: "Checked hourly against the official wikis",
  combat: "Kit and method checked hourly. Wiki strategy page is the live sheet.",
} as const;
