type Sound = {
  muted: boolean;
  gain: number;
  fadeIn: number;
  fadeOut: number;
  peak: number;
};

export const sound: Sound = {
  muted: false,
  gain: 1,
  fadeIn: 0,
  fadeOut: 0,
  peak: 0,
};

let ctx: AudioContext | null = null;
let src: MediaElementAudioSourceNode | null = null;
let gainNode: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let dest: MediaStreamAudioDestinationNode | null = null;
let raf = 0;

export function attachSound(video: HTMLVideoElement) {
  if (src) {
    void ctx?.resume();
    applyGain();
    return;
  }
  const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  src = ctx.createMediaElementSource(video);
  gainNode = ctx.createGain();
  analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  dest = ctx.createMediaStreamDestination();
  src.connect(gainNode);
  gainNode.connect(analyser);
  gainNode.connect(ctx.destination);
  gainNode.connect(dest);
  video.muted = false;
  video.volume = 1;
  applyGain();
  meter();
  void ctx.resume();
}

function applyGain() {
  if (!gainNode || !ctx) return;
  gainNode.gain.cancelScheduledValues(ctx.currentTime);
  gainNode.gain.setTargetAtTime(sound.muted ? 0 : sound.gain, ctx.currentTime, 0.03);
}

function meter() {
  if (!analyser) return;
  const data = new Uint8Array(analyser.fftSize);
  const tick = () => {
    analyser?.getByteTimeDomainData(data);
    let peak = 0;
    for (let i = 0; i < data.length; i++) {
      const v = Math.abs(data[i] - 128) / 128;
      if (v > peak) peak = v;
    }
    sound.peak = peak;
    const bar = document.getElementById("pk");
    if (bar) bar.style.transform = `scaleX(${peak})`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

export function setMute(on: boolean) {
  sound.muted = on;
  applyGain();
}

export function setGain(g: number) {
  sound.gain = Math.min(2, Math.max(0, g));
  applyGain();
}

export function setFade(inn: number, out: number) {
  sound.fadeIn = Math.max(0, inn);
  sound.fadeOut = Math.max(0, out);
}

export function armFades(video: HTMLVideoElement, inT: number, outT: number) {
  if (!gainNode || !ctx) return;
  const now = ctx.currentTime;
  const g = sound.muted ? 0 : sound.gain;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(0, now);
  if (sound.fadeIn > 0) gainNode.gain.linearRampToValueAtTime(g, now + sound.fadeIn);
  else gainNode.gain.setValueAtTime(g, now);
  const remain = Math.max(0, outT - video.currentTime);
  if (sound.fadeOut > 0 && remain > sound.fadeOut) {
    const t = now + (remain - sound.fadeOut);
    gainNode.gain.setValueAtTime(g, t);
    gainNode.gain.linearRampToValueAtTime(0, t + sound.fadeOut);
  }
}

export function soundTracks() {
  return dest?.stream.getAudioTracks() ?? [];
}

export function detachSound() {
  cancelAnimationFrame(raf);
  try {
    src?.disconnect();
    gainNode?.disconnect();
    analyser?.disconnect();
    dest?.disconnect();
  } catch {
    /* already gone */
  }
  src = gainNode = analyser = dest = null;
  void ctx?.close();
  ctx = null;
  sound.peak = 0;
}
