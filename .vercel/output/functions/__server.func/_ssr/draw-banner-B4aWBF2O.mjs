import { i as RULES } from "./locations-DGhympWJ.mjs";
import { a as sanitizeDisplayName, c as sanitizeHandle, d as worldLabel, i as sanitizeDiscord, l as sanitizeTagline, r as sanitizeClan, s as sanitizeGrind, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/draw-banner-B4aWBF2O.js
function safeZoneRects(zone) {
	if (zone === "twitch") return [{
		x: 0,
		y: 0,
		w: .18,
		h: 1,
		label: "Avatar crop"
	}, {
		x: .82,
		y: 0,
		w: .18,
		h: 1,
		label: "Edge crop"
	}];
	if (zone === "youtube") return [
		{
			x: 0,
			y: 0,
			w: 1,
			h: .35,
			label: "Desktop crop"
		},
		{
			x: 0,
			y: .65,
			w: 1,
			h: .35,
			label: "Desktop crop"
		},
		{
			x: 0,
			y: .35,
			w: .12,
			h: .3,
			label: ""
		},
		{
			x: .88,
			y: .35,
			w: .12,
			h: .3,
			label: ""
		}
	];
	if (zone === "discord") return [{
		x: 0,
		y: 0,
		w: 1,
		h: .22,
		label: "Profile crop"
	}];
	if (zone === "x") return [{
		x: 0,
		y: 0,
		w: .12,
		h: 1,
		label: "Mobile"
	}, {
		x: .88,
		y: 0,
		w: .12,
		h: 1,
		label: "Mobile"
	}];
	if (zone === "tiktok") return [{
		x: 0,
		y: 0,
		w: 1,
		h: .14,
		label: "TikTok top"
	}, {
		x: 0,
		y: .78,
		w: 1,
		h: .22,
		label: "TikTok UI"
	}];
	if (zone === "facebook") return [{
		x: 0,
		y: .72,
		w: 1,
		h: .28,
		label: "Profile strip"
	}];
	if (zone === "rs") return [{
		x: 0,
		y: 0,
		w: .22,
		h: 1,
		label: "Nav"
	}];
	return [];
}
function drawSafeZoneGhosts(ctx, w, h, zone) {
	ctx.save();
	ctx.setLineDash([7, 5]);
	ctx.font = `${Math.max(12, h * .04)}px "RS Chat Bold"`;
	ctx.textBaseline = "top";
	for (const r of safeZoneRects(zone)) {
		const x = r.x * w;
		const y = r.y * h;
		const rw = r.w * w;
		const rh = r.h * h;
		ctx.fillStyle = "rgba(12,10,8,0.35)";
		ctx.fillRect(x, y, rw, rh);
		ctx.strokeStyle = "rgba(255,220,120,0.9)";
		ctx.strokeRect(x + .5, y + .5, rw - 1, rh - 1);
		ctx.fillStyle = "#ffe9b0";
		ctx.fillText(r.label, x + 8, y + 6);
	}
	ctx.restore();
}
var RS_YELLOW = "#ffff00";
var FACE = "RS Chat Bold";
var FACE_URL = "/fonts/rs-chat-bold.ttf";
var plateFontReady = false;
var plateFontTried = false;
async function ensurePlateFont() {
	if (typeof document === "undefined") return false;
	if (plateFontReady) return true;
	if (plateFontTried && !plateFontReady) return false;
	plateFontTried = true;
	try {
		const head = await fetch(FACE_URL, {
			method: "GET",
			cache: "force-cache"
		});
		if (!head.ok) throw new Error("Chat Bold missing — /fonts/rs-chat-bold.ttf is not 200");
		const buf = await head.arrayBuffer();
		if (buf.byteLength < 1e3) throw new Error("Chat Bold missing — /fonts/rs-chat-bold.ttf is not 200");
		if ("FontFace" in window) for (const weight of ["400", "700"]) {
			const face = new FontFace(FACE, buf, {
				weight,
				style: "normal"
			});
			document.fonts.add(await face.load());
		}
		await document.fonts.load(`400 42px "${FACE}"`);
		await document.fonts.load("700 42px \"RS Chat Bold\"");
		if (!document.fonts.check("700 42px \"RS Chat Bold\"")) throw new Error("RS Chat Bold not loaded");
		plateFontReady = true;
		return true;
	} catch {
		plateFontReady = false;
		return false;
	}
}
function paintRSYellow(ctx, text, x, y, size, color = RS_YELLOW) {
	ctx.save();
	ctx.font = `700 ${Math.round(size)}px "RS Chat Bold"`;
	ctx.textBaseline = "top";
	ctx.imageSmoothingEnabled = false;
	ctx.lineJoin = "round";
	ctx.lineWidth = Math.max(3, size * .1);
	ctx.strokeStyle = "#000";
	ctx.strokeText(text, x, y);
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
	ctx.restore();
}
function fitYellow(ctx, text, x, y, size, max, _font, _weight = "800", color = RS_YELLOW, _style = "chat") {
	let next = Math.round(size);
	ctx.font = `700 ${next}px "${FACE}"`;
	while (next > 10 && ctx.measureText(text).width > max) {
		next -= 1;
		ctx.font = `700 ${next}px "${FACE}"`;
	}
	paintRSYellow(ctx, text, x, y, next, color);
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.decoding = "async";
		const done = () => {
			if (typeof img.decode === "function") img.decode().then(() => resolve(img)).catch(() => resolve(img));
			else resolve(img);
		};
		img.onload = done;
		img.onerror = () => reject(new Error(src));
		img.src = src;
	});
}
function plateMetrics(width, height) {
	if (width >= 1920 && height >= 1e3) return {
		name: 56,
		clan: 22,
		line: 20,
		level: 22,
		icon: 44,
		gap: 14,
		pad: 56,
		top: 40
	};
	if (width >= 1920) return {
		name: 40,
		clan: 18,
		line: 16,
		level: 18,
		icon: 36,
		gap: 12,
		pad: 48,
		top: 24
	};
	if (width >= 1280 && height >= 700) return {
		name: 44,
		clan: 20,
		line: 18,
		level: 20,
		icon: 40,
		gap: 14,
		pad: 40,
		top: 32
	};
	return {
		name: 36,
		clan: 16,
		line: 15,
		level: 18,
		icon: 36,
		gap: 12,
		pad: 36,
		top: 22
	};
}
function typeScale(width, height) {
	const m = plateMetrics(width, height);
	return {
		name: m.name,
		level: m.level,
		pad: m.pad,
		top: m.top,
		clan: m.clan,
		line: m.line,
		icon: m.icon,
		gap: m.gap
	};
}
function wrapText(ctx, text, max) {
	const words = text.split(/\s+/);
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (ctx.measureText(next).width > max && line) {
			lines.push(line);
			line = word;
		} else line = next;
	}
	if (line) lines.push(line);
	return lines;
}
function skillGrid(count, width, height, place, skillX, skillY, showRules, iconSize, withLevels = true) {
	const chip = typeScale(width, height);
	const icon = Math.max(24, Math.min(72, Math.round(iconSize ?? chip.icon)));
	const type = Math.max(14, Math.round(chip.level));
	const labelW = withLevels ? Math.round(type * 2.4) : 0;
	const gapX = Math.max(chip.gap, Math.round(icon * .22));
	const gapY = Math.max(chip.gap, Math.round(icon * .28));
	const cellW = icon + labelW + gapX;
	const cellH = icon + gapY;
	const photoW = showRules ? width * .62 : width;
	const usable = Math.max(cellW, photoW - 24);
	const cols = Math.max(1, Math.min(count || 1, Math.floor(usable / cellW)));
	const rows = Math.max(1, Math.ceil(Math.max(1, count) / cols));
	const blockW = cols * cellW - gapX;
	const left = Math.round(48 * (width / 1200));
	let originX = place === "name" ? left : Math.max(12, Math.round((photoW - blockW) / 2));
	let originY = 16;
	if (place === "name") originY = Math.round(height * .28);
	if (place === "bottom") originY = Math.max(16, height - rows * cellH - 16);
	if (skillX != null) originX = Math.max(8, Math.min(skillX, width - blockW - 8));
	if (skillY != null) originY = Math.max(8, Math.min(skillY, height - rows * cellH - 8));
	return {
		originX,
		originY,
		cellW,
		cellH,
		icon,
		cols,
		labelW,
		rows
	};
}
function drawIdentityPlate(ctx, options, textMax, height, font, boxes, weight, inkStyle) {
	const plateFont = `"${FACE}"`;
	const color = options.textColor || RS_YELLOW;
	const chip = typeScale(options.width, options.height);
	const lines = [];
	const name = sanitizeDisplayName(options.streamer);
	const clan = sanitizeClan(options.clan);
	const handle = sanitizeHandle(options.handle);
	const tagline = sanitizeTagline(options.tagline);
	const discord = sanitizeDiscord(options.discord);
	const grind = sanitizeGrind(options.grind);
	const world = worldLabel(sanitizeWorld(options.world));
	const cap = (s) => options.caps ? s.toUpperCase() : s;
	if (name && name !== "Player" && name !== "Optional") lines.push({
		id: "streamer",
		text: cap(name),
		size: chip.name
	});
	if (clan) lines.push({
		id: "clan",
		text: cap(clan),
		size: chip.clan ?? Math.round(chip.name * .44)
	});
	if (handle) lines.push({
		id: "handle",
		text: cap(handle),
		size: Math.round((chip.clan ?? chip.name * .44) * .9)
	});
	if (tagline) {
		ctx.font = `700 ${chip.line ?? 15}px ${plateFont}`;
		const wrapped = wrapText(ctx, tagline, textMax).slice(0, 2);
		if (wrapText(ctx, tagline, textMax).length > 2 && wrapped[1]) wrapped[1] = `${wrapped[1].replace(/…$/, "")}…`;
		wrapped.forEach((text, i) => {
			lines.push({
				id: i ? `tagline-${i}` : "tagline",
				text: cap(text),
				size: chip.line ?? 15
			});
		});
	}
	[
		world,
		grind,
		options.maxed ? "Maxed" : "",
		options.mode,
		options.focus,
		options.style,
		options.cape,
		discord,
		options.learners ? "Learners welcome" : ""
	].filter((item) => item && item !== "Not shown").forEach((text, i) => lines.push({
		id: `extra-${i}`,
		text: cap(text),
		size: chip.line ?? 15
	}));
	const layout = options.layout ?? "banner";
	ctx.textAlign = layout === "title-card" ? "center" : "left";
	let y = layout === "lower-third" ? Math.round(height * .74) : layout === "title-card" ? Math.round(height * .42) : chip.top;
	for (const line of lines) {
		const scale = Math.min(2, Math.max(.75, options.textScale?.[line.id] ?? 1));
		const size = Math.max(8, Math.round(line.size * scale));
		const pos = options.textPos[line.id];
		const inset = chip.pad;
		const x = pos ? pos.x + 4 : layout === "title-card" ? Math.round(options.width / 2) : inset;
		const yy = pos ? pos.y + size : y;
		ctx.font = `700 ${size}px ${plateFont}`;
		fitYellow(ctx, line.text, x, yy, size, textMax, plateFont, "800", color, "chat");
		boxes.push({
			id: line.id,
			x: x - 4,
			y: yy - size,
			w: textMax,
			h: size + 8
		});
		y = yy + size + 8;
	}
	return y;
}
function drawBanner(ctx, scene, options) {
	const { width, height } = options;
	const font = `"${FACE}"`;
	if ("letterSpacing" in ctx) ctx.letterSpacing = "0.04em";
	const inkStyle = options.fontId === "bold" ? "bold" : options.fontId === "quill" ? "quill" : "chat";
	const weight = inkStyle === "bold" ? "800" : "600";
	if (options.overlayOnly) ctx.clearRect(0, 0, width, height);
	else {
		ctx.fillStyle = "#100e0c";
		ctx.fillRect(0, 0, width, height);
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		const src = scene;
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
		fade.addColorStop(.55, "rgba(0,0,0,0)");
		fade.addColorStop(1, "rgba(0,0,0,0.35)");
		ctx.fillStyle = fade;
		ctx.fillRect(0, 0, width, height);
	}
	const boardW = Math.round(width * .34);
	const boardLeft = width - boardW - 16;
	if (options.showRules) {
		const bx = boardLeft;
		const by = 16;
		const bw = boardW;
		const bh = height - 32;
		ctx.fillStyle = "#5a3a1c";
		ctx.fillRect(bx - 6, 10, bw + 12, bh + 12);
		ctx.fillStyle = "#d4b07a";
		ctx.fillRect(bx, by, bw, bh);
		ctx.fillStyle = "#efe0c4";
		ctx.fillRect(bx + 8, 24, bw - 16, bh - 16);
		ctx.textAlign = "center";
		const title = options.rulesTitle.trim() || RULES.title;
		ctx.fillStyle = "#3a2410";
		ctx.font = `700 16px ${font}`;
		wrapText(ctx, title, bw - 28).forEach((line, i) => {
			ctx.fillText(line, bx + bw / 2, 52 + i * 18);
		});
		const blocks = [
			[options.honourHead || RULES.sections[0].heading, options.honourBody || RULES.sections[0].body],
			[options.respectHead || RULES.sections[1].heading, options.respectBody || RULES.sections[1].body],
			[options.securityHead || RULES.sections[2].heading, options.securityBody || RULES.sections[2].body]
		];
		ctx.textAlign = "left";
		let ty = 94;
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
		const mark = options.watermark;
		const mw = mark.naturalWidth ?? mark.width ?? 80;
		const mh = mark.naturalHeight ?? mark.height ?? 24;
		const maxW = Math.max(48, (options.showRules ? boardLeft : width) * .2);
		const maxH = Math.max(18, height * .08);
		const scale = Math.min(maxW / Math.max(1, mw), maxH / Math.max(1, mh));
		const dw = mw * scale;
		const dh = mh * scale;
		const pad = Math.max(12, height * .04);
		const dx = (options.showRules ? boardLeft : width) - pad - dw;
		const dy = height - pad - dh;
		ctx.globalAlpha = .88;
		ctx.drawImage(options.watermark, dx, dy, dw, dh);
		ctx.globalAlpha = 1;
	}
	const boxes = [];
	const inset = Math.round(48 * (width / 1200));
	drawIdentityPlate(ctx, options, Math.max(180, Math.min(Math.round(width * .33), (options.showRules ? boardLeft : width) - inset * 2)), height, font, boxes, weight, inkStyle);
	if (options.skillIcons.length) {
		const count = options.skillIcons.length;
		const grid = skillGrid(count, width, height, options.skillPlace, options.skillX, options.skillY, options.showRules, options.skillSize);
		ctx.textAlign = "left";
		ctx.imageSmoothingEnabled = false;
		const chip = typeScale(width, height);
		options.skillIcons.forEach((slot, i) => {
			const col = i % grid.cols;
			const row = Math.floor(i / grid.cols);
			const scale = Math.max(.4, Math.min(2.5, slot.scale ?? 1));
			const icon = Math.max(12, Math.round((slot.size ?? grid.icon) * scale));
			let px = Math.round(grid.originX + col * grid.cellW);
			let py = Math.round(grid.originY + row * grid.cellH);
			if (slot.x != null && slot.y != null) {
				px = Math.round(Math.max(0, Math.min(slot.x, width - icon)));
				py = Math.round(Math.max(0, Math.min(slot.y, height - icon)));
			}
			ctx.drawImage(slot.img, px, py, icon, icon);
			const label = slot.level.trim();
			if (label) {
				const levelSize = Math.max(10, Math.round((chip.level || 14) * scale));
				ctx.save();
				ctx.textAlign = "left";
				ctx.textBaseline = "middle";
				paintRSYellow(ctx, label, px + icon + 4, py + Math.round(icon / 2) - levelSize / 2, levelSize, options.textColor || RS_YELLOW);
				ctx.restore();
			}
			boxes.push({
				id: slot.id,
				x: px,
				y: py,
				w: icon,
				h: icon
			});
		});
		ctx.imageSmoothingEnabled = true;
	}
	if (options.showSafeZones && options.safeZone && options.safeZone !== "none") drawSafeZoneGhosts(ctx, width, height, options.safeZone);
	options.onSkillBoxes?.(boxes);
}
//#endregion
export { paintRSYellow as a, loadImage as i, drawSafeZoneGhosts as n, plateMetrics as o, ensurePlateFont as r, safeZoneRects as s, drawBanner as t };
