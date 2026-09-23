import { BANNER_SIZES, LOCATIONS, migrateBannerSizeId } from "@/lib/locations";
import { MARKS } from "@/lib/marks";
import { SKILLS } from "@/lib/skills";
import { drawBanner, ensurePlateFont, loadImage } from "@/lib/draw-banner";
import { bannerFitLay } from "@/edit/clip-math";
import { loadClipBanner } from "./clip-banner";
import { readDesk } from "./store";

export type DeskBannerStill = {
  bitmap: CanvasImageSource;
  w: number;
  h: number;
};

const CATALOG = [...SKILLS, ...MARKS];

function stampSrc(id: string, game?: "OSRS" | "RS3") {
  if (game) {
    const hit = CATALOG.find((item) => item.id === id && item.editions.includes(game));
    if (hit) return hit.src;
  }
  return CATALOG.find((item) => item.id === id)?.src ?? "";
}

function plateSize(sizeId?: string) {
  const id = migrateBannerSizeId(sizeId);
  return BANNER_SIZES.find((row) => row.id === id) ?? BANNER_SIZES[0];
}

export function bannerStrip(
  frameW: number,
  frameH: number,
  imgW: number,
  imgH: number,
  pos: "top" | "lower",
) {
  const lay = bannerFitLay(frameW, frameH, imgW, imgH, pos);
  return {
    x: Math.round(lay.x * frameW),
    y: Math.round(lay.y * frameH),
    w: Math.max(1, Math.round(lay.w * frameW)),
    h: Math.max(1, Math.round(lay.h * frameH)),
  };
}

export type BannerLayout = { x: number; y: number; w: number; h: number };

export function layoutFromStrip(
  frameW: number,
  frameH: number,
  imgW: number,
  imgH: number,
  pos: "top" | "lower",
): BannerLayout {
  return bannerFitLay(frameW, frameH, imgW, imgH, pos);
}

export function clampBannerLayout(lay: BannerLayout): BannerLayout {
  const w = Math.min(1, Math.max(0.12, lay.w));
  const h = Math.min(1, Math.max(0.06, lay.h));
  return {
    w,
    h,
    x: Math.min(1 - w, Math.max(0, lay.x)),
    y: Math.min(1 - h, Math.max(0, lay.y)),
  };
}

export async function renderDeskBanner(): Promise<DeskBannerStill | null> {
  if (typeof document === "undefined") return null;
  const pin = await loadClipBanner();
  if (pin) {
    const href = URL.createObjectURL(pin.blob);
    try {
      const img = await loadImage(href);
      return { bitmap: img, w: pin.w || img.naturalWidth || 1200, h: pin.h || img.naturalHeight || 480 };
    } catch {
      try {
        const bitmap = await createImageBitmap(pin.blob);
        return { bitmap, w: pin.w, h: pin.h };
      } catch {
        return null;
      }
    }
  }
  const saved = readDesk();
  const plate = plateSize(saved.sizeId);
  const loc = LOCATIONS.find((item) => item.id === saved.locationId);
  const stillSrc =
    saved.stillSrc ||
    (loc ? (saved.view === "b" && loc.viewB ? loc.viewB : loc.viewA) : "") ||
    "/Falador.jpg";
  const picks = saved.skillPicks ?? [];
  const hasName = Boolean((saved.streamer ?? "").trim());
  if (!stillSrc && !hasName && !picks.length) return null;
  await ensurePlateFont();
  let still: HTMLImageElement;
  try {
    still = await loadImage(stillSrc);
  } catch {
    still = await loadImage("/Falador.jpg");
  }
  const icons = (
    await Promise.all(
      picks.map(async (pick) => {
        const src = stampSrc(pick.id, pick.game);
        if (!src) return null;
        try {
          const img = await loadImage(src);
          return {
            id: pick.id,
            img,
            level: pick.level ?? "",
            x: pick.x,
            y: pick.y,
            size: pick.size ?? saved.skillSize ?? 40,
            scale: pick.scale ?? 1,
          };
        } catch {
          return null;
        }
      }),
    )
  ).filter((row): row is NonNullable<typeof row> => Boolean(row));
  const canvas = document.createElement("canvas");
  canvas.width = plate.width;
  canvas.height = plate.height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  drawBanner(ctx, still, {
    showRules: false,
    streamer: saved.streamer ?? "",
    clan: saved.clan ?? "",
    handle: saved.handle ?? "",
    tagline: saved.tagline ?? "",
    god: "",
    world: saved.world ?? "",
    maxed: false,
    mode: "",
    focus: "",
    style: "",
    cape: "",
    discord: saved.discord ?? "",
    grind: saved.grind ?? "",
    learners: false,
    layout: "banner",
    vosLine: "",
    showSafeZones: false,
    safeZone: "none",
    showGod: false,
    edition: saved.edition === "RS3" ? "RS3" : "OSRS",
    caps: false,
    textColor: "#ffff00",
    rulesTitle: "",
    honourHead: "",
    honourBody: "",
    respectHead: "",
    respectBody: "",
    securityHead: "",
    securityBody: "",
    width: plate.width,
    height: plate.height,
    skillIcons: icons,
    skillX: null,
    skillY: null,
    skillPlace: "name",
    skillSize: saved.skillSize ?? 40,
    textPos: {},
    textScale: saved.textScale,
    onSkillBoxes: () => undefined,
  });
  try {
    const bitmap = await createImageBitmap(canvas);
    return { bitmap, w: plate.width, h: plate.height };
  } catch {
    return { bitmap: canvas, w: plate.width, h: plate.height };
  }
}
