import { drawBanner, TEXT_HD } from "./draw-banner";
import { IMAGE_COMPRESS } from "./image-compress";

export type BannerJob = {
  id: number;
  sceneSrc: string;
  sceneBytes?: ArrayBuffer;
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
  showGod: boolean;
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
  skills: { id: string; src: string; level: string; x?: number; y?: number; size?: number; scale?: number }[];
  skillX: number | null;
  skillY: number | null;
  skillPlace: "name" | "bottom" | "top";
  skillSize?: number;
  textPos: Record<string, { x: number; y: number }>;
  layout?: "banner" | "lower-third" | "title-card";
  vosLine?: string;
  showSafeZones?: boolean;
  safeZone?: "none" | "twitch" | "youtube" | "discord";
};

type In =
  | { type: "init"; canvas: OffscreenCanvas; origin?: string }
  | { type: "export"; id: number }
  | ({ type: "paint" } & BannerJob);

const bitmaps = new Map<string, ImageBitmap>();
let view: OffscreenCanvas | null = null;
let latest = 0;
let pageOrigin = "";
let facesReady: Promise<void> | null = null;

async function loadFaces() {
  if (facesReady) return facesReady;
  facesReady = (async () => {
    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Fondamento&family=MedievalSharp&display=swap",
        { headers: { Accept: "text/css" } },
      ).then((res) => res.text());
      const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(
        (row) => row[1],
      );
      const names = ["Cinzel", "Cinzel", "Fondamento", "MedievalSharp"];
      await Promise.all(
        urls.slice(0, 4).map(async (src, i) => {
          const face = new FontFace(names[i] ?? "Cinzel", `url(${src})`);
          const loaded = await face.load();
          (self as unknown as { fonts: FontFaceSet }).fonts.add(loaded);
        }),
      );
    } catch {
      facesReady = Promise.resolve();
    }
  })();
  return facesReady;
}

function resolveSrc(src: string) {
  if (src.startsWith("blob:")) return src;
  if (src.startsWith("/") && !src.startsWith("//")) {
    const base = pageOrigin || self.location.origin;
    try {
      return new URL(src, base).href;
    } catch {
      return "";
    }
  }
  if (/^https?:/i.test(src)) return src;
  return "";
}

async function bitmap(src: string) {
  const url = resolveSrc(src);
  if (!url) throw new Error("src");
  const hit = bitmaps.get(url);
  if (hit) return hit;
  const res = await fetch(url);
  if (!res.ok) throw new Error(url);
  const blob = await res.blob();
  let next = await createImageBitmap(blob, { imageOrientation: "from-image" });
  const max = 1920;
  const edge = Math.max(next.width, next.height);
  if (!url.startsWith("blob:") && edge > max) {
    const scale = max / edge;
    const resized = await createImageBitmap(next, {
      resizeWidth: Math.round(next.width * scale),
      resizeHeight: Math.round(next.height * scale),
      resizeQuality: "high",
    });
    next.close();
    next = resized;
  }
  if (bitmaps.size > 48) {
    const first = bitmaps.keys().next().value;
    if (first) {
      bitmaps.get(first)?.close();
      bitmaps.delete(first);
    }
  }
  bitmaps.set(url, next);
  return next;
}

self.onmessage = async (event: MessageEvent<In>) => {
  const data = event.data;
  if (data.type === "init") {
    view = data.canvas;
    if (data.origin) pageOrigin = data.origin;
    return;
  }
  if (data.type === "export") {
    if (!view) {
      self.postMessage({ type: "export", id: data.id, ok: false });
      return;
    }
    const blob = await view.convertToBlob({
      type: IMAGE_COMPRESS.type,
      quality: IMAGE_COMPRESS.downloadQuality,
    });
    self.postMessage({ type: "export", id: data.id, ok: true, blob });
    return;
  }
  const job = data;
  latest = job.id;
  try {
    if (!view) view = new OffscreenCanvas(job.width, job.height);
    if (view.width !== job.width) view.width = job.width;
    if (view.height !== job.height) view.height = job.height;
    const ctx = view.getContext("2d");
    if (!ctx) throw new Error("no context");
    await loadFaces();
    const scene = job.sceneBytes
      ? await createImageBitmap(new Blob([job.sceneBytes]))
      : await bitmap(job.sceneSrc);
    if (latest !== job.id) return;
    const icons = await Promise.all(
      job.skills.map(async (skill) => ({
        id: skill.id,
        img: await bitmap(skill.src),
        level: skill.level,
        x: skill.x,
        y: skill.y,
        size: skill.size,
      })),
    );
    if (latest !== job.id) return;
    let boxes: { id: string; x: number; y: number; w: number; h: number }[] = [];
    const hi = new OffscreenCanvas(job.width * TEXT_HD, job.height * TEXT_HD);
    const hiCtx = hi.getContext("2d");
    if (!hiCtx) throw new Error("no context");
    hiCtx.imageSmoothingEnabled = true;
    hiCtx.imageSmoothingQuality = "high";
    const scaled = {
      ...job,
      width: job.width * TEXT_HD,
      height: job.height * TEXT_HD,
      skillX: job.skillX != null ? job.skillX * TEXT_HD : null,
      skillY: job.skillY != null ? job.skillY * TEXT_HD : null,
      textPos: Object.fromEntries(
        Object.entries(job.textPos).map(([key, pos]) => [
          key,
          { x: pos.x * TEXT_HD, y: pos.y * TEXT_HD },
        ]),
      ),
      skills: job.skills.map((skill) => ({
        ...skill,
        x: skill.x != null ? skill.x * TEXT_HD : undefined,
        y: skill.y != null ? skill.y * TEXT_HD : undefined,
        size: skill.size != null ? skill.size * TEXT_HD : undefined,
      })),
    };
    drawBanner(hiCtx, scene, {
      ...scaled,
      skillSize: job.skillSize != null ? job.skillSize * TEXT_HD : undefined,
      skillIcons: icons.map((icon) => ({
        ...icon,
        x: icon.x != null ? icon.x * TEXT_HD : undefined,
        y: icon.y != null ? icon.y * TEXT_HD : undefined,
        size: icon.size != null ? icon.size * TEXT_HD : undefined,
      })),
      onSkillBoxes: (next) => {
        boxes = next.map((box) => ({
          ...box,
          x: box.x / TEXT_HD,
          y: box.y / TEXT_HD,
          w: box.w / TEXT_HD,
          h: box.h / TEXT_HD,
        }));
      },
    });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, view.width, view.height);
    ctx.drawImage(hi, 0, 0, view.width, view.height);
    self.postMessage({ type: "paint", id: job.id, ok: true, boxes });
  } catch (err) {
    self.postMessage({
      type: "paint",
      id: job.id,
      ok: false,
      error: err instanceof Error ? err.message : "compose failed",
    });
  }
};
