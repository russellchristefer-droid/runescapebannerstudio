export const MARK_SIDE = 96;

/** Contain any picture in a square mark cell. Used when the user uploads their own mark. */
export function markContainRect(srcW: number, srcH: number, side = MARK_SIDE) {
  const sw = Math.max(1, srcW);
  const sh = Math.max(1, srcH);
  const scale = Math.min(side / sw, side / sh);
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));
  return {
    x: Math.round((side - w) / 2),
    y: Math.round((side - h) / 2),
    w,
    h,
    side,
  };
}

export type Mark = {
  id: string;
  name: string;
  editions: ("OSRS" | "RS3")[];
  src: string;
  group: "account" | "cape" | "overhead" | "raid" | "combat" | "hat" | "item" | "map";
};

export const MARKS: Mark[] = [
  { id: "mark-osrs-im", name: "Ironman", editions: ["OSRS"], src: "/marks/osrs-ironman.png", group: "account" },
  { id: "mark-osrs-hcim", name: "Hardcore ironman", editions: ["OSRS"], src: "/marks/osrs-hcim.png", group: "account" },
  { id: "mark-osrs-uim", name: "Ultimate ironman", editions: ["OSRS"], src: "/marks/osrs-uim.png", group: "account" },
  { id: "mark-osrs-gim", name: "Group ironman", editions: ["OSRS"], src: "/marks/osrs-gim.png", group: "account" },
  { id: "mark-osrs-fire", name: "Fire cape", editions: ["OSRS"], src: "/marks/osrs-fire-cape.png", group: "cape" },
  { id: "mark-osrs-infernal", name: "Infernal cape", editions: ["OSRS"], src: "/marks/osrs-infernal-cape.png", group: "cape" },
  { id: "mark-osrs-quest", name: "Quest cape", editions: ["OSRS"], src: "/marks/osrs-quest-cape.png", group: "cape" },
  { id: "mark-osrs-diary", name: "Diary cape", editions: ["OSRS"], src: "/marks/osrs-achieve-cape.png", group: "cape" },
  { id: "mark-osrs-max", name: "Max cape", editions: ["OSRS"], src: "/marks/osrs-max-cape.png", group: "cape" },
  { id: "mark-osrs-melee", name: "Protect Melee", editions: ["OSRS"], src: "/marks/osrs-protect-melee.png", group: "overhead" },
  { id: "mark-osrs-range", name: "Protect Missiles", editions: ["OSRS"], src: "/marks/osrs-protect-missiles.png", group: "overhead" },
  { id: "mark-osrs-mage", name: "Protect Magic", editions: ["OSRS"], src: "/marks/osrs-protect-magic.png", group: "overhead" },
  { id: "mark-osrs-smite", name: "Smite", editions: ["OSRS"], src: "/marks/osrs-smite.png", group: "overhead" },
  { id: "mark-osrs-prayer", name: "Prayer", editions: ["OSRS"], src: "/skills/osrs-Prayer.png", group: "overhead" },
  { id: "mark-osrs-combat", name: "Combat", editions: ["OSRS"], src: "/skills/osrs-Combat.png", group: "combat" },
  { id: "mark-osrs-veng", name: "Vengeance", editions: ["OSRS"], src: "/marks/osrs-vengeance.png", group: "combat" },
  { id: "mark-osrs-slayer", name: "Slayer", editions: ["OSRS"], src: "/skills/osrs-Slayer.png", group: "combat" },
  { id: "mark-osrs-dt2", name: "DT2", editions: ["OSRS"], src: "/marks/osrs-dt2.svg", group: "raid" },
  { id: "mark-osrs-phat-white", name: "White partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-white.png", group: "hat" },
  { id: "mark-osrs-phat-blue", name: "Blue partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-blue.png", group: "hat" },
  { id: "mark-osrs-phat-green", name: "Green partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-green.png", group: "hat" },
  { id: "mark-osrs-phat-yellow", name: "Yellow partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-yellow.png", group: "hat" },
  { id: "mark-osrs-phat-red", name: "Red partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-red.png", group: "hat" },
  { id: "mark-osrs-phat-purple", name: "Purple partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-purple.png", group: "hat" },
  { id: "mark-osrs-phat-black", name: "Black partyhat", editions: ["OSRS", "RS3"], src: "/marks/osrs-partyhat-black.png", group: "hat" },
  { id: "mark-osrs-phat-brown", name: "Brown partyhat", editions: ["OSRS", "RS3"], src: "/hats/brown-partyhat.png", group: "hat" },
  { id: "mark-rs3-im", name: "Ironman", editions: ["RS3"], src: "/marks/rs3-ironman.svg", group: "account" },
  { id: "mark-rs3-hcim", name: "Hardcore ironman", editions: ["RS3"], src: "/marks/rs3-hcim.svg", group: "account" },
  { id: "mark-rs3-uim", name: "Ultimate ironman", editions: ["RS3"], src: "/marks/rs3-uim.svg", group: "account" },
  { id: "mark-rs3-max", name: "Max cape", editions: ["RS3"], src: "/marks/rs3-max.png", group: "cape" },
  { id: "mark-rs3-prayer", name: "Prayer", editions: ["RS3"], src: "/skills/rs3-Prayer.png", group: "combat" },
  { id: "mark-rs3-slayer", name: "Slayer", editions: ["RS3"], src: "/skills/rs3-Slayer.png", group: "combat" },
  { id: "mark-rs3-summoning", name: "Summoning", editions: ["RS3"], src: "/skills/rs3-Summoning.png", group: "combat" },
  { id: "mark-osrs-cash", name: "Max cash", editions: ["OSRS"], src: "/marks/osrs-max-cash.png", group: "item" },
  { id: "mark-osrs-scb", name: "Super combat", editions: ["OSRS"], src: "/marks/osrs-super-combat.png", group: "item" },
  { id: "mark-osrs-range-pot", name: "Ranging potion", editions: ["OSRS"], src: "/marks/osrs-ranging.png", group: "item" },
  { id: "mark-osrs-pray-pot", name: "Prayer potion", editions: ["OSRS"], src: "/marks/osrs-prayer-pot.png", group: "item" },
  { id: "mark-osrs-restore", name: "Super restore", editions: ["OSRS"], src: "/marks/osrs-super-restore.png", group: "item" },
  { id: "mark-osrs-brew", name: "Saradomin brew", editions: ["OSRS"], src: "/marks/osrs-brew.png", group: "item" },
  { id: "mark-osrs-stamina", name: "Stamina potion", editions: ["OSRS"], src: "/marks/osrs-stamina.png", group: "item" },
  { id: "mark-osrs-map-bank", name: "Bank", editions: ["OSRS"], src: "/marks/osrs-map-bank.png", group: "map" },
  { id: "mark-osrs-map-ge", name: "Grand Exchange", editions: ["OSRS"], src: "/marks/osrs-map-ge.png", group: "map" },
  { id: "mark-osrs-map-altar", name: "Altar", editions: ["OSRS"], src: "/marks/osrs-map-altar.png", group: "map" },
  { id: "mark-osrs-map-dungeon", name: "Dungeon", editions: ["OSRS"], src: "/marks/osrs-map-dungeon.png", group: "map" },
  { id: "mark-osrs-map-quest", name: "Quest start", editions: ["OSRS"], src: "/marks/osrs-map-quest.png", group: "map" },
  { id: "mark-osrs-map-mine", name: "Mining site", editions: ["OSRS"], src: "/marks/osrs-map-mine.png", group: "map" },
  { id: "mark-osrs-map-anvil", name: "Anvil", editions: ["OSRS"], src: "/marks/osrs-map-anvil.png", group: "map" },
  { id: "mark-osrs-map-furnace", name: "Furnace", editions: ["OSRS"], src: "/marks/osrs-map-furnace.png", group: "map" },
  { id: "mark-osrs-map-range", name: "Cooking range", editions: ["OSRS"], src: "/marks/osrs-map-range.png", group: "map" },
  { id: "mark-osrs-map-water", name: "Water source", editions: ["OSRS"], src: "/marks/osrs-map-water.png", group: "map" },
  { id: "mark-osrs-map-agility", name: "Agility shortcut", editions: ["OSRS"], src: "/marks/osrs-map-agility.png", group: "map" },
  { id: "mark-osrs-map-fairy", name: "Fairy ring", editions: ["OSRS"], src: "/marks/osrs-map-fairy.png", group: "map" },
  { id: "mark-osrs-map-spirit", name: "Spirit tree", editions: ["OSRS"], src: "/marks/osrs-map-spirit.png", group: "map" },
  { id: "mark-osrs-map-transport", name: "Transportation", editions: ["OSRS"], src: "/marks/osrs-map-transport.png", group: "map" },
  { id: "mark-osrs-map-fish", name: "Fishing spot", editions: ["OSRS"], src: "/marks/osrs-map-fish.png", group: "map" },
  { id: "mark-osrs-map-trees", name: "Rare trees", editions: ["OSRS"], src: "/marks/osrs-map-trees.png", group: "map" },
  { id: "mark-osrs-map-hunter", name: "Hunter", editions: ["OSRS"], src: "/marks/osrs-map-hunter.png", group: "map" },
  { id: "mark-osrs-map-farm", name: "Farming patch", editions: ["OSRS"], src: "/marks/osrs-map-farm.png", group: "map" },
  { id: "mark-osrs-map-slayer", name: "Slayer Master", editions: ["OSRS"], src: "/marks/osrs-map-slayer.png", group: "map" },
  { id: "mark-osrs-map-shop", name: "General store", editions: ["OSRS"], src: "/marks/osrs-map-shop.png", group: "map" },
  { id: "mark-osrs-map-minigame", name: "Minigame", editions: ["OSRS"], src: "/marks/osrs-map-minigame.png", group: "map" },
  { id: "mark-osrs-map-poh", name: "House portal", editions: ["OSRS"], src: "/marks/osrs-map-poh.png", group: "map" },
  { id: "mark-osrs-map-poll", name: "Poll booth", editions: ["OSRS"], src: "/marks/osrs-map-poll.png", group: "map" },
  { id: "mark-osrs-map-raid", name: "Raid", editions: ["OSRS"], src: "/marks/osrs-map-raid.png", group: "map" },
  { id: "mark-osrs-map-apothecary", name: "Apothecary", editions: ["OSRS"], src: "/marks/osrs-map-apothecary.png", group: "map" },
  { id: "mark-rs3-cash", name: "Max cash", editions: ["RS3"], src: "/marks/rs3-max-cash.png", group: "item" },
  { id: "mark-rs3-ovl", name: "Overload", editions: ["RS3"], src: "/marks/rs3-overload.png", group: "item" },
  { id: "mark-rs3-eovl", name: "Elder overload", editions: ["RS3"], src: "/marks/rs3-elder-overload.png", group: "item" },
  { id: "mark-rs3-restore", name: "Super restore", editions: ["RS3"], src: "/marks/rs3-super-restore.png", group: "item" },
  { id: "mark-rs3-renewal", name: "Prayer renewal", editions: ["RS3"], src: "/marks/rs3-prayer-renewal.png", group: "item" },
  { id: "mark-rs3-adrenaline", name: "Adrenaline", editions: ["RS3"], src: "/marks/rs3-adrenaline.png", group: "item" },
  { id: "mark-rs3-map-bank", name: "Bank", editions: ["RS3"], src: "/marks/rs3-map-bank.png", group: "map" },
  { id: "mark-rs3-map-lode", name: "Lodestone", editions: ["RS3"], src: "/marks/rs3-map-lodestone.png", group: "map" },
  { id: "mark-rs3-map-ge", name: "Grand Exchange", editions: ["RS3"], src: "/marks/rs3-map-ge.png", group: "map" },
  { id: "mark-rs3-map-altar", name: "Altar", editions: ["RS3"], src: "/marks/rs3-map-altar.png", group: "map" },
  { id: "mark-rs3-map-dungeon", name: "Dungeon", editions: ["RS3"], src: "/marks/rs3-map-dungeon.png", group: "map" },
  { id: "mark-rs3-map-quest", name: "Quest start", editions: ["RS3"], src: "/marks/rs3-map-quest.png", group: "map" },
  { id: "mark-rs3-map-mine", name: "Mining spot", editions: ["RS3"], src: "/marks/rs3-map-mine.png", group: "map" },
  { id: "mark-rs3-map-anvil", name: "Anvil", editions: ["RS3"], src: "/marks/rs3-map-anvil.png", group: "map" },
  { id: "mark-rs3-map-furnace", name: "Furnace", editions: ["RS3"], src: "/marks/rs3-map-furnace.png", group: "map" },
  { id: "mark-rs3-map-range", name: "Range", editions: ["RS3"], src: "/marks/rs3-map-range.png", group: "map" },
  { id: "mark-rs3-map-water", name: "Water source", editions: ["RS3"], src: "/marks/rs3-map-water.png", group: "map" },
  { id: "mark-rs3-map-agility", name: "Agility shortcut", editions: ["RS3"], src: "/marks/rs3-map-agility.png", group: "map" },
  { id: "mark-rs3-map-fairy", name: "Fairy ring", editions: ["RS3"], src: "/marks/rs3-map-fairy.png", group: "map" },
  { id: "mark-rs3-map-transport", name: "Transportation", editions: ["RS3"], src: "/marks/rs3-map-transport.png", group: "map" },
  { id: "mark-rs3-map-fish", name: "Fishing spot", editions: ["RS3"], src: "/marks/rs3-map-fish.png", group: "map" },
  { id: "mark-rs3-map-trees", name: "Rare tree", editions: ["RS3"], src: "/marks/rs3-map-trees.png", group: "map" },
  { id: "mark-rs3-map-farm", name: "Farming patch", editions: ["RS3"], src: "/marks/rs3-map-farm.png", group: "map" },
  { id: "mark-rs3-map-slayer", name: "Slayer Master", editions: ["RS3"], src: "/marks/rs3-map-slayer.png", group: "map" },
  { id: "mark-rs3-map-shop", name: "General store", editions: ["RS3"], src: "/marks/rs3-map-shop.png", group: "map" },
  { id: "mark-rs3-map-minigame", name: "Minigame", editions: ["RS3"], src: "/marks/rs3-map-minigame.png", group: "map" },
  { id: "mark-rs3-map-poh", name: "House portal", editions: ["RS3"], src: "/marks/rs3-map-poh.png", group: "map" },
  { id: "mark-rs3-map-obelisk", name: "Summoning obelisk", editions: ["RS3"], src: "/marks/rs3-map-obelisk.png", group: "map" },
  { id: "mark-rs3-map-div", name: "Divination", editions: ["RS3"], src: "/marks/rs3-map-divination.png", group: "map" },
];

export function stampsFor(pack: "OSRS" | "RS3") {
  return MARKS.filter((mark) => mark.editions.includes(pack));
}
