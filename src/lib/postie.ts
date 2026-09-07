import { PERIOD_MS } from "@/lib/still-clock";

/** In-world flavour. Not a mail server. */
export const POSTIE_LINES = [
  "I'm Postie Pete, the bravest postie in all Gielinor!",
  "Hello there. Mail must go through.",
  "I've walked letters into the Wilderness and come back with the bag.",
  "Ghosts still get post. The living complain more.",
  "Special delivery! Don't shoot the postie.",
  "The Gielinor postal service does not lose a letter. We just arrive late and muddy.",
  "A parcel for the Grand Exchange? Mind the crowds.",
  "Lumbridge to Ardougne is a long road when the bag is full.",
  "I do not open the letters. I only get them there.",
  "If it has an address, I will find the door.",
  "Port Sarim smells of fish and unpaid postage.",
  "Varrock's office is busier than a market stall on double xp.",
  "Falador white walls. Still not a safe drop for a parcel.",
  "Zanaris has a postbox. Fairies write small.",
  "I am a gnome. The bag is not.",
  "Entrana mail is light. You already banked the blade.",
  "Wilderness postage costs a skull if you read the address wrong.",
  "Bob keeps the sill. I keep the bag. We do not swap jobs.",
  "Classic worlds are closed. The letters still remember the walk.",
] as const;

export function postieLineAt(now = Date.now()) {
  const slot = Math.floor(now / PERIOD_MS);
  return POSTIE_LINES[slot % POSTIE_LINES.length];
}

export const PETE_LINES = [
  "The file is ready when you are.",
  "He still only saves JPEGs.",
  "Twelve letters. He has counted.",
  "The boards are a different window.",
  "Nothing interesting happens. He posted anyway.",
  "Closed worlds. Open Download.",
  "You have reached a higher Pete.",
  "He counted the letters. He did not count the risk.",
  "A still is a window. A JPEG is the work.",
  "Falador holds the plate when a file goes missing. Pride does not.",
  "He walked the bag into the Inferno. He still only saves JPEGs.",
  "Special delivery. The stamp is yellow.",
] as const;

export function peteThreshold(level: number) {
  return (level * (level + 1)) / 2;
}
