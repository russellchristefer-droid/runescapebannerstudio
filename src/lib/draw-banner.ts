import { RULES } from "./locations";
import { drawSafeZoneGhosts, type Layout, type SafeZone } from "./bannerFeatures";
import {
  sanitizeClan,
  sanitizeDiscord,
  sanitizeDisplayName,
  sanitizeGrind,
  sanitizeHandle,
  sanitizeTagline,
  sanitizeWorld,
  worldLabel,
} from "./rsText";

type PaintCtx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export const TEXT_HD = 2;
const RS_YELLOW = "#ffff00";
const RS_INK = "#000000";
const FACE = "RS Chat Bold";
const FACE_URL = "/fonts/rs-chat-bold.ttf";
let plateFontReady = false;
let plateFontTried = false;

export function isPlateFontReady() {
  return plateFontReady;
}

export async function ensurePlateFont() {
  if (typeof document === "undefined") return false;
  if (plateFontReady) return true;
  if (plateFontTried && !plateFontReady) return false;
  plateFontTried = true;
  try {
    const head = await fetch(FACE_URL, { method: "GET", cache: "force-cache" });
    if (!head.ok) throw new Error("Chat Bold missing — /fonts/rs-chat-bold.ttf is not 200");
    const buf = await head.arrayBuffer();
    if (buf.byteLength < 1000) throw new Error("Chat Bold missing — /fonts/rs-chat-bold.ttf is not 200");
    if ("FontFace" in window) {
      for (const weight of ["400", "700"] as const) {
        const face = new FontFace(FACE, buf, { weight, style: "normal" });
        document.fonts.add(await face.load());
      }
    }
    await document.fonts.load(`400 42px "${FACE}"`);
    await document.fonts.load('700 42px "RS Chat Bold"');
    if (!document.fonts.check('700 42px "RS Chat Bold"')) {
      throw new Error("RS Chat Bold not loaded");
    }
    plateFontReady = true;
    return true;
  } catch {
    plateFontReady = false;
    return false;
  }
}

export function paintRSYellow(
  ctx: PaintCtx,
  text: string,
  x: number,
  y: number,
  size: number,
  color = RS_YELLOW,
) {
  ctx.save();
  ctx.font = `700 ${Math.round(size)}px "RS Chat Bold"`;
  ctx.textBaseline = "top";
  ctx.imageSmoothingEnabled = false;
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, size * 0.1);
  ctx.strokeStyle = "#000";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function paintYellow(
  ctx: PaintCtx,
  x: number,
  y: number,
  text: string,
  color = RS_YELLOW,
  _style = "chat",
) {
  const sizeMatch = ctx.font.match(/(\d+(?:\.\d+)?)px/);
  const size = Math.round(sizeMatch ? Number(sizeMatch[1]) : 16);
  paintRSYellow(ctx, text, Math.round(x), Math.round(y), size, color);
}

function yellowText(
  ctx: PaintCtx,
  text: string,
  x: number,
  y: number,
  size: number,
  _font: string,
  _weight = "700",
  color = RS_YELLOW,
  _style = "chat",
) {
  paintRSYellow(ctx, text, x, y, size, color);
}

function fitYellow(
  ctx: PaintCtx,
  text: string,
  x: number,
  y: number,
  size: number,
  max: number,
  _font: string,
  _weight = "800",
  color = RS_YELLOW,
  style = "chat",
) {
  let next = Math.round(size);
  ctx.font = `700 ${next}px "${FACE}"`;
  while (next > 10 && ctx.measureText(text).width > max) {
    next -= 1;
    ctx.font = `700 ${next}px "${FACE}"`;
  }
  ctx.textBaseline = "top";
  paintYellow(ctx, x, y, text, color, style);
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    const done = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve(img)).catch(() => resolve(img));
      } else resolve(img);
    };
    img.onload = done;
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function typeScale(width: number, height: number) {
  if (width >= 1920 && height >= 1000) return { name: 64, level: 18, pad: 56, top: 48 };
  if (width >= 1920) return { name: 44, level: 14, pad: 48, top: 28 };
  if (width >= 1280 && height >= 700) return { name: 48, level: 16, pad: 40, top: 36 };
  return { name: 42, level: 14, pad: 36, top: 28 };
}

function wrapText(ctx: PaintCtx, text: string, max: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function skillGrid(
  count: number,
  width: number,
  height: number,
  place: "name" | "bottom" | "top",
  skillX: number | null,
  skillY: number | null,
  showRules: boolean,
  iconSize?: number,
  withLevels = true,
) {
  const icon = Math.max(16, Math.min(96, Math.round(iconSize ?? height * 0.06)));
  const type = Math.max(10, Math.round(icon * 0.58));
  const labelW = withLevels ? Math.round(type * 2.2) : 0;
  const gapX = Math.max(8, Math.round(icon * 0.28));
  const gapY = Math.max(8, Math.round(icon * 0.32));
  const cellW = icon + labelW + gapX;
  const cellH = icon + gapY;
  const photoW = showRules ? width * 0.62 : width;
  const usable = Math.max(cellW, photoW - 24);
  const cols = Math.max(1, Math.min(count || 1, Math.floor(usable / cellW)));
  const rows = Math.max(1, Math.ceil(Math.max(1, count) / cols));
  const blockW = cols * cellW - gapX;
  const left = Math.round(48 * (width / 1200));
  let originX = place === "name" ? left : Math.max(12, Math.round((photoW - blockW) / 2));
  let originY = 16;
  if (place === "name") originY = Math.round(height * 0.28);
  if (place === "bottom") originY = Math.max(16, height - rows * cellH - 16);
  if (skillX != null) originX = Math.max(8, Math.min(skillX, width - blockW - 8));
  if (skillY != null) originY = Math.max(8, Math.min(skillY, height - rows * cellH - 8));
  return { originX, originY, cellW, cellH, icon, cols, labelW, rows };
}

type HitBox = { id: string; x: number; y: number; w: number; h: number };

function drawIdentityPlate(
  ctx: PaintCtx,
  options: {
    streamer: string;
    clan: string;
    handle: string;
    tagline: string;
    world: string;
    maxed: boolean;
    mode: string;
    focus: string;
    style: string;
    cape: string;
    discord: string;
    grind: string;
    learners: boolean;
    layout?: Layout;
    vosLine?: string;
    textColor?: string;
    textPos: Record<string, { x: number; y: number }>;
    textScale?: Record<string, number>;
    width: number;
    height: number;
    fontId?: string;
    edition?: string;
    caps?: boolean;
  },
  textMax: number,
  height: number,
  font: string,
  boxes: HitBox[],
  weight: string,
  inkStyle: string,
) {
  const plateFont = `"${FACE}"`;
  const color = options.textColor || RS_YELLOW;
  const chip = typeScale(options.width, options.height);
  const lines: { id: string; text: string; size: number }[] = [];
  const name = sanitizeDisplayName(options.streamer);
  const clan = sanitizeClan(options.clan);
  const handle = sanitizeHandle(options.handle);
  const tagline = sanitizeTagline(options.tagline);
  const discord = sanitizeDiscord(options.discord);
  const grind = sanitizeGrind(options.grind);
  const world = worldLabel(sanitizeWorld(options.world));
  const cap = (s: string) => (options.caps ? s.toUpperCase() : s);
  if (name && name !== "Player" && name !== "Optional") {
    lines.push({ id: "streamer", text: cap(name), size: chip.name });
  }
  if (clan) lines.push({ id: "clan", text: cap(clan), size: Math.round(chip.name * 0.42) });
  if (handle) lines.push({ id: "handle", text: cap(handle), size: Math.round(chip.name * 0.36) });
  if (tagline) {
    ctx.font = `700 13px ${plateFont}`;
    const wrapped = wrapText(ctx, tagline, textMax).slice(0, 2);
    if (wrapText(ctx, tagline, textMax).length > 2 && wrapped[1]) {
      wrapped[1] = `${wrapped[1].replace(/…$/, "")}…`;
    }
    wrapped.forEach((text, i) => {
      lines.push({ id: i ? `tagline-${i}` : "tagline", text: cap(text), size: 13 });
    });
  }
  const extras = [
    world,
    grind,
    options.maxed ? "Maxed" : "",
    options.mode,
    options.focus,
    options.style,
    options.cape,
    discord,
    options.learners ? "Learners welcome" : "",
  ].filter((item) => item && item !== "Not shown");
  extras.forEach((text, i) => lines.push({ id: `extra-${i}`, text: cap(text), size: 12 }));
  const layout: Layout = options.layout ?? "banner";
  ctx.textAlign = layout === "title-card" ? "center" : "left";
  let y =
    layout === "lower-third"
      ? Math.round(height * 0.74)
      : layout === "title-card"
        ? Math.round(height * 0.42)
        : chip.top;
  for (const line of lines) {
    const scale = Math.min(2, Math.max(0.75, options.textScale?.[line.id] ?? 1));
    const size = Math.max(8, Math.round(line.size * scale));
    const pos = options.textPos[line.id];
    const inset = chip.pad;
    const x = pos ? pos.x + 4 : layout === "title-card" ? Math.round(options.width / 2) : inset;
    const yy = pos ? pos.y + size : y;
    ctx.font = `700 ${size}px ${plateFont}`;
    fitYellow(ctx, line.text, x, yy, size, textMax, plateFont, "800", color, "chat");
    boxes.push({ id: line.id, x: x - 4, y: yy - size, w: textMax, h: size + 8 });
    y = yy + size + 8;
  }
  return y;
}

export function drawBanner(
  ctx: PaintCtx,
  scene: CanvasImageSource,
  options: {
    showRules: boolean;
    streamer: string;
    clan: string;
    handle: string;
    tagline: string;
    god: string;
    world: string;
    maxed: boolean;
    mode: string;
    focus: string;
    style: string;
    cape: string;
    discord: string;
    grind: string;
    learners: boolean;
    layout?: Layout;
    vosLine?: string;
    showSafeZones?: boolean;
    safeZone?: SafeZone;
    showGod?: boolean;
    edition: string;
    fontId?: string;
    textColor?: string;
    skybox?: "nightstone" | "aura";
    rulesTitle: string;
    honourHead: string;
    honourBody: string;
    respectHead: string;
    respectBody: string;
    securityHead: string;
    securityBody: string;
    width: number;
    height: number;
    skillIcons: {
      id: string;
      img: CanvasImageSource;
      level: string;
      x?: number;
      y?: number;
      size?: number;
      scale?: number;
    }[];
    skillX: number | null;
    skillY: number | null;
    skillPlace: "name" | "bottom" | "top";
    skillSize?: number;
    textPos: Record<string, { x: number; y: number }>;
    textScale?: Record<string, number>;
    watermark?: CanvasImageSource;
    onSkillBoxes?: (boxes: HitBox[]) => void;
    caps?: boolean;
    overlayOnly?: boolean;
  },
) {
  const { width, height } = options;
  const font = `"${FACE}"`;
  if ("letterSpacing" in ctx) {
    (ctx as CanvasRenderingContext2D).letterSpacing = "0.04em";
  }
  const inkStyle = options.fontId === "bold" ? "bold" : options.fontId === "quill" ? "quill" : "chat";
  const weight = inkStyle === "bold" ? "800" : "600";
  if (options.overlayOnly) {
    ctx.clearRect(0, 0, width, height);
  } else {
  ctx.fillStyle = "#100e0c";
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const src = scene as { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number };
  const sw = Math.max(1, src.naturalWidth ?? src.width ?? width);
  const sh = Math.max(1, src.naturalHeight ?? src.height ?? height);
  const srcRatio = sw / sh;
  const dstRatio = width / Math.max(1, height);
  let sx = 0;
  let sy = 0;
  let tw = sw;
  let th = sh;
  if (srcRatio > dstRatio) {
    tw = sh * dstRatio;
    sx = (sw - tw) / 2;
  } else {
    th = sw / dstRatio;
    sy = (sh - th) / 2;
  }
  ctx.drawImage(scene, sx, sy, tw, th, 0, 0, width, height);
  ctx.imageSmoothingEnabled = options.edition !== "OSRS";
  const fade = ctx.createLinearGradient(0, 0, 0, height);
  fade.addColorStop(0, "rgba(0,0,0,0.25)");
  fade.addColorStop(0.55, "rgba(0,0,0,0)");
  fade.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, width, height);
  }

  const boardW = Math.round(width * 0.34);
  const boardLeft = width - boardW - 16;
  if (options.showRules) {
    const bx = boardLeft;
    const by = 16;
    const bw = boardW;
    const bh = height - 32;
    ctx.fillStyle = "#5a3a1c";
    ctx.fillRect(bx - 6, by - 6, bw + 12, bh + 12);
    ctx.fillStyle = "#d4b07a";
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = "#efe0c4";
    ctx.fillRect(bx + 8, by + 8, bw - 16, bh - 16);
    ctx.textAlign = "center";
    const title = options.rulesTitle.trim() || RULES.title;
    ctx.fillStyle = "#3a2410";
    ctx.font = `700 16px ${font}`;
    wrapText(ctx, title, bw - 28).forEach((line, i) => {
      ctx.fillText(line, bx + bw / 2, by + 36 + i * 18);
    });
    const blocks = [
      [options.honourHead || RULES.sections[0].heading, options.honourBody || RULES.sections[0].body],
      [options.respectHead || RULES.sections[1].heading, options.respectBody || RULES.sections[1].body],
      [options.securityHead || RULES.sections[2].heading, options.securityBody || RULES.sections[2].body],
    ];
    ctx.textAlign = "left";
    let ty = by + 78;
    for (const [head, body] of blocks) {
      ctx.fillStyle = "#3a2410";
      ctx.font = `700 13px ${font}`;
      ctx.fillText(head, bx + 18, ty);
      ctx.font = `600 11px ${font}`;
      const lines = wrapText(ctx, body, bw - 36);
      lines.forEach((line, i) => ctx.fillText(line, bx + 18, ty + 16 + i * 14));
      ty += 28 + lines.length * 14;
    }
  }

  if (options.watermark) {
    const mark = options.watermark as { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number };
    const mw = mark.naturalWidth ?? mark.width ?? 80;
    const mh = mark.naturalHeight ?? mark.height ?? 24;
    const maxW = Math.max(48, (options.showRules ? boardLeft : width) * 0.2);
    const maxH = Math.max(18, height * 0.08);
    const scale = Math.min(maxW / Math.max(1, mw), maxH / Math.max(1, mh));
    const dw = mw * scale;
    const dh = mh * scale;
    const pad = Math.max(12, height * 0.04);
    const dx = (options.showRules ? boardLeft : width) - pad - dw;
    const dy = height - pad - dh;
    ctx.globalAlpha = 0.88;
    ctx.drawImage(options.watermark, dx, dy, dw, dh);
    ctx.globalAlpha = 1;
  }

  const boxes: HitBox[] = [];
  const inset = Math.round(48 * (width / 1200));
  const textMax = Math.max(
    180,
    Math.min(Math.round(width * 0.33), (options.showRules ? boardLeft : width) - inset * 2),
  );
  drawIdentityPlate(ctx, options, textMax, height, font, boxes, weight, inkStyle);

  if (options.skillIcons.length) {
    const count = options.skillIcons.length;
    const grid = skillGrid(
      count,
      width,
      height,
      options.skillPlace,
      options.skillX,
      options.skillY,
      options.showRules,
      options.skillSize,
    );
    ctx.textAlign = "left";
    const lastCount = count % grid.cols || grid.cols;
    options.skillIcons.forEach((slot, i) => {
      const col = i % grid.cols;
      const row = Math.floor(i / grid.cols);
      const icon = Math.max(12, Math.round((slot.size ?? grid.icon) * (slot.scale ?? 1)));
      const onLast = row === grid.rows - 1 && lastCount < grid.cols;
      const rowShift = onLast
        ? Math.round(((grid.cols - lastCount) * grid.cellW) / 2)
        : 0;
      let px = grid.originX + rowShift + col * grid.cellW;
      let py = grid.originY + row * grid.cellH;
      if (slot.x != null && slot.y != null) {
        px = Math.max(0, Math.min(slot.x, width - icon));
        py = Math.max(0, Math.min(slot.y, height - icon));
      }
      ctx.drawImage(slot.img, px, py, icon, icon);
      const label = slot.level.trim();
      if (label) {
        const chip = typeScale(width, height);
        const scale = slot.scale ?? 1;
        ctx.save();
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `700 ${Math.max(10, Math.round(chip.level * scale))}px "${FACE}"`;
        paintYellow(ctx, px + icon + 2, py + icon / 2, label, options.textColor || RS_YELLOW);
        ctx.restore();
      }
      boxes.push({
        id: slot.id,
        x: px,
        y: py,
        w: icon,
        h: icon,
      });
    });
  }

  if (options.showSafeZones && options.safeZone && options.safeZone !== "none") {
    drawSafeZoneGhosts(ctx, width, height, options.safeZone);
  }
  options.onSkillBoxes?.(boxes);
}
