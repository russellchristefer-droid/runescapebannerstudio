# RuneLite sidecar

Not on Plugin Hub. Not the website.

This plugin adds a sidebar button that opens the live desk in your browser and can draw a local JPEG you already exported. It does not click. It does not read chat.

## Load it

```bash
cd overlays/runelite
mvn package
```

Copy `target/banner-studio-1.0.0.jar` into RuneLite’s sidecar / external plugins folder (the one your RuneLite install documents). Restart the client. Enable **Banner Studio**.

## Config

- Desk URL defaults to `https://runescapebannerstudio.grok.me/`
- Overlay file is a JPEG on disk from the desk Download. Leave it blank if you only want the button.

Official rules win. Do not ask this plugin to type.
