export const DOWNLOADS = [
  { name: "Jagex Launcher", href: "https://www.jagex.com/launcher", note: "Official door for Old School and RuneScape" },
  { name: "Old School download", href: "https://oldschool.runescape.com/", note: "OSRS landing + launcher" },
  { name: "RuneScape download", href: "https://www.runescape.com/download", note: "RS3 landing + launcher" },
  { name: "RuneScape: Dragonwilds", href: "https://dragonwilds.runescape.com/", note: "Survival title. Own category." },
  { name: "OSRS on Steam", href: "https://store.steampowered.com/app/1343370/Old_School_RuneScape/", note: "Official Steam app" },
  { name: "RuneScape on Steam", href: "https://store.steampowered.com/app/1343400/RuneScape/", note: "Official Steam app" },
  { name: "OBS Studio", href: "https://obsproject.com/", note: "Free encode. Keyframe 2. CBR." },
  { name: "Twitch Studio", href: "https://www.twitch.tv/broadcast/studio", note: "Twitch-only encoder if you skip OBS" },
  { name: "YouTube Studio", href: "https://studio.youtube.com/", note: "Live and VOD desk" },
  { name: "TikTok LIVE Studio", href: "https://www.tiktok.com/live/studio", note: "Official TikTok encoder" },
  { name: "Discord", href: "https://discord.com/download", note: "Clan call, not the public encode" },
  { name: "Twitch", href: "https://www.twitch.tv/broadcast", note: "Go-live dashboard" },
  { name: "Kick", href: "https://kick.com/", note: "Kick dashboard. Common OSRS door." },
  { name: "X", href: "https://x.com/", note: "Go Live / Media Studio" },
  { name: "TikTok LIVE", href: "https://www.tiktok.com/live", note: "Phone or LIVE Studio" },
  { name: "Facebook Live Producer", href: "https://www.facebook.com/live/producer", note: "Facebook / Gaming live" },
];

export const PLATFORMS = [
  {
    id: "twitch",
    title: "TWITCH",
    body: [
      "OBS: Window Capture or Game Capture the Jagex client only. Not the desktop.",
      "Creator Dashboard → Stream. Stream key stays in OBS. This page never takes it.",
      "Category: Old School RuneScape or RuneScape. One game. Banner 1200×480 from the still desk.",
      "Standard ingest: 1080p60, H.264, CBR 6000 kbps, keyframe 2. Enhanced Broadcasting if Twitch offers it — let OBS auto-config that ladder.",
    ],
  },
  {
    id: "youtube",
    title: "YOUTUBE LIVE",
    body: [
      "studio.youtube.com → Create → Go live. OBS service: YouTube. Same client-window capture.",
      "1080p60 can sit higher than Twitch — 8000 kbps is a clean default. Keyframe 2.",
      "Long raid stays here. Shorts are a 9:16 crop from the clip bench, not a second live.",
      "Channel art from this studio: 2560×1440. PIN scene still bound.",
    ],
  },
  {
    id: "kick",
    title: "KICK",
    body: [
      "kick.com dashboard → stream key into OBS (Kick in the service list, or Custom RTMP).",
      "Same client capture. Category Old School RuneScape or RuneScape if listed.",
      "1080p60, H.264, CBR up to 8000 kbps if the upload is honest. Do not melt 1080 on a weak line.",
    ],
  },
  {
    id: "x",
    title: "X",
    body: [
      "Go Live from the X app or Media Studio. Twitch or Kick stays the encode; X is the clip door unless you dual-output.",
      "Header from this studio: 1500×500. Pin the live post with the same title string.",
    ],
  },
  {
    id: "tiktok",
    title: "TIKTOK",
    body: [
      "Vertical first. Clip bench size 9:16 is 1080×1920. Crop the client to the action, do not letterbox 16:9 on a phone.",
      "Go Live from the TikTok app or TikTok LIVE Studio. OBS Custom RTMP only when TikTok gives you a key.",
      "Same rule: Jagex client window only. Bank PIN scene stays bound.",
    ],
  },
  {
    id: "facebook",
    title: "FACEBOOK LIVE",
    body: [
      "facebook.com/live/producer. OBS: Facebook Live, or Custom RTMP with the Live Producer key.",
      "Cover from this studio: 1640×624. Encode 1920×1080 or 1280×720. Do not show the PIN.",
    ],
  },
  {
    id: "instagram",
    title: "INSTAGRAM LIVE",
    body: [
      "Phone-first. Use the clip bench 9:16 (1080×1920) if you need a vertical still.",
      "Go Live in the Instagram app. Keep the long raid on Twitch or YouTube.",
    ],
  },
  {
    id: "discord",
    title: "DISCORD",
    body: [
      "Screen share the client in a Voice channel for the clan. This is not your public encode.",
      "Keep Discord on a separate audio track so it does not leak into Twitch.",
    ],
  },
  {
    id: "dragonwilds",
    title: "DRAGONWILDS",
    body: [
      "Category is RuneScape: Dragonwilds. Not Old School. Not the RuneScape client.",
      "Capture that window. Official notes: dragonwilds.runescape.com",
      "Do not mix its stills into this desk’s two wells.",
    ],
  },
];

export const TITLE_TEMPLATES = [
  { use: "OSRS raid learners", text: "OSRS ToB learners · GIM · W418" },
  { use: "OSRS inferno", text: "OSRS Inferno attempts · HCIM" },
  { use: "OSRS nex", text: "OSRS Nex mass · mains welcome" },
  { use: "OSRS colo", text: "OSRS Colosseum · learners" },
  { use: "Telos (category: RuneScape)", text: "Telos streak · maxed · W84" },
  { use: "Rasial (category: RuneScape)", text: "Rasial log grind · W84" },
  { use: "Skilling", text: "OSRS 99 Runecraft · iron" },
  { use: "First kc (category: RuneScape)", text: "First Solak · learners" },
];

export const SIZES = [
  { where: "Twitch profile banner", size: "1200×480", note: "Still desk: Twitch crop" },
  { where: "Clip bench 1080p", size: "1920×1080", note: "Download 1080p 16:9" },
  { where: "Clip bench 720p", size: "1280×720", note: "Download 720p 16:9" },
  { where: "Clip bench 9:16", size: "1080×1920", note: "Shorts / TikTok / Reels" },
  { where: "Clip bench 1:1", size: "1080×1080", note: "Square post" },
  { where: "Clip bench banner", size: "1200×480", note: "Same crop as Twitch profile" },
  { where: "Twitch panel art", size: "320×160+", note: "Repeat Discord + schedule" },
  { where: "X header", size: "1500×500", note: "Still desk: X header" },
  { where: "YouTube channel art", size: "2560×1440", note: "Still desk: YouTube channel" },
  { where: "Twitch encode", size: "1920×1080 or 1280×720", note: "See bitrate. Keyframe 2." },
];

export const ENCODE = [
  { setup: "Twitch 1080p60", bitrate: "6000 kbps CBR", note: "H.264. Keyframe 2. Standard ingest." },
  { setup: "Twitch Enhanced", bitrate: "Let OBS set it", note: "If the dashboard offers the ladder. HEVC/AV1 when Twitch says so." },
  { setup: "YouTube 1080p60", bitrate: "8000 kbps", note: "Headroom Twitch does not give." },
  { setup: "Kick 1080p60", bitrate: "6000–8000", note: "H.264. Do not exceed a clean upload." },
  { setup: "720p60", bitrate: "4500", note: "Cleaner than melted 1080" },
  { setup: "1080p30", bitrate: "4500–5000", note: "If NXT or the GPU is hot" },
  { setup: "Shorts / 9:16", bitrate: "Local file", note: "Clip bench crop. Not a second live." },
];

export const DELAY = [
  { place: "House, GE, banks, raids", delay: "0–2s", note: "Callouts stay tight" },
  { place: "Slayer / overworld", delay: "3s", note: "Default" },
  { place: "Wilderness, PvP worlds", delay: "6–8s", note: "Assume you are hunted" },
  { place: "Risk fights", delay: "8s + no tile call", note: "Do not announce exact tiles" },
];

export const TWITCH = [
  "Directory: Old School RuneScape or RuneScape. Never both. Dragonwilds is a third category.",
  "Tags: language + one mode + one activity. Ironman, PvM, Raids, Skilling, Learners Welcome. Stop at four.",
  "Content labels if Twitch asks. Gambling/Drops language only when it is true.",
  "Alerts live off the action bar and prayer flick. Top-right or bottom-left only.",
  "Raid out after a kc or a clean wipe. Name the channel twice. Same category.",
  "Do not promise Drops you do not control. Official drop campaigns live on Jagex and Twitch, not this desk.",
  "Highlights: first kc, cape, trim, learner wipe. Cut them on the clip bench. Not the six-hour slayer block.",
];

export const XLIVE = [
  "Twitch or Kick is the encode. X is the clip door and a second live if you have the upload.",
  "Pin the live post with the same title string as Twitch.",
  "Hashtags: #RuneScape or #OSRS plus the activity in plain words. One tag.",
  "Clip 12–20s the same night from the clip bench: purple, wipe, 99. Link the VOD.",
  "No giveaway that asks for a password, recovery, or bond in DMs.",
];

export const SCENES = [
  { name: "LIVE", note: "Game capture of the client window only. Mic + game on separate tracks." },
  { name: "BRB", note: "Banner still + world + ETA. No desktop." },
  { name: "STARTING", note: "Banner + title + world. 60–90s max." },
  { name: "PIN / LOGIN", note: "Cam-only or BRB. Never the PIN pad, email, or bank PIN." },
];

export const CHECKLIST = [
  "Client window captured, not desktop",
  "World on title and banner",
  "Still matches the place",
  "Delay set for the content",
  "Bank PIN scene bound to a hotkey",
  "Mic check, game ducked under voice",
  "Category + title + tags saved",
  "Keyframe 2, CBR, one game name",
  "Discord / clan call not on the desktop audio",
  "Clip bench: In / Out / crop before you post",
];
