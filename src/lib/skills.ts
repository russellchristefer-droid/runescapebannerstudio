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
  "dungeoneering",
  "invention",
  "slayer",
  "herblore",
  "farming",
  "archaeology",
  "necromancy",
  "thieving",
  "construction",
]);

const RS3_110 = new Set([
  "mining",
  "smithing",
  "woodcutting",
  "fletching",
  "firemaking",
  "runecraft",
  "crafting",
  "hunter",
]);

const RS3_ELITE = new Set(["invention", "archaeology", "necromancy"]);

function bareSkill(id: string) {
  return id.toLowerCase().replace(/^rs3-/, "");
}

/** In-game level where new content stops. */
export function skillRealCap(id: string, pack: "OSRS" | "RS3") {
  if (pack === "OSRS") return 99;
  const bare = bareSkill(id);
  if (RS3_120.has(bare)) return 120;
  if (RS3_110.has(bare)) return 110;
  return 99;
}

/** Highest number the hiscores or virtual toggle will show. */
export function skillLevelCap(id: string, pack: "OSRS" | "RS3") {
  if (pack === "OSRS") return 126;
  if (RS3_ELITE.has(bareSkill(id))) return 150;
  return 126;
}

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
  const digits = String(raw).replace(/\D/g, "").slice(0, 3);
  if (!digits) return "";
  const n = parseInt(digits, 10);
  if (!Number.isFinite(n)) return "";
  if (n > cap) return String(cap);
  return String(n);
}
