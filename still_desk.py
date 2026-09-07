#!/usr/bin/env python3
"""Still compositor — one-file Python sidecar.

Not the website desk. The live compositor stays in the browser.

  python3 still_desk.py compose --still public/Falador.png --name Christefer
  python3 still_desk.py compose --size 1280x720 --still public/Falador.png --out banner.jpg

Needs Pillow:  python3 -m pip install pillow
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT / "public"
SIZES = {
    "1200x480": (1200, 480),
    "1280x720": (1280, 720),
    "1920x1080": (1920, 1080),
    "1920x480": (1920, 480),
}


def cover(src, width: int, height: int):
    sw, sh = src.size
    dst = width / max(1, height)
    ratio = sw / max(1, sh)
    if ratio > dst:
        tw = int(sh * dst)
        sx = (sw - tw) // 2
        crop = src.crop((sx, 0, sx + tw, sh))
    else:
        th = int(sw / dst)
        sy = (sh - th) // 2
        crop = src.crop((0, sy, sw, sy + th))
    from PIL import Image

    return crop.resize((width, height), Image.Resampling.LANCZOS)


def paint_name(draw, name: str, width: int, height: int, pack_left: int | None = None, pack_right: int | None = None) -> None:
    label = (name or "").strip()[:12]
    if not label:
        return
    from PIL import ImageFont

    size = 22 if height <= 480 else 28 if height < 1000 else 36
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except OSError:
        font = ImageFont.load_default()
    box = draw.textbbox((0, 0), label, font=font)
    name_w = box[2] - box[0]
    if pack_left is not None and pack_right is not None:
        x = pack_left + (pack_right - pack_left - name_w) / 2
        y = 24
    else:
        x, y = 36, 24
    for dx, dy in ((-2, 0), (2, 0), (0, -2), (0, 2)):
        draw.text((x + dx, y + dy), label, font=font, fill=(0, 0, 0))
    draw.text((x, y), label, font=font, fill=(255, 255, 0))


def stamp_icons(plate, skills: list[str], width: int, height: int) -> tuple[int, int] | None:
    from PIL import Image

    cell = 40 if width < 1280 else 44 if width < 1920 else 52
    left = 36
    top = max(60, height // 3)
    folder = PUBLIC / "skills"
    last = None
    count = 0
    for i, skill in enumerate(skills[:16]):
        path = folder / f"{skill}.png"
        if not path.is_file():
            path = folder / f"osrs-{skill}.png"
        if not path.is_file():
            continue
        icon = Image.open(path).convert("RGBA")
        icon = icon.resize((cell, cell), Image.Resampling.NEAREST)
        x = left + (i % 8) * (cell + 8)
        y = top + (i // 8) * (cell + 8)
        plate.paste(icon, (x, y), icon)
        last = x + cell
        count += 1
    if not count:
        return None
    return left, last


def compose(still: Path, name: str, out: Path, size_id: str, skills: list[str]) -> int:
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        print("Needs Pillow:  python3 -m pip install pillow", file=sys.stderr)
        return 2
    if not still.is_file():
        print(f"No still at {still}", file=sys.stderr)
        return 1
    width, height = SIZES.get(size_id, SIZES["1200x480"])
    src = Image.open(still).convert("RGB")
    plate = cover(src, width, height)
    pack = None
    if skills:
        pack = stamp_icons(plate, skills, width, height)
    draw = ImageDraw.Draw(plate)
    if pack:
        paint_name(draw, name, width, height, pack[0], pack[1])
    else:
        paint_name(draw, name, width, height)
    out.parent.mkdir(parents=True, exist_ok=True)
    plate.save(out, "JPEG", quality=96)
    print(f"Wrote {out} ({width}x{height})")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Python still compositor sidecar.")
    p.add_argument("--still", type=Path, default=PUBLIC / "Falador.png")
    p.add_argument("--name", default="")
    p.add_argument("--size", default="1200x480", choices=list(SIZES))
    p.add_argument("--out", type=Path, default=ROOT / "banner-desk.jpg")
    p.add_argument("--skills", default="", help="Comma list of skill file stems in public/skills/")
    args = p.parse_args(argv)
    skills = [s.strip() for s in args.skills.split(",") if s.strip()]
    return compose(args.still, args.name, args.out, args.size, skills)


if __name__ == "__main__":
    raise SystemExit(main())
