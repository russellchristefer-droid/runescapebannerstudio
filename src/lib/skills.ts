export type SkillId = string;

export type Skill = {
  id: SkillId;
  name: string;
  editions: ("RS3" | "OSRS")[];
  src: string;
};

const RS3_OWN = new Set([
  "constitution",
  "summoning",
  "dungeoneering",
  "divination",
  "invention",
  "archaeology",
  "necromancy",
]);

const RS3_120 = new Set([
  "invention",
  "dungeoneering",
  "slayer",
  "farming",
  "herblore",
  "archaeology",
  "necromancy",
  "rs3-slayer",
  "rs3-farming",
  "rs3-herblore",
]);

function osrs(name: string): Skill {
  return {
    id: name.toLowerCase(),
    name,
    editions: ["OSRS"],
    src: `/skills/osrs-${name}.png`,
  };
}

function rs3(name: string): Skill {
  const slug = name.toLowerCase();
  return {
    id: RS3_OWN.has(slug) ? slug : `rs3-${slug}`,
    name,
    editions: ["RS3"],
    src: `/skills/rs3-${name}.png`,
  };
}

export const SKILLS: Skill[] = [
  osrs("Attack"),
  osrs("Strength"),
  osrs("Defence"),
  osrs("Ranged"),
  osrs("Prayer"),
  osrs("Magic"),
  osrs("Runecraft"),
  osrs("Construction"),
  osrs("Hitpoints"),
  osrs("Agility"),
  osrs("Herblore"),
  osrs("Thieving"),
  osrs("Crafting"),
  osrs("Fletching"),
  osrs("Slayer"),
  osrs("Hunter"),
  osrs("Mining"),
  osrs("Smithing"),
  osrs("Fishing"),
  osrs("Cooking"),
  osrs("Firemaking"),
  osrs("Woodcutting"),
  osrs("Farming"),
  osrs("Sailing"),
  rs3("Attack"),
  rs3("Strength"),
  rs3("Defence"),
  rs3("Ranged"),
  rs3("Prayer"),
  rs3("Magic"),
  rs3("Runecraft"),
  rs3("Construction"),
  rs3("Constitution"),
  rs3("Agility"),
  rs3("Herblore"),
  rs3("Thieving"),
  rs3("Crafting"),
  rs3("Fletching"),
  rs3("Slayer"),
  rs3("Hunter"),
  rs3("Mining"),
  rs3("Smithing"),
  rs3("Fishing"),
  rs3("Cooking"),
  rs3("Firemaking"),
  rs3("Woodcutting"),
  rs3("Farming"),
  rs3("Summoning"),
  rs3("Dungeoneering"),
  rs3("Divination"),
  rs3("Invention"),
  rs3("Archaeology"),
  rs3("Necromancy"),
];

export function skillLevelCap(id: string, pack: "OSRS" | "RS3") {
  if (pack === "RS3" && RS3_120.has(id.toLowerCase())) return 120;
  return 99;
}

export function skillIdForHiscore(skillName: string, pack: "OSRS" | "RS3") {
  const key = skillName.toLowerCase().replace(/[^a-z]/g, "");
  const hit = SKILLS.find(
    (row) =>
      row.editions.includes(pack) &&
      (row.name.toLowerCase().replace(/[^a-z]/g, "") === key ||
        row.id.replace(/^rs3-/, "") === key ||
        row.id === key),
  );
  return hit?.id ?? "";
}

export function sanitizeSkillLevel(raw: string, cap: number) {
  const n = parseInt(String(raw).replace(/\D/g, ""), 10);
  if (!Number.isFinite(n) || n < 1) return "";
  return String(Math.min(cap, n));
}
