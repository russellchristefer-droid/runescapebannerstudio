#!/usr/bin/env python3
"""Clip bench — one-file Python sidecar.

Not the website editor. The live bench stays in the browser.

  python3 clip_bench.py public/media/poh.mp4 --in 0 --out 3 --write clip.mp4
  python3 clip_bench.py clip.mp4 --size 16:9-720 --mute --fade-in 0.5 --fade-out 0.5

Writes H.264 + AAC MP4 (TikTok / Twitch / X). Needs ffmpeg on PATH.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SIZES = {
    "1920x1080": (1920, 1080),
    "16:9-1080": (1920, 1080),
    "1280x720": (1280, 720),
    "16:9-720": (1280, 720),
    "1080x1920": (1080, 1920),
    "9:16": (1080, 1920),
    "1080x1080": (1080, 1080),
    "1:1": (1080, 1080),
    "1200x480": (1200, 480),
    "banner": (1200, 480),
    "native": None,
}


def ffmpeg_bin() -> str | None:
    return shutil.which("ffmpeg")


def even(n: int) -> int:
    return max(16, int(n) & ~1)


def bitrate_for(w: int, h: int) -> str:
    pixels = w * h
    if pixels >= 1920 * 1080:
        return "12M"
    if pixels >= 1080 * 1080:
        return "8M"
    if pixels >= 1280 * 720:
        return "7.5M"
    return "5M"


def probe_size(src: Path) -> tuple[int, int]:
    probe = shutil.which("ffprobe")
    if not probe:
        return 1280, 720
    run = subprocess.run(
        [
            probe,
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "stream=width,height",
            "-of",
            "csv=p=0",
            str(src),
        ],
        capture_output=True,
        text=True,
    )
    if run.returncode != 0 or not run.stdout.strip():
        return 1280, 720
    try:
        w, h = run.stdout.strip().split(",")[:2]
        return even(int(w)), even(int(h))
    except ValueError:
        return 1280, 720


def trim(
    src: Path,
    out: Path,
    in_t: float,
    out_t: float,
    size_id: str,
    mute: bool,
    fade_in: float,
    fade_out: float,
    gain: float,
) -> int:
    bin_ = ffmpeg_bin()
    if not bin_:
        print("ffmpeg is not on PATH. Install ffmpeg, then run this file again.", file=sys.stderr)
        return 2
    if not src.is_file():
        print(f"No clip at {src}", file=sys.stderr)
        return 1
    if size_id == "native":
        w, h = probe_size(src)
    else:
        pair = SIZES.get(size_id) or SIZES["1280x720"]
        w, h = even(pair[0]), even(pair[1])
    span = max(0.05, out_t - in_t)
    if out.suffix.lower() not in {".mp4", ".m4v"}:
        out = out.with_suffix(".mp4")
    vf = [
        f"scale={w}:{h}:force_original_aspect_ratio=increase",
        f"crop={w}:{h}",
        "format=yuv420p",
        "fps=30",
    ]
    if fade_in > 0:
        vf.append(f"fade=t=in:st=0:d={fade_in}")
    if fade_out > 0:
        start = max(0.0, span - fade_out)
        vf.append(f"fade=t=out:st={start}:d={fade_out}")
    cmd = [
        bin_,
        "-y",
        "-ss",
        str(max(0.0, in_t)),
        "-to",
        str(max(in_t + 0.05, out_t)),
        "-i",
        str(src),
    ]
    if mute:
        cmd += ["-f", "lavfi", "-t", f"{span:.3f}", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000"]
    cmd += [
        "-vf",
        ",".join(vf),
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level",
        "4.0",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-g",
        "60",
        "-b:v",
        bitrate_for(w, h),
    ]
    if not mute:
        af = []
        if gain != 1:
            af.append(f"volume={max(0.0, min(2.0, gain))}")
        if fade_in > 0:
            af.append(f"afade=t=in:st=0:d={fade_in}")
        if fade_out > 0:
            start = max(0.0, span - fade_out)
            af.append(f"afade=t=out:st={start}:d={fade_out}")
        if af:
            cmd += ["-af", ",".join(af)]
    cmd += [
        "-c:a",
        "aac",
        "-profile:a",
        "aac_low",
        "-ar",
        "48000",
        "-ac",
        "2",
        "-b:a",
        "128k",
        "-shortest",
        "-movflags",
        "+faststart",
        "-f",
        "mp4",
        str(out),
    ]
    out.parent.mkdir(parents=True, exist_ok=True)
    run = subprocess.run(cmd, capture_output=True, text=True)
    if run.returncode != 0:
        print(run.stderr[-800:] or "ffmpeg failed.", file=sys.stderr)
        return 1
    print(f"Wrote {out} ({w}x{h})")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Python clip bench sidecar. Writes MP4.")
    p.add_argument("clip", type=Path, help="Source video you own")
    p.add_argument("--in", dest="in_t", type=float, default=0.0)
    p.add_argument("--out", dest="out_t", type=float, default=6.0)
    p.add_argument("--size", default="1280x720", choices=list(SIZES))
    p.add_argument("--write", type=Path, default=ROOT / "clip-out.mp4")
    p.add_argument("--mute", action="store_true")
    p.add_argument("--fade-in", type=float, default=0.0)
    p.add_argument("--fade-out", type=float, default=0.0)
    p.add_argument("--gain", type=float, default=1.0, help="Linear gain 0–2")
    args = p.parse_args(argv)
    return trim(args.clip, args.write, args.in_t, args.out_t, args.size, args.mute, args.fade_in, args.fade_out, args.gain)


if __name__ == "__main__":
    raise SystemExit(main())
