# Client sidecars (not the website)

RuneScape®, Old School RuneScape®, and Jagex® are registered trademarks of Jagex Limited. These are downloadable apps. The website is separate.

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

These sidecars paint a JPEG or open the desk in a browser. They do not click the client, send packets, or read game memory.

Credits a RuneLite or Alt1 author would expect: [CREDITS.md](CREDITS.md)
