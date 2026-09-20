import { useEffect, useRef, useState, type PointerEvent as PtrEvent } from "react";
import { readDesk } from "@/desk/store";
import { CLIP_BANNER_EVENT, CLIP_BANNER_LS, saveClipBanner } from "@/desk/clip-banner";
import { layoutFromStrip, renderDeskBanner, type BannerLayout } from "@/desk/render-banner";
import { sanitizeClan, sanitizeDisplayName, sanitizeWorld, worldLabel } from "@/lib/rsText";
import { drawSafeZoneGhosts, type SafeZone } from "@/lib/bannerFeatures";
import { paintRSYellow } from "@/lib/draw-banner";
import { attachSound, detachSound, setMute, setGain, setFade, armFades, soundTracks, setLiveMul, sound } from "./clipSound";
import { canEncodeMp4 } from "./encode-mp4";
import { canWebCodecs, encodeClip } from "./webcodecsExport";
import { exportMp4 } from "./muxExport";
import { hwNote } from "./hwEncode";
import { drawHi, pickRecorderMime, qualityForSize } from "./quality";
import { IMAGE_COMPRESS } from "@/lib/image-compress";
import {
  CLIP_ASPECTS,
  CLIP_MARKS,
  CLIP_MAX_BYTES,
  CLIP_WARN_SECONDS,
  clipFileName,
  clipMime,
  clipSnapFps,
  clampRange,
  coverRect,
  fitStillLayout,
  formatBytes,
  frameStep,
  peakDb,
  loadEditPrefs,
  nextMarkerTime,
  normalizeGainPct,
  orderInOut,
  prevMarkerTime,
  releaseVideo,
  saveEditPrefs,
  snapTime,
  snapToPoints,
  timecode,
  type ClipAspect,
  type StillShape,
  scalePlateLay,
  plateHandleHit,
  resizePlateLay,
  bannerFitLay,
  type PlateHandle,
  type PlateLay,
} from "./clip-prefs";

type OverlayPos = "off" | "top" | "lower";

const CHIP =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-line/40 bg-surface px-3 text-[11px] text-parchment disabled:opacity-40";
const CHIP_ON =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-parchment bg-surface px-3 text-[11px] text-parchment";

export function ClipBench() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const stillFileRef = useRef<HTMLInputElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const bannerUrl = useRef<string | null>(null);
  const bannerImg = useRef<CanvasImageSource | null>(null);
  const bannerNat = useRef({ w: 1200, h: 480 });
  const bannerLay = useRef<BannerLayout | null>(null);
  const bannerDrag = useRef<{
    id: number;
    ox: number;
    oy: number;
    x: number;
    y: number;
    kind: "banner" | "still";
    handle: PlateHandle;
  } | null>(null);
  const stillUrl = useRef<string | null>(null);
  const stillImg = useRef<CanvasImageSource | null>(null);
  const stillNat = useRef({ w: 1200, h: 720 });
  const stillLay = useRef<BannerLayout | null>(null);
  const loopLatch = useRef(false);
  const lastVid = useRef<HTMLCanvasElement | null>(null);
  const plateSel = useRef<"banner" | "still" | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ dist: number; lay: PlateLay; kind: "banner" | "still" } | null>(null);
  const markCache = useRef<Record<string, HTMLImageElement>>({});
  const recorderRef = useRef<MediaRecorder | null>(null);
  const hidden = useRef(false);
  const holdRef = useRef<number | null>(null);
  const lastUi = useRef(0);
  const tlRef = useRef<HTMLDivElement | null>(null);
  const tlDrag = useRef<"play" | "in" | "out" | null>(null);
  const exportingRef = useRef(false);
  const actions = useRef({
    togglePlay: () => {},
    seek: (_t: number) => {},
    markIn: () => {},
    markOut: () => {},
    undo: () => {},
    redo: () => {},
    dropMarker: () => {},
    goIn: () => {},
    goOut: () => {},
    jumpMarker: (_dir: 1 | -1) => {},
  });

  const [status, setStatus] = useState("Drop a clip you own, or upload one.");
  const [fileLabel, setFileLabel] = useState("");
  const [native, setNative] = useState("");
  const [duration, setDuration] = useState(0);
  const [now, setNow] = useState(0);
  const [inPoint, setInPoint] = useState(0);
  const [outPoint, setOutPoint] = useState(0);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [aspect, setAspect] = useState<ClipAspect>(() => loadEditPrefs().aspect ?? "9x16");
  const [overlay, setOverlay] = useState<OverlayPos>("off");
  const [ghost, setGhost] = useState<SafeZone>("none");
  const [edition, setEdition] = useState<"OSRS" | "RS3">("OSRS");
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [world, setWorld] = useState("");
  const [markId, setMarkId] = useState("none");
  const [ltOn, setLtOn] = useState(false);
  const [ltText, setLtText] = useState("");
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [canShareFile, setCanShareFile] = useState(false);
  const [snapOn, setSnapOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [markers, setMarkers] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [hasClip, setHasClip] = useState(false);
  const [fps, setFps] = useState(30);
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [volume, setVolume] = useState(1);
  const [gainPct, setGainPct] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [peak, setPeak] = useState(0);
  const [hold, setHold] = useState(0);
  const [exportPct, setExportPct] = useState(0);
  const [fileBytes, setFileBytes] = useState(0);
  const [hasStill, setHasStill] = useState(false);
  const [stillShape, setStillShape] = useState<StillShape>("native");
  const stillShapeRef = useRef<StillShape>("native");
  stillShapeRef.current = stillShape;
  const [ready, setReady] = useState<"empty" | "loading" | "ready" | "bad">("empty");
  const [hasAudio, setHasAudio] = useState(false);
  const undoRef = useRef<{ inPoint: number; outPoint: number; aspect: ClipAspect; overlay: OverlayPos; muted: boolean }[]>([]);
  const redoRef = useRef<typeof undoRef.current>([]);

  const paintArgs = useRef({
    overlay,
    inPoint,
    outPoint,
    ghost,
    fadeIn,
    fadeOut,
    speed,
    fps,
    now,
    rotate,
    zoom,
    opacity,
    markId,
    loop,
    aspect,
    ltOn,
    ltText,
  });
  paintArgs.current = {
    overlay,
    inPoint,
    outPoint,
    ghost,
    fadeIn,
    fadeOut,
    speed,
    fps,
    now,
    rotate,
    zoom,
    opacity,
    markId,
    loop,
    aspect,
    ltOn,
    ltText,
  };

  const size = CLIP_ASPECTS[aspect];
  const range = Math.max(0, outPoint - inPoint);

  function pushUndo() {
    undoRef.current = [...undoRef.current.slice(-19), { inPoint, outPoint, aspect, overlay, muted }];
    redoRef.current = [];
  }

  function applySnap(next: { inPoint: number; outPoint: number; aspect: ClipAspect; overlay: OverlayPos; muted: boolean }) {
    setInPoint(next.inPoint);
    setOutPoint(next.outPoint);
    setAspect(next.aspect);
    setOverlay(next.overlay);
    setMuted(next.muted);
  }

  useEffect(() => {
    const saved = readDesk();
    if (saved.edition === "RS3" || saved.edition === "OSRS") setEdition(saved.edition);
    setName(sanitizeDisplayName(saved.streamer ?? ""));
    setClan(sanitizeClan(saved.clan ?? ""));
    let stop = false;
    const pinLive = async () => {
      if (exportingRef.current) return;
      const painted = await renderDeskBanner();
      if (stop || !painted || exportingRef.current) return;
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
      }
      bannerImg.current = painted.bitmap;
      bannerNat.current = { w: painted.w, h: painted.h };
      setOverlay((cur) => {
        const next = cur === "off" ? "lower" : cur;
        if (!bannerLay.current) snapBanner(next === "top" ? "top" : "lower");
        return next;
      });
    };
    void pinLive();
    const onPin = () => void pinLive();
    const onStore = (e: StorageEvent) => {
      if (e.key === CLIP_BANNER_LS) void pinLive();
    };
    const onVis = () => {
      if (document.visibilityState === "visible") void pinLive();
    };
    let bus: BroadcastChannel | null = null;
    try {
      bus = new BroadcastChannel(CLIP_BANNER_EVENT);
      bus.onmessage = onPin;
    } catch {
      bus = null;
    }
    window.addEventListener(CLIP_BANNER_EVENT, onPin);
    window.addEventListener("storage", onStore);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop = true;
      window.removeEventListener(CLIP_BANNER_EVENT, onPin);
      window.removeEventListener("storage", onStore);
      document.removeEventListener("visibilitychange", onVis);
      bus?.close();
      releaseVideo(videoRef.current, objectUrl.current);
      objectUrl.current = null;
      if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
      bannerUrl.current = null;
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
      }
      if (stillUrl.current) URL.revokeObjectURL(stillUrl.current);
      stillUrl.current = null;
      const still = stillImg.current;
      if (still && "close" in still && typeof (still as ImageBitmap).close === "function") {
        (still as ImageBitmap).close();
      }
      detachSound();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = speed;
      video.muted = false;
    }
    setMute(muted);
    setGain(Math.max(0, Math.min(2, gainPct / 100)));
    setFade(fadeIn > 0 ? 0.5 : 0, fadeOut > 0 ? 0.5 : 0);
    applyLiveGain(video?.currentTime ?? now);
  }, [muted, gainPct, speed, fadeIn, fadeOut, inPoint, outPoint, fps]);

  useEffect(() => {
    if (!busy) return;
    const onLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [busy]);

  useEffect(() => {
    for (const mark of CLIP_MARKS) {
      if (!mark.src || markCache.current[mark.src]) continue;
      const img = new Image();
      img.onload = () => {
        markCache.current[mark.src] = img;
      };
      img.src = mark.src;
    }
  }, []);

  useEffect(() => {
    const onVis = () => {
      hidden.current = document.hidden;
      if (document.hidden) videoRef.current?.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  function previewSize(exportW: number, exportH: number) {
    const cap = 960;
    const scale = Math.min(1, cap / Math.max(exportW, exportH));
    return {
      w: Math.max(320, Math.round(exportW * scale)),
      h: Math.max(180, Math.round(exportH * scale)),
    };
  }

  function paint(
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement | null,
    ghosts: boolean,
    w = size.w,
    h = size.h,
    forFile = false,
    skipOverlay = false,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = paintArgs.current;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    const videoReady = Boolean(video && video.readyState >= 2 && video.videoWidth);
    if (videoReady && video) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((s.rotate * Math.PI) / 180);
      ctx.scale(s.zoom, s.zoom);
      ctx.translate(-w / 2, -h / 2);
      drawHi(ctx, video, w, h);
      ctx.restore();
      if (!forFile) {
        if (!lastVid.current) lastVid.current = document.createElement("canvas");
        const hold = lastVid.current;
        if (hold.width !== w) hold.width = w;
        if (hold.height !== h) hold.height = h;
        hold.getContext("2d")?.drawImage(canvas, 0, 0);
      }
    } else if (lastVid.current && lastVid.current.width) {
      ctx.drawImage(lastVid.current, 0, 0, w, h);
    } else {
      ctx.fillStyle = "#120f0c";
      ctx.fillRect(0, 0, w, h);
    }
    const t = (video?.currentTime || s.now);
    const fadeInSec = (s.fadeIn / Math.max(1, s.fps)) / Math.max(0.25, s.speed);
    const fadeOutSec = (s.fadeOut / Math.max(1, s.fps)) / Math.max(0.25, s.speed);
    let fade = 1;
    if (fadeInSec > 0 && t < s.inPoint + fadeInSec) fade = Math.max(0, (t - s.inPoint) / fadeInSec);
    if (fadeOutSec > 0 && t > s.outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (s.outPoint - t) / fadeOutSec));
    if (fade < 1) {
      ctx.fillStyle = `rgba(0,0,0,${1 - fade})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (!skipOverlay && stillImg.current && stillLay.current) {
      const lay = stillLay.current;
      const dx = lay.x * w;
      const dy = lay.y * h;
      const dw = Math.max(2, lay.w * w);
      const dh = Math.max(2, lay.h * h);
      const natW = stillNat.current.w || 1;
      const natH = stillNat.current.h || 1;
      const shape = stillShapeRef.current;
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (shape === "native") {
        ctx.drawImage(stillImg.current, 0, 0, natW, natH, dx, dy, dw, dh);
      } else {
        const box = coverRect(natW, natH, dw, dh);
        ctx.drawImage(stillImg.current, box.sx, box.sy, box.sw, box.sh, dx, dy, dw, dh);
      }
      ctx.restore();
    }
    if (!skipOverlay && s.overlay !== "off" && bannerImg.current) {
      const nat = bannerNat.current;
      const lay =
        bannerLay.current ??
        layoutFromStrip(w, h, nat.w || 1200, nat.h || 480, s.overlay === "top" ? "top" : "lower");
      const strip = {
        x: lay.x * w,
        y: lay.y * h,
        w: lay.w * w,
        h: lay.h * h,
      };
      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bannerImg.current, strip.x, strip.y, strip.w, strip.h);
      ctx.restore();
    }
    const mark = CLIP_MARKS.find((item) => item.id === s.markId && item.id !== "none");
    if (mark?.src) {
      const img = markCache.current[mark.src];
      if (img) {
        const side = Math.round(h * 0.16);
        ctx.drawImage(img, 28, Math.round(h * 0.68), side, side);
      }
    }
    if (s.ltOn) {
      const line = sanitizeDisplayName(s.ltText || "").slice(0, 24);
      if (line) paintRSYellow(ctx, line, 36, h - Math.round(h * 0.12), Math.max(18, Math.round(h * 0.045)));
    }
    if (!forFile && ghosts && s.ghost !== "none") drawSafeZoneGhosts(ctx, w, h, s.ghost);
    if (!forFile) {
      const drawHandles = (lay: PlateLay) => {
        const hx = lay.x * w;
        const hy = lay.y * h;
        const hw = lay.w * w;
        const hh = lay.h * h;
        ctx.save();
        ctx.strokeStyle = "#c4a35a";
        ctx.lineWidth = 2;
        ctx.strokeRect(hx, hy, hw, hh);
        ctx.fillStyle = "#ffff00";
        const s = 12;
        const hx2 = hx + hw;
        const hy2 = hy + hh;
        const mx = hx + hw / 2;
        const my = hy + hh / 2;
        for (const [cx, cy] of [
          [hx, hy],
          [hx2, hy],
          [hx, hy2],
          [hx2, hy2],
          [mx, hy],
          [mx, hy2],
          [hx, my],
          [hx2, my],
        ] as const) {
          ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
          ctx.strokeStyle = "#120f0c";
          ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
          ctx.strokeStyle = "#c4a35a";
        }
        ctx.restore();
      };
      if (plateSel.current === "still" && stillLay.current) drawHandles(stillLay.current);
      if (plateSel.current === "banner" && bannerLay.current) drawHandles(bannerLay.current);
    }
  }

  useEffect(() => {
    let id = 0;
    let live = true;
    let timer = false;
    const tick = () => {
      if (!live) return;
      if (hidden.current || exportingRef.current) {
        timer = true;
        id = window.setTimeout(tick, hidden.current ? 250 : 100);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const s = paintArgs.current;
      if (canvas) {
        if (video && s.outPoint > s.inPoint && Number.isFinite(video.currentTime)) {
          if (video.currentTime >= s.outPoint - 0.03) {
            if (s.loop) {
              if (!loopLatch.current) {
                loopLatch.current = true;
                try {
                  video.currentTime = s.inPoint;
                } catch {
                  /* ignore */
                }
              }
            } else if (!video.paused) {
              video.pause();
              setPlaying(false);
            }
          } else if (video.currentTime < s.outPoint - 0.12) {
            loopLatch.current = false;
          }
        }
        const preview = previewSize(CLIP_ASPECTS[s.aspect].w, CLIP_ASPECTS[s.aspect].h);
        paint(canvas, video, true, preview.w, preview.h);
        const stamp = performance.now();
        if (stamp - lastUi.current > 80) {
          lastUi.current = stamp;
          const t = video?.currentTime ?? 0;
          setNow(t);
          applyLiveGain(t);
          const level = sound.peak;
          setPeak(level);
          setHold((prev) => (level > prev ? level : prev * 0.92));
        }
      }
      timer = false;
      id = window.requestAnimationFrame(tick);
    };
    tick();
    return () => {
      live = false;
      if (timer) window.clearTimeout(id);
      else window.cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas) return;
    const preview = previewSize(size.w, size.h);
    paint(canvas, video, true, preview.w, preview.h);
  }, [aspect, size.w, size.h, overlay, hasStill, hasClip, stillShape]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const still = stillLay.current && stillImg.current;
      const banner = overlay !== "off" && bannerLay.current;
      if (!still && !banner) return;
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
      const preferStill = plateSel.current === "still" || (!plateSel.current && still);
      const lay = preferStill && still ? stillLay.current! : bannerLay.current;
      if (!lay) return;
      const next = scalePlateLay(lay, factor);
      if (preferStill && still) stillLay.current = next;
      else bannerLay.current = next;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [overlay, hasClip, hasStill]);

  function snapBanner(pos: "top" | "lower") {
    const box = CLIP_ASPECTS[paintArgs.current.aspect];
    const nat = bannerNat.current;
    bannerLay.current = bannerFitLay(box.w, box.h, nat.w || 1200, nat.h || 480, pos);
    plateSel.current = "banner";
  }

  function refitPlates(id: ClipAspect) {
    const box = CLIP_ASPECTS[id];
    const pos = paintArgs.current.overlay === "top" ? "top" : "lower";
    if (paintArgs.current.overlay !== "off" && bannerImg.current) {
      bannerLay.current = bannerFitLay(box.w, box.h, bannerNat.current.w || 1200, bannerNat.current.h || 480, pos);
      plateSel.current = "banner";
    }
    if (stillImg.current) {
      stillLay.current = fitStillLayout(box.w, box.h, stillNat.current.w, stillNat.current.h, stillShapeRef.current, 1);
      if (paintArgs.current.overlay === "off") plateSel.current = "still";
    }
  }

  function applyClipCrop(id: ClipAspect) {
    setAspect(id);
    refitPlates(id);
    const box = CLIP_ASPECTS[id];
    setStatus(`${box.label} · ${box.w}×${box.h}. Plate fitted.`);
  }

  function canvasPoint(e: PtrEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return {
      x: ((e.clientX - r.left) / r.width) * canvas.width,
      y: ((e.clientY - r.top) / r.height) * canvas.height,
      cw: canvas.width,
      ch: canvas.height,
    };
  }

  function onBannerPointerDown(e: PtrEvent<HTMLCanvasElement>) {
    const p = canvasPoint(e);
    if (!p) return;
    pointers.current.set(e.pointerId, { x: p.x, y: p.y });
    if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const stillOn = Boolean(stillImg.current && stillLay.current);
      const kind: "banner" | "still" =
        plateSel.current === "still" && stillOn ? "still" : overlay !== "off" && bannerLay.current ? "banner" : stillOn ? "still" : "banner";
      const lay = kind === "still" ? stillLay.current : bannerLay.current;
      if (lay) pinch.current = { dist: Math.max(8, dist), lay: { ...lay }, kind };
      e.currentTarget.setPointerCapture(e.pointerId);
      return;
    }
    const stillOn = Boolean(stillImg.current && stillLay.current);
    const bannerOn = overlay !== "off" && Boolean(bannerImg.current);
    const tryHit = (kind: "still" | "banner", lay: BannerLayout | null) => {
      if (!lay) return false;
      const handle = plateHandleHit(lay, p.x, p.y, p.cw, p.ch, 32);
      if (!handle) return false;
      plateSel.current = kind;
      e.currentTarget.setPointerCapture(e.pointerId);
      bannerDrag.current = {
        id: e.pointerId,
        ox: p.x - lay.x * p.cw,
        oy: p.y - lay.y * p.ch,
        x: lay.x * p.cw,
        y: lay.y * p.ch,
        kind,
        handle,
      };
      return true;
    };
    if (stillOn && tryHit("still", stillLay.current)) return;
    if (bannerOn) {
      const lay =
        bannerLay.current ??
        layoutFromStrip(p.cw, p.ch, bannerNat.current.w, bannerNat.current.h, overlay === "top" ? "top" : "lower");
      bannerLay.current = lay;
      if (tryHit("banner", lay)) return;
    }
  }

  function onBannerPointerMove(e: PtrEvent<HTMLCanvasElement>) {
    const p = canvasPoint(e);
    if (p) pointers.current.set(e.pointerId, { x: p.x, y: p.y });
    if (pinch.current && pointers.current.size >= 2) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const factor = dist / Math.max(8, pinch.current.dist);
      const next = scalePlateLay(pinch.current.lay, factor);
      if (pinch.current.kind === "still") stillLay.current = next;
      else bannerLay.current = next;
      return;
    }
    const drag = bannerDrag.current;
    if (!drag || drag.id !== e.pointerId) return;
    if (!p) return;
    e.preventDefault();
    const lay = drag.kind === "still" ? stillLay.current : bannerLay.current;
    if (!lay) return;
    const nx = drag.handle === "move" ? (p.x - drag.ox) / p.cw : p.x / p.cw;
    const ny = drag.handle === "move" ? (p.y - drag.oy) / p.ch : p.y / p.ch;
    const next = resizePlateLay(lay, drag.handle, nx, ny);
    if (drag.kind === "still") stillLay.current = next;
    else bannerLay.current = next;
  }

  function onBannerPointerUp(e: PtrEvent<HTMLCanvasElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (bannerDrag.current?.id === e.pointerId) {
      bannerDrag.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already */
      }
    }
  }

  async function loadDeskBanner(pos: OverlayPos = overlay === "off" ? "lower" : overlay) {
    setStatus("Reading the desk…");
    const painted = await renderDeskBanner();
    if (!painted) {
      setStatus("Save for clips on the home desk first.");
      return false;
    }
    const prev = bannerImg.current;
    if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
      (prev as ImageBitmap).close();
    }
    bannerImg.current = painted.bitmap;
    bannerNat.current = { w: painted.w, h: painted.h };
    const next = pos === "off" ? "lower" : pos;
    snapBanner(next);
    setOverlay(next);
    const who = sanitizeDisplayName(readDesk().streamer ?? "") || "desk";
    setStatus(`${who} · ${painted.w}×${painted.h} on the clip.`);
    return true;
  }

  async function placeDeskBanner(pos: "top" | "lower") {
    await loadDeskBanner(pos);
  }

  function closeBitmap(img: CanvasImageSource | null) {
    if (img && "close" in img && typeof (img as ImageBitmap).close === "function") {
      try {
        (img as ImageBitmap).close();
      } catch {
        /* already */
      }
    }
  }

  function clearDeskBanner() {
    setOverlay("off");
    closeBitmap(bannerImg.current);
    bannerImg.current = null;
    bannerLay.current = null;
    if (bannerUrl.current) {
      URL.revokeObjectURL(bannerUrl.current);
      bannerUrl.current = null;
    }
    setStatus("Desk banner off.");
  }

  function clearStill() {
    closeBitmap(stillImg.current);
    stillImg.current = null;
    stillLay.current = null;
    if (stillUrl.current) {
      URL.revokeObjectURL(stillUrl.current);
      stillUrl.current = null;
    }
    setHasStill(false);
    setStatus("Still off.");
  }

  function scaleStill(factor: number) {
    const lay = stillLay.current;
    if (!lay) return;
    stillLay.current = scalePlateLay(lay, factor);
    plateSel.current = "still";
    setStatus("Still scaled.");
  }

  function scaleBanner(factor: number) {
    if (overlay === "off") return;
    const box = CLIP_ASPECTS[paintArgs.current.aspect];
    const nat = bannerNat.current;
    if (!bannerLay.current) {
      bannerLay.current = layoutFromStrip(box.w, box.h, nat.w || 1200, nat.h || 480, overlay === "top" ? "top" : "lower");
    }
    bannerLay.current = scalePlateLay(bannerLay.current, factor);
    plateSel.current = "banner";
    setStatus("Banner scaled.");
  }

  function applyStillShape(next: StillShape) {
    stillShapeRef.current = next;
    setStillShape(next);
    if (!stillImg.current) return;
    stillLay.current = fitStillLayout(size.w, size.h, stillNat.current.w, stillNat.current.h, next, 1);
    setStatus(next === "native" ? "Still keeps its own shape." : `Still ${next.replace("x", ":")}.`);
  }

  function fillStill() {
    if (!stillImg.current) return;
    stillLay.current = { x: 0, y: 0, w: 1, h: 1 };
    setStatus("Still fills the plate.");
  }

  async function takeStillFile(file: File) {
    const ok = (file.type && file.type.indexOf("image/") === 0) || /\.(png|jpe?g|webp)$/i.test(file.name || "");
    if (!ok) {
      setStatus("That file is not a still.");
      return false;
    }
    const href = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("still"));
        img.src = href;
      });
      closeBitmap(stillImg.current);
      if (stillUrl.current) URL.revokeObjectURL(stillUrl.current);
      stillUrl.current = href;
      stillImg.current = img;
      stillNat.current = { w: img.naturalWidth || 1200, h: img.naturalHeight || 720 };
      stillShapeRef.current = "native";
      setStillShape("native");
      stillLay.current = fitStillLayout(size.w, size.h, stillNat.current.w, stillNat.current.h, "native", 1);
      plateSel.current = "still";
      setHasStill(true);
      setStatus("Still on the clip. Drag a corner or edge. Wheel or pinch to scale.");
      return true;
    } catch {
      URL.revokeObjectURL(href);
      setStatus("That still did not load.");
      return false;
    }
  }

  async function takeBannerFile(file: File) {
    const ok = (file.type && file.type.indexOf("image/") === 0) || /\.(png|jpe?g|webp)$/i.test(file.name || "");
    if (!ok) return false;
    const href = URL.createObjectURL(file);
    try {
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("banner"));
        img.src = href;
      });
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
      }
      bannerImg.current = img;
      bannerNat.current = { w: img.naturalWidth || 1200, h: img.naturalHeight || 480 };
      const blob = file.type.startsWith("image/") ? file : await (await fetch(href)).blob();
      await saveClipBanner(blob, bannerNat.current.w, bannerNat.current.h);
      const pos = overlay === "top" ? "top" : "lower";
      snapBanner(pos);
      setOverlay(pos);
      setStatus("Saved plate on the clip.");
      return true;
    } catch {
      setStatus("That still did not load.");
      return false;
    }
  }

  async function holdingCard() {
    const canvas = document.createElement("canvas");
    const w = size.w;
    const h = size.h;
    canvas.width = w;
    canvas.height = h;
    const video = videoRef.current;
    if (video && hasClip) paint(canvas, video, false, w, h);
    else {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#1a1612";
      ctx.fillRect(0, 0, w, h);
      if (bannerImg.current) {
        const box = coverRect(
          (bannerImg.current as ImageBitmap).width || 1200,
          (bannerImg.current as ImageBitmap).height || 480,
          w,
          h,
        );
        ctx.drawImage(bannerImg.current, box.sx, box.sy, box.sw, box.sh, 0, 0, w, h);
      }
      const line = [sanitizeDisplayName(name), sanitizeClan(clan), worldLabel(sanitizeWorld(world))].filter(Boolean).join(" · ");
      if (line) paintRSYellow(ctx, line, 36, h - Math.round(h * 0.12), Math.max(18, Math.round(h * 0.045)));
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, IMAGE_COMPRESS.type, IMAGE_COMPRESS.downloadQuality));
    if (!blob) {
      setStatus("Could not save the still.");
      return;
    }
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `holding-${edition === "OSRS" ? "osrs" : "rs3"}-${w}x${h}.jpg`;
    a.rel = "noopener";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(href), 2500);
    const file = new File([blob], a.download, { type: "image/jpeg" });
    setLastFile(file);
    setCanShareFile(Boolean(navigator.canShare?.({ files: [file] })));
    setStatus(`Saved ${w}×${h} still.`);
  }

  function fadeMul(t: number) {
    const fadeInSec = (fadeIn / Math.max(1, fps)) / Math.max(0.25, speed);
    const fadeOutSec = (fadeOut / Math.max(1, fps)) / Math.max(0.25, speed);
    let fade = 1;
    if (fadeInSec > 0 && t < inPoint + fadeInSec) fade = Math.max(0, (t - inPoint) / fadeInSec);
    if (fadeOutSec > 0 && t > outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (outPoint - t) / fadeOutSec));
    return fade;
  }

  function applyLiveGain(t: number) {
    const mul = muted || speed !== 1 ? 0 : fadeMul(t);
    setLiveMul(mul);
  }

  function hookAudio(video: HTMLVideoElement) {
    attachSound(video);
    setMute(muted);
    setGain(Math.max(0, Math.min(2, gainPct / 100)));
    setFade(fadeIn > 0 ? 0.5 : 0, fadeOut > 0 ? 0.5 : 0);
  }

  function takeVideo(file: File) {
    if (file.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(file.name)) {
      void takeBannerFile(file);
      return;
    }
    const looksVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name);
    if (!looksVideo) {
      setStatus("Could not read that file.");
      return;
    }
    if (file.size > CLIP_MAX_BYTES) {
      setStatus("That file is over 2 GB. Cut it smaller first.");
      return;
    }
    let video = videoRef.current;
    if (!video) {
      video = document.createElement("video");
      video.playsInline = true;
      video.controls = false;
      video.preload = "metadata";
      video.className = "pointer-events-none absolute h-px w-px opacity-0";
      videoRef.current = video;
    }
    releaseVideo(video, objectUrl.current);
    const url = URL.createObjectURL(file);
    objectUrl.current = url;
    setReady("loading");
    setHasClip(false);
    setFileBytes(file.size);
    setPeak(0);
    setHold(0);
    setPlaying(false);
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.src = url;
    video.playsInline = true;
    video.preload = "metadata";
    video.onplay = () => setPlaying(true);
    video.onpause = () => setPlaying(false);
    video.onended = () => setPlaying(false);
    setFileLabel(file.name);
    video.onerror = () => {
      setReady("bad");
      setHasClip(false);
      setStatus("Could not read that file.");
    };
    video.onloadedmetadata = () => {
      const dur = video.duration || 0;
      if (!Number.isFinite(dur) || dur <= 0) {
        setReady("bad");
        setStatus("Could not read that file.");
        return;
      }
      setDuration(dur);
      setInPoint(0);
      setOutPoint(dur);
      setViewStart(0);
      setViewEnd(dur);
      setNow(0);
      setFps(30);
      setMarkers([]);
      setSpeed(1);
      setRotate(0);
      setZoom(1);
      video.playbackRate = 1;
      undoRef.current = [];
      redoRef.current = [];
      setNative(`${video.videoWidth}×${video.videoHeight}`);
      setHasClip(true);
      setReady("ready");
      const tracks = (video as HTMLVideoElement & { audioTracks?: { length: number } }).audioTracks;
      setHasAudio(tracks ? tracks.length > 0 : true);
      video.preload = "auto";
      hookAudio(video);
      void (async () => {
        if (dur > 45) return;
        try {
          await video.play();
          if (typeof video.requestVideoFrameCallback === "function") {
            const times: number[] = [];
            await new Promise<void>((resolve) => {
              const rec = (_n: number, meta: { mediaTime: number }) => {
                if (Number.isFinite(meta.mediaTime)) times.push(meta.mediaTime);
                if (times.length >= 12) {
                  resolve();
                  return;
                }
                video.requestVideoFrameCallback(rec);
              };
              video.requestVideoFrameCallback(rec);
              window.setTimeout(resolve, 400);
            });
            if (times.length >= 6) {
              const dt = (times[times.length - 1] - times[0]) / (times.length - 1);
              if (dt > 0.008 && dt < 0.06) setFps(clipSnapFps(1 / dt));
            }
          }
        } catch {
          /* autoplay blocked */
        }
        video.pause();
      })();
      setStatus(
        dur > CLIP_WARN_SECONDS
          ? `${file.name} · ${timecode(dur)} · long file. Play it through, then mark In / Out for the cut.`
          : `${file.name} · ${timecode(dur)} · ${video.videoWidth}×${video.videoHeight} · ${formatBytes(file.size)}`,
      );
    };
  }

  function openClipPicker() {
    fileRef.current?.click();
  }

  function snapValue(t: number) {
    if (snapOn) return Math.max(0, Math.min(duration || t, Math.round(t)));
    return snapTime(t, fps || 30);
  }

  function seek(next: number) {
    const video = videoRef.current;
    if (!video) return;
    const max = duration || video.duration || 0;
    const t = Math.max(0, Math.min(max, snapValue(next)));
    video.currentTime = t;
    setNow(t);
  }

  function timeFromClientX(clientX: number) {
    const el = tlRef.current;
    if (!el) return now;
    const box = el.getBoundingClientRect();
    const x = box.width <= 0 ? 0 : Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    const vis = Math.max(0.001, (viewEnd || duration) - viewStart);
    return snapValue(viewStart + x * vis);
  }

  function onTlPointerDown(e: PtrEvent<HTMLDivElement>) {
    if (!hasClip || exportingRef.current) return;
    const t = timeFromClientX(e.clientX);
    const vis = Math.max(0.001, (viewEnd || duration) - viewStart);
    const slop = Math.max(vis * 0.018, frameStep(fps) * 6);
    const nearIn = Math.abs(t - inPoint) <= slop;
    const nearOut = Math.abs(t - outPoint) <= slop;
    if (nearIn && (!nearOut || Math.abs(t - inPoint) <= Math.abs(t - outPoint))) {
      tlDrag.current = "in";
      pushUndo();
    } else if (nearOut) {
      tlDrag.current = "out";
      pushUndo();
    } else {
      tlDrag.current = "play";
      seek(t);
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onTlPointerMove(e: PtrEvent<HTMLElement>) {
    if (!tlDrag.current) return;
    const t = timeFromClientX(e.clientX);
    const step = frameStep(fps);
    if (tlDrag.current === "in") {
      setInPoint(clampRange(t, 0, Math.max(0, outPoint - step)));
    } else if (tlDrag.current === "out") {
      setOutPoint(clampRange(t, inPoint + step, duration || outPoint));
    } else seek(t);
  }

  function onTlPointerUp() {
    tlDrag.current = null;
  }

  function dropMarker() {
    setMarkers((cur) => {
      if (cur.length >= 8) return cur;
      const t = snapTime(now, fps);
      if (cur.some((m) => Math.abs(m - t) < 0.05)) return cur;
      return [...cur, t].sort((a, b) => a - b);
    });
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video || !hasClip || exportingRef.current) return;
    if (video.paused || video.ended) {
      if (video.ended || video.currentTime < inPoint || video.currentTime >= outPoint - 0.04) {
        try {
          video.currentTime = inPoint;
        } catch {
          /* ignore */
        }
      }
      attachSound(video);
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function markIn() {
    pushUndo();
    const t = snapTime(now, fps);
    const [a, b] = orderInOut(t, outPoint);
    setInPoint(a);
    setOutPoint(Math.max(a + frameStep(fps), b));
  }

  function markOut() {
    pushUndo();
    const t = snapTime(now, fps);
    const [a, b] = orderInOut(inPoint, t);
    setInPoint(a);
    setOutPoint(Math.max(a + frameStep(fps), b));
  }

  function deleteRegion() {
    pushUndo();
    setInPoint(0);
    setOutPoint(duration);
    setStatus("In and Out cleared.");
  }

  function goIn() {
    seek(inPoint);
  }

  function goOut() {
    seek(outPoint);
  }

  function fitPlate() {
    setZoom(1);
    setRotate(0);
    setStatus("Fit.");
  }

  function copyTc() {
    const line = timecode(now);
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(line).then(
        () => setStatus(`Copied ${line}.`),
        () => setStatus(line),
      );
    } else setStatus(line);
  }

  function normalizePeak() {
    const next = normalizeGainPct(hold || peak, gainPct);
    setGainPct(next);
    setStatus(next === gainPct ? "Quiet." : `Gain ${next}%.`);
  }

  function jumpMarker(dir: 1 | -1) {
    if (!markers.length) return;
    seek(dir > 0 ? nextMarkerTime(now, markers) : prevMarkerTime(now, markers));
  }

  function clearMarkers() {
    setMarkers([]);
  }

  function nudgeIn(dir: number) {
    pushUndo();
    setInPoint(clampRange(inPoint + dir * frameStep(fps), 0, Math.max(0, outPoint - frameStep(fps))));
  }

  function nudgeOut(dir: number) {
    pushUndo();
    setOutPoint(clampRange(outPoint + dir * frameStep(fps), inPoint + frameStep(fps), duration || outPoint));
  }

  function undo() {
    const last = undoRef.current.pop();
    if (!last) return;
    redoRef.current.push({ inPoint, outPoint, aspect, overlay, muted });
    applySnap(last);
  }

  function redo() {
    const last = redoRef.current.pop();
    if (!last) return;
    undoRef.current.push({ inPoint, outPoint, aspect, overlay, muted });
    applySnap(last);
  }

  actions.current = { togglePlay, seek, markIn, markOut, undo, redo, dropMarker, goIn, goOut, jumpMarker };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      const video = videoRef.current;
      if (!video || !hasClip) return;
      const a = actions.current;
      if (e.key === "Escape") {
        video.pause();
        recorderRef.current?.stop();
        return;
      }
      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        a.togglePlay();
      }
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        a.seek((video.currentTime || 0) - 2);
        window.clearInterval(holdRef.current ?? 0);
        holdRef.current = window.setInterval(() => a.seek((videoRef.current?.currentTime ?? 0) - 2), 150);
      }
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        a.seek((video.currentTime || 0) + 2);
        window.clearInterval(holdRef.current ?? 0);
        holdRef.current = window.setInterval(() => a.seek((videoRef.current?.currentTime ?? 0) + 2), 150);
      }
      if (e.key === "," || e.key === "[") {
        e.preventDefault();
        a.seek((video.currentTime || 0) - frameStep(fps));
      }
      if (e.key === "." || e.key === "]") {
        e.preventDefault();
        a.seek((video.currentTime || 0) + frameStep(fps));
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) a.redo();
        else a.undo();
      }
      if (e.key === "i" || e.key === "I") a.markIn();
      if (e.key === "o" || e.key === "O") a.markOut();
      if (e.key === "Home") {
        e.preventDefault();
        a.goIn();
      }
      if (e.key === "End") {
        e.preventDefault();
        a.goOut();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        a.seek((video.currentTime || 0) - (e.shiftKey ? 1 : frameStep(fps)));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        a.seek((video.currentTime || 0) + (e.shiftKey ? 1 : frameStep(fps)));
      }
      if (e.key === "'" || e.key === "\\") {
        e.preventDefault();
        a.jumpMarker(1);
      }
      if (e.key === ";") {
        e.preventDefault();
        a.jumpMarker(-1);
      }
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        a.dropMarker();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === "j" || e.key === "J" || e.key === "l" || e.key === "L") {
        if (holdRef.current) window.clearInterval(holdRef.current);
        holdRef.current = null;
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      if (holdRef.current) window.clearInterval(holdRef.current);
    };
  }, [hasClip, fps]);

  function restoreAfterExport() {
    exportingRef.current = false;
    recorderRef.current = null;
    const video = videoRef.current;
    const s = paintArgs.current;
    setMute(muted);
    setGain(Math.max(0, Math.min(2, gainPct / 100)));
    if (video) {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      video.playbackRate = Math.max(0.25, s.speed || 1);
      video.muted = muted;
      video.volume = volume;
      try {
        video.currentTime = Math.max(0, s.inPoint);
      } catch {
        /* ignore */
      }
    }
    setPlaying(false);
    setNow(s.inPoint);
    const canvas = canvasRef.current;
    if (canvas) {
      const preview = previewSize(CLIP_ASPECTS[s.aspect].w, CLIP_ASPECTS[s.aspect].h);
      paint(canvas, video, true, preview.w, preview.h);
    }
  }

  async function recordOnce(w: number, h: number) {
    const video = videoRef.current;
    if (!video?.src || !Number.isFinite(video.duration)) throw new Error("empty");
    const mime = pickRecorderMime() || clipMime();
    if (!canEncodeMp4() && !mime) throw new Error("mime");
    const inT = Math.max(0, Math.min(inPoint, video.duration - 0.05));
    const outT = Math.max(inT + 0.05, Math.min(outPoint || video.duration, video.duration));
    const q = qualityForSize(w, h);
    const canvas = document.createElement("canvas");
    canvas.width = q.w;
    canvas.height = q.h;
    canvas.style.position = "fixed";
    canvas.style.left = "-9999px";
    document.body.appendChild(canvas);
    canvas.getContext("2d", { alpha: false, willReadFrequently: true });
    const overlayOn = paintArgs.current.overlay !== "off" && Boolean(bannerImg.current);
    const plate = document.createElement("canvas");
    if (overlayOn && bannerImg.current) {
      plate.width = Math.max(2, Math.round(bannerNat.current.w) || 1200);
      plate.height = Math.max(2, Math.round(bannerNat.current.h) || 480);
      const baked = plate.getContext("2d", { alpha: false });
      baked?.drawImage(bannerImg.current, 0, 0, plate.width, plate.height);
    }
    const laySnap = bannerLay.current ? { ...bannerLay.current } : null;
    const stillSnap = stillImg.current && stillLay.current ? { ...stillLay.current } : null;
    const stillPlate = document.createElement("canvas");
    if (stillImg.current && stillSnap) {
      stillPlate.width = Math.max(2, Math.round(stillNat.current.w) || 1200);
      stillPlate.height = Math.max(2, Math.round(stillNat.current.h) || 720);
      const bakedStill = stillPlate.getContext("2d", { alpha: false });
      bakedStill?.drawImage(stillImg.current, 0, 0, stillPlate.width, stillPlate.height);
    }
    const ctxTick = () => {
      paint(canvas, video, false, q.w, q.h, true, true);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (stillPlate.width > 2 && stillSnap) {
        const dx = stillSnap.x * q.w;
        const dy = stillSnap.y * q.h;
        const dw = Math.max(2, stillSnap.w * q.w);
        const dh = Math.max(2, stillSnap.h * q.h);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        if (stillShapeRef.current === "native") {
          ctx.drawImage(stillPlate, 0, 0, stillPlate.width, stillPlate.height, dx, dy, dw, dh);
        } else {
          const box = coverRect(stillPlate.width, stillPlate.height, dw, dh);
          ctx.drawImage(stillPlate, box.sx, box.sy, box.sw, box.sh, dx, dy, dw, dh);
        }
      }
      if (overlayOn && plate.width > 2) {
        const lay =
          laySnap ??
          layoutFromStrip(q.w, q.h, plate.width, plate.height, paintArgs.current.overlay === "top" ? "top" : "lower");
        ctx.drawImage(plate, lay.x * q.w, lay.y * q.h, lay.w * q.w, lay.h * q.h);
      }
    };
    exportingRef.current = true;
    try {
    attachSound(video);
    video.muted = false;
    video.volume = 1;
    video.playbackRate = 1;
    video.currentTime = inT;
    setMute(muted);
    setGain(Math.max(0, Math.min(2, gainPct / 100)));
    setFade(fadeIn > 0 ? 0.5 : 0, fadeOut > 0 ? 0.5 : 0);
    armFades(video, inT, outT);
    await new Promise<void>((resolve) => {
      const ready = () => {
        video.removeEventListener("seeked", ready);
        resolve();
      };
      video.addEventListener("seeked", ready);
      window.setTimeout(resolve, 500);
    });
    ctxTick();
    const processed = soundTracks();
    try {
      const muxed = await exportMp4({
        canvas,
        video,
        inT,
        outT,
        q: { w: q.w, h: q.h, fps: q.fps, bitrate: q.videoBps },
        draw: ctxTick,
        onPct: setExportPct,
      });
      if (muxed && muxed.size >= 64) {
        return { blob: muxed, audioOk: Boolean(processed.length && !muted), mime: "video/mp4" };
      }
    } catch {
      /* no AVC WebCodecs — try the other muxer, then MediaRecorder */
    }
    try {
      if (canWebCodecs()) {
        const blob = await encodeClip({
          canvas,
          video,
          inT,
          outT,
          q: { w: q.w, h: q.h, fps: q.fps, bitrate: q.videoBps },
          draw: ctxTick,
          onPct: setExportPct,
          audioTracks: muted ? [] : processed,
        });
        if (blob && blob.size >= 64) {
          return { blob, audioOk: Boolean(processed.length && !muted), mime: "video/mp4" };
        }
      }
    } catch {
      /* MediaRecorder still saves */
    }
    video.pause();
    video.playbackRate = 1;
    video.currentTime = inT;
    await new Promise<void>((resolve) => {
      const ready = () => {
        video.removeEventListener("seeked", ready);
        resolve();
      };
      video.addEventListener("seeked", ready);
      window.setTimeout(resolve, 400);
    });
    if (!canEncodeMp4() && !mime) {
      throw new Error("mime");
    }
    if (!mime) {
      throw new Error("mime");
    }
    let recStream: MediaStream;
    try {
      recStream = canvas.captureStream(q.fps);
    } catch {
      recStream = canvas.captureStream(0);
    }
    let mix: MediaStream = recStream;
    let audioOk = false;
    if (processed.length && !muted) {
      mix = new MediaStream([...recStream.getVideoTracks(), ...processed]);
      audioOk = true;
    }
    const chunks: BlobPart[] = [];
    let recorder: MediaRecorder;
    try {
      recorder = mime
        ? new MediaRecorder(mix, {
            mimeType: mime,
            videoBitsPerSecond: q.videoBps,
            audioBitsPerSecond: q.audioBps,
          })
        : new MediaRecorder(mix);
    } catch {
      throw new Error("mime");
    }
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };
    const done = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: recorder.mimeType || mime || "video/mp4" }));
      recorder.onerror = () => reject(new Error("rec"));
    });
    recorder.start(200);
    ctxTick();
    const useRvfc = typeof video.requestVideoFrameCallback === "function";
    await video.play().catch(() => undefined);
    await new Promise<void>((resolve) => {
      let handle = 0;
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (handle) {
          if (useRvfc) video.cancelVideoFrameCallback(handle);
          else window.cancelAnimationFrame(handle);
        }
        video.pause();
        if (recorder.state !== "inactive") recorder.stop();
        resolve();
      };
      const onFrame = (_now: number, meta?: { mediaTime: number }) => {
        const t = meta && Number.isFinite(meta.mediaTime) ? meta.mediaTime : video.currentTime;
        ctxTick();
        const spanOut = Math.max(0.05, outT - inT);
        setExportPct(Math.min(100, Math.max(0, ((t - inT) / spanOut) * 100)));
        if (t >= outT - 0.02 || video.ended || recorder.state === "inactive") {
          finish();
          return;
        }
        handle = useRvfc
          ? video.requestVideoFrameCallback(onFrame)
          : window.requestAnimationFrame((now) => onFrame(now));
      };
      handle = useRvfc
        ? video.requestVideoFrameCallback(onFrame)
        : window.requestAnimationFrame((now) => onFrame(now));
      window.setTimeout(finish, Math.min(45 * 60 * 1000, (outT - inT) * 4000 + 8000));
    });
    const blob = await done;
    recorderRef.current = null;
    if (blob.size < 64) throw new Error("empty-blob");
    const outMime = recorder.mimeType || mime || blob.type || "video/mp4";
    if (!/mp4|webm/i.test(outMime)) throw new Error("mime");
    return { blob, audioOk, mime: /webm/i.test(outMime) ? "video/webm" : "video/mp4" };
    } finally {
      try {
        canvas.remove();
      } catch {
        /* already */
      }
      restoreAfterExport();
    }
  }

  async function downloadBlob(blob: Blob, w: number, h: number, mime = "video/mp4") {
    const type = /webm/i.test(mime) ? "video/webm" : "video/mp4";
    const fileName = clipFileName(edition, name, w, h, type);
    const file = new File([blob], fileName, { type });
    setLastFile(file);
    setCanShareFile(Boolean(navigator.canShare?.({ files: [file] })));
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName;
    a.rel = "noopener";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    window.setTimeout(() => {
      a.remove();
      URL.revokeObjectURL(href);
    }, 30000);
    return file;
  }

  async function shareLast() {
    if (!lastFile || !navigator.canShare?.({ files: [lastFile] })) return;
    try {
      await navigator.share({
        files: [lastFile],
        title: sanitizeDisplayName(name) || "RuneScape clip",
        text: "Clip from RuneScape Banner Studio (fan desk, not Jagex).",
      });
    } catch {
      /* cancelled */
    }
  }

  async function exportClip(pair = false, box?: { w: number; h: number }) {
    const video = videoRef.current;
    if (!hasClip && !video?.src) {
      setStatus("Upload a clip first.");
      return;
    }
    if (!canEncodeMp4() && !clipMime()) {
      setStatus("This browser cannot export a clip.");
      return;
    }
    const first = pair ? CLIP_ASPECTS["16x9-720"] : box ?? size;
    const qNote = qualityForSize(first.w, first.h);
    setBusy(true);
    setExportPct(0);
    setStatus(`Making clip… ${await hwNote({ w: qNote.w, h: qNote.h, fps: qNote.fps, bitrate: qNote.videoBps })}`);
    try {
      const one = await recordOnce(first.w, first.h);
      await downloadBlob(one.blob, qualityForSize(first.w, first.h).w, qualityForSize(first.w, first.h).h, one.mime);
      if (pair) {
        const two = await recordOnce(1080, 1920);
        await downloadBlob(two.blob, 1080, 1920, two.mime);
      }
      setStatus(`In the bag. ${await hwNote({ w: qNote.w, h: qNote.h, fps: qNote.fps, bitrate: qNote.videoBps })}`);
    } catch (err) {
      const why = err instanceof Error ? err.message : "";
      if (why === "mime") setStatus("This browser cannot export a clip.");
      else if (why === "empty-blob") setStatus("Export wrote an empty file. Try Chrome or Edge.");
      else setStatus("Export stopped.");
    } finally {
      setBusy(false);
      setExportPct(0);
    }
  }

  async function exportSize(id: ClipAspect) {
    applyClipCrop(id);
    await exportClip(false, CLIP_ASPECTS[id]);
  }

  function cancelExport() {
    try {
      recorderRef.current?.stop();
    } catch {
      /* ignore */
    }
    restoreAfterExport();
    setBusy(false);
    setExportPct(0);
    setStatus("Export cancelled.");
  }

  const span = Math.max(0.001, (viewEnd || duration) - viewStart);
  const pct = (t: number) => `${Math.min(100, Math.max(0, ((t - viewStart) / span) * 100))}%`;

  return (
    <div>
      <input
        id="clip-file"
        ref={fileRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) takeVideo(file);
        }}
      />
      <input
        id="clip-still"
        ref={stillFileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void takeStillFile(file);
        }}
      />
      <div
        className="bg-surface"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) takeVideo(file);
        }}
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0">
            <div
              className="relative mx-auto w-full overflow-hidden bg-[#120f0c]"
              style={{ aspectRatio: `${size.w} / ${size.h}` }}
            >
              {!hasClip ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
                  <p className="text-sm text-muted">{ready === "loading" ? "Reading clip…" : "No clip"}</p>
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex min-h-11 cursor-pointer items-center rounded-md border border-line bg-raised px-4 text-sm text-parchment"
                    onClick={openClipPicker}
                  >
                    Upload video
                  </button>
                </div>
              ) : null}
              <canvas
                ref={canvasRef}
                className="block h-full w-full touch-none object-contain"
                onPointerDown={onBannerPointerDown}
                onPointerMove={onBannerPointerMove}
                onPointerUp={onBannerPointerUp}
                onPointerCancel={onBannerPointerUp}
              />
              {hasClip ? (
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2 font-mono text-[10px] tabular-nums text-fg">
                  <div className="flex items-start justify-between gap-2">
                    <span className={busy ? "rounded-sm bg-play px-1.5 py-0.5 font-semibold tracking-widest" : "rounded-sm bg-black/55 px-1.5 py-0.5"}>
                      {busy ? "REC" : playing ? "PLAY" : "STOP"}
                    </span>
                    <span className="rounded-sm bg-black/55 px-1.5 py-0.5">{timecode(now)}</span>
                    <span className="rounded-sm bg-black/55 px-1.5 py-0.5">
                      {muted ? "MUTE" : `${gainPct}%`} · {peakDb(hold)} dBFS
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="rounded-sm bg-black/55 px-1.5 py-0.5">
                      IN {timecode(inPoint)} · OUT {timecode(outPoint)} · CUT {timecode(Math.max(0, outPoint - inPoint))}
                    </span>
                    <span className="relative flex h-16 w-3 flex-col-reverse overflow-hidden rounded-sm bg-black/55 ring-1 ring-line/40">
                      <span
                        className="w-full bg-[#7a9b3a]"
                        style={{
                          height: `${Math.min(100, peak * 100)}%`,
                          background: peak > 0.95 ? "var(--color-play)" : peak > 0.7 ? "var(--color-line)" : "#7a9b3a",
                        }}
                      />
                      <span className="absolute left-0 w-full bg-fg" style={{ bottom: `${Math.min(100, hold * 100)}%`, height: 2 }} />
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <video ref={videoRef} className="pointer-events-none absolute h-px w-px opacity-0" playsInline preload="none" muted={false} controls={false} />
            <div className="flex flex-wrap items-center gap-2 border-t border-line/30 bg-raised px-3 py-2">
              <button type="button" disabled={!hasClip} className={CHIP} id="back2" onClick={() => seek(now - 2)}>
                −2s
              </button>
              <button type="button" disabled={!hasClip} className={CHIP} id="frameBack" onClick={() => seek(now - frameStep(fps))}>
                Frame −
              </button>
              <button
                type="button"
                disabled={!hasClip}
                className={
                  hasClip
                    ? "inline-flex min-h-12 min-w-[4.5rem] items-center justify-center rounded-md border border-line bg-play px-5 text-sm font-semibold text-fg hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-line"
                    : "inline-flex min-h-12 min-w-[4.5rem] items-center justify-center rounded-md border border-line/20 bg-raised px-5 text-sm text-faint"
                }
                onClick={togglePlay}
              >
                {playing ? "Pause" : "Play"}
              </button>
              <button type="button" disabled={!hasClip} className={CHIP} id="frameFwd" onClick={() => seek(now + frameStep(fps))}>
                Frame +
              </button>
              <button type="button" disabled={!hasClip} className={CHIP} id="fwd2" onClick={() => seek(now + 2)}>
                +2s
              </button>
              <p className="ml-auto font-mono text-[11px] tabular-nums text-muted">
                {timecode(now)}
                <span className="text-faint"> / {timecode(duration)}</span>
                {native ? <span className="text-faint"> · {native}</span> : null}
              </p>
            </div>
          </div>

          <aside className="flex flex-col gap-4 border-t border-line/40 bg-raised px-3 py-3 lg:border-t-0 lg:border-l">
            <section className="space-y-2">
              <h2 className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">File</h2>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className={`${CHIP} w-full cursor-pointer`} onClick={openClipPicker}>
                  {hasClip ? "Replace" : "Upload"}
                </button>
                {busy ? (
                  <button type="button" className={`${CHIP} w-full`} onClick={cancelExport}>
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!hasClip}
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-line bg-line px-3 text-[11px] font-semibold text-ink disabled:opacity-40"
                    onClick={() => void exportClip(false)}
                  >
                    Save clip
                  </button>
                )}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">Crop</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(CLIP_ASPECTS) as ClipAspect[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    data-crop={id}
                    className={aspect === id ? CHIP_ON : CHIP}
                    onClick={() => applyClipCrop(id)}
                  >
                    {CLIP_ASPECTS[id].label}
                  </button>
                ))}
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">Plate</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={overlay !== "off" ? CHIP_ON : CHIP}
                  onClick={() => {
                    if (overlay !== "off") {
                      setOverlay("off");
                      setStatus("Banner off the clip.");
                      return;
                    }
                    void loadDeskBanner("lower");
                  }}
                >
                  Desk banner
                </button>
                <button type="button" className={overlay === "top" ? CHIP_ON : CHIP} onClick={() => void placeDeskBanner("top")}>
                  Top
                </button>
                <button type="button" className={overlay === "lower" ? CHIP_ON : CHIP} onClick={() => void placeDeskBanner("lower")}>
                  Bottom
                </button>
                <button type="button" className={CHIP} disabled={overlay === "off"} onClick={() => clearDeskBanner()}>
                  Remove banner
                </button>
                <button type="button" className={CHIP} disabled={overlay === "off"} onClick={() => scaleBanner(1.08)}>
                  Banner +
                </button>
                <button type="button" className={CHIP} disabled={overlay === "off"} onClick={() => scaleBanner(1 / 1.08)}>
                  Banner −
                </button>
                <button type="button" className={hasStill ? CHIP_ON : CHIP} onClick={() => stillFileRef.current?.click()}>
                  Upload still
                </button>
                {(["native", "16x9", "9x16", "1x1"] as StillShape[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={hasStill && stillShape === id ? CHIP_ON : CHIP}
                    disabled={!hasStill}
                    onClick={() => applyStillShape(id)}
                  >
                    {id === "native" ? "Native" : id === "16x9" ? "16:9" : id === "9x16" ? "9:16" : "1:1"}
                  </button>
                ))}
                <button type="button" className={CHIP} disabled={!hasStill} onClick={() => applyStillShape(stillShape)}>
                  Fit
                </button>
                <button type="button" className={CHIP} disabled={!hasStill} onClick={() => fillStill()}>
                  Fill
                </button>
                <button type="button" className={CHIP} disabled={!hasStill} onClick={() => scaleStill(1.08)}>
                  Still +
                </button>
                <button type="button" className={CHIP} disabled={!hasStill} onClick={() => scaleStill(1 / 1.08)}>
                  Still −
                </button>
                <button type="button" className={CHIP} disabled={!hasStill} onClick={() => clearStill()}>
                  Remove still
                </button>
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">Sound</h2>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className={muted ? CHIP_ON : CHIP} id="mute" onClick={() => setMuted((v) => !v)}>
                  Mute
                </button>
                <label className="inline-flex min-h-11 items-center gap-2 text-[11px] text-muted">
                  Gain
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    value={gainPct}
                    disabled={muted}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      setGainPct(next);
                      if (next >= 190) setStatus("Back off the gain.");
                    }}
                    className="h-11 w-28 accent-[#ffff00]"
                    aria-label="Gain"
                  />
                  <span className="w-10 font-mono tabular-nums text-parchment">{gainPct}%</span>
                </label>
                <button
                  type="button"
                  id="fade"
                  className={fadeIn > 0 ? CHIP_ON : CHIP}
                  onClick={() => setFadeIn((v) => (v > 0 ? 0 : Math.round(fps * 0.5)))}
                >
                  Fade in
                </button>
                <button
                  type="button"
                  className={fadeOut > 0 ? CHIP_ON : CHIP}
                  onClick={() => setFadeOut((v) => (v > 0 ? 0 : Math.round(fps * 0.5)))}
                >
                  Fade out
                </button>
                <span className="inline-flex min-h-11 items-center gap-2 text-[11px] text-muted">
                  Peak
                  <span className="relative h-2 w-24 overflow-hidden rounded-sm border border-black bg-[#120f0c]">
                    <span
                      id="pk"
                      className="absolute inset-y-0 left-0 w-full origin-left bg-[#ffff00]"
                      style={{ transform: `scaleX(${Math.min(1, peak)})` }}
                    />
                  </span>
                  <span className="text-faint">{peak < 0.04 ? "Quiet." : peak > 0.95 ? "Back off the gain." : ""}</span>
                </span>
              </div>
            </section>
            <section className="space-y-2">
              <h2 className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">Type</h2>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={ltOn ? CHIP_ON : CHIP}
                  onClick={() => {
                    setLtOn((on) => !on);
                  }}
                >
                  Lower third
                </button>
                <label className="inline-flex min-h-11 min-w-0 flex-1 items-center">
                  <span className="sr-only">Lower third text</span>
                  <input
                    value={ltText}
                    maxLength={24}
                    placeholder="24 letters"
                    spellCheck={false}
                    autoComplete="off"
                    className="min-h-11 w-full rounded-md border border-line/40 bg-[#120f0c] px-2 text-sm text-parchment"
                    onChange={(e) => setLtText(sanitizeDisplayName(e.target.value).slice(0, 24))}
                  />
                </label>
              </div>
            </section>
          </aside>
        </div>

        <div className="border-t border-line bg-[#120f0c] px-3 py-3">
          <div className="mb-1 flex justify-between font-mono text-[10px] tabular-nums text-faint">
            <span>IN {timecode(inPoint)}</span>
            <span>CUT {timecode(Math.max(0, outPoint - inPoint))}</span>
            <span>OUT {timecode(outPoint)}</span>
          </div>
          <div
            ref={tlRef}
            className="relative h-12 touch-none overflow-hidden rounded-md bg-surface ring-1 ring-line/30"
            onPointerDown={onTlPointerDown}
            onPointerMove={onTlPointerMove}
            onPointerUp={onTlPointerUp}
            onPointerCancel={onTlPointerUp}
          >
            {duration > 0 ? (
              <>
                <div className="pointer-events-none absolute inset-x-0 top-0 flex h-4">
                  {Array.from({ length: 9 }, (_, i) => (
                    <span key={i} className="flex-1 border-l border-line/20" />
                  ))}
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 bg-line/25"
                  style={{ left: pct(inPoint), width: `calc(${pct(outPoint)} - ${pct(inPoint)})` }}
                />
                {markers.map((m) => (
                  <button
                    key={m}
                    type="button"
                    className="absolute top-1 z-10 h-10 w-0.5 bg-parchment"
                    style={{ left: pct(m) }}
                    aria-label={`Marker ${timecode(m)}`}
                    onClick={() => seek(m)}
                  />
                ))}
                <div className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-fg" style={{ left: pct(now) }} />
                <button
                  type="button"
                  className="absolute top-0 z-20 h-full w-2 -translate-x-1/2 cursor-ew-resize bg-line"
                  style={{ left: pct(inPoint) }}
                  aria-label="In point"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    if (!hasClip) return;
                    pushUndo();
                    tlDrag.current = "in";
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={onTlPointerMove}
                  onPointerUp={onTlPointerUp}
                />
                <button
                  type="button"
                  className="absolute top-0 z-20 h-full w-2 -translate-x-1/2 cursor-ew-resize bg-line"
                  style={{ left: pct(outPoint) }}
                  aria-label="Out point"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    if (!hasClip) return;
                    pushUndo();
                    tlDrag.current = "out";
                    e.currentTarget.setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={onTlPointerMove}
                  onPointerUp={onTlPointerUp}
                />
              </>
            ) : (
              <div className="pointer-events-none absolute inset-1 rounded-sm bg-raised" />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button type="button" disabled={!hasClip} className={CHIP} id="markIn" onClick={markIn}>
              In
            </button>
            <button type="button" disabled={!hasClip} className={CHIP} id="markOut" onClick={markOut}>
              Out
            </button>
            <button type="button" className={CHIP} onClick={undo}>
              Undo
            </button>
            <button type="button" className={loop ? CHIP_ON : CHIP} onClick={() => setLoop((v) => !v)}>
              Loop
            </button>
            <p className="ml-auto font-mono text-[11px] tabular-nums text-faint">
              {ready === "ready" ? "READY" : ready === "loading" ? "LOAD" : ready === "bad" ? "BAD FILE" : "IDLE"}
              {` · ${size.w}×${size.h}`}
            </p>
          </div>
        </div>

        <p className="px-3 py-2 text-[11px] text-muted" aria-live="polite">
          {busy ? `Making clip… ${Math.round(exportPct)}%` : status}
          {fileLabel && !busy ? ` · ${fileLabel}` : ""}
        </p>
        {busy ? (
          <div className="h-1 overflow-hidden bg-[#120f0c]" role="progressbar" aria-valuenow={Math.round(exportPct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-play" style={{ width: `${exportPct}%` }} />
          </div>
        ) : null}
      </div>
    </div>
  );

  async function takeBanner(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
    const url = URL.createObjectURL(file);
    bannerUrl.current = url;
    try {
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof prev.close === "function") prev.close();
      bannerImg.current = await createImageBitmap(file);
      if (overlay === "off") setOverlay("lower");
      setStatus("Banner overlay loaded.");
    } catch {
      const img = new Image();
      img.onload = () => {
        bannerImg.current = img;
        if (overlay === "off") setOverlay("lower");
        setStatus("Banner overlay loaded.");
      };
      img.src = url;
    }
  }
}
