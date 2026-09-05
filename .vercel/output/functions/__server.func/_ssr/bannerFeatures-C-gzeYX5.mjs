//#region node_modules/.nitro/vite/services/ssr/assets/bannerFeatures-C-gzeYX5.js
var PRESETS = {
	"tob-night": {
		label: "ToB night raid",
		game: "osrs",
		placeHint: "theatre-of-blood",
		lighting: "dark",
		tagline: "Raid night",
		grind: "Theatre of Blood"
	},
	"fire-cape": {
		label: "OSRS fire cape flex",
		game: "osrs",
		placeHint: "fight-caves",
		lighting: "dark",
		tagline: "Fire cape",
		grind: "Fight Caves"
	},
	"rs3-enrage": {
		label: "RS3 enrage grind",
		game: "rs3",
		placeHint: "telos",
		lighting: "dark",
		tagline: "Enrage ladder",
		grind: "Telos"
	},
	"iron-teach": {
		label: "Iron teaching world",
		game: "osrs",
		placeHint: "lumbridge",
		lighting: "light",
		tagline: "Teaching world",
		grind: ""
	}
};
var PRESET_SLUG = {
	"tob-night": ["tob"],
	"fire-cape": ["inferno"],
	"rs3-enrage": ["telos"],
	"iron-teach": ["osrslumbridge", "lumbridge"]
};
function presetSlugs(id) {
	return PRESET_SLUG[id];
}
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
	ctx.font = `${Math.max(12, h * .04)}px "Source Sans 3", sans-serif`;
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
//#endregion
export { safeZoneRects as i, drawSafeZoneGhosts as n, presetSlugs as r, PRESETS as t };
