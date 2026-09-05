export type BossNote = {
  id: string;
  title: string;
  edition: "OSRS" | "RS3";
  role: string;
  style: string;
  pray: string;
  start: string[];
  kit: string[];
  route: string[];
  method: string[];
};

export const BOSS_NOTES: Record<string, BossNote> = {
  toa: {
    id: "toa",
    title: "Tombs of Amascut",
    edition: "OSRS",
    role: "Raid · 1–8",
    style: "All three. Yellow Keris on the path bosses. Wardens want the style the invocation asks.",
    pray: "Swap every room. Akkha: the style he just used. Zebak: missiles then mage on the roar. Wardens: the skull he is charging.",
    start: [
      "Entry / 0 invocation until you can name every room with your eyes closed.",
      "Solo or a quiet two-man first. A 300 with no room notes is a bank tax.",
      "Leave if you wipe twice on the same mechanic. That room is the lesson, not the next pull.",
    ],
    kit: [
      "Learner: swamp trident, blowpipe, bandos or blessed, yellow Keris, lightbearer if you own it.",
      "Desk: Tumeken's shadow or sang, masori / ancestral swaps, saturated heart, thralls.",
      "Stamina and restore before Wardens. Food is for a missed tile, not the plan.",
    ],
    route: [
      "Pick a path and say it. Akkha: memory tiles first, then the boss. Baba: boulder line, then the monkey. Kephri: dunk dung, keep swarms down. Zebak: jugs on the waves, walk the acid.",
      "Wardens: tiles, then the core. Last phase walk the slam. Do not stand in a charged skull.",
      "Kephri dung and Zebak waves kill more teams than Wardens HP.",
    ],
    method: [
      "Add one invocation rack only after a clean raid. A clean 50 teaches more than a wipe 200.",
      "One talker. Watch a VOD of your seat the night before. Time the raid, then cut one minute, not five.",
    ],
  },
  vorkath: {
    id: "vorkath",
    title: "Vorkath",
    edition: "OSRS",
    role: "Solo slayer / money",
    style: "Ranged (Zaryte, tbow, blowpipe) or melee lance. Pick one and stay on it for the trip.",
    pray: "Protect Missiles plus Rigour or Piety. Walk the pink fireball. Never tank it.",
    start: [
      "Super antifire plus a dragonfire ward or shield. Salve (ei) if you wear it.",
      "Count six autos, then the special. Acid or spawn — never guess.",
      "Bank a trip with two deaths planned. Pools before kills/hr.",
    ],
    kit: [
      "Learner: void or blessed, blowpipe or rune cbow, ruby then diamond, extended antifire.",
      "Desk: masori, Zaryte or tbow, slayer staff for crumble, divine ranging.",
    ],
    route: [
      "Pool, bank, boat. Spec the first hits while he is grounded.",
      "Acid: one straight line, one-tile path. Do not panic-click the pool.",
      "Spawn: crumble undead or a golden pool before the next fireball. Resume the six-count.",
    ],
    method: [
      "Woox walk is extra kills after pools are automatic. It is not hour one.",
      "A death on acid is a count error. Slow the next kill, then speed back up.",
    ],
  },
  tob: {
    id: "tob",
    title: "Theatre of Blood",
    edition: "OSRS",
    role: "Raid · 3–5",
    style: "Scythe is the team core. Range and mage for Maiden nylos and Xarpus.",
    pray: "Maiden mage. Bloat melee. Nylos mix. Sotetseg mage. Xarpus range. Verzik mix — call every swap.",
    start: [
      "Entry mode until Maiden crabs are a call, not a surprise.",
      "One new seat per run. Wipe notes after the room, not mid-cast.",
    ],
    kit: [
      "Learner: hasta or whip, trident, blowpipe, avernic if you have it.",
      "Desk: scythe, tbow, sang, avernic, justiciar for Verzik tank if that is your seat.",
    ],
    route: [
      "Five rooms, then Verzik. Maiden is the first wipe teacher: blood spawns (crabs) must die on the correct side or they heal her.",
      "Bloat: he sleeps, then stomps. Walk the stomp; standing still is the wipe.",
      "Nylos: pillars first, then the boss. A missed pillar dumps nylos on the team.",
      "Sotetseg: the maze is one caller. Wrong tile is a death, not a shrug.",
      "Xarpus: poison splash on the walk, then range when he is exposed.",
      "Verzik P1 is crabs. P2 is yellow pools — leave the tile. P3 is tornadoes and one talker.",
      "Protect Mage at Maiden and Sotetseg, Melee at Bloat, Range at Xarpus. Call every swap.",
    ],
    method: [
      "A 4:30 Maiden does not save a 12-minute Verzik. Film your seat.",
      "Hard mode is a different exam. Do not add it to a first purple night.",
    ],
  },
  corp: {
    id: "corp",
    title: "Corporeal Beast",
    edition: "OSRS",
    role: "Mass or 2–6 spear",
    style: "Spears only for a real split. Everything else feeds the core.",
    pray: "Protect Mage if you are in the dark core. Protect Melee on the stomp if you are stacked.",
    start: [
      "Games necklace. Do not walk from the ditch with a spear out.",
      "If you are not on a spear, you are a core soak. Say that before the pull.",
    ],
    kit: [
      "Learner: hasta if you must, but a Zamorakian / dragon hunter lance is the ticket.",
      "Desk: crystal halberd specs, slayer helm if on task, divine super combat.",
    ],
    route: [
      "Stack the core. Do not leave a dark core on one person.",
      "Stomp: step out, then back in. Sigil drop is not a reason to stand in the middle.",
    ],
    method: [
      "Mass corp is a lottery. Spear teams are a job. Pick which night this is.",
    ],
  },
  nex: {
    id: "nex",
    title: "Nex",
    edition: "OSRS",
    role: "5-man or mass",
    style: "Magic on smoke and zaros, range or mage on shadow, melee on blood if the team calls it.",
    pray: "Smoke: mage. Shadow: missiles. Blood: mage. Ice: mage. Zaros: the style she is using.",
    start: [
      "Learn the four wings as a list: smoke, shadow, blood, ice, then zaros.",
      "Do not first-time as the person who has to tank a blood siphon.",
    ],
    kit: [
      "Learner: trident, blessed, a tank piece.",
      "Desk: ancestral, sang or shadow, tbow for shadow if the team uses it.",
    ],
    route: [
      "Smoke: clear minions, walk the cough. Shadow: stand off the line. Blood: do not sit the siphon. Ice: break icicles. Zaros: pray the auto.",
    ],
    method: [
      "A 5-man with a caller beats a 20-man with no plan. Watch one VOD per wing.",
    ],
  },
  zulrah: {
    id: "zulrah",
    title: "Zulrah",
    edition: "OSRS",
    role: "Solo",
    style: "Mage and range. You swap on the colour, not on HP.",
    pray: "Green: missiles. Red: mage. Blue: mage. Jad phase: the style that is about to land.",
    start: [
      "Print or pin a rotation. First ten kills are the rotation, not the boss.",
      "Diary cape or scroll for the boat. Do not run from fairy ring every death.",
    ],
    kit: [
      "Learner: trident, blowpipe, void or ahrim / blessed swaps.",
      "Desk: ancestral, sang or shadow, tbow, toxic blowpipe for the green.",
    ],
    route: [
      "Stand the correct tile for that rotation. Jad: pray the first hit before you click.",
      "Snakelings: kill or ignore on the note you brought. Do not invent a third plan.",
    ],
    method: [
      "Kill time drops when the rotation is memory. Film one kill. Fix one tile.",
    ],
  },
  inferno: {
    id: "inferno",
    title: "The Inferno",
    edition: "OSRS",
    role: "Solo cape",
    style: "Range camp, mage on the blobs and Jad. Zuk is a prayer exam.",
    pray: "Every tick is a prayer. Zuk: the shield setter plus the Jad healers.",
    start: [
      "Fight Caves first until Jad is boring. Inferno is not a first cape.",
      "Learn nibbler pathing in a dummy world or a guide that uses the same spawn set you will see.",
    ],
    kit: [
      "Learner cape attempt: bowfa or tbow, ancestral, sang, justiciar optional, 3–4 brews you can count.",
      "Desk: tbow, ancestral, lightbearer, the exact invos you practiced.",
    ],
    route: [
      "Waves: solve the stack, then the rest. Do not chip Zuk thinking.",
      "Jad: healers one at a time. Zuk: set, walk, Jad, healers, set again.",
    ],
    method: [
      "A 60-wave attempt with notes beats ten 20-wave panics. Write the wipe. Change one thing.",
    ],
  },
  nightmare: {
    id: "nightmare",
    title: "The Nightmare",
    edition: "OSRS",
    role: "Mass or small team",
    style: "Melee on the boss. Range the totems. Mage the parasites if that is your seat.",
    pray: "The attack she is using. Husk: the style of the husk.",
    start: [
      "Mass first so you see every special without owning the room.",
      "Phosani is a different exam. Do not add it to a first night.",
    ],
    kit: [
      "Learner: hasta, blowpipe for totems.",
      "Desk: scythe, tbow, the parasite mage switch.",
    ],
    route: [
      "Spores: walk. Husks: pray. Totems: charge them, then the boss. Parasites: the person on that seat clicks them.",
    ],
    method: [
      "Small team Nightmare is a totem job. Mass is a prayer job. Say which one you are playing.",
    ],
  },
  graardor: {
    id: "graardor",
    title: "General Graardor",
    edition: "OSRS",
    role: "Duo or trio GWD",
    style: "Melee. Range only if the tank asked for it.",
    pray: "Protect Melee on Graardor. Switch for the minions when they are on you.",
    start: [
      "Kc first. Do not walk in with 5 kc and a scythe screenshot.",
      "Tank tile is a contract. Do not stand it unless you are the tank.",
    ],
    kit: [
      "Learner: bandos, hasta, super combats.",
      "Desk: scythe, inquisitor if you own it, blood fury.",
    ],
    route: [
      "Minions then boss, or the order the tank called. Do not invent a third order.",
    ],
    method: [
      "A trip is kc plus a door. Loot talk happens after the last kill.",
    ],
  },
  kree: {
    id: "kree",
    title: "Kree'arra",
    edition: "OSRS",
    role: "Duo or trio GWD",
    style: "Ranged. Magic if the team brought it on purpose.",
    pray: "Protect Missiles. Switch for the melee minion if it is on you.",
    start: [
      "Kc. Armadyl is a knockback room. Stand the tiles the tank uses.",
    ],
    kit: [
      "Learner: blessed, bowfa or crossbow.",
      "Desk: masori, tbow, anguish.",
    ],
    route: [
      "Do not stand under Kree. Minions on the call.",
    ],
    method: [
      "Knockback deaths are tile errors. Slow the next kill.",
    ],
  },
  muspah: {
    id: "muspah",
    title: "Phantom Muspah",
    edition: "OSRS",
    role: "Solo DT2",
    style: "Ranged on the body, mage or melee on the prayer-shield phase.",
    pray: "Protect the style it is using. Walk the spike.",
    start: [
      "Ghorrock after DT2. Learn the three forms as a list before you chase a time.",
    ],
    kit: [
      "Learner: bowfa, trident, a melee swap.",
      "Desk: tbow, shadow or sang, scythe on the last form if that is your note.",
    ],
    route: [
      "Spikes: walk. Shield: swap style. Teleport smash: step out.",
    ],
    method: [
      "A death on spikes is a walk error. Film one kill.",
    ],
  },
  hydra: {
    id: "hydra",
    title: "Alchemical Hydra",
    edition: "OSRS",
    role: "Solo slayer",
    style: "Ranged. The colour of the vent is the mechanic.",
    pray: "Protect the head that is attacking. Swap on the animation.",
    start: [
      "Konar or slayer task. Do not first-time off-task if you care about the claw.",
    ],
    kit: [
      "Learner: blowpipe or bowfa, antipoison.",
      "Desk: tbow, masori, thralls.",
    ],
    route: [
      "Lure to the correct vent. Poison walk. Enrage: keep the prayer swap.",
    ],
    method: [
      "Vent order is the fight. DPS is second.",
    ],
  },
  telos: {
    id: "telos",
    title: "Telos, the Warden",
    edition: "RS3",
    role: "Solo enrage",
    style: "Necromancy is the current desk. Magic and melee still work if that is your log.",
    pray: "Soul Split. Deflect the font style. 100%+ is a prayer exam.",
    start: [
      "0–100% until fonts and anima are boring. Do not jump to 200 because a VOD did.",
      "War's Retreat. One preset. One familiar. Write the enrage on the screen.",
    ],
    kit: [
      "Learner: best necro or mage you own, vuln bomb, a stun.",
      "Desk: the PvME page for this hour. Do not mix three discords.",
    ],
    route: [
      "Three phases at every enrage. Fonts are the wipe: stand on the matching colour or the room kills you.",
      "Anima is spent on purpose. Dumping it late is how 0% learners die after a clean first minute.",
      "Gogoa’l (the charge) is a walk. Tendrils are a cut. Do not eat both at once.",
      "Hold Soul Split. Deflect the style the current font is teaching.",
      "At 100% the same rooms get less time. The names do not change.",
      "At 200%+ one missed font is the kill. Add enrage only after two clean kills in a row.",
      "War’s Retreat between attempts. Write the % on screen so the next pull is a decision, not a mood.",
    ],
    method: [
      "Add 25% only after two clean kills. A wipe streak is a note problem, not an RNG problem.",
    ],
  },
  raksha: {
    id: "raksha",
    title: "Raksha",
    edition: "RS3",
    role: "Solo or duo",
    style: "Magic or necro. Poison and shadow walks.",
    pray: "Soul Split. Deflect mage on the beam.",
    start: [
      "Anachronia. Learn the poison pools before you chase a time.",
    ],
    kit: [
      "Learner: best mage, poison purge if you use it.",
      "Desk: PvME necro or mage page.",
    ],
    route: [
      "Pools: walk. Shadow: the tile. P4: do not greed a channel into a beam.",
    ],
    method: [
      "A pool death is a walk error. Slow the next kill.",
    ],
  },
  vorago: {
    id: "vorago",
    title: "Vorago",
    edition: "RS3",
    role: "5–10 man borehole",
    style: "Team sheet. Usually melee bombs and a mage.",
    pray: "Soul Split. Deflect melee on the smash.",
    start: [
      "Week rotation is public. Read it before you type 'inv'.",
      "Do not first-time as base. Watch a VOD of this week's mechanic.",
    ],
    kit: [
      "What the lead pinned. No surprise scythe if they asked for a bomb.",
    ],
    route: [
      "P5 bleed: stack only on the called tile. One talker. Extra voice on bomb is a wipe.",
    ],
    method: [
      "Show up on time with the week note open. Gear flex is not a role.",
    ],
  },
  solak: {
    id: "solak",
    title: "Solak",
    edition: "RS3",
    role: "7-man",
    style: "Base and bombs melee. One mage on the core if the sheet says so.",
    pray: "Soul Split. Deflect on the cleanse.",
    start: [
      "Arms and legs die on the call. Do not pad an arm that is already dead.",
    ],
    kit: [
      "Team sheet first. Your best melee unless the lead parked you on core.",
    ],
    route: [
      "Mindscape: stand your colour. Blight: cleanse when the base says. One talker in the mindscape.",
    ],
    method: [
      "A quiet 7-man outruns a loud 7-man with better weapons.",
    ],
  },
  glacor: {
    id: "glacor",
    title: "Arch-Glacor",
    edition: "RS3",
    role: "Solo streaks",
    style: "Necro or mage. Mechanics are the drop.",
    pray: "Soul Split. Deflect the mechanic you enabled.",
    start: [
      "0 mechanic until the kill is clean. Add one mechanic at a time.",
    ],
    kit: [
      "Best necro or mage. The stun you will actually press.",
    ],
    route: [
      "The mechanic you ticked is the fight. Do not tick five on a first night.",
    ],
    method: [
      "Streaks pay. A wipe on mechanic three is a note you did not read.",
    ],
  },
  rasial: {
    id: "rasial",
    title: "Rasial",
    edition: "RS3",
    role: "Solo necromancy exam",
    style: "Necromancy. This is the necro log.",
    pray: "Soul Split. Deflect the volley.",
    start: [
      "City of Um. Learn the conjure cycle before you chase a time.",
    ],
    kit: [
      "Best necro. The PvME Rasial page for this hour.",
    ],
    route: [
      "Conjures up. Volley walk. Do not drop a living death window on a special.",
    ],
    method: [
      "A missed conjure is a reset. The HP bar follows the cycle.",
    ],
  },
  araxxor: {
    id: "araxxor",
    title: "Araxxor / Araxxi",
    edition: "RS3",
    role: "Solo or duo",
    style: "The path that is open this week. Melee or range usually.",
    pray: "Soul Split. Deflect the swipe.",
    start: [
      "Week path is public. Acid, minions, or darkness — read which two are open.",
    ],
    kit: [
      "Path kit. Do not bring a mage preset to a melee path.",
    ],
    route: [
      "P1–2 on the path. P3 Araxxi: walk the acid, click the minion if that is the week.",
    ],
    method: [
      "Path knowledge is the money. Enrage later.",
    ],
  },
  kerapac: {
    id: "kerapac",
    title: "Kerapac",
    edition: "RS3",
    role: "Solo or duo",
    style: "Magic or necro.",
    pray: "Soul Split. Deflect mage.",
    start: [
      "Anachronia lab. Learn the time-stop walk before 100% enrage.",
    ],
    kit: [
      "Best mage or necro. A stun that lands.",
    ],
    route: [
      "Clones: the real one. Time-stop: walk. P4: do not channel into a slam.",
    ],
    method: [
      "Add enrage after two clean kills. A slam death is a greed.",
    ],
  },
  qbd: {
    id: "qbd",
    title: "Queen Black Dragon",
    edition: "RS3",
    role: "Solo money / logs",
    style: "Magic or necro. Artifacts in the correct order.",
    pray: "Soul Split. Deflect mage on the fire.",
    start: [
      "Artifacts first. The dragon is a timer around the artifacts.",
    ],
    kit: [
      "Best mage. Super antifire. The four artifacts in inventory order.",
    ],
    route: [
      "Click artifacts on the call you practiced. Walk the fire walls. Kill the coffins if they are up.",
    ],
    method: [
      "A death on artifacts is an order error. Slow the next kill.",
    ],
  },
  zamorakboss: {
    id: "zamorakboss",
    title: "Zamorak, Lord of Chaos",
    edition: "RS3",
    role: "Solo or group enrage",
    style: "Team or solo sheet. Necro and mage are common.",
    pray: "Soul Split. Deflect the current special.",
    start: [
      "Infernal Source. 0–100% until the map is memory.",
    ],
    kit: [
      "PvME page for this hour. Do not mix two discords.",
    ],
    route: [
      "Map first. Specials on the call. High enrage is a prayer exam.",
    ],
    method: [
      "Add 50% after two clean kills. A wipe streak is a map problem.",
    ],
  },
  helwyr: {
    id: "helwyr",
    title: "Helwyr",
    edition: "RS3",
    role: "Duo GWD2",
    style: "Melee or range.",
    pray: "Soul Split. Deflect melee on the leap.",
    start: [
      "Mushrooms and howls. Walk the fungus.",
    ],
    kit: [
      "Best melee or range. One person on the add if it is called.",
    ],
    route: [
      "Howl: walk. Mushrooms: do not stand in them.",
    ],
    method: [
      "GWD2 is practice for the next raid. Treat the walk like one.",
    ],
  },
  vindicta: {
    id: "vindicta",
    title: "Vindicta",
    edition: "RS3",
    role: "Duo GWD2",
    style: "Melee or range.",
    pray: "Soul Split. Deflect melee on the charge.",
    start: [
      "Hurricane: walk out. Do not stand in front of a charge.",
    ],
    kit: [
      "Melee or range camp. Resonate if you brought it.",
    ],
    route: [
      "Dragon phase: kill Gorvek fire, not only the rider.",
    ],
    method: [
      "Charge walk is the trip. The HP bar follows.",
    ],
  },
  cox: {
    id: "cox",
    title: "Chambers of Xeric",
    edition: "OSRS",
    role: "Raid · 1–15",
    style: "All three. Olm: melee left claw, mage right claw, range the head in last phase.",
    pray: "Head: the style he is using. Hands: stay off the wrong claw.",
    start: [
      "Learn one layout. Do not first-time Olm in a 15-man.",
      "Points come from rooms, not only the head.",
    ],
    kit: [
      "Learner: hasta, trident, blowpipe, dwh or bgs.",
      "Desk: scythe, shadow or sang, tbow, elder maul.",
    ],
    route: [
      "Clear rooms clean. Olm: spec the mage claw, melee the left, range the head when he stands.",
      "Do not tank a teleport crystal in the middle of the room.",
    ],
    method: [
      "A clean trio teaches more than a messy mass. Add scale after Olm is boring.",
    ],
  },
  colosseum: {
    id: "colosseum",
    title: "Fortis Colosseum",
    edition: "OSRS",
    role: "Solo waves then Sol Heredit",
    style: "Melee or the style the modifier asks.",
    pray: "Sol: the overhead he is about to throw. Waves: flick the spawn.",
    start: [
      "Clear waves with one modifier off until Sol is a known fight.",
    ],
    kit: [
      "Learner: hasta or scythe, brews you can count.",
      "Desk: the invos you practiced, not a random stack.",
    ],
    route: [
      "Waves first. Sol: walk the shockwave. Do not eat into a combo.",
    ],
    method: [
      "A cape is a wave exam plus a boss. Notes beat extra food.",
    ],
  },
  duke: {
    id: "duke",
    title: "Duke Sucellus",
    edition: "OSRS",
    role: "Solo DT2",
    style: "Magic or melee. Stun the eyes.",
    pray: "Protect Mage on the volley. Walk the gas.",
    start: [
      "Open the vents. Do not sit in the first gas.",
    ],
    kit: [
      "Best mage or melee. Thralls. Restore for the enrage.",
    ],
    route: [
      "Eyes down, then boss. Enrage: keep moving.",
    ],
    method: [
      "A missed vent is a reset. The HP bar is not the puzzle.",
    ],
  },
  whisperer: {
    id: "whisperer",
    title: "The Whisperer",
    edition: "OSRS",
    role: "Solo DT2",
    style: "Magic. Sanity is the mechanic.",
    pray: "Protect Mage. Walk the silence tiles.",
    start: [
      "Sanity food and a plan for the corridor. Do not first-time enrage.",
    ],
    kit: [
      "Best mage. Saturated heart. The sanity supplies the wiki lists this hour.",
    ],
    route: [
      "Keep sanity up. Enrage is a tile test.",
    ],
    method: [
      "A wipe on sanity is a supply error. Slow the next kill.",
    ],
  },
  leviathan: {
    id: "leviathan",
    title: "The Leviathan",
    edition: "OSRS",
    role: "Solo DT2",
    style: "Ranged.",
    pray: "Protect Missiles. Walk the tail and the abyss.",
    start: [
      "Learn the path around the arena before you chase a time.",
    ],
    kit: [
      "Bowfa or tbow. Stams.",
    ],
    route: [
      "Abyss: do the path. Do not skip a tile to greed a hit.",
    ],
    method: [
      "Path first, DPS second.",
    ],
  },
  vardorvis: {
    id: "vardorvis",
    title: "Vardorvis",
    edition: "OSRS",
    role: "Solo DT2",
    style: "Melee.",
    pray: "Protect Melee. Walk the axes.",
    start: [
      "Axes are the fight. The boss is the timer.",
    ],
    kit: [
      "Scythe or hasta. Blood fury if you wear it.",
    ],
    route: [
      "Do not stand in an axe line. Enrage: keep the walk.",
    ],
    method: [
      "An axe death is a tile error. Slow the next kill.",
    ],
  },
  gauntlet: {
    id: "gauntlet",
    title: "The Gauntlet",
    edition: "OSRS",
    role: "Solo",
    style: "The weapon you crafted. Hunllef wants the other two styles in rotation.",
    pray: "Pray the style Hunllef is using. Swap on the animation.",
    start: [
      "Perfected weapons and armour before the door. Corrupted is a different exam.",
    ],
    kit: [
      "What you built. Do not enter under-geared on purpose.",
    ],
    route: [
      "Hunllef: tornado walk, prayer swap, damage the right style.",
    ],
    method: [
      "Prep time is the raid. The boss is the test of the prep.",
    ],
  },
  kril: {
    id: "kril",
    title: "K'ril Tsutsaroth",
    edition: "OSRS",
    role: "Duo or trio GWD",
    style: "Melee. Poison protection.",
    pray: "Protect Melee on K'ril. Switch for minions.",
    start: [
      "Antipoison on. Tank tile in the pin.",
    ],
    kit: [
      "Bandos, hasta or scythe. Super combats.",
    ],
    route: [
      "Minions then boss, or the order the tank called.",
    ],
    method: [
      "Kc before loot talk.",
    ],
  },
  zilyana: {
    id: "zilyana",
    title: "Commander Zilyana",
    edition: "OSRS",
    role: "Duo or trio GWD",
    style: "Melee or range.",
    pray: "Protect Mage on Zilyana.",
    start: [
      "Do not stand the tank's tile. Minion prayer swaps.",
    ],
    kit: [
      "Bandos or arma. The style the tank listed.",
    ],
    route: [
      "Kill the minions that are hitting you.",
    ],
    method: [
      "A trip is kc. Screenshots come after the door.",
    ],
  },
  kq: {
    id: "kq",
    title: "Kalphite Queen",
    edition: "OSRS",
    role: "Solo or duo",
    style: "Form 1 crush or range. Form 2 the other style.",
    pray: "Protect the form she is in.",
    start: [
      "Keris if you have it. Two styles in the bag.",
    ],
    kit: [
      "Crush or range, then the swap. Antipoison.",
    ],
    route: [
      "Form change: swap gear before you greed the last hits.",
    ],
    method: [
      "The second form is a new fight. Treat it like one.",
    ],
  },
  scurrius: {
    id: "scurrius",
    title: "Scurrius",
    edition: "OSRS",
    role: "Solo learner",
    style: "Any. This is a first boss.",
    pray: "Protect Melee. Walk the falling rocks.",
    start: [
      "Varrock sewers. Bring food you can afford to lose.",
    ],
    kit: [
      "Whatever you train with. Do not buy a scythe for this.",
    ],
    route: [
      "Click the rats if they pile. Walk the debris.",
    ],
    method: [
      "Learn prayer swaps here. The next boss will use them.",
    ],
  },
  zuk: {
    id: "zuk",
    title: "TzKal-Zuk",
    edition: "RS3",
    role: "Solo kiln",
    style: "Necro or magic at the current meta.",
    pray: "Soul Split. Deflect the wave style. Zuk: the shield call.",
    start: [
      "Waves are the exam. Zuk is the last question.",
    ],
    kit: [
      "Best necro or mage. Supplies you can count.",
    ],
    route: [
      "Clear waves. Zuk: one healer at a time. Do not panic eat into a Jad.",
    ],
    method: [
      "Open PvME the morning you push. A cape is a wave log.",
    ],
  },
  ambassador: {
    id: "ambassador",
    title: "The Ambassador",
    edition: "RS3",
    role: "Solo or duo ED3",
    style: "Magic or necro.",
    pray: "Soul Split. Deflect the current blast.",
    start: [
      "Learn the black hole walk before you chase enrage.",
    ],
    kit: [
      "Best mage or necro. The stun you will press.",
    ],
    route: [
      "Holes: walk. Crystals: click early.",
    ],
    method: [
      "A late stun is a reset. Walk instead of greed.",
    ],
  },
  croesus: {
    id: "croesus",
    title: "Croesus",
    edition: "RS3",
    role: "4-man skilling boss",
    style: "Skilling. Combat is not the point.",
    pray: "None. Eat the fungus, not a prayer flick.",
    start: [
      "Roles: wood, mining, hunter, fishing. One person per node set.",
    ],
    kit: [
      "Skilling outfit and the tool the role needs. No scythe.",
    ],
    route: [
      "Call the fungus. Do not stack four people on one node.",
    ],
    method: [
      "A quiet four-man beats a loud four-man with better picks.",
    ],
  },
  aod: {
    id: "aod",
    title: "Nex: Angel of Death",
    edition: "RS3",
    role: "7-man",
    style: "Team sheet. Usually melee bombs and a mage.",
    pray: "Soul Split. Deflect the element she is on.",
    start: [
      "Roles before the door. This is not mass Nex.",
    ],
    kit: [
      "What the lead listed. Do not bring a flex piece they did not call.",
    ],
    route: [
      "Elements in order. Minions on the call. One talker.",
    ],
    method: [
      "Show up on time with the week note. Gear flex is not a role.",
    ],
  },
  kk: {
    id: "kk",
    title: "Kalphite King",
    edition: "RS3",
    role: "Duo or small",
    style: "The colour he is not immune to.",
    pray: "Soul Split. Deflect the incoming style.",
    start: [
      "Swap when he changes colour. Do not camp one style.",
    ],
    kit: [
      "Two styles in the bag. Drygores plus mage or range.",
    ],
    route: [
      "Colour swap is the fight. Incite if the team uses it.",
    ],
    method: [
      "A missed colour is a death. Swap on the animation.",
    ],
  },
  gregorovic: {
    id: "gregorovic",
    title: "Gregorovic",
    edition: "RS3",
    role: "Duo GWD2",
    style: "Range or necro.",
    pray: "Soul Split. Deflect range on the knives.",
    start: [
      "Knives and shadows. Walk the clock.",
    ],
    kit: [
      "Range camp. One person on the add if it is called.",
    ],
    route: [
      "Do not stand in a knife line.",
    ],
    method: [
      "GWD2 is practice for the next raid. Treat the walk like one.",
    ],
  },
  sanctum: {
    id: "sanctum",
    title: "Sanctum of Rebirth",
    edition: "RS3",
    role: "Group underworld raid",
    style: "Team sheet. Necro is common.",
    pray: "Soul Split. Deflect the current boss.",
    start: [
      "Learn the wing you were given. Do not first-time every wing in one night.",
    ],
    kit: [
      "What the lead listed.",
    ],
    route: [
      "Wings first. Last boss last. One talker.",
    ],
    method: [
      "Open the wiki the morning of. The instance is the exam.",
    ],
  },
  bm: {
    id: "bm",
    title: "Beastmaster Durzag",
    edition: "RS3",
    role: "10-man Liberation of Mazcab",
    style: "Team sheet.",
    pray: "Soul Split. Deflect melee on the smash.",
    start: [
      "Pets and charges are the wipe. Roles before the pull.",
    ],
    kit: [
      "What the raid lead pinned.",
    ],
    route: [
      "Pets down on the call. Charges walked.",
    ],
    method: [
      "A quiet ten-man outruns a loud ten-man.",
    ],
  },
  yaka: {
    id: "yaka",
    title: "Yakamaru",
    edition: "RS3",
    role: "10-man after Durzag",
    style: "Team sheet. Stun and poison roles.",
    pray: "Soul Split. Deflect the pool you are in.",
    start: [
      "Do not first-time Yaka the same night as first Durzag.",
    ],
    kit: [
      "Raid sheet.",
    ],
    route: [
      "Pools on the call. Stun when the base says.",
    ],
    method: [
      "Durzag clean first. Yaka is a different exam.",
    ],
  },
};

export function noteFor(id: string) {
  return BOSS_NOTES[id];
}
