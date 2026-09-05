/** RuneScape display-name and banner-line sanitizers. */

export const DISPLAY_NAME_MAX = 12;
export const CLAN_MAX = 24;
export const HANDLE_MAX = 32;
export const TAGLINE_MAX = 48;
export const DISCORD_MAX = 40;
export const GRIND_MAX = 36;
export const WORLD_MIN = 1;
export const WORLD_MAX = 999;

const ZERO_WIDTH = /[\u200B-\u200D\uFEFF\u00AD]/g;
const DISPLAY_KEEP = /[^A-Za-z0-9 _-]/g;
const CLAN_KEEP = /[^A-Za-z0-9 _'-]/g;
const TAG_KEEP = /[^A-Za-z0-9 .,!?'+:\-]/g;
const HANDLE_KEEP = /[^A-Za-z0-9_@/-]/g;

export function nfc(raw: string): string {
  return (raw ?? "").normalize("NFC").replace(ZERO_WIDTH, "");
}

function squeeze(s: string): string {
  return s.replace(/ {2,}/g, " ").replace(/[-_]{2,}/g, (m) => m[0]);
}

export function typeDisplayName(raw: string): string {
  return squeeze(nfc(raw).replace(DISPLAY_KEEP, "")).slice(0, DISPLAY_NAME_MAX);
}

export function sanitizeDisplayName(raw: string): string {
  let s = squeeze(nfc(raw).replace(DISPLAY_KEEP, "")).slice(0, DISPLAY_NAME_MAX);
  s = s.replace(/^[\s_-]+|[\s_-]+$/g, "");
  return s;
}

export function looksLikeStaffName(raw: string) {
  return /^mod(\s|_|-)/i.test(sanitizeDisplayName(raw));
}

export const sanitizeDisplayNameLive = typeDisplayName;

export function sanitizeClan(raw: string): string {
  return squeeze(nfc(raw).replace(CLAN_KEEP, "")).trim().slice(0, CLAN_MAX);
}

export function sanitizeLine(raw: string, max: number) {
  return squeeze(nfc(raw).replace(TAG_KEEP, "")).trim().slice(0, max);
}

export function sanitizeTagline(raw: string): string {
  return sanitizeLine(raw, TAGLINE_MAX);
}

export function sanitizeGrind(raw: string): string {
  return sanitizeTagline(raw).slice(0, GRIND_MAX);
}

export function sanitizeHandle(raw: string): string {
  let s = nfc(raw).trim();
  if (/^\s*javascript:/i.test(s) || /^\s*data:/i.test(s)) return "";
  try {
    if (/^https?:\/\//i.test(s)) {
      const u = new URL(s);
      const host = u.hostname.replace(/^www\./, "");
      if (host === "twitch.tv") s = "@" + u.pathname.split("/").filter(Boolean)[0];
      else if (host.includes("youtube.com") || host === "youtu.be") {
        const p = u.pathname.split("/").filter(Boolean);
        s = p[0] === "c" || p[0] === "@" ? "@" + (p[1] || p[0].replace(/^@/, "")) : "@" + p[p.length - 1];
      } else return "";
    }
  } catch {
    return "";
  }
  s = s.replace(HANDLE_KEEP, "").slice(0, HANDLE_MAX);
  if ((s.match(/@/g) || []).length > 1) s = "@" + s.replace(/@/g, "");
  return s;
}

export function sanitizeDiscord(raw: string): string {
  const s = nfc(raw).trim();
  const m =
    s.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/([A-Za-z0-9-]+)/i) ||
    s.match(/^([A-Za-z0-9-]{2,32})$/);
  if (!m) return "";
  const code = (m[1] || "").slice(0, 32);
  return code ? `discord.gg/${code}` : "";
}

export function typeDiscord(raw: string): string {
  const done = sanitizeDiscord(raw);
  if (done) return done;
  return nfc(raw).replace(/[^A-Za-z0-9./:\-]/g, "").slice(0, DISCORD_MAX);
}

export const sanitizeDiscordLive = typeDiscord;

export function sanitizeWorld(raw: string): string {
  const n = parseInt(String(raw).replace(/\D/g, ""), 10);
  if (!Number.isFinite(n) || n < WORLD_MIN || n > WORLD_MAX) return "";
  return String(n);
}

export function worldLabel(world: string): string {
  return world ? `World ${world}` : "";
}

export function looksLikeStaffImpersonation(name: string): boolean {
  return /\bmod\b/i.test(name) || /^mod/i.test(name.trim());
}

export function hiscoresQuery(name: string): string {
  return sanitizeDisplayName(name).replace(/_/g, " ").trim();
}
