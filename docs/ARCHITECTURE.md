# Architecture

One origin. Canvas desk, file routes, local assets.

```
card img.src  →  deskStore.still  →  paint  →  JPEG
PlaceRail     →  /towns|/gods|/bosses|/pvp
/edit         →  clip + Web Audio graph → WebM
```

## Modules (one of each)

- `PlaceRail` — section / canon / god. Real `<a href>`.
- `deskStore` — name, clan, still `src`, stamps.
- `paintRSYellow` — plate and lower third only.
- `useStill` — card and Use on banner.
- `layoutPack` — Fit / Room / Desk cell from plate width and height, including level glyphs.
- `clipSound` — gain, mute, fades, meter; export taps the processed destination node.

## Constraints we keep

1. OSRS and RS3 catalogs do not mix.
2. A missing still is omitted or falls back to Falador. No empty plate.
3. `preventDefault` only on Use on banner and stamp drags.
4. No live scrape of wiki or Wayback from the browser.
5. No `.env` in git.

## CI

`npm run ci:gates` — `tsc --noEmit`, filename / plate-text / hour-method tests, grep for `dangerouslySetInnerHTML` and empty mailto.

If a gate is red, the tree does not ship.
