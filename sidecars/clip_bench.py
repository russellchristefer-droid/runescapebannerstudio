#!/usr/bin/env python3
"""Clip bench — one-file Python sidecar.

Not the website editor. The live bench stays in the browser.

  python3 clip_bench.py public/media/poh.mp4 --in 0 --out 3 --write clip.mp4
  python3 clip_bench.py clip.mp4 --size 9:16 --pack balanced --write clip.mp4
  python3 clip_bench.py clip.mp4 --still public/Falador.jpg --write clip.mp4

Writes H.264 + AAC MP4 (TikTok / Twitch / X). Needs ffmpeg on PATH.
Picks a hardware encoder when ffmpeg has one (NVENC, QSV, AMF, VideoToolbox), else libx264.

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


_ENCODER_CACHE: str | None = None


LADDER = {
    "small": ("4M", "96k"),
    "balanced": ("6.5M", "128k"),
    "high": ("10M", "160k"),
}


def even(n: int) -> int:
    return max(16, int(n) & ~1)


def export_box(chip_w: int, chip_h: int, src_w: int, src_h: int) -> tuple[int, int]:
    cw, ch = even(chip_w), even(chip_h)
    sw, sh = max(16, src_w), max(16, src_h)
    if sw >= cw or sh >= ch:
        return cw, ch
    scale = min(sw / cw, sh / ch)
    return even(max(16, round(cw * scale))), even(max(16, round(ch * scale)))


def bitrate_for(pack: str) -> tuple[str, str]:
    return LADDER.get(pack, LADDER["balanced"])


def list_encoders(bin_: str) -> set[str]:
    run = subprocess.run([bin_, "-hide_banner", "-encoders"], capture_output=True, text=True)
    names: set[str] = set()
    for line in (run.stdout or "").splitlines():
        parts = line.split()
        if len(parts) >= 2:
            names.add(parts[1])
    return names


def pick_h264(bin_: str, want: str = "auto") -> str:
    global _ENCODER_CACHE
    if want and want != "auto":
        return want
    if _ENCODER_CACHE:
        return _ENCODER_CACHE
    names = list_encoders(bin_)
    for cand in ("h264_nvenc", "h264_qsv", "h264_amf", "h264_videotoolbox", "libx264"):
        if cand in names:
            _ENCODER_CACHE = cand
            return cand
    _ENCODER_CACHE = "libx264"
    return "libx264"


def video_args(encoder: str, pack: str) -> list[str]:
    rate, _audio = bitrate_for(pack)
    tail = ["-pix_fmt", "yuv420p", "-r", "30", "-g", "60", "-b:v", rate, "-maxrate", rate, "-bufsize", str(int(float(rate.replace("M", "")) * 2)) + "M"]
    if encoder == "h264_nvenc":
        return [
            "-c:v",
            "h264_nvenc",
            "-preset",
            "p5",
            "-tune",
            "hq",
            "-rc",
            "vbr",
            "-cq",
            "19",
            "-profile:v",
            "high",
            "-level",
            "4.0",
            *tail,
        ]
    if encoder == "h264_qsv":
        return ["-c:v", "h264_qsv", "-preset", "veryfast", "-profile:v", "high", *tail]
    if encoder == "h264_amf":
        return ["-c:v", "h264_amf", "-quality", "speed", "-rc", "vbr_peak", "-profile:v", "high", *tail]
    if encoder == "h264_videotoolbox":
        return ["-c:v", "h264_videotoolbox", "-profile:v", "high", "-allow_sw", "1", "-q:v", "55", *tail]
    return [
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-profile:v",
        "high",
        "-level",
        "4.0",
        *tail,
    ]


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
    encoder: str = "auto",
    still: Path | None = None,
    pack: str = "balanced",
) -> int:
    bin_ = ffmpeg_bin()
    if not bin_:
        print("ffmpeg is not on PATH. Install ffmpeg, then run this file again.", file=sys.stderr)
        return 2
    if not src.is_file():
        print(f"No clip at {src}", file=sys.stderr)
        return 1
    src_w, src_h = probe_size(src)
    if size_id == "native":
        w, h = src_w, src_h
    else:
        pair = SIZES.get(size_id) or SIZES["9:16"]
        w, h = export_box(pair[0], pair[1], src_w, src_h)
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
    chosen = pick_h264(bin_, encoder)
    attempts: list[tuple[bool, str]] = []
    if chosen != "libx264":
        attempts.append((True, chosen))
        attempts.append((False, chosen))
    attempts.append((True, "libx264"))
    attempts.append((False, "libx264"))
    out.parent.mkdir(parents=True, exist_ok=True)
    last_err = ""
    used = chosen
    for decode_hw, enc in attempts:
        cmd = [
            bin_,
            "-hide_banner",
            "-y",
        ]
        if decode_hw:
            cmd += ["-hwaccel", "auto"]
        cmd += [
            "-ss",
            str(max(0.0, in_t)),
            "-to",
            str(max(in_t + 0.05, out_t)),
            "-i",
            str(src),
        ]
        if mute:
            cmd += ["-f", "lavfi", "-t", f"{span:.3f}", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000"]
        still_idx: int | None = None
        if still:
            if not still.is_file():
                print(f"No still at {still}", file=sys.stderr)
                return 1
            cmd += ["-loop", "1", "-t", f"{span:.3f}", "-i", str(still)]
            still_idx = 2 if mute else 1
        if still_idx is not None:
            chain = ",".join(vf)
            fc = (
                f"[0:v]{chain}[base];"
                f"[{still_idx}:v]scale={w}:{h}:force_original_aspect_ratio=increase,crop={w}:{h}[st];"
                f"[base][st]overlay=0:0[vout]"
            )
            cmd += ["-filter_complex", fc, "-map", "[vout]"]
            if mute:
                cmd += ["-map", "1:a"]
            else:
                cmd += ["-map", "0:a?"]
            cmd += video_args(enc, pack)
        else:
            cmd += [
                "-vf",
                ",".join(vf),
                *video_args(enc, pack),
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
            bitrate_for(pack)[1],
            "-shortest",
            "-movflags",
            "+faststart",
            "-f",
            "mp4",
            str(out),
        ]
        run = subprocess.run(cmd, capture_output=True, text=True)
        if run.returncode == 0:
            used = enc
            last_err = ""
            break
        last_err = run.stderr[-800:] or "ffmpeg failed."
        used = enc
    else:
        print(last_err, file=sys.stderr)
        return 1
    print(f"Wrote {out} ({w}x{h}, {used}, {pack} VBR)")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Python clip bench sidecar. Writes MP4.")
    p.add_argument("clip", type=Path, help="Source video you own")
    p.add_argument("--in", dest="in_t", type=float, default=0.0)
    p.add_argument("--out", dest="out_t", type=float, default=6.0)
    p.add_argument("--size", default="9:16", choices=list(SIZES))
    p.add_argument("--pack", default="balanced", choices=list(LADDER), help="VBR ladder: small 4M, balanced 6.5M, high 10M")
    p.add_argument("--write", type=Path, default=None)
    p.add_argument("--mute", action="store_true")
    p.add_argument("--fade-in", type=float, default=0.0)
    p.add_argument("--fade-out", type=float, default=0.0)
    p.add_argument("--gain", type=float, default=1.0, help="Linear gain 0–2")
    p.add_argument("--still", type=Path, default=None, help="Photo to cover-crop onto the frame (like Upload still)")
    p.add_argument(
        "--encoder",
        default="auto",
        choices=["auto", "h264_nvenc", "h264_qsv", "h264_amf", "h264_videotoolbox", "libx264"],
        help="Video encoder. auto picks NVENC/QSV/AMF/VideoToolbox, else libx264.",
    )
    args = p.parse_args(argv)
    if args.write is None:
        args.write = ROOT / "christefer-1.mp4"
    return trim(
        args.clip,
        args.write,
        args.in_t,
        args.out_t,
        args.size,
        args.mute,
        args.fade_in,
        args.fade_out,
        args.gain,
        args.encoder,
        args.still,
        args.pack,
    )


if __name__ == "__main__":
    raise SystemExit(main())
