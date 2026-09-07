/** Public daily/hourly habits. Wiki wins if a shop or reset moved. */

export type HourNote = {
  osrs: string;
  rs3: string;
};

const OSRS: string[] = [
  "Reset just flipped. Herb run first — Catherby, Ardougne, Falador, Port Phasmatys, Harmony, Trollheim, Weiss if you have them. Birdhouses on Fossil Island before you sit a boss.",
  "Post-reset hour. Buy Naff’s battlestaves in Varrock if the cap is your habit. Shop runs only for items you already use. Worlds still hitch.",
  "Quiet UTC. Slayer task or a first-hour Vorkath trip. Do not start a raid you cannot finish before work.",
  "Quiet UTC. Birdhouses if you skipped them. One herb pass if the patches are done.",
  "Quiet UTC. Farm contracts and a slayer block list you already wrote. Wiki keeps the skip table.",
  "AU/NZ evening. Good for teaching Jad and first Inferno attempts. Title the activity.",
  "EU morning. Herb run and birdhouses before work. Battlestaves if you have not bought them.",
  "EU morning. Shop caps and a short slayer block. Do not promise a Wednesday patch unless Jagex posted.",
  "EU mid-morning. One clean CoX or ToA at 0 invocation if that is the night’s name.",
  "EU midday. GE is awake. Buy supplies, then leave the square. Prices are not a method.",
  "EU afternoon. Slayer or a diary you can finish. Bank the wildy jewellery on the body.",
  "EU afternoon. Second herb run if the patches ticked. Birdhouses again if the eggs are ready.",
  "US morning, EU afternoon. Overlap starts. Full worlds on popular bosses. Learner rooms go to a quieter world.",
  "US morning. Herb run if you slept the reset. Do not skip birdhouses because a stream started.",
  "US midday. Slayer or a first ToB seat. One talker. Name the wipe.",
  "US afternoon. Good hour for a timed raid. Cut one minute, not five.",
  "US afternoon. Shop leftover caps. Prepare the night bag before peak fills the worlds.",
  "EU evening starts. Peak overlap incoming. If you roam the ditch, Protect Item is already on.",
  "Peak EU/US. Full worlds, longer GE queues. Teach on a quiet world. Do not title gear.",
  "Peak. Raids and wildy both busy. Solo leaves multi. Freeze then spec.",
  "Peak. If the herb patches ticked, run them between pulls. Dailies are not a personality.",
  "Late peak. Last clean raid of the night or bank the trip. Deadman and league promos only if LootScape or news says they are on.",
  "Last hours before reset. Finish birdhouses, staves, and herb if you still owe them. Do not start a three-hour pull.",
  "Hour before midnight UTC. Bank the daily bag. Worlds hitch after 00:00. Bob is unmoved.",
];

const RS3: string[] = [
  "Reset just flipped. Daily challenges, ports, Fort Forinthry contracts, travelling merchant. Confirm merchant stock on the wiki before you walk.",
  "Post-reset. Anachronia core cache if that is still your hour habit. War’s Retreat is a lobby, not the fight.",
  "Quiet UTC. First enrage holds and learner PvM. Title the boss, not the overlay.",
  "Quiet UTC. Archaeology cache or a contract you already accepted. Do not invent a VoS clan on this desk.",
  "Quiet UTC. Ports voyage if the ship is in. Challenges before you sit Rasial.",
  "AU/NZ evening. Good for a clean Telos or Vorago learn. Wiki keeps the font and bomb.",
  "EU morning. Challenges and merchant first. Voice of Seren flipped on this hour — check the live page, not a stream overlay.",
  "EU morning. Fort contracts and a short slayer. Monday notes wait for the official post.",
  "EU mid-morning. One camped style at a mid-enrage. Switches are a later sentence.",
  "EU midday. Hub and GE traffic. Buy the hour’s supplies. Death cost is not an OSRS skull.",
  "EU afternoon. Cache if you missed reset. Prif street is a street; VoS is a pulse on the wiki.",
  "EU afternoon. Ports and a contract. Do not start an EGWD wing you cannot own.",
  "US morning, EU afternoon. Retreat and hubs fill. Learner rooms pick a quieter world.",
  "US morning. Challenges if you slept reset. Merchant is daily — you already missed it or you did not.",
  "US midday. Sanctum or Rasial as the named exam. Living Death is the window.",
  "US afternoon. One timed kill. Enrage is a dialect. The wiki keeps the percent.",
  "US afternoon. Prep the night bar. Revo is a camp. Manual is a choice. Neither is a secret.",
  "EU evening starts. Peak incoming. Title RuneScape, not Old School.",
  "Peak overlap. War’s Retreat busy. Teach on a quiet world. Do not stencil a clan onto VoS.",
  "Peak. AoD and raids fill. One talker. A wing you did not own is the wipe.",
  "Peak. If challenges are still open, finish them between pulls.",
  "Late peak. Last clean kill or bank the session. Treasure Hunter is a quarrel, not a method.",
  "Last hours before reset. Challenges, ports, contracts, merchant. Cache if the hour still holds it.",
  "Hour before midnight UTC. Bank the daily list. Worlds hitch after 00:00. The cat is unmoved.",
];

export function hourMethods(utcHour: number): HourNote {
  const i = ((Math.trunc(Number(utcHour)) % 24) + 24) % 24;
  return { osrs: OSRS[i] ?? OSRS[0]!, rs3: RS3[i] ?? RS3[0]! };
}
