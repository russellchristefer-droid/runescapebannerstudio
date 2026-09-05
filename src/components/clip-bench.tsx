import { useEffect, useRef, useState } from "react";
import { loadStudioSave } from "@/lib/studio-save";
import { sanitizeClan, sanitizeDisplayName, sanitizeLine, sanitizeWorld, worldLabel } from "@/lib/rsText";
import { paintRSYellow, ensurePlateFont } from "@/lib/draw-banner";
import { LOCATIONS } from "@/lib/locations";
import { drawSafeZoneGhosts, type SafeZone } from "@/lib/bannerFeatures";
import {
  CLIP_ASPECTS,
  CLIP_MARKS,
  CLIP_MAX_BYTES,
  CLIP_WARN_SECONDS,
  clipFileName,
  clipMime,
  coverRect,
  frameStep,
  loadEditPrefs,
  orderInOut,
  releaseVideo,
  saveEditPrefs,
  snapTime,
  snapToPoints,
  timecode,
  type ClipAspect,
} from "@/lib/clip-bench";

type OverlayPos = "off" | "top" | "lower";

export function ClipBench() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const bannerUrl = useRef<string | null>(null);
  const bannerImg = useRef<CanvasImageSource | null>(null);
  const markCache = useRef<Record<string, HTMLImageElement>>({});
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [status, setStatus] = useState("Load a local clip.");
  const [fileLabel, setFileLabel] = useState("");
  const [native, setNative] = useState("");
  const [duration, setDuration] = useState(0);
  const [now, setNow] = useState(0);
  const [inPoint, setInPoint] = useState(0);
  const [outPoint, setOutPoint] = useState(0);
  const [loop, setLoop] = useState(true);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [aspect, setAspect] = useState<ClipAspect>(() => loadEditPrefs().aspect ?? "16x9-720");
  const [overlay, setOverlay] = useState<OverlayPos>(() => loadEditPrefs().overlay ?? "off");
  const [ghost, setGhost] = useState<SafeZone>("none");
  const [edition, setEdition] = useState<"OSRS" | "RS3">("OSRS");
  const [name, setName] = useState("");
  const [clan, setClan] = useState("");
  const [world, setWorld] = useState("");
  const [markId, setMarkId] = useState("none");
  const [moreOpen, setMoreOpen] = useState(false);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [canShareFile, setCanShareFile] = useState(false);
  const [snapOn, setSnapOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [fadeIn, setFadeIn] = useState(0);
  const [fadeOut, setFadeOut] = useState(0);
  const [markers, setMarkers] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [hadAudio, setHadAudio] = useState(true);
  const [hasClip, setHasClip] = useState(false);
  const [fps, setFps] = useState(30);
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [volume, setVolume] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [lowerThird, setLowerThird] = useState(false);
  const [ltText, setLtText] = useState("");
  const [deskName, setDeskName] = useState("");
  const undoRef = useRef<{ inPoint: number; outPoint: number; aspect: ClipAspect; overlay: OverlayPos; muted: boolean }[]>([]);
  const redoRef = useRef<typeof undoRef.current>([]);
  const holdRef = useRef<number | null>(null);
  const hidden = useRef(false);
  const paintArgs = useRef({
    overlay,
    lowerThird,
    ltText,
    deskName,
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
  });
  paintArgs.current = {
    overlay,
    lowerThird,
    ltText,
    deskName,
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
  };

  function pushUndo() {
    undoRef.current = [
      ...undoRef.current.slice(-19),
      { inPoint, outPoint, aspect, overlay, muted },
    ];
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
    const saved = loadStudioSave();
    if (saved.edition === "RS3" || saved.edition === "OSRS") setEdition(saved.edition);
    setDeskName(sanitizeDisplayName(saved.streamer ?? ""));
    setLtText((prev) => prev || sanitizeDisplayName(saved.streamer ?? ""));
    void ensurePlateFont();
    const pull = () => {
      const next = loadStudioSave();
      setDeskName(sanitizeDisplayName(next.streamer ?? ""));
    };
    const onStore = (e: StorageEvent) => {
      if (!e.key || e.key === "rsbs.desk.v1" || e.key === "rs-banner-studio") pull();
    };
    window.addEventListener("storage", onStore);
    const tick = window.setInterval(pull, 1200);
    return () => {
      window.removeEventListener("storage", onStore);
      window.clearInterval(tick);
      releaseVideo(videoRef.current, objectUrl.current);
      objectUrl.current = null;
      if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
      bannerUrl.current = null;
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof (prev as ImageBitmap).close === "function") {
        (prev as ImageBitmap).close();
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.volume = muted ? 0 : volume;
  }, [muted, volume]);

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
      if (document.hidden) {
        videoRef.current?.pause();
        const rec = recorderRef.current;
        if (rec && rec.state !== "inactive") rec.stop();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const size = CLIP_ASPECTS[aspect];

  function paint(canvas: HTMLCanvasElement, video: HTMLVideoElement, ghosts: boolean, w = size.w, h = size.h) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const s = paintArgs.current;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#1a1612";
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
    if (s.lowerThird) {
      const line = sanitizeLine(s.ltText, 24) || sanitizeDisplayName(s.deskName);
      const nameSize = 28;
      const nameY = Math.round(h * 0.82);
      if (line) paintRSYellow(ctx, line, 36, nameY, nameSize);
    }
    const mark = CLIP_MARKS.find((item) => item.id === s.markId && item.id !== "none");
    if (mark?.src) {
      const img = markCache.current[mark.src];
      if (img) ctx.drawImage(img, 36, Math.round(h * 0.72), Math.round(h * 0.08), Math.round(h * 0.08));
    }
    if (ghosts && s.ghost !== "none") drawSafeZoneGhosts(ctx, w, h, s.ghost);
    if (ghosts && aspect === "9x16" && w / h > 1) {
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
        setNow(video.currentTime);
        if (s.loop && s.outPoint > s.inPoint && video.currentTime >= s.outPoint - 0.04) {
          video.currentTime = s.inPoint;
        }
        paint(canvas, video, true);
      }
      const rvfc = video as HTMLVideoElement & {
        requestVideoFrameCallback?: (cb: () => void) => number;
      };
      id = rvfc?.requestVideoFrameCallback ? rvfc.requestVideoFrameCallback(tick) : window.requestAnimationFrame(tick);
    };
    tick();
    return () => {
      live = false;
      const rvfc = videoRef.current as HTMLVideoElement & {
        cancelVideoFrameCallback?: (n: number) => void;
      };
      if (rvfc?.cancelVideoFrameCallback) rvfc.cancelVideoFrameCallback(id);
      else window.cancelAnimationFrame(id);
    };
  }, [hasClip, size.w, size.h]);

  useEffect(() => {
    saveEditPrefs(aspect, overlay);
  }, [aspect, overlay]);

  function useDeskBanner() {
    const saved = loadStudioSave();
    const loc = LOCATIONS.find((item) => item.id === saved.locationId) ?? LOCATIONS.find((item) => item.edition === edition);
    const src = loc ? (saved.view === "b" && loc.viewB ? loc.viewB : loc.viewA) : "";
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
    img.src = src;
  }

  async function holdingCard() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 480;
    const video = videoRef.current;
    if (video) paint(canvas, video, false, 1200, 480);
    else {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#1a1612";
      ctx.fillRect(0, 0, 1200, 480);
      if (bannerImg.current) ctx.drawImage(bannerImg.current, 0, 0, 1200, 480);
      const line = [sanitizeDisplayName(name), sanitizeClan(clan), worldLabel(sanitizeWorld(world))]
        .filter(Boolean)
        .join(" · ");
      ctx.font = `600 28px "Source Sans 3", sans-serif`;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 3;
      ctx.strokeText(line, 48, 420);
      ctx.fillStyle = "#efe0c4";
      ctx.fillText(line, 48, 420);
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
    setStatus("Holding card saved. Nothing uploaded.");
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
    releaseVideo(videoRef.current, objectUrl.current);
    const url = URL.createObjectURL(file);
    objectUrl.current = url;
    const video = videoRef.current;
    if (!video) return;
    video.src = url;
    video.onplay = () => setPlaying(true);
    video.onpause = () => setPlaying(false);
    video.onended = () => setPlaying(false);
    setFileLabel(file.name);
    video.onerror = () => setStatus("Could not read that file.");
    video.onloadedmetadata = () => {
      const dur = video.duration || 0;
      if (!Number.isFinite(dur) || dur <= 0) {
        setStatus("Could not read that file.");
        return;
      }
      setDuration(dur);
      setInPoint(0);
      setOutPoint(dur);
      setViewStart(0);
      setViewEnd(dur);
      setFps(30);
      setMarkers([]);
      setSpeed(1);
      video.playbackRate = 1;
      undoRef.current = [];
      redoRef.current = [];
      setNative(`${video.videoWidth}×${video.videoHeight}`);
      setHasClip(true);
      setStatus(
        dur > CLIP_WARN_SECONDS
          ? "This bench is for clips, not a whole slayer block."
          : `${file.name} · ${timecode(dur)} · ${video.videoWidth}×${video.videoHeight}`,
      );
    };
  }

  async function takeBanner(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
    const url = URL.createObjectURL(file);
    bannerUrl.current = url;
    try {
      const prev = bannerImg.current;
      if (prev && "close" in prev && typeof prev.close === "function") prev.close();
      bannerImg.current = await createImageBitmap(file);
      setStatus("Banner overlay loaded.");
    } catch {
      const img = new Image();
      img.onload = () => {
        bannerImg.current = img;
        setStatus("Banner overlay loaded.");
      };
      img.src = url;
    }
  }

  function snapValue(t: number) {
    const framed = snapTime(t, fps);
    if (!snapOn) return framed;
    const windowSec = frameStep(fps) * 3;
    return snapToPoints(framed, [0, duration, inPoint, outPoint, ...markers], windowSec);
  }

  function seek(next: number) {
    const video = videoRef.current;
    if (!video) return;
    const max = duration || video.duration || 0;
    video.currentTime = Math.max(0, Math.min(max, snapValue(next)));
  }

  function dropMarker() {
    setMarkers((cur) => {
      if (cur.length >= 8) return cur;
      const t = snapOn ? Math.round(now) : snapTime(now, fps);
      if (cur.some((m) => Math.abs(m - t) < 0.05)) return cur;
      return [...cur, t].sort((a, b) => a - b);
    });
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video || !hasClip) return;
    if (video.paused) {
      if (video.currentTime < inPoint || video.currentTime >= outPoint) video.currentTime = inPoint;
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function markIn() {
    pushUndo();
    const t = snapOn ? Math.round(now) : snapTime(now, fps);
    const [a, b] = orderInOut(t, outPoint);
    setInPoint(a);
    setOutPoint(b);
  }

  function markOut() {
    pushUndo();
    const t = snapOn ? Math.round(now) : snapTime(now, fps);
    const [a, b] = orderInOut(inPoint, t);
    setInPoint(a);
    setOutPoint(b);
  }

  function splitAtPlayhead() {
    pushUndo();
    const t = snapOn ? Math.round(now) : snapTime(now, fps);
    if (t - inPoint <= outPoint - t) setInPoint(Math.min(t, outPoint - 0.05));
    else setOutPoint(Math.max(t, inPoint + 0.05));
  }

  function deleteRegion() {
    pushUndo();
    if (now - inPoint < outPoint - now) setInPoint(Math.min(outPoint - 0.05, snapOn ? Math.round(now) : now));
    else setOutPoint(Math.max(inPoint + 0.05, snapOn ? Math.round(now) : now));
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      const video = videoRef.current;
      if (!video) return;
      if (e.key === "Escape") {
        video.pause();
        recorderRef.current?.stop();
        return;
      }
      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        seek(video.currentTime - 2);
        window.clearInterval(holdRef.current ?? 0);
        holdRef.current = window.setInterval(() => seek((videoRef.current?.currentTime ?? 0) - 2), 150);
      }
      if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        seek(video.currentTime + 2);
        window.clearInterval(holdRef.current ?? 0);
        holdRef.current = window.setInterval(() => seek((videoRef.current?.currentTime ?? 0) + 2), 150);
      }
      if (e.key === ",") {
        e.preventDefault();
        seek(video.currentTime - frameStep(fps));
      }
      if (e.key === ".") {
        e.preventDefault();
        seek(video.currentTime + frameStep(fps));
      }
      if (e.key === "+" || e.key === "=") {
        const span = Math.max(5, (viewEnd || duration) - viewStart);
        const mid = (viewStart + (viewEnd || duration)) / 2;
        const next = Math.max(5, span * 0.7);
        setViewStart(Math.max(0, mid - next / 2));
        setViewEnd(Math.min(duration, mid + next / 2));
      }
      if (e.key === "-" || e.key === "_") {
        setViewStart(0);
        setViewEnd(duration);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if (e.key === "i" || e.key === "I") markIn();
      if (e.key === "o" || e.key === "O") markOut();
      if (e.key === "[") seek(video.currentTime - frameStep(fps));
      if (e.key === "]") seek(video.currentTime + frameStep(fps));
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        dropMarker();
      }
    };
    window.addEventListener("keydown", onKey);
    const onUp = (e: KeyboardEvent) => {
      if (e.key === "j" || e.key === "J" || e.key === "l" || e.key === "L") {
        if (holdRef.current) window.clearInterval(holdRef.current);
        holdRef.current = null;
      }
    };
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      if (holdRef.current) window.clearInterval(holdRef.current);
    };
  }, [duration, inPoint, outPoint]);

  async function recordOnce(w: number, h: number) {
    const video = videoRef.current;
    if (!video || !duration) throw new Error("empty");
    const mime = clipMime();
    if (!mime) throw new Error("mime");
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctxTick = () => paint(canvas, video, false, w, h);
    video.muted = muted || speed !== 1;
    video.volume = muted ? 0 : volume;
    video.playbackRate = speed;
    video.currentTime = inPoint;
    await video.play().catch(() => undefined);
    const recStream = canvas.captureStream(30);
    let mix: MediaStream = recStream;
    let audioOk = false;
    try {
      const captured = (video as HTMLVideoElement & { captureStream?: () => MediaStream }).captureStream?.();
      const tracks = captured?.getAudioTracks() ?? [];
      if (tracks.length && !muted) {
        mix = new MediaStream([...recStream.getVideoTracks(), ...tracks]);
        audioOk = true;
      }
    } catch {
      audioOk = false;
    }
    setHadAudio(audioOk);
    const chunks: BlobPart[] = [];
    const recorder = new MediaRecorder(mix, { mimeType: mime });
    recorderRef.current = recorder;
    recorder.ondataavailable = (event) => {
      if (event.data.size) chunks.push(event.data);
    };
    const done = new Promise<Blob>((resolve, reject) => {
      recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
      recorder.onerror = () => reject(new Error("rec"));
    });
    recorder.start(200);
    const pump = window.setInterval(ctxTick, 33);
    await new Promise<void>((resolve) => {
      const watch = () => {
        ctxTick();
        if (video.currentTime >= outPoint - 0.05 || video.ended || recorder.state === "inactive") {
          video.pause();
          window.clearInterval(pump);
          if (recorder.state !== "inactive") recorder.stop();
          resolve();
          return;
        }
        window.requestAnimationFrame(watch);
      };
      watch();
    });
    const blob = await done;
    recorderRef.current = null;
    canvas.width = 1;
    canvas.height = 1;
    return { blob, audioOk };
  }

  async function downloadBlob(blob: Blob, w: number, h: number) {
    const fileName = clipFileName(edition, name, w, h);
    const file = new File([blob], fileName, { type: blob.type || "video/webm" });
    setLastFile(file);
    setCanShareFile(Boolean(navigator.canShare?.({ files: [file] })));
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(href);
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
      /* user cancelled */
    }
  }

  async function exportClip(pair = false) {
    if (!clipMime()) {
      setStatus("This browser cannot encode. Use Chrome or Edge.");
      return;
    }
    setBusy(true);
    setStatus("Making clip…");
    try {
      const first = pair ? CLIP_ASPECTS["16x9-720"] : size;
      const one = await recordOnce(first.w, first.h);
      await downloadBlob(one.blob, first.w, first.h);
      if (pair) {
        const two = await recordOnce(1080, 1920);
        await downloadBlob(two.blob, 1080, 1920);
      }
      setStatus(
        one.audioOk
          ? "WebM saved on this device. Nothing uploaded."
          : "No audio track. WebM saved muted.",
      );
    } catch {
      setStatus(clipMime() ? "Export stopped." : "This browser cannot encode. Use Chrome or Edge.");
    } finally {
      setBusy(false);
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
    setStatus("Export cancelled.");
  }

  return (
    <div>
      <div
        className="bg-[#1a1610]"
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
        <div className="relative mx-auto w-full max-w-[960px] bg-[#120f0c]" style={{ aspectRatio: "16 / 9" }}>
          {!hasClip ? (
            <p className="absolute inset-0 z-10 flex items-center justify-center text-sm text-muted">No clip</p>
          ) : null}
          <canvas
            ref={canvasRef}
            width={size.w}
            height={size.h}
            className="block h-full w-full object-contain"
          />
        </div>
        <video ref={videoRef} className="hidden" playsInline preload="metadata" muted={muted} controls={false} />
        <p className="px-4 py-2 text-center text-[11px] text-muted">
          {fileLabel || "No file"}
          {duration ? ` · ${timecode(duration)}` : ""}
          {native ? ` · ${native}` : ""}
          {` · ${size.w}×${size.h}`}
        </p>
      </div>

      <div className="space-y-3 bg-[#241e16] px-3 py-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40" onClick={() => seek(now - 2)}>
            −2s
          </button>
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40" onClick={() => seek(now - frameStep(fps))}>
            Frame −
          </button>
          <button
            type="button"
            disabled={!hasClip || playing}
            className={
              hasClip
                ? "min-h-12 min-w-12 rounded-md border border-[#c6a45a] bg-[#9b1b1b] px-5 text-sm font-semibold text-[#efe0c4] hover:bg-[#b42323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a45a] disabled:opacity-40"
                : "min-h-12 min-w-12 rounded-md border border-[#3a3228] bg-[#2a241c] px-5 text-sm text-faint"
            }
            onClick={() => {
              if (!playing) togglePlay();
            }}
          >
            Play
          </button>
          <button
            type="button"
            disabled={!hasClip || !playing}
            className="min-h-12 rounded-md border border-[#c6a45a]/40 px-4 text-sm text-parchment disabled:opacity-40"
            onClick={() => {
              if (playing) togglePlay();
            }}
          >
            Pause
          </button>
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40" onClick={() => seek(now + frameStep(fps))}>
            Frame +
          </button>
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40" onClick={() => seek(now + 2)}>
            +2s
          </button>
        </div>

        <div className="relative h-8 overflow-hidden rounded-md bg-[#120f0c]">
          <input
            type="range"
            min={viewStart}
            max={viewEnd || duration || 1}
            step={frameStep(fps)}
            value={Math.min(viewEnd || duration || 1, Math.max(viewStart, now))}
            onChange={(e) => seek(Number(e.target.value))}
            onDoubleClick={() => {
              setViewStart(0);
              setViewEnd(duration);
            }}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            aria-label="Timeline"
          />
          <div className="pointer-events-none absolute inset-y-1 left-0 right-0 mx-1 rounded-sm bg-[#2a241c]" />
          {duration > 0 ? (
            <>
              <div className="pointer-events-none absolute top-1 bottom-1 w-0.5 bg-[#c6a45a]" style={{ left: `${Math.min(100, Math.max(0, (now / duration) * 100))}%` }} />
              <div className="pointer-events-none absolute top-1 h-6 w-0.5 bg-[#c6a45a]" style={{ left: `${Math.min(100, Math.max(0, (inPoint / duration) * 100))}%` }} />
              <div className="pointer-events-none absolute top-1 h-6 w-0.5 bg-[#c6a45a]" style={{ left: `${Math.min(100, Math.max(0, (outPoint / duration) * 100))}%` }} />
            </>
          ) : null}
        </div>
        <div className="flex justify-between font-mono text-[11px] tabular-nums text-faint">
          <span>{timecode(now)}</span>
          <span>{duration ? timecode(Math.max(0, duration - now)) : "00:00.00"}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={!hasClip} className="min-h-11 min-w-[5rem] flex-1 rounded-md border border-[#c6a45a] bg-[#1a1610] text-xs text-parchment disabled:opacity-40" onClick={markIn}>
            In
          </button>
          <button type="button" disabled={!hasClip} className="min-h-11 min-w-[5rem] flex-1 rounded-md border border-[#c6a45a] bg-[#1a1610] text-xs text-parchment disabled:opacity-40" onClick={markOut}>
            Out
          </button>
          <button type="button" disabled={busy || !hasClip} onClick={() => void exportClip(false)} className="min-h-11 min-w-[5rem] flex-1 rounded-md border border-[#c6a45a] bg-[#1a1610] text-xs text-parchment disabled:opacity-40">
            {busy ? "Making clip…" : "Save clip"}
          </button>
          {busy ? (
            <button type="button" className="min-h-11 rounded-md border border-line px-3 text-xs text-muted" onClick={cancelExport}>
              Cancel
            </button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1">
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted disabled:opacity-40" onClick={splitAtPlayhead}>Split</button>
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted disabled:opacity-40" onClick={deleteRegion}>Delete region</button>
          <button type="button" className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted" onClick={undo}>Undo</button>
          <button type="button" className={`min-h-11 rounded-md border px-2 text-[11px] ${snapOn ? "border-parchment" : "border-line"}`} onClick={() => setSnapOn((v) => !v)}>Snap seconds</button>
          <button type="button" disabled={!hasClip} className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted disabled:opacity-40" onClick={() => { pushUndo(); setRotate((v) => (v + 90) % 360); }}>Rotate 90</button>
          <button type="button" className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted" onClick={() => setZoom((v) => Math.min(2, v + 0.1))}>Scale +</button>
          <button type="button" className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted" onClick={() => setZoom((v) => Math.max(1, v - 0.1))}>Scale −</button>
          <button type="button" className={`min-h-11 rounded-md border px-2 text-[11px] ${muted ? "border-parchment" : "border-line"}`} onClick={() => setMuted((v) => !v)}>Mute</button>
          <button type="button" className="min-h-11 rounded-md border border-line px-2 text-[11px] text-muted" onClick={() => { setFadeIn(Math.round(fps * 0.5)); setFadeOut(Math.round(fps * 0.5)); }}>Fade 0.5s</button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["16x9-1080", "16x9-720", "9x16", "1x1"] as ClipAspect[]).map((id) => (
            <button
              key={id}
              type="button"
              className={`min-h-11 rounded-md border px-3 text-[11px] ${aspect === id ? "border-parchment bg-[#1a1610]" : "border-line"}`}
              onClick={() => {
                setAspect(id);
                setStatus(`${CLIP_ASPECTS[id].label} · ${CLIP_ASPECTS[id].w}×${CLIP_ASPECTS[id].h}`);
              }}
            >
              {CLIP_ASPECTS[id].label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={`min-h-11 rounded-md border px-3 text-[11px] ${lowerThird ? "border-parchment bg-[#1a1610]" : "border-line"}`}
            onClick={() => setLowerThird((v) => !v)}
            aria-pressed={lowerThird}
          >
            Lower third
          </button>
          <label className="inline-flex min-h-11 items-center gap-2 text-[11px] text-muted">
            Lower third
            <input
              id="lt"
              value={ltText}
              maxLength={24}
              placeholder="Same letters as the desk"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              enterKeyHint="done"
              className="h-11 min-w-[12rem] rounded-md border border-line bg-[#1a1610] px-2 text-base text-parchment"
              onChange={(e) => setLtText(sanitizeLine(e.target.value, 24))}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-md border border-[#c6a45a]/50 px-3 text-xs text-parchment">
            Upload video
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) takeVideo(file);
                e.target.value = "";
              }}
            />
          </label>
          {lastFile && canShareFile ? (
            <button type="button" className="min-h-11 rounded-md border border-line px-3 text-xs text-parchment" onClick={() => void shareLast()}>
              Share
            </button>
          ) : null}
          <button type="button" className="min-h-11 rounded-md border border-line px-3 text-xs text-muted" onClick={() => setMoreOpen((v) => !v)}>
            {moreOpen ? "Hide more" : "More"}
          </button>
        </div>
        <p className="text-[11px] text-muted">{status}</p>
      </div>

      {moreOpen ? (
        <div className="border-t border-[#c6a45a]/40 bg-[#1a1610] px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-md border border-line px-3 text-xs" onClick={useDeskBanner}>
              Use desk banner
            </button>
            {(["off", "top", "lower"] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                className={`min-h-11 rounded-md border px-3 text-xs ${overlay === pos ? "border-parchment bg-raised" : "border-line"}`}
                onClick={() => setOverlay(pos)}
              >
                {pos === "off" ? "Banner off" : pos === "top" ? "Banner top" : "Banner bottom"}
              </button>
            ))}
            <button type="button" className="min-h-11 rounded-md border border-line px-3 text-xs" onClick={() => void holdingCard()}>
              Holding card
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
