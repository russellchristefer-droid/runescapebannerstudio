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
] as const;

export function peteThreshold(level: number) {
  return (level * (level + 1)) / 2;
}
