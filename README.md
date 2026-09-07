# RuneScape Banner Studio

A fan site for streamers who need a banner that looks like it belongs next to a RuneScape client. It is not Jagex, not a game client, and not an official overlay.

Live site: [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

There are two git remotes on purpose. Public is the tree people clone. Private is the backup I actually trust.

- Public: [russellchristefer-droid/runescapebannerstudio](https://github.com/russellchristefer-droid/runescapebannerstudio)
- Private: [russellchristefer-droid/runescapebannerstudio-private](https://github.com/russellchristefer-droid/runescapebannerstudio-private)

You can make a 1200×480 JPEG on the desk, walk towns and bosses, read an Old School PvP sheet, trim a clip you own, and look up who is live if a Twitch key exists. If the key is missing the list still shows. That is not a bug.

## How the code is split

Old School and RuneScape 3 are different games. The folders treat them that way: different stills, different street lines, different skill packs.

The plate type is RS Chat Bold, yellow with a black edge. Random stills come from files in `public/era/`, not a live scrape of the Wayback Machine. Hiscores and live badges fail quietly if Jagex or Twitch is down. Clip Save records mute, gain, and fades because those go through Web Audio, not the raw `<video>` element.

Short write-ups of those choices live in [docs/adr/](docs/adr/). A one-page map is [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Stack

React 19 and TanStack Start on Vite 8. Node 22. Canvas for the desk. MediaRecorder plus Web Audio for clips. CI is `.github/workflows/ci.yml` running `npm run ci:gates` then `npm run build`.

No Python server. No second Vite app. Tokens stay in the environment, never in git.

## Folders

```
src/desk/       the still compositor
src/places/     PlaceRail and the cards
src/edit/       clip bench and the sound strip
src/legal/      operator notice
src/lib/        catalogs and the yellow painter
src/routes/     pages
public/         stills, skills, marks, fonts
server/api/     hiscores and live probes
```

## Run it

```bash
git clone https://github.com/russellchristefer-droid/runescapebannerstudio.git
cd runescapebannerstudio
npm ci
npm run dev
```

Then:

```bash
npm run ci:gates
npm run build
npm run preview
```

Line endings are LF. On a phone, just use the live site.

If you want live badges, set these locally and do not commit them:

```
TWITCH_CLIENT_ID=
TWITCH_APP_TOKEN=
YOUTUBE_API_KEY=
```

## Legal

Stills are for identification. Jagex owns the game art. The fan policy is linked from [Legal](https://runescapebannerstudio.grok.me/legal).

Also: [SECURITY.md](SECURITY.md), [NOTICE](NOTICE), [CONTRIBUTING.md](CONTRIBUTING.md), [Jagex Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy).

Code and original prose are under [LICENSE](LICENSE). Operator: Christefer Lee Russell-Barnett.
