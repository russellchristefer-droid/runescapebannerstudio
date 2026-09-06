# RuneScape Banner Studio

Hats: defensive only. Source backup is the private remote.

Independent fan studio for **Twitch / YouTube / Discord** identification stills.
Not a Jagex product. Not a game client. Not an official overlay.

**Live:** [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

**Repos**
- Public: [russellchristefer-droid/runescapebannerstudio](https://github.com/russellchristefer-droid/runescapebannerstudio)
- Private backup: [russellchristefer-droid/runescapebannerstudio-private](https://github.com/russellchristefer-droid/runescapebannerstudio-private)

## What it does

- Banner desk: town still + display name (12 letters) + skills / marks + export at 1200×480, 1280×720, 1920×1080, 1920×480
- [Towns](https://runescapebannerstudio.grok.me/towns), [gods](https://runescapebannerstudio.grok.me/gods), [bosses](https://runescapebannerstudio.grok.me/bosses), [bestiary](https://runescapebannerstudio.grok.me/monsters), [Classic](https://runescapebannerstudio.grok.me/classic)
- [PvP](https://runescapebannerstudio.grok.me/pvp) (Old School only), [clips](https://runescapebannerstudio.grok.me/edit), [streamers](https://runescapebannerstudio.grok.me/streamers), [YouTubers](https://runescapebannerstudio.grok.me/youtubers)
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

Open the URL the app prints.

```bash
npm run build
npm run preview
```

**Windows:** install Node from [nodejs.org](https://nodejs.org) (22 LTS). Use PowerShell in the repo folder.

**macOS:** Node 22 from nodejs.org or `brew install node@22`.

**Linux:** Node 22 from NodeSource or your package manager.

If `npm run dev` fails, delete `node_modules` and run `npm install` again.

Line endings in this repo are `LF` (see [.gitattributes](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/.gitattributes)) so Windows Git does not rewrite scripts as CRLF.

## Layout

| Path | Role |
| --- | --- |
| `src/` | App |
| `public/` | Town stills, icons, fonts |
| `public/fonts/rs-chat-bold.ttf` | Fan Chat Bold on the plate |
| `public/fonts/runescape_uf.ttf` | UF replica (optional) |

## Policy

Stills are identification. Official news and the wiki win on numbers.

- [Legal](https://runescapebannerstudio.grok.me/legal)
- [SECURITY.md](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/SECURITY.md)
- [NOTICE](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/NOTICE)
- Jagex [Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy)

## License

See [LICENSE](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/LICENSE) and [NOTICE](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/NOTICE). RuneScape © Jagex. Fan typefaces credited on Legal.
