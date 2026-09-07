# Client sidecars (not the website)

RuneScape® and Old School RuneScape® are registered trademarks of Jagex Limited. These are downloadable apps. The website is separate.

## Still compositor

| Client | Add |
| --- | --- |
| Alt1 | [appconfig.json](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/desk/alt1/appconfig.json) · [alt1://addapp](alt1://addapp/https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/desk/alt1/appconfig.json) |
| RuneLite | Sideload [overlays/runelite](https://github.com/russellchristefer-droid/runescapebannerstudio/tree/main/overlays/runelite) and enable **Banner Studio** |

## Clip bench

| Client | Add |
| --- | --- |
| Alt1 | [appconfig.json](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/clips/alt1/appconfig.json) · [alt1://addapp](alt1://addapp/https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/clips/alt1/appconfig.json) |
| RuneLite | Same jar. Enable **Clip bench** |

RuneLite: developer mode, `mvn -q package` in `overlays/runelite`, copy `target/banner-studio-1.0.0.jar` to `~/.runelite/sideloaded-plugins` (or `externalplugins`).

```bash
node overlays/check.mjs
```
