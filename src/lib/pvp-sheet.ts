export type RiskTier = { budget: string; mid: string; max: string };

export const PVP_SOURCES = [
  {
    rank: 1,
    label: "OSRS wiki · Player killing",
    href: "https://oldschool.runescape.wiki/w/Player_killing",
  },
  {
    rank: 2,
    label: "RuneScape wiki · Wilderness PvP",
    href: "https://runescape.wiki/w/Wilderness/Player_versus_player",
  },
  {
    rank: 3,
    label: "Official rules",
    href: "https://www.runescape.com/game-guide/rules",
  },
] as const;

export const PVP_OSRS = {
  legal: [
    "Wilderness on every world. Combat bracket is your level plus or minus the Wilderness depth. Ditch is level 1. Deep north is 56. Confirm the live overlay.",
    "PvP worlds: most of the map is fightable outside banks and marked safe tiles. Outside the Wilderness the bracket behaves like depth 15. Inside the Wilderness the depth adds 15. Worlds rotate. Confirm the live list on the wiki.",
    "Bounty Hunter is its own crater and its own worlds. Do not mix that bag with a wildy trip.",
    "Last Man Standing is a supplied island out of Ferox. Safe death. Do not mix that bag with a wildy trip.",
    "Clan Wars and Emir's Arena are consented rooms. Honour lives there if it lives anywhere.",
    "High-risk worlds: Protect Item is off. The risk is the whole worn set. Confirm the world type before you hop.",
  ],
  skull: [
    "Unskulled: three most valuable items stay. Protect Item prayer makes four.",
    "Skulled: zero kept. Protect Item prayer makes one — the single most valuable item.",
    "You skull by attacking first, by walking the Abyss without the bracelet, or by taking a skull from the emblem trader. Fighting back after you are hit does not skull you.",
    "PK Skull Prevention in settings stops the first click from skulled grief. Turn it off only when you mean the attack.",
    "High-risk worlds refuse the Protect Item prayer. Do not describe a kept item on those worlds.",
    "Below and above 20 Wilderness the kept count is the same. Teleports and untradeable breakage change. Glory and the usual jewellery stop at 30. Confirm the current teleport list on the wiki.",
  ],
  solo: [
    "Freeze first if the bracket uses magic. Ice burst or barrage in members. Entangle or bind if that is the book you brought. The freeze is the tax. The spec is the collection.",
    "Spec on a freeze or on a brew sip — not on a full hitpoints bar you have not checked. Claws, voidwaker, AGS, DDS: pick one expensive click you can afford to drop. Leave the second expensive click home.",
    "Eat cycle: food, then combo food. Brew then restore if you brought brews. Do not invent a tick count on this desk. The wiki keeps the live combo.",
    "Tank gear is what you keep if the fight goes long: high defence, cheap to replace. Damage gear is what you click once. You already know which one the risk can pay for.",
    "Vengeance is a prayer book click, not a personality. Tele Block before they reach a 20–30 tile if you mean to finish.",
  ],
  multi: [
    "Multi: one caller, one name. You pile the name you hear. You do not write a script that clicks for you. Official rules win if that sentence was unclear.",
  ],
  anti: [
    "Run south. Depth is the leash. Protect Item stays on while you still have prayer.",
    "Keep the teleport jewellery equipped, not in the bag under the sharks. Above 20 the cheap teles die. Confirm the 30-wild list.",
    "Do not skull to tag a player who tagged you. The second click is how the risk doubles.",
    "Food and potions on the floor have pickup rules in combat. Confirm the live timer on the wiki. Do not stand still to argue with a loot pile.",
  ],
  lms: [
    "Supplied loadout. Death is safe. Hardcores stay hardcores.",
    "Casual and Competitive are different rooms. Competitive has a total-level / quest-point gate. Confirm the live gate on the wiki.",
    "Lobby is Ferox Enclave. Worlds rotate. This is not the Wilderness.",
  ],
  bh: [
    "Daimon's Crater. Assigned target in a combat bracket. You buy the entry with a coin deposit scaled to combat level. Confirm the live deposit on the wiki.",
    "Emblems upgrade on the target. They downgrade when you die. Do not treat an emblem as a bank.",
    "Blighted supply crates are the food. Protection prayers and some teles are blocked in the crater. Confirm the live block list.",
    "BH worlds rotate with the PvP rota. If the world list on this desk and the wiki disagree, the wiki wins.",
  ],
  risk: {
    budget:
      "Rune or blessed d'hide or mystic you can replace from a slayer task. Rune scim / MSB / ancient staff. Sharks. A glory. The risk is the trip, not the set.",
    mid:
      "Barrows tank or blessed hide. A sceptre or trident you can rebuild. One mid spec — claws or a cheap AGS. Brews and a restore. Leave the infernal home.",
    max:
      "One expensive click and a tank shell that is still cheap relative to that click. Voidwaker or claws plus blessed / masori pieces you accept as droppable. Do not wear the bank. Confirm current prices on the wiki, not on a blog.",
  } satisfies RiskTier,
};

export const PVP_RS3 = {
  legal: [
    "Open-world PvP in the Wilderness is opt-in. Talk to Vala in Edgeville. Until you do, you cannot take the risky fight in the dangerous Wilderness.",
    "Opted in: you are skulled every time you enter the dangerous Wilderness. You only fight other opted-in players.",
    "Demonic skull in worn or bag skulls you for that trip and clears when you leave. It is not the same as Vala's standing opt-in. Confirm the live warning on the wiki.",
    "Clan Wars still has a white portal and a red portal. White is the safe room. Red is the risk room. Do not mix the two sentences.",
    "Soul Wars, Fist of Guthix, and the PvP Arena / Deathmatch are minigame rooms. Safe death. Confirm each room is still on the live minigame list.",
    "Old PvP worlds and the old Bounty Hunter worlds are not current. Do not gear for them. Confirm on official news.",
    "Wilderness Warbands: do not describe as live. Confirm on official news.",
  ],
  death: [
    "OSRS skull is a kept-item count. RS3 opted-in Wilderness death is not a visit to Death's Office.",
    "Skulled in the dangerous Wilderness: no gravestone, no reclaim from Death. Unprotected items drop. Respawn is Edgeville, not the office.",
    "Protect Item prayer, powder of item protection, and fury shark can keep the most valuable item — up to three if you stack the methods the live page still allows. Confirm the stack on the wiki before you count on it.",
    "Killer loots first. What they leave can be taken by anyone, including you if you run back. That is the tax, not a promise.",
    "Normal PvM death elsewhere still uses Death / gravestone. Do not copy that sentence onto a skulled Wilderness tile.",
  ],
  bar: [
    "Camp: one style you can keep clicking while you kite to the ditch. Switch: one extra weapon for the dump. That is the whole bar on this desk.",
    "Freedom / Anticipation before the bind. Bladed Dive or Surge toward a teleport tile you already checked. Ultimate is a finish, not an opener, unless the live page for that weapon says otherwise.",
    "Familiar is extra combat level in the Wilderness. Confirm the familiar's level add on the wiki before you walk it in.",
  ],
  skip: [
    "Leave the invention gear home unless the risk can pay the repair. Leave the undead slayer perk argument for a PvM sheet.",
    "If a PvP mode died in a patch, this desk will not describe it as live. Confirm on official news.",
  ],
};
