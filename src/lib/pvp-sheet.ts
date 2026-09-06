export const PVP_SOURCES = [
  {
    rank: 1,
    label: "OSRS wiki · Wilderness / PvP",
    href: "https://oldschool.runescape.wiki/w/Player_killing",
  },
  {
    rank: 2,
    label: "Official rules",
    href: "https://www.runescape.com/game-guide/rules",
  },
] as const;

export const PVP_TREE = [
  {
    q: "Can I freeze this tick?",
    no: "No → tank or leave. Splash is not a freeze. After a thaw: 5 ticks of immunity. Do not spec there.",
  },
  {
    q: "Is the spec a kill?",
    no: "No → keep the bar. Energy is on the account. A weapon swap does not refill it.",
  },
  {
    q: "Multi, and you are alone?",
    no: "Yes → you are the loot. Leave.",
  },
  {
    q: "Will you laugh off this risk?",
    no: "No → Protect Item, smaller bag. Unskulled keeps 3, or 4 with the prayer. Skulled keeps 0, or 1 with the prayer.",
  },
  {
    q: "They ate?",
    no: "Yes → your next click is not a spec into immunity. Food, then brew, then karambwan. One decision.",
  },
];

export type Method = {
  name: string;
  what: string;
  wipe: string;
};

export const PVP_METHODS: Method[] = [
  {
    name: "Freeze then spec",
    what: "Ice or a bind first so they cannot step. The spec goes in during the freeze, not after they can walk. If they are immune, you wait or you leave.",
    wipe: "Spec after the thaw. Immunity is 5 ticks. That click is a gift.",
  },
  {
    name: "Eat on the incoming",
    what: "You eat for the hit about to land, not the one that already did. Food, then brew if you brought it, then karambwan. One decision.",
    wipe: "Empty tank. The next hit donates the bag.",
  },
  {
    name: "Risk number",
    what: "Pick a gold amount you will not tilt over. Gear is built under that number. Protect Item is for the one piece you refuse to lose. Unskulled keeps 3, or 4 with the prayer. Skulled keeps 0, or 1 with the prayer.",
    wipe: "Over-risk. A set you will tilt over is already a death.",
  },
  {
    name: "Solo vs multi",
    what: "In multi you are a loot pile unless you brought a pile. If you did not, you do not walk in. Single is a duel. Multi is a name called out loud.",
    wipe: "Solo into multi. You are the loot.",
  },
  {
    name: "Do not chase",
    what: "A freeze that is about to break is not a chase. The person running into multi is not a kill; they are bait. Depth is the leash. South is the exit.",
    wipe: "Chase into a broken freeze or into multi. That is their method, not yours.",
  },
];

export type ModeSheet = {
  title: string;
  grid: string;
  opener: string;
  wipe: string;
};

export const PVP_WILDY: ModeSheet = {
  title: "Wildy roam",
  grid: "Body: blessed hide or barrows tank. Weapon: ice staff / sceptre. Spec: one click you can drop. Neck: jewellery on the body. Food: shark + karambwan + blighted restore.",
  opener: "Protect Item on. Freeze. Then spec. Tele Block if they still have a tele. Smite on the roast that would drop Protect Item.",
  wipe: "Spec into the thaw. Jewellery under the food. Skull to tag the player who already tagged you.",
};

export const PVP_WORLD: ModeSheet = {
  title: "PvP world",
  grid: "Same slots as wildy. Banks and marked tiles are safe. Bracket outside the Wilderness acts like depth 15; inside, depth adds 15. PJ is 16 ticks, not the wildy 20. High-risk: Protect Item is off.",
  opener: "Same freeze rule. Do not treat a PvP-world edge like the ditch.",
  wipe: "Using the 20-tick wildy PJ here. Chasing through a bank line.",
};

export const PVP_LMS: ModeSheet = {
  title: "Last Man Standing",
  grid: "Supplied. Safe death. Ferox lobby. Not the wildy grid.",
  opener: "Use the island loadout. Learn freeze and eat here.",
  wipe: "Importing a wildy risk set.",
};

export const PVP_BH: ModeSheet = {
  title: "Bounty Hunter",
  grid: "Daimon's Crater. Own worlds. Coin deposit. Assigned target. Not the wildy grid.",
  opener: "Pay a deposit you can lose. Fight the assigned name.",
  wipe: "Walking the wildy bag into the crater.",
};

export const PVP_RISK = {
  budget: "Hide or mystic you can replace from a task. Staff. Sharks. Glory on the neck.",
  mid: "Barrows tank or blessed hide. One mid spec. Brew, restore, karambwan.",
  max: "One expensive spec click. Tank shell cheap next to that click. Prices move. Wiki wins.",
};
