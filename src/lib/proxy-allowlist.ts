const ALLOWED = new Set([
  "secure.runescape.com",
  "services.runescape.com",
  "api.wiseoldman.net",
  "oldschool.runescape.wiki",
  "runescape.wiki",
]);

export function isAllowedHttpsUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return false;
    if (url.username || url.password) return false;
    const host = url.hostname.toLowerCase();
    if (/^\d/.test(host) || host === "localhost" || host.endsWith(".local")) return false;
    return ALLOWED.has(host);
  } catch {
    return false;
  }
}
