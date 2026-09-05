export const RS_GEMS = [
  { id: "sapphire", light: "#8bb8ff", mid: "#2a62d4", dark: "#0d2a6a" },
  { id: "emerald", light: "#9ae08a", mid: "#2d9a3a", dark: "#0d4a18" },
  { id: "ruby", light: "#ff8a90", mid: "#c41e2a", dark: "#5a0a12" },
  { id: "diamond", light: "#ffffff", mid: "#cfe8f4", dark: "#6a88a0" },
  { id: "dragonstone", light: "#f0a8ff", mid: "#c44ad4", dark: "#5a1870" },
  { id: "onyx", light: "#6a6058", mid: "#2a2218", dark: "#0c0a08" },
  { id: "zenyte", light: "#ffe09a", mid: "#e8a84a", dark: "#6a3a10" },
  { id: "hydrix", light: "#7ee0d8", mid: "#1a8a8a", dark: "#063838" },
  { id: "opal", light: "#fff6ea", mid: "#e8dcc8", dark: "#8a7a64" },
  { id: "jade", light: "#c8e8b0", mid: "#6bb36b", dark: "#2a5a28" },
  { id: "topaz", light: "#ffc090", mid: "#c45a20", dark: "#5a2408" },
] as const;

export function gemForIndex(i: number) {
  return RS_GEMS[i % RS_GEMS.length];
}

export function CutGem({
  gem,
  size = 10,
}: {
  gem: (typeof RS_GEMS)[number];
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      aria-hidden
      style={{ imageRendering: "pixelated" }}
    >
      <polygon points="6,1 11,6 6,11 1,6" fill={gem.dark} />
      <polygon points="6,2 10,6 6,10 2,6" fill={gem.mid} />
      <polygon points="6,2 10,6 6,6" fill={gem.light} />
      <polygon points="4,5 6,3 7,4 5,6" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

export function SkillDiamond({ tone = "blue" }: { tone?: "blue" | "red" }) {
  const fill = tone === "red" ? "#c42a4a" : "#1e7ad4";
  const light = tone === "red" ? "#f4a0b4" : "#9ee7ff";
  const mid = tone === "red" ? "#e24b6a" : "#3aa0e8";
  const dark = tone === "red" ? "#6a1024" : "#0a3a78";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden
      className="shrink-0"
      style={{ imageRendering: "pixelated" }}
    >
      <polygon points="9,1 17,9 9,17 1,9" fill={dark} />
      <polygon points="9,2 16,9 9,16 2,9" fill={fill} />
      <polygon points="9,2 16,9 9,9" fill={mid} />
      <polygon points="9,2 9,9 2,9" fill={light} />
      <polygon points="9,9 16,9 9,16" fill={dark} />
      <polygon points="5,6 9,3 10,5 7,8" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}

export function RsGoldBanner({
  title,
}: {
  title: string;
  diamond?: "blue" | "red";
}) {
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1"
      style={{
        background:
          "linear-gradient(180deg, #c9a227 0%, #8a6410 48%, #c9a227 100%)",
        boxShadow: "inset 0 1px 0 #f3e2a0, inset 0 -1px 0 #5a3e08",
      }}
    >
      <span className="flex flex-1 items-center justify-end gap-1">
        <CutGem gem={RS_GEMS[1]} size={12} />
        <CutGem gem={RS_GEMS[2]} size={12} />
        <CutGem gem={RS_GEMS[0]} size={12} />
      </span>
      <span
        className="shrink-0 text-center text-sm font-semibold uppercase tracking-[0.16em]"
        style={{
          fontFamily: "Cinzel, 'Source Serif 4', Palatino, serif",
          color: "#20180a",
          textShadow: "0 1px 0 #f4e4a8",
        }}
      >
        {title}
      </span>
      <span className="flex flex-1 items-center justify-start gap-1">
        <CutGem gem={RS_GEMS[0]} size={12} />
        <CutGem gem={RS_GEMS[2]} size={12} />
        <CutGem gem={RS_GEMS[1]} size={12} />
      </span>
    </div>
  );
}
