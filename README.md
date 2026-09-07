# RuneScape Banner Studio

A fan site for streamers who need a banner that looks like it belongs next to a RuneScape client. It is not Jagex, not a game client, and not an official overlay.

Live site: [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

Two remotes. Public is what people clone. Private is the backup I actually trust.

- Public: [russellchristefer-droid/runescapebannerstudio](https://github.com/russellchristefer-droid/runescapebannerstudio)
- Private: [russellchristefer-droid/runescapebannerstudio-private](https://github.com/russellchristefer-droid/runescapebannerstudio-private)

## What you can do here

On the desk you pick a still (or upload one), crop it to Twitch 1200×480 or YouTube 1280×720, zoom and pan the picture, drop skills and partyhats, and download a JPEG. Levels sit next to the icons in RS Chat Bold. Fit plate / Room / Desk change how tight the pack is. Hiscores fill levels when the boards answer.

Towns, gods, and bosses keep two canons. The bestiary is slayer rooms only — RuneScape has its own stills. PvP is Old School only. `/edit` is a local clip bench: upload a video, mark In / Out, mute, gain, fades, Save as WebM. Stills stay on the desk.

Streamer and YouTuber halls list names even when live check is off. History ends in a small Legends’ Guild desk (first room on the left): public names only — Zezima, The Old Nite, 25 Buttholes, and the rest of that sill.

## How the code is split

Old School and RuneScape 3 are different games. Different stills, different street lines, different skill packs.

Plate type is yellow Chat Bold with a black edge. Random stills come from `public/era/`, not a live Wayback scrape. Hiscores and live badges fail quietly. Clip Save records the Web Audio graph so mute actually lands in the file.

Town street lines flip every five minutes. Bob’s word of the day flips every thirty seconds.

Choices are written down in [docs/adr/](docs/adr/). One-page map: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Security colours on GitHub are Old School partyhats, not status dots — [SECURITY.md](SECURITY.md).

## Stack

React 19, TanStack Start, Vite 8, Node 22. Canvas for the desk. MediaRecorder and Web Audio for clips. CI runs `npm run ci:gates` then `npm run build`.

No Python server. No second Vite app. Tokens stay in the environment.

## Folders

```
src/desk/       still compositor
src/places/     PlaceRail and cards
src/edit/       clip bench and sound strip
src/legal/      operator notice
src/lib/        catalogs and the yellow painter
src/routes/     pages
public/         stills, skills, marks, fonts
server/api/     hiscores and live probes
docs/partyhats/ wiki hats used in SECURITY.md
```

## Run it

```bash
git clone https://github.com/russellchristefer-droid/runescapebannerstudio.git
cd runescapebannerstudio
npm ci
npm run dev
```

```bash
npm run ci:gates
npm run build
npm run preview
```

Line endings are LF. On a phone, use the live site.

Live badges (optional, never commit):

```
TWITCH_CLIENT_ID=
TWITCH_APP_TOKEN=
YOUTUBE_API_KEY=
```

## Legal

Stills are identification. Jagex owns the game art. Policy: [Legal](https://runescapebannerstudio.grok.me/legal), [NOTICE](NOTICE), [CONTRIBUTING.md](CONTRIBUTING.md), [Jagex Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy).

[LICENSE](LICENSE). Operator: Christefer Lee Russell-Barnett.
