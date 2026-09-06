import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as readDesk } from "./store-pWHXaoAo.mjs";
import { a as sanitizeDisplayName, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stream-desk-tJfmrnvZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DOWNLOADS = [
	{
		name: "Jagex Launcher",
		href: "https://www.jagex.com/launcher",
		note: "Official RS3 + OSRS install"
	},
	{
		name: "Old School download",
		href: "https://osrs.runescape.com/download",
		note: "OSRS landing + launcher"
	},
	{
		name: "RuneScape download",
		href: "https://www.runescape.com/download",
		note: "RS3 landing + launcher"
	},
	{
		name: "OSRS on Steam",
		href: "https://store.steampowered.com/app/1343370/Old_School_RuneScape/",
		note: "Official Steam app"
	},
	{
		name: "RuneScape on Steam",
		href: "https://store.steampowered.com/app/1343400/RuneScape/",
		note: "Official Steam app"
	},
	{
		name: "OBS Studio",
		href: "https://obsproject.com/",
		note: "Free encode for every RTMP target"
	},
	{
		name: "Twitch Studio",
		href: "https://www.twitch.tv/broadcast/studio",
		note: "Twitch-only encoder if you skip OBS"
	},
	{
		name: "Streamlabs Desktop",
		href: "https://streamlabs.com/",
		note: "OBS fork with docked alerts"
	},
	{
		name: "YouTube Studio",
		href: "https://studio.youtube.com/",
		note: "Live and VOD desk"
	},
	{
		name: "TikTok LIVE Studio",
		href: "https://www.tiktok.com/live/studio",
		note: "Official TikTok encoder"
	},
	{
		name: "Discord",
		href: "https://discord.com/download",
		note: "Clan call, not the public encode"
	},
	{
		name: "NVIDIA Broadcast",
		href: "https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app/",
		note: "Noise and cam, optional"
	},
	{
		name: "Twitch",
		href: "https://www.twitch.tv/broadcast",
		note: "Go-live dashboard"
	},
	{
		name: "X",
		href: "https://x.com/",
		note: "Go Live / Media Studio"
	},
	{
		name: "Kick",
		href: "https://kick.com/",
		note: "Kick dashboard"
	},
	{
		name: "TikTok LIVE",
		href: "https://www.tiktok.com/live",
		note: "Phone or LIVE Studio"
	},
	{
		name: "Facebook Live Producer",
		href: "https://www.facebook.com/live/producer",
		note: "Facebook / Gaming live"
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/",
		note: "Instagram Live from the app"
	},
	{
		name: "Trovo",
		href: "https://trovo.live/",
		note: "Trovo studio / RTMP"
	},
	{
		name: "Rumble",
		href: "https://rumble.com/",
		note: "Rumble Live"
	}
];
var PLATFORMS = [
	{
		id: "twitch",
		title: "TWITCH",
		body: [
			"Download OBS. Add a Game Capture or Window Capture of the Jagex client only.",
			"Creator Dashboard → Stream. Paste the stream key into OBS Settings → Stream → Twitch.",
			"Category: Old School RuneScape or RuneScape. Banner 1200×480 from Banner Studio."
		]
	},
	{
		id: "youtube",
		title: "YOUTUBE LIVE",
		body: [
			"studio.youtube.com → Create → Go live. Copy the stream key into OBS (Service: YouTube).",
			"Title the same string as Twitch. Schedule a premiere if you are VOD-first.",
			"Do not capture the desktop. Same PIN / login scene as Twitch. Channel art from this studio: YouTube channel 2560 × 1440 px."
		]
	},
	{
		id: "x",
		title: "X",
		body: ["Go Live from the X app or Media Studio. Same OBS canvas, second output if you dual-stream.", "Header from this studio: X header 1500 × 500 px. Pin the live post."]
	},
	{
		id: "kick",
		title: "KICK",
		body: ["kick.com dashboard → stream key into OBS (Custom RTMP if Kick is not in the service list).", "Same client-window capture. Category RuneScape / Old School if listed."]
	},
	{
		id: "tiktok",
		title: "TIKTOK",
		body: [
			"Vertical first. Studio size TikTok video is 1080 × 1920 px (9:16). Crop the client to the centre of the action bar; do not letterbox a 16:9 capture on a phone screen.",
			"Go Live from the TikTok app or TikTok LIVE Studio. OBS can push a custom RTMP when TikTok gives you a key.",
			"Same rule as Twitch: capture the Jagex client window only. Bank PIN scene stays bound.",
			"Title the activity in plain words. One game name. Do not pack every hashtag.",
			"Clips from a kill belong on TikTok the same night. Link the long VOD on Twitch or YouTube."
		]
	},
	{
		id: "facebook",
		title: "FACEBOOK LIVE",
		body: [
			"facebook.com/live/producer or the Facebook app. OBS service: Facebook Live, or Custom RTMP with the key from Live Producer.",
			"Cover from this studio: Facebook cover 1640 × 624 px. Encode 1920 × 1080 or 1280 × 720.",
			"Same client-window capture. Do not show the PIN."
		]
	},
	{
		id: "instagram",
		title: "INSTAGRAM LIVE",
		body: [
			"Instagram Live is phone-first. Use the TikTok video size 1080 × 1920 px if you need a vertical still behind the cam.",
			"Go Live in the Instagram app. Dual-stream from OBS only if you use a tool Instagram currently allows — the app is the supported path.",
			"Keep the long raid on Twitch or YouTube. Instagram is the clip."
		]
	},
	{
		id: "trovo",
		title: "TROVO",
		body: ["trovo.live dashboard → stream key into OBS (Custom RTMP if Trovo is not listed).", "Category Old School RuneScape or RuneScape. Banner can reuse Twitch profile 1200 × 480 px."]
	},
	{
		id: "rumble",
		title: "RUMBLE",
		body: ["rumble.com live dashboard → RTMP URL and key into OBS Custom.", "Wallpaper 1920 × 1080 px works as a holding card. Same PIN scene."]
	},
	{
		id: "discord",
		title: "DISCORD",
		body: ["Screen share the client in a Voice channel for the clan. This is not your public encode.", "Keep Discord on a separate audio track so it does not leak into Twitch."]
	}
];
var TITLE_TEMPLATES = [
	{
		use: "OSRS raid learners",
		text: "OSRS ToB learners · GIM · W418"
	},
	{
		use: "OSRS inferno",
		text: "OSRS Inferno attempts · HCIM"
	},
	{
		use: "OSRS nex",
		text: "OSRS Nex mass · mains welcome"
	},
	{
		use: "Telos (category: RuneScape)",
		text: "Telos streak · maxed · W84"
	},
	{
		use: "Rasial (category: RuneScape)",
		text: "Rasial log grind · W84"
	},
	{
		use: "Skilling",
		text: "OSRS 99 Runecraft · iron"
	},
	{
		use: "First kc (category: RuneScape)",
		text: "First Solak · learners"
	}
];
var SIZES = [
	{
		where: "Twitch profile banner",
		size: "1200×480",
		note: "Studio: Twitch profile"
	},
	{
		where: "Twitch panel art",
		size: "320×160+",
		note: "Repeat Discord + schedule"
	},
	{
		where: "X header",
		size: "1500×500",
		note: "Studio: X header"
	},
	{
		where: "RuneScape wallpaper",
		size: "1920×1080",
		note: "Studio: wallpaper / offline"
	},
	{
		where: "YouTube channel art",
		size: "2560×1440",
		note: "Studio: YouTube channel"
	},
	{
		where: "Facebook cover",
		size: "1640×624",
		note: "Studio: Facebook cover"
	},
	{
		where: "TikTok / IG vertical",
		size: "1080×1920",
		note: "Studio: TikTok video · 9:16"
	},
	{
		where: "Discord banner",
		size: "960×540",
		note: "Studio: Discord banner"
	},
	{
		where: "Twitch encode",
		size: "1920×1080 or 1280×720",
		note: "See bitrate"
	}
];
var ENCODE = [
	{
		setup: "1080p60 capable",
		bitrate: "6000 kbps",
		note: "Affiliate/partner cap most use"
	},
	{
		setup: "1080p30",
		bitrate: "4500–5000",
		note: "If GPU is hot in NXT"
	},
	{
		setup: "720p60",
		bitrate: "4500",
		note: "Cleaner than melted 1080"
	},
	{
		setup: "X live",
		bitrate: "Match Twitch",
		note: "Same scene collection, second output"
	}
];
var DELAY = [
	{
		place: "House, GE, banks, raids",
		delay: "0–2s",
		note: "Callouts stay tight"
	},
	{
		place: "Slayer / overworld",
		delay: "3s",
		note: "Default"
	},
	{
		place: "Wilderness, PvP worlds",
		delay: "6–8s",
		note: "Assume you are hunted"
	},
	{
		place: "Risk fights",
		delay: "8s + no tile call",
		note: "Do not announce exact tiles"
	}
];
var TWITCH = [
	"Directory: Old School RuneScape or RuneScape. Never both, never Just Chatting unless you are off-client.",
	"Tags: language + one mode + one activity. Ironman, PvM, Raids, Skilling, Learners Welcome. Stop at four.",
	"Alerts live off the action bar and prayer flick. Top-right or bottom-left only.",
	"Raid out after a kc or a clean wipe. Name the channel twice. Same category.",
	"Do not promise Drops you do not control.",
	"Highlights: first kc, cape, trim, learner wipe. Not the six-hour slayer block."
];
var XLIVE = [
	"Twitch is the encode. X is the clip door and a second live if you have the upload.",
	"Pin the live post with the same title string as Twitch.",
	"Hashtags: #RuneScape or #OSRS plus the activity in plain words. One tag.",
	"Clip 12–20s the same night: purple, wipe, 99. Link the VOD.",
	"No giveaway that asks for a password, recovery, or bond in DMs."
];
var SCENES = [
	{
		name: "LIVE",
		note: "Game capture of the client window only. Mic + game."
	},
	{
		name: "BRB",
		note: "Banner still + world + ETA. No desktop."
	},
	{
		name: "STARTING",
		note: "Banner + title + world. 60–90s max."
	},
	{
		name: "PIN / LOGIN",
		note: "Cam-only or BRB. Never the PIN pad or email."
	}
];
var CHECKLIST = [
	"Client window captured, not desktop",
	"World on title and banner",
	"Still matches the place",
	"Delay set for the content",
	"Bank PIN scene bound to a hotkey",
	"Mic check, game ducked under voice",
	"Category + title + tags saved",
	"Discord / clan call not on the desktop audio"
];
function StreamDesk() {
	const saved = readDesk();
	const [copyNote, setCopyNote] = (0, import_react.useState)("");
	const name = sanitizeDisplayName(saved.streamer ?? "");
	const world = sanitizeWorld(saved.world ?? "");
	const category = saved.edition === "RS3" ? "RuneScape" : "Old School RuneScape";
	const title = [
		name || "Display name",
		world ? `World ${world}` : "",
		category
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "stream-desk",
		className: "mt-8 overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "page-h1 m-0 text-left",
					children: "Stream desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm text-muted",
					children: "This page does not go live for you. Encode in OBS or the official studio app. Capture the Jagex client window, not the desktop. Category is Old School RuneScape or RuneScape. Cut a kill on the clip bench above, then use the notes below to title, size, and start the stream."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-px bg-[#c6a45a]/80",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8 px-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-semibold text-parchment",
						children: "How a session runs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "list-decimal space-y-1.5 pl-5 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open the official client from the Jagex Launcher. World and PIN stay off the capture." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "In OBS, Game Capture or Window Capture the client only. Add the banner JPEG as a top or lower-third overlay if you want one." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set the category to one game. Copy a title from the table. Check bitrate for your canvas." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Go live from the official dashboard. After a kill, drop the VOD on the clip bench, set In and Out, Save clip." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Upload that file to YouTube, TikTok, or Discord yourself. This desk never takes a stream key." })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-semibold text-parchment",
						children: "Downloads"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2",
						children: DOWNLOADS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-line bg-raised px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.href,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "text-sm text-parchment",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: item.note
							})]
						}, item.href))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "grid gap-4 md:grid-cols-2",
						children: PLATFORMS.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-line bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold text-parchment",
								children: pack.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-1.5 pl-5 text-sm text-muted",
								children: pack.body.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							})]
						}, pack.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-2 text-sm font-semibold text-parchment",
							children: "Titles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-xs text-muted",
							children: "Edition · activity · mode · world. Keep it under about 60 characters. One game name."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 flex flex-wrap items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "rounded-md border border-line px-3 py-2 text-parchment",
									onClick: () => {
										navigator.clipboard.writeText(title);
										setCopyNote("Title copied.");
									},
									children: "Copy title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: title
								}),
								copyNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-faint",
									children: copyNote
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: TITLE_TEMPLATES.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line first:border-t-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "w-44 px-3 py-2 align-top text-xs font-medium text-faint",
										children: row.use.toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 font-mono text-xs text-fg",
										children: row.text
									})]
								}, row.use)) })
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-sm font-semibold text-parchment",
							children: "Sizes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SIZES.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line first:border-t-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-xs font-medium text-faint",
											children: row.where.toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-mono text-xs",
											children: row.size
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-xs text-muted",
											children: row.note
										})
									]
								}, row.where)) })
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-sm font-semibold text-parchment",
							children: "Encode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ENCODE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line first:border-t-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-xs font-medium text-faint",
											children: row.setup.toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-mono text-xs",
											children: row.bitrate
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-xs text-muted",
											children: row.note
										})
									]
								}, row.setup)) })
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-6 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-sm font-semibold text-parchment",
							children: "Delay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: DELAY.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line first:border-t-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-xs font-medium text-faint",
											children: row.place.toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-mono text-xs",
											children: row.delay
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-xs text-muted",
											children: row.note
										})
									]
								}, row.place)) })
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-3 text-sm font-semibold text-parchment",
							children: "Scenes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-md border border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
								className: "w-full text-left text-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SCENES.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-line first:border-t-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-mono text-xs",
										children: row.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 text-xs text-muted",
										children: row.note
									})]
								}, row.name)) })
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-line bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold text-parchment",
								children: "Twitch"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-1.5 pl-5 text-sm text-muted",
								children: TWITCH.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-line bg-raised px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mb-2 text-sm font-semibold text-parchment",
								children: "X"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-1.5 pl-5 text-sm text-muted",
								children: XLIVE.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 text-sm font-semibold text-parchment",
						children: "Before you go live"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-2",
						children: CHECKLIST.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md border border-line bg-raised px-3 py-2 text-sm",
							children: item
						}, item))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-faint",
						children: [
							"Fan notes, not a Jagex or Twitch handbook.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/streamers",
								className: "text-parchment",
								children: "Streamers"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/youtubers",
								className: "text-parchment",
								children: "Youtubers"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { StreamDesk as t };
