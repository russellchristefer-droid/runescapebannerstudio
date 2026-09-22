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
  return {
    "--region": b.primary,
    "--region-accent": b.accent,
    "--region-ink": b.ink,
    "--god-ink": godInk ?? b.accent,
  } as CSSProperties;
}
