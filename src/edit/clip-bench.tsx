import { useEffect, useRef } from "react";
import { bindClipBench } from "./clipBench";

const CHIP =
  "min-h-11 rounded-md border border-[#c6a45a]/40 bg-[#1a1610] px-3 text-[11px] text-parchment disabled:opacity-40";

export function ClipBench() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLCanvasElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const uploadRef = useRef<HTMLButtonElement | null>(null);
  const playRef = useRef<HTMLButtonElement | null>(null);
  const pauseRef = useRef<HTMLButtonElement | null>(null);
  const saveRef = useRef<HTMLButtonElement | null>(null);
  const ltInputRef = useRef<HTMLInputElement | null>(null);
  const ltToggleRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    const fileInput = fileRef.current;
    const uploadBtn = uploadRef.current;
    const playBtn = playRef.current;
    const pauseBtn = pauseRef.current;
    const saveBtn = saveRef.current;
    const ltInput = ltInputRef.current;
    const ltToggle = ltToggleRef.current;
    const status = statusRef.current;
    if (!video || !stage || !fileInput || !uploadBtn || !playBtn || !pauseBtn || !saveBtn || !ltInput || !ltToggle || !status) {
      return;
    }
    return bindClipBench({
      video,
      stage,
      fileInput,
      uploadBtn,
      playBtn,
      pauseBtn,
      saveBtn,
      ltInput,
      ltToggle,
      status,
    });
  }, []);

  return (
    <div className="px-4 py-4">
      <input
        ref={fileRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        className="sr-only"
      />
      <div className="relative overflow-hidden rounded-md border border-[#c6a45a]/40 bg-[#0b0a08]">
        <video ref={videoRef} className="sr-only" playsInline preload="metadata" />
        <canvas ref={stageRef} className="mx-auto block max-h-[28rem] w-full bg-[#0b0a08]" width={1280} height={720} />
        <p id="clipEmpty" className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-faint">
          No clip
        </p>
      </div>
      <p ref={statusRef} className="mt-2 text-center text-[11px] text-muted" aria-live="polite">
        Upload a clip you own.
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        <button ref={uploadRef} type="button" className={CHIP}>
          Upload
        </button>
        <button ref={playRef} type="button" className={`${CHIP} text-[#efe4c8]`} style={{ background: "#9b1b1b" }}>
          Play
        </button>
        <button ref={pauseRef} type="button" className={CHIP}>
          Pause
        </button>
        <button id="back2" type="button" className={CHIP}>
          −2s
        </button>
        <button id="fwd2" type="button" className={CHIP}>
          +2s
        </button>
        <button id="frameBack" type="button" className={CHIP}>
          −1f
        </button>
        <button id="frameFwd" type="button" className={CHIP}>
          +1f
        </button>
        <button id="markIn" type="button" className={CHIP}>
          In
        </button>
        <button id="markOut" type="button" className={CHIP}>
          Out
        </button>
        <button id="snap" type="button" className={CHIP}>
          Snap
        </button>
        <button id="rot90" type="button" className={CHIP}>
          Rotate
        </button>
        <button id="scaleUp" type="button" className={CHIP}>
          +
        </button>
        <button id="scaleDown" type="button" className={CHIP}>
          −
        </button>
        <button id="mute" type="button" className={CHIP}>
          Mute
        </button>
        <button id="fade" type="button" className={CHIP}>
          Fade
        </button>
        <button ref={saveRef} type="button" className={CHIP}>
          Save
        </button>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        <button type="button" data-crop="16:9-1080" className={CHIP}>
          1080p 16:9
        </button>
        <button type="button" data-crop="16:9-720" className={CHIP}>
          720p 16:9
        </button>
        <button type="button" data-crop="9:16" className={CHIP}>
          9:16
        </button>
        <button type="button" data-crop="1:1" className={CHIP}>
          1:1
        </button>
        <button type="button" data-crop="native" className={CHIP}>
          Native
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted">
        <label className="flex min-h-11 items-center gap-2">
          <input ref={ltToggleRef} type="checkbox" className="size-4 accent-[#c6a45a]" />
          Lower third
        </label>
        <input
          ref={ltInputRef}
          maxLength={24}
          spellCheck={false}
          placeholder="Lower third"
          className="min-h-11 w-56 rounded-md border border-[#c6a45a]/40 bg-[#1a1610] px-2 text-sm text-parchment"
        />
      </div>
    </div>
  );
}
