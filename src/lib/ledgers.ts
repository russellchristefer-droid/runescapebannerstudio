export type LedgerRow = { name: string; what: string; href: string };

export const RS3_LEDGER = {
  game: "RuneScape" as const,
  wiki: "https://runescape.wiki/w/Money_making_guide",
  f2p: [
    { name: "Killing cows", what: "Hides and raw beef in Lumbridge.", href: "https://runescape.wiki/w/Money_making_guide/Killing_cows" },
    { name: "Killing chickens", what: "Feathers and raw chicken.", href: "https://runescape.wiki/w/Money_making_guide/Killing_chickens" },
    { name: "Mining iron ore", what: "F2P iron rocks.", href: "https://runescape.wiki/w/Money_making_guide/Mining_iron_ore" },
    { name: "Smelting iron bars", what: "Furnace the ore.", href: "https://runescape.wiki/w/Money_making_guide/Smelting_iron_bars" },
    { name: "Tanning hides", what: "Cowhide to leather.", href: "https://runescape.wiki/w/Money_making_guide/Tanning_hides" },
    { name: "Crafting air runes", what: "Air altar, F2P rune.", href: "https://runescape.wiki/w/Money_making_guide/Crafting_air_runes" },
  ] satisfies LedgerRow[],
  members: [
    { name: "Screening soil", what: "Sift Soil on archaeology material.", href: "https://runescape.wiki/w/Money_making_guide/Screening_soil_using_Sift_Soil" },
    { name: "Harvesting incandescent energy", what: "Divination wisp colony.", href: "https://runescape.wiki/w/Money_making_guide/Harvesting_incandescent_energy" },
    { name: "Mining animica", what: "Prifddinas / Seren stone family.", href: "https://runescape.wiki/w/Money_making_guide/Mining_animica" },
    { name: "Lesser necroplasm rituals", what: "Necromancy ritual site.", href: "https://runescape.wiki/w/Money_making_guide/Performing_lesser_necroplasm_rituals" },
    { name: "Catching whirligigs", what: "Hunter on Anachronia.", href: "https://runescape.wiki/w/Money_making_guide/Catching_whirligigs" },
    { name: "Smithing cannonballs", what: "Furnace processing.", href: "https://runescape.wiki/w/Money_making_guide/Smithing_cannonballs" },
    { name: "Tanning royal dragonhide", what: "Make Leather / tannery.", href: "https://runescape.wiki/w/Money_making_guide/Tanning_hides" },
    { name: "Archaeology caches", what: "Material caches, low click.", href: "https://runescape.wiki/w/Money_making_guide" },
  ] satisfies LedgerRow[],
};

export const OSRS_LEDGER = {
  game: "Old School RuneScape" as const,
  wiki: "https://oldschool.runescape.wiki/w/Money_making_guide",
  f2p: [
    { name: "Killing cows", what: "Lumbridge hides.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Killing_cows" },
    { name: "Mining iron ore (free-to-play)", what: "F2P iron rocks.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_iron_ore_(free-to-play)" },
    { name: "Mining coal (free-to-play)", what: "F2P coal.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_coal_(free-to-play)" },
    { name: "Cooking raw chicken", what: "Range or fire.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Cooking_raw_chicken" },
    { name: "Fishing", what: "Shrimp and beyond.", href: "https://oldschool.runescape.wiki/w/Money_making_guide" },
    { name: "Collecting cowhides", what: "Same field as the cows.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Killing_cows" },
  ] satisfies LedgerRow[],
  members: [
    { name: "Mining amethyst", what: "High Mining, low click.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_amethyst" },
    { name: "Cutting redwood logs", what: "Woodcutting Guild.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Cutting_redwood_logs" },
    { name: "Smithing cannonballs", what: "Steel bars at a furnace.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Smithing_cannonballs" },
    { name: "Fishing karambwans", what: "Karamja raw karambwan.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Fishing_raw_karambwan" },
    { name: "Crafting blood runes", what: "True blood altar.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Crafting_blood_runes" },
    { name: "Motherlode Mine", what: "Pay-dirt, bank when full.", href: "https://oldschool.runescape.wiki/w/Motherlode_Mine" },
    { name: "Making sacred oil", what: "Processing.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Making_sacred_oil" },
    { name: "Grinding unicorn horns", what: "Pestle and mortar.", href: "https://oldschool.runescape.wiki/w/Money_making_guide/Grinding_unicorn_horns" },
  ] satisfies LedgerRow[],
};
