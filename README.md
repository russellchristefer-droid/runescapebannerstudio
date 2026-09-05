# RuneScape Banner Studio

Hats: defensive only. Source backup is the private remote.

Independent fan studio for **Twitch / YouTube / Discord** identification stills.
Not a Jagex product. Not a game client. Not an official overlay.

**Live:** [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

## What it does

- Banner desk: town still + display name (12 letters) + skills / marks + export at 1200×480, 1280×720, 1920×1080, 1920×480
- Towns, gods, bosses, bestiary (non-boss), Classic gallery
- History / Chronicle, streamers and YouTubers halls, clip bench
- Hiscores lookup (public boards, fail-soft)

## Run on any computer

Requires **Node 22+**.

```bash
git clone https://github.com/russellchristefer-droid/runescapebannerstudio.git
cd runescapebannerstudio
npm install
npm run dev
```

Open the URL Vite prints (**port 8080**).

```bash
npm run build
npm run preview
```

## Layout

| Path | Role |
| --- | --- |
| `src/` | App |
| `public/` | Town stills, icons, fonts |
| `public/fonts/rs-chat-bold.ttf` | Fan Chat Bold on the plate |
| `public/fonts/runescape_uf.ttf` | UF replica (optional) |

## Policy

Stills are identification. Official news and the wiki win on numbers. See `/legal` and Jagex [Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy).

## License

See `LICENSE` and `NOTICE`. RuneScape © Jagex. Fan typefaces credited in `/legal`.
