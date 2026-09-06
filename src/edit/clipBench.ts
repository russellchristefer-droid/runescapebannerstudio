export type ClipCrop = "16:9-1080" | "16:9-720" | "9:16" | "1:1" | "native";

type Clip = {
  file: File | null;
  url: string | null;
  video: HTMLVideoElement | null;
  inT: number;
  outT: number;
  duration: number;
  w: number;
  h: number;
  rotation: 0 | 90 | 180 | 270;
  scale: number;
  muted: boolean;
  gain: number;
  fadeIn: number;
  fadeOut: number;
  crop: ClipCrop;
  lowerThirdOn: boolean;
  lowerThird: string;
};

const clip: Clip = {
  file: null,
  url: null,
  video: null,
  inT: 0,
  outT: 0,
  duration: 0,
  w: 0,
  h: 0,
  rotation: 0,
  scale: 1,
  muted: false,
  gain: 1,
  fadeIn: 0,
  fadeOut: 0,
  crop: "native",
  lowerThirdOn: false,
  lowerThird: "",
};

const CROP: Record<ClipCrop, { w: number; h: number }> = {
  "16:9-1080": { w: 1920, h: 1080 },
  "16:9-720": { w: 1280, h: 720 },
  "9:16": { w: 1080, h: 1920 },
  "1:1": { w: 1080, h: 1080 },
  native: { w: 0, h: 0 },
};

function pickMime() {
  if (typeof MediaRecorder === "undefined") return "";
  if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")) return "video/webm;codecs=vp9,opus";
  if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")) return "video/webm;codecs=vp8,opus";
  if (MediaRecorder.isTypeSupported("video/webm")) return "video/webm";
  return "";
}

function paintRSYellow(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number) {
  ctx.font = `700 ${Math.round(size)}px "RS Chat Bold", "RuneScape UF", sans-serif`;
  ctx.textBaseline = "top";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, size * 0.12);
  ctx.strokeStyle = "#000";
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "#ffff00";
  ctx.fillText(text, x, y);
}

export function bindClipBench(opts: {
  video: HTMLVideoElement;
  stage: HTMLCanvasElement;
  fileInput: HTMLInputElement;
  uploadBtn: HTMLButtonElement;
  playBtn: HTMLButtonElement;
  pauseBtn: HTMLButtonElement;
  saveBtn: HTMLButtonElement;
  ltInput: HTMLInputElement;
  ltToggle: HTMLInputElement;
  status: HTMLElement;
}) {
  const { video, stage, fileInput, uploadBtn, playBtn, pauseBtn, saveBtn, ltInput, ltToggle, status } = opts;
  const raw = stage.getContext("2d");
  if (!raw) return () => {};
  const ctx = raw;
  clip.video = video;

  function say(msg: string) {
    status.textContent = msg;
  }
  function revoke() {
    if (clip.url) {
      URL.revokeObjectURL(clip.url);
      clip.url = null;
    }
  }
  function sizeFor() {
    if (clip.crop === "native") return { w: clip.w || 1280, h: clip.h || 720 };
    return CROP[clip.crop];
  }
  function drawFrame() {
    const { w, h } = sizeFor();
    if (stage.width !== w) stage.width = w;
    if (stage.height !== h) stage.height = h;
    ctx.fillStyle = "#0b0a08";
    ctx.fillRect(0, 0, w, h);
    if (!video.videoWidth) return;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate((clip.rotation * Math.PI) / 180);
    ctx.scale(clip.scale, clip.scale);
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const s = Math.max(w / vw, h / vh);
    ctx.drawImage(video, (-vw * s) / 2, (-vh * s) / 2, vw * s, vh * s);
    ctx.restore();
    if (clip.lowerThirdOn && clip.lowerThird.trim()) {
      paintRSYellow(ctx, clip.lowerThird.trim().slice(0, 24), 36, h - 72, Math.max(22, h * 0.04));
    }
  }
  function seek(dt: number) {
    if (!clip.duration) return;
    video.currentTime = Math.min(clip.duration, Math.max(0, video.currentTime + dt));
  }

  const onMeta = () => {
    clip.duration = video.duration || 0;
    clip.w = video.videoWidth;
    clip.h = video.videoHeight;
    clip.inT = 0;
    clip.outT = clip.duration;
    say(`${clip.file?.name ?? "clip"} · ${clip.w}×${clip.h}`);
    document.getElementById("clipEmpty")?.classList.add("hidden");
    drawFrame();
  };
  video.addEventListener("loadedmetadata", onMeta);
  video.addEventListener("timeupdate", drawFrame);
  video.addEventListener("seeked", drawFrame);
  const onPlay = () => playBtn.setAttribute("aria-pressed", "true");
  const onPause = () => playBtn.setAttribute("aria-pressed", "false");
  video.addEventListener("play", onPlay);
  video.addEventListener("pause", onPause);
  const onErr = () => say("Could not read that file.");
  video.addEventListener("error", onErr);

  uploadBtn.type = "button";
  const onUpload = () => fileInput.click();
  uploadBtn.addEventListener("pointerup", onUpload);
  fileInput.accept = "video/mp4,video/webm,video/quicktime";
  const onFile = () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    revoke();
    clip.file = f;
    clip.url = URL.createObjectURL(f);
    video.src = clip.url;
    video.load();
  };
  fileInput.addEventListener("change", onFile);
  playBtn.style.background = "#9b1b1b";
  const onPlayBtn = () => {
    video.play().catch(() => say("Could not play that file."));
  };
  const onPauseBtn = () => video.pause();
  playBtn.addEventListener("pointerup", onPlayBtn);
  pauseBtn.addEventListener("pointerup", onPauseBtn);

  const clicks: [string, () => void][] = [
    ["back2", () => seek(-2)],
    ["fwd2", () => seek(2)],
    ["frameBack", () => seek(-1 / 30)],
    ["frameFwd", () => seek(1 / 30)],
    ["markIn", () => {
      clip.inT = video.currentTime;
      if (clip.inT > clip.outT) clip.outT = clip.duration;
      say(`In ${clip.inT.toFixed(2)}`);
    }],
    ["markOut", () => {
      clip.outT = video.currentTime;
      if (clip.outT < clip.inT) clip.inT = 0;
      say(`Out ${clip.outT.toFixed(2)}`);
    }],
    ["snap", () => {
      video.currentTime = Math.round(video.currentTime);
    }],
    ["rot90", () => {
      clip.rotation = ((clip.rotation + 90) % 360) as Clip["rotation"];
      drawFrame();
    }],
    ["scaleUp", () => {
      clip.scale = Math.min(2, clip.scale * 1.08);
      drawFrame();
    }],
    ["scaleDown", () => {
      clip.scale = Math.max(0.5, clip.scale / 1.08);
      drawFrame();
    }],
    ["mute", () => {
      clip.muted = !clip.muted;
      video.muted = clip.muted;
      say(clip.muted ? "Muted." : "Sound on.");
    }],
    ["fade", () => {
      clip.fadeIn = 0.5;
      clip.fadeOut = 0.5;
      say("Fade 0.5s on export.");
    }],
  ];
  const wired: [HTMLElement, () => void][] = [];
  for (const [id, fn] of clicks) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.addEventListener("pointerup", fn);
    wired.push([el, fn]);
  }
  const cropBtns = [...document.querySelectorAll("[data-crop]")];
  const onCrop = (e: Event) => {
    const b = e.currentTarget as HTMLElement;
    clip.crop = (b.getAttribute("data-crop") || "native") as ClipCrop;
    drawFrame();
  };
  cropBtns.forEach((b) => b.addEventListener("pointerup", onCrop));

  const onLt = () => {
    clip.lowerThirdOn = ltToggle.checked;
    drawFrame();
  };
  ltToggle.addEventListener("change", onLt);
  ltInput.maxLength = 24;
  const onLtType = () => {
    clip.lowerThird = ltInput.value.replace(/[<>]/g, "").slice(0, 24);
    drawFrame();
  };
  ltInput.addEventListener("input", onLtType);

  let rec: MediaRecorder | null = null;
  const onSave = async () => {
    if (!clip.url || !video.videoWidth) {
      say("Upload a clip first.");
      return;
    }
    const mime = pickMime();
    if (!mime) {
      say("This browser cannot export a clip.");
      return;
    }
    const { w, h } = sizeFor();
    stage.width = w;
    stage.height = h;
    const stream = stage.captureStream(30);
    rec = new MediaRecorder(stream, { mimeType: mime });
    const chunks: BlobPart[] = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => {
      const blob = new Blob(chunks, { type: rec?.mimeType || mime });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `clip-${Math.round(clip.inT)}-${Math.round(clip.outT)}.webm`;
      a.click();
      URL.revokeObjectURL(a.href);
      say("Saved.");
    };
    video.currentTime = clip.inT;
    await video.play();
    rec.start();
    const tick = () => {
      drawFrame();
      if (video.currentTime >= clip.outT || video.ended) {
        video.pause();
        rec?.stop();
        video.removeEventListener("timeupdate", tick);
      }
    };
    video.addEventListener("timeupdate", tick);
  };
  saveBtn.addEventListener("pointerup", onSave);
  const onHide = () => revoke();
  window.addEventListener("pagehide", onHide);

  return () => {
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("timeupdate", drawFrame);
    video.removeEventListener("seeked", drawFrame);
    video.removeEventListener("play", onPlay);
    video.removeEventListener("pause", onPause);
    video.removeEventListener("error", onErr);
    uploadBtn.removeEventListener("pointerup", onUpload);
    fileInput.removeEventListener("change", onFile);
    playBtn.removeEventListener("pointerup", onPlayBtn);
    pauseBtn.removeEventListener("pointerup", onPauseBtn);
    saveBtn.removeEventListener("pointerup", onSave);
    ltToggle.removeEventListener("change", onLt);
    ltInput.removeEventListener("input", onLtType);
    cropBtns.forEach((b) => b.removeEventListener("pointerup", onCrop));
    wired.forEach(([el, fn]) => el.removeEventListener("pointerup", fn));
    window.removeEventListener("pagehide", onHide);
    rec?.stop();
    revoke();
  };
}

export { clip };
