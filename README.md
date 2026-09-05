# RuneScape Banner Studio

Hats: defensive only. Source backup is the private remote.

Independent fan studio for **Twitch / YouTube / Discord** identification stills.
Not a Jagex product. Not a game client. Not an official overlay.

**Live (no install):** [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

## What it does

- Banner desk: town still + display name (12 letters) + skills / marks + export at 1200×480, 1280×720, 1920×1080, 1920×480
- Towns, gods, bosses, bestiary (non-boss), Classic gallery
- History / Chronicle, streamers and YouTubers halls, clip bench
- Hiscores lookup (public boards, fail-soft)

## Platforms

| You have | You run |
| --- | --- |
| Windows / macOS / Linux | Node 22+, then `npm install` and `npm run dev` |
| Phone | Use the live site. Do not expect `npm` on iOS. |

This is a **Node app**. It is not an iPhone App Store build and there is no `.exe` installer.

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

**Windows:** install Node from [nodejs.org](https://nodejs.org) (22 LTS). Use PowerShell in the repo folder.

**macOS:** Node 22 from nodejs.org or `brew install node@22`.

**Linux:** Node 22 from NodeSource or your package manager.

If `npm run dev` fails, delete `node_modules` and run `npm install` again.

Line endings in this repo are `LF` (see `.gitattributes`) so Windows Git does not rewrite scripts as CRLF.

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
