import { seekTo } from "./seekSafe";

export async function captureSmooth(
  video: HTMLVideoElement,
  inT: number,
  outT: number,
  fps: number,
  onFrame: (video: HTMLVideoElement, meta: { mediaTime: number }) => Promise<void> | void,
): Promise<void> {
  video.pause();
  video.playbackRate = 1;
  video.muted = true;
  video.volume = 0;
  await seekTo(video, inT);
  await video.play();
  let lastPts = -1;
  const rvfc = typeof video.requestVideoFrameCallback === "function";
  let chain = Promise.resolve();
  const stopAt = outT - 0.15;
  await new Promise<void>((resolve, reject) => {
    let settled = false;
    let handle = 0;
    const finish = (err?: Error) => {
      if (settled) return;
      settled = true;
      video.pause();
      video.muted = true;
      video.volume = 0;
      if (handle) {
        if (rvfc) video.cancelVideoFrameCallback(handle);
        else window.cancelAnimationFrame(handle);
      }
      const end = () => (err ? reject(err) : resolve());
      void chain.then(end, end);
    };
    const tick = (_now: number, meta?: VideoFrameCallbackMetadata) => {
      if (settled) return;
      const t = video.currentTime;
      if (t >= stopAt || t >= outT || video.ended) {
        finish();
        return;
      }
      const pts = meta && Number.isFinite(meta.mediaTime) ? meta.mediaTime : t;
      if (pts !== lastPts) {
        lastPts = pts;
        chain = chain.then(() => onFrame(video, { mediaTime: pts }));
      }
      handle = rvfc
        ? video.requestVideoFrameCallback(tick)
        : window.requestAnimationFrame((now) => tick(now));
    };
    handle = rvfc
      ? video.requestVideoFrameCallback(tick)
      : window.requestAnimationFrame((now) => tick(now));
    const span = Math.max(0.05, outT - inT);
    window.setTimeout(() => finish(), Math.min(45 * 60 * 1000, span * 4000 + 8000));
  });
  void fps;
}
