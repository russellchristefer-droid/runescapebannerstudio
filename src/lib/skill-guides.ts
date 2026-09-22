import type { CSSProperties } from "react";
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
  words?: string;
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
  words?: string;
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
    need: "You can start today. A dragon scimitar (a strong curved sword) wants the quest Monkey Madness I. An abyssal whip wants 70 Slayer.",
    money: "Crabs cost nothing. A whip costs coins. Drops from your tasks pay some of it back. Check the wiki for this month's price.",
    early: "Fight sand crabs or ammonite crabs (monsters that barely hit back). Stand on the beach in Hosidius, or on Fossil Island. Click the crab, and eat if your health drops. Leave at 60, or when you can swing a dragon scimitar.",
    mid: "Kill the monster your Slayer master assigned (a task is their list). Stand where that master sent you. Click it with the best sword you can afford. Leave a task only if the wiki skip list calls it a waste.",
    late: "Stay on Slayer with the best sword you can afford. Stand on the task, not back on the crab beach. Click prayer and a special attack before you shop for a new sword. Leave when the boss you wanted is unlocked.",
    wear: "Wear a Slayer helmet on a task. It helps you hit that monster. Wear armour that adds Strength, not a costume. Bring food you will actually eat.",
    afk: "Sand crabs and ammonite crabs. You can look away. This is not the fast road to 99.",
    fast: "Slayer, plus a dwarf cannon on tasks that allow it. Check the wiki before you fire one.",
    watch: "Do not buy a whip before you have 70 Slayer. Do not train Attack while Strength sits far behind. The hits will miss.",
    page: "Attack",
    train: "Pay-to-play_Melee_training",
  },
  strength: {
    tagline: "Melee damage. Train it with Attack on the same task.",
    need: "Same doors as Attack. The sword you can hold is the unlock.",
    money: "Same coins as Attack. Armour that adds Strength makes the hits bigger. Check the wiki before you buy a second set.",
    early: "Fight the same crabs as Attack. Stand on the same beach. Click the Strength style if Attack is already ahead. Leave at 60, or when the two skills are close.",
    mid: "Do the same Slayer tasks as Attack. Stand on the task the master gave you. Click the monster and keep Attack within about ten levels. Leave if one skill runs twenty levels ahead.",
    late: "Stay on the same late Slayer spots as Attack. Stand where the task is. Click the style that is behind. Leave when both are high enough for the boss you want.",
    wear: "Wear armour that adds Strength. Wear a Slayer helmet on a task. Bring food you will eat.",
    afk: "The same crabs. You can look away. It is slow.",
    fast: "Slayer, plus a cannon on tasks the wiki says are allowed.",
    watch: "Do not take Strength to 99 while Attack sits at 60. You will miss, then wonder why.",
    page: "Strength",
    train: "Pay-to-play_Melee_training",
  },
  defence: {
    tagline: "Melee defence. Wear the armour the monster hits through.",
    need: "You can start with the armour you own. Barrows gloves and a fighter torso help. They are not required to click the skill.",
    money: "Armour is the cost. The Defence levels mostly come free while you do Slayer. Do not buy a set you cannot repair.",
    early: "Fight the same crabs as Attack. Stand on the same beach. Click shared combat so Defence rises with the other two. Leave when you can wear the next armour you already own.",
    mid: "Do Slayer in rune, Barrows, or Bandos armour you can afford. Stand on the task. Click the monster, and eat when your health drops. Leave the bronze in the bank.",
    late: "Stay on Slayer, and on trips that prepare you for a boss. Stand where you can eat and pray. Click food before the next hit lands. Leave when you survive the trip you came to learn.",
    wear: "Wear the best armour you can repair. Wear a Slayer helmet on a task. Bring food.",
    afk: "The same crabs. Slow, and safe.",
    fast: "Slayer. Defence rises with the kill.",
    watch: "Do not fight crabs in no armour for a picture. The next real task will knock you over.",
    page: "Defence",
    train: "Pay-to-play_Melee_training",
  },
  ranged: {
    tagline: "Distance damage. Ammo is the cost. Chin only your own world.",
    need: "A bone crossbow or a magic shortbow (a cheap bow) is enough to start. A toxic blowpipe wants the boss Zulrah. A bow of faerdhinen wants The Gauntlet.",
    money: "Arrows and darts are the bill. Chinchompas (throwing animals that hit a whole pile) cost a lot. Check the wiki before you buy a stack.",
    early: "Shoot cows, the Ranged Guild targets, or your first Slayer tasks. Stand where you will not get piled. Click cheap knives or a bone crossbow. Leave when you can use a magic shortbow, around the mid forties.",
    mid: "Do Slayer with a magic shortbow or a crossbow you can afford. Stand on the task. Click the monster, and use a cannon only if the wiki allows it. Leave the cheap knives behind once the bow is in your hands.",
    late: "Throw chinchompas at maniacal monkeys, or stay on Slayer with a blowpipe if you can pay for the scales. Stand on a world you can hold. Click the pile, then eat. Leave if the tile is crowded or the scales run out.",
    wear: "Wear Ava's device (it saves some ammo). Wear blessed dragonhide. Wear a Slayer helmet on a task. A necklace of anguish helps if you already own one.",
    afk: "Crabs with a cheap bow. You can look away. It is slow.",
    fast: "Chinchompas. Check the wiki for the live spot and the prayer.",
    watch: "Do not throw chinchompas on a packed world. Do not buy a blowpipe with no money left for scales.",
    words: "Chinchompa: throwing animals that hit a whole pile. Ava's device: a backpack that saves some arrows. Blowpipe: Zulrah's dart pipe. The scales are the real cost.",
    page: "Ranged",
    train: "Pay-to-play_Ranged_training",
  },
  prayer: {
    tagline: "Bones on a gilded or chaos altar. Protect inventory.",
    deck: "Prayer keeps you alive in a fight. This page is Old School. If you can use the shop, you buy the bones. If you cannot, you use the bones from monsters you killed.",
    need: "The Restless Ghost and Priest in Peril open the early path. A gilded altar is a fancy altar in a player house. The chaos altar is in level 38 Wilderness. Piety, a strong melee prayer, wants level 70 and the King's Ransom quests.",
    money: "A gilded altar is the hour you can buy. Use dragon bones, then bigger bones later. The chaos altar saves bones, and a player can take your bag. Check the wiki for this month's price. Stop buying the expensive bones when the next boss only needed piety.",
    words: "Gilded altar: a fancy altar in a player house. Both burners must be lit. Chaos altar: a Wilderness altar that can save bones and lose your bag. Piety: the strong melee prayer at level 70.",
    early: "Use quest rewards, then big bones on any altar.",
    mid: "Use dragon bones on a gilded altar with both burners lit.",
    late: "Use better bones on that same altar, or the chaos altar if you accept the risk.",
    wear: "At a house, wear nothing you would cry over. In the Wilderness, wear cheap robes, one teleport, and protect item.",
    afk: "None. You click every bone.",
    fast: "The chaos altar, or a gilded altar with both burners lit and someone running bones for you.",
    watch: "Do not take a cash stack to the chaos altar. Do not offer bones on a gilded altar with the burners out. Do not buy 99 before you have piety.",
    route: [
      {
        band: "1–43",
        method: "Do the prayer quests first. Then offer the cheapest bone you will actually use. Big bones are enough.",
        place: "Any altar. Lumbridge or Edgeville is fine. You are not in the Wilderness yet.",
        click: "Click one bone, then offer it. This is a click. You cannot look away.",
        leave: "Leave when protection prayers unlock. That is why you came. Do not sit here until 70.",
      },
      {
        band: "43–70",
        method: "Offer dragon bones on a gilded altar. Light both burners. A friend's house is fine if yours has no burners.",
        place: "A player-owned house. Light the burners with clean marrentill (a herb). Un-note the bones at a bank first.",
        click: "Offer, offer, offer. A friend running bones makes it faster. You can still do it alone.",
        leave: "Leave at 70 if piety is what you came for. Stay only if the next boss wants a higher prayer.",
      },
      {
        band: "70–77",
        method: "Offer superior dragon bones on the same gilded altar. Rigour is 74, plus a scroll. Augury is 77, plus its scroll. The bone does not unlock the scroll.",
        place: "The same house. Do not move this step into the Wilderness unless you chose that risk on purpose.",
        click: "Same offer click. Both burners still have to be lit. An unlit altar is a worse altar.",
        leave: "Leave when the prayer your boss wants is on. 77 is enough for almost every raid.",
      },
      {
        band: "Chaos altar",
        method: "Offer the same bones at the chaos altar. Some bones get saved. A player killer can take the rest.",
        place: "Level 38 Wilderness. Use a burning amulet to the lava maze, then run. Bring a teleport you will actually click.",
        click: "Offer until the bag is thin, then leave. Do not finish the last bone because it feels expensive.",
        leave: "Leave the moment someone shows up. This is not the house kit. Do not bring a cash stack.",
      },
    ],
    inventory:
      "House: dragon bones that are not noted, clean marrentill, and a house teleport. Wilderness: the same bones, a burning amulet, one teleport, and nothing else you mind losing. Noted bones do not go on the altar.",
    iron: "You do not buy a mountain of bones. Use bones from monsters you killed. A house altar is the calm road. The chaos altar is only for a bag you already decided to risk. The Ectofuntus is the slow road if you will not enter the Wilderness.",
    stop: "43 unlocks protection prayers. 70 unlocks piety. 74 and 77 unlock rigour and augury if you own the scrolls. 99 is a cape. If you already kill bosses, you can stop at 70 or 77.",
    mistakes:
      "Do not take the bank to the chaos altar. Do not use a gilded altar with the burners out. Do not buy 99 before you even have piety.",
    page: "Prayer",
  },
  magic: {
    tagline: "Burst and barrage for XP. Auto-cast is not the grind.",
    need: "Desert Treasure unlocks the Ancient spellbook. Ice Burst wants 70 Magic. Ice Barrage wants 94. The runes are the cost.",
    money: "Bursting and barraging spend runes. Splashing (standing still so a spell misses on purpose) is not a real method. Check the wiki for rune prices.",
    early: "Use quest rewards, wind or water blast on a Slayer task, or high alchemy if you already have items. Stand at a bank for alchemy, or on the task. Click the spell, then the monster or the item. Leave the weak bolts behind once you can burst.",
    mid: "Cast Ice Burst on dust devils or the monkey spot if you paid for it. Stand where several monsters can be frozen together. Click the spell in the middle of the pile, and pray. Leave if you have no food and no prayer left.",
    late: "Cast Ice Barrage on those same spots. Stand in the same pile. Click barrage, then eat before the next hit. Leave when the runes run out, or when you can already do the boss you wanted.",
    wear: "Wear Void, or Ahrim or Ancestral if you can afford it. Wear an occult necklace. Wear a Slayer helmet on a task.",
    afk: "High alchemy is the only real look-away method. It is not the fast road to 99.",
    fast: "Ice Barrage. Check the wiki for the runes and the current spot.",
    watch: "Do not burst with no prayer and no food. Do not buy Ancestral robes before you can even cast barrage.",
    words: "Ice Burst: a freeze spell at 70 Magic that hits a pile. Ice Barrage: the same spell at 94, harder. Dust devil: a Slayer monster you can freeze.",
    page: "Magic",
    train: "Pay-to-play_Magic_training",
  },
  runecraft: {
    tagline: "Essence and pouches to the altar. Guardians of the Rift if you want a minigame.",
    need: "Rune Mysteries starts you. Lost City opens cosmic runes. Heroes' Quest opens death runes. Pouches (bags that hold extra essence) come from the Abyss.",
    money: "Lava runes can pay. Blood runes and soul runes can pay. Guardians of the Rift is for levels first. Check the wiki for this month's price.",
    early: "Do the quests, then craft air runes. Stand at the air altar. Click essence into the altar, then run back. Leave when you can use the small pouch.",
    mid: "Craft lava runes with Magic Imbue, or play Guardians of the Rift. Stand at the fire altar for lavas, or inside the Rift. Click the essence, then the altar. Leave lavas if you will not watch the clicks.",
    late: "Craft blood runes from 77, or soul runes from 90. Stand at that altar. Click the pouch, then the altar, then the bank. Leave for the Rift if you want the outfit and a calmer click.",
    wear: "Wear the Raiments of the Eye if you have them. Wear a stamina potion. Bring the pouches.",
    afk: "Guardians of the Rift is a minigame. It is not look-away. The Ourania altar is clicky too.",
    fast: "Lava runes, or the blood and soul method the wiki ranks this month.",
    watch: "Do not run the Abyss with no food and a cash stack. Do not craft without a pouch once you can hold one.",
    words: "Essence: the rock you turn into runes. Pouch: a bag that holds extra essence so you run less. Guardians of the Rift: the minigame where you feed a rift.",
    page: "Runecraft",
  },
  construction: {
    tagline: "Planks on a workbench. Mahogany Homes if you want calmer XP.",
    need: "You can start at level 1. A servant (a helper in your house) comes later. The mythical cape rack wants Dragon Slayer II.",
    money: "You buy this skill. Oak planks and mahogany planks are the bill. Mahogany Homes costs less and is slower. Check the wiki for this month's price.",
    early: "Build with cheap planks, and do the construction quests. Stand in your own house. Click the build option on a chair or a larder. Leave the cheap wood when oak larders open.",
    mid: "Build oak larders, then mahogany tables, or do Mahogany Homes contracts. Stand at the workbench, or at the contract house. Click build, then send the servant for more planks. Leave mahogany alone until you can afford the pile.",
    late: "Build the bench the wiki ranks, or keep doing Homes. Stand in the house. Click build until the bench or the contract is done. Leave when the rooms you wanted exist.",
    wear: "Wear the carpenter's outfit if you have it. Bring a crystal saw. The servant is the real tool.",
    afk: "This is not look-away. Mahogany Homes is slower and kinder.",
    fast: "Mahogany tables, or the bench the wiki ranks. Check the price first.",
    watch: "Do not build with no servant once you can hire one. Do not buy mahogany at level 40.",
    words: "Plank: a board you buy, then build. Servant: a helper in your house who fetches more. Mahogany Homes: slower contracts in other people's houses.",
    page: "Construction",
  },
  hitpoints: {
    tagline: "Comes free on Slayer and combat. Food is the only plan.",
    need: "Nothing. It rises while you fight.",
    money: "Food is the only cost. There is no Hitpoints shop.",
    early: "Fight whatever you are already fighting for Attack. Stand on that same spot. Click the monster, and eat. Leave the combat dummy alone.",
    mid: "Stay on your Slayer tasks. Stand where the task is. Click food when the hits land. Leave any plan that is only a Hitpoints number.",
    late: "Keep fighting on Slayer. Stand where you can eat. Click food before the bag is empty. Leave when your other combat skills are ready.",
    wear: "Wear the armour of the style you clicked. Bring food.",
    afk: "The same crabs. Slow.",
    fast: "Slayer.",
    watch: "Do not lamp Hitpoints and then show up to a task with no food.",
    page: "Hitpoints",
    train: "Hitpoints",
  },
  agility: {
    tagline: "Rooftops until 62. Hallowed Sepulchre after that.",
    need: "You can start on a rooftop. Graceful is the light outfit you buy with marks. The Hallowed Sepulchre wants 52 for the first floor, and 62 before people mean it.",
    money: "Marks of grace buy amylase (a crystal you sell or drink). The Sepulchre can pay. Mostly this skill costs time.",
    early: "Run rooftop courses. Stand at the start of the course in Draynor, then Al Kharid, then Varrock. Click each obstacle in order. Leave for Canifis at 40, and Seers' Village if you have the hard diary.",
    mid: "Keep the best rooftop you can finish, or start the Sepulchre. Stand at the course entrance. Click the obstacles, and eat the failure. Leave a course you fail more than you finish.",
    late: "Run the Hallowed Sepulchre. Stand in Darkmeyer. Click the floor you can clear without dying. Leave for the Ardougne rooftop if you want a simpler click.",
    wear: "Wear Graceful. Bring stamina potions. The rings come later.",
    afk: "None. You click every jump.",
    fast: "The Hallowed Sepulchre. Check the wiki for which floor your level opens.",
    watch: "Do not call floor one at level 52 the road to 99. Do not buy Brimhaven tickets with no token plan.",
    words: "Rooftop: a city course you lap for marks. Graceful: the light outfit those marks buy. Hallowed Sepulchre: the hard course in Darkmeyer.",
    page: "Agility",
  },
  herblore: {
    tagline: "Secondaries first. Mix the potion you will drink or sell.",
    need: "Druidic Ritual starts the skill. A secondary is the second item in a potion, like an eye or a dust. You need it before the herb matters.",
    money: "You spend herbs and secondaries. Potions you drink or sell can pay it back. Check the wiki for this month's price. A herb stack with no secondary is not a plan.",
    early: "Mix attack, strength, and energy potions you will drink. Stand at a bank. Click the herb on the vial, then the secondary. Leave the plan that is only cleaning grimy herbs.",
    mid: "Mix prayer potions, super restores, and the super combat potions. Stand at the bank. Click one inventory, bank it, repeat. Leave a potion you will not drink and cannot sell.",
    late: "Mix saradomin brews, super combats, or the potion the wiki ranks. Stand at the bank. Click the mix until the stack is gone. Leave if you are only cleaning grimy herbs.",
    wear: "Wear an amulet of chemistry if you own one. It sometimes saves a dose. Clothes do not matter. The secondary stack does.",
    afk: "None. You mix, or you are not training.",
    fast: "The potion the wiki ranks this month. Secondaries already in the bank.",
    watch: "Do not buy a 99 of herbs with no secondaries. Do not clean ten thousand grimy herbs and call it Herblore.",
    words: "Secondary: the extra item a potion needs, like an eye or a dust. Grimy: an uncleaned herb. Clean it, then mix it.",
    page: "Herblore",
  },
  thieving: {
    tagline: "Knights, then elves. Eat on stun. Do not stand in multi if you are marked.",
    need: "You can pick pockets in Lumbridge. Elves want the quests that open Prifddinas. The Ardougne diary helps the knights.",
    money: "Knights and elves drop coins. Pyramid Plunder can drop a sceptre. Do not pick pockets in the Wilderness. You will donate the loot.",
    early: "Pickpocket men, bakers, and warriors. Stand in Lumbridge or the warrior guild. Click the person, and eat when you get stunned. Leave when Ardougne knights are open.",
    mid: "Pickpocket Ardougne knights if you have the hard diary. Stand in the corner by the bank. Click the knight, eat the stun, click again. Leave for elves when you can reach them.",
    late: "Pickpocket elves in Prifddinas. Stand in a corner they do not walk out of. Click, eat, click again. Leave if you have no food.",
    wear: "Wear the rogue outfit if you have it. It can double the loot. Bring a dodgy necklace and food.",
    afk: "None. Knights are a click.",
    fast: "Elves, or whoever the wiki ranks this month.",
    watch: "Do not pickpocket elves with no food. Do not blackjack on a phone if you cannot hit the timing.",
    words: "Stun: the slap that stops you. Eat before the next one. Knight: the Ardougne guard by the bank. Elf: the late pocket in Prifddinas.",
    page: "Thieving",
  },
  crafting: {
    tagline: "Molten glass, hides, then battlestaves if you bought the orbs.",
    need: "You can start with leather. Giant seaweed is for glass. Lunar Diplomacy unlocks Superglass Make (a spell that melts a whole inventory).",
    money: "Glass and hides often cost coins. Battlestaves can pay if you bought the orbs. Check the wiki before you buy a mountain of one hide.",
    early: "Make leather armour, gold jewellery, and use quest rewards. Stand at a bank. Click the leather or the gold. Leave the toy jewellery when glass or hides open.",
    mid: "Blow molten glass from seaweed, or make green and blue dragonhide bodies. Stand at a bank. Click the pipe on the glass, or the needle on the hide. Leave a hide you cannot sell.",
    late: "Make battlestaves, or the hide the wiki ranks. Stand at a bank. Click one inventory, bank it, repeat. Leave if you are blowing glass with no seaweed runs behind it.",
    wear: "Bring a glassblowing pipe. The cape comes later. A staff that teleports to a bank saves the walk.",
    afk: "Cutting gems is slower and you can look away a little. It is not the fast road.",
    fast: "Superglass Make, then blow the glass. Or battlestaves.",
    watch: "Do not buy a pile of black dragonhide with nobody to sell it to. Do not plan glass with no seaweed.",
    page: "Crafting",
  },
  fletching: {
    tagline: "Broad arrows and darts at the bank. Bows if you cut the logs.",
    need: "You can start with logs and a knife. Broad arrows want a Slayer unlock. Darts want the mould path the wiki lists.",
    money: "Broad arrows cost coins. Stringing yew and magic longbows can pay. This is a bank skill. Check the price first.",
    early: "Cut arrow shafts and string shortbows. Stand at a bank. Click the knife on the log. Leave the shortbows when maple and yew open.",
    mid: "String maple or yew longbows, or make broad arrows once they are unlocked. Stand at a bank. Click one inventory, bank it, repeat. Leave unstrung bows you will never string.",
    late: "Make broad arrows, darts, or magic longbows. Stand at a bank. Click the stack until it is gone. Leave if the broad arrows are still locked.",
    wear: "Nothing you wear changes the click. Bring a knife. Use a bank preset.",
    afk: "Stringing bows. You can look away between inventories. It is slow.",
    fast: "Darts or broad arrows.",
    watch: "Do not make broad arrows before the Slayer unlock. Do not fletch a 99 of bows you will never string.",
    page: "Fletching",
  },
  slayer: {
    tagline: "The task on the board. Skip list lives on the wiki.",
    need: "You can take a task at level 1. Some monsters want a quest first. A boss task wants the Slayer level and the kill.",
    money: "This can pay if you skip the bad tasks. A bad task burns the hour. Check the wiki skip list.",
    early: "Use Turael only if you need points, then Mazchna or Vannaka. Stand in Burthorpe or Canifis. Click the master, then the monster. Leave Turael once a better master will take you.",
    mid: "Use Nieve or Steve, or Konar if you want her keys. Stand where the task sends you. Click the monster with the right weapon. Leave a task the skip list calls junk.",
    late: "Use Duradel, or Konar if you still want her keys. Stand on the task. Click a cannon or a burst spell only where the wiki allows it. Leave Laniakea to the other game.",
    wear: "Wear a Slayer helmet. Bring a cannon where it is allowed. Pray against the monster that needs it.",
    afk: "Some tasks, like dust devils with prayer. Not the whole 99.",
    fast: "A skip list, a cannon, and the burst tasks. Check the wiki table.",
    watch: "Do not boost points with Turael at 80 Slayer and call that the plan. Do not take every Konar task with no points.",
    words: "Task: the monster a master tells you to kill. Skip: spend points to cancel a bad one. Block: lock a monster out of the list.",
    page: "Slayer",
  },
  hunter: {
    tagline: "Birdhouse runs on a timer. Chinchompas only on a world you can hold.",
    need: "You can start with bird traps. Bird houses want Fossil Island. Red chinchompas want 63 Hunter. Black chinchompas are in the Wilderness.",
    money: "Bird houses pay nests. Chinchompas pay if you keep the world. Check the wiki for the price.",
    early: "Catch crimson swifts, then set bird houses. Stand at the Fossil Island spots on a timer. Click the empty house, put in seeds, and leave. Come back when the clock says they are full.",
    mid: "Hunt red chinchompas, or keep the bird houses. Stand in the Feldip Hills for reds. Click the box trap when it falls. Leave a trap line you cannot see.",
    late: "Hunt black chinchompas only if you accept the Wilderness. Stand in a cheap gear set. Click the traps, and teleport when someone arrives. Leave for herbiboar at 80 if you want herblore supplies instead.",
    wear: "Wear camouflage if you have it. In the Wilderness, wear gear you can lose.",
    afk: "Bird houses are a timer. You set them and walk away. Box traps are only half look-away.",
    fast: "Black chinchompas, or whoever the wiki ranks.",
    watch: "Do not hunt black chinchompas with a cash stack. Do not forget the bird house clock.",
    words: "Bird house: a Fossil Island box you fill and come back to. Chinchompa: an animal you sell or throw. Black ones live in the Wilderness.",
    page: "Hunter",
  },
  mining: {
    tagline: "Motherlode Mine, then amethyst or the rock the wiki ranks.",
    deck: "You mine ore, buy the prospector outfit, and later choose amethyst or stars. This page is Old School. You do not need 99 to go kill a boss.",
    need: "Iron is fine from 15. The Motherlode Mine wants 30. The upper floor wants 72. Amethyst wants 92, and the expert gloves if you want the ore to be worth it.",
    money: "The Motherlode gives nuggets and ore. That is the mixed hour. Amethyst is the coin hour. 3-tick granite is the fast hour, and a bad money method. Check the wiki for this month's ore price.",
    words: "Motherlode Mine: the cave under Falador where you sack pay-dirt. Pay-dirt: muddy ore you wash in the hopper. 3-tick: a fast click rhythm. Skip it unless you will watch.",
    early: "Mine iron, then walk into the Motherlode.",
    mid: "Wash pay-dirt in the Motherlode until 92.",
    late: "At 92, pick amethyst, stars, or granite. Do not rotate them to feel busy.",
    wear: "Wear the prospector outfit once you own it. At amethyst, wear the expert mining gloves. Use the best pick you can hold.",
    afk: "Amethyst and shooting stars. You can look away.",
    fast: "3-tick granite, only if you will actually tick.",
    watch: "Do not mine iron all the way to 99. It is slow on purpose. Do not mine amethyst with no gloves.",
    route: [
      {
        band: "1–15",
        method: "Mine tin and copper, or finish Doric's Quest if you have not. You want a pick and a bank, not a 99.",
        place: "Lumbridge swamp, or the mine south-east of Varrock. The rock matters less than the walk back.",
        click: "Click the rock. Drop the ore, or bank it. This is light.",
        leave: "Leave at 15 for iron. Staying on copper is how an hour disappears.",
      },
      {
        band: "15–30",
        method: "Mine iron. Bank it if you will smith it. Drop it if you only want the level.",
        place: "The west Varrock mine, or Al Kharid. Do not pick a tile you will still be on at 70.",
        click: "Click three rocks, drop, repeat. This is not the fast tick method.",
        leave: "Leave at 30. The Motherlode is the next door. Do not mine iron all the way to 99.",
      },
      {
        band: "30–92",
        method: "Mine pay-dirt in the Motherlode. Put it in the hopper. Empty the sack when it is full. Buy prospector pieces as the nuggets come.",
        place: "The Motherlode Mine, under Falador. Use the upper level once you have 72.",
        click: "Click a vein. You can look away for a moment. You cannot log out and call it mined.",
        leave: "Leave at 92 if you want amethyst or stars. Leave earlier only for a diary you already finished.",
      },
      {
        band: "92+",
        method: "At 92 you get a choice. Amethyst is for coins. Stars are for when you want to look away. 3-tick granite is the fast road.",
        place: "Amethyst is in the Mining Guild. Stars are wherever the current star is. Granite is the quarry.",
        click: "Amethyst and stars let you look away. Granite only works if you watch every click.",
        leave: "If you will not watch the ticks, stay on amethyst or stars. 92 was the real line. 99 is a cape.",
      },
    ],
    inventory:
      "Bring the best pick you can use. Wear prospector once you have it. A gem bag helps if you own one. At amethyst, wear the expert gloves. Do not bring a second pick or a hammer.",
    iron: "Stay in the Motherlode longer. The ore and the coal are your supplies. Do not buy granite to pretend you are on a shop account's fast hour.",
    stop: "70 to 80 covers most diaries. 92 is the level that changes the hour. If you already kill bosses, you can stop there. 99 is a cape.",
    mistakes:
      "Do not mine iron all the way to 99. It is slow on purpose. Do not mine amethyst with no expert gloves. Do not sit on stars and tell yourself it is the fast road.",
    page: "Mining",
  },
  smithing: {
    tagline: "Giants’ Foundry or Blast Furnace. Coal bag before the grind.",
    need: "The Giant Dwarf makes the Blast Furnace easy to enter. Sleeping Giants opens the Giants' Foundry. A coal bag from the Motherlode helps.",
    money: "The Foundry and the Blast Furnace can pay. Smithing platebodies at a normal furnace usually does not. Check the wiki.",
    early: "Do the quests, then smith bronze and iron. Stand at a furnace near a bank. Click the ore, then the anvil. Leave for the Foundry or the Blast Furnace as soon as you can.",
    mid: "Smelt steel or mithril at the Blast Furnace, or play the Foundry. Stand on the furnace side. Click the bars and keep the coal bag full. Leave the normal furnace behind.",
    late: "Smelt adamant or rune at the Blast Furnace, or make the swords the wiki ranks. Stand at that same furnace. Click until the coal bag is empty, then refill. Leave platebodies on a normal furnace.",
    wear: "Wear the smiths' outfit if you have it. Wear ice gloves at the Blast Furnace. Bring the coal bag.",
    afk: "The Foundry is a minigame. The Blast Furnace is clicks.",
    fast: "The bar the wiki ranks at your level.",
    watch: "Do not smith rune platebodies on a normal furnace. Do not use the Blast Furnace with no coal bag.",
    words: "Blast Furnace: the fast dwarf furnace in Keldagrim. Coal bag: a Motherlode bag that holds extra coal. Giants' Foundry: the sword minigame.",
    page: "Smithing",
  },
  fishing: {
    tagline: "Barbarian fishing or the crate. Cook what you keep.",
    need: "Barbarian fishing wants 48 Fishing, 15 Agility, and 15 Strength, plus Otto's lesson. Minnows and infernal eels have their own levels.",
    money: "Anglerfish and sharks can pay. Barbarian fishing is mostly levels, plus a little Strength and Agility. Check the wiki.",
    early: "Do the fishing quests, then fly fish or catch lobsters. Stand at a spot next to a bank. Click the spot until the bag is full. Leave the shrimp once trout is open.",
    mid: "Catch leaping fish with barbarian fishing, then cut them. Stand at Otto's spot by the Barbarian Outpost. Click the spot, drop the fish, and repeat. Leave if you need food instead of levels.",
    late: "Catch minnows, anglerfish, or infernal eels. Stand at that fishing spot. Click, bank, repeat. Leave the 2-tick harpoon alone unless you will watch every click.",
    wear: "Wear the angler's outfit from the Temple Trawler. Use a dragon harpoon if you have one. A fish barrel helps if you own it.",
    afk: "Lobsters, monkfish, and sharks next to a bank. You can look away. It is slow.",
    fast: "Barbarian fishing, or the tick method on the wiki if you will actually tick.",
    watch: "Do not fish lobsters to 99 and call it a plan. Do not stand on minnows with no food in a crowd.",
    words: "Barbarian fishing: leaping fish you cut for levels, not dinner. Minnow: a small fish you trade for sharks. 2-tick: a fast click. Skip it if you will not watch.",
    page: "Fishing",
  },
  cooking: {
    tagline: "Hosidius range so it does not burn. Wines if you bought the grapes.",
    need: "The Hosidius kitchen burns less food. Cooking gauntlets come from the Family Crest quest.",
    money: "Fish you caught can pay. Wines and one-tick karambwans are fast, and they cost supplies. Check the wiki.",
    early: "Cook the cheap fish from your quests. Stand at any range. Click the fish on the range. Leave a range that still burns everything.",
    mid: "Cook trout, swordfish, or monkfish in the Hosidius kitchen. Stand at that range. Click one bag, bank it, repeat. Leave the Lumbridge castle range for sharks.",
    late: "Cook sharks, anglerfish, wines, or karambwans. Stand at Hosidius, or a bank for wines. Click the fish, or the jug on the grape. Leave one-tick karambwans unless you will watch every click.",
    wear: "Wear cooking gauntlets. They burn less. A chef's hat does not matter.",
    afk: "The Hosidius range is a light click. You still click each bag.",
    fast: "One-tick karambwans. Only if you will watch the clicks.",
    watch: "Do not cook sharks on the Lumbridge range. Do not start wines with no jugs.",
    words: "Hosidius kitchen: the range that burns less food. Wine: a jug of water and a grape. One-tick: a fast cook rhythm. Skip it if you will not watch.",
    page: "Cooking",
  },
  firemaking: {
    tagline: "Wintertodt. Warmth is the whole mechanic.",
    need: "Wintertodt, the cold boss, wants 50 Firemaking for a real trip. Bring warm clothes and an axe.",
    money: "Wintertodt pays supply crates. Burning yew logs in a line is levels you buy. Check the wiki.",
    early: "Burn any logs until 50. Stand by a bank. Click the tinderbox on the log. Leave for Wintertodt the day you hit 50.",
    mid: "Fight the Wintertodt. Stand by a brazier. Click the roots, fletch or burn them, and heal when the cold hits. Leave if you walked in wearing robes.",
    late: "Stay at the Wintertodt until you are done. Stand on the same brazier. Click roots until the round ends. Leave only if you hate the minigame.",
    wear: "Wear warm clothes. A warm ring helps if you own one. Bring an axe. You do not need your own tinderbox if the braziers are lit.",
    afk: "Wintertodt is a minigame. You cannot look away.",
    fast: "Wintertodt, the way the wiki lists the crates this month.",
    watch: "Do not walk into Wintertodt in robes. Do not burn magic logs on the ground and call it 99.",
    words: "Wintertodt: the cold boss. You feed braziers. Warmth: clothes that stop the cold eating you. Roots: the logs you chop between hits.",
    page: "Firemaking",
    train: "Wintertodt",
    wikiPage: "Wintertodt",
  },
  woodcutting: {
    tagline: "The tree you can camp. Forestry is extra XP on the same tile.",
    need: "You can chop a tree today. Forestry events want other players on the same world. Redwood wants 90.",
    money: "Yews and magic trees can pay. Redwoods are mostly levels. Bird nests are a bonus. Check the wiki.",
    early: "Chop oaks, willows, and teaks. Stand next to a bank if you can. Click the tree, then drop or bank the logs. Leave normal trees behind.",
    mid: "Chop yews, maples, or sulliusceps if Fossil Island is open. Stand on a tree you can camp. Click the tree and look away for a moment. Leave a tree that is always taken.",
    late: "Chop redwoods, and join Forestry if other players are on the tree. Stand in the Woodcutting Guild. Click the tree, and the event if one starts. Leave if you are still on normal trees.",
    wear: "Wear the lumberjack or forestry outfit if you have it. Use a dragon axe. Bring a felling axe only if the event asks.",
    afk: "Redwoods and yews. You can look away.",
    fast: "Teaks, or the forestry spot the wiki ranks.",
    watch: "Do not chop normal trees to 99. Do not join Forestry with no axe special if the event wants one.",
    words: "Forestry: extra events on a busy tree. You stay on your tree. Redwood: the late guild tree you can look away from. Sulliuscep: mushroom trees on Fossil Island.",
    page: "Woodcutting",
  },
  farming: {
    tagline: "Compost from seed. Tree and herb runs while you walk.",
    need: "You can plant a seed today. Compost stops disease. The Farming Guild wants 45. Diaries add patches.",
    money: "Herb runs and tree runs can pay. Tithe Farm is levels, not coins. Check seed prices on the wiki.",
    early: "Do the farming quests, then plant hops with ultracompost. Stand at a patch. Click the compost, then the seed. Leave any patch that has no compost.",
    mid: "Run herbs, and fruit trees when you can afford the saplings. Stand at each patch in the same order every time. Click, note the disease, move to the next patch. Leave allotments if you do not need the food.",
    late: "Run trees, fruit trees, hardwoods, and herbs on a timer. Stand at the first patch and follow the lap. Click, teleport, click. Leave Tithe Farm for the days you want to sit in one place.",
    wear: "Wear the farming outfit if you have it. Bring magic secateurs and a bottomless compost bucket.",
    afk: "The crop grows while you are gone. The run itself is a few clicks.",
    fast: "Tithe Farm. Check the wiki for the current fruit.",
    watch: "Do not farm with no compost. Do not buy a 99 of dragonfruit seeds with no patch order.",
    words: "Run: visit every patch, plant, and leave. Compost: the bucket that stops disease. Tithe Farm: one field you stay in for levels, not coins.",
    page: "Farming",
  },
  sailing: {
    tagline: "Start at Pandemonium. Confirm the live training page before you buy supplies.",
    need: "Start at Pandemonium. That is the port. Do the tutorial before you buy a boat full of supplies.",
    money: "Do not buy a bank of materials until the live wiki says the method still exists.",
    early: "Do the tutorial and the first jobs on Pandemonium. Stand where the tutorial puts you. Click the job it names. Leave any video that is older than the last patch.",
    mid: "Use the job the official training page lists at your level. Stand on that dock. Click the action the page names. Leave any route this site invented.",
    late: "Follow the live page again. It names the ship and the job. Stand there. Click that job.",
    wear: "Wear what the live page lists. Do not copy a kit from the week the skill launched.",
    afk: "Check the wiki. This page will not guess.",
    fast: "Check the wiki. The fast job is still moving.",
    watch: "Do not treat a launch-week blog as the road to 99.",
    words: "Pandemonium: the port where Sailing starts. Voyage: a trip the game gives you. Facility: a building on the dock.",
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
    need: "You can start today. Your weapon tier follows your Attack level. Revolution is the ability bar that fires for you until you choose otherwise.",
    money: "A melee weapon you can repair is the bill. Slayer drops pay some of it back. Do not buy a bow to train Attack. Check the wiki for the price.",
    early: "Fight cows in Lumbridge, or take the first Slayer tasks in Taverley. Stand where those monsters are. Click the monster with Revolution on. Leave the combat dummy behind.",
    mid: "Do Slayer with a weapon that matches the monster's weakness. Stand on the task. Click the monster, and use an aggression potion only if the task wants one. Leave a second camp that ignores Slayer.",
    late: "Stay on Slayer with the best melee weapon you can repair. Stand on the task. Click the bar, then eat. Leave boss practice on the Bosses page.",
    wear: "Wear a Slayer helmet on a task. Use a melee weapon of the tier you can hold. Wear power armour you can repair. Leave Revolution on until you know the bar.",
    afk: "Some Slayer creatures will walk to you. Not every task. The dummy is not the look-away method.",
    fast: "Slayer, with the right weapon, on a task that dies fast. Check the wiki skip list.",
    watch: "Do not train Attack with a staff. Do not turn on full manual at level 40 because a video said so.",
    page: "Attack",
  },
  strength: {
    tagline: "Same tasks as Attack. Damage, not a second camp.",
    deck: "Strength is melee damage on RuneScape. This page is the RuneScape sheet. Train it on the same Slayer task as Attack.",
    need: "Nothing extra. Use the same weapons and the same ability bar as Attack.",
    money: "Same coins as Attack. A weapon that hits harder matters more than a second set of armour.",
    early: "Fight the same cows or Taverley tasks as Attack. Stand on that same spot. Click Strength if Attack is already ahead. Leave any private Strength camp.",
    mid: "Do the same Slayer tasks. Stand on the task. Click the monster and keep Attack within about ten levels. Leave if you opened a second spot just for this number.",
    late: "Stay on Slayer. Stand where the task is. Click the style that is behind. Leave boss damage on the Bosses page.",
    wear: "Wear a Slayer helmet on a task. Use the weapon that matches the weakness. Wear Strength bonus, not a costume.",
    afk: "The same Slayer tasks that walk to you. Not a private world.",
    fast: "The Slayer task that dies to your weapon. Check the wiki skip list.",
    watch: "Do not grind Strength with a staff. Do not ignore Slayer for a second monster camp.",
    page: "Strength",
  },
  defence: {
    tagline: "Armour tier and Death cost. Tank the boss page, not this one.",
    deck: "Defence is the armour tier and the Death cost on RuneScape. This page is the RuneScape sheet. You do not camp it alone.",
    need: "Nothing extra. Your armour tier follows Defence. Repair and death costs are the real gates.",
    money: "Repair and dying are the bill. Check the wiki for the current death cost. Do not buy armour you cannot reclaim.",
    early: "Fight the same cows or early Slayer as Attack. Stand there. Click shared combat so Defence rises too. Leave the armour shop until you need a repair.",
    mid: "Do Slayer in armour you can repair. Stand on the task. Click the monster and eat. Leave tank armour on tasks that barely hit you.",
    late: "Stay on Slayer. Stand where you can eat. Click food before you show off. Leave boss tanking on the Bosses page.",
    wear: "Wear the best armour you can repair for that task. Wear a Slayer helmet on a task. Bring a sign of life if the place can kill you.",
    afk: "Same as Attack. Not a Defence-only dummy.",
    fast: "Slayer. Defence rises with the kill.",
    watch: "Do not walk into a boss in fashion armour at 60 Defence. Do not camp a dummy and spend the food money.",
    page: "Defence",
  },
  ranged: {
    tagline: "Bow tier and ammo. Chinchompas only if you own the tile.",
    deck: "Ranged is a bow, ammo, and a tile you can hold. This page is the RuneScape sheet. Chinchompas are a funded method, not the start.",
    need: "Your bow tier follows Ranged. Chinchompas want Hunter, and a spot the wiki still lists. Quivers follow their own quests.",
    money: "Ammo is the bill. Chinchompas cost a lot. Slayer with a bow you own is the cheap road. Check the wiki.",
    early: "Use a shortbow on Taverley Slayer or in Lumbridge. Stand far enough that you are safe. Click the monster. Leave knives behind once the bow is better.",
    mid: "Do Slayer with the best bow you can repair. Stand on the task. Click the monster, and let some tasks walk to you. Leave crystal and ascension bows until you have already paid for them.",
    late: "Stay on Slayer, or throw chinchompas if you can hold the tile. Stand on a spot that is yours. Click the pile, then eat. Leave a public tile you cannot keep.",
    wear: "Wear a Slayer helmet on a task. Use the best bow you can repair. Bring the ammo that bow wants.",
    afk: "Some Slayer creatures. Chinchompas are not look-away.",
    fast: "Chinchompas on a tile you hold, or Slayer with a real bow. Check the wiki for the spot.",
    watch: "Do not throw chinchompas on a public tile you cannot hold. Do not buy a top bow with no ammo money.",
    words: "Chinchompa: throwing animals that hit a pile and cost coins. Ammo: the arrows or bolts the bow eats. Weakness: the style that monster hates.",
    page: "Ranged",
  },
  prayer: {
    tagline: "Bones on an altar. Curses and Soul Split unlock on the prayer list.",
    deck: "You offer bones on an altar, then you unlock curses. This page is RuneScape. The Wilderness chaos altar is the other game.",
    need: "Use a chapel or a player-owned altar. Ancient Curses want the quest The Temple at Senntisten. Soul Split is on that list. A pile of bones does not unlock it.",
    money: "Dragon bones and frost dragon bones cost coins. A gilded altar or a chapel saves some. Check the wiki. Do not price the Old School chaos altar on this page.",
    words: "Gilded altar: a fancy house altar. Light it. Curses: the later prayer book from the temple quest. Soul Split: the curse that heals you.",
    early: "Do the prayer quests, then offer cheap bones. Stand at the Lumbridge or Edgeville altar. Click one bone, then offer it. Leave lamps for levels you already earned.",
    mid: "Offer dragon bones on a gilded altar or the chapel the wiki ranks. Stand there with the burners lit. Click offer until the bag is empty. Leave if a burner goes out.",
    late: "Offer the bone the wiki ranks, on that same altar. Stand in the house, not the Wilderness. Click offer, then train curses when the quest allows. Leave cleansing crystals unless the live page still lists them.",
    wear: "Wear the First Age outfit if you own it. Otherwise clothes do not matter. Do not wear Wilderness gear. That is the other game.",
    afk: "None. You click the bone.",
    fast: "The bone the wiki ranks, both burners lit, and a bank preset.",
    watch: "Do not copy the Old School chaos altar onto this page. Do not offer bones with the burners out.",
    page: "Prayer",
  },
  magic: {
    tagline: "Ability bar, not splash. Bring the spellbook the dungeon wants.",
    deck: "Magic is an ability bar and the spellbook the place wants. This page is the RuneScape sheet. Splashing is not a method.",
    need: "The normal spellbook is enough to start. Ancients and Lunar want their quests. A staff tier follows your Magic level. Revolution can fire the bar for you.",
    money: "Runes are the bill. Slayer pays some of it back. Check the wiki. Do not buy a top staff just to splash.",
    early: "Cast air and water spells with Revolution on. Stand on a Taverley task or in Lumbridge. Click the spell, then the monster. Leave high alchemy until you have items worth selling.",
    mid: "Use the spellbook the task wants. Stand on the Slayer task. Click the spell and keep runes in the pouch. Leave splash worlds behind.",
    late: "Stay on Slayer with a real staff and the right book. Stand where the task is. Click the bar, and switch books when the place asks. Leave the wrong book in a dungeon that wants the other one.",
    wear: "Wear power armour you can repair. Wear a Slayer helmet on a task. Use a staff of your tier. Keep runes in a pouch.",
    afk: "Revolution on a Slayer creature. Not splash.",
    fast: "Slayer, with the spellbook that place wants. Check the wiki for the task.",
    watch: "Do not splash and call it training. Do not walk into a dungeon with the wrong spellbook.",
    words: "Revolution: the bar that casts for you. Splash: standing so a spell misses. It is not a method. Spellbook: the set of spells a place may demand.",
    page: "Magic",
  },
  runecraft: {
    tagline: "Runespan for calm XP. Abyss for runes you will sell.",
    deck: "Runecraft is essence through a rift or the Abyss. This page is the RuneScape sheet. Lava runes are the other client.",
    need: "Rune Mysteries starts you. The Abyss wants its short quest. Pouches hold extra essence. The Runespan needs no pouch.",
    money: "The Runespan is for levels. Runes from the Abyss can sell. Check the wiki. Do not buy a lava-rune stack. That is the other game.",
    early: "Harvest wisps in the Runespan and feed them to the rift. Stand on the low islands. Click the wisp, then the rift. Leave for the Abyss only if you want runes to sell.",
    mid: "Move to the higher islands, or craft the rune your level allows in the Abyss. Stand on that island, or at the Abyss entrance. Click the wisp, or fill the pouches. Leave the Abyss if you will not bring food.",
    late: "Craft the highest rune you can, or stay on the top island. Stand where the training page says. Click the pouch, then the altar, or the rift. Leave soul runes unless the live page still lists that altar.",
    wear: "Wear ethereal or wicked robes if you own them. Bring pouches for the Abyss. A pick is not the outfit.",
    afk: "The Runespan. You can look away a little. The Abyss is not that.",
    fast: "The Abyss rune the wiki ranks, pouches full. Or the top island if you want no damage.",
    watch: "Do not paste Old School lava-rune math on this page. Do not enter the Abyss with no food and a cash stack.",
    words: "Runespan: floating islands where you siphon a wisp into a rift. Wisp: the floating spark. Abyss: the dangerous altar shortcut. Bring food.",
    page: "Runecrafting",
  },
  construction: {
    tagline: "Planks first. Fort Forinthry frames when the fort is built.",
    deck: "Construction is planks in a house, then Fort frames. This page is the RuneScape sheet. The fort has to exist before the frame method does.",
    need: "You need a player-owned house. A servant fetches planks later. Fort Forinthry frames want that quest line finished first.",
    money: "You buy this skill. Oak, teak, and mahogany planks are the bill. Check the wiki. Mahogany at level 20 is a waste.",
    early: "Build oak furniture in your house. Stand in the workshop. Click build on a chair or a larder. Leave the fort frames until the fort exists.",
    mid: "Build teak or mahogany, and hire a servant. Stand at the bench. Click build, then send the servant for more planks. Leave contracts the live page no longer lists.",
    late: "Build Fort Forinthry frames after the fort stands, or the plank the wiki ranks. Stand at that bench. Click build until the stack is gone. Leave mahogany you bought at level 20 in the past.",
    wear: "Wear the constructor's outfit if you own it. Bring a crystal saw. The servant is the tool.",
    afk: "None. Every plank is a click.",
    fast: "The plank or frame the wiki ranks, with a servant running.",
    watch: "Do not build fort frames before the fort stands. Do not buy mahogany at level 20.",
    words: "Plank: a board you buy, then build. Servant: the helper who fetches more. Fort frame: a piece of Fort Forinthry. The fort has to exist first.",
    page: "Construction",
  },
  constitution: {
    tagline: "Same kills as combat. Food and brews are the plan.",
    deck: "Constitution fills while you fight on RuneScape. This page is that sheet. There is no Constitution-only camp.",
    need: "Nothing. It fills while you fight. Bring food.",
    money: "Food and brews are the bill. This skill has no shop of its own.",
    early: "Fight the same cows or Taverley tasks as Attack. Stand there. Click the monster and eat. Leave the dummy.",
    mid: "Stay on Slayer. Stand on the task. Click food when the hits land. Leave any plan that is only this number.",
    late: "Keep doing the combat you already do. Stand where you can eat. Click food before the bag is empty. Leave boss healing on the Bosses page.",
    wear: "Wear the armour of the style you clicked. Bring food you will actually eat.",
    afk: "Whatever Slayer task you can already walk away from. Not a dummy.",
    fast: "Slayer. This number follows the kill.",
    watch: "Do not camp a dummy and then show up with no food. Do not paste Old School Hitpoints as a second skill.",
    page: "Constitution",
    train: "Constitution",
  },
  agility: {
    tagline: "The course you fail less. Hefin in Prifddinas at late levels.",
    deck: "Agility is the course you stop failing. This page is the RuneScape sheet. Rooftops and Graceful are Old School.",
    need: "Each course has a level. The Hefin course in Prifddinas wants the quest Plague's End. Silverhawk feathers only count if the live page still lists them.",
    money: "Mostly this costs time. Hefin can drop crystals. Check the wiki. Do not buy Graceful. That outfit is the other game.",
    early: "Run the Gnome Stronghold course. Stand at the start. Click every obstacle in order. Leave for Burthorpe if you fall less there.",
    mid: "Run the Barbarian Outpost, then the course you fail least. Stand at that entrance. Click the obstacles. Leave the Wilderness course unless you accept a player killer.",
    late: "Run the Hefin course in Prifddinas after Plague's End. Stand at the Hefin cathedral. Click the course lap. Leave for the course the wiki ranks if you are not in Prifddinas yet.",
    wear: "Wear the nimble outfit if you own it. Silverhawk boots only if the wiki still lists them. Not Graceful.",
    afk: "None, unless those boots are still on the live page. A course is clicks.",
    fast: "Hefin, or the course the wiki ranks at your level.",
    watch: "Do not call Old School rooftops the RuneScape road to 99. Do not run the Wilderness course with a cash stack.",
    words: "Course: a lap of obstacles you click. Hefin: the late Prifddinas course, after the elf quest. Graceful: an Old School outfit, not this page.",
    page: "Agility",
  },
  herblore: {
    tagline: "Secondaries first. 120 is a bank sheet, not a secret.",
    deck: "Herblore is a potion you will drink or sell. This page is the RuneScape sheet, including 120. Secondaries before herbs.",
    need: "Druidic Ritual starts you. A secondary is the extra item a potion needs. Overloads and combination potions have their own levels.",
    money: "Herbs and secondaries are the bill. Overloads can pay if you drink them. Check the wiki. A level 120 buy with no secondaries is not a plan.",
    early: "Mix attack, strength, defence, and energy potions you will drink. Stand at a bank. Click the herb, then the secondary. Leave a stack of unfinished potions.",
    mid: "Mix prayer potions and super restores, then extremes when the level allows. Stand at a bank or a portable well. Click one inventory, bank it, repeat. Leave a potion you will not use on Slayer.",
    late: "Mix overloads, or the combination the wiki ranks. Stand at the bank. Click until the secondaries run out. Leave 120 if you will not use those potions.",
    wear: "Wear a factory or botanist's outfit if you own it. A brooch helps if you use portable wells. The secondary stack matters more than the hat.",
    afk: "None. You mix.",
    fast: "The potion the wiki ranks, with secondaries already in the bank.",
    watch: "Do not buy herbs for 120 with no secondaries. Do not paste an Old School super combat recipe on this page.",
    words: "Secondary: the extra item in the potion. Overload: a late combat potion. It wants high Herblore. Portable well: a placeable well, if the game still has them.",
    page: "Herblore",
  },
  thieving: {
    tagline: "Prifddinas or the safe you can stand. Eat on stun.",
    deck: "Thieving is a stun you eat through. This page is the RuneScape sheet. Prifddinas wants Plague’s End.",
    need: "You can pick pockets today. Safes have their own level. Elves in Prifddinas want Plague's End.",
    money: "Safes and Prifddinas pay. Knights pay less. Check the wiki. Do not stand somewhere you cannot leave.",
    early: "Pickpocket men in Lumbridge, then stalls you can reach. Stand next to them. Click, and eat when you get stunned. Leave for safes when they open.",
    mid: "Crack safes when your level allows, or pickpocket knights until then. Stand at the safe or the knight. Click, eat the stun, click again. Leave a stall the wiki no longer ranks.",
    late: "Pickpocket workers in Prifddinas after Plague's End. Stand where they do not walk off. Click, and eat before the next stun. Leave for safes if you are not in the city yet.",
    wear: "Bring food. That is the kit. A camouflage piece only helps if the live page still lists it.",
    afk: "Prifddinas workers only if you can eat and look away. It is still a click.",
    fast: "The safe or the worker the wiki ranks. Eat before the second stun.",
    watch: "Do not paste Old School elves here with no Plague's End. Do not open a safe with no food.",
    words: "Stun: the hit that stops you. Eat first. Safe: a lock you click open. Prifddinas: the elf city, and the quest is the door.",
    page: "Thieving",
  },
  crafting: {
    tagline: "Jewellery and hide. Portables if they are up.",
    deck: "Crafting is a gem, a hide, or an urn at the bank. This page is the RuneScape sheet. Invention will want junk later — do not trash the stack you still need.",
    need: "You can start with leather. A portable crafter only helps if that item is still in the game.",
    money: "Jewellery can sell. Hides depend on the price. Check the wiki. Do not buy a 99 of one hide with nobody to sell it to.",
    early: "Make leather armour and gold jewellery. Stand at a bank. Click the leather or the gold. Leave the toy pieces when hides open.",
    mid: "Make dragonhide bodies, or the gem the wiki ranks. Stand at a bank, or a portable crafter. Click one inventory, bank it, repeat. Leave urns unless you will use them.",
    late: "Make the gem, hide, or urn the wiki ranks. Stand at the bank. Click until the stack is gone. Leave any stack Invention still needs in one piece.",
    wear: "Wear an artisan outfit if you own it. Bring the mould. A portable crafter helps if it is still live.",
    afk: "A bank preset of jewellery. You still click each inventory.",
    fast: "The hide or gem the wiki ranks, already bought.",
    watch: "Do not break the only hide stack you still need. Do not buy a 99 with no buyer.",
    page: "Crafting",
  },
  fletching: {
    tagline: "Broad tips and bows at the bank. Invention eats junk later.",
    deck: "Fletching is a bank click. This page is the RuneScape sheet. Broads want the Slayer unlock. Do not disassemble the only stack.",
    need: "You can start with logs and a knife. Broad arrows want the Slayer point unlock.",
    money: "This is a bank skill. Stringing bows can sell. Check the price before a huge buy.",
    early: "Cut shafts and string shortbows. Stand at a bank. Click the knife on the log. Leave the shortbows when maple opens.",
    mid: "String maple or yew longbows, or make broad arrows once they are unlocked. Stand at a bank. Click one inventory, then bank it. Leave a bow you will never use or string.",
    late: "Make broad arrows, bakriminel bolts, or the bow the wiki ranks. Stand at a bank. Click until the stack is gone. Leave the stack intact if Invention still needs it.",
    wear: "Nothing you wear changes the click. Bring a knife. Use a bank preset.",
    afk: "Stringing at a bank is slow. You still click each inventory.",
    fast: "The tip or bow the wiki ranks, with the materials in one preset.",
    watch: "Do not make broad arrows before the Slayer unlock. Do not break the only stack you needed.",
    page: "Fletching",
  },
  slayer: {
    tagline: "Laniakea when you can use her. Skip list on the wiki.",
    deck: "Slayer is the master and the skip list. This page is the RuneScape sheet. Nieve is Old School. Reaper tasks are bosses.",
    need: "You need a Slayer master. Laniakea wants a high level and her island. You buy block slots with points.",
    money: "The right skip list is how this pays. A bad task is the cost. Check the wiki block list.",
    early: "Use Turael or Mazchna for points, then leave Turael. Stand in their cave or city. Click the master, then the monster. Leave the point boost once you are past the early levels.",
    mid: "Use Kuradal or Duradel. Stand where the task sends you. Click the weapon that matches the monster's weakness. Leave junk tasks and spend the points on a block list.",
    late: "Use Laniakea when you can. Stand on her island. Click the task, then the monster. Leave Reaper tasks on the Bosses page.",
    wear: "Wear a Slayer helmet on a task. Use the weapon that matches the weakness. Aggression potions only on tasks that use them.",
    afk: "Some tasks walk to you. Not the whole 99.",
    fast: "A skip list, the right weapon, and the master the wiki ranks.",
    watch: "Do not put Nieve on this page. She is Old School. Do not write Reaper tasks as Slayer training.",
    words: "Task: the monster a master assigns. Skip: you cancel a bad one with points. Block: you lock a monster off the list. Weakness: the style that monster hates.",
    page: "Slayer",
  },
  hunter: {
    tagline: "Box trap you can leave. Anachronia is a map, not a guess.",
    deck: "Hunter is a trap you can leave, then Anachronia. This page is the RuneScape sheet. Birdhouse runs are Old School.",
    need: "You need box traps. Anachronia is the late island. Big Game Hunter has its own levels.",
    money: "Box traps and big game can pay. Check the hide price. Do not paste an Old School bird house timer here.",
    early: "Catch crimson swifts, then set the first box traps near a bank. Stand where you can see the traps. Click a trap when it falls. Leave quest rewards for later if you still have them.",
    mid: "Check box traps you can leave and come back to. Stand on the trap line the wiki names. Click, loot, reset. Leave for grenwalls or jadinkos only if the wiki still lists them at your level.",
    late: "Hunt on Anachronia, or do Big Game Hunter when the level allows. Stand where that hunt starts. Click the trap or the hunt tool. Leave the island if you cannot land there yet.",
    wear: "Wear the hunter outfit if you own it. Bring traps and the bait the live page names.",
    afk: "A box trap you set and come back to. Not a bird house clock.",
    fast: "The trap or hunt the wiki ranks at your level.",
    watch: "Do not put Old School bird houses on this page. Do not sail to Anachronia before you can land.",
    words: "Box trap: a trap you set, leave, and check. Anachronia: the dinosaur island. Big Game Hunter: the hunt there. It is not a bird house.",
    page: "Hunter",
  },
  mining: {
    tagline: "The Mining and Smithing rework owns the pick. Not Motherlode.",
    deck: "You mine the ore the rework wants, with a pick of the right tier. This page is RuneScape. The Motherlode Mine is the other game. You do not need 99 to use the ore.",
    need: "Do the Mining and Smithing rework tutorial. The pick has to match the rock. Higher rocks want the Mining level written on them. Check the live wiki before you copy an old layout.",
    money: "Ore you will smith is the useful hour. Extra ore is the coin hour if the price says so. A rockertunity hour is for levels, not a shop. Check the wiki. Do not price Old School amethyst here.",
    words: "Rockertunity: a spark on the rock. Click it for extra progress. Stone spirit: an item that gives extra ore. Ore box: the box that holds ore so you walk less.",
    early: "Mine copper, tin, and iron.",
    mid: "Mine the concentrated rock the wiki still lists.",
    late: "Pick the look-away rock, or the rock you click.",
    wear: "Wear the magic golem outfit if you own it. Use the best pick you can hold. Bring stone spirits for the ore you mean to keep.",
    afk: "The rock the wiki still calls the look-away hour. Not the Motherlode.",
    fast: "Rockertunities on the highest ore you can mine, if you will click them.",
    watch: "Do not paste the Motherlode onto this page. Do not use a bronze pick on a high rock.",
    route: [
      {
        band: "Early",
        method: "Mine copper, then tin, then iron. You are learning the swing and the ore box, not hunting a secret rock.",
        place: "Burthorpe, or the mine the tutorial left you in. Keep a bank or an ore box close.",
        click: "Click the rock until it is done. Bank the ore, or put it in the box.",
        leave: "Leave when the next rock on the guide turns white. Staying on copper because it is quiet wastes the hour.",
      },
      {
        band: "Mid",
        method: "Mine the concentrated rock the live wiki still ranks. Concentrated coal in the Living Rock Caverns is the name to check. If it is gone, use the rock the training page names.",
        place: "The Living Rock Caverns, if that coal is still listed. Otherwise the mine printed on the current training page.",
        click: "Click the rock. Click the rockertunity if you are looking. Missing one is fine. Mining the wrong tier is not.",
        leave: "Leave when your pick and your level open the next ore you will actually smith.",
      },
      {
        band: "Late · look away",
        method: "Mine the rock the wiki calls the look-away hour. Animica is the family to check. If the page names a different rock, that rock wins.",
        place: "The mine the training page gives for that rock. Not an Old School guild.",
        click: "Click once, wait, bank. Use stone spirits if you want the extra ore.",
        leave: "Leave when you have the ore your smithing goal needed, or when the wiki moves the rock.",
      },
      {
        band: "Late · click",
        method: "Mine the same tier, and click every rockertunity. This is the fast fork. It is not a second skill.",
        place: "The same mine, or the higher rock the wiki ranks for clicking. Do not paste granite from the other game.",
        click: "Click the spark on the rock. If you will not watch the screen, go back to the look-away rock.",
        leave: "Leave when you are watching a video instead of the sparks. That is the other rock's job.",
      },
    ],
    inventory:
      "Bring the best pick you can use, an ore box, and stone spirits for the ore you will keep. Wear golem pieces if you have them. Do not bring a Motherlode sack. That is the other game.",
    iron: "Smith what you mine. That is the point of the rework. Do not buy someone else's ore stack and call it your route.",
    stop: "Stop when you have the ore the smithing tier needed. If you already kill bosses, you can stop there. 99 is a cape.",
    mistakes:
      "Do not paste the Motherlode Mine onto this page. Do not mine starter iron for a members hour. Do not swing a bronze pick at a rock two tiers above it.",
    page: "Mining",
  },
  smithing: {
    tagline: "Heat and the rework furnace. Not Blast Furnace.",
    deck: "Smithing is heat on the rework furnace. This page is the RuneScape sheet. Blast Furnace and platebody spam are Old School.",
    need: "Use the same rework. Heat is the bar on the furnace. A higher bar wants your Smithing level, not a coal bag from the other game.",
    money: "Bars you will use are not a waste. Junk you cannot wear is. Check the wiki.",
    early: "Smith bronze and iron on the rework furnace. Stand at the Burthorpe furnace if you started there. Click the ore and keep the heat up. Leave a shop full of platebodies.",
    mid: "Smith the next bar on that progress. Stand at the furnace. Click unfinished items back into the heat. Leave the platebody pile.",
    late: "Smith the bar the wiki ranks, and keep the heat up. Stand at that furnace. Click until the bar is done. Leave burial armour unless the live page still lists it.",
    wear: "Wear a smithing suit if you own it. Use the best hammer. Protean bars only if you already own them.",
    afk: "The furnace sit the wiki still lists. Watch the heat. Not a Blast Furnace world.",
    fast: "The bar the wiki ranks, with the heat never dropped.",
    watch: "Do not paste the Blast Furnace from Old School. Do not smith a stack of platebodies you will not wear.",
    words: "Heat: the furnace bar you keep up. Rework: bars that match your level. Blast Furnace: the other game.",
    page: "Smithing",
  },
  fishing: {
    tagline: "Swarm or waterfall. Cook what you keep.",
    deck: "Fishing is a spot you can leave, or a swarm. This page is the RuneScape sheet. Barbarian fishing as the 99 plan is Old School.",
    need: "Bring a rod or a net for the fish. Waterfall fishing wants Prifddinas. Swarm fishing wants the spot the wiki still lists.",
    money: "Fish you cook or sell can pay. A swarm is mostly levels. Check the wiki.",
    early: "Catch shrimp, then trout and lobster at a bank spot. Stand next to that bank. Click the spot until the bag is full. Leave fly fishing if you do not need the food.",
    mid: "Catch monkfish, or the swarm the wiki ranks. Stand at that spot. Click, bank, repeat. Leave a fish you will not cook for combat.",
    late: "Fish the waterfall in Prifddinas, or the swarm. Stand where the page says. Click and look away between bags. Leave sailfish until the live page says your level is high enough.",
    wear: "Wear a fishing outfit if you own it. Use the best rod for that fish. Bring the bait the page lists.",
    afk: "A swarm or a waterfall you can leave. Not a fast harpoon from the other game.",
    fast: "The fish the wiki ranks. Outfit on.",
    watch: "Do not copy barbarian fishing across as the RuneScape road to 99. Do not fish the waterfall before Plague's End.",
    words: "Swarm: a fishing spot you can leave. Waterfall: the Prifddinas spot. It wants the elf quest. Barbarian fishing: the Old School method, not this page.",
    page: "Fishing",
  },
  cooking: {
    tagline: "The range that does not burn. Portables if they are up.",
    deck: "Cooking is the range that stops the burn. This page is the RuneScape sheet. The Hosidius kitchen is Old School.",
    need: "Cooking gauntlets come from Family Crest. Use a range, or a portable range if that item is still in the game.",
    money: "Cook what you fish. High fish can sell or feed you. Check burn rates on the wiki.",
    early: "Cook shrimp and trout you will eat. Stand at a range. Click the fish on the range. Leave a range that still burns them.",
    mid: "Cook monkfish and the food your combat uses. Stand at a range with gauntlets on. Click one bag, bank it, repeat. Leave for a portable range if one is up.",
    late: "Cook sailfish, or the fish the wiki ranks. Stand at a range that does not burn. Click with the gauntlets on. Leave the Hosidius kitchen to the other game.",
    wear: "Wear cooking gauntlets. A portable range helps if it is up. A chef's hat does not stop the burn.",
    afk: "A range that does not burn, one bag at a time. You still click.",
    fast: "The fish the wiki ranks, gauntlets on, on a range that does not burn.",
    watch: "Do not paste the Hosidius kitchen from Old School. Do not cook sharks on a range that still burns them.",
    page: "Cooking",
  },
  firemaking: {
    tagline: "A line of logs or a brazier. Not Wintertodt.",
    deck: "Firemaking is a line of logs or a brazier. This page is the RuneScape sheet. Wintertodt is Old School.",
    need: "Bring a tinderbox and logs. A portable brazier only helps if it is still in the game. There is no Wintertodt on this page.",
    money: "Usually you buy the levels. Magic and elder logs cost coins. Check the wiki. Do not buy a Wintertodt crate plan.",
    early: "Burn normal logs, then oak, in a line. Stand by a bank. Click the tinderbox, then add logs to the line. Leave one-by-one fires.",
    mid: "Burn maple or yew on a bonfire line, or a portable brazier if it is up. Stand at the line. Click a log onto the fire. Leave for logs you already cut if the price is silly.",
    late: "Burn magic, elder, or the log the wiki ranks. Stand on the same line or brazier. Click logs onto it. Leave Wintertodt to the other game.",
    wear: "Wear a firemaking outfit if you own it. Bring a tinderbox. Not a pyromancer coat.",
    afk: "A bonfire line, or a brazier you add logs to. Not Wintertodt.",
    fast: "The log the wiki ranks, already in the bank.",
    watch: "Do not put Wintertodt on this page. Do not light magic logs one by one with no line.",
    words: "Bonfire line: a row of fires you add logs to. Brazier: a portable fire, if the game still has it. Wintertodt: the Old School cold boss. Not this page.",
    page: "Firemaking",
  },
  woodcutting: {
    tagline: "The tree you can leave. Crystal and ivy at late levels.",
    deck: "Woodcutting is a tree you can leave. This page is the RuneScape sheet. Forestry events are Old School.",
    need: "Use an axe of your tier. Crystal trees want Prifddinas. Ivy wants the level, not a quest.",
    money: "Ivy is levels. Elder and crystal logs can pay. Check the price. Nests are a bonus, not the plan.",
    early: "Chop normal trees, then oak, then willow near a bank. Stand next to that bank. Click the tree and look away. Leave the stump when willow is open.",
    mid: "Chop maple, yew, or ivy. Stand on a tree you can leave. Click, wait, bank. Leave a tree you will not fletch or sell.",
    late: "Chop crystal trees in Prifddinas, or elder, or ivy. Stand at that tree. Click and look away. Leave if the crystal spot is too crowded.",
    wear: "Wear a woodcutting outfit if you own it. Use the best axe you can hold. A felling axe from the other game does not belong here.",
    afk: "Ivy, yew, or crystal. You can leave and come back.",
    fast: "The tree the wiki ranks. The axe tier comes first.",
    watch: "Do not paste Forestry from Old School. Do not chop normal trees to 99.",
    page: "Woodcutting",
  },
  farming: {
    tagline: "Compost from seed. 120 is tree runs on a sheet.",
    deck: "Farming is a run on a timer. This page is the RuneScape sheet, including 120. Tithe Farm is Old School.",
    need: "You need seeds and compost. Magic secateurs help. The player-owned farm is extra, not the whole skill.",
    money: "Herbs and trees can pay. Level 120 is a calendar of runs, not one sitting. Check seed prices.",
    early: "Add compost, then plant hops and the first herbs. Stand at the patch. Click compost, then the seed, then leave. Come back when it has grown.",
    mid: "Run herbs, and fruit trees when you can plant them. Stand at the first patch and follow the same lap. Click, teleport, click. Leave allotments unless you need the food.",
    late: "Run trees, fruit trees, and herbs on one lap, on toward 120. Stand at the first patch. Click, then leave while the crop grows. Use Manor Farm if you like it, not Tithe.",
    wear: "Wear a farming outfit if you own it. Bring magic secateurs and ultracompost.",
    afk: "The crop grows while you are gone. The run itself is a few clicks.",
    fast: "Tree runs on a timer. Check the wiki for the tree worth planting.",
    watch: "Do not paste Tithe Farm from Old School. Do not plant seeds with no compost.",
    words: "Run: you visit every patch, plant, and leave. Compost: the bucket that stops disease. Tithe Farm: an Old School field. It is not this page.",
    page: "Farming",
  },
  summoning: {
    tagline: "Charms first, then the pouch. The familiar is a tool.",
    deck: "Summoning is a charm, a pouch, and an obelisk. This page is the RuneScape sheet. The familiar is a tool, not a pet you never infuse.",
    need: "Wolf Whistle starts you. You need an obelisk. A pouch wants a charm of the right colour and a tertiary (the extra item).",
    money: "Charms are the gate. Pouches can cost or pay. Check the wiki. Do not buy tertiaries with no charms.",
    early: "Infuse pouches with gold charms. Stand at an obelisk. Click the pouch ingredients, then summon the one you will use. Leave a familiar you never infuse.",
    mid: "Use green and crimson charms on the pouch the wiki ranks. Stand at the obelisk. Click one inventory, bank it, repeat. Leave a combat pouch you will not take on Slayer.",
    late: "Use blue charms on the pouch the wiki ranks. Stand at the obelisk. Click until the charms run out. Leave elder charms until the page says your level is high enough.",
    wear: "Nothing beats the charm stack. Spirit gems help if you own them. The pouch is the kit.",
    afk: "One inventory at the obelisk, then you stop. Not a camp.",
    fast: "The pouch the wiki ranks, with charms and tertiaries already in the bank.",
    watch: "Do not keep a familiar you never infuse. Do not buy tertiaries with no charms.",
    words: "Charm: the coloured drop a monster leaves. You need it to make a pouch. Pouch: the bag you infuse at an obelisk. Tertiary: the extra item that pouch wants.",
    page: "Summoning",
  },
  dungeoneering: {
    tagline: "Floors. Bind the weapon you will keep using.",
    deck: "Dungeoneering is floors in Daemonheim. This page is the RuneScape sheet. Bind the weapon you will use again.",
    need: "Bring a ring of kinship. Higher floors want more complexity. Your surface gear does not come in.",
    money: "Tokens buy the unlocks. The skill itself is floors. Check what the token shop is worth.",
    early: "Run small floors alone. Stand at the Daemonheim entrance. Click the floor, and bind the first weapon you will keep. Leave a friend outside until you know the doors.",
    mid: "Run complexity 6, in a size you can clear. Stand inside the floor. Click the doors, and bind the weapon you use on the surface. Leave empty rushes.",
    late: "Run large floors, and sinkholes if they are still on the calendar. Stand at the start with a bind already chosen. Click the route. Leave a rush with an empty bind.",
    wear: "The bind slot is the kit. Do not bring surface armour into Daemonheim.",
    afk: "None. A floor is a route you walk.",
    fast: "The floor size the wiki ranks, with a bind already chosen.",
    watch: "Do not rush with no bind and call it 120. Do not bring surface gear into the dungeon.",
    words: "Floor: one dungeon in Daemonheim. You clear it and leave. Bind: the weapon you lock in so you start with it next time. Token: the shop currency from floors.",
    page: "Dungeoneering",
  },
  divination: {
    tagline: "Wisp to crater. Caches on the daily timer.",
    deck: "Divination is a wisp into a crater, plus the cache. This page is the RuneScape sheet. The cache is the daily, not a substitute for the colony.",
    need: "You can start today. Each colony has a level. Caches are on a timer.",
    money: "Energy can sell. Caches are free levels. Check the price. Do not skip a year of caches and then buy a story.",
    early: "Harvest pale wisps, then the next one you can reach. Stand at that colony. Click the wisp, then the crater. Do a cache when the timer is up.",
    mid: "Harvest the wisp you can click, and do the cache every day. Stand at the colony. Click, convert only if you need the energy. Leave a cache you skipped for a week.",
    late: "Harvest ancestral or incandescent wisps, into the crater, plus the cache. Stand at that colony. Click the wisp, deposit, repeat. Leave for the colony the wiki ranks if the top one is empty.",
    wear: "Wear the elder divination outfit if you own it. Bring an empty inventory for energy. The crater is the tool.",
    afk: "A colony you can leave for a minute. The cache is a daily. It is not look-away.",
    fast: "The colony the wiki ranks, plus the cache when it is up.",
    watch: "Do not skip caches for a year. Do not harvest wisps and never put them in the crater.",
    words: "Wisp: the spark you harvest. Crater: where you put the energy. Cache: the daily free levels. Do not skip it.",
    page: "Divination",
  },
  invention: {
    tagline: "Disassemble junk. Augment the piece you will keep.",
    deck: "Invention is junk you can lose, and one item you will keep. This page is the RuneScape sheet. Do not disassemble the weapon you still use.",
    need: "You need 80 Smithing, 80 Crafting, 80 Divination, and the tutorial. Augmentors and siphons come after.",
    money: "Components are the bank. Turning a weapon you still use into parts is not a method. Check which junk is actually junk.",
    early: "Do the tutorial, then break cheap junk. Stand at an inventor's workbench. Click disassemble on items you can lose. Leave the weapon you still swing.",
    mid: "Augment a weapon you will keep, then siphon it. Stand wherever you already fight. Click the siphon when it is ready. Leave a blog that tells you to break that weapon.",
    late: "Research, and keep using the item you already use. Stand at the bench for discoveries. Click siphon, not disassemble, on the good item. Leave a gimmick you bought only to break.",
    wear: "Wear the augmented item. Use the perk the wiki ranks for that slot. Break junk armour you were going to throw out.",
    afk: "Siphon the weapon you already swing. Discovery is not look-away.",
    fast: "Discoveries, then the item you already use. Junk, augment, siphon.",
    watch: "Do not break a weapon you still use. Do not buy a toy just to smash it.",
    words: "Disassemble: break junk into parts. Augment: attach a tool to an item you will keep. Siphon: take the levels off without breaking it.",
    page: "Invention",
  },
  archaeology: {
    tagline: "Dig, then restore. A damaged artefact is not the finish.",
    deck: "Archaeology is a dig and then a restore. This page is the RuneScape sheet. A bank full of damaged artefacts is not a level.",
    need: "Do the tutorial site. Use a mattock of your tier. Collectors and qualifications open later sites.",
    money: "Restored artefacts and materials can pay. Level 120 is time at a hotspot. Check the material price.",
    early: "Dig the tutorial site, then the next site the journal opens. Stand on the hotspot. Click until you have a piece, then restore it at the bench. Leave damaged pieces in the bank.",
    mid: "Dig the site the journal just opened. Stand on a hotspot that lasts. Click, then walk to the bench and restore. Leave the damaged pile in the dirt, not the bank.",
    late: "Dig the site and relic the wiki ranks. Stand on that hotspot. Click, restore at the bench, repeat. Leave a cache unless the live page still lists it.",
    wear: "Wear the archaeology outfit if you own it. Use the best mattock you can hold. Bring materials for the restore.",
    afk: "A hotspot that lasts. The restore at the bench is the click.",
    fast: "The hotspot the wiki ranks, then the restore. Damaged is not finished.",
    watch: "Do not bank damaged artefacts and never restore them. Do not dig with a mattock two tiers too low.",
    words: "Hotspot: the dirt you dig. Mattock: this skill's pick. Restore: fix the piece at a bench. Damaged in the bank is not a level.",
    page: "Archaeology",
  },
  necromancy: {
    tagline: "Rituals and Kili’s tasks. Bosses stay on the Bosses page.",
    deck: "Necromancy is rituals in the City of Um and the weapon Kili upgrades. This page is the RuneScape sheet. Rasial stays on Bosses.",
    need: "Do the tutorial. Go to the City of Um. Kili upgrades the weapon. Talent points are part of the skill.",
    money: "Ritual materials cost coins. Fighting with the style can pay. Check the ink and bone price.",
    early: "Do the tutorial, the first rituals, and the first talent picks. Stand at the ritual site in the City of Um. Click the ritual, and fix a disturbance if one appears. Leave any plan that skips the tutorial.",
    mid: "Do Kili's tasks so the weapon actually upgrades. Stand where she sends you, and at the ritual site between tasks. Click her task, then the ritual. Leave a combat camp that skips her.",
    late: "Do the ritual the wiki ranks, and fight with the weapon she upgraded. Stand at that site. Click disturbances when they appear. Leave Rasial on the Bosses page.",
    wear: "Wear necromancy armour of your tier. Use the weapon Kili just upgraded. Bring ritual materials, not a melee switch.",
    afk: "Combat on the undead the wiki names, if that camp is still quiet. A ritual with disturbances is not look-away.",
    fast: "The ritual the wiki ranks, disturbances clicked, then Kili if she still has a task.",
    watch: "Do not call the City of Um a guide and leave Kili out. Do not write Rasial as the training method.",
    words: "Ritual: the circle you draw in the City of Um. Disturbance: a spark you click so the ritual does not fail. Kili: the smith who upgrades the weapon. Do not skip her.",
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

function mix(hex: string, other: string, t: number) {
  const read = (h: string) => {
    const n = Number.parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [ar, ag, ab] = read(hex);
  const [br, bg, bb] = read(other);
  const ch = (a: number, b: number) => Math.round(a * (1 - t) + b * t).toString(16).padStart(2, "0");
  return `#${ch(ar, br)}${ch(ag, bg)}${ch(ab, bb)}`;
}

/** Dark sheet in the cape's two colours. Cloth washes the field. The strip marks the type. */
export function skillPageStyle(name: string): CSSProperties {
  const { cloth } = capeColors(name);
  const accent = capeInk(name);
  return {
    ...capeStyle(name),
    "--skill-bg": mix(cloth, "#0c0d12", 0.84),
    "--skill-well": mix(cloth, "#14151c", 0.74),
    "--skill-line": cloth,
    "--skill-accent": accent,
    "--skill-muted": mix(accent, "#b7ad96", 0.55),
  } as CSSProperties;
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
        `${wear} Bring only what this method uses. Leave the spare gear in the bank.`,
      money,
      iron:
        note?.iron ??
        "If you cannot buy the supplies, gather them yourself. Stay on the earlier step until you have them.",
      kit: wear,
      mistakes: note?.mistakes ?? note?.watch ?? "Do not copy a method from the other game. Check the live wiki first.",
      stop:
        note?.stop ??
        "Stop when you have the level you came for. A quest, a prayer, or a weapon. Level 99 is a cape. You do not need it to use the skill.",
      words: note?.words,
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
