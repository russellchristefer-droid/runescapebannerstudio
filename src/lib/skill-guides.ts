import { SKILLS, type Skill } from "./skills";

export type SkillGuide = {
  skill: Skill;
  slug: string;
  afk: string;
  fast: string;
  watch: string;
  wiki: string;
  train: string;
};

function osrsWiki(page: string) {
  return `https://oldschool.runescape.wiki/w/${page}`;
}
function rs3Wiki(page: string) {
  return `https://runescape.wiki/w/${page}`;
}

const OSRS_NOTE: Record<string, { afk: string; fast: string; watch: string; page: string }> = {
  attack: {
    afk: "Ammonite crabs or a slayer task you already take. The monster is the hour.",
    fast: "Slayer in the rooms that burst. NMZ only if you already know the dream.",
    watch: "Wrong style is the wipe. Wiki keeps the room.",
    page: "Attack",
  },
  strength: {
    afk: "Same crabs. Same task. Strength is the click you already make.",
    fast: "Slayer. Controlled is a split, not a third skill.",
    watch: "A scim you cannot replace is not a method.",
    page: "Strength",
  },
  defence: {
    afk: "Tank the same task. Defence is the hour you already paid.",
    fast: "Slayer in the gear you will wear later.",
    watch: "Chinning defence is a paste. Confirm the live page.",
    page: "Defence",
  },
  ranged: {
    afk: "Cannon on a task. Chinchompas only if the room is yours.",
    fast: "Burst or chin the assignment the wiki still names.",
    watch: "Aven and the colosseum stay on Bosses.",
    page: "Ranged",
  },
  prayer: {
    afk: "Gilded altar with bones you can buy again.",
    fast: "Wilderness altar if you accept the skull tax. Dragon bones. Protect item.",
    watch: "Wildy altar is PvP adjacent. The bag is the wipe.",
    page: "Prayer",
  },
  magic: {
    afk: "Splashing is slow on purpose. Do not call it efficient.",
    fast: "Burst or barrage the slayer room. Teleports if you need the runes spent.",
    watch: "Immunity and the wrong spellbook. Wiki keeps the hour.",
    page: "Magic",
  },
  runecraft: {
    afk: "Guardians of the Rift if you want a room. ZMI if you want a trip.",
    fast: "Bloods and lavas as the live page still ranks them. Ourania when you need essence gone.",
    watch: "Pouch decay. Empty pouches are the wipe.",
    page: "Runecraft",
  },
  construction: {
    afk: "Mahogany Homes. Contracts are the hour.",
    fast: "Mahogany tables or teak. Myth cape racks if the page still pays.",
    watch: "Plank make is magic, not this skill.",
    page: "Construction",
  },
  hitpoints: {
    afk: "Any combat you already do. Hitpoints follows the hits.",
    fast: "The same slayer hour. Do not train this as a separate pilgrimage.",
    watch: "NMZ absorption is a side room. Confirm the live page.",
    page: "Hitpoints",
  },
  agility: {
    afk: "Rooftops you can fail less. Ardougne and Rellekka when the level is there.",
    fast: "Hallowed Sepulchre. The floor is the method.",
    watch: "Marks of grace. A course you fail is not efficient.",
    page: "Agility",
  },
  herblore: {
    afk: "Contracts and grimy you already farm. Clean, then make.",
    fast: "The potion the wiki ranks this month. Secondaries first.",
    watch: "A stack you cannot afford is not a method.",
    page: "Herblore",
  },
  thieving: {
    afk: "Ardougne knights with the diary. Vyres when the level and the weapon exist.",
    fast: "Elves or vyres as the live page ranks them. Pyramid if you like the room.",
    watch: "Stun. Food. The knight is not a PvP fight.",
    page: "Thieving",
  },
  crafting: {
    afk: "Seaweed and sand. Glass. Then the jewellery the page still names.",
    fast: "Blowpipe darts are fletching. Battlestaves and dragonhide as ranked.",
    watch: "Gold at the furnace is the old hour. Confirm the live page.",
    page: "Crafting",
  },
  fletching: {
    afk: "Broad arrows on a slayer ring hour. Darts if you have the tips.",
    fast: "Dragon darts only if the money is a joke you can tell twice.",
    watch: "Stringing is not the fast room unless the page says so.",
    page: "Fletching",
  },
  slayer: {
    afk: "The task you can cannon. Konar only if you want the brimstone.",
    fast: "Burst and barrage assignments. Skip list on the wiki.",
    watch: "Boss tasks stay on Bosses. Face covers stay on the monster page.",
    page: "Slayer",
  },
  hunter: {
    afk: "Birdhouses on Fossil Island. That is the timer.",
    fast: "Herbiboar or chinchompas. Black chins are a wildy tax.",
    watch: "Protect item in the hunting grounds that PK.",
    page: "Hunter",
  },
  mining: {
    afk: "Motherlode. Stars if they are up. Amethyst when the level is there.",
    fast: "The rock the wiki ranks for the tick. 3-tick is a VOD, not a requirement.",
    watch: "A pick you cannot replace is not a method.",
    page: "Mining",
  },
  smithing: {
    afk: "Giants’ Foundry. Blast Furnace gold if you can stand the heat.",
    fast: "Blast Furnace bars the page still ranks. Anvil only for the diary.",
    watch: "Coal bag. Ice gloves. The belt is the wipe.",
    page: "Smithing",
  },
  fishing: {
    afk: "Barbarian. Aerial where it still pays. Tempoross for the crate.",
    fast: "Minnows or the fish the wiki ranks. Angler outfit is the room.",
    watch: "A shark you cannot cook is a bank tab.",
    page: "Fishing",
  },
  cooking: {
    afk: "Karambwans on the range that does not burn.",
    fast: "The same fish. Hosidius if the diary is done.",
    watch: "Wines are a stack. Confirm the live page.",
    page: "Cooking",
  },
  firemaking: {
    afk: "Wintertodt. Forestry if the event is the hour.",
    fast: "The same winter. Teaks only if you already cut them.",
    watch: "Warmth. Bruma. Leaving the fire is the wipe.",
    page: "Firemaking",
  },
  woodcutting: {
    afk: "Forestry or redwoods. Teaks on Fossil Island when you want the tick.",
    fast: "The tree the wiki ranks. Sulliusceps if you like the island.",
    watch: "A felling axe you cannot drop is not a method.",
    page: "Woodcutting",
  },
  farming: {
    afk: "Hardwoods and fruit. Contracts in the guild.",
    fast: "Tithe if you want the room. Tree runs are the hour.",
    watch: "Payment. Compost. A dead tree is the wipe.",
    page: "Farming",
  },
  sailing: {
    afk: "The live page owns the boat. Do not paste a 2012 fishing hour here.",
    fast: "Confirm the current training sheet on the Old School wiki. Sailing moves.",
    watch: "If the method is not on the wiki this week, it is not a method.",
    page: "Sailing",
  },
};

const RS3_NOTE: Record<string, { afk: string; fast: string; watch: string; page: string }> = {
  attack: {
    afk: "Revolution on a task you already take. Abilities are the hour.",
    fast: "Slayer in the style that kills. Edimmu and the later dungeon stay on the monster page.",
    watch: "A camp vs a switch is one bar. Wiki keeps the revolution line.",
    page: "Attack",
  },
  strength: {
    afk: "Same task. Strength is the hit you already roll.",
    fast: "The assignment that dies to melee. Confirm weakness.",
    watch: "Do not paste an Old School freeze paragraph here.",
    page: "Strength",
  },
  defence: {
    afk: "Tank the same hour. Armour perks on the live page.",
    fast: "Slayer in the gear you will keep.",
    watch: "Death cost is PvM grammar. Wildy is opt-in.",
    page: "Defence",
  },
  ranged: {
    afk: "A task you can revolution. Chins only if the room is yours.",
    fast: "The style the monster is weak to. Confirm the wiki.",
    watch: "Ascension and the monastery stay on Bosses if they are bosses.",
    page: "Ranged",
  },
  prayer: {
    afk: "Gilded or the chapel you already own. Bones you can buy again.",
    fast: "The altar the page ranks. Curses when the level is there.",
    watch: "Powder and sharks are PvP keep-clicks, not this hour.",
    page: "Prayer",
  },
  magic: {
    afk: "Revolution magic on a weak target.",
    fast: "The spell the wiki ranks for the task. Ancient if the dungeon wants it.",
    watch: "Ability lock. Sunshine and death skulls are PvM sentences.",
    page: "Magic",
  },
  runecraft: {
    afk: "The Runespan if you want a room. The abyss if you want a trip.",
    fast: "The rune the live page ranks. Necro runes if that sheet still pays.",
    watch: "Pouch. Essence. Empty is the wipe.",
    page: "Runecrafting",
  },
  construction: {
    afk: "Mahogany Homes if it exists on this client. Fort frames if that is the hour.",
    fast: "The furniture the wiki ranks. Confirm the Fort and the house.",
    watch: "Planks first. A house you cannot enter is not a method.",
    page: "Construction",
  },
  constitution: {
    afk: "Combat you already do. Constitution follows the hits.",
    fast: "The same slayer hour. Do not pilgrimage this skill.",
    watch: "Hitpoints is the Old School name. This client says Constitution.",
    page: "Constitution",
  },
  agility: {
    afk: "The course you fail less. Hefin in Prif when the city stands.",
    fast: "The course the wiki ranks for the level. Silverhawks if you already own the hour.",
    watch: "Marks and the wrong rooftop. Confirm the live page.",
    page: "Agility",
  },
  herblore: {
    afk: "Contracts and grimy from the patch you already run.",
    fast: "The potion the page ranks. Portable wells if they still stand.",
    watch: "Secondaries first. A 120 herb hour is not an Old School paste.",
    page: "Herblore",
  },
  thieving: {
    afk: "Prif or the stall the diary unlocked.",
    fast: "Elves, vyres, or the safe the wiki ranks.",
    watch: "Stun. Light fingers. The knight is not a PvP fight.",
    page: "Thieving",
  },
  crafting: {
    afk: "Urns or glass if the page still names them.",
    fast: "The hide or the jewellery the live sheet ranks.",
    watch: "A portable crafter is a room. Confirm it is live.",
    page: "Crafting",
  },
  fletching: {
    afk: "Broads on a slayer hour. Staves if you have the logs.",
    fast: "The tip the wiki ranks. Invention later eats the junk.",
    watch: "Stringing is not automatically the fast room.",
    page: "Fletching",
  },
  slayer: {
    afk: "The task you can revolution. Laniakea when the list is yours.",
    fast: "The assignment the page ranks. Skip list on the wiki.",
    watch: "Ripper and edimmu stay on the bestiary. Bosses stay on Bosses.",
    page: "Slayer",
  },
  hunter: {
    afk: "The box trap you can leave. Big game if the island is the hour.",
    fast: "The creature the wiki ranks. Charming moths if that sheet still pays.",
    watch: "Anachronia is a map. Confirm the live method.",
    page: "Hunter",
  },
  mining: {
    afk: "The rock the rework still calls afk. Seren stones if they remain.",
    fast: "The tick the wiki ranks. Concentrated if that is the hour.",
    watch: "The mining-smithing rework is this client. Do not paste Motherlode here.",
    page: "Mining",
  },
  smithing: {
    afk: "The furnace the rework named. Burial if the page still pays.",
    fast: "The bar and the progress the wiki ranks.",
    watch: "Blast Furnace is Old School. This client has another floor.",
    page: "Smithing",
  },
  fishing: {
    afk: "The swarm or the spot the page calls afk. Menaphos if that is still a room.",
    fast: "The fish the wiki ranks. Urns if they still tag.",
    watch: "A shark you cannot cook is a bank tab.",
    page: "Fishing",
  },
  cooking: {
    afk: "The range that does not burn. Portables if they stand.",
    fast: "The fish you already caught. Confirm the live page.",
    watch: "Wines are a stack.",
    page: "Cooking",
  },
  firemaking: {
    afk: "The line or the portable the page names.",
    fast: "The log the wiki ranks. Bonfires if that is still the hour.",
    watch: "Wintertodt is Old School. Do not paste it here.",
    page: "Firemaking",
  },
  woodcutting: {
    afk: "The tree you can leave. Crystal or acadia if the page still names them.",
    fast: "The tick the wiki ranks. Imcando if you already own the axe.",
    watch: "Forestry is the other client.",
    page: "Woodcutting",
  },
  farming: {
    afk: "Hardwoods and fruit. The fort patch if it stands.",
    fast: "Tree runs. The herb the 120 sheet ranks.",
    watch: "Payment. Compost. A dead tree is the wipe.",
    page: "Farming",
  },
  summoning: {
    afk: "Charms from the task you already take. Pouches at the obelisk.",
    fast: "The pouch the wiki ranks. Spirit shards first.",
    watch: "This skill is RuneScape-only. No Old School sister.",
    page: "Summoning",
  },
  dungeoneering: {
    afk: "Floors you can clear. Complexity you can finish.",
    fast: "The floor the page ranks. Sinkholes if they are live.",
    watch: "A wipe on 5:5 is a reset, not a method.",
    page: "Dungeoneering",
  },
  divination: {
    afk: "Caches on the timer. Wisps at the colony you can stand.",
    fast: "The colony the wiki ranks. Chronicle if that fragment still pays.",
    watch: "Energy first. A colony you cannot reach is not a method.",
    page: "Divination",
  },
  invention: {
    afk: "Disassemble the junk you already make. Research when the blueprints are yours.",
    fast: "The machine the page ranks. Discoveries first.",
    watch: "Level 120. Augment the piece you will keep.",
    page: "Invention",
  },
  archaeology: {
    afk: "The dig site you can leave. Restoration at the bench.",
    fast: "The cache the wiki ranks. Tetras when the collection wants them.",
    watch: "Precision. Soil. A cracked artefact is the wipe.",
    page: "Archaeology",
  },
  necromancy: {
    afk: "Rituals on the timer. Combat in the style the monster is weak to.",
    fast: "The ritual the page ranks. Then the task.",
    watch: "This is a combat style and a skill. Boss rooms stay on Bosses.",
    page: "Necromancy",
  },
};

function keyOf(skill: Skill) {
  return skill.name.toLowerCase().replace(/[^a-z]/g, "");
}

export function skillGuides(): SkillGuide[] {
  return SKILLS.map((skill) => {
    const key = keyOf(skill);
    const osrs = skill.editions.includes("OSRS");
    const note = osrs ? OSRS_NOTE[key] : RS3_NOTE[key];
    const page = note?.page ?? skill.name;
    const wiki = osrs ? osrsWiki(page) : rs3Wiki(page);
    const train = osrs
      ? osrsWiki(`Pay-to-play_${page}_training`)
      : rs3Wiki(`${page}_training`);
    return {
      skill,
      slug: skill.id,
      afk: note?.afk ?? "Quiet on this ditch. Confirm the live wiki.",
      fast: note?.fast ?? "The live training page owns the hour.",
      watch: note?.watch ?? "Wiki wins on numbers.",
      wiki,
      train,
    };
  });
}

export const SKILL_GUIDES = skillGuides();

export function skillGuideById(id: string) {
  return SKILL_GUIDES.find((row) => row.slug === id);
}

export function sisterSkill(row: SkillGuide) {
  const other = row.skill.editions[0] === "OSRS" ? "RS3" : "OSRS";
  const name = row.skill.name === "Hitpoints" ? "Constitution" : row.skill.name === "Constitution" ? "Hitpoints" : row.skill.name;
  return SKILL_GUIDES.find((item) => item.skill.editions.includes(other) && item.skill.name === name);
}
