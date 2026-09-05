import { hiscoresQuery } from "./rsText";

export type HiscoreRow = { skill: string; rank: number; level: number; xp: number };

const OSRS_BASE = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Hitpoints",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecraft",
  "Hunter",
  "Construction",
];

const OSRS_SKILLS = [...OSRS_BASE, "Sailing"];

const RS3_SKILLS = [
  ...OSRS_BASE.slice(0, 4),
  "Constitution",
  ...OSRS_BASE.slice(5),
  "Summoning",
  "Dungeoneering",
  "Divination",
  "Invention",
  "Archaeology",
  "Necromancy",
];

export const HISCORE_URLS = {
  osrsLite: (name: string) =>
    `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(name)}`,
  rs3Lite: (name: string) =>
    `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(name)}`,
  osrsPage: (name: string) =>
    `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${encodeURIComponent(name)}`,
  rs3Page: (name: string) =>
    `https://secure.runescape.com/m=hiscore/hiscorepersonal?user1=${encodeURIComponent(name)}`,
  osrsWom: (name: string) =>
    `https://wiseoldman.net/players/${encodeURIComponent(name)}`,
};

export function parseLite(text: string, skills: string[]): HiscoreRow[] {
  return text
    .trim()
    .split(/\n/)
    .slice(0, skills.length)
    .map((line, i) => {
      const [rank, level, xp] = line.split(",").map((n) => Number(n));
      return {
        skill: skills[i] ?? `Skill ${i}`,
        rank: Number.isFinite(rank) ? rank : -1,
        level: Number.isFinite(level) ? level : 0,
        xp: Number.isFinite(xp) ? xp : 0,
      };
    })
    .filter((row) => row.level > 0 || row.xp > 0);
}

function parseWom(data: unknown, skills: string[]): HiscoreRow[] {
  const snap = (data as { latestSnapshot?: { data?: { skills?: Record<string, { rank?: number; level?: number; experience?: number }> } } })
    .latestSnapshot?.data?.skills;
  if (!snap) return [];
  return skills
    .map((skill) => {
      const row = snap[skill.toLowerCase()];
      return {
        skill,
        rank: Number(row?.rank ?? -1),
        level: Number(row?.level ?? 0),
        xp: Number(row?.experience ?? 0),
      };
    })
    .filter((row) => row.level > 0 || row.xp > 0);
}

function looksLikeLite(text: string) {
  const line = text.trim().split(/\n/)[0] ?? "";
  return /^-?\d+,-?\d+,-?\d+/.test(line);
}

export async function loadHiscores(name: string, edition: "OSRS" | "RS3", signal?: AbortSignal) {
  const clean = hiscoresQuery(name);
  if (!clean) return [];
  if (import.meta.env.VITE_HISCORES_ENABLED === "false") return [];
  const skills = edition === "OSRS" ? OSRS_SKILLS : RS3_SKILLS;
  const local = `/api/hiscores?edition=${encodeURIComponent(edition)}&player=${encodeURIComponent(clean)}`;

  try {
    const res = await fetch(local, {
      cache: "no-store",
      signal: signal ?? AbortSignal.timeout(8_000),
    });
    if (res.ok) {
      const text = await res.text();
      if (looksLikeLite(text)) {
        const rows = parseLite(text, skills);
        if (rows.length) return rows;
      }
    }
  } catch {
    /* public tables next */
  }

  if (edition === "OSRS" && import.meta.env.VITE_WOM_ENABLED !== "false") {
    try {
      const res = await fetch(
        `https://api.wiseoldman.net/v2/players/${encodeURIComponent(clean)}`,
        { signal: AbortSignal.timeout(8_000) },
      );
      if (res.ok) {
        const rows = parseWom(await res.json(), skills);
        if (rows.length) return rows;
      }
    } catch {
      /* empty */
    }
  }

  return [];
}
