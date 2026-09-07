export const PVP_SOURCES = [
  {
    rank: 1,
    label: "OSRS wiki · Wilderness / PvP",
    href: "https://oldschool.runescape.wiki/w/Player_killing",
  },
  {
    rank: 2,
    label: "RuneScape wiki · PvP",
    href: "https://runescape.wiki/w/Player_versus_player",
  },
  {
    rank: 3,
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

export const RS3_PVP_TREE = [
  {
    q: "Did you opt in at Vala?",
    no: "No → you are not in PvP. The RuneScape Wilderness is opted out until you speak to Vala at Edgeville. Confirm on the live wiki.",
  },
  {
    q: "Is this ability a kill?",
    no: "No → keep the bar. A flex stun into a full defensive is a gift. Freedom, Anticipate, and Barricade are why the dump misses.",
  },
  {
    q: "Multi, and you are alone?",
    no: "Yes → you are the loot. Leave. The pile grammar did not die with the old worlds.",
  },
  {
    q: "Will you laugh off this bag?",
    no: "No → smaller risk. Skulled wildy does not send you to Death’s office with a grave. Unprotected pieces drop. Protect Item, fury shark, and powder of item protection are the three keep-clicks the wiki names.",
  },
  {
    q: "They used a defensive?",
    no: "Yes → your next ability is not the same dump. Resonance, Reflect, Barricade, and Devotion eat the bar you already spent.",
  },
];

export const RS3_PVP_METHODS: Method[] = [
  {
    name: "Opt in first",
    what: "Speak to Vala. Until then you cannot take or give a skull fight in that Wilderness. Opt-in is the door. The map is not.",
    wipe: "Walking in opted out and calling it PvP. Or treating opted-out PvM as a kill.",
  },
  {
    name: "Stun then burst",
    what: "A bind or stun first so they cannot step. The damage goes in during the control, not after Freedom. If they are immune, you wait or you leave. This is not an Old School freeze-tick paste.",
    wipe: "Dumping into Freedom or after the stun drops.",
  },
  {
    name: "Bar, not a flex stack",
    what: "One revolution or full-manual bar you can press under pressure. Camp vs switch is a short sentence: you camp the style that kills this target, or you leave. Confirm ability lines on the wiki.",
    wipe: "A twelve-switch stack you cannot hit on a phone.",
  },
  {
    name: "Keep-clicks",
    what: "Protect Item. Fury shark. Powder of item protection. The wiki names those three. Skulled death drops the rest on the floor. Edgeville is the respawn, not Death’s reclaim counter.",
    wipe: "A max set with no keep-click. That is already the death.",
  },
  {
    name: "Do not chase depth",
    what: "Most teleports die past 20. Glory-class pieces work later — confirm the live page. A target running north is often bait. Tele Block is a lock, not a victory lap.",
    wipe: "Chase past the tele line with an empty defensive.",
  },
];

export const RS3_WILDY: ModeSheet = {
  title: "RuneScape Wilderness (opt-in)",
  grid: "Risk number first. Tank that survives a stun. One style that kills. Food and a defensive on the bar. Confirm Vala and the live keep-clicks.",
  opener: "Opt in. Protect Item. Stun or bind. Burst during the control. Do not dump into Freedom.",
  wipe: "Opted-out PvM bag in an opted-in fight. Or a dump after they freed.",
};

export const RS3_DEATHMATCH: ModeSheet = {
  title: "Deathmatch",
  grid: "Supplied minigame bag. Not the Wilderness grid. Confirm the live page — this is not Bounty Hunter 2016.",
  opener: "Learn the bar here. Safe-ish practice is the point.",
  wipe: "Importing a skulled wildy risk set.",
};

export const RS3_CLAN: ModeSheet = {
  title: "Clan Wars / red portal",
  grid: "White and most portals are safe. The red portal is the unsafe one. Confirm on the wiki before you walk in.",
  opener: "Read the portal. If it is red and you brought a bank, you already chose the wipe.",
  wipe: "Treating the red portal like Soul Wars.",
};

export const RS3_RISK = {
  budget: "Replaceable armour. One cheap weapon. Food. Keep-clicks if you opt in.",
  mid: "One style that can kill. A defensive on the bar. Risk you will not ticket over.",
  max: "One expensive click next to a cheap shell. Prices move. Wiki wins. Do not paste an Old School max set here.",
};

export const RS3_DEAD = "Bounty Hunter (2016), old PvP worlds, the Crucible, DarkScape, and the old Duel Arena are history. Confirm on official news. Do not gear those rooms as live.";

