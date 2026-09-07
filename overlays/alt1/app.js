/* Alt1 sidecar. Pixel permission is for a still grab only. */
const plate = document.getElementById("plate");
const ctx = plate.getContext("2d");
const status = document.getElementById("status");
const nameEl = document.getElementById("name");
const fileEl = document.getElementById("file");
let still = null;
let box = { w: 1200, h: 480 };

function say(line) {
  status.textContent = line;
}

function paint() {
  plate.width = box.w;
  plate.height = box.h;
  ctx.fillStyle = "#120e0a";
  ctx.fillRect(0, 0, box.w, box.h);
  if (still) {
    const r = Math.max(box.w / still.width, box.h / still.height);
    const dw = still.width * r;
    const dh = still.height * r;
    ctx.drawImage(still, (box.w - dw) / 2, (box.h - dh) / 2, dw, dh);
  }
  const name = (nameEl.value || "").trim().slice(0, 12);
  if (!name) return;
  ctx.font = "28px sans-serif";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#ffff00";
  ctx.strokeText(name, 36, 40);
  ctx.fillText(name, 36, 40);
}

function loadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    still = img;
    say("Still on the plate.");
    paint();
  };
  img.onerror = () => say("Could not read that still.");
  img.src = url;
}

fileEl.addEventListener("change", () => {
  const f = fileEl.files?.[0];
  fileEl.value = "";
  if (f) loadBlob(f);
});

document.getElementById("twitch").onclick = () => {
  box = { w: 1200, h: 480 };
  paint();
};
document.getElementById("yt").onclick = () => {
  box = { w: 1280, h: 720 };
  paint();
};
nameEl.addEventListener("input", paint);

document.getElementById("save").onclick = () => {
  plate.toBlob(
    (blob) => {
      if (!blob) {
        say("Nothing to save.");
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `banner-${box.w}x${box.h}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
      say("In the bag.");
    },
    "image/jpeg",
    0.92,
  );
};

document.getElementById("capture").onclick = () => {
  const a = window.alt1;
  if (!a) {
    say("Alt1 is not attached. Upload a still.");
    return;
  }
  const w = Number(a.rsWidth || 0);
  const h = Number(a.rsHeight || 0);
  if (typeof a.captureHold !== "function" || w < 8 || h < 8) {
    say("This Alt1 build has no capture. Upload a still.");
    return;
  }
  try {
    const raw = a.captureHold(0, 0, w, h);
    if (!raw) {
      say("Capture empty. Upload a still.");
      return;
    }
    say("Capture returned. If the plate is blank, upload a still.");
  } catch {
    say("Capture failed. Upload a still.");
  }
};

paint();
