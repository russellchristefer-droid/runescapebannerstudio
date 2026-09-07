import { SKILLS, type Skill } from "./skills";

export type SkillGuide = {
  skill: Skill;
  slug: string;
  afk: string;
  fast: string;
  watch: string;
  early: string;
  mid: string;
  late: string;
  wear: string;
  wiki: string;
  train: string;
};

type Note = {
  afk: string;
  fast: string;
  watch: string;
  early: string;
  mid: string;
  late: string;
  wear: string;
  page: string;
};

function osrsWiki(page: string) {
  return `https://oldschool.runescape.wiki/w/${page}`;
}
function rs3Wiki(page: string) {
  return `https://runescape.wiki/w/${page}`;
}

const OSRS_NOTE: Record<string, Note> = {
  attack: {
    early: "1–40. Quests dump a chunk of Attack if you run them, but the floor is still a weak monster you can leave on. Cows are a classroom. Ammonite crabs and sand crabs are the first real hour: they aggress, they hit soft, and you can bury the bones or ignore them. Iron through mithril on a scimitar you can drop. Do not buy a whip for this bracket.",
    mid: "40–70. The scimitar that matches the level is enough. Slayer is the efficient room because the XP lands on the combat style you clicked and the points buy skips later. Controlled is a split across Attack, Strength, and Defence — use it when you want all three to move, not when you are rushing one number. NMZ exists. It is a dream you already understand or you skip it.",
    late: "70+. Abyssal whip or the stab the task actually wants. Slayer helm on task. Boss rooms and raids stay on Bosses. Training Attack at 90 by camping crabs is legal and slow. The wiki training page owns the current fastest monster.",
    wear: "Weapon first, then the helm the assignment named. Cape you already own. Shield only if the room hits back hard enough to waste food. Slayer helm on task beats a fashion scim. Protect the prayer that matches the hit. A set you cannot replace is not a training method.",
    afk: "Crabs or a slayer task you can cannon. Afk means the monster stays on you and the food lasts. If you have to click every tile, it is not this column.",
    fast: "Slayer in the rooms that burst or that die to the style you already camp. NMZ only if you already know the absorption dream. Confirm the live training page before you buy a stack for one night.",
    watch: "Wrong attack style is the wipe. A scimitar you cannot replace is not a method. The monster page owns face covers and finish mechanics.",
    page: "Attack",
  },
  strength: {
    early: "1–40. Same crabs as Attack. Strength potion if you bought one.",
    mid: "40–70. The same slayer hour. Controlled splits the XP.",
    late: "70+. The weapon Attack already unlocked. Strength is the hit, not a second pilgrimage.",
    wear: "Same as Attack. Do not buy a second max set for this number.",
    afk: "Same crabs. Same task.",
    fast: "Slayer. Controlled is a split, not a third skill.",
    watch: "A strength amulet is not a method after 70.",
    page: "Strength",
  },
  defence: {
    early: "1–40. Train it on the same crabs. Hide or chain you can replace.",
    mid: "40–70. Barrows tank when the money is a joke you can tell twice. Slayer.",
    late: "70+. The armour you will wear on the next task. Chinning defence is optional and loud.",
    wear: "Tank the style that hits you. Helm on task. Protect the prayer that matches the room.",
    afk: "Tank the same task.",
    fast: "Slayer in the gear you will wear later.",
    watch: "Chinning defence is a paste. Confirm the live page.",
    page: "Defence",
  },
  ranged: {
    early: "1–40. Iron through mithril knives or a shortbow you can drop. Crabs.",
    mid: "40–70. Broad bolts on a slayer task. Rune crossbow. Ava when you have it.",
    late: "70+. Blowpipe or the bow the wiki ranks for that room. Chins only if the tile is yours.",
    wear: "Ava. Blessed hide or the tank the room asks. Slayer helm on task. Cannon if the assignment allows it.",
    afk: "Cannon on a task. Chinchompas only if the room is yours.",
    fast: "Burst or chin the assignment the wiki still names.",
    watch: "Colosseum and raids stay on Bosses. Black chins are a wildy tax.",
    page: "Ranged",
  },
  prayer: {
    early: "1–43. Bones on any altar. Big bones when you can buy them twice. Protect from Melee at 43 is the first prayer that changes a room. Quests dump a little Prayer. Do not sit on a chaotic altar with a bank.",
    mid: "Gilded altar with dragon bones is the honest mid. 45 Eagle Eye, 52 Smite if you PvP, 70 Piety when the knights are done. Ectofuntus is slower and cheaper. Wildy altar is faster and a tax.",
    late: "Rigour and Augury if the diary and the money exist. Wildy altar only with a bag you will laugh off — that room is PvP adjacent. 99 Prayer is a bone stack, not a secret.",
    wear: "Vestment if you have the set. Protect Item on the wildy altar. No max melee. No infernal cape required to offer a bone.",
    afk: "Gilded altar with bones you can buy again. A butler makes it less of a walk.",
    fast: "Wilderness altar if you accept the skull tax. Dragon or superior bones as the page ranks them.",
    watch: "The bag is the wipe. Chaos fanatic does not care that you were training.",
    page: "Prayer",
  },
  magic: {
    early: "1–40. Strike spells on crabs. Splashing is slow on purpose.",
    mid: "55 Iban. 58–75 the slayer spellbook you actually use. Teleports spend runes.",
    late: "94 barrage if you burst. Ancients for the room, standards for the utility.",
    wear: "Ahrim or the magic tank the room asks. Occult when you have it. Slayer helm on task.",
    afk: "Do not call splashing efficient.",
    fast: "Burst or barrage the slayer room.",
    watch: "Immunity and the wrong spellbook.",
    page: "Magic",
  },
  runecraft: {
    early: "1–23 airs and the essence you already have. Ourania when the quest is done.",
    mid: "Lava if you can stand the trip. Guardians of the Rift for a room.",
    late: "Bloods and souls as the live page ranks them. Daeyalt if you own the hour.",
    wear: "Pouches. Raiments if you have the set. Stamina. A tiara, not a joke hat.",
    afk: "Guardians of the Rift or ZMI.",
    fast: "Bloods and lavas as the live page still ranks them.",
    watch: "Pouch decay. Empty pouches are the wipe.",
    page: "Runecraft",
  },
  construction: {
    early: "1–33 oak larders if you must. Mahogany Homes as soon as it takes you.",
    mid: "50s teak. Servant. Plank sack if you have it.",
    late: "Mahogany tables or the rack the page still pays. Max house is the sink, not the method.",
    wear: "Crystal saw. Butler. Clothes do not matter. Planks do.",
    afk: "Mahogany Homes.",
    fast: "Mahogany tables or teak.",
    watch: "Plank make is magic, not this skill.",
    page: "Construction",
  },
  hitpoints: {
    early: "Follows every hit. Do not pilgrimage this number.",
    mid: "The same slayer hour.",
    late: "99 happens while you play the other combat skills.",
    wear: "Whatever the task already asked.",
    afk: "Any combat you already do.",
    fast: "The same slayer hour.",
    watch: "NMZ absorption is a side room.",
    page: "Hitpoints",
  },
  agility: {
    early: "1–30. Quests skip a painful chunk if you run Tourist Trap and The Grand Tree. After that Draynor and Varrock rooftops teach the click. Fail less, not faster. Marks of grace are why rooftops beat a random dungeon at this level. Summer pie is a boost, not a personality.",
    mid: "The live training page still ranks Brimhaven Arena and then the Wilderness course as the fast mid rooms — both cost attention and, in the wildy, a bag. Rooftops from Canifis through Seers are the honest mid if you want marks and a calmer hour. Seers with the diary teleport is a real course, not flavour.",
    late: "62+ Hallowed Sepulchre is the fast room after Sins of the Father. Stamina, a private instance if you have it, and the floors you can actually clear. Ardougne rooftop remains the rooftop people finish 99 on. Rellekka is slower and quieter. Confirm rates on the wiki. They move.",
    wear: "Graceful. Stamina. Light boots and a spotted cape if you still run the wildy course. Food for fails. Sepulchre wants hitpoints and a brain, not a max melee set. Karamja gloves matter in the Arena. Weight is the mechanic.",
    afk: "Rooftops you fail less. Afk agility is a lie past the first two courses. The click is the skill.",
    fast: "Arena or Wilderness mid, Sepulchre late, as the live page still ranks them. Tickets and coffins are the side loot. Do not invent a third dungeon.",
    watch: "Marks slow down when you out-level a rooftop by twenty. A course you fail is not efficient. Wildy course is PvP adjacent. Protect item.",
    page: "Agility",
  },
  herblore: {
    early: "1–55 attack and strength potions you will drink.",
    mid: "Prayer and super sets. Contracts pay the grimy.",
    late: "Saradomin brew / forgotten / the potion the wiki ranks. Secondaries first.",
    wear: "Amulet of chemistry if you own it. Banked secondaries. Clothes do not matter.",
    afk: "Contracts and grimy you already farm.",
    fast: "The potion the wiki ranks this month.",
    watch: "A stack you cannot afford is not a method.",
    page: "Herblore",
  },
  thieving: {
    early: "1–40 stalls and men. Ardougne as soon as it takes you.",
    mid: "55 knights with the diary. Pyramid if you like the room.",
    late: "Vyres or elves as the live page ranks them.",
    wear: "Rogue if you want the double. Dodgy necklace. Food. No wildy bag.",
    afk: "Ardougne knights with the diary.",
    fast: "Elves or vyres as the live page ranks them.",
    watch: "Stun. Food. The knight is not a PvP fight.",
    page: "Thieving",
  },
  crafting: {
    early: "1–40 leather and jewellery you can sell.",
    mid: "Glass. Gold. Green through black hide.",
    late: "Blowglass and the staff the page ranks. 99 is a bank, not a flex.",
    wear: "Needle. Crafting cape later. No combat set required.",
    afk: "Seaweed and sand. Then the jewellery the page names.",
    fast: "Battlestaves and dragonhide as ranked.",
    watch: "Gold at the furnace is the old hour.",
    page: "Crafting",
  },
  fletching: {
    early: "1–40 shafts and shortbows.",
    mid: "Broads on the slayer ring hour. Maple through magic.",
    late: "Darts if the tips exist. Dragon only if the money is a joke.",
    wear: "Knife. Bank. Clothes do not matter.",
    afk: "Broad arrows. Darts if you have the tips.",
    fast: "The tip the wiki ranks.",
    watch: "Stringing is not automatically the fast room.",
    page: "Fletching",
  },
  slayer: {
    early: "Turael only to unlock the skill and finish a streak you intend to break. Mazchna and Vannaka are the first real lists. Buy the helm as soon as it exists. Broad bolts and a cannon unlock are the mid-early purchases that actually pay. Block list starts empty on purpose — you do not know your hates yet.",
    mid: "Chaeldar through Nieve or Steve. Cannon every task the assignment allows. Burst the dusts and the nechryael when the level and the spellbook are there. Konar is brimstone and a location lock. Take her when you want the chest, not when you want the fastest 99.",
    late: "Duradel. Skip list on the wiki. Burst and barrage the assignments that still say so. Boss tasks are Bosses pages, not a training paragraph. 99 Slayer is a skip sheet and a prayer, not a secret monster.",
    wear: "Slayer helm on task. The combat style the monster is weak to. Face cover the bestiary already named — nose peg, earmuffs, witchwood, elemental shield. Cannon in the rooms that allow it. Protect the prayer that matches the hit.",
    afk: "The task you can cannon or leave on a crab-like monster. Afk slayer still needs a check on the timer.",
    fast: "Burst and barrage assignments. Skip what the live page skips. Do not farm a slow task because a streamer liked the drop table in 2019.",
    watch: "Wrong helm. Wrong prayer. Bare-faced spectre. That is the wipe. The monster page owns the finish mechanic.",
    page: "Slayer",
  },
  hunter: {
    early: "1–40 birds and kebbits. Gloves when the page says gloves.",
    mid: "Birdhouses on a timer. Salamanders. Drift net if you like the fossil.",
    late: "Herbiboar. Red chins. Black chins only with a bag you will laugh off.",
    wear: "Camouflage if you have it. Graceful is fine. Protect item in the PK grounds.",
    afk: "Birdhouses on Fossil Island.",
    fast: "Herbiboar or chinchompas.",
    watch: "Black chins are a wildy tax.",
    page: "Hunter",
  },
  mining: {
    early: "1–30 copper, tin, iron. The pick matches the level. Quests help. Do not sit on runite at 40 because a video thumbnail said so.",
    mid: "Motherlode is the afk room with pay-dirt and a cleaner. Granite is the tick room if you want to click. Stars are a world-event. Gem rocks if you like the chance. All of these are on the live page — rates move.",
    late: "Amethyst at 92. The rock the wiki currently ranks for raw XP. 3-tick granite is a VOD habit, not a requirement. Mining guild and the expert mining gloves matter if you own them.",
    wear: "Best pick you can use. Prospector if you own the set. Celestial ring later. No slayer helm required on a rock.",
    afk: "Motherlode. Stars when they are up. Amethyst when the level is there.",
    fast: "The rock the wiki ranks for the tick this month. Confirm it. A blog will sell you last year’s tick.",
    watch: "A pick you cannot replace is not a method. The belt in the Foundry is Smithing.",
    page: "Mining",
  },
  smithing: {
    early: "1–40 the bars you already mined.",
    mid: "Giants’ Foundry. Blast Furnace gold if you can stand the heat.",
    late: "The bar the page ranks. Platebodies only for the diary.",
    wear: "Ice gloves. Coal bag. Goldsmith gauntlets for gold. Apron is flavour.",
    afk: "Giants’ Foundry.",
    fast: "Blast Furnace bars the page still ranks.",
    watch: "The belt is the wipe.",
    page: "Smithing",
  },
  fishing: {
    early: "1–40 shrimp through lobster. Fly fishing if you want the tick.",
    mid: "Barbarian. Aerial. Tempoross for the crate.",
    late: "Minnows or the fish the wiki ranks. Angler is the outfit.",
    wear: "Best rod. Angler when you have it. No max melee on the dock.",
    afk: "Barbarian. Tempoross.",
    fast: "Minnows or the fish the wiki ranks.",
    watch: "A shark you cannot cook is a bank tab.",
    page: "Fishing",
  },
  cooking: {
    early: "1–40 the fish you already caught.",
    mid: "Karambwans. Hosidius if the diary is done.",
    late: "The same fish. Wines if the stack is already there.",
    wear: "Cooking gauntlets. Hosidius range. Clothes do not matter.",
    afk: "Karambwans on the range that does not burn.",
    fast: "The same fish.",
    watch: "Burning is the wipe. The diary is the fix.",
    page: "Cooking",
  },
  firemaking: {
    early: "1–50 the logs you already cut.",
    mid: "Wintertodt as soon as you can stand the cold.",
    late: "The same winter. Forestry if the event is the hour.",
    wear: "Warm clothing. Axe. Food. No infernal cape required.",
    afk: "Wintertodt. Forestry if the event is the hour.",
    fast: "The same winter.",
    watch: "Warmth. Bruma. Leaving the fire is the wipe.",
    page: "Firemaking",
  },
  woodcutting: {
    early: "1–30 trees you can click twice.",
    mid: "Willows through teak. Fossil Island.",
    late: "Redwoods. Forestry. Sulliusceps if you like the island.",
    wear: "Best axe. Lumberjack if you own it. No combat set required.",
    afk: "Forestry or redwoods.",
    fast: "The tree the wiki ranks.",
    watch: "A felling axe you cannot drop is not a method.",
    page: "Woodcutting",
  },
  farming: {
    early: "1–30 hops and allotments. Compost from the start.",
    mid: "Fruit and hardwoods. Guild contracts.",
    late: "Tree runs. Tithe if you want the room. The herb the page ranks.",
    wear: "Magic secateurs. Bottomless bucket. Outfit if you own it.",
    afk: "Hardwoods and fruit. Contracts in the guild.",
    fast: "Tithe. Tree runs.",
    watch: "Payment. Compost. A dead tree is the wipe.",
    page: "Farming",
  },
  sailing: {
    early: "Sailing is live. Pandemonium is the door. After that the wiki names courier tasks, bounty tasks, charting, shipwreck salvage, Barracuda Trials, and deep sea trawling. Do not paste a 2012 fishing hour onto a boat.",
    mid: "Crew and hull as the current training page lists them. Charting is map work. Salvage is a timer. Trials are a room. Pick the one you can repeat without tilting.",
    late: "The late sheet moves. Confirm the current Old School Sailing training page before you buy a hull you cannot dock. If a method is not on the wiki this week, it is not a method.",
    wear: "Whatever the Sailing page lists for that task. Not a slayer helm. Not a max melee set on a deck.",
    afk: "Salvage and the tasks you can leave on a heading. The live page owns which one is actually afk.",
    fast: "Trials or the task the training page currently ranks. Confirm it.",
    watch: "This skill is new enough that a blog will lie. Wiki wins.",
    page: "Sailing",
  },
};

const RS3_NOTE: Record<string, Note> = {
  attack: {
    early: "1–40. Revolution on cows if you must, then a task. T40 weapon.",
    mid: "60–80. The style the monster is weak to. T70–80 weapon.",
    late: "90+. T90–95 as you own it. Boss rooms stay on Bosses.",
    wear: "One bar. Slayer helm on task. Perks on the piece you will keep.",
    afk: "Revolution on a task you already take.",
    fast: "Slayer in the style that kills.",
    watch: "Do not paste an Old School freeze paragraph here.",
    page: "Attack",
  },
  strength: {
    early: "Same task as Attack.",
    mid: "The same bar. Strength is the hit.",
    late: "The weapon Attack already unlocked.",
    wear: "Same as Attack. Do not buy a second set.",
    afk: "Same task.",
    fast: "The assignment that dies to melee.",
    watch: "Camp vs switch is one bar.",
    page: "Strength",
  },
  defence: {
    early: "Tank the same hour. T40 armour.",
    mid: "T70 tank. Prayer that matches the hit.",
    late: "T90 tank on the piece you will keep. Perks.",
    wear: "Armour for the style that hits you. Devotion is a button, not a flex.",
    afk: "Tank the same hour.",
    fast: "Slayer in the gear you will keep.",
    watch: "Death cost is PvM grammar. Wildy is opt-in.",
    page: "Defence",
  },
  ranged: {
    early: "T40 bow or the thrown the page names.",
    mid: "T70–80. Weakness combat.",
    late: "T90–95. Chins only if the room is yours.",
    wear: "Ava analogue if you have it. Helm on task. Perks on the bow you keep.",
    afk: "A task you can revolution.",
    fast: "The style the monster is weak to.",
    watch: "Ascension commanders stay on Bosses.",
    page: "Ranged",
  },
  prayer: {
    early: "Bones on any altar. Unlock the protection prayers.",
    mid: "Curses when the level is there. Gilded or the chapel you own.",
    late: "The curse the PvM sheet names. Soulsplit is a room, not a flex.",
    wear: "Vestment if you have it. Keep-clicks are PvP, not this hour.",
    afk: "Bones you can buy again.",
    fast: "The altar the page ranks.",
    watch: "Powder and sharks are PvP keep-clicks.",
    page: "Prayer",
  },
  magic: {
    early: "Strike and the first abilities. Revolution.",
    mid: "The spellbook the dungeon wants. Sunshine later.",
    late: "The ability line the wiki ranks. Death skulls are PvM sentences.",
    wear: "Magic tank. Helm on task. Perks on the staff you keep.",
    afk: "Revolution magic on a weak target.",
    fast: "The spell the wiki ranks for the task.",
    watch: "Ability lock. Wrong book.",
    page: "Magic",
  },
  runecraft: {
    early: "Runespan. Essence you already have.",
    mid: "Abyss trips. The rune the page names.",
    late: "Necro runes if that sheet still pays. Ourania analogue if live.",
    wear: "Pouches. Outfit if you own it.",
    afk: "The Runespan. The abyss if you want a trip.",
    fast: "The rune the live page ranks.",
    watch: "Empty pouches are the wipe.",
    page: "Runecrafting",
  },
  construction: {
    early: "Oak if you must. Fort frames when the fort stands.",
    mid: "The furniture the wiki ranks. Servant.",
    late: "Mahogany and the Fort hour. Max house is the sink.",
    wear: "Crystal saw analogue. Planks. Clothes do not matter.",
    afk: "Mahogany Homes if it exists on this client. Fort frames.",
    fast: "The furniture the wiki ranks.",
    watch: "Planks first.",
    page: "Construction",
  },
  constitution: {
    early: "Follows every hit.",
    mid: "The same slayer hour.",
    late: "99 or 120 happens in combat.",
    wear: "Whatever the task asked.",
    afk: "Combat you already do.",
    fast: "The same slayer hour.",
    watch: "Hitpoints is the Old School name.",
    page: "Constitution",
  },
  agility: {
    early: "Gnome and the first rooftops.",
    mid: "The course you fail less. Anachronia if that is the hour.",
    late: "Hefin in Prif. Silverhawks if you already own the hour.",
    wear: "The outfit if you own it. No max tank required.",
    afk: "The course you fail less.",
    fast: "The course the wiki ranks. Silverhawks if owned.",
    watch: "A course you fail is not efficient.",
    page: "Agility",
  },
  herblore: {
    early: "The potions you will drink.",
    mid: "Prayer and restore. Contracts.",
    late: "The 120 sheet. Portables if they stand.",
    wear: "Factory outfit if you own it. Secondaries first.",
    afk: "Contracts and grimy from the patch.",
    fast: "The potion the page ranks.",
    watch: "A 120 herb hour is not an Old School paste.",
    page: "Herblore",
  },
  thieving: {
    early: "Stalls. Men. The first safe.",
    mid: "Prif or the stall the diary unlocked.",
    late: "Elves, vyres, or the safe the wiki ranks.",
    wear: "Light fingers. Food. No wildy bag.",
    afk: "Prif or the stall the diary unlocked.",
    fast: "Elves, vyres, or the safe the wiki ranks.",
    watch: "Stun. The knight is not a PvP fight.",
    page: "Thieving",
  },
  crafting: {
    early: "Leather and jewellery.",
    mid: "Urns or glass if the page still names them.",
    late: "The hide or the jewellery the live sheet ranks.",
    wear: "Portable crafter if it stands. Clothes do not matter.",
    afk: "Urns or glass.",
    fast: "The hide or jewellery the live sheet ranks.",
    watch: "Confirm the portable is live.",
    page: "Crafting",
  },
  fletching: {
    early: "Shafts and shortbows.",
    mid: "Broads on a slayer hour.",
    late: "The tip the wiki ranks. Invention later eats the junk.",
    wear: "Knife. Bank.",
    afk: "Broads. Staves if you have the logs.",
    fast: "The tip the wiki ranks.",
    watch: "Stringing is not automatically the fast room.",
    page: "Fletching",
  },
  slayer: {
    early: "The first masters. Unlock the helm.",
    mid: "Laniakea when the list is yours. Revolution the task.",
    late: "The assignment the page ranks. 120 is a sheet, not a flex.",
    wear: "Helm. Weakness style. Face cover the bestiary named.",
    afk: "The task you can revolution.",
    fast: "The assignment the page ranks. Skip list on the wiki.",
    watch: "Ripper and edimmu stay on the bestiary.",
    page: "Slayer",
  },
  hunter: {
    early: "Birds and the first traps.",
    mid: "Box trap you can leave. Big game if the island is the hour.",
    late: "The creature the wiki ranks. Charming moths if that sheet still pays.",
    wear: "Outfit if you own it. Anachronia is a map.",
    afk: "The box trap you can leave.",
    fast: "The creature the wiki ranks.",
    watch: "Confirm the live method.",
    page: "Hunter",
  },
  mining: {
    early: "The first rocks. The rework owns the pick.",
    mid: "The rock the rework still calls afk. Seren stones if they remain.",
    late: "Concentrated if that is the hour. The tick the wiki ranks.",
    wear: "Best pick. Outfit if you own it. Do not paste Motherlode here.",
    afk: "The rock the rework still calls afk.",
    fast: "The tick the wiki ranks.",
    watch: "The mining-smithing rework is this client.",
    page: "Mining",
  },
  smithing: {
    early: "The bars you already mined.",
    mid: "The furnace the rework named.",
    late: "Burial if the page still pays. Progress the wiki ranks.",
    wear: "The hammer the rework named. Outfit if you own it.",
    afk: "The furnace the rework named.",
    fast: "The bar and the progress the wiki ranks.",
    watch: "Blast Furnace is Old School.",
    page: "Smithing",
  },
  fishing: {
    early: "The first spots.",
    mid: "The swarm or the spot the page calls afk. Menaphos if that is still a room.",
    late: "The fish the wiki ranks. Urns if they still tag.",
    wear: "Best rod. Outfit if you own it.",
    afk: "The swarm or the afk spot.",
    fast: "The fish the wiki ranks.",
    watch: "A shark you cannot cook is a bank tab.",
    page: "Fishing",
  },
  cooking: {
    early: "The fish you already caught.",
    mid: "The range that does not burn. Portables if they stand.",
    late: "The same fish. Wines if the stack is there.",
    wear: "Gauntlets if this client still has them. Portable range if live.",
    afk: "The range that does not burn.",
    fast: "The fish you already caught.",
    watch: "Burning is the wipe.",
    page: "Cooking",
  },
  firemaking: {
    early: "The logs you already cut.",
    mid: "The line or the portable the page names.",
    late: "The log the wiki ranks. Bonfires if that is still the hour.",
    wear: "No Wintertodt coat. That is the other client.",
    afk: "The line or the portable the page names.",
    fast: "The log the wiki ranks.",
    watch: "Wintertodt is Old School.",
    page: "Firemaking",
  },
  woodcutting: {
    early: "The first trees.",
    mid: "The tree you can leave. Crystal or acadia if named.",
    late: "The tick the wiki ranks. Imcando if you own the axe.",
    wear: "Best axe. Outfit if you own it.",
    afk: "The tree you can leave.",
    fast: "The tick the wiki ranks.",
    watch: "Forestry is the other client.",
    page: "Woodcutting",
  },
  farming: {
    early: "Allotments. Compost from the start.",
    mid: "Fruit and hardwoods. Fort patch if it stands.",
    late: "Tree runs. The herb the 120 sheet ranks.",
    wear: "Secateurs. Outfit if you own it.",
    afk: "Hardwoods and fruit.",
    fast: "Tree runs. The 120 herb sheet.",
    watch: "A dead tree is the wipe.",
    page: "Farming",
  },
  summoning: {
    early: "Gold charms. The first pouches.",
    mid: "Green and crimson from the task you already take.",
    late: "The pouch the wiki ranks. Howl and the special you will actually use.",
    wear: "Pouch. Obelisk. Shards first. No slayer helm required.",
    afk: "Charms from the task you already take.",
    fast: "The pouch the wiki ranks.",
    watch: "This skill is RuneScape-only.",
    page: "Summoning",
  },
  dungeoneering: {
    early: "Floored complexity you can finish. Solo if you must.",
    mid: "5:5 when the team exists. Sinkholes if live.",
    late: "The floor the page ranks. 120 is a sheet.",
    wear: "The bound weapons the dungeon gave you. Leave the overworld max set.",
    afk: "Floors you can clear.",
    fast: "The floor the page ranks. Sinkholes if they are live.",
    watch: "A wipe on 5:5 is a reset, not a method.",
    page: "Dungeoneering",
  },
  divination: {
    early: "The first colony. Caches when they spawn.",
    mid: "The colony you can stand. Chronicle if that fragment still pays.",
    late: "The colony the wiki ranks. Energy first.",
    wear: "Outfit if you own it. No combat set required.",
    afk: "Caches on the timer. Wisps at the colony.",
    fast: "The colony the wiki ranks.",
    watch: "A colony you cannot reach is not a method.",
    page: "Divination",
  },
  invention: {
    early: "Invention unlocks after the three skills the page names sit high enough to pass the tutorial. Then you discover, you disassemble junk, and you augment the first tool you will actually use. Do not augment a scim you will throw away tomorrow.",
    mid: "Combat-train an augmented weapon you already fight with, then siphon or disassemble at the item level the wiki ranks. Skilling tools work if you already cut or mine. Blueprints first. A machine you cannot fuel is furniture.",
    late: "The machine and the item-level loop the training page still ranks. 120 is a sheet. Precise and the weapon perk you will keep beat a bank of unused gizmos.",
    wear: "The augmented gear you already fight or gather in. Do not invent a second bank tab named Invention.",
    afk: "Disassemble the junk you already make. Siphon the weapon you already swing.",
    fast: "Combat XP on an augmented piece, then the disassemble or siphon the page names. Discoveries first.",
    watch: "Augment the piece you will keep. A t70 you delete at 12 is a cost, not a flex.",
    page: "Invention",
  },
  archaeology: {
    early: "The first tutor and the first site. Restoration at the bench is half the skill. Precision and soil are the mechanics. A cracked artefact is a waste of the hour you already dug.",
    mid: "The cache and the collection the wiki ranks. Tetracompasses when that loop is live. Research is not optional flavour — it unlocks the next site.",
    late: "120 is a sheet. The rare excavation the page names. Do not paste a mining tick here. This is a restoration skill with a mattock.",
    wear: "Best mattock. Outfit if you own it. Precision, not a scimitar.",
    afk: "The dig site you can leave on a hotspot that lasts.",
    fast: "The cache and the restoration loop the wiki ranks.",
    watch: "A cracked artefact is the wipe. Confirm the live collection.",
    page: "Archaeology",
  },
  necromancy: {
    early: "Necromancy trains two ways: rituals in the City of Um, and combat on undead. Early levels mix lesser communion-style rituals with the first Kili upgrades. Death guard and skull lantern climb in tiers. Do not skip the talent souls the rituals print — combat wants them.",
    mid: "Kili tasks step the gear every chunk of levels. Deathwarden or deathdealer as the page names the tank versus power split. Combat on the undead the training page lists. Quests at this bracket have real skill gates — Construction, Slayer, Archaeology — confirm before you walk in.",
    late: "The wiki still ranks active rituals as the fast 90–120 hour, combat as the slower afk hour. Multiply glyphs and the necklace the page names if those remain live. Rasial and the other necro bosses stay on Bosses.",
    wear: "Necro weapon and armour of the tier Kili last unlocked. This is a style. Perks from Invention sit on the piece you will keep. Hybrid tank early if you cannot eat the room yet.",
    afk: "Combat on high-life undead the page names. Rituals are not afk if disturbances are the XP.",
    fast: "Rituals with the current glyph setup on the training page. Then the task.",
    watch: "Boss rooms stay on Bosses. A 2012 magic paste does not apply.",
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
    const train = osrs ? osrsWiki(`Pay-to-play_${page}_training`) : rs3Wiki(`${page}_training`);
    return {
      skill,
      slug: skill.id,
      afk: note?.afk ?? "Quiet on this ditch. Confirm the live wiki.",
      fast: note?.fast ?? "The live training page owns the hour.",
      watch: note?.watch ?? "Wiki wins on numbers.",
      early: note?.early ?? "Start where the training page starts.",
      mid: note?.mid ?? "The mid sheet is on the wiki.",
      late: note?.late ?? "The late sheet is on the wiki.",
      wear: note?.wear ?? "Wear what the room asked. Confirm the live page.",
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
  const name =
    row.skill.name === "Hitpoints" ? "Constitution" : row.skill.name === "Constitution" ? "Hitpoints" : row.skill.name;
  return SKILL_GUIDES.find((item) => item.skill.editions.includes(other) && item.skill.name === name);
}
