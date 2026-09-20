export class SeekError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SeekError";
  }
}

export function seekTo(video: HTMLVideoElement, time: number, ms = 4000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!video.src) {
      reject(new SeekError("No clip loaded."));
      return;
    }
    const dur = Number.isFinite(video.duration) ? video.duration : time;
    const t = Math.min(Math.max(0, time), Math.max(0, dur));
    let done = false;
    const finish = (err?: Error) => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      window.clearTimeout(timer);
      err ? reject(err) : resolve();
    };
    const onSeeked = () => finish();
    const onError = () => finish(new SeekError(video.error?.message || "Seek failed."));
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    const timer = window.setTimeout(() => {
      finish(new SeekError("Seek timed out."));
    }, ms);
    try {
      video.currentTime = t;
    } catch {
      finish(new SeekError("This file cannot seek."));
      return;
    }
    if (Math.abs(video.currentTime - t) < 0.04 && video.readyState >= 2) {
      finish();
    }
  });
}
