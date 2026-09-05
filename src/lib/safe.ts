const CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u200b-\u200f]/g;

export function clip(raw: unknown, max: number) {
  if (typeof raw !== "string") return "";
  return raw.normalize("NFC").replace(CTRL, "").slice(0, max);
}

export function typeDisplayName(raw: string) {
  return clip(raw, 12)
    .replace(/[^A-Za-z0-9 _-]/g, "")
    .replace(/ {2,}/g, " ")
    .replace(/--+/g, "-")
    .replace(/__+/g, "_");
}

export function finishDisplayName(raw: string) {
  return typeDisplayName(raw).trim().replace(/^[-_]+|[-_]+$/g, "");
}

const RS_NAME = /^[A-Za-z0-9](?:[A-Za-z0-9]|[ _-](?=[A-Za-z0-9])){0,11}$/;

export function cleanPlayerName(raw: string) {
  const name = finishDisplayName(raw).replace(/_/g, " ").replace(/\s+/g, " ");
  if (!name || name.length > 12) return "";
  if (!RS_NAME.test(name) && !/^[A-Za-z0-9][A-Za-z0-9 _-]{0,11}$/.test(name)) return "";
  return name;
}

export function typeClan(raw: string) {
  return clip(raw, 24)
    .replace(/[^A-Za-z0-9 _'\-]/g, "")
    .replace(/ {2,}/g, " ");
}

export function typeHandle(raw: string) {
  let s = clip(raw, 80).trim();
  try {
    if (/^https?:\/\//i.test(s)) {
      const url = new URL(s);
      const host = url.hostname.replace(/^www\./, "");
      if (host.includes("twitch.tv")) s = "@" + url.pathname.split("/").filter(Boolean)[0];
      else if (host.includes("youtube.com") || host === "youtu.be") {
        const parts = url.pathname.split("/").filter(Boolean);
        s = parts[0] === "c" || parts[0] === "@" ? parts.slice(-1)[0] : parts[0] ?? "";
        if (!s.startsWith("@") && !s.startsWith("/")) s = "@" + s.replace(/^@/, "");
      }
    }
  } catch {
    /* keep typed */
  }
  s = s.replace(/javascript:/gi, "");
  return s.replace(/[^A-Za-z0-9_@/\-]/g, "").slice(0, 32);
}

export function typeTagline(raw: string) {
  return clip(raw, 48)
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/@everyone/gi, "")
    .replace(/[^A-Za-z0-9 .,!?'':\-]/g, "");
}

export function typeGrind(raw: string) {
  return clip(raw, 36).replace(/[^A-Za-z0-9 .,!?'':\-]/g, "");
}

export function typeWorld(raw: string) {
  const n = clip(raw, 3).replace(/\D/g, "");
  if (!n) return "";
  const v = Math.min(999, Number(n));
  return v > 0 ? String(v) : "";
}

export function typeDiscord(raw: string) {
  let s = clip(raw, 80).trim();
  if (/discord\.(gg|com)/i.test(s) || /^https?:/i.test(s)) {
    s = s.replace(/^https?:\/\//i, "");
    s = s.replace(/^(www\.)?discord\.com\/invite\//i, "");
    s = s.replace(/^(www\.)?discord\.gg\//i, "");
    s = s.replace(/[^A-Za-z0-9-]/g, "").slice(0, 32);
    return s ? `discord.gg/${s}` : "";
  }
  return s.replace(/[^A-Za-z0-9./\-]/g, "").slice(0, 40);
}

export function cleanEmail(raw: string) {
  const email = clip(raw, 80).trim().replace(/\s+/g, "");
  if (!email || /[\r\n,]/.test(email)) return "";
  const at = email.indexOf("@");
  if (at < 1) return "";
  const domain = email.slice(at + 1);
  if (!domain.includes(".") || domain.endsWith(".")) return "";
  return email;
}

export function cleanLevel(raw: unknown) {
  const n = String(raw ?? "").replace(/[^\d]/g, "").slice(0, 3);
  if (!n) return "";
  const v = Math.min(120, Number(n));
  return Number.isFinite(v) ? String(v) : "";
}

export function safeSceneSrc(src: unknown) {
  if (typeof src !== "string" || !src) return "";
  if (src.startsWith("/locations/") || src.startsWith("/brand/") || src.startsWith("/skills/")) {
    return src;
  }
  if (src.startsWith("blob:")) return src;
  try {
    const url = new URL(src);
    if (url.protocol === "https:" || url.protocol === "http:") return url.href;
  } catch {
    /* ignore */
  }
  return "";
}
