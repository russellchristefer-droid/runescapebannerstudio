import type { CSSProperties } from "react";

export type RegionBanner = {
  slug: string;
  primary: string;
  accent: string;
  ink: string;
};

type Pair = { primary: string; accent: string; slug: string };

const NAMED: Record<string, Pair> = {
  Misthalin: { primary: "#8a3fd4", accent: "#3dcc3d", slug: "misthalin" },
  "Lumbridge Swamp": { primary: "#8a3fd4", accent: "#3dcc3d", slug: "misthalin" },
  Varrock: { primary: "#8a3fd4", accent: "#3dcc3d", slug: "misthalin" },
  Asgarnia: { primary: "#3d63f0", accent: "#f2f2f2", slug: "asgarnia" },
  Burtrope: { primary: "#3d63f0", accent: "#f2f2f2", slug: "asgarnia" },
  Kandarin: { primary: "#e24b42", accent: "#f4f4f4", slug: "kandarin" },
  Morytania: { primary: "#5f9a3c", accent: "#e6e2d8", slug: "morytania" },
  Kharidian: { primary: "#e2b84a", accent: "#6a3a14", slug: "kharidian" },
  Tirannwn: { primary: "#3ee0e8", accent: "#e8ffff", slug: "tirannwn" },
  Fremennik: { primary: "#e2c56a", accent: "#6e6e78", slug: "fremennik" },
  "Great Kourend": { primary: "#2fbf62", accent: "#f2f2f2", slug: "kourend" },
  Varlamore: { primary: "#e6c25a", accent: "#d4897a", slug: "varlamore" },
  "Southern Sea": { primary: "#c49a8c", accent: "#5c4038", slug: "southern-sea" },
  Karamja: { primary: "#2f6b3c", accent: "#d4b84a", slug: "karamja" },
  "Lost City": { primary: "#e7b4c6", accent: "#f4f0e8", slug: "lost-city" },
  Wilderness: { primary: "#d0d0d0", accent: "#3a3a3a", slug: "wilderness" },
  Forinthry: { primary: "#d0d0d0", accent: "#3a3a3a", slug: "wilderness" },
};

const FALLBACK: Pair = { primary: "#2a241c", accent: "#c4a35a", slug: "other" };

const REAL = new Set([
  "misthalin",
  "asgarnia",
  "kandarin",
  "morytania",
  "kharidian",
  "tirannwn",
  "fremennik",
  "kourend",
  "varlamore",
  "southern-sea",
  "lost-city",
  "wilderness",
]);

const MEADOW = { bg: "#12160f", panel: "#1a1f16", line: "#8aa35a", accent: "#e8e0c4" };

/** Kingdom cloth. Not the infernal cape. */
const CLOTH: Record<string, { bg: string; panel: string; line: string; accent: string }> = {
  misthalin: { bg: "#1a1220", panel: "#24182c", line: "#6b3d8c", accent: "#3d9e3d" },
  asgarnia: { bg: "#121820", panel: "#1a2430", line: "#6a8eae", accent: "#e8eef4" },
  kandarin: { bg: "#10180e", panel: "#182418", line: "#3d7a44", accent: "#d4b84a" },
  morytania: { bg: "#141410", panel: "#1c1c14", line: "#5a6a38", accent: "#8a9a4a" },
  kharidian: { bg: "#1c1608", panel: "#2a2010", line: "#c9a227", accent: "#1a1a1a" },
  tirannwn: { bg: "#0e1818", panel: "#142424", line: "#7ef0ff", accent: "#3a6a6a" },
  fremennik: { bg: "#14161a", panel: "#1c2026", line: "#8a96a4", accent: "#c5d0da" },
  kourend: { bg: "#16120a", panel: "#221c10", line: "#c4a35a", accent: "#6a4a20" },
  varlamore: { bg: "#1a120c", panel: "#261810", line: "#e8b86d", accent: "#6b3a24" },
  "southern-sea": { bg: "#16120e", panel: "#241c16", line: "#ff7ad9", accent: "#4a2a18" },
  karamja: { bg: "#10180e", panel: "#182418", line: "#3d7a44", accent: "#d4b84a" },
  "lost-city": { bg: "#16101c", panel: "#221828", line: "#e6a0ff", accent: "#3a2458" },
  wilderness: { bg: "#140c0c", panel: "#1c1212", line: "#8a3030", accent: "#c4a35a" },
};

export function clothFor(region: string | undefined) {
  return CLOTH[bannerFor(region).slug] ?? MEADOW;
}

export function hasBanner(region: string | undefined) {
  return REAL.has(bannerFor(region).slug);
}

function luma(hex: string) {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

export function bannerFor(region: string | undefined): RegionBanner {
  const head = (region ?? "").replace(/\s·\sOSRS$/, "").replace(/\s·\sRuneScape$/, "");
  const pair = NAMED[head] ?? FALLBACK;
  const ink = luma(pair.primary) >= 0.28 ? pair.primary : pair.accent;
  const accent = luma(pair.accent) >= 0.28 ? pair.accent : pair.primary;
  return { slug: pair.slug, primary: pair.primary, accent, ink };
}

export function regionPageStyle(region: string | undefined, godInk?: string): CSSProperties {
  const b = bannerFor(region);
  const c = clothFor(region);
  return {
    "--region": b.primary,
    "--region-accent": c.accent,
    "--region-ink": c.line,
    "--town-bg": c.bg,
    "--town-panel": c.panel,
    "--town-line": c.line,
    "--town-accent": c.accent,
    "--god-ink": godInk ?? c.accent,
  } as CSSProperties;
}
