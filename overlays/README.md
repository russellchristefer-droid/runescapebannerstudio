# Client sidecars (not the website)

RuneScape® and Old School RuneScape® are registered trademarks of Jagex Limited. These sidecars are fan tools. They do not click. They are not official.

Easy add. Official rules win.

## Alt1 Toolkit

1. Install [Alt1 Toolkit](https://runeapps.org/).
2. Click [Add Banner Studio to Alt1](alt1://addapp/https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/alt1/appconfig.json)  
   or paste this into Apps → Add app:

`https://raw.githubusercontent.com/russellchristefer-droid/runescapebannerstudio/main/overlays/alt1/appconfig.json`

3. Upload a still, type a 12-letter name, Download JPEG.

Capture only works if that Toolkit build exposes `captureHold`. Otherwise upload.

## RuneLite

Not on Plugin Hub.

1. Turn on RuneLite → Settings → RuneLite → Developer mode.
2. `cd overlays/runelite && mvn -q package`
3. Copy `target/banner-studio-1.0.0.jar` into the sideload folder (create it if it is missing):

- Windows: `%USERPROFILE%\.runelite\sideloaded-plugins` or `%USERPROFILE%\.runelite\externalplugins`
- macOS / Linux: `~/.runelite/sideloaded-plugins` or `~/.runelite/externalplugins`

4. Restart the client. Enable **Banner Studio**.
5. Sidebar: **Open desk** · **Pick overlay JPEG** · **Clear overlay**.

```bash
node overlays/check.mjs
```
