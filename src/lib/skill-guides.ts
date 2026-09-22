import { SKILLS, type Skill } from "./skills";

export type SkillBand = {
  band: string;
  method: string;
  place: string;
  click: string;
  leave: string;
};

export type SkillGuide = {
  skill: Skill;
  slug: string;
  hook: string;
  tagline: string;
  deck: string;
  unlock: string;
  route: SkillBand[];
  inventory: string;
  money: string;
  iron: string;
  kit: string;
  mistakes: string;
  stop: string;
  wiki: string;
  train: string;
  moving?: boolean;
};

type Note = {
  tagline: string;
  deck?: string;
  need: string;
  money: string;
  early: string;
  mid: string;
  late: string;
  wear: string;
  afk: string;
  fast: string;
  watch: string;
  route?: SkillBand[];
  inventory?: string;
  iron?: string;
  stop?: string;
  mistakes?: string;
  page: string;
  train?: string;
  wikiPage?: string;
  moving?: boolean;
};

function osrsWiki(page: string) {
  return `https://oldschool.runescape.wiki/w/${page}`;
}
function rs3Wiki(page: string) {
  return `https://runescape.wiki/w/${page}`;
}

const OSRS_NOTE: Record<string, Note> = {
  attack: {
    tagline: "Melee accuracy. Crabs early. Slayer after that.",
    need: "None to start. Dragon scimitar wants Monkey Madness I. Whip wants 70 Slayer and Abyssal demons.",
    money: "Early crabs cost nothing. A whip and slayer gear cost. Slayer loot pays some of it back.",
    early: "1–60 on ammonite crabs or experiments. Keep a cheap scimitar on task.",
    mid: "60–85 on Slayer. Use the best scimitar or hasta you can afford. Do not camp one monster for extra Attack XP if you still need the slayer level.",
    late: "85–99 on Slayer and the slayer monster the wiki ranks. Special attacks and prayer do more than a new scimitar skin.",
    wear: "Slayer helm on task. Strength bonus over fashion. Bring food you will actually eat.",
    afk: "Sand crabs / ammonite crabs. Not 99-speed.",
    fast: "Slayer with cannon where the task allows. Confirm cannon tasks on the wiki.",
    watch: "Buying a whip before you have the slayer level. Training Attack alone when Strength is 20 behind.",
    page: "Attack",
    train: "Pay-to-play_Melee_training",
  },
  strength: {
    tagline: "Melee damage. Train it with Attack on the same task.",
    need: "Same unlocks as Attack.",
    money: "Same as Attack. Strength bonus is the upgrade that lands the hits.",
    early: "1–60 crabs. Controlled or strength-only if Attack is already ahead.",
    mid: "Slayer. Keep Attack and Strength within about 10 levels.",
    late: "Slayer and the same late melee spots as Attack.",
    wear: "Strength bonus. Slayer helm on task.",
    afk: "Crabs.",
    fast: "Slayer + cannon on legal tasks.",
    watch: "99 Strength with 60 Attack. The accuracy check fails first.",
    page: "Strength",
    train: "Pay-to-play_Melee_training",
  },
  defence: {
    tagline: "Melee defence. Wear the armour the monster hits through.",
    need: "Barrows gloves and a fighter torso help. They are not required to click the skill.",
    money: "Armour is the cost. Defence XP is mostly free on Slayer.",
    early: "Same crabs. Defence XP comes on shared combat.",
    mid: "Slayer in rune / barrows / bandos you can afford. Do not sit in bronze to feel more XP.",
    late: "Slayer and raids prep. Defence is the skill that keeps the trip alive.",
    wear: "Best defensive armour you can repair. Slayer helm on task.",
    afk: "Crabs.",
    fast: "Slayer.",
    watch: "Naked crabs for a screenshot. You will die on the next task.",
    page: "Defence",
    train: "Pay-to-play_Melee_training",
  },
  ranged: {
    tagline: "Distance damage. Ammo is the cost. Chin only your own world.",
    need: "Bone crossbow / MSBI early. Blowpipe wants Zulrah. Bow of faerdhinen wants Gauntlet.",
    money: "Ammo and scales are the tax. Chinning is a cash method, not a free one.",
    early: "1–45 cows, ranged guild, or slayer. Cheap knives or a bone crossbow.",
    mid: "45–75 slayer with MSBI or a crossbow you can afford. Cannon on tasks that allow it.",
    late: "75–99 chinchompas at the maniacal monkeys or skeletal monkeys if you paid for the chins. Blowpipe on slayer if scales are funded.",
    wear: "Ava’s device. Blessed d’hide. Slayer helm on task. Necklace of anguish if you own it.",
    afk: "Crabs with a cheap bow. Slow.",
    fast: "Chinning. Confirm the live wiki for the current spot and prayer.",
    watch: "Chinning a crowded world. Buying a blowpipe with no scale budget.",
    page: "Ranged",
    train: "Pay-to-play_Ranged_training",
  },
  prayer: {
    tagline: "Bones on a gilded or chaos altar. Protect inventory.",
    deck: "Prayer is the protection and the piety you take into a fight. This sheet is Old School. A main can buy bones. An iron buries what they killed.",
    need: "The Restless Ghost and Priest in Peril open the early path. A gilded altar is a player-owned house with both burners lit. The chaos altar is level 38 Wilderness. Piety wants 70 Prayer and the King’s Ransom line. Rigour and Augury want their scrolls on top of the prayer level.",
    money: "A gilded altar is the XP hour you can buy: dragon bones, then superior dragon bones. The chaos altar saves bones and can take the bag, so it is not a gp hour. Ensouled heads are a third bill if you already have the Arceuus spell. Wiki for this month’s gp/XP. Stop buying superiors when the next boss you want only needed piety.",
    early: "1–43. Quests, then big bones on any altar.",
    mid: "43–70. Dragon bones, gilded, two burners.",
    late: "70–99. Superiors, or the chaos altar if you accept the PKer.",
    wear: "Gilded: nothing that matters. Wilderness: monk robes or black d’hide you can lose, a one-click teleport, protect item.",
    afk: "None.",
    fast: "Chaos altar or a gilded altar with both burners and a runner.",
    watch: "Chaos altar with a cash stack. Gilded with the burners out. Buying 99 before piety.",
    route: [
      {
        band: "1–43",
        method: "Quest XP first, then the cheapest bone you will actually offer. Big bones are enough. Dragon bones at this level are a main showing off.",
        place: "Any altar. Lumbridge or Edgeville is fine. You are not in the Wilderness yet.",
        click: "One bone, one offer. This is a click, not an afk.",
        leave: "Leave when protection prayers are unlocked. That is the point of this band. Do not sit here to 70.",
      },
      {
        band: "43–70",
        method: "Dragon bones on a gilded altar. Both burners lit. A friend’s house counts if yours has no burners. This is the default, not a failure.",
        place: "A player-owned house. Light the burners with clean marrentill. Unnote bones at the nearby bank or with a servant if you use one.",
        click: "Offer, offer, offer. A runner makes it a main’s hour. Without a runner it is still the right altar.",
        leave: "Leave at 70 if piety is what you came for. Stay only if the next boss wants a higher prayer.",
      },
      {
        band: "70–77",
        method: "Superior dragon bones on the same gilded altar, or the bone the wiki ranks this month. Rigour is 74 plus the scroll. Augury is 77 plus its scroll. The bone does not unlock the scroll.",
        place: "Same house. Do not move this band to the Wilderness unless you have decided the risk is the method.",
        click: "Same offer click. Burners still have to be lit. An unlit gilded altar is a worse altar.",
        leave: "Leave when the prayer the boss wants is on. 77 is enough for almost every account that has a raid to do.",
      },
      {
        band: "Chaos altar",
        method: "The same bones, offered at the chaos altar, because half of them can be saved. You accept that a PKer can take the rest.",
        place: "Level 38 Wilderness. Burning amulet to the lava maze, then the run. A teleport you will actually click.",
        click: "Offer until the inventory is thin, then leave. Do not finish a full inventory because the last bone feels expensive.",
        leave: "Leave the moment someone shows up, or when the bag is the one you will not laugh off. This is not the gilded kit.",
      },
    ],
    inventory:
      "Gilded: unnoted dragon or superior bones, clean marrentill for the burners, a house teleport, a rune pouch only if you are lighting your own. Chaos: the same bones, a burning amulet, one teleport, protect item, no cash stack, no rune stack, no spare gear. Never bring the bank. Noted bones do not go on the altar.",
    iron: "You do not buy the bone pile. Slayer and the dragons you can kill are the supply. Use a gilded altar when you have a house and the bones. Use the chaos altar only for a bag you already decided to risk. Ectofuntus is the slow iron path if you will not enter the Wilderness. Do not copy a main’s superior-dragon shopping list.",
    stop: "43 is protection prayers. 70 is piety. 74 and 77 are rigour and augury if you own the scrolls. 99 is a cape. Most accounts with a boss to kill are done at 70 or 77.",
    mistakes:
      "The chaos altar with a full bank tab. A gilded altar with both burners out. Buying 99 prayer before the account has piety, then calling the leftover bones a plan.",
    page: "Prayer",
  },
  magic: {
    tagline: "Burst and barrage for XP. Auto-cast is not the grind.",
    need: "Desert Treasure for Ancients. Ice Burst 70. Ice Barrage 94. Runes are the cost.",
    money: "Bursting and barraging cost runes. Splashing is dead as a real method.",
    early: "1–55 quests, wind/water blast on slayer, or alchemy if you already have the items.",
    mid: "55–70 slayer casts. 70–94 Ice Burst on dust devils / ancients slayer or the monkey spot if you paid for it.",
    late: "Ice Barrage on the same spots. Thralls if you unlocked Arceuus and they fit the task.",
    wear: "Void or ahrim / ancestral you can afford. Occult necklace. Slayer helm on task.",
    afk: "Alching is the only real afk. It is not 99-speed.",
    fast: "Barrage. Confirm runes and the current cannon/burst spot on the wiki.",
    watch: "Bursting with no prayer and no food. Buying ancestral before 94.",
    page: "Magic",
    train: "Pay-to-play_Magic_training",
  },
  runecraft: {
    tagline: "Essence and pouches to the altar. Guardians of the Rift if you want a minigame.",
    need: "Rune Mysteries. Lost City for cosmic. Hero’s Quest for death. Mourning’s End Part II for death/blood access as designed. Pouches from the Abyss.",
    money: "Lava runes can pay. Bloods and souls can pay. Guardians of the Rift is XP first.",
    early: "1–23 quests and airs. Get the small pouch as soon as the Abyss is open.",
    mid: "23–77 lavas with Magic Imbue, or GOTR for a mix of XP and talismans.",
    late: "77+ bloods. 90+ souls. GOTR if you still want the outfit and the calmer click.",
    wear: "Raiments of the Eye if you have them. Abyss cape / slayer ring for the trip. Stamina.",
    afk: "GOTR is closer to a minigame than afk. ZMI is clicky.",
    fast: "Lava runes or the blood/soul method the wiki ranks this month.",
    watch: "Ourania with no pouch. Abyss with no food and a full cash stack.",
    page: "Runecraft",
  },
  construction: {
    tagline: "Planks on a workbench. Mahogany Homes if you want calmer XP.",
    need: "1 Construction to start. Servant and oak larders come mid. Mythical cape space wants Dragon Slayer II.",
    money: "This skill buys XP. Oak and mahogany planks are the bill. Mahogany Homes costs less XP/hour and less cash.",
    early: "1–33 cheap planks and quests. Build the workshop.",
    mid: "33–52 oak larders. 52–74 mahogany tables or Homes contracts.",
    late: "74–99 mahogany or teak homes, or the bench the wiki ranks. Cape rack / mythics if you own the cape.",
    wear: "Carpenter’s outfit if you have it. Crystal saw. Servant.",
    afk: "Not afk. Homes is slower and kinder.",
    fast: "Mahogany tables / the current bench method. Wiki for gp/XP.",
    watch: "Building without a servant. Buying mahogany at 40 Construction.",
    page: "Construction",
  },
  hitpoints: {
    tagline: "Comes free on Slayer and combat. Food is the only plan.",
    need: "None.",
    money: "Food is the cost. Hitpoints has no separate shop.",
    early: "Train combat. Do not sit on a dummy for Hitpoints.",
    mid: "Train combat. Hitpoints follows the task.",
    late: "Train combat. Do not sit on a dummy for Hitpoints.",
    wear: "Same as the combat style you clicked.",
    afk: "Crabs.",
    fast: "Slayer.",
    watch: "A Hitpoints-only lamp plan with no food budget for the next task.",
    page: "Hitpoints",
    train: "Hitpoints",
  },
  agility: {
    tagline: "Rooftops until 62. Hallowed Sepulchre after that.",
    need: "None to start. Graceful is the outfit. Sepulchre wants 52 for floor 1, 62 for the XP people mean.",
    money: "Marks of grace buy amylase. Sepulchre can pay. The skill itself is time.",
    early: "1–60 rooftops. Canifis at 40. Seers with hard diary.",
    mid: "60–72 rooftops or Sepulchre floor 1–2.",
    late: "72–99 Hallowed Sepulchre. Ardougne rooftop if you want the diary pet chance and a simpler click.",
    wear: "Graceful. Stamina. Hallowed rings / graceful recolour later.",
    afk: "Not afk.",
    fast: "Sepulchre. Confirm floor level on the wiki.",
    watch: "Sepulchre at 52 calling it the 99 method. Brimhaven tickets with no tokens plan.",
    page: "Agility",
  },
  herblore: {
    tagline: "Secondaries first. Mix the potion you will drink or sell.",
    need: "Druidic Ritual. Grim Tales helps. Diary lamps help. Amulet of chemistry is a drop. Mastering Mixology is a minigame — confirm it is still listed on the training page.",
    money: "Secondaries first. Herbs from Farming runs pay this skill. A stack you cannot afford is not a method.",
    early: "1–55 attack, strength, energy potions you will drink. Guam through ranarr. Do not clean herbs as the whole plan.",
    mid: "Prayer potions, super attack, super strength, super restore. Farming Guild contracts pay grimy. Serum and stamina if you will use them.",
    late: "Saradomin brew, forgotten brew, super combat, and the potion the wiki ranks this month. Mixology if that minigame is live.",
    wear: "Amulet of chemistry if you own it. Banked secondaries. Clothes do not matter.",
    afk: "Contracts and grimy you already farm. Cleaning is not training.",
    fast: "The potion the wiki ranks this month.",
    watch: "Buying 99 worth of herbs with no secondaries. Cleaning 10k grimy as the method.",
    page: "Herblore",
  },
  thieving: {
    tagline: "Knights, then elves. Eat on stun. Do not stand in multi if you are marked.",
    need: "None to start. Elves want Mourning’s End and Song of the Elves access. Ardougne diary helps knights.",
    money: "Knights and elves pay. Pyramid Plunder pays sceptres. Pickpocket in the Wilderness and you donate the loot.",
    early: "1–40 men, bakers, warriors. Quest XP if you have it.",
    mid: "40–85 Ardougne knights with the hard diary. Blackjack Bearded Bandits if you know the click.",
    late: "85–99 elves in Prifddinas. Vyres if you unlocked them and the wiki still ranks them.",
    wear: "Rogue’s outfit for double loot. Dodgy necklace. Food.",
    afk: "Not afk. Knights are clicky.",
    fast: "Elves or the current wiki rank.",
    watch: "Elves with no food. Blackjacking on mobile if you cannot hit the stall.",
    page: "Thieving",
  },
  crafting: {
    tagline: "Molten glass, hides, then battlestaves if you bought the orbs.",
    need: "None to start. Giant Seaweed for glass. Lunar Diplomacy for Superglass Make.",
    money: "Glass and hides often cost. Battlestaves can pay. Do not start 99 on dragonhide you cannot sell.",
    early: "1–40 leather, gold, and quests.",
    mid: "40–77 seaweed glass or green/blue d’hide bodies.",
    late: "77–99 battlestaves, redwood / seaweed glass, or the hide the wiki ranks.",
    wear: "Crafting cape later. Glassblowing pipe. Staff of the dead / slayer ring for banked trips.",
    afk: "Cutting gems is slower afk. Not the 99 route.",
    fast: "Superglass Make + blow, or battlestaves.",
    watch: "Buying 20k black d’hide with no buyer. Glass with no seaweed run.",
    page: "Crafting",
  },
  fletching: {
    tagline: "Broad arrows and darts at the bank. Bows if you cut the logs.",
    need: "Broads want slayer points unlocked. Darts want the Smithing/Fletching diary or the dart mould path — confirm on wiki.",
    money: "Broads cost. Stringing yews/magics can pay. Fletching is usually a bank skill.",
    early: "1–52 arrow shafts and shortbows.",
    mid: "52–75 maple / yew longs or broads when unlocked.",
    late: "Broad arrows, dragon/amethyst darts, or magic longs.",
    wear: "None that changes the click. Bank preset.",
    afk: "Stringing bows. Slow.",
    fast: "Darts or broads.",
    watch: "Broads before the slayer unlock. 99 on unstrung bows you will never string.",
    page: "Fletching",
  },
  slayer: {
    tagline: "The task on the board. Skip list lives on the wiki.",
    need: "1 Slayer. Fairytale / desert / fremennik unlocks change the list. Boss tasks want the slayer level and the kill count.",
    money: "This is the paying combat skill if the skip list is correct. Bad tasks burn time.",
    early: "1–50 Turael only if you need points. Mazchna / Vannaka after that.",
    mid: "50–85 Nieve/Steve or Konar if you want the brimstone.",
    late: "85–99 Duradel or Konar. Laniakea is RuneScape — do not put her here.",
    wear: "Slayer helm. Cannon where legal. Protection prayer the monster needs.",
    afk: "Some tasks (nechs, dusts with prayer). Not the whole 99.",
    fast: "Block list + cannon + barrage tasks. Wiki skip table.",
    watch: "Turael boosting at 80 Slayer as the whole plan. Konar every task with no points.",
    page: "Slayer",
  },
  hunter: {
    tagline: "Birdhouse runs on a timer. Chinchompas only on a world you can hold.",
    need: "None to start. Birdhouses want Fossil Island. Red chins want 63. Black chins are Wilderness.",
    money: "Birdhouses pay nests. Chins pay if you keep the world.",
    early: "1–9 quests / crimson swifts. 9–46 birdhouses plus cheap traps.",
    mid: "46–63 falconry or birdhouses. 63 red chins.",
    late: "73+ black chins if you accept Wilderness. Herbiboar at 80 for herblore secondaries.",
    wear: "Camouflage if you have it. Black chins: cheap gear.",
    afk: "Birdhouses are a timer, not a camp. Box traps can be semi-afk.",
    fast: "Black chins or the wiki rank.",
    watch: "Black chins in a full cash stack. Birdhouses with no clock.",
    page: "Hunter",
  },
  mining: {
    tagline: "Motherlode Mine, then amethyst or the rock the wiki ranks.",
    deck: "You need ores, the prospector outfit, and amethyst if you want the afk ore. This sheet is Old School. You do not need 99 to go kill a boss.",
    need: "Iron is fine from 15. Motherlode Mine wants 30. The upper floor wants 72. Amethyst wants 92 and expert mining gloves if you want the ore to be worth the time. 3-tick granite wants a rune pick or better and an hour you will actually watch.",
    money: "Motherlode is nuggets plus ores. That is the mixed hour. Amethyst is the gp hour. 3-tick granite is the XP hour and a bad money method. Volcanic Mine can pay if you have a group. Wiki for this month’s ore price. Do not sell a granite hour as a moneymaker.",
    early: "1–30 iron, then Motherlode.",
    mid: "30–92 Motherlode. Pay-dirt is the click.",
    late: "92 amethyst, stars, or 3-tick granite if you will tick.",
    wear: "Prospector. Expert mining gloves at amethyst. Best pick you can use. Celestial ring if you own it.",
    afk: "Amethyst and shooting stars.",
    fast: "3-tick granite only if you will tick.",
    watch: "Powermining iron to 99. Amethyst with no gloves. Stars while calling it efficient.",
    route: [
      {
        band: "1–15",
        method: "Tin and copper, or the quest XP you still have. Doric’s Quest if it is undone. This band exists to get you a pick and a bank.",
        place: "Lumbridge swamp or the Varrock south-east mine. The rock does not matter. The walk back to a bank does.",
        click: "Light. Drop or bank. You are not building a 99 here.",
        leave: "Leave at 15 for iron. Staying on copper is how an hour disappears.",
      },
      {
        band: "15–30",
        method: "Iron. Bank it if you will smith it. Drop it if you only want the level. Start Motherlode the day you hit 30 and buy prospector pieces as the nuggets come.",
        place: "Varrock west mine or Al Kharid. Not a power-iron tile you will still be on at 70.",
        click: "Light. Three rocks, a drop, repeat. This is not a tick method.",
        leave: "Leave at 30. Motherlode is the next door. Iron to 99 is not a personality.",
      },
      {
        band: "30–92",
        method: "Motherlode Mine. Pay-dirt into the hopper, sack when it is full, deposit. The outfit goes on as you can afford the pieces. This is the default, not a failure.",
        place: "Motherlode, upper level once you have 72. A gem bag if you have one. The sack is the loop.",
        click: "Light. You can look away for a vein. You cannot log out and call it mined.",
        leave: "Leave at 92 if you want amethyst or stars. Leave earlier only for a diary requirement you already hit. Volcanic Mine is the group fork, not the replacement.",
      },
      {
        band: "92+",
        method: "Amethyst if you want gp. Shooting stars if you want to leave the keyboard. 3-tick granite only if you will tick for a full hour. Pick one. Do not rotate them to feel busy.",
        place: "Amethyst is the Mining Guild. Stars are wherever the scout is. Granite is the quarry, with a pick that can tick.",
        click: "Amethyst and stars are afk. Granite is a tick. Mixing them in one inventory is how you do none of them.",
        leave: "Leave when the diary or the ammo you wanted is done. 99 is a cape. 92 was the real line.",
      },
    ],
    inventory:
      "Best pick you can use. Prospector, once you have it. A gem bag if you own one. Stamina only if the walk is the waste. At amethyst, expert mining gloves. No second pick, no smithing hammer, no loot from the last trip. The bag is the rock and the way back.",
    iron: "You live on Motherlode longer, because the ores and the coal are the account. Do not buy a granite stack to pretend you are on a main’s XP hour. Amethyst is still the afk ore when you reach it. Prospector is earned here, not bought.",
    stop: "70 to 80 covers most diaries. 92 is the line that changes the hour. 99 is a cape you can get later, after the boss you were mining for.",
    mistakes:
      "Powermining iron to 99 and calling it a plan. Amethyst with no expert gloves. Shooting stars while telling yourself you are being efficient.",
    page: "Mining",
  },
  smithing: {
    tagline: "Giants’ Foundry or Blast Furnace. Coal bag before the grind.",
    need: "Blast Furnace wants The Giant Dwarf for easy access. Giants’ Foundry wants Sleeping Giants. Coal bag from MLM.",
    money: "Foundry and Blast Furnace can pay. Platebodies at a normal furnace usually do not.",
    early: "1–30 quests and bronze/iron. Get to Foundry / BF as soon as you can.",
    mid: "30–70 Blast Furnace steel/mithril or Foundry.",
    late: "70–99 addy/rune at Blast Furnace, or Foundry swords the wiki ranks.",
    wear: "Smiths’ outfit. Ice gloves at BF. Coal bag. Goldsmith gauntlets do not help smithing.",
    afk: "Foundry is a minigame. BF is clicky.",
    fast: "The bar the wiki ranks at your level.",
    watch: "Smithing rune platebodies on a normal furnace. BF without a coal bag.",
    page: "Smithing",
  },
  fishing: {
    tagline: "Barbarian fishing or the crate. Cook what you keep.",
    need: "Barbarian Fishing wants 48 Fishing, 15 Agility, 15 Strength and Otto’s scene. Infernal eel / minnows have their own levels.",
    money: "Anglerfish and sharks can pay. Barbarian fishing is XP and strength/agility crumbs.",
    early: "1–58 quests, fly fishing, lobster.",
    mid: "58–82 barbarian fishing. Wear the angler’s outfit from Temple Trawler.",
    late: "82–99 minnows, anglers, or infernal eels. 2-tick harpoon if you will tick.",
    wear: "Angler’s outfit. Dragon harpoon. Fish barrel if you own it.",
    afk: "Lobsters, monks, sharks at a bank chest. Slow.",
    fast: "Barbarian or the tick method on the wiki.",
    watch: "99 on lobsters. Minnows with no food and a crowded tile.",
    page: "Fishing",
  },
  cooking: {
    tagline: "Hosidius range so it does not burn. Wines if you bought the grapes.",
    need: "Hosidius kitchen for the 5% burn reduction. Cooking gauntlets from Family Crest.",
    money: "Fish you caught can pay. Wines and 1-tick karambwan are XP methods with a bill.",
    early: "1–35 quests and cheap fish.",
    mid: "35–77 Hosidius fly fish / swordfish / monkfish.",
    late: "77–99 sharks, anglerfish, wines, or karambwan. Wiki for the current gp/XP.",
    wear: "Cooking gauntlets. Chef’s hat does nothing that matters.",
    afk: "Hosidius range is light click.",
    fast: "1-tick karambwan. Only if you will tick.",
    watch: "Cooking sharks on a Lumbridge range. Wines with no jug stack.",
    page: "Cooking",
  },
  firemaking: {
    tagline: "Wintertodt. Warmth is the whole mechanic.",
    need: "50 Firemaking for a real Wintertodt session. Warm clothing. Axe.",
    money: "Wintertodt pays crates. Burning yews at a fire is XP you buy.",
    early: "1–50 any logs. Get to Wintertodt.",
    mid: "50–85 Wintertodt. Warmth is the mechanic.",
    late: "50–99 Wintertodt. Do not leave at 85 unless you hate the minigame.",
    wear: "Warm items. Warmth ring if you own it. Axe. Tinderbox only if you insist on lighting your own.",
    afk: "Wintertodt is a minigame. Not afk.",
    fast: "Wintertodt with the current crate method on the wiki.",
    watch: "Wintertodt in robes. Burning magics on a GE fire for 99.",
    page: "Firemaking",
    train: "Wintertodt",
    wikiPage: "Wintertodt",
  },
  woodcutting: {
    tagline: "The tree you can camp. Forestry is extra XP on the same tile.",
    need: "None. Forestry events want a world with other cutters. Redwood wants 90.",
    money: "Yews and magics can pay. Redwoods are XP. Bird nests are extra.",
    early: "1–60 oaks, willows, teaks.",
    mid: "60–90 yews, maples, Sulliusceps if you unlocked Fossil Island.",
    late: "90 redwoods. Forestry on the tree you already cut.",
    wear: "Lumberjack / forestry outfit. Dragon axe. Felling axe if the event wants it.",
    afk: "Redwoods and yews.",
    fast: "Teaks or the forestry tile the wiki ranks.",
    watch: "99 on normal trees. Forestry with no axe spec.",
    page: "Woodcutting",
  },
  farming: {
    tagline: "Compost from seed. Tree and herb runs while you walk.",
    need: "None to start. Ghosts Ahoy / other diaries help patches. Farming Guild wants 45.",
    money: "This skill pays if you run trees and herbs. Tithe is XP, not cash.",
    early: "1–15 quests and hops. Ultracompost from the start.",
    mid: "15–65 herb runs plus fruit trees when you can afford the saplings.",
    late: "65–99 tree + fruit + hardwood + herb on a timer. Tithe if you want a camp.",
    wear: "Farming outfit. Magic secateurs. Bottomless bucket. Attas / iasor / krasia in the anima patch.",
    afk: "The run is a timer. Tithe is a camp.",
    fast: "Tithe Farm. Confirm on the wiki.",
    watch: "Farming without compost. Buying 99 on dragonfruit with no patch order.",
    page: "Farming",
  },
  sailing: {
    tagline: "Start at Pandemonium. Confirm the live training page before you buy supplies.",
    need: "The Sailing tutorial / Pandemonium unlock. Everything after that is still moving — do not hard-code a 99 route here.",
    money: "Do not buy a full bank of materials until the live wiki says that method still exists.",
    early: "Tutorial and the first tasks on Pandemonium.",
    mid: "The facility and voyage the official training page lists at your level.",
    late: "Same rule. Rebuild this section when Jagex locks the method list.",
    wear: "What the live page lists. Do not copy a YouTube kit from launch week.",
    afk: "Unknown — check wiki.",
    fast: "Unknown — check wiki.",
    watch: "Treating a launch-week blog as the 99 plan.",
    page: "Sailing",
    train: "Sailing_training",
    wikiPage: "Sailing_training",
    moving: true,
  },
};

const RS3_NOTE: Record<string, Note> = {
  attack: {
    tagline: "Revolution bar. Hit the monster’s weakness. Slayer carries levels.",
    deck: "Attack is melee accuracy on RuneScape. This page is the RuneScape sheet. Levels come from Slayer, not a dummy.",
    need: "None to start. Weapon tier follows your Attack level. Abilities unlock on the combat interface. Revolution is the bar you use until you choose otherwise.",
    money: "A melee weapon you can repair is the bill. Slayer loot pays some of it back. Do not buy a bow to train Attack. Wiki for the current weapon price.",
    early: "1–40. Revolution on cows in Lumbridge or the first Slayer tasks from Taverley. Light clicks. Alternative: quest XP if you still have those quests.",
    mid: "40–80. Slayer with a weapon that matches the monster’s weakness. Light to afk on an aggression-potion task. Alternative: the combat academy dummy only for a leftover level, not the plan.",
    late: "80–99. Slayer with the best melee weapon you can repair. Light. Alternative: a boss you already know — that fight stays on the Bosses page.",
    wear: "Slayer helmet on task. A melee weapon of the tier you can use. Power armour you can repair. Revolution on the bar.",
    afk: "Some Slayer creatures with aggression. Not every task. The dummy is not the afk method.",
    fast: "Slayer on a weakness that dies fast. Three lines: right weapon, right task, skip the junk. Wiki for the skip list.",
    watch: "Training Attack with a staff. Full manual on a level 40 account because a video said so.",
    page: "Attack",
  },
  strength: {
    tagline: "Same tasks as Attack. Damage, not a second camp.",
    deck: "Strength is melee damage on RuneScape. This page is the RuneScape sheet. Train it on the same Slayer task as Attack.",
    need: "None. Same weapon tiers and ability bar as Attack.",
    money: "Same bill as Attack. Strength bonus on the weapon matters more than a second set of armour.",
    early: "1–40. Same Lumbridge cows or Taverley tasks as Attack. Light. Alternative: shared combat style if both stats are behind.",
    mid: "40–80. Slayer. Keep Attack and Strength within about ten levels. Light. Alternative: do not open a second camp just for this number.",
    late: "80–99. Slayer. Light. Boss damage belongs on Bosses.",
    wear: "Slayer helmet on task. Weakness melee weapon. Strength bonus over fashion armour.",
    afk: "Same aggression-potion Slayer as Attack. Not a private Strength world.",
    fast: "The Slayer task that dies to your weakness weapon. Wiki skip list.",
    watch: "A staff on a Strength grind. A second monster camp that ignores Slayer.",
    page: "Strength",
  },
  defence: {
    tagline: "Armour tier and Death cost. Tank the boss page, not this one.",
    deck: "Defence is the armour tier and the Death cost on RuneScape. This page is the RuneScape sheet. You do not camp it alone.",
    need: "None. Armour tier follows Defence and Smithing. Repair and Death are the real gates, not a quest.",
    money: "Repair and Death are the bill. Wiki for the current Death cost. Do not buy tank armour you cannot reclaim.",
    early: "1–40. Shared with Attack and Strength on cows or early Slayer. Light. Alternative: the armour you already own, not a shop dump.",
    mid: "40–80. Slayer in armour you can repair. Light. Alternative: power armour if the task does not hit hard.",
    late: "80–99. Slayer. Tanking a boss is a Bosses page problem. Light.",
    wear: "Best armour you can repair for the task. Slayer helmet on task. A sign of life if you own one and the content can kill you.",
    afk: "Same as Attack. Not a Defence-only dummy.",
    fast: "Slayer. Defence XP arrives with the kill.",
    watch: "A boss in hybrid fashion at 60 Defence. A dummy camp that spends the food budget.",
    page: "Defence",
  },
  ranged: {
    tagline: "Bow tier and ammo. Chinchompas only if you own the tile.",
    deck: "Ranged is a bow, ammo, and a tile you can hold. This page is the RuneScape sheet. Chinchompas are a funded method, not the start.",
    need: "Weapon tier follows Ranged. Chinchompas want the Hunter level and a spot the wiki still lists. Ava’s devices and quivers follow their own quests.",
    money: "Ammo is the tax. Chinchompas are a cash method. Slayer with a bow you own is the cheap route. Wiki for gp/XP this month.",
    early: "1–40. A shortbow or shieldbow on Taverley Slayer or Lumbridge. Light. Alternative: knives if you already have a stack.",
    mid: "40–80. Slayer with the best bow you can repair. Light to afk on an aggression task. Alternative: crystal or ascension only if the price is already paid.",
    late: "80–99. Slayer with that bow, or chinchompas at the spot the wiki still names if you can hold the tile. Tick-weight is the chin click. Alternative: stay on Slayer.",
    wear: "Slayer helmet on task. Best bow you can repair. Ammunition for that bow. A quiver or Ava-style device if this game’s training page still lists one.",
    afk: "Some Slayer creatures. Chinchompas are not afk.",
    fast: "Chinchompas on a tile you hold, or Slayer with a real bow. Wiki for the current spot.",
    watch: "Chinchompas on a public tile you cannot hold. Buying ascension with no ammo budget.",
    page: "Ranged",
  },
  prayer: {
    tagline: "Bones on an altar. Curses and Soul Split unlock on the prayer list.",
    deck: "Prayer is bones on an altar, then the curses list. This page is the RuneScape sheet. The Wilderness chaos-altar plan is Old School.",
    need: "A chapel or player-owned altar. Ancient Curses want The Temple at Senntisten. Soul Split sits on that list, not on a bone pile.",
    money: "Dragon and frost dragon bones cost. The gilded or chapel method saves bones. Wiki for gp/XP this month. Do not price an Old School chaos altar here.",
    early: "1–43. Quests plus cheap bones on the Lumbridge or Edgeville altar. Click-weight is every bone. Alternative: a lamp only if you already earned it.",
    mid: "43–70. Dragon bones on a gilded altar or the chapel the wiki still ranks, burners lit. Click. Alternative: frost bones if the price is kinder this week.",
    late: "70–99. The bone the wiki ranks, same altar. Click. Curses and Soul Split when the quest and level allow. Alternative: cleansing crystals only if the live page still lists them.",
    wear: "First Age outfit if you own it. Otherwise nothing that changes the click. Do not wear Wilderness kit — that is the other client.",
    afk: "None. Click the bone.",
    fast: "The bone the wiki ranks, both burners lit, a bank preset. Three clicks: withdraw, use, bury or offer.",
    watch: "Copying the Old School chaos altar onto this page. A gilded altar with the burners out.",
    page: "Prayer",
  },
  magic: {
    tagline: "Ability bar, not splash. Bring the spellbook the dungeon wants.",
    deck: "Magic is an ability bar and the spellbook the place wants. This page is the RuneScape sheet. Splashing is not a method.",
    need: "Standard book to start. Ancients and Lunar want their quests. Revolution works. A staff tier follows Magic.",
    money: "Runes are the tax. Slayer pays some of it. Wiki for rune prices. Do not buy a noxious staff to splash.",
    early: "1–40. Air and water spells on Revolution, Taverley Slayer or Lumbridge. Light. Alternative: alchemy only if you already have the items.",
    mid: "40–80. The book the task wants. Slayer. Light. Alternative: a lunar spell you will actually use, not a splash world.",
    late: "80–99. Slayer with a real staff and the right book. Light. Ancient Magicks for the task that wants them.",
    wear: "Power armour you can repair. Slayer helmet on task. Staff of the tier you can use. Runes in the pouch.",
    afk: "Revolution on a Slayer creature. Not splash.",
    fast: "Slayer with the spellbook the dungeon wants. Wiki for the task.",
    watch: "Splashing and calling it training. The wrong spellbook in a dungeon that wants the other one.",
    page: "Magic",
  },
  runecraft: {
    tagline: "Runespan for calm XP. Abyss for runes you will sell.",
    deck: "Runecraft is essence through a rift or the Abyss. This page is the RuneScape sheet. Lava runes are the other client.",
    need: "Rune Mysteries. The Abyss wants its miniquest. Pouches come from the abyss. Runespan needs no pouch.",
    money: "Runespan is XP. Abyss runes can sell. Wiki for which rune pays this month. Do not buy a lava-rune stack for this game.",
    early: "1–50. Runespan, the low islands, light clicks on wisps into the rift. Alternative: air runes through the Abyss if you want runes, not XP.",
    mid: "50–90. Higher Runespan islands, or the Abyss rune your level allows. Light in Runespan. Clickier in the Abyss. Alternative: stay on the island if you will not eat the Abyss hits.",
    late: "90–99. The highest rune you can craft through the Abyss, or the top Runespan island. Click. Alternative: souls only if the live page still lists that altar.",
    wear: "Ethereal or wicked robes if you own them. Pouches for the Abyss. A pick is not the outfit.",
    afk: "Runespan. The Abyss is not afk.",
    fast: "The Abyss rune the wiki ranks, pouches full. Or the top Runespan island if you want no damage.",
    watch: "Old School lava-rune math on this page. The Abyss with no food and a cash stack.",
    page: "Runecrafting",
  },
  construction: {
    tagline: "Planks first. Fort Forinthry frames when the fort is built.",
    deck: "Construction is planks in a house, then Fort frames. This page is the RuneScape sheet. The fort has to exist before the frame method does.",
    need: "A player-owned house. A servant later. Fort Forinthry wants that questline before frames count.",
    money: "You buy this XP. Oak, teak, and mahogany are the bill. Wiki for gp/XP. Mahogany at level 20 is a waste.",
    early: "1–40. Oak furniture in your house, workshop first. Click every build. Alternative: quest XP if you still have those quests.",
    mid: "40–70. Teak or mahogany with a servant. Click. Alternative: contracts only if the live page still lists them.",
    late: "70–99. Fort Forinthry frames after the fort stands, or the plank the wiki ranks. Click. Alternative: mahogany benches if the fort is not built.",
    wear: "Constructor’s outfit if you own it. A crystal saw. The servant is the tool, not a hat.",
    afk: "None. Every plank is a click.",
    fast: "The plank or frame the wiki ranks, servant running, saw in the inventory.",
    watch: "Fort frames before the fort stands. Mahogany bought at level 20.",
    page: "Construction",
  },
  constitution: {
    tagline: "Same kills as combat. Food and brews are the plan.",
    deck: "Constitution fills while you fight on RuneScape. This page is that sheet. There is no Constitution-only camp.",
    need: "None. Food and the combat style you already chose.",
    money: "Food and brews are the bill. The skill has no shop of its own.",
    early: "1–40. The same cows or Taverley tasks as Attack. Light. Alternative: do not sit on a dummy.",
    mid: "40–80. Slayer. Light. The number follows the kill.",
    late: "80–99. Slayer and the combat you already do. Light. Boss healing belongs on Bosses.",
    wear: "The armour of the style you clicked. Food you will actually eat. A brew is not a plan by itself.",
    afk: "Whatever Slayer task you can already leave. Not a dummy.",
    fast: "Slayer. Constitution is the leftover.",
    watch: "A dummy camp with no food for the next task. Treating Hitpoints methods from Old School as a second skill here.",
    page: "Constitution",
    train: "Constitution",
  },
  agility: {
    tagline: "The course you fail less. Hefin in Prifddinas at late levels.",
    deck: "Agility is the course you stop failing. This page is the RuneScape sheet. Rooftops and Graceful are Old School.",
    need: "Each course has a level. Prifddinas and the Hefin course want Plague’s End. Silverhawk feathers only if the live page still lists them.",
    money: "Mostly time. Hefin can drop crystals. Wiki for whether feathers still pay. Do not buy Graceful — it is not this client.",
    early: "1–30. Gnome Stronghold course. Click every obstacle. Alternative: the Burthorpe course if you fail the gnome one less.",
    mid: "30–70. Barbarian Outpost, then the course you fail least. Click. Alternative: the Wilderness course only if you accept a PKer.",
    late: "75–99. Hefin course in Prifddinas after Plague’s End. Click. Alternative: the advanced course the wiki ranks if you are not in Prif.",
    wear: "Nimble outfit if you own it. Silverhawk boots only if the wiki still lists them. Not Graceful.",
    afk: "None, unless Silverhawk boots are still on the live training page. A course is clicks.",
    fast: "Hefin, or the course the wiki ranks at your level. Fail less, not a new outfit.",
    watch: "Calling Old School rooftops the RuneScape 99. The Wilderness course in a cash stack.",
    page: "Agility",
  },
  herblore: {
    tagline: "Secondaries first. 120 is a bank sheet, not a secret.",
    deck: "Herblore is a potion you will drink or sell. This page is the RuneScape sheet, including 120. Secondaries before herbs.",
    need: "Druidic Ritual. Scroll of cleansing helps. Portable wells only if they are up. Overloads and combination potions have their own levels.",
    money: "Herbs and secondaries are the bill. Overloads can pay if you use them. Wiki for gp/XP this month. A 120 buy with no secondaries is not a method.",
    early: "1–38. The potion you will drink: attack, strength, defence, energy. Bank. Click. Alternative: quest XP.",
    mid: "38–80. Prayer potions, super restores, then extremes when the level allows. Bank or a portable well. Click. Alternative: the potion you will use in Slayer, not a random unfinished potion.",
    late: "80–99, then 99–120. Overloads and the combination the wiki ranks. Click. Portable well if it is live. Alternative: stop at 99 if you will not use 120 potions.",
    wear: "Factory or botanist’s outfit if you own it. Modified botanist’s mask. A brooch of the Gods if you use portables. The secondary stack matters more than the hat.",
    afk: "None. You mix.",
    fast: "The potion the wiki ranks, secondaries already in the bank, portable well if it is up.",
    watch: "A 120 herb buy with no secondaries. An Old School super combat recipe on this page.",
    page: "Herblore",
  },
  thieving: {
    tagline: "Prifddinas or the safe you can stand. Eat on stun.",
    deck: "Thieving is a stun you eat through. This page is the RuneScape sheet. Prifddinas wants Plague’s End.",
    need: "None to start. Safecracking has its own level. Elves and clan workers in Prifddinas want Plague’s End.",
    money: "Safes and Prif pay. Knights pay less. Wiki for the current coin. Do not stand in a place you cannot leave.",
    early: "1–40. Men in Lumbridge, then stalls you can reach. Click, eat the stun. Alternative: quest XP.",
    mid: "40–80. Safecracking when the level allows, or knights if the safe is not open yet. Click. Alternative: the stall the wiki still ranks.",
    late: "80–99. Prifddinas workers after Plague’s End, food on the stun. Click. Alternative: safecracking if you are not in Prif.",
    wear: "Food. A Trahaearn or camouflage piece only if the live page still lists it. The food is the kit.",
    afk: "Prif workers only if you can stand the stun and look away. It is still a click.",
    fast: "The safe or the Prif worker the wiki ranks. Eat before the second stun.",
    watch: "Old School elves with no Plague’s End. A safe with no food.",
    page: "Thieving",
  },
  crafting: {
    tagline: "Jewellery and hide. Portables if they are up.",
    deck: "Crafting is a gem, a hide, or an urn at the bank. This page is the RuneScape sheet. Invention will want junk later — do not trash the stack you still need.",
    need: "None to start. A portable crafter only if that item is still live.",
    money: "Jewellery can sell. Hides and urns depend on the price. Wiki for gp/XP. Do not buy a 99 of one hide with no buyer.",
    early: "1–40. Leather and gold in a bank. Click. Alternative: quest XP.",
    mid: "40–75. Dragonhide or the gem the wiki ranks, bank or portable crafter. Click. Alternative: urns if you will use them.",
    late: "75–99. The gem, hide, or urn the wiki ranks. Click. Alternative: stop before you disassemble the only stack Invention still needs.",
    wear: "Artisan’s or crafting outfit if you own it. A portable crafter if it is up. The mould is the tool.",
    afk: "A bank preset of jewellery. Still a click per inventory.",
    fast: "The hide or gem the wiki ranks, materials already bought.",
    watch: "Disassembling the only hide stack you needed. A 99 buy with no buyer.",
    page: "Crafting",
  },
  fletching: {
    tagline: "Broad tips and bows at the bank. Invention eats junk later.",
    deck: "Fletching is a bank click. This page is the RuneScape sheet. Broads want the Slayer unlock. Do not disassemble the only stack.",
    need: "None to start. Broad arrows want the Slayer point unlock.",
    money: "A bank skill. Stringing can sell. A 120 buy should be checked on the GE first. Wiki for the price.",
    early: "1–40. Shafts and shortbows at a bank. Click. Alternative: quest XP.",
    mid: "40–70. Maple or yew longs, or broad arrows once unlocked. Bank. Click. Alternative: the bow you will actually use.",
    late: "70–99. Broad arrows, bakriminel, or the bow the wiki ranks. Bank. Click. Alternative: stop if Invention needs that stack intact.",
    wear: "Nothing that changes the click. A bank preset. The knife and the logs.",
    afk: "Stringing at a bank. Slow. Still a click per inventory.",
    fast: "The tip or bow the wiki ranks, materials in one preset.",
    watch: "Broads before the Slayer unlock. Disassembling the only stack you needed for 120.",
    page: "Fletching",
  },
  slayer: {
    tagline: "Laniakea when you can use her. Skip list on the wiki.",
    deck: "Slayer is the master and the skip list. This page is the RuneScape sheet. Nieve is Old School. Reaper tasks are bosses.",
    need: "A Slayer master. Laniakea wants a high Slayer level and her island. Block list slots are bought with points.",
    money: "The right skip list is how this skill pays. A bad task is the cost. Wiki for the current block list.",
    early: "1–50. Turael or Mazchna for points, then leave Turael. Light. Alternative: do not boost points at level 80.",
    mid: "50–90. Kuradal or Duradel. Weakness weapon. Light to afk with aggression on the right task. Alternative: a block list before you take every task.",
    late: "90–99. Laniakea when you can use her. Light. Alternative: Duradel if you are not on her island. Reaper stays on Bosses.",
    wear: "Slayer helmet on task. The weapon that matches the weakness. Aggression potions only on tasks that use them.",
    afk: "Some tasks with aggression. Not the whole 99.",
    fast: "A skip list, a weakness weapon, and the master the wiki ranks. Three decisions, then the kill.",
    watch: "Nieve on this page. Reaper written up as a Slayer training method.",
    page: "Slayer",
  },
  hunter: {
    tagline: "Box trap you can leave. Anachronia is a map, not a guess.",
    deck: "Hunter is a trap you can leave, then Anachronia. This page is the RuneScape sheet. Birdhouse runs are Old School.",
    need: "Box traps. Anachronia access for the late map. Big Game Hunter has its own levels.",
    money: "Box traps and big game can pay. Wiki for the current hide price. Do not paste an Old School birdhouse timer here.",
    early: "1–30. Crimson swifts and the first box traps near a bank. Light. Alternative: quest XP.",
    mid: "30–70. Box traps you can check and leave. Light. Alternative: the grenwall or jadinko the wiki still lists at your level.",
    late: "70–99. Anachronia or Big Game Hunter when the level allows. Light to a hunt. Alternative: the box trap the wiki ranks if you are not on the island.",
    wear: "The hunter outfit if you own it. Traps. Bait the live page names.",
    afk: "A box trap you can leave and come back to. Not a birdhouse clock.",
    fast: "The trap or hunt the wiki ranks at your level.",
    watch: "Old School birdhouses on this page. Anachronia before you can land there.",
    page: "Hunter",
  },
  mining: {
    tagline: "The Mining and Smithing rework owns the pick. Not Motherlode.",
    deck: "You need ore for the rework and a pick of your tier. This sheet is RuneScape. Motherlode Mine is the other client. You do not need 99 to go use the ore.",
    need: "The Mining and Smithing rework tutorial. The pickaxe tier has to match the rock. Higher rocks want the Mining level written on them. Confirm the current high-XP rock on the live wiki before you copy a layout from last year.",
    money: "Ore you will smith is the useful hour. Extra ore is the gp hour if the wiki price says so. A click-heavy rockertunity hour is XP, not a shop. Wiki for this month’s ore. Do not price an Old School amethyst stack on this page.",
    early: "Copper, tin, and iron on the rework rocks.",
    mid: "The concentrated rock the wiki still lists. Not Motherlode.",
    late: "The afk rock versus the rock you click. Confirm both on the wiki.",
    wear: "Magic golem outfit if you own it. Best pick you can use. Stone spirits for the ore you mean to keep. Honed is an Invention perk, not a substitute for the pick.",
    afk: "The rock the wiki still calls afk. Not Motherlode.",
    fast: "Rockertunities on the highest ore you can mine, if you will click them.",
    watch: "Motherlode pasted from Old School. A bronze pick on a high rock. An F2P iron hour used as a members plan.",
    route: [
      {
        band: "Early",
        method: "Copper, tin, then iron. The tutorial mine is enough. You are learning the swing and the ore box, not hunting a secret rock.",
        place: "Burthorpe, or the mine the tutorial left you in. A bank or an ore box close enough that the walk is not the skill.",
        click: "Light. Mine the rock until it is done, bank or box the ore, repeat.",
        leave: "Leave when the next tier rock on the skill guide turns white. Staying on copper because it is quiet is the wasted hour.",
      },
      {
        band: "Mid",
        method: "The concentrated deposit the live wiki still ranks at your level. Concentrated coal in the Living Rock Caverns is the name to check. If that deposit is gone, use the rock the training page names. Do not invent a quarry, and do not write Motherlode.",
        place: "Living Rock Caverns if concentrated coal is still the listed method. Otherwise the mine printed on the current training page.",
        click: "Light to afk on a rock that lasts. Click the rockertunity if you are at the screen. Missing one is fine. Missing the tier is not.",
        leave: "Leave when your pick and your level open the next ore you will actually smith. A pretty XP rock you will not use is a main’s hour.",
      },
      {
        band: "Late · afk",
        method: "The rock the wiki currently calls the afk hour. Animica is the family to check. If the page names a different rock this month, that rock wins. Seren stones only if they are still listed.",
        place: "The mine the training page gives for that rock. Not a guessed coordinate, and not an Old School guild.",
        click: "Afk. You swing, you wait, you bank. Stone spirits if you want the extra ore.",
        leave: "Leave when you have the ore the smithing goal needed, or when the wiki moves the afk rock. Do not keep a dead rock out of habit.",
      },
      {
        band: "Late · click",
        method: "The same tier or the next one, played for rockertunities. This is the XP fork. It is not a second skill.",
        place: "Same mine, or the higher rock the wiki ranks for click-heavy mining. Confirm it. Do not paste granite.",
        click: "You click the rockertunity. If you will not watch the screen, you are on the afk band. Go back.",
        leave: "Leave when the hour stops being clicks and becomes a video in another tab. That is the afk rock’s job.",
      },
    ],
    inventory:
      "Best pick you can use. Ore box. Stone spirits for the ore you intend to keep, not a stack of every spirit. Magic golem pieces if you have them. A porter only if the live page still says the rock wants one. No Old School gem bag, no Motherlode sack, no second style.",
    iron: "Smith what you mine. The rework is the point. Do not buy a main’s animica stack and call it a route. If a concentrated rock wants a stone spirit you cannot make yet, mine the ore you can use and come back.",
    stop: "Stop when the smithing tier you needed is supplied. 99 is a cape. The ore in the box was the reason you were here.",
    mistakes:
      "Pasting Motherlode Mine onto this page. Mining F2P iron for a members hour. A bronze pick on a rock two tiers above it.",
    page: "Mining",
  },
  smithing: {
    tagline: "Heat and the rework furnace. Not Blast Furnace.",
    deck: "Smithing is heat on the rework furnace. This page is the RuneScape sheet. Blast Furnace and platebody spam are Old School.",
    need: "The same rework. Heat is the bar. A higher bar wants the Smithing level, not a coal bag from Motherlode.",
    money: "Bars you will use are not a waste. Junk you cannot wear is. Wiki for whether burial or the GE is kinder this week.",
    early: "1–30. Bronze and iron on the rework progress, furnace heat kept up. Click. Alternative: the Burthorpe furnace if you started there.",
    mid: "30–70. The next bar on that progress. Unfinished items go back in the furnace. Click. Alternative: do not smith a shop dump of platebodies.",
    late: "70–99. The bar the wiki ranks. Heat up. Click. Alternative: burial armour only if the live page still lists it as the XP.",
    wear: "Smithing suit if you own it. The best hammer. Protean bars only if you already own them.",
    afk: "The furnace sit the wiki still lists, heat watched. Not a Blast Furnace world.",
    fast: "The bar the wiki ranks, heat never dropped.",
    watch: "Blast Furnace pasted from Old School. A stack of platebodies you will not wear or bury.",
    page: "Smithing",
  },
  fishing: {
    tagline: "Swarm or waterfall. Cook what you keep.",
    deck: "Fishing is a spot you can leave, or a swarm. This page is the RuneScape sheet. Barbarian fishing as the 99 plan is Old School.",
    need: "A rod or a net for the fish. Waterfall fishing wants Prifddinas. Swarm fishing wants the spot the wiki still lists.",
    money: "Fish you cook or sell can pay. Swarm is mostly XP. Wiki for the fish that pays.",
    early: "1–40. Shrimp, then trout and lobster at a bank spot. Afk. Alternative: fly fishing if you need the food.",
    mid: "40–70. Monkfish or the swarm the wiki ranks. Afk to light. Alternative: the fish you will cook for combat.",
    late: "70–99. Waterfall fishing in Prifddinas, or the swarm. Afk. Alternative: sailfish only at the level the live page names.",
    wear: "Fishing outfit if you own it. The best rod for that fish. Bait the page lists.",
    afk: "A swarm or a waterfall you can leave. Not a 2-tick harpoon from the other client.",
    fast: "The fish the wiki ranks. Outfit on.",
    watch: "Barbarian fishing copied across as the RuneScape 99. A waterfall before Plague’s End.",
    page: "Fishing",
  },
  cooking: {
    tagline: "The range that does not burn. Portables if they are up.",
    deck: "Cooking is the range that stops the burn. This page is the RuneScape sheet. The Hosidius kitchen is Old School.",
    need: "Cooking gauntlets from Family Crest. A range, or a portable range if that item is live.",
    money: "Cook what you fish. High fish can sell or feed you. Wiki for burn rates and gp.",
    early: "1–40. Shrimp, trout, and the fish you will eat, on a range. Light. Alternative: quest XP.",
    mid: "40–70. Monkfish and the food your combat uses. Gauntlets on. Light. Alternative: a portable range if it is up.",
    late: "70–99. Sailfish or the fish the wiki ranks, gauntlets on, portable if live. Light. Alternative: the fish you already fish.",
    wear: "Cooking gauntlets. A portable range if it is up. A chef’s hat does not stop the burn.",
    afk: "A range that does not burn, one inventory at a time. Still a click.",
    fast: "The fish the wiki ranks, gauntlets on, range that does not burn.",
    watch: "The Hosidius kitchen pasted from Old School. Sharks on a range that still burns them.",
    page: "Cooking",
  },
  firemaking: {
    tagline: "A line of logs or a brazier. Not Wintertodt.",
    deck: "Firemaking is a line of logs or a brazier. This page is the RuneScape sheet. Wintertodt is Old School.",
    need: "A tinderbox and logs. A portable brazier only if it is still live. No Wintertodt warm clothing.",
    money: "Usually XP you buy. Magic and elder logs cost. Wiki for gp/XP. Do not buy a Wintertodt crate plan.",
    early: "1–40. Normal and oak logs in a line. Click. Alternative: the bonfire the wiki still lists.",
    mid: "40–75. Maple or yew on a bonfire line, or a portable brazier if it is up. Light. Alternative: the log you already cut.",
    late: "75–99. Magic, elder, or the log the wiki ranks, same line or brazier. Light. Alternative: stop if the log price is a joke this week.",
    wear: "Firemaking outfit if you own it. A tinderbox. Not a pyromancer coat.",
    afk: "A bonfire line or a brazier you can add logs to. Not Wintertodt.",
    fast: "The log the wiki ranks, already in the bank, line or brazier.",
    watch: "Wintertodt on this page. Magic logs lit one by one with no line.",
    page: "Firemaking",
  },
  woodcutting: {
    tagline: "The tree you can leave. Crystal and ivy at late levels.",
    deck: "Woodcutting is a tree you can leave. This page is the RuneScape sheet. Forestry events are Old School.",
    need: "An axe of your tier. Crystal trees want Prifddinas. Ivy wants the level, not a quest.",
    money: "Ivy is XP. Elder and crystal can pay. Wiki for the log price. Nests are extra, not the plan.",
    early: "1–40. Normal, oak, then willow near a bank. Afk. Alternative: the Burthorpe trees if you are there.",
    mid: "40–75. Maple, yew, or ivy. Afk. Alternative: the tree you will fletch.",
    late: "75–99. Crystal in Prifddinas, elder, or ivy. Afk. Alternative: the tree the wiki ranks if crystal is crowded.",
    wear: "Woodcutting outfit if you own it. The best axe you can use. A felling axe from the other game does not belong here.",
    afk: "Ivy, yew, or crystal. Leave and come back.",
    fast: "The tree the wiki ranks. Axe tier first.",
    watch: "Forestry pasted from Old School. Normal trees to 99.",
    page: "Woodcutting",
  },
  farming: {
    tagline: "Compost from seed. 120 is tree runs on a sheet.",
    deck: "Farming is a run on a timer. This page is the RuneScape sheet, including 120. Tithe Farm is Old School.",
    need: "Seeds and compost. Magic secateurs help. Player-owned farm is extra, not the whole skill.",
    money: "Herbs and trees can pay. 120 is a calendar of runs, not one sitting. Wiki for seed prices.",
    early: "1–30. Compost, then hops and the first herbs. A run, then you leave. Alternative: quest XP.",
    mid: "30–70. Herb runs plus fruit trees when you can plant them. Timer. Alternative: allotments only if you need the food.",
    late: "70–99 and on to 120. Tree, fruit, and herb on one sheet. Timer. Alternative: Manor Farm if you use it. Not Tithe.",
    wear: "Farming outfit if you own it. Magic secateurs. Ultracompost or the compost the live page names.",
    afk: "The crop grows while you are gone. The run itself is a few clicks.",
    fast: "Tree runs on a timer. Wiki for the tree that is worth planting.",
    watch: "Tithe Farm pasted from Old School. Seeds with no compost.",
    page: "Farming",
  },
  summoning: {
    tagline: "Charms first, then the pouch. The familiar is a tool.",
    deck: "Summoning is a charm, a pouch, and an obelisk. This page is the RuneScape sheet. The familiar is a tool, not a pet you never infuse.",
    need: "Wolf Whistle. An obelisk. The pouch wants its charm colour and its tertiary.",
    money: "Charms are the gate. Pouches can cost or pay. Wiki for the pouch price. Do not buy tertiaries with no charms.",
    early: "1–40. Gold charms, low pouches, at an obelisk. Click an inventory. Alternative: the pouch you will actually summon.",
    mid: "40–70. Green and crimson charms, the pouch the wiki ranks. Click. Alternative: a combat pouch you will use on Slayer.",
    late: "70–99. Blue charms and the pouch the wiki ranks. Click. Alternative: elder charms only at the level the page names.",
    wear: "Nothing beats the charm stack. Spirit gems if you own them. The pouch is the kit.",
    afk: "One inventory at the obelisk, then you stop. Not a camp.",
    fast: "The pouch the wiki ranks, charms and tertiaries already in the bank.",
    watch: "A familiar you never infuse. Tertiaries bought with no charms.",
    page: "Summoning",
  },
  dungeoneering: {
    tagline: "Floors. Bind the weapon you will keep using.",
    deck: "Dungeoneering is floors in Daemonheim. This page is the RuneScape sheet. Bind the weapon you will use again.",
    need: "A ring of kinship. Complexity rises with the floor. Surface gear does not come in.",
    money: "Tokens buy the unlocks. The skill itself is floors. Wiki for what the token shop is worth this month.",
    early: "1–30. Solo small floors. Learn the first bind. Click. Alternative: a floor with one friend if you already have one.",
    mid: "30–70. Complexity 6, the size you can clear. Bind the weapon you use on the surface. Click.",
    late: "70–99 and toward 120. Large floors. Sinkholes if you want tokens and they are still on the calendar. Click. Alternative: the floor size the wiki ranks, not a rush with an empty bind.",
    wear: "The bind slot. Do not bring surface armour into Daemonheim.",
    afk: "None. A floor is a route.",
    fast: "The floor size the wiki ranks, bind already chosen, no empty rushes.",
    watch: "Rushing with no bind and calling it 120. Surface gear in the dungeon.",
    page: "Dungeoneering",
  },
  divination: {
    tagline: "Wisp to crater. Caches on the daily timer.",
    deck: "Divination is a wisp into a crater, plus the cache. This page is the RuneScape sheet. The cache is the daily, not a substitute for the colony.",
    need: "None. Each colony has a level. Caches are on a timer.",
    money: "Energy can sell. Caches are free XP. Wiki for the energy price. Do not skip a year of caches and buy a story.",
    early: "1–40. Pale through the next wisp you can harvest, into that colony’s crater. Light. Alternative: a cache when the timer is up.",
    mid: "40–75. The wisp you can click, plus the cache every day. Light. Alternative: convert energy only if you need it.",
    late: "75–99 and toward 120. Ancestral or incandescent, crater, cache. Light. Alternative: the colony the wiki ranks if the top one is empty.",
    wear: "Elder divination outfit if you own it. An empty inventory for energy. The crater is the tool.",
    afk: "A colony you can leave for a minute. The cache is a daily, not afk.",
    fast: "The colony the wiki ranks, plus the cache when it is up.",
    watch: "Skipping caches for a year. Harvesting wisps and never depositing them.",
    page: "Divination",
  },
  invention: {
    tagline: "Disassemble junk. Augment the piece you will keep.",
    deck: "Invention is junk you can lose, and one item you will keep. This page is the RuneScape sheet. Do not disassemble the weapon you still use.",
    need: "80 Smithing, 80 Crafting, 80 Divination, and the tutorial. Augmentors and siphons come after.",
    money: "Components are the bank. A noxious weapon turned into parts is not a method. Wiki for which junk is actually junk.",
    early: "1–40. Discover, disassemble cheap junk, level the tool belt. Click. Alternative: the tutorial items only.",
    mid: "40–80. Augment a weapon you will keep. Siphon it. Click when it is ready. Alternative: do not disassemble it for a blog’s component.",
    late: "80–120. Research and the item you already use. Siphon. Alternative: the perk the wiki ranks for that slot, after the item exists.",
    wear: "The augmented item. The perk the wiki ranks for that slot. Junk armour you were going to throw out.",
    afk: "Siphon the weapon you already swing. The siphon is the afk. Discovery is not.",
    fast: "Discoveries, then the item you already use. Three lines: junk, augment, siphon.",
    watch: "Disassembling a weapon you still use. Buying a gimmick item just to break it.",
    page: "Invention",
  },
  archaeology: {
    tagline: "Dig, then restore. A damaged artefact is not the finish.",
    deck: "Archaeology is a dig and then a restore. This page is the RuneScape sheet. A bank full of damaged artefacts is not a level.",
    need: "The tutorial site. A mattock of your tier. Collectors and qualifications open later sites.",
    money: "Restored artefacts and materials can pay. 120 is time at a hotspot. Wiki for the material price.",
    early: "1–40. The tutorial site, then the next site the journal opens. Restore everything at the bench. Light. Alternative: do not bank the damaged piece.",
    mid: "40–70. The site the journal just opened. Dig, restore. Light to afk on a hotspot that lasts.",
    late: "70–99 and toward 120. The site and relic the wiki ranks. Restore at the bench. Alternative: a cache only if the live page still lists it.",
    wear: "Archaeology outfit if you own it. The best mattock you can use. Materials for the restore, not another damaged artefact.",
    afk: "A hotspot that lasts. The restore at the bench is the click.",
    fast: "The hotspot the wiki ranks, then the restore. Damaged is not finished.",
    watch: "Banking damaged artefacts and never restoring them. A mattock two tiers too low.",
    page: "Archaeology",
  },
  necromancy: {
    tagline: "Rituals and Kili’s tasks. Bosses stay on the Bosses page.",
    deck: "Necromancy is rituals in the City of Um and the weapon Kili upgrades. This page is the RuneScape sheet. Rasial stays on Bosses.",
    need: "The tutorial. The City of Um. Kili for the weapon upgrades. Talent points are part of the skill, not a footnote.",
    money: "Ritual materials cost. Combat with the style can pay. Wiki for the ritual ink and the bone price.",
    early: "1–30. The tutorial, the first rituals, the first talent picks. Click the ritual. Alternative: do not skip the tutorial site.",
    mid: "30–70. Kili’s tasks so the weapon actually upgrades. Rituals between them. Click. Alternative: do not skip her for a combat camp.",
    late: "70–120. The ritual the wiki ranks, plus combat with the weapon she upgraded. Click. Rasial and the other bosses stay on Bosses.",
    wear: "The necromancy armour of your tier. The weapon Kili just upgraded. Ritual materials in the inventory, not a melee switch.",
    afk: "Combat on the undead the wiki names, if that camp is still afk. A ritual with disturbances is not afk.",
    fast: "The ritual the wiki ranks, disturbances clicked, then Kili if she still has a task.",
    watch: "Calling the City of Um a guide and leaving Kili out. Writing Rasial up as the training method.",
    page: "Necromancy",
  },
};

/** Trimmed skillcape. Cloth is the body. Trim is the strip. Not the badge. */
const CAPE: Record<string, { cloth: string; trim: string }> = {
  Attack: { cloth: "#9a1c22", trim: "#f0c93a" },
  Strength: { cloth: "#1f8a45", trim: "#c4492a" },
  Defence: { cloth: "#3a5ea8", trim: "#e6e2c0" },
  Ranged: { cloth: "#3d7a28", trim: "#a56b32" },
  Prayer: { cloth: "#b7b3ae", trim: "#f0d23a" },
  Magic: { cloth: "#8a867c", trim: "#2a3ad0" },
  Runecraft: { cloth: "#8d8d90", trim: "#e0a020" },
  Construction: { cloth: "#7a7468", trim: "#d0892a" },
  Hitpoints: { cloth: "#c4232a", trim: "#f0e0c8" },
  Constitution: { cloth: "#e6d7b8", trim: "#d41818" },
  Agility: { cloth: "#1d2f8a", trim: "#8a3a28" },
  Herblore: { cloth: "#0e6b28", trim: "#f0d23a" },
  Thieving: { cloth: "#6a2a78", trim: "#1a1a1a" },
  Crafting: { cloth: "#6b4a28", trim: "#f0d23a" },
  Fletching: { cloth: "#0e5c62", trim: "#f0d23a" },
  Slayer: { cloth: "#1c1c1c", trim: "#8e1a1a" },
  Hunter: { cloth: "#6a6840", trim: "#3a2a18" },
  Mining: { cloth: "#4a4a32", trim: "#5aa0b0" },
  Smithing: { cloth: "#4e4a32", trim: "#f0d23a" },
  Fishing: { cloth: "#6a8ea4", trim: "#f0d23a" },
  Cooking: { cloth: "#6a2a8a", trim: "#a33a22" },
  Firemaking: { cloth: "#c4842a", trim: "#f0d23a" },
  Woodcutting: { cloth: "#a48448", trim: "#2f6b3a" },
  Farming: { cloth: "#1f7a32", trim: "#b6e06a" },
  Sailing: { cloth: "#163a6b", trim: "#e2c15a" },
  Summoning: { cloth: "#8a8a96", trim: "#f0d23a" },
  Dungeoneering: { cloth: "#6b3a18", trim: "#e8b48a" },
  Divination: { cloth: "#5a36c4", trim: "#3ef0f0" },
  Invention: { cloth: "#e6c200", trim: "#2f9ae6" },
  Archaeology: { cloth: "#f2f2f6", trim: "#1a1a1a" },
  Necromancy: { cloth: "#1a1a1a", trim: "#a020e0" },
};

export function capeColors(name: string) {
  return CAPE[name] ?? { cloth: "#e6d000", trim: "#fff4b0" };
}

function luma(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function lift(hex: string, min = 120) {
  if (luma(hex) >= min) return hex;
  const n = Number.parseInt(hex.slice(1), 16);
  const scale = min / Math.max(luma(hex), 8);
  const ch = (c: number) => Math.min(255, Math.round(c * scale)).toString(16).padStart(2, "0");
  return `#${ch((n >> 16) & 255)}${ch((n >> 8) & 255)}${ch(n & 255)}`;
}

/** Title is the strip. A black strip is lifted so it can be read. Hover stays the cloth. */
export function capeInk(name: string) {
  return lift(capeColors(name).trim);
}

export function capeStyle(name: string): { "--cape": string; "--trim": string } {
  const { cloth } = capeColors(name);
  return { "--cape": cloth, "--trim": capeInk(name) };
}

function keyOf(skill: Skill) {
  return skill.name.toLowerCase().replace(/[^a-z]/g, "");
}

function sentences(text: string) {
  return text
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function bandFrom(label: string, text: string): SkillBand {
  const parts = sentences(text);
  return {
    band: label,
    method: parts[0] ?? text,
    place: parts[1] ?? text,
    click: parts[2] ?? parts[0] ?? text,
    leave: parts[3] ?? parts[parts.length - 1] ?? text,
  };
}

export function skillGuides(): SkillGuide[] {
  return SKILLS.map((skill) => {
    const key = keyOf(skill);
    const osrs = skill.editions.includes("OSRS");
    const note = osrs ? OSRS_NOTE[key] : RS3_NOTE[key];
    const page = note?.page ?? skill.name;
    const wiki = osrs ? osrsWiki(note?.wikiPage ?? page) : rs3Wiki(note?.wikiPage ?? page);
    const trainPage = note?.train ?? (osrs ? `Pay-to-play_${page}_training` : `${page}_training`);
    const train = osrs ? osrsWiki(trainPage) : rs3Wiki(trainPage);
    const client = osrs ? "Old School RuneScape" : "RuneScape";
    const tagline = note?.tagline ?? "Confirm the live wiki for the method.";
    const deck =
      note?.deck ??
      `${skill.name} is trained on ${client}. ${tagline} The live wiki keeps the rate.`;
    const wear = note?.wear ?? "Wear what the method needs. Confirm the live page.";
    const money = note?.money ?? "Wiki wins on whether the method pays. Wiki for this month’s gp/XP.";
    return {
      skill,
      slug: skill.id,
      hook: tagline,
      tagline,
      deck,
      unlock: note?.need ?? "Confirm the unlock on the live wiki before you buy supplies.",
      route: note?.route ?? [
        bandFrom("Early", note?.early ?? "Start where the training page starts."),
        bandFrom("Mid", note?.mid ?? "Confirm the live wiki."),
        bandFrom("Late", note?.late ?? "Confirm the live wiki."),
      ],
      inventory:
        note?.inventory ??
        `${wear} The bag is that kit and the input the method uses. Leave the bank tab, the spare style, and anything you cannot stand to lose.`,
      money,
      iron:
        note?.iron ??
        "If you cannot buy the supplies, stay on the earlier band and gather the input yourself. A main’s shopping list is not an iron route.",
      kit: wear,
      mistakes: note?.mistakes ?? note?.watch ?? "Confirm the live wiki before you copy a method from the other client.",
      stop:
        note?.stop ??
        "Stop when the unlock you came for is done. A diary, a prayer, a weapon tier. 99 is a cape. It is not required to go do the thing this skill was for.",
      wiki,
      train,
      moving: note?.moving,
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

const CANON_KEY = "rbs-skills-canon";

export function loadSkillCanon(): "OSRS" | "RS3" {
  try {
    const value = localStorage.getItem(CANON_KEY);
    if (value === "OSRS" || value === "RS3") return value;
  } catch {
    /* private mode */
  }
  return "OSRS";
}

export function saveSkillCanon(canon: "OSRS" | "RS3") {
  try {
    localStorage.setItem(CANON_KEY, canon);
  } catch {
    /* private mode */
  }
}
