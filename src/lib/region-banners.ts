import type { CSSProperties } from "react";

export type RegionBanner = {
  slug: string;
  primary: string;
  accent: string;
  ink: string;
};

type Pair = { primary: string; accent: string; slug: string };

const NAMED: Record<string, Pair> = {
  Misthalin: { primary: "#5c2d7a", accent: "#3d9e3d", slug: "misthalin" },
  "Lumbridge Swamp": { primary: "#5c2d7a", accent: "#3d9e3d", slug: "misthalin" },
  Varrock: { primary: "#5c2d7a", accent: "#3d9e3d", slug: "misthalin" },
  Asgarnia: { primary: "#3a7ca5", accent: "#f4f4f4", slug: "asgarnia" },
  Burtrope: { primary: "#3a7ca5", accent: "#f4f4f4", slug: "asgarnia" },
  Kandarin: { primary: "#2f6b3c", accent: "#d4b84a", slug: "kandarin" },
  Morytania: { primary: "#1c1418", accent: "#6a8f3d", slug: "morytania" },
  Kharidian: { primary: "#c9a227", accent: "#1a1a1a", slug: "kharidian" },
  Tirannwn: { primary: "#1a3d40", accent: "#7ef0ff", slug: "tirannwn" },
  Fremennik: { primary: "#4a5560", accent: "#c5d0da", slug: "fremennik" },
  "Great Kourend": { primary: "#3a2a12", accent: "#c4a35a", slug: "kourend" },
  Varlamore: { primary: "#6b3a24", accent: "#e8b86d", slug: "varlamore" },
  "Southern Sea": { primary: "#4a2a18", accent: "#ff7ad9", slug: "southern-sea" },
  "Lost City": { primary: "#3a2458", accent: "#e6a0ff", slug: "lost-city" },
  Wilderness: { primary: "#2a1214", accent: "#c4473a", slug: "wilderness" },
  Forinthry: { primary: "#2a1214", accent: "#c4473a", slug: "wilderness" },
};

const FALLBACK: Pair = { primary: "#2a241c", accent: "#c4a35a", slug: "other" };

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
