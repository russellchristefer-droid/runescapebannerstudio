import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS } from "./locations-CLZLnwld.mjs";
import { t as loadStudioSave } from "./studio-save-BZUmR0QZ.mjs";
import { s as BackLink } from "./router-DXmYNu76.mjs";
import { a as sanitizeDisplayName, d as worldLabel, r as sanitizeClan, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
import { t as drawSafeZoneGhosts } from "./bannerFeatures-LfEr2lXW.mjs";
import { t as StreamDesk } from "./stream-desk-CT0haNmA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit-CNg57khO.js
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
		label: "Twitch / YT 16:9"
	},
	"16x9-720": {
		w: 1280,
		h: 720,
		label: "Light 16:9"
	},
	"9x16": {
		w: 1080,
		h: 1920,
		label: "TikTok 9:16"
	},
	banner: {
		w: 1200,
		h: 480,
		label: "Banner-match"
	}
};
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
var CLIP_CAPTIONS = [
	"None",
	"First kc",
	"Wipe",
	"Inferno attempt",
	"99",
	"Learner",
	"Enrage",
	"Custom"
];
function clipMime() {
	const types = [
		"video/webm;codecs=vp9,opus",
		"video/webm;codecs=vp8,opus",
		"video/webm"
	];
	if (typeof MediaRecorder === "undefined") return "";
	return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}
function clipFileName(edition, name, w, h) {
	return `clip-${edition === "OSRS" ? "osrs" : "rs3"}-${slugPart(sanitizeDisplayName(name) || "clip")}-${w}x${h}.webm`;
}
function frameStep(fps) {
	return fps > 1 ? 1 / fps : 1 / 30;
}
function snapTime(t, fps) {
	const step = frameStep(fps);
	return Math.round(Math.max(0, t) / step) * step;
}
function snapToPoints(t, points, windowSec) {
	let best = t;
	let dist = windowSec;
	for (const p of points) {
		const d = Math.abs(p - t);
		if (d <= dist) {
			dist = d;
			best = p;
		}
	}
	return best;
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
function releaseVideo(video, url) {
	if (video) {
		video.pause();
		video.removeAttribute("src");
		video.load();
	}
	if (url) URL.revokeObjectURL(url);
}
function ClipBench() {
	const videoRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const objectUrl = (0, import_react.useRef)(null);
	const bannerUrl = (0, import_react.useRef)(null);
	const bannerImg = (0, import_react.useRef)(null);
	const markCache = (0, import_react.useRef)({});
	const recorderRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("Load a local clip.");
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
	const [caption, setCaption] = (0, import_react.useState)("None");
	const [customCaption, setCustomCaption] = (0, import_react.useState)("");
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	const [lastFile, setLastFile] = (0, import_react.useState)(null);
	const [canShareFile, setCanShareFile] = (0, import_react.useState)(false);
	const [snapOn, setSnapOn] = (0, import_react.useState)(true);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [fadeIn, setFadeIn] = (0, import_react.useState)(0);
	const [fadeOut, setFadeOut] = (0, import_react.useState)(0);
	const [markers, setMarkers] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hadAudio, setHadAudio] = (0, import_react.useState)(true);
	const [hasClip, setHasClip] = (0, import_react.useState)(false);
	const [fps, setFps] = (0, import_react.useState)(30);
	const [viewStart, setViewStart] = (0, import_react.useState)(0);
	const [viewEnd, setViewEnd] = (0, import_react.useState)(0);
	const [opacity, setOpacity] = (0, import_react.useState)(100);
	const undoRef = (0, import_react.useRef)([]);
	const redoRef = (0, import_react.useRef)([]);
	const holdRef = (0, import_react.useRef)(null);
	const hidden = (0, import_react.useRef)(false);
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
		const saved = loadStudioSave();
		if (saved.edition === "RS3" || saved.edition === "OSRS") setEdition(saved.edition);
		if (saved.streamer) setName(sanitizeDisplayName(saved.streamer));
		if (saved.clan) setClan(sanitizeClan(saved.clan));
		if (saved.world) setWorld(sanitizeWorld(saved.world));
		return () => {
			releaseVideo(videoRef.current, objectUrl.current);
			objectUrl.current = null;
			if (bannerUrl.current) URL.revokeObjectURL(bannerUrl.current);
			bannerUrl.current = null;
			const prev = bannerImg.current;
			if (prev && "close" in prev && typeof prev.close === "function") prev.close();
		};
	}, []);
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
	const gameLine = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
	function paint(canvas, video, ghosts, w = size.w, h = size.h) {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = w;
		canvas.height = h;
		ctx.fillStyle = "#1a1612";
		ctx.fillRect(0, 0, w, h);
		if (video.readyState >= 2 && video.videoWidth) {
			const box = coverRect(video.videoWidth, video.videoHeight, w, h);
			ctx.drawImage(video, box.sx, box.sy, box.sw, box.sh, 0, 0, w, h);
		}
		const t = video.currentTime || now;
		const fadeInSec = fadeIn / Math.max(1, fps) / Math.max(.25, speed);
		const fadeOutSec = fadeOut / Math.max(1, fps) / Math.max(.25, speed);
		let fade = 1;
		if (fadeInSec > 0 && t < inPoint + fadeInSec) fade = Math.max(0, (t - inPoint) / fadeInSec);
		if (fadeOutSec > 0 && t > outPoint - fadeOutSec) fade = Math.min(fade, Math.max(0, (outPoint - t) / fadeOutSec));
		if (fade < 1) {
			ctx.fillStyle = `rgba(0,0,0,${1 - fade})`;
			ctx.fillRect(0, 0, w, h);
		}
		if (overlay !== "off" && bannerImg.current) {
			const barH = Math.round(h * (overlay === "top" ? .2 : .22));
			const y = overlay === "top" ? 0 : h - barH;
			ctx.save();
			ctx.globalAlpha = Math.min(1, Math.max(.6, opacity / 100));
			ctx.drawImage(bannerImg.current, 0, y, w, barH);
			ctx.restore();
		}
		const label = sanitizeDisplayName(name);
		const house = sanitizeClan(clan);
		const worldLine = worldLabel(sanitizeWorld(world));
		const cap = caption === "None" ? "" : caption === "Custom" ? customCaption.slice(0, 48) : caption;
		const mark = CLIP_MARKS.find((item) => item.id === markId && item.id !== "none");
		ctx.textAlign = "left";
		ctx.font = `600 ${Math.round(h * .035)}px "Source Sans 3", sans-serif`;
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 3;
		const textY = overlay === "top" ? Math.round(h * .28) : Math.round(h * .9);
		const line = [
			label,
			house,
			worldLine,
			cap,
			gameLine
		].filter(Boolean).join(" · ");
		ctx.strokeText(line, 36, textY);
		ctx.fillStyle = "#efe0c4";
		ctx.fillText(line, 36, textY);
		if (mark?.src) {
			const img = markCache.current[mark.src];
			if (img) ctx.drawImage(img, 36, textY - Math.round(h * .12), Math.round(h * .08), Math.round(h * .08));
		}
		if (ghosts && ghost !== "none") drawSafeZoneGhosts(ctx, w, h, ghost);
		if (ghosts && aspect === "9x16" && w / h > 1) {
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
			if (video && canvas) {
				setNow(video.currentTime);
				if (loop && outPoint > inPoint && video.currentTime >= outPoint - .04) video.currentTime = inPoint;
				paint(canvas, video, true);
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
	}, [
		aspect,
		overlay,
		name,
		clan,
		world,
		edition,
		loop,
		inPoint,
		outPoint,
		ghost,
		size.w,
		size.h,
		opacity,
		markId,
		caption,
		customCaption,
		fadeIn,
		fadeOut,
		speed,
		fps,
		now
	]);
	function useDeskBanner() {
		const saved = loadStudioSave();
		const loc = LOCATIONS.find((item) => item.id === saved.locationId) ?? LOCATIONS.find((item) => item.edition === edition);
		const src = loc ? saved.view === "b" && loc.viewB ? loc.viewB : loc.viewA : "";
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
			const line = [
				sanitizeDisplayName(name),
				sanitizeClan(clan),
				worldLabel(sanitizeWorld(world)),
				gameLine
			].filter(Boolean).join(" · ");
			ctx.font = `600 28px "Source Sans 3", sans-serif`;
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 3;
			ctx.strokeText(line, 48, 420);
			ctx.fillStyle = "#efe0c4";
			ctx.fillText(line, 48, 420);
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
		setStatus("Holding card saved. Nothing uploaded.");
	}
	function takeVideo(file) {
		if (!file.type.startsWith("video/")) {
			setStatus("That is not a video file.");
			return;
		}
		if (file.size > 524288e3) {
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
		video.onerror = () => setStatus("This file cannot be read here.");
		video.onloadedmetadata = () => {
			const dur = video.duration || 0;
			if (!Number.isFinite(dur) || dur <= 0) {
				setStatus("This file cannot be read here.");
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
			setStatus(dur > 180 ? "This bench is for clips, not a whole slayer block." : `${file.name} · ${timecode(dur)} · ${video.videoWidth}×${video.videoHeight}`);
		};
	}
	async function takeBanner(file) {
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
	function snapValue(t) {
		const framed = snapTime(t, fps);
		if (!snapOn) return framed;
		const windowSec = frameStep(fps) * 3;
		return snapToPoints(framed, [
			0,
			duration,
			inPoint,
			outPoint,
			...markers
		], windowSec);
	}
	function seek(next) {
		const video = videoRef.current;
		if (!video) return;
		const max = duration || video.duration || 0;
		video.currentTime = Math.max(0, Math.min(max, snapValue(next)));
	}
	function dropMarker() {
		setMarkers((cur) => {
			if (cur.length >= 8) return cur;
			const t = snapTime(now, fps);
			if (cur.some((m) => Math.abs(m - t) < frameStep(fps))) return cur;
			return [...cur, t].sort((a, b) => a - b);
		});
	}
	function togglePlay() {
		const video = videoRef.current;
		if (!video || !hasClip) return;
		if (video.paused) {
			if (video.currentTime < inPoint || video.currentTime >= outPoint) video.currentTime = inPoint;
			video.play();
			setPlaying(true);
		} else {
			video.pause();
			setPlaying(false);
		}
	}
	function markIn() {
		pushUndo();
		const [a, b] = orderInOut(snapTime(now, fps), outPoint);
		setInPoint(a);
		setOutPoint(b);
	}
	function markOut() {
		pushUndo();
		const t = snapTime(now, fps);
		const [a, b] = orderInOut(inPoint, t);
		setInPoint(a);
		setOutPoint(b);
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
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const el = e.target;
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
				const next = Math.max(5, span * .7);
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
		const onUp = (e) => {
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
	}, [
		duration,
		inPoint,
		outPoint
	]);
	async function recordOnce(w, h) {
		const video = videoRef.current;
		if (!video || !duration) throw new Error("empty");
		const mime = clipMime();
		if (!mime) throw new Error("mime");
		const canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		const ctxTick = () => paint(canvas, video, false, w, h);
		video.muted = muted || speed !== 1;
		video.playbackRate = speed;
		video.currentTime = inPoint;
		await video.play().catch(() => void 0);
		const recStream = canvas.captureStream(30);
		let mix = recStream;
		let audioOk = false;
		try {
			const tracks = (video.captureStream?.())?.getAudioTracks() ?? [];
			if (tracks.length && !muted) {
				mix = new MediaStream([...recStream.getVideoTracks(), ...tracks]);
				audioOk = true;
			}
		} catch {
			audioOk = false;
		}
		setHadAudio(audioOk);
		const chunks = [];
		const recorder = new MediaRecorder(mix, { mimeType: mime });
		recorderRef.current = recorder;
		recorder.ondataavailable = (event) => {
			if (event.data.size) chunks.push(event.data);
		};
		const done = new Promise((resolve, reject) => {
			recorder.onstop = () => resolve(new Blob(chunks, { type: "video/webm" }));
			recorder.onerror = () => reject(/* @__PURE__ */ new Error("rec"));
		});
		recorder.start(200);
		const pump = window.setInterval(ctxTick, 33);
		await new Promise((resolve) => {
			const watch = () => {
				ctxTick();
				if (video.currentTime >= outPoint - .05 || video.ended || recorder.state === "inactive") {
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
		return {
			blob,
			audioOk
		};
	}
	async function downloadBlob(blob, w, h) {
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
				text: "Clip from RuneScape Banner Studio (fan desk, not Jagex)."
			});
		} catch {}
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
			if (pair) await downloadBlob((await recordOnce(1080, 1920)).blob, 1080, 1920);
			setStatus(one.audioOk ? "WebM saved on this device. Nothing uploaded." : "No audio track. WebM saved muted.");
		} catch {
			setStatus(clipMime() ? "Export stopped." : "This browser cannot encode. Use Chrome or Edge.");
		} finally {
			setBusy(false);
		}
	}
	function cancelExport() {
		try {
			recorderRef.current?.stop();
		} catch {}
		videoRef.current?.pause();
		setBusy(false);
		setStatus("Export cancelled.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-[#c6a45a]/40 bg-[#2a2218]",
			onDragOver: (e) => {
				e.preventDefault();
				e.dataTransfer.dropEffect = "copy";
			},
			onDrop: (e) => {
				e.preventDefault();
				const file = e.dataTransfer.files[0];
				if (file) takeVideo(file);
			},
			children: [
				!hasClip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-16 text-center text-sm text-muted",
					children: "Drop a kill clip here."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto aspect-video max-h-[52vh] w-full max-w-[1280px] bg-[#1a1612]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						width: size.w,
						height: size.h,
						className: "block h-full w-full object-contain"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					className: "hidden",
					playsInline: true,
					preload: "metadata",
					muted,
					controls: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 py-2 text-[11px] text-faint",
					children: [
						fileLabel || "No file",
						duration ? ` · ${timecode(duration)}` : "",
						native ? ` · ${native}` : ""
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-center gap-2 bg-[#241e16] px-3 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !hasClip,
					className: "min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40",
					onClick: () => seek(now - 2),
					children: "−2s"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !hasClip,
					className: "min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40",
					onClick: () => seek(now - frameStep(fps)),
					children: "Frame −"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !hasClip,
					className: hasClip ? "min-h-12 min-w-12 rounded-md border border-[#c6a45a] bg-[#9b1b1b] px-5 text-sm font-semibold text-[#efe0c4] hover:bg-[#b42323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a45a]" : "min-h-12 min-w-12 rounded-md border border-[#3a3228] bg-[#2a241c] px-5 text-sm text-faint",
					onClick: togglePlay,
					children: playing ? "Pause" : "Play"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !hasClip,
					className: "min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40",
					onClick: () => seek(now + frameStep(fps)),
					children: "Frame +"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !hasClip,
					className: "min-h-11 rounded-md border border-[#c6a45a]/40 px-3 text-[11px] text-parchment disabled:opacity-40",
					onClick: () => seek(now + 2),
					children: "+2s"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-[#1a1610] px-3 pb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-8 overflow-hidden rounded-b-md bg-[#120f0c]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: viewStart,
							max: viewEnd || duration || 1,
							step: frameStep(fps),
							value: Math.min(viewEnd || duration || 1, Math.max(viewStart, now)),
							onChange: (e) => seek(Number(e.target.value)),
							onDoubleClick: () => {
								setViewStart(0);
								setViewEnd(duration);
							},
							className: "absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0",
							"aria-label": "Timeline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-1 left-0 right-0 mx-1 rounded-sm bg-[#2a241c]" }),
						duration > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-1 bottom-1 w-0.5 bg-[#c6a45a]",
								style: { left: `${Math.min(100, Math.max(0, now / duration * 100))}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-1 h-6 w-0.5 bg-[#c6a45a]",
								style: { left: `${Math.min(100, Math.max(0, inPoint / duration * 100))}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute top-1 h-6 w-0.5 bg-[#c6a45a]",
								style: { left: `${Math.min(100, Math.max(0, outPoint / duration * 100))}%` }
							})
						] }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex justify-between font-mono text-[11px] tabular-nums text-faint",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: timecode(now) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: duration ? timecode(Math.max(0, duration - now)) : "00:00.00" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: "min-h-11 rounded-md border border-[#c6a45a] bg-[#241e16] text-xs text-parchment disabled:opacity-40",
							onClick: markIn,
							children: "In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !hasClip,
							className: "min-h-11 rounded-md border border-[#c6a45a] bg-[#241e16] text-xs text-parchment disabled:opacity-40",
							onClick: markOut,
							children: "Out"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || !hasClip,
							onClick: () => void exportClip(false),
							className: "min-h-11 rounded-md border border-[#c6a45a] bg-[#241e16] text-xs text-parchment disabled:opacity-40",
							children: busy ? "Making clip…" : "Save clip"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted",
					children: "Don’t export a Bank PIN."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 inline-flex min-h-11 cursor-pointer items-center rounded-md border border-[#c6a45a]/50 px-3 text-xs text-parchment",
					children: ["Upload video", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov",
						className: "sr-only",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) takeVideo(file);
							e.target.value = "";
						}
					})]
				}),
				lastFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 max-w-sm rounded-md border border-[#c6a45a]/50 px-3 text-sm text-parchment",
						onClick: () => {
							const href = URL.createObjectURL(lastFile);
							const a = document.createElement("a");
							a.href = href;
							a.download = lastFile.name;
							a.click();
							URL.revokeObjectURL(href);
						},
						children: "Save file"
					}), canShareFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 max-w-sm rounded-md border border-[#c6a45a]/50 px-3 text-sm text-parchment",
						onClick: () => void shareLast(),
						children: "Share"
					}) : null]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 min-h-11 rounded-md border border-[#c6a45a]/50 px-3 text-xs text-parchment",
					onClick: () => setMoreOpen((v) => !v),
					children: moreOpen ? "Hide more" : "More"
				})
			]
		}),
		moreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-[#c6a45a]/50 bg-[#1a1610] px-4 py-4 md:grid md:grid-cols-2 md:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "min-h-11 rounded-md border border-line px-3 py-2 text-xs text-parchment",
						children: ["Overlay still", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							className: "sr-only",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (file) takeBanner(file);
								e.target.value = "";
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-line px-3 text-xs",
						onClick: useDeskBanner,
						children: "Use desk banner"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						"off",
						"top",
						"lower"
					].map((pos) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${overlay === pos ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setOverlay(pos),
						children: pos === "off" ? "Overlay off" : pos === "top" ? "Top bar" : "Lower-third"
					}, pos))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block max-w-sm text-xs text-muted",
					children: [
						"Overlay opacity ",
						opacity,
						"%",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 60,
							max: 100,
							value: opacity,
							onChange: (e) => setOpacity(Number(e.target.value)),
							className: "mt-1 w-full"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: Object.keys(CLIP_ASPECTS).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${aspect === id ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setAspect(id),
						children: CLIP_ASPECTS[id].label
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						"none",
						"twitch",
						"youtube"
					].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${ghost === id ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setGhost(id),
						children: id === "none" ? "No ghost" : id === "twitch" ? "Twitch chat ghost" : "YouTube bar ghost"
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${edition === "OSRS" ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => {
							setEdition("OSRS");
							const mark = CLIP_MARKS.find((item) => item.id === markId);
							if (mark && !mark.games.includes("OSRS")) setMarkId("none");
						},
						children: "Old School"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${edition === "RS3" ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => {
							setEdition("RS3");
							const mark = CLIP_MARKS.find((item) => item.id === markId);
							if (mark && !mark.games.includes("RS3")) setMarkId("none");
						},
						children: "RuneScape 3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block max-w-sm text-xs text-muted",
					children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(sanitizeDisplayName(e.target.value)),
						maxLength: 12,
						autoComplete: "off",
						spellCheck: false,
						className: "mt-1 h-11 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block max-w-sm text-xs text-muted",
					children: ["Clan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: clan,
						onChange: (e) => setClan(sanitizeClan(e.target.value)),
						maxLength: 24,
						autoComplete: "off",
						spellCheck: false,
						className: "mt-1 h-11 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-2 block max-w-sm text-xs text-muted",
					children: ["World", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: world,
						onChange: (e) => setWorld(sanitizeWorld(e.target.value)),
						inputMode: "numeric",
						autoComplete: "off",
						className: "mt-1 h-11 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs tracking-[0.16em] text-parchment",
					children: "MARK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex flex-wrap gap-2",
					children: CLIP_MARKS.filter((item) => item.games.includes(edition)).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${markId === item.id ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setMarkId(item.id),
						children: item.name
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs tracking-[0.16em] text-parchment",
					children: "CAPTION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex flex-wrap gap-2",
					children: CLIP_CAPTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${caption === item ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setCaption(item),
						children: item
					}, item))
				}),
				caption === "Custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: customCaption,
					onChange: (e) => setCustomCaption(e.target.value.slice(0, 48)),
					maxLength: 48,
					className: "mt-2 h-11 w-full max-w-sm rounded-md border border-line bg-raised px-3 text-base text-fg",
					placeholder: "Custom caption"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-line px-3 text-xs",
						onClick: undo,
						children: "Undo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-line px-3 text-xs",
						onClick: redo,
						children: "Redo"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${snapOn ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setSnapOn((v) => !v),
						children: snapOn ? "Snap on" : "Snap off"
					}), [
						.5,
						1,
						1.5,
						2
					].map((rate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${speed === rate ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => {
							setSpeed(rate);
							if (videoRef.current) {
								videoRef.current.playbackRate = rate;
								if (rate !== 1) videoRef.current.muted = true;
							}
						},
						children: [rate, "×"]
					}, rate))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Fade in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						0,
						6,
						12
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${fadeIn === n ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setFadeIn(n),
						children: [n, "f"]
					}, `fi${n}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Fade out"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						0,
						6,
						12
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `min-h-11 rounded-md border px-3 text-xs ${fadeOut === n ? "border-parchment bg-raised" : "border-line"}`,
						onClick: () => setFadeOut(n),
						children: [n, "f"]
					}, `fo${n}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Markers · M"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-line px-3 text-xs",
						onClick: dropMarker,
						children: "Add mark"
					}), markers.map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-[#e2c15a] px-3 text-xs text-[#e2c15a]",
						onClick: () => seek(mark),
						children: timecode(mark)
					}, mark))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Export size"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `min-h-11 rounded-md border px-3 text-xs ${aspect === "16x9-1080" ? "border-parchment bg-raised" : "border-line"}`,
							onClick: () => setAspect("16x9-1080"),
							children: "YouTube 1080"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `min-h-11 rounded-md border px-3 text-xs ${aspect === "16x9-720" ? "border-parchment bg-raised" : "border-line"}`,
							onClick: () => setAspect("16x9-720"),
							children: "Twitch 720"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `min-h-11 rounded-md border px-3 text-xs ${aspect === "9x16" ? "border-parchment bg-raised" : "border-line"}`,
							onClick: () => setAspect("9x16"),
							children: "TikTok 9:16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-md border border-line px-3 text-xs",
							onClick: () => void holdingCard(),
							children: "Holding card"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 h-2 w-40 overflow-hidden rounded-sm border border-line bg-raised",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-parchment",
						style: { width: `${muted || speed !== 1 ? 0 : 40}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-2 min-h-11 rounded-md border border-line px-3 text-xs",
					onClick: () => setMuted((v) => !v),
					children: muted || speed !== 1 ? "Muted" : "Sound on"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted",
					children: "One game. Category is Old School RuneScape or RuneScape. PIN off-screen."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex max-w-sm flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void exportClip(false),
							className: "min-h-11 rounded-md border border-parchment px-3 text-sm text-parchment disabled:opacity-40",
							children: busy ? "Making clip…" : "Export WebM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void exportClip(true),
							className: "min-h-11 rounded-md border border-line px-3 text-sm disabled:opacity-40",
							children: "Download 16:9 + 9:16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void holdingCard(),
							className: "min-h-11 rounded-md border border-line px-3 text-sm",
							children: "Holding card 1200×480"
						}),
						busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-11 rounded-md border border-line px-3 text-xs",
							onClick: cancelExport,
							children: "Cancel"
						}) : null
					]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: status
		})
	] });
}
function EditPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
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
								children: "Video editor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] tracking-wide text-muted",
								children: "Upload. Cut. Save. Then read the stream desk below."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-px bg-[#c6a45a]/80",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipBench, {})
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
