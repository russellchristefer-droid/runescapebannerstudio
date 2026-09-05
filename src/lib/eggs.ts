export const EGG_EVENT = "rs-egg-toast";

export function eggToast(message: string) {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/legal")) return;
  window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: message }));
}

export function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function fieldFocused() {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}

export function sessionOnce(key: string) {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

export const OWNER_LINES = [
  "The banks still send this one birthday cards.",
  "GP so old it has rumours.",
  "Logged in before some worlds had names.",
  "Sweat tier: the mouse asked for a break.",
  "Grind so long the rocks respawned out of respect.",
];

export function isOwnerName(raw: string) {
  const n = raw.trim().toLowerCase().replace(/[^a-z]/g, "");
  return n === "christefer";
}

export function ownerToast() {
  eggToast(OWNER_LINES[Math.floor(Math.random() * OWNER_LINES.length)] ?? OWNER_LINES[0]);
}

export function savedEdition(): "OSRS" | "RS3" {
  try {
    const raw = localStorage.getItem("rsbs.desk.v1") || localStorage.getItem("rs-banner-studio");
    if (!raw) return "OSRS";
    const data = JSON.parse(raw) as { edition?: string };
    return data.edition === "RS3" ? "RS3" : "OSRS";
  } catch {
    return "OSRS";
  }
}
