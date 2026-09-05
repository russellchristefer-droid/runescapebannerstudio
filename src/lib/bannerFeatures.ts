export type Game = "osrs" | "rs3";
export type Layout = "banner" | "lower-third" | "title-card";
export type SafeZone = "none" | "twitch" | "youtube" | "discord" | "x" | "tiktok" | "facebook" | "rs";
export type IconStory = "none" | "combat-triangle" | "99-club" | "skills-i-hate";
export type PresetId = "tob-night" | "fire-cape" | "rs3-enrage" | "iron-teach";
export const TWITCH = { w: 1200, h: 480 };
export const YOUTUBE = { w: 1280, h: 720 };
export const PRESETS: Record<
  PresetId,
  {
    label: string;
    game: Game;
    placeHint: string;
    lighting: "dark" | "light";
    tagline: string;
    grind: string;
  }
> = {
  "tob-night": {
    label: "ToB night raid",
    game: "osrs",
    placeHint: "theatre-of-blood",
    lighting: "dark",
    tagline: "Raid night",
    grind: "Theatre of Blood",
  },
  "fire-cape": {
    label: "OSRS fire cape flex",
    game: "osrs",
    placeHint: "fight-caves",
    lighting: "dark",
    tagline: "Fire cape",
    grind: "Fight Caves",
  },
  "rs3-enrage": {
    label: "RS3 enrage grind",
    game: "rs3",
    placeHint: "telos",
    lighting: "dark",
    tagline: "Enrage ladder",
    grind: "Telos",
  },
  "iron-teach": {
    label: "Iron teaching world",
    game: "osrs",
    placeHint: "lumbridge",
    lighting: "light",
    tagline: "Teaching world",
    grind: "",
  },
};

const PRESET_SLUG: Record<PresetId, string[]> = {
  "tob-night": ["tob"],
  "fire-cape": ["inferno"],
  "rs3-enrage": ["telos"],
  "iron-teach": ["osrslumbridge", "lumbridge"],
};

export function presetSlugs(id: PresetId) {
  return PRESET_SLUG[id];
}

export function resolvePlace(game: Game, hint: string, knownSlugs: string[]): string {
  const h = hint.replace(/-/g, "");
  const hit = knownSlugs.find((s) => {
    const low = s.toLowerCase().replace(/-/g, "");
    const osrs = low.includes("osrs");
    if (game === "osrs" && low.includes("rs3") && !osrs) return false;
    if (game === "rs3" && osrs) return false;
    return low.includes(h) || low.includes(hint.split("-")[0]);
  });
  return hit || "";
}

export function iconStorySkills(game: Game, story: IconStory): string[] {
  const hp = game === "rs3" ? "Constitution" : "Hitpoints";
  if (story === "combat-triangle") return ["Attack", "Strength", "Defence", hp, "Ranged", "Magic", "Prayer"];
  if (story === "99-club") return ["Attack", "Strength", "Defence", hp, "Ranged", "Prayer", "Magic"];
  if (story === "skills-i-hate") return game === "rs3" ? ["Runecrafting", "Agility", "Invention"] : ["Runecraft", "Agility", "Hunter"];
  return [];
}

export function safeZoneRects(zone: SafeZone) {
  if (zone === "twitch")
    return [
      { x: 0, y: 0, w: 0.18, h: 1, label: "Avatar crop" },
      { x: 0.82, y: 0, w: 0.18, h: 1, label: "Edge crop" },
    ];
  if (zone === "youtube")
    return [
      { x: 0, y: 0, w: 1, h: 0.35, label: "Desktop crop" },
      { x: 0, y: 0.65, w: 1, h: 0.35, label: "Desktop crop" },
      { x: 0, y: 0.35, w: 0.12, h: 0.3, label: "" },
      { x: 0.88, y: 0.35, w: 0.12, h: 0.3, label: "" },
    ];
  if (zone === "discord") return [{ x: 0, y: 0, w: 1, h: 0.22, label: "Profile crop" }];
  if (zone === "x")
    return [
      { x: 0, y: 0, w: 0.12, h: 1, label: "Mobile" },
      { x: 0.88, y: 0, w: 0.12, h: 1, label: "Mobile" },
    ];
  if (zone === "tiktok")
    return [
      { x: 0, y: 0, w: 1, h: 0.14, label: "TikTok top" },
      { x: 0, y: 0.78, w: 1, h: 0.22, label: "TikTok UI" },
    ];
  if (zone === "facebook")
    return [
      { x: 0, y: 0.72, w: 1, h: 0.28, label: "Profile strip" },
    ];
  if (zone === "rs") return [{ x: 0, y: 0, w: 0.22, h: 1, label: "Nav" }];
  return [];
}

export function drawSafeZoneGhosts(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  zone: SafeZone,
) {
  ctx.save();
  ctx.setLineDash([7, 5]);
  ctx.font = `${Math.max(12, h * 0.04)}px "RS Chat Bold"`;
  ctx.textBaseline = "top";
  for (const r of safeZoneRects(zone)) {
    const x = r.x * w;
    const y = r.y * h;
    const rw = r.w * w;
    const rh = r.h * h;
    ctx.fillStyle = "rgba(12,10,8,0.35)";
    ctx.fillRect(x, y, rw, rh);
    ctx.strokeStyle = "rgba(255,220,120,0.9)";
    ctx.strokeRect(x + 0.5, y + 0.5, rw - 1, rh - 1);
    ctx.fillStyle = "#ffe9b0";
    ctx.fillText(r.label, x + 8, y + 6);
  }
  ctx.restore();
}

export function voiceOfSerenLine(now = new Date()) {
  const sec = (60 - now.getUTCMinutes()) * 60 - now.getUTCSeconds();
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `Voice of Seren flips on the hour · ${m}m ${String(s).padStart(2, "0")}s`;
}

export function worldLine(world: string) {
  const n = String(world).replace(/\D/g, "");
  return n ? `World ${n}` : "";
}
