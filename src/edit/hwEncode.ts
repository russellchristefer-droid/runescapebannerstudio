export type EncQ = { w: number; h: number; fps: number; bitrate: number };

const AVC = ["avc1.640028", "avc1.4D401F", "avc1.42E01E"] as const;

function even(n: number) {
  return Math.max(16, n & ~1);
}

/** Browser hint only. Never NVENC / VideoToolbox ffmpeg names. */
export async function pickEncoder(q: EncQ) {
  if (typeof VideoEncoder === "undefined") return null;
  const width = even(q.w);
  const height = even(q.h);
  const tries: VideoEncoderConfig[] = [];
  for (const codec of AVC) {
    tries.push({
      codec,
      width,
      height,
      bitrate: q.bitrate,
      framerate: q.fps,
      hardwareAcceleration: "prefer-hardware",
      latencyMode: "quality",
      avc: { format: "avc" },
    });
  }
  for (const codec of AVC) {
    tries.push({
      codec,
      width,
      height,
      bitrate: q.bitrate,
      framerate: q.fps,
      hardwareAcceleration: "no-preference",
      latencyMode: "quality",
      avc: { format: "avc" },
    });
  }
  for (const cfg of tries) {
    try {
      const r = await VideoEncoder.isConfigSupported(cfg);
      if (r.supported) return { ...cfg, ...(r.config ?? {}) } as VideoEncoderConfig;
    } catch {
      /* next */
    }
  }
  return null;
}

export async function hwNote(q: EncQ): Promise<string> {
  const cfg = await pickEncoder(q);
  if (!cfg) return "encoder: none (recorder fallback)";
  const hw = cfg.hardwareAcceleration ?? "no-preference";
  return `encoder: ${cfg.codec} · ${hw}`;
}
