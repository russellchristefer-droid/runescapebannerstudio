export const DOWNLOADS = [
  { name: "Jagex Launcher", href: "https://www.jagex.com/launcher", note: "Official RS3 + OSRS install" },
  { name: "Old School download", href: "https://osrs.runescape.com/download", note: "OSRS landing + launcher" },
  { name: "RuneScape download", href: "https://www.runescape.com/download", note: "RS3 landing + launcher" },
  { name: "OSRS on Steam", href: "https://store.steampowered.com/app/1343370/Old_School_RuneScape/", note: "Official Steam app" },
  { name: "RuneScape on Steam", href: "https://store.steampowered.com/app/1343400/RuneScape/", note: "Official Steam app" },
  { name: "OBS Studio", href: "https://obsproject.com/", note: "Free encode for every RTMP target" },
  { name: "Twitch Studio", href: "https://www.twitch.tv/broadcast/studio", note: "Twitch-only encoder if you skip OBS" },
  { name: "Streamlabs Desktop", href: "https://streamlabs.com/", note: "OBS fork with docked alerts" },
  { name: "YouTube Studio", href: "https://studio.youtube.com/", note: "Live and VOD desk" },
  { name: "TikTok LIVE Studio", href: "https://www.tiktok.com/live/studio", note: "Official TikTok encoder" },
  { name: "Discord", href: "https://discord.com/download", note: "Clan call, not the public encode" },
  { name: "NVIDIA Broadcast", href: "https://www.nvidia.com/en-us/geforce/broadcasting/broadcast-app/", note: "Noise and cam, optional" },
  { name: "Twitch", href: "https://www.twitch.tv/broadcast", note: "Go-live dashboard" },
  { name: "X", href: "https://x.com/", note: "Go Live / Media Studio" },
  { name: "Kick", href: "https://kick.com/", note: "Kick dashboard" },
  { name: "TikTok LIVE", href: "https://www.tiktok.com/live", note: "Phone or LIVE Studio" },
  { name: "Facebook Live Producer", href: "https://www.facebook.com/live/producer", note: "Facebook / Gaming live" },
  { name: "Instagram", href: "https://www.instagram.com/", note: "Instagram Live from the app" },
  { name: "Trovo", href: "https://trovo.live/", note: "Trovo studio / RTMP" },
  { name: "Rumble", href: "https://rumble.com/", note: "Rumble Live" },
];

export const PLATFORMS = [
  {
    id: "twitch",
    title: "TWITCH",
    body: [
      "Download OBS. Add a Game Capture or Window Capture of the Jagex client only.",
      "Creator Dashboard → Stream. Paste the stream key into OBS Settings → Stream → Twitch.",
      "Category: Old School RuneScape or RuneScape. Banner 1200×480 from Banner Studio.",
    ],
  },
  {
    id: "youtube",
    title: "YOUTUBE LIVE",
    body: [
      "studio.youtube.com → Create → Go live. Copy the stream key into OBS (Service: YouTube).",
      "Title the same string as Twitch. Schedule a premiere if you are VOD-first.",
      "Do not capture the desktop. Same PIN / login scene as Twitch. Channel art from this studio: YouTube channel 2560 × 1440 px.",
    ],
  },
  {
    id: "x",
    title: "X",
    body: [
      "Go Live from the X app or Media Studio. Same OBS canvas, second output if you dual-stream.",
      "Header from this studio: X header 1500 × 500 px. Pin the live post.",
    ],
  },
  {
    id: "kick",
    title: "KICK",
    body: [
      "kick.com dashboard → stream key into OBS (Custom RTMP if Kick is not in the service list).",
      "Same client-window capture. Category RuneScape / Old School if listed.",
    ],
  },
  {
    id: "tiktok",
    title: "TIKTOK",
    body: [
      "Vertical first. Studio size TikTok video is 1080 × 1920 px (9:16). Crop the client to the centre of the action bar; do not letterbox a 16:9 capture on a phone screen.",
      "Go Live from the TikTok app or TikTok LIVE Studio. OBS can push a custom RTMP when TikTok gives you a key.",
      "Same rule as Twitch: capture the Jagex client window only. Bank PIN scene stays bound.",
      "Title the activity in plain words. One game name. Do not pack every hashtag.",
      "Clips from a kill belong on TikTok the same night. Link the long VOD on Twitch or YouTube.",
    ],
  },
  {
    id: "facebook",
    title: "FACEBOOK LIVE",
    body: [
      "facebook.com/live/producer or the Facebook app. OBS service: Facebook Live, or Custom RTMP with the key from Live Producer.",
      "Cover from this studio: Facebook cover 1640 × 624 px. Encode 1920 × 1080 or 1280 × 720.",
      "Same client-window capture. Do not show the PIN.",
    ],
  },
  {
    id: "instagram",
    title: "INSTAGRAM LIVE",
    body: [
      "Instagram Live is phone-first. Use the TikTok video size 1080 × 1920 px if you need a vertical still behind the cam.",
      "Go Live in the Instagram app. Dual-stream from OBS only if you use a tool Instagram currently allows — the app is the supported path.",
      "Keep the long raid on Twitch or YouTube. Instagram is the clip.",
    ],
  },
  {
    id: "trovo",
    title: "TROVO",
    body: [
      "trovo.live dashboard → stream key into OBS (Custom RTMP if Trovo is not listed).",
      "Category Old School RuneScape or RuneScape. Banner can reuse Twitch profile 1200 × 480 px.",
    ],
  },
  {
    id: "rumble",
    title: "RUMBLE",
    body: [
      "rumble.com live dashboard → RTMP URL and key into OBS Custom.",
      "Wallpaper 1920 × 1080 px works as a holding card. Same PIN scene.",
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
];

export const TITLE_TEMPLATES = [
  { use: "OSRS raid learners", text: "OSRS ToB learners · GIM · W418" },
  { use: "OSRS inferno", text: "OSRS Inferno attempts · HCIM" },
  { use: "OSRS nex", text: "OSRS Nex mass · mains welcome" },
  { use: "Telos (category: RuneScape)", text: "Telos streak · maxed · W84" },
  { use: "Rasial (category: RuneScape)", text: "Rasial log grind · W84" },
  { use: "Skilling", text: "OSRS 99 Runecraft · iron" },
  { use: "First kc (category: RuneScape)", text: "First Solak · learners" },
];

export const SIZES = [
  { where: "Twitch profile banner", size: "1200×480", note: "Studio: Twitch profile" },
  { where: "Twitch panel art", size: "320×160+", note: "Repeat Discord + schedule" },
  { where: "X header", size: "1500×500", note: "Studio: X header" },
  { where: "RuneScape wallpaper", size: "1920×1080", note: "Studio: wallpaper / offline" },
  { where: "YouTube channel art", size: "2560×1440", note: "Studio: YouTube channel" },
  { where: "Facebook cover", size: "1640×624", note: "Studio: Facebook cover" },
  { where: "TikTok / IG vertical", size: "1080×1920", note: "Studio: TikTok video · 9:16" },
  { where: "Discord banner", size: "960×540", note: "Studio: Discord banner" },
  { where: "Twitch encode", size: "1920×1080 or 1280×720", note: "See bitrate" },
];

export const ENCODE = [
  { setup: "1080p60 capable", bitrate: "6000 kbps", note: "Affiliate/partner cap most use" },
  { setup: "1080p30", bitrate: "4500–5000", note: "If GPU is hot in NXT" },
  { setup: "720p60", bitrate: "4500", note: "Cleaner than melted 1080" },
  { setup: "X live", bitrate: "Match Twitch", note: "Same scene collection, second output" },
];

export const DELAY = [
  { place: "House, GE, banks, raids", delay: "0–2s", note: "Callouts stay tight" },
  { place: "Slayer / overworld", delay: "3s", note: "Default" },
  { place: "Wilderness, PvP worlds", delay: "6–8s", note: "Assume you are hunted" },
  { place: "Risk fights", delay: "8s + no tile call", note: "Do not announce exact tiles" },
];

export const TWITCH = [
  "Directory: Old School RuneScape or RuneScape. Never both, never Just Chatting unless you are off-client.",
  "Tags: language + one mode + one activity. Ironman, PvM, Raids, Skilling, Learners Welcome. Stop at four.",
  "Alerts live off the action bar and prayer flick. Top-right or bottom-left only.",
  "Raid out after a kc or a clean wipe. Name the channel twice. Same category.",
  "Do not promise Drops you do not control.",
  "Highlights: first kc, cape, trim, learner wipe. Not the six-hour slayer block.",
];

export const XLIVE = [
  "Twitch is the encode. X is the clip door and a second live if you have the upload.",
  "Pin the live post with the same title string as Twitch.",
  "Hashtags: #RuneScape or #OSRS plus the activity in plain words. One tag.",
  "Clip 12–20s the same night: purple, wipe, 99. Link the VOD.",
  "No giveaway that asks for a password, recovery, or bond in DMs.",
];

export const SCENES = [
  { name: "LIVE", note: "Game capture of the client window only. Mic + game." },
  { name: "BRB", note: "Banner still + world + ETA. No desktop." },
  { name: "STARTING", note: "Banner + title + world. 60–90s max." },
  { name: "PIN / LOGIN", note: "Cam-only or BRB. Never the PIN pad or email." },
];

export const CHECKLIST = [
  "Client window captured, not desktop",
  "World on title and banner",
  "Still matches the place",
  "Delay set for the content",
  "Bank PIN scene bound to a hotkey",
  "Mic check, game ducked under voice",
  "Category + title + tags saved",
  "Discord / clan call not on the desktop audio",
];
