# RuneScape Banner Studio

A fan site for streamers who need a banner that looks like it belongs next to a RuneScape client. It is not Jagex, not a game client, and not an official overlay.

Live site: [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

Two remotes. Public is what people clone. Private is the backup I actually trust.

- Public: [russellchristefer-droid/runescapebannerstudio](https://github.com/russellchristefer-droid/runescapebannerstudio)
- Private: [russellchristefer-droid/runescapebannerstudio-private](https://github.com/russellchristefer-droid/runescapebannerstudio-private)

## What you can do here

On the desk you pick a still (or upload one), crop it to Twitch 1200×480 or YouTube 1280×720, zoom and pan the picture, drop skills and partyhats, and download a JPEG. Levels sit next to the icons in RS Chat Bold. Fit plate / Room / Desk change how tight the pack is. Hiscores fill levels when the boards answer.

Towns, gods, bosses, and the bestiary keep two canons. Gods sit on their prayer-book field — Saradomin blue, Zamorak red, the rest matching the book. Dragons keep red, blue, green, and black behind them. The bestiary is slayer and dungeon rooms, split by Old School or RuneScape, then by room (dragons, Stronghold, Tower, Legends’ Guild). Bosses stay off that list.

`/pvp` has both canons on one page, separate sheets. `/skills` lists Old School and RuneScape skills with early / mid / late, what to wear, and the live wiki. `/edit` is a local clip bench: upload a video, mark In / Out, mute, gain, fades, Save as WebM. Stills stay on the desk.

Streamer and YouTuber halls list names even when live check is off. History ends in a small Legends’ Guild desk (first room on the left): public names only — Zezima, The Old Nite, 25 Buttholes, and the rest of that sill.

## How the code is split

Old School and RuneScape 3 are different games. Different stills, different street lines, different skill packs, different PvP grammar.

Plate type is yellow Chat Bold with a black edge. Random stills come from `public/era/`, not a live Wayback scrape. Hiscores and live badges fail quietly. Clip Save records the Web Audio graph so mute actually lands in the file.

Town plates on the desk turn every two minutes and three seconds. Bob’s quote sits under that still, marked as his. Street lines on town pages stay five minutes. Bob’s word of the day flips every thirty seconds.

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
src/lib/        catalogs, skill sheets, yellow painter
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

## Python sidecars (optional download)

Not the website. grok.me runs Node. These live under [`sidecars/`](sidecars/) if you want a script, not a second stack.

| File | Open | Raw |
| --- | --- | --- |
| Still compositor | [sidecars/still_desk.py](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/sidecars/still_desk.py) | [raw](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/sidecars/still_desk.py) |
| Clip bench | [sidecars/clip_bench.py](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/sidecars/clip_bench.py) | [raw](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/sidecars/clip_bench.py) |
| Static stills | [sidecars/banner_studio.py](https://github.com/russellchristefer-droid/runescapebannerstudio/blob/main/sidecars/banner_studio.py) | [raw](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/sidecars/banner_studio.py) |


## Legal

Stills are identification. RuneScape® and Old School RuneScape® are registered trademarks of Jagex Limited. Jagex® owns the game art. The Fan Content Policy is permission, not a sale — [Legal](https://runescapebannerstudio.grok.me/legal), [NOTICE](NOTICE), [CONTRIBUTING.md](CONTRIBUTING.md), [Jagex Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy).

## Client plugins (not the website)

| App | Alt1 | RuneLite |
| --- | --- | --- |
| Still compositor | [appconfig](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/desk/alt1/appconfig.json) | Enable **Banner Studio** after sideload |
| Clip bench | [appconfig](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/clips/alt1/appconfig.json) | Enable **Clip bench** after sideload |

How-to: [overlays/README.md](overlays/README.md)

This README is not a licence to print official marks. [LICENSE](LICENSE) covers original studio code and prose only. Operator: Christefer Lee Russell-Barnett.
