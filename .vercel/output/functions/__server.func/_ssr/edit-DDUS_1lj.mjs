import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS } from "./locations-DGhympWJ.mjs";
import { r as readDesk } from "./store-pWHXaoAo.mjs";
import { C as SiteHeader } from "./router-D8oIjQ4W.mjs";
import { a as sanitizeDisplayName, d as worldLabel, r as sanitizeClan, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
import { a as paintRSYellow, n as drawSafeZoneGhosts } from "./draw-banner-B4aWBF2O.mjs";
import { t as StreamDesk } from "./stream-desk-tJfmrnvZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-DDUS_1lj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BAD = /[/\\:*?"<>|\u0000-\u001f]/g;
function slugPart(raw, max = 12) {
	return sanitizeDisplayName(raw).replace(BAD, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max).toLowerCase() || "desk";
}
var CLIP_ASPECTS = {
	"16x9-1080": {
		w: 1920,
		h: 1080,
		label: "1080p 16:9"
	},
	"16x9-720": {
		w: 1280,
		h: 720,
		label: "720p 16:9"
	},
	"9x16": {
		w: 1080,
		h: 1920,
		label: "9:16"
	},
	"1x1": {
		w: 1080,
		h: 1080,
		label: "1:1"
	},
	banner: {
		w: 1200,
		h: 480,
		label: "Banner"
	}
};
var EDIT_PREFS = "rsbs.edit.v1";
var CLIP_MARKS = [
	{
		id: "none",
		name: "None",
		games: ["OSRS", "RS3"],
		src: ""
	},
	{
		id: "iron",
		name: "Ironman",
		games: ["OSRS", "RS3"],
		src: "/marks/osrs-ironman.png"
	},
	{
		id: "fire",
		name: "Fire cape",
		games: ["OSRS"],
		src: "/marks/osrs-fire-cape.png"
	},
	{
		id: "infernal",
		name: "Infernal",
		games: ["OSRS"],
		src: "/marks/osrs-infernal-cape.png"
	},
	{
		id: "tob",
		name: "ToB",
		games: ["OSRS"],
		src: "/marks/osrs-protect-melee.png"
	},
	{
		id: "toa",
		name: "ToA",
		games: ["OSRS"],
		src: "/marks/osrs-protect-magic.png"
	},
	{
		id: "telos",
		name: "Telos",
		games: ["RS3"],
		src: "/marks/rs3-max.png"
	}
];
function clipMime() {
	if (typeof MediaRecorder === "undefined") return "";
	return [
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm",
		"video/mp4;codecs=avc1.42E01E,mp4a.40.2",
		"video/mp4"
	].find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}
function clipExt(mime) {
	return mime.includes("mp4") ? "mp4" : "webm";
}
function clipFileName(edition, name, w, h, mime = "video/webm") {
	return `clip-${slugPart(sanitizeDisplayName(name) || "clip")}-${w}x${h}.${clipExt(mime)}`;
}
function frameStep(fps) {
	return fps > 1 ? 1 / fps : 1 / 30;
}
function snapTime(t, fps) {
	const step = frameStep(fps);
	return Math.round(Math.max(0, t) / step) * step;
}
function orderInOut(a, b) {
	return a <= b ? [a, b] : [b, a];
}
function timecode(seconds) {
	const safe = Math.max(0, seconds);
	const m = Math.floor(safe / 60);
	const s = safe % 60;
	return `${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`;
}
function coverRect(srcW, srcH, dstW, dstH) {
	const srcRatio = srcW / Math.max(1, srcH);
	const dstRatio = dstW / dstH;
	let sx = 0;
	let sy = 0;
	let sw = srcW;
	let sh = srcH;
	if (srcRatio > dstRatio) {
		sw = srcH * dstRatio;
		sx = (srcW - sw) / 2;
	} else {
		sh = srcW / dstRatio;
		sy = (srcH - sh) / 2;
	}
	return {
		sx,
		sy,
		sw,
		sh
	};
}
function loadEditPrefs() {
	try {
		return JSON.parse(localStorage.getItem("rsbs.edit.v1") || "{}");
	} catch {
		return {};
	}
}
function saveEditPrefs(aspect, overlay) {
	try {
		localStorage.setItem(EDIT_PREFS, JSON.stringify({
			aspect,
			overlay
		}));
	} catch {}
}
function peakDb(peak) {
	if (!Number.isFinite(peak) || peak <= .001) return "-∞";
	return `${Math.max(-60, 20 * Math.log10(peak)).toFixed(1)}`;
}
function formatBytes(n) {
	if (!Number.isFinite(n) || n <= 0) return "";
	if (n < 1024) return `${n} B`;
	if (n < 1048576) return `${(n / 1024).toFixed(0)} KB`;
	return `${(n / 1048576).toFixed(1)} MB`;
}
function releaseVideo(video, url) {
	if (video) {
		video.pause();
		video.removeAttribute("src");
		video.load();
	}
	if (url) URL.revokeObjectURL(url);
}
var CHIP = "min-h-11 rounded-md border border-[#c6a45a]/40 bg-[#1a1610] px-3 text-[11px] text-parchment disabled:opacity-40";
var CHIP_ON = "min-h-11 rounded-md border border-parchment bg-[#1a1610] px-3 text-[11px] text-parchment";
function ClipBench() {
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const objectUrl = (0, import_react.useRef)(null);
	const bannerUrl = (0, import_react.useRef)(null);
	const bannerImg = (0, import_react.useRef)(null);
	const markCache = (0, import_react.useRef)({});
	const recorderRef = (0, import_react.useRef)(null);
	const hidden = (0, import_react.useRef)(false);
	const holdRef = (0, import_react.useRef)(null);
	const lastUi = (0, import_react.useRef)(0);
	const audioCtx = (0, import_react.useRef)(null);
	const analyser = (0, import_react.useRef)(null);
	const audioSrc = (0, import_react.useRef)(null);
	const gainNode = (0, import_react.useRef)(null);
	const recDest = (0, import_react.useRef)(null);
	const meterBuf = (0, import_react.useRef)(null);
	const actions = (0, import_react.useRef)({
		togglePlay: () => {},
		seek: (_t) => {},
		markIn: () => {},
		markOut: () => {},
		undo: () => {},
		redo: () => {},
		dropMarker: () => {}
	});
	const [status, setStatus] = (0, import_react.useState)("Drop a clip you own, or upload one.");
	const [fileLabel, setFileLabel] = (0, import_react.useState)("");
	const [native, setNative] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [now, setNow] = (0, import_react.useState)(0);
	const [inPoint, setInPoint] = (0, import_react.useState)(0);
	const [outPoint, setOutPoint] = (0, import_react.useState)(0);
	const [loop, setLoop] = (0, import_react.useState)(true);
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [aspect, setAspect] = (0, import_react.useState)(() => loadEditPrefs().aspect ?? "16x9-720");
	const [overlay, setOverlay] = (0, import_react.useState)(() => loadEditPrefs().overlay ?? "off");
	const [ghost, setGhost] = (0, import_react.useState)("none");
	const [edition, setEdition] = (0, import_react.useState)("OSRS");
	const [name, setName] = (0, import_react.useState)("");
	const [clan, setClan] = (0, import_react.useState)("");
	const [world, setWorld] = (0, import_react.useState)("");
	const [markId, setMarkId] = (0, import_react.useState)("none");
	const [ltOn, setLtOn] = (0, import_react.useState)(false);
	const [ltText, setLtText] = (0, import_react.useState)("");
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [lastFile, setLastFile] = (0, import_react.useState)(null);
	const [canShareFile, setCanShareFile] = (0, import_react.useState)(false);
	const [snapOn, setSnapOn] = (0, import_react.useState)(true);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [fadeIn, setFadeIn] = (0, import_react.useState)(0);
	const [fadeOut, setFadeOut] = (0, import_react.useState)(0);
	const [markers, setMarkers] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hasClip, setHasClip] = (0, import_react.useState)(false);
	const [fps, setFps] = (0, import_react.useState)(30);
	const [viewStart, setViewStart] = (0, import_react.useState)(0);
	const [viewEnd, setViewEnd] = (0, import_react.useState)(0);
	const [opacity, setOpacity] = (0, import_react.useState)(100);
	const [volume, setVolume] = (0, import_react.useState)(1);
	const [gainPct, setGainPct] = (0, import_react.useState)(100);
	const [rotate, setRotate] = (0, import_react.useState)(0);
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [peak, setPeak] = (0, import_react.useState)(0);
	const [hold, setHold] = (0, import_react.useState)(0);
	const [exportPct, setExportPct] = (0, import_react.useState)(0);
	const [fileBytes, setFileBytes] = (0, import_react.useState)(0);
	const [ready, setReady] = (0, import_react.useState)("empty");
	const [hasAudio, setHasAudio] = (0, import_react.useState)(false);
	const undoRef = (0, import_react.useRef)([]);
	const redoRef = (0, import_react.useRef)([]);
	const paintArgs = (0, import_react.useRef)({
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
		ltText
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
		ltText
	};
	const size = CLIP_ASPECTS[aspect];
	const range = Math.max(0, outPoint - inPoint);
	function pushUndo() {
		undoRef.current = [...undoRef.current.slice(-19), {
			inPoint,
			outPoint,
			aspect,
			overlay,
			muted
		}];
		redoRef.current = [];
	}
	function applySnap(next) {
		setInPoint(next.inPoint);
		setOutPoint(next.outPoint);
		setAspect(next.aspect);
		setOverlay(next.overlay);
		setMuted(next.muted);
	}
	(0, import_react.useEffect)(() => {
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
			if (prev && "close" in prev && typeof prev.close === "function") prev.close();
			audioCtx.current?.close();
			audioCtx.current = null;
			analyser.current = null;
			audioSrc.current = null;
			gainNode.current = null;
			recDest.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (video) {
			video.playbackRate = speed;
			video.muted = muted;
		}
		applyLiveGain(video?.currentTime ?? now);
	}, [
		muted,
		gainPct,
		speed,
		fadeIn,
		fadeOut,
		inPoint,
		outPoint,
		fps
	]);
	(0, import_react.useEffect)(() => {
		if (!busy) return;
		const onLeave = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", onLeave);
		return () => window.removeEventListener("beforeunload", onLeave);
	}, [busy]);
	(0, import_react.useEffect)(() => {
		for (const mark of CLIP_MARKS) {
			if (!mark.src || markCache.current[mark.src]) continue;
			const img = new Image();
			img.onload = () => {
				markCache.current[mark.src] = img;
			};
			img.src = mark.src;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			hidden.current = document.hidden;
			if (document.hidden) videoRef.current?.pause();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	function previewSize(exportW, exportH) {
		const scale = Math.min(1, 960 / Math.max(exportW, exportH));
		return {
			w: Math.max(320, Math.round(exportW * scale)),
			h: Math.max(180, Math.round(exportH * scale))
		};
	}
	function paint(canvas, video, ghosts, w = size.w, h = size.h) {
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
			ctx.rotate(s.rotate * Math.PI / 180);
			ctx.scale(s.zoom, s.zoom);
			ctx.translate(-w / 2, -h / 2);
			const box = coverRect(video.videoWidth, video.videoHeight, w, h);
			ctx.drawImage(video, box.sx, box.sy, box.sw, box.sh, 0, 0, w, h);
			ctx.restore();
		}
		const t = video.currentTime || s.now;
		const fadeInSec = s.fadeIn / Math.max(1, s.fps) / Math.max(.25, s.speed);
		const fadeOutSec = s.fadeOut / Math.max(1, s.fps) / Math.max(.25, s.speed);
		let fade = 1;
		if (fadeInSec > 0 && t < s.inPoint + fadeInSec) fade = Math.max(0, (t - s.inPoint) / fadeInSec);
		if (fadeOutSec > 0 && t > s.outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (s.outPoint - t) / fadeOutSec));
		if (fade < 1) {
			ctx.fillStyle = `rgba(0,0,0,${1 - fade})`;
			ctx.fillRect(0, 0, w, h);
		}
		if (s.overlay !== "off" && bannerImg.current) {
			const barH = Math.round(h * (s.overlay === "top" ? .2 : .22));
			const y = s.overlay === "top" ? 0 : h - barH;
			ctx.save();
			ctx.globalAlpha = Math.min(1, Math.max(.6, s.opacity / 100));
			ctx.drawImage(bannerImg.current, 0, y, w, barH);
			ctx.restore();
		}
		const mark = CLIP_MARKS.find((item) => item.id === s.markId && item.id !== "none");
		if (mark?.src) {
			const img = markCache.current[mark.src];
			if (img) ctx.drawImage(img, 36, Math.round(h * .72), Math.round(h * .08), Math.round(h * .08));
		}
		if (s.ltOn) {
			const line = sanitizeDisplayName(s.ltText || "").slice(0, 24);
			if (line) paintRSYellow(ctx, line, 36, h - Math.round(h * .12), Math.max(18, Math.round(h * .045)));
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
	(0, import_react.useEffect)(() => {
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
				if (s.loop && s.outPoint > s.inPoint && t >= s.outPoint - .04) video.currentTime = s.inPoint;
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
						node.getByteTimeDomainData(buf);
						let max = 0;
						for (let i = 0; i < buf.length; i++) {
							const v = Math.abs(buf[i] - 128) / 128;
							if (v > max) max = v;
						}
						setPeak(max);
						setHold((prev) => max > prev ? max : prev * .92);
					} else setPeak(0);
				}
			}
			const rvfc = video;
			id = rvfc?.requestVideoFrameCallback ? rvfc.requestVideoFrameCallback(tick) : window.requestAnimationFrame(tick);
		};
		tick();
		return () => {
			live = false;
			const rvfc = videoRef.current;
			if (rvfc?.cancelVideoFrameCallback) rvfc.cancelVideoFrameCallback(id);
			else window.cancelAnimationFrame(id);
		};
	}, [hasClip]);
	(0, import_react.useEffect)(() => {
		saveEditPrefs(aspect, overlay);
	}, [aspect, overlay]);
	function useDeskBanner() {
		const saved = readDesk();
		const loc = LOCATIONS.find((item) => item.id === saved.locationId) ?? LOCATIONS.find((item) => item.edition === edition);
		const src = saved.stillSrc || (loc ? saved.view === "b" && loc.viewB ? loc.viewB : loc.viewA : "");
		if (!src) {
			setStatus("No desk still saved.");
			return;
		}
		const img = new Image();
		img.onload = async () => {
			const prev = bannerImg.current;
			if (prev && "close" in prev && typeof prev.close === "function") prev.close();
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
			const line = [
				sanitizeDisplayName(name),
				sanitizeClan(clan),
				worldLabel(sanitizeWorld(world))
			].filter(Boolean).join(" · ");
			if (line) {
				ctx.font = `600 28px "Source Sans 3", sans-serif`;
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 3;
				ctx.strokeText(line, 48, 420);
				ctx.fillStyle = "#efe0c4";
				ctx.fillText(line, 48, 420);
			}
		}
		const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", .92));
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
	function fadeMul(t) {
		const fadeInSec = fadeIn / Math.max(1, fps) / Math.max(.25, speed);
		const fadeOutSec = fadeOut / Math.max(1, fps) / Math.max(.25, speed);
		let fade = 1;
		if (fadeInSec > 0 && t < inPoint + fadeInSec) fade = Math.max(0, (t - inPoint) / fadeInSec);
		if (fadeOutSec > 0 && t > outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (outPoint - t) / fadeOutSec));
		return fade;
	}
	function applyLiveGain(t) {
		const node = gainNode.current;
		if (!node) return;
		const base = muted || speed !== 1 ? 0 : Math.max(0, Math.min(2, gainPct / 100));
		node.gain.value = base * fadeMul(t);
	}
	function hookAudio(video) {
		try {
			const AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return;
			if (!audioCtx.current || audioCtx.current.state === "closed") {
				audioCtx.current = new AC();
				audioSrc.current = null;
				gainNode.current = null;
				analyser.current = null;
				recDest.current = null;
			}
			const ctx = audioCtx.current;
			if (!audioSrc.current) audioSrc.current = ctx.createMediaElementSource(video);
			if (!gainNode.current) gainNode.current = ctx.createGain();
			if (!analyser.current) {
				analyser.current = ctx.createAnalyser();
				analyser.current.fftSize = 256;
				meterBuf.current = new Uint8Array(analyser.current.fftSize);
			}
			if (!recDest.current) recDest.current = ctx.createMediaStreamDestination();
			audioSrc.current.disconnect();
			gainNode.current.disconnect();
			audioSrc.current.connect(gainNode.current);
			gainNode.current.connect(analyser.current);
			gainNode.current.connect(ctx.destination);
			gainNode.current.connect(recDest.current);
			video.muted = false;
			video.volume = 1;
			applyLiveGain(video.currentTime || 0);
			ctx.resume();
		} catch {
			analyser.current = null;
			gainNode.current = null;
		}
	}
	function takeVideo(file) {
		if (!(file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|mkv)$/i.test(file.name))) {
			setStatus("Could not read that file.");
			return;
		}
		if (file.size > 524288e3) {
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
			const tracks = video.audioTracks;
			setHasAudio(tracks ? tracks.length > 0 : true);
			hookAudio(video);
			video.play().then(() => video.pause()).catch(() => {});
			setStatus(dur > 180 ? "This bench is for clips, not a whole slayer block." : `${file.name} · ${timecode(dur)} · ${video.videoWidth}×${video.videoHeight} · ${formatBytes(file.size)}`);
		};
	}
	function openClipPicker() {
		fileRef.current?.click();
	}
	function snapValue(t) {
		if (snapOn) return Math.max(0, Math.min(duration || t, Math.round(t)));
		return snapTime(t, fps || 30);
	}
	function seek(next) {
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
			if (cur.some((m) => Math.abs(m - t) < .05)) return cur;
			return [...cur, t].sort((a, b) => a - b);
		});
	}
	function togglePlay() {
		const video = videoRef.current;
		if (!video || !hasClip) return;
		if (video.paused) {
			if (video.currentTime < inPoint || video.currentTime >= outPoint - .04) video.currentTime = inPoint;
			audioCtx.current?.resume();
			video.play();
		} else video.pause();
	}
	function markIn() {
		pushUndo();
		const [a, b] = orderInOut(snapTime(now, fps), outPoint);
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
		setOutPoint(Math.max(inPoint + 1 / (fps || 30), t));
	}
	function deleteRegion() {
		pushUndo();
		setInPoint(0);
		setOutPoint(duration);
		setStatus("In and Out cleared.");
	}
	function snapSeconds() {
		seek(Math.round(now));
		setSnapOn(true);
	}
	function fadeHalf() {
		const frames = Math.max(1, Math.round((fps || 30) * .5));
		setFadeIn(frames);
		setFadeOut(frames);
	}
	function undo() {
		const last = undoRef.current.pop();
		if (!last) return;
		redoRef.current.push({
			inPoint,
			outPoint,
			aspect,
			overlay,
			muted
		});
		applySnap(last);
	}
	function redo() {
		const last = redoRef.current.pop();
		if (!last) return;
		undoRef.current.push({
			inPoint,
			outPoint,
			aspect,
			overlay,
			muted
		});
		applySnap(last);
	}
	actions.current = {
		togglePlay,
		seek,
		markIn,
		markOut,
		undo,
		redo,
		dropMarker
	};
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const el = e.target;
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
		const onUp = (e) => {
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
	async function recordOnce(w, h) {
		const video = videoRef.current;
		if (!video?.src || !Number.isFinite(video.duration)) throw new Error("empty");
		const mime = clipMime();
		if (typeof MediaRecorder === "undefined") throw new Error("mime");
		const inT = Math.max(0, Math.min(inPoint, video.duration - .05));
		const outT = Math.max(inT + .05, Math.min(outPoint || video.duration, video.duration));
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
		video.muted = muted;
		video.volume = muted ? 0 : 1;
		video.playbackRate = speed === 1 ? 1 : speed;
		video.currentTime = inT;
		await new Promise((resolve) => {
			const ready = () => {
				video.removeEventListener("seeked", ready);
				resolve();
			};
			video.addEventListener("seeked", ready);
			window.setTimeout(resolve, 500);
		});
		ctxTick();
		const recStream = canvas.captureStream(30);
		let mix = recStream;
		let audioOk = false;
		const processed = recDest.current?.stream.getAudioTracks() ?? [];
		const rawAudio = (video.captureStream?.() ?? video.mozCaptureStream?.())?.getAudioTracks() ?? [];
		const audioTracks = processed.length ? processed : rawAudio;
		if (audioTracks.length && !muted && speed === 1) {
			mix = new MediaStream([...recStream.getVideoTracks(), ...audioTracks]);
			audioOk = true;
		}
		const chunks = [];
		let recorder;
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
		const done = new Promise((resolve, reject) => {
			recorder.onstop = () => resolve(new Blob(chunks, { type: recorder.mimeType || mime || "video/webm" }));
			recorder.onerror = () => reject(/* @__PURE__ */ new Error("rec"));
		});
		recorder.start(200);
		await video.play().catch(() => void 0);
		await new Promise((resolve) => {
			const watch = () => {
				ctxTick();
				const spanOut = Math.max(.05, outT - inT);
				setExportPct(Math.min(100, Math.max(0, (video.currentTime - inT) / spanOut * 100)));
				if (video.currentTime >= outT - .04 || video.ended || recorder.state === "inactive") {
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
			}, Math.min(12e4, (outT - inT) * 1e3 + 2e3));
		});
		const blob = await done;
		recorderRef.current = null;
		canvas.remove();
		if (blob.size < 64) throw new Error("empty-blob");
		return {
			blob,
			audioOk,
			mime: recorder.mimeType || mime || "video/webm"
		};
	}
	async function downloadBlob(blob, w, h, mime = blob.type) {
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
				text: "Clip from RuneScape Banner Studio (fan desk, not Jagex)."
			});
		} catch {}
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
			setStatus(one.audioOk ? "Clip saved on this device." : "Clip saved. No audio track in that file.");
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
		} catch {}
		videoRef.current?.pause();
		setBusy(false);
		setExportPct(0);
		setStatus("Export cancelled.");
	}
	const span = Math.max(.001, (viewEnd || duration) - viewStart);
	const pct = (t) => `${Math.min(100, Math.max(0, (t - viewStart) / span * 100))}%`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id: "clip-file",
			ref: fileRef,
			type: "file",
			accept: "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov",
			className: "sr-only",
			onChange: (e) => {
				const file = e.target.files?.[0];
				e.target.value = "";
				if (file) takeVideo(file);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-[#1a1610]",
			onDragOver: (e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "copy";
			},
			onDrop: (e) => {
				e.preventDefault();
				const file = e.dataTransfer.files[0];
				if (file?.type.startsWith("image/")) takeBanner(file);
				else if (file) takeVideo(file);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto w-full max-w-[960px] overflow-hidden bg-[#120f0c]",
					style: { aspectRatio: "16 / 9" },
					children: [
						!hasClip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: ready === "loading" ? "Reading clip…" : "No clip"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								id: "clip-upload",
								type: "button",
								className: "pointer-events-auto min-h-11 rounded-md border border-[#c6a45a] bg-[#241e16] px-4 text-sm text-parchment",
								onClick: openClipPicker,
								children: "Upload video"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: canvasRef,
							className: "block h-full w-full object-contain"
						}),
						hasClip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col justify-between p-2 font-mono text-[10px] tabular-nums text-[#efe4c8]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: busy ? "rounded-sm bg-[#9b1b1b] px-1.5 py-0.5 font-semibold tracking-widest" : "rounded-sm bg-black/55 px-1.5 py-0.5",
										children: busy ? "REC" : playing ? "PLAY" : "STOP"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-sm bg-black/55 px-1.5 py-0.5",
										children: timecode(now)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-sm bg-black/55 px-1.5 py-0.5",
										children: [
											muted ? "MUTE" : `${gainPct}%`,
											" · ",
											peakDb(hold),
											" dBFS"
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-sm bg-black/55 px-1.5 py-0.5",
									children: [
										"IN ",
										timecode(inPoint),
										" · OUT ",
										timecode(outPoint)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-16 w-3 flex-col-reverse overflow-hidden rounded-sm bg-black/55 ring-1 ring-[#c6a45a]/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-full",
										style: {
											height: `${Math.min(100, peak * 100)}%`,
											background: peak > .95 ? "#9b1b1b" : peak > .7 ? "#c6a45a" : "#7a9b3a"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-0 w-full bg-[#efe4c8]",
										style: {
											bottom: `${Math.min(100, hold * 100)}%`,
											height: 2
										}
									})]
								})]
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					className: "pointer-events-none absolute h-px w-px opacity-0",
					playsInline: true,
					preload: "metadata",
					muted,
					controls: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-x-3 gap-y-1 px-4 py-2 font-mono text-[11px] tabular-nums text-muted sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["TC ", hasClip ? timecode(now) : "00:00.00"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["DUR ", hasClip ? timecode(range) : "00:00.00"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["SRC ", native || "—"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"OUT ",
							size.w,
							"×",
							size.h
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["IN ", hasClip ? timecode(inPoint) : "00:00.00"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["OUT ", hasClip ? timecode(outPoint) : "00:00.00"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"PK ",
							peakDb(hold),
							" dBFS",
							hold > .95 ? " CLIP" : ""
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							ready === "ready" ? "READY" : ready === "loading" ? "LOAD" : ready === "bad" ? "BAD FILE" : "IDLE",
							muted ? " · MUTE" : ` · ${gainPct}%`,
							loop ? " · LOOP" : "",
							speed !== 1 ? ` · ${speed}×` : ""
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 bg-[#241e16] px-3 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-9 overflow-hidden rounded-md bg-[#120f0c]",
					children: [duration > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-x-0 bottom-0 flex h-2",
							children: Array.from({ length: 9 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1 border-l border-[#c6a45a]/25" }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-y-1 rounded-sm bg-[#c6a45a]/25",
							style: {
								left: pct(inPoint),
								width: `calc(${pct(outPoint)} - ${pct(inPoint)})`
							}
						}),
						markers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "absolute top-1 z-10 h-7 w-0.5 bg-[#e4c36a]",
							style: { left: pct(m) },
							"aria-label": `Marker ${timecode(m)}`,
							onClick: () => seek(m)
						}, m)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute top-1 bottom-1 w-0.5 bg-[#efe4c8]",
							style: { left: pct(now) }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute top-1 h-7 w-0.5 bg-[#c6a45a]",
							style: { left: pct(inPoint) }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute top-1 h-7 w-0.5 bg-[#c6a45a]",
							style: { left: pct(outPoint) }
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-1 left-1 right-1 rounded-sm bg-[#2a241c]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: viewStart,
						max: viewEnd || duration || 1,
						step: frameStep(fps),
						value: Math.min(viewEnd || duration || 1, Math.max(viewStart, now)),
						disabled: !hasClip,
						onChange: (e) => seek(Number(e.target.value)),
						onDoubleClick: () => {
							setViewStart(0);
							setViewEnd(duration);
						},
						className: "absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0",
						"aria-label": "Timeline"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between font-mono text-[11px] tabular-nums text-faint",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timecode(now) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration ? `−${timecode(Math.max(0, duration - now))}` : "00:00.00" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => seek(now - 2),
							children: "−2s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => seek(now - frameStep(fps)),
							children: "Frame −"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: hasClip ? "min-h-12 min-w-16 rounded-md border border-[#c6a45a] bg-[#9b1b1b] px-5 text-sm font-semibold text-[#efe0c4] hover:bg-[#b42323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a45a]" : "min-h-12 min-w-16 rounded-md border border-[#3a3228] bg-[#2a241c] px-5 text-sm text-faint",
							onClick: togglePlay,
							children: playing ? "Pause" : "Play"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => seek(now + frameStep(fps)),
							children: "Frame +"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => seek(now + 2),
							children: "+2s"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 rounded-md border border-[#c6a45a]/25 bg-[#1a1610] px-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "w-full text-[10px] tracking-wide text-faint sm:w-auto",
							children: "Sound"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: muted ? CHIP_ON : CHIP,
							onClick: () => setMuted((v) => !v),
							children: "Mute"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "inline-flex min-h-11 items-center gap-2 text-[11px] text-muted",
							children: [
								"Gain",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 200,
									step: 1,
									value: gainPct,
									disabled: muted,
									onChange: (e) => setGainPct(Number(e.target.value)),
									className: "h-11 w-36 accent-[#c6a45a]",
									"aria-label": "Gain percent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-10 font-mono tabular-nums text-parchment",
									children: [gainPct, "%"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: fadeIn > 0 ? CHIP_ON : CHIP,
							onClick: () => setFadeIn((v) => v > 0 ? 0 : Math.round(fps * .5)),
							children: "Fade in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: fadeOut > 0 ? CHIP_ON : CHIP,
							onClick: () => setFadeOut((v) => v > 0 ? 0 : Math.round(fps * .5)),
							children: "Fade out"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative inline-flex h-11 w-4 overflow-hidden rounded-sm border border-[#c6a45a]/40 bg-[#120f0c]",
							title: `${peakDb(hold)} dBFS`,
							"aria-label": `Peak ${peakDb(hold)} dBFS`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute bottom-0 w-full",
								style: {
									height: `${Math.min(100, peak * 100)}%`,
									background: peak > .95 ? "#9b1b1b" : peak > .7 ? "#c6a45a" : "#7a9b3a"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute w-full bg-[#efe4c8]",
								style: {
									bottom: `${Math.min(100, hold * 100)}%`,
									height: 2
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] tabular-nums text-muted",
							children: [peakDb(hold), " dB"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${CHIP} pointer-events-auto`,
							onClick: openClipPicker,
							children: "Upload video"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: markIn,
							children: "In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: markOut,
							children: "Out"
						}),
						busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: CHIP,
							onClick: cancelExport,
							children: "Cancel"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => void exportClip(false),
							children: "Save clip"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: splitAtPlayhead,
							children: "Split"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: deleteRegion,
							children: "Delete region"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: snapOn ? CHIP_ON : CHIP,
							onClick: snapSeconds,
							children: "Snap seconds"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => {
								pushUndo();
								setRotate((v) => (v + 90) % 360);
							},
							children: "Rotate 90"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => setZoom((v) => Math.min(2, +(v + .1).toFixed(2))),
							children: "Scale +"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: CHIP,
							onClick: () => setZoom((v) => Math.max(.5, +(v - .1).toFixed(2))),
							children: "Scale −"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: fadeIn > 0 && fadeOut > 0 ? CHIP_ON : CHIP,
							onClick: fadeHalf,
							children: "Fade 0.5s"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: loop ? CHIP_ON : CHIP,
							onClick: () => setLoop((v) => !v),
							children: "Loop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: CHIP,
							onClick: undo,
							children: "Undo"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: ltOn ? CHIP_ON : CHIP,
						onClick: () => {
							setLtOn((on) => {
								const next = !on;
								if (next && !ltText) setLtText(sanitizeDisplayName(readDesk().streamer ?? name).slice(0, 24));
								return next;
							});
						},
						children: "Lower third"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex min-h-11 items-center gap-2 text-[11px] text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Lower third text"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ltText,
							maxLength: 24,
							placeholder: "Lower third",
							spellCheck: false,
							autoComplete: "off",
							className: "min-h-11 w-40 rounded-md border border-[#c6a45a]/40 bg-[#120f0c] px-2 text-sm text-parchment",
							onChange: (e) => setLtText(sanitizeDisplayName(e.target.value).slice(0, 24))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						[
							"16x9-1080",
							"16x9-720",
							"9x16",
							"1x1"
						].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: aspect === id ? CHIP_ON : CHIP,
							onClick: () => {
								setAspect(id);
								setStatus(`${CLIP_ASPECTS[id].label} · ${CLIP_ASPECTS[id].w}×${CLIP_ASPECTS[id].h}`);
							},
							children: CLIP_ASPECTS[id].label
						}, id)),
						lastFile && canShareFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: CHIP,
							onClick: () => void shareLast(),
							children: "Share"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: CHIP,
							onClick: () => setMoreOpen((v) => !v),
							children: moreOpen ? "Hide more" : "More"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted",
					"aria-live": "polite",
					children: [busy ? `Making clip… ${Math.round(exportPct)}%` : status, fileLabel && !busy ? ` · ${fileLabel}` : ""]
				}),
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 overflow-hidden rounded-sm bg-[#120f0c]",
					role: "progressbar",
					"aria-valuenow": Math.round(exportPct),
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-[#9b1b1b]",
						style: { width: `${exportPct}%` }
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-faint",
					children: "Space play · I / O marks · J / L skip · , . frames. Don’t export a Bank PIN."
				})
			]
		}),
		moreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 border-t border-[#c6a45a]/40 bg-[#1a1610] px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: CHIP,
						onClick: useDeskBanner,
						children: "Use desk banner"
					}),
					[
						"off",
						"top",
						"lower"
					].map((pos) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: overlay === pos ? CHIP_ON : CHIP,
						onClick: () => setOverlay(pos),
						children: pos === "off" ? "Banner off" : pos === "top" ? "Banner top" : "Banner bottom"
					}, pos)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: CHIP,
						onClick: () => void holdingCard(),
						children: "Holding card"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !hasClip,
						className: CHIP,
						onClick: () => void exportClip(true),
						children: "Save 16:9 + 9:16"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: CHIP,
						onClick: () => {
							pushUndo();
							setRotate((v) => (v + 90) % 360);
						},
						children: "Rotate 90"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: CHIP,
						onClick: () => setZoom((v) => Math.min(2, +(v + .1).toFixed(2))),
						children: "Scale +"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: CHIP,
						onClick: () => setZoom((v) => Math.max(.5, +(v - .1).toFixed(2))),
						children: "Scale −"
					}),
					[
						.5,
						1,
						1.5,
						2
					].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: speed === rate ? CHIP_ON : CHIP,
						onClick: () => setSpeed(rate),
						children: [rate, "×"]
					}, rate))
				]
			})]
		}) : null
	] });
	async function takeBanner(file) {
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
function EditPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { skip: {
			href: "#content",
			label: "Skip to clips"
		} }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "content",
			className: "mx-auto max-w-[72rem] px-3 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-3 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "page-h1 m-0 text-left",
								children: "Clips"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-wide text-muted",
								children: "Local clips. Not a live studio."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-[#c6a45a]/80",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipBench, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-4 list-decimal space-y-1 pl-5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Upload a clip you own." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set In and Out on the timeline." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick a size, then Save clip. The file stays on this device." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamDesk, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-faint",
					children: "Banners are on the home desk."
				})
			]
		})]
	});
}
//#endregion
export { EditPage as component };
