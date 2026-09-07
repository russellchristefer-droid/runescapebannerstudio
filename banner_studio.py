#!/usr/bin/env python3
"""RuneScape Banner Studio — one-file Python sidecar.

Not the website. The site stays Node 22 + Vite.
This file only:
  python banner_studio.py serve     local static look at public/
  python banner_studio.py compose   write a 1200x480 JPEG (needs Pillow)

Stdlib for serve. Pillow is optional and only for compose.
"""

from __future__ import annotations

import argparse
import http.server
import os
import socketserver
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
DEFAULT_STILL = PUBLIC / "Falador.png"
DEFAULT_OUT = ROOT / "banner-1200x480.jpg"


def serve(host: str, port: int) -> None:
    folder = PUBLIC if PUBLIC.is_dir() else ROOT
    os.chdir(folder)

    class Handler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self) -> None:
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Referrer-Policy", "no-referrer")
            super().end_headers()

    with socketserver.ThreadingTCPServer((host, port), Handler) as httpd:
        httpd.allow_reuse_address = True
        print(f"Serving {folder} at http://{host}:{port}/")
        print("Stills only. The desk compositor is still the Node app.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


def compose(still: Path, name: str, out: Path, width: int, height: int) -> int:
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("compose needs Pillow:  python3 -m pip install pillow", file=sys.stderr)
        return 2
    if not still.is_file():
        print(f"No still at {still}", file=sys.stderr)
        return 1
    src = Image.open(still).convert("RGB")
    sw, sh = src.size
    dst_ratio = width / max(1, height)
    src_ratio = sw / max(1, sh)
    if src_ratio > dst_ratio:
        tw = int(sh * dst_ratio)
        sx = (sw - tw) // 2
        crop = src.crop((sx, 0, sx + tw, sh))
    else:
        th = int(sw / dst_ratio)
        sy = (sh - th) // 2
        crop = src.crop((0, sy, sw, sy + th))
    plate = crop.resize((width, height), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(plate)
    label = (name or "").strip()[:12]
    if label:
        size = 36 if height <= 480 else 44
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
        except OSError:
            font = ImageFont.load_default()
        x, y = 36, 24
        for dx, dy in ((-2, 0), (2, 0), (0, -2), (0, 2), (-2, -2), (2, 2)):
            draw.text((x + dx, y + dy), label, font=font, fill=(0, 0, 0))
        draw.text((x, y), label, font=font, fill=(255, 255, 0))
    out.parent.mkdir(parents=True, exist_ok=True)
    plate.save(out, "JPEG", quality=96)
    print(f"Wrote {out} ({width}x{height})")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Python sidecar for RuneScape Banner Studio.")
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("serve", help="Serve public/ over HTTP")
    s.add_argument("--host", default="127.0.0.1")
    s.add_argument("--port", type=int, default=8765)
    c = sub.add_parser("compose", help="Cover-crop a still into a JPEG")
    c.add_argument("--still", type=Path, default=DEFAULT_STILL)
    c.add_argument("--name", default="")
    c.add_argument("--out", type=Path, default=DEFAULT_OUT)
    c.add_argument("--width", type=int, default=1200)
    c.add_argument("--height", type=int, default=480)
    args = p.parse_args(argv)
    if args.cmd == "serve":
        serve(args.host, args.port)
        return 0
    return compose(args.still, args.name, args.out, args.width, args.height)


if __name__ == "__main__":
    raise SystemExit(main())
