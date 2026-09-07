# Client sidecars (not the website)

Verified against the current Alt1 appconfig shape and the official RuneLite example plugin (`@PluginDescriptor`, `@Provides`, `LinkBrowser`). They do not click. They do not read chat.

| Client | Add / build |
| --- | --- |
| Alt1 | Paste this into Alt1 → Apps → Add app: [appconfig.json](https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/alt1/appconfig.json) |
| RuneLite | Sideload [overlays/runelite](https://github.com/russellchristefer-droid/runescapebannerstudio/tree/main/overlays/runelite). Not on Plugin Hub. `mvn package` then copy the jar. |

```bash
node overlays/check.mjs
```

Capture in Alt1 only works if that Toolkit build exposes `captureHold`. Otherwise upload a still. Overlay JPEG on RuneLite is optional and capped so it does not cover the client.
