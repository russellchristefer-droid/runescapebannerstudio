import { useEffect, useRef, useState } from "react";
import { readDesk } from "@/desk/store";
import { sanitizeClan, sanitizeDisplayName, sanitizeWorld, worldLabel } from "@/lib/rsText";
import { LOCATIONS } from "@/lib/locations";
import { drawSafeZoneGhosts, type SafeZone } from "@/lib/bannerFeatures";
import { paintRSYellow } from "@/lib/draw-banner";
import { attachSound, detachSound, setMute, setGain, setFade, armFades, soundTracks } from "./clipSound";
import {
  CLIP_ASPECTS,
  CLIP_MARKS,
  CLIP_MAX_BYTES,
  CLIP_WARN_SECONDS,
  clipFileName,
  clipMime,
  coverRect,
  formatBytes,
  frameStep,
  peakDb,
  loadEditPrefs,
  orderInOut,
  releaseVideo,
  saveEditPrefs,
  snapTime,
  snapToPoints,
  timecode,
  type ClipAspect,
} from "./clip-prefs";

type OverlayPos = "off" | "top" | "lower";

const CHIP =
  "min-h-11 rounded-md border border-[#c6a45a]/40 bg-[#1a1610] px-3 text-[11px] text-parchment disabled:opacity-40";
const CHIP_ON = "min-h-11 rounded-md border border-parchment bg-[#1a1610] px-3 text-[11px] text-parchment";

export function ClipBench() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const bannerUrl = useRef<string | null>(null);
  const bannerImg = useRef<CanvasImageSource | null>(null);
  const markCache = useRef<Record<string, HTMLImageElement>>({});
  const recorderRef = useRef<MediaRecorder | null>(null);
  const hidden = useRef(false);
  const holdRef = useRef<number | null>(null);
  const lastUi = useRef(0);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const audioSrc = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const recDest = useRef<MediaStreamAudioDestinationNode | null>(null);
  const meterBuf = useRef<Uint8Array | null>(null);
  const actions = useRef({
    togglePlay: () => {},
    seek: (_t: number) => {},
    markIn: () => {},
    markOut: () => {},
    undo: () => {},
    redo: () => {},
    dropMarker: () => {},
  });

  const [status, setStatus] = useState("Drop a clip you own, or upload one.");
  const [fileLabel, setFileLabel] = useState("");
  const [native, setNative] = useState("");
  const [duration, setDuration] = useState(0);
  const [now, setNow] = useState(0);
  const [inPoint, setInPoint] = useState(0);
  const [outPoint, setOutPoint] = useState(0);
  const [loop, setLoop] = useState(true);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [aspect, setAspect] = useState<ClipAspect>(() => loadEditPrefs().aspect ?? "16x9-720");
  const [overlay, setOverlay] = useState<OverlayPos>(() => loadEditPrefs().overlay ?? "off");
  const [ghost, setGhost] = useState<SafeZone>("none");
  const [edition, setEdition] = useState<"OSRS" | "RS3">("OSRS");
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [world, setWorld] = useState("");
  const [markId, setMarkId] = useState("none");
  const [ltOn, setLtOn] = useState(false);
  const [ltText, setLtText] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);
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
    return () => {
      releaseVideo(videoRef.current, objectUrl.current);
      objectUrl.current = null;
      if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
      bannerUrl.current = null;
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
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

  function paint(canvas: HTMLCanvasElement, video: HTMLVideoElement, ghosts: boolean, w = size.w, h = size.h) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = paintArgs.current;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    ctx.fillStyle = "#120f0c";
    ctx.fillRect(0, 0, w, h);
    if (video.readyState >= 2 && video.videoWidth) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((s.rotate * Math.PI) / 180);
      ctx.scale(s.zoom, s.zoom);
      ctx.translate(-w / 2, -h / 2);
      const box = coverRect(video.videoWidth, video.videoHeight, w, h);
      ctx.drawImage(video, box.sx, box.sy, box.sw, box.sh, 0, 0, w, h);
      ctx.restore();
    }
    const t = video.currentTime || s.now;
    const fadeInSec = (s.fadeIn / Math.max(1, s.fps)) / Math.max(0.25, s.speed);
    const fadeOutSec = (s.fadeOut / Math.max(1, s.fps)) / Math.max(0.25, s.speed);
    let fade = 1;
    if (fadeInSec > 0 && t < s.inPoint + fadeInSec) fade = Math.max(0, (t - s.inPoint) / fadeInSec);
    if (fadeOutSec > 0 && t > s.outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (s.outPoint - t) / fadeOutSec));
    if (fade < 1) {
      ctx.fillStyle = `rgba(0,0,0,${1 - fade})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (s.overlay !== "off" && bannerImg.current) {
      const barH = Math.round(h * (s.overlay === "top" ? 0.2 : 0.22));
      const y = s.overlay === "top" ? 0 : h - barH;
      ctx.save();
      ctx.globalAlpha = Math.min(1, Math.max(0.6, s.opacity / 100));
      ctx.drawImage(bannerImg.current, 0, y, w, barH);
      ctx.restore();
    }
    const mark = CLIP_MARKS.find((item) => item.id === s.markId && item.id !== "none");
    if (mark?.src) {
      const img = markCache.current[mark.src];
      if (img) ctx.drawImage(img, 36, Math.round(h * 0.72), Math.round(h * 0.08), Math.round(h * 0.08));
    }
    if (s.ltOn) {
      const line = sanitizeDisplayName(s.ltText || "").slice(0, 24);
      if (line) paintRSYellow(ctx, line, 36, h - Math.round(h * 0.12), Math.max(18, Math.round(h * 0.045)));
    }
    if (ghosts && s.ghost !== "none") drawSafeZoneGhosts(ctx, w, h, s.ghost);
    if (ghosts && s.aspect === "9x16" && w / h > 1) {
      const cropW = h * (9 / 16);
      const x = (w - cropW) / 2;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, x, h);
      ctx.fillRect(x + cropW, 0, w - x - cropW, h);
    }
  }

  useEffect(() => {
    let id = 0;
    let live = true;
    const tick = () => {
      if (!live) return;
      if (hidden.current) {
        id = window.setTimeout(tick, 250);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const s = paintArgs.current;
      if (video && canvas) {
        const t = video.currentTime;
        if (s.loop && s.outPoint > s.inPoint && t >= s.outPoint - 0.04) {
          video.currentTime = s.inPoint;
        }
        const preview = previewSize(CLIP_ASPECTS[s.aspect].w, CLIP_ASPECTS[s.aspect].h);
        paint(canvas, video, true, preview.w, preview.h);
        const stamp = performance.now();
        if (stamp - lastUi.current > 80) {
          lastUi.current = stamp;
          setNow(t);
          applyLiveGain(t);
          const node = analyser.current;
          const buf = meterBuf.current;
          if (node && buf) {
            node.getByteTimeDomainData(buf as Uint8Array<ArrayBuffer>);
            let max = 0;
            for (let i = 0; i < buf.length; i++) {
              const v = Math.abs(buf[i] - 128) / 128;
              if (v > max) max = v;
            }
            setPeak(max);
            setHold((prev) => (max > prev ? max : prev * 0.92));
          } else {
            setPeak(0);
          }
        }
      }
      const rvfc = video as HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number };
      id = rvfc?.requestVideoFrameCallback ? rvfc.requestVideoFrameCallback(tick) : window.requestAnimationFrame(tick);
    };
    tick();
    return () => {
      live = false;
      const rvfc = videoRef.current as HTMLVideoElement & { cancelVideoFrameCallback?: (n: number) => void };
      if (rvfc?.cancelVideoFrameCallback) rvfc.cancelVideoFrameCallback(id);
      else window.cancelAnimationFrame(id);
    };
  }, [hasClip]);

  useEffect(() => {
    saveEditPrefs(aspect, overlay);
  }, [aspect, overlay]);

  function useDeskBanner() {
    const saved = readDesk();
    const loc = LOCATIONS.find((item) => item.id === saved.locationId) ?? LOCATIONS.find((item) => item.edition === edition);
    const src = saved.stillSrc || (loc ? (saved.view === "b" && loc.viewB ? loc.viewB : loc.viewA) : "");
    if (!src) {
      setStatus("No desk still saved.");
      return;
    }
    const img = new Image();
    img.onload = async () => {
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
      }
      try {
        bannerImg.current = await createImageBitmap(img);
      } catch {
        bannerImg.current = img;
      }
      if (overlay === "off") setOverlay("lower");
      setStatus("Desk still loaded as overlay.");
    };
    img.onerror = () => setStatus("That still did not load.");
    img.src = src;
  }

  async function holdingCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 480;
    const video = videoRef.current;
    if (video && hasClip) paint(canvas, video, false, 1200, 480);
    else {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#1a1612";
      ctx.fillRect(0, 0, 1200, 480);
      if (bannerImg.current) ctx.drawImage(bannerImg.current, 0, 0, 1200, 480);
      const line = [sanitizeDisplayName(name), sanitizeClan(clan), worldLabel(sanitizeWorld(world))].filter(Boolean).join(" · ");
      if (line) {
        ctx.font = `600 28px "Source Sans 3", sans-serif`;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeText(line, 48, 420);
        ctx.fillStyle = "#efe0c4";
        ctx.fillText(line, 48, 420);
      }
    }
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `holding-${edition === "OSRS" ? "osrs" : "rs3"}-1200x480.jpg`;
    a.click();
    URL.revokeObjectURL(href);
    const file = new File([blob], a.download, { type: "image/jpeg" });
    setLastFile(file);
    setCanShareFile(Boolean(navigator.canShare?.({ files: [file] })));
    setStatus("Holding card saved on this device.");
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
    const node = gainNode.current;
    if (!node) return;
    const base = muted || speed !== 1 ? 0 : Math.max(0, Math.min(2, gainPct / 100));
    node.gain.value = base * fadeMul(t);
  }

  function hookAudio(video: HTMLVideoElement) {
    attachSound(video);
    setMute(muted);
    setGain(Math.max(0, Math.min(2, gainPct / 100)));
    setFade(fadeIn > 0 ? 0.5 : 0, fadeOut > 0 ? 0.5 : 0);
  }

  function takeVideo(file: File) {
    const looksVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name);
    if (!looksVideo) {
      setStatus("Could not read that file.");
      return;
    }
    if (file.size > CLIP_MAX_BYTES) {
      setStatus("That file is over 500 MB. Cut it smaller first.");
      return;
    }
    const video = videoRef.current;
    if (!video) {
      setStatus("Could not read that file.");
      return;
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
      hookAudio(video);
      void video.play().then(() => video.pause()).catch(() => {});
      setStatus(
        dur > CLIP_WARN_SECONDS
          ? "This bench is for clips, not a whole slayer block."
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
    if (!video || !hasClip) return;
    if (video.paused) {
      if (video.currentTime < inPoint || video.currentTime >= outPoint - 0.04) video.currentTime = inPoint;
      void audioCtx.current?.resume();
      void video.play();
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

  function splitAtPlayhead() {
    pushUndo();
    const t = Math.max(0, Math.min(duration, snapTime(now, fps || 30)));
    setOutPoint(Math.max(inPoint + (1 / (fps || 30)), t));
  }

  function deleteRegion() {
    pushUndo();
    setInPoint(0);
    setOutPoint(duration);
    setStatus("In and Out cleared.");
  }

  function snapSeconds() {
    const t = Math.round(now);
    seek(t);
    setSnapOn(true);
  }

  function fadeHalf() {
    const frames = Math.max(1, Math.round((fps || 30) * 0.5));
    setFadeIn(frames);
    setFadeOut(frames);
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

  actions.current = { togglePlay, seek, markIn, markOut, undo, redo, dropMarker };

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

  async function recordOnce(w: number, h: number) {
    const video = videoRef.current;
    if (!video?.src || !Number.isFinite(video.duration)) throw new Error("empty");
    const mime = clipMime();
    if (typeof MediaRecorder === "undefined") throw new Error("mime");
    const inT = Math.max(0, Math.min(inPoint, video.duration - 0.05));
    const outT = Math.max(inT + 0.05, Math.min(outPoint || video.duration, video.duration));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.position = "fixed";
    canvas.style.left = "-9999px";
    document.body.appendChild(canvas);
    const ctxTick = () => {
      paint(canvas, video, false, w, h);
      applyLiveGain(video.currentTime);
    };
    video.muted = false;
    video.volume = 1;
    video.playbackRate = speed === 1 ? 1 : speed;
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
    const recStream = canvas.captureStream(30);
    let mix: MediaStream = recStream;
    let audioOk = false;
    const processed = soundTracks();
    const capture =
      (video as HTMLVideoElement & { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream }).captureStream?.() ??
      (video as HTMLVideoElement & { mozCaptureStream?: () => MediaStream }).mozCaptureStream?.();
    const rawAudio = capture?.getAudioTracks() ?? [];
    const audioTracks = processed.length ? processed : rawAudio;
    if (audioTracks.length && !muted && speed === 1) {
      mix = new MediaStream([...recStream.getVideoTracks(), ...audioTracks]);
      audioOk = true;
    }
    const chunks: BlobPart[] = [];
    let recorder: MediaRecorder;
    try {
      recorder = mime ? new MediaRecorder(mix, { mimeType: mime }) : new MediaRecorder(mix);
    } catch {
      canvas.remove();
      throw new Error("mime");
    }
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };
    const done = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: recorder.mimeType || mime || "video/webm" }));
      recorder.onerror = () => reject(new Error("rec"));
    });
    recorder.start(200);
    await video.play().catch(() => undefined);
    await new Promise<void>((resolve) => {
      const watch = () => {
        ctxTick();
        const spanOut = Math.max(0.05, outT - inT);
        setExportPct(Math.min(100, Math.max(0, ((video.currentTime - inT) / spanOut) * 100)));
        if (video.currentTime >= outT - 0.04 || video.ended || recorder.state === "inactive") {
          video.pause();
          if (recorder.state !== "inactive") recorder.stop();
          resolve();
          return;
        }
        window.requestAnimationFrame(watch);
      };
      watch();
      window.setTimeout(() => {
        video.pause();
        if (recorder.state !== "inactive") recorder.stop();
        resolve();
      }, Math.min(120000, (outT - inT) * 1000 + 2000));
    });
    const blob = await done;
    recorderRef.current = null;
    canvas.remove();
    if (blob.size < 64) throw new Error("empty-blob");
    return { blob, audioOk, mime: recorder.mimeType || mime || "video/webm" };
  }

  async function downloadBlob(blob: Blob, w: number, h: number, mime = blob.type) {
    const fileName = clipFileName(edition, name, w, h, mime || "video/webm");
    const file = new File([blob], fileName, { type: mime || blob.type || "video/webm" });
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
    }, 2500);
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

  async function exportClip(pair = false) {
    const video = videoRef.current;
    if (!hasClip && !video?.src) {
      setStatus("Upload a clip first.");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setStatus("This browser cannot export a clip.");
      return;
    }
    setBusy(true);
    setExportPct(0);
    setStatus("Making clip…");
    try {
      const first = pair ? CLIP_ASPECTS["16x9-720"] : size;
      const one = await recordOnce(first.w, first.h);
      await downloadBlob(one.blob, first.w, first.h, one.mime);
      if (pair) {
        const two = await recordOnce(1080, 1920);
        await downloadBlob(two.blob, 1080, 1920, two.mime);
      }
      setStatus("In the bag.");
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

  function cancelExport() {
    try {
      recorderRef.current?.stop();
    } catch {
      /* ignore */
    }
    videoRef.current?.pause();
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
      <div
        className="bg-[#1a1610]"
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("image/")) void takeBanner(file);
          else if (file) takeVideo(file);
        }}
      >
        <div className="relative mx-auto w-full max-w-[960px] overflow-hidden bg-[#120f0c]" style={{ aspectRatio: "16 / 9" }}>
          {!hasClip ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <p className="text-sm text-muted">{ready === "loading" ? "Reading clip…" : "No clip"}</p>
              <button
                id="clip-upload"
                type="button"
                className="pointer-events-auto min-h-11 rounded-md border border-[#c6a45a] bg-[#241e16] px-4 text-sm text-parchment"
                onClick={openClipPicker}
              >
                Upload video
              </button>
            </div>
          ) : null}
          <canvas ref={canvasRef} className="block h-full w-full object-contain" />
          {hasClip ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2 font-mono text-[10px] tabular-nums text-[#efe4c8]">
              <div className="flex items-start justify-between gap-2">
                <span className={busy ? "rounded-sm bg-[#9b1b1b] px-1.5 py-0.5 font-semibold tracking-widest" : "rounded-sm bg-black/55 px-1.5 py-0.5"}>
                  {busy ? "REC" : playing ? "PLAY" : "STOP"}
                </span>
                <span className="rounded-sm bg-black/55 px-1.5 py-0.5">{timecode(now)}</span>
                <span className="rounded-sm bg-black/55 px-1.5 py-0.5">
                  {muted ? "MUTE" : `${gainPct}%`} · {peakDb(hold)} dBFS
                </span>
              </div>
              <div className="flex items-end justify-between gap-2">
                <span className="rounded-sm bg-black/55 px-1.5 py-0.5">
                  IN {timecode(inPoint)} · OUT {timecode(outPoint)}
                </span>
                <span className="relative flex h-16 w-3 flex-col-reverse overflow-hidden rounded-sm bg-black/55 ring-1 ring-[#c6a45a]/40">
                  <span
                    className="w-full"
                    style={{
                      height: `${Math.min(100, peak * 100)}%`,
                      background: peak > 0.95 ? "#9b1b1b" : peak > 0.7 ? "#c6a45a" : "#7a9b3a",
                    }}
                  />
                  <span className="absolute left-0 w-full bg-[#efe4c8]" style={{ bottom: `${Math.min(100, hold * 100)}%`, height: 2 }} />
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <video ref={videoRef} className="pointer-events-none absolute h-px w-px opacity-0" playsInline preload="none" muted={false} controls={false} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-4 py-2 font-mono text-[11px] tabular-nums text-muted sm:grid-cols-4">
          <p>TC {hasClip ? timecode(now) : "00:00.00"}</p>
          <p>DUR {hasClip ? timecode(range) : "00:00.00"}</p>
          <p>SRC {native || "—"}</p>
          <p>
            OUT {size.w}×{size.h}
          </p>
          <p>IN {hasClip ? timecode(inPoint) : "00:00.00"}</p>
          <p>OUT {hasClip ? timecode(outPoint) : "00:00.00"}</p>
          <p>
            PK {peakDb(hold)} dBFS{hold > 0.95 ? " CLIP" : ""}
          </p>
          <p>
            {ready === "ready" ? "READY" : ready === "loading" ? "LOAD" : ready === "bad" ? "BAD FILE" : "IDLE"}
            {muted ? " · MUTE" : ` · ${gainPct}%`}
            {loop ? " · LOOP" : ""}
            {speed !== 1 ? ` · ${speed}×` : ""}
          </p>
        </div>
      </div>

      <div className="space-y-3 bg-[#241e16] px-3 py-3">
        <div className="relative h-9 overflow-hidden rounded-md bg-[#120f0c]">
          {duration > 0 ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-2">
                {Array.from({ length: 9 }, (_, i) => (
                  <span key={i} className="flex-1 border-l border-[#c6a45a]/25" />
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-y-1 rounded-sm bg-[#c6a45a]/25"
                style={{ left: pct(inPoint), width: `calc(${pct(outPoint)} - ${pct(inPoint)})` }}
              />
              {markers.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="absolute top-1 z-10 h-7 w-0.5 bg-[#e4c36a]"
                  style={{ left: pct(m) }}
                  aria-label={`Marker ${timecode(m)}`}
                  onClick={() => seek(m)}
                />
              ))}
              <div className="pointer-events-none absolute top-1 bottom-1 w-0.5 bg-[#efe4c8]" style={{ left: pct(now) }} />
              <div className="pointer-events-none absolute top-1 h-7 w-0.5 bg-[#c6a45a]" style={{ left: pct(inPoint) }} />
              <div className="pointer-events-none absolute top-1 h-7 w-0.5 bg-[#c6a45a]" style={{ left: pct(outPoint) }} />
            </>
          ) : (
            <div className="pointer-events-none absolute inset-y-1 left-1 right-1 rounded-sm bg-[#2a241c]" />
          )}
          <input
            type="range"
            min={viewStart}
            max={viewEnd || duration || 1}
            step={frameStep(fps)}
            value={Math.min(viewEnd || duration || 1, Math.max(viewStart, now))}
            disabled={!hasClip}
            onChange={(e) => seek(Number(e.target.value))}
            onDoubleClick={() => {
              setViewStart(0);
              setViewEnd(duration);
            }}
            className="absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
            aria-label="Timeline"
          />
        </div>
        <div className="flex justify-between font-mono text-[11px] tabular-nums text-faint">
          <span>{timecode(now)}</span>
          <span>{duration ? `−${timecode(Math.max(0, duration - now))}` : "00:00.00"}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => seek(now - 2)}>
            −2s
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => seek(now - frameStep(fps))}>
            Frame −
          </button>
          <button
            type="button"
            disabled={!hasClip}
            className={
              hasClip
                ? "min-h-12 min-w-16 rounded-md border border-[#c6a45a] bg-[#9b1b1b] px-5 text-sm font-semibold text-[#efe0c4] hover:bg-[#b42323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a45a]"
                : "min-h-12 min-w-16 rounded-md border border-[#3a3228] bg-[#2a241c] px-5 text-sm text-faint"
            }
            onClick={togglePlay}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => seek(now + frameStep(fps))}>
            Frame +
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => seek(now + 2)}>
            +2s
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-md border border-[#c6a45a]/40 bg-[#1a1610] px-2 py-2 shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <p className="w-full text-[10px] tracking-wide text-faint sm:w-auto">Mute · Gain · Fade in · Fade out · Peak</p>
          <button type="button" className={muted ? CHIP_ON : CHIP} onClick={() => setMuted((v) => !v)}>
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
              className="h-11 w-36 accent-[#ffff00]"
              aria-label="Gain"
            />
            <span className="w-10 font-mono tabular-nums text-parchment">{gainPct}%</span>
          </label>
          <button
            type="button"
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
            <span className="relative h-2 w-28 overflow-hidden rounded-sm border border-black bg-[#120f0c]">
              <span
                id="pk"
                className="absolute inset-y-0 left-0 w-full origin-left bg-[#ffff00]"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            <span className="text-faint">{peak < 0.04 ? "Quiet." : peak > 0.95 ? "Back off the gain." : ""}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button type="button" className={`${CHIP} pointer-events-auto`} onClick={openClipPicker}>
            Upload video
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={markIn}>
            In
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={markOut}>
            Out
          </button>
          {busy ? (
            <button type="button" className={CHIP} onClick={cancelExport}>
              Cancel
            </button>
          ) : (
            <button type="button" disabled={!hasClip} className={CHIP} onClick={() => void exportClip(false)}>
              Save clip
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          <button type="button" disabled={!hasClip} className={CHIP} onClick={splitAtPlayhead}>
            Split
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={deleteRegion}>
            Delete region
          </button>
          <button type="button" disabled={!hasClip} className={snapOn ? CHIP_ON : CHIP} onClick={snapSeconds}>
            Snap seconds
          </button>
          <button
            type="button"
            disabled={!hasClip}
            className={CHIP}
            onClick={() => {
              pushUndo();
              setRotate((v) => (v + 90) % 360);
            }}
          >
            Rotate 90
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => setZoom((v) => Math.min(2, +(v + 0.1).toFixed(2)))}>
            Scale +
          </button>
          <button type="button" disabled={!hasClip} className={CHIP} onClick={() => setZoom((v) => Math.max(0.5, +(v - 0.1).toFixed(2)))}>
            Scale −
          </button>
          <button type="button" className={fadeIn > 0 && fadeOut > 0 ? CHIP_ON : CHIP} onClick={fadeHalf}>
            Fade 0.5s
          </button>
          <button type="button" className={loop ? CHIP_ON : CHIP} onClick={() => setLoop((v) => !v)}>
            Loop
          </button>
          <button type="button" className={CHIP} onClick={undo}>
            Undo
          </button>
        </div>

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
          <label className="inline-flex min-h-11 items-center gap-2 text-[11px] text-muted">
            <span className="sr-only">Lower third text</span>
            <input
              value={ltText}
              maxLength={24}
              placeholder="Lower third"
              spellCheck={false}
              autoComplete="off"
              className="min-h-11 w-40 rounded-md border border-[#c6a45a]/40 bg-[#120f0c] px-2 text-sm text-parchment"
              onChange={(e) => setLtText(sanitizeDisplayName(e.target.value).slice(0, 24))}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["16x9-1080", "16x9-720", "9x16", "1x1"] as ClipAspect[]).map((id) => (
            <button
              key={id}
              type="button"
              className={aspect === id ? CHIP_ON : CHIP}
              onClick={() => {
                setAspect(id);
                setStatus(`${CLIP_ASPECTS[id].label} · ${CLIP_ASPECTS[id].w}×${CLIP_ASPECTS[id].h}`);
              }}
            >
              {CLIP_ASPECTS[id].label}
            </button>
          ))}
          {lastFile && canShareFile ? (
            <button type="button" className={CHIP} onClick={() => void shareLast()}>
              Share
            </button>
          ) : null}
          <button type="button" className={CHIP} onClick={() => setMoreOpen((v) => !v)}>
            {moreOpen ? "Hide more" : "More"}
          </button>
        </div>
        <p className="text-[11px] text-muted" aria-live="polite">
          {busy ? `Making clip… ${Math.round(exportPct)}%` : status}
          {fileLabel && !busy ? ` · ${fileLabel}` : ""}
        </p>
        {busy ? (
          <div className="h-1 overflow-hidden rounded-sm bg-[#120f0c]" role="progressbar" aria-valuenow={Math.round(exportPct)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-[#9b1b1b]" style={{ width: `${exportPct}%` }} />
          </div>
        ) : null}
        <p className="text-[11px] text-faint">Space play · I / O marks · J / L skip · , . frames. Don’t export a Bank PIN.</p>
      </div>

      {moreOpen ? (
        <div className="space-y-3 border-t border-[#c6a45a]/40 bg-[#1a1610] px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={CHIP} onClick={useDeskBanner}>
              Use desk banner
            </button>
            {(["off", "top", "lower"] as const).map((pos) => (
              <button key={pos} type="button" className={overlay === pos ? CHIP_ON : CHIP} onClick={() => setOverlay(pos)}>
                {pos === "off" ? "Banner off" : pos === "top" ? "Banner top" : "Banner bottom"}
              </button>
            ))}
            <button type="button" className={CHIP} onClick={() => void holdingCard()}>
              Holding card
            </button>
            <button type="button" disabled={!hasClip} className={CHIP} onClick={() => void exportClip(true)}>
              Save 16:9 + 9:16
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={CHIP}
              onClick={() => {
                pushUndo();
                setRotate((v) => (v + 90) % 360);
              }}
            >
              Rotate 90
            </button>
            <button type="button" className={CHIP} onClick={() => setZoom((v) => Math.min(2, +(v + 0.1).toFixed(2)))}>
              Scale +
            </button>
            <button type="button" className={CHIP} onClick={() => setZoom((v) => Math.max(0.5, +(v - 0.1).toFixed(2)))}>
              Scale −
            </button>
            {([0.5, 1, 1.5, 2] as const).map((rate) => (
              <button
                key={rate}
                type="button"
                className={speed === rate ? CHIP_ON : CHIP}
                onClick={() => setSpeed(rate)}
              >
                {rate}×
              </button>
            ))}
          </div>
        </div>
      ) : null}
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
