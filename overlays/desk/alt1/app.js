/**
 * Still compositor for Alt1 Toolkit.
 *
 * Upload a still. Pick a crop. Download that JPEG.
 * Crops: 1200×480, 1280×720, 1920×1080, 1920×480, native.
 */
(function () {
  const plate = document.getElementById("plate");
  const ctx = plate.getContext("2d");
  const status = document.getElementById("status");
  const nameEl = document.getElementById("name");
  const fileEl = document.getElementById("file");

  const CROP = {
    "1200x480": { w: 1200, h: 480 },
    "1280x720": { w: 1280, h: 720 },
    "1920x1080": { w: 1920, h: 1080 },
    "1920x480": { w: 1920, h: 480 },
    native: { w: 0, h: 0 },
  };

  let still = null;
  let cropId = "1200x480";

  function say(line) {
    status.textContent = line;
  }

  function sizeFor(id) {
    if (id === "native") {
      if (still) return { w: still.naturalWidth || still.width, h: still.naturalHeight || still.height };
      return { w: 1200, h: 480 };
    }
    return CROP[id] || CROP["1200x480"];
  }

  function paintAt(w, h) {
    plate.width = w;
    plate.height = h;
    ctx.fillStyle = "#120e0a";
    ctx.fillRect(0, 0, w, h);
    if (still) {
      const sw = still.naturalWidth || still.width;
      const sh = still.naturalHeight || still.height;
      const scale = Math.max(w / sw, h / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      ctx.drawImage(still, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }
    const name = (nameEl.value || "").trim().slice(0, 12);
    if (!name) return;
    const size = w >= 1920 ? 36 : 28;
    ctx.font = size + "px sans-serif";
    ctx.lineWidth = Math.max(3, size * 0.12);
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#ffff00";
    ctx.strokeText(name, 36, 40);
    ctx.fillText(name, 36, 40);
  }

  function paint() {
    const box = sizeFor(cropId);
    paintAt(box.w, box.h);
  }

  function loadBlob(blob) {
    if (!blob || !(blob.type && blob.type.indexOf("image") === 0)) {
      say("Could not read that still.");
      return;
    }
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = function () {
      still = img;
      say("Still on the plate · " + img.naturalWidth + "×" + img.naturalHeight);
      paint();
    };
    img.onerror = function () {
      say("Could not read that still.");
    };
    img.src = url;
  }

  fileEl.addEventListener("change", function () {
    const file = fileEl.files && fileEl.files[0];
    fileEl.value = "";
    if (file) loadBlob(file);
  });

  document.body.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  document.body.addEventListener("drop", function (event) {
    event.preventDefault();
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) loadBlob(file);
  });

  nameEl.addEventListener("input", paint);

  document.querySelectorAll("[data-crop]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      cropId = btn.getAttribute("data-crop") || "1200x480";
      document.querySelectorAll("[data-crop]").forEach(function (el) {
        el.classList.toggle("on", el === btn);
      });
      paint();
      const box = sizeFor(cropId);
      say(cropId + " · " + box.w + "×" + box.h);
    });
  });

  function saveCrop(id) {
    if (!still) {
      say("Upload a still first.");
      return;
    }
    cropId = id;
    const box = sizeFor(id);
    paintAt(box.w, box.h);
    plate.toBlob(
      function (blob) {
        if (!blob) {
          say("Nothing to save.");
          return;
        }
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "banner-" + box.w + "x" + box.h + ".jpg";
        link.click();
        URL.revokeObjectURL(link.href);
        say("In the bag · " + box.w + "×" + box.h);
      },
      "image/jpeg",
      0.92,
    );
  }

  document.querySelectorAll("[data-dl]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      saveCrop(btn.getAttribute("data-dl") || "1200x480");
    });
  });

  document.getElementById("capture").onclick = function () {
    const alt1 = window.alt1;
    if (!alt1) {
      say("Alt1 is not attached. Upload a still.");
      return;
    }
    const width = Number(alt1.rsWidth || 0);
    const height = Number(alt1.rsHeight || 0);
    if (typeof alt1.captureHold !== "function" || width < 8 || height < 8) {
      say("This Alt1 build has no capture. Upload a still.");
      return;
    }
    try {
      const raw = alt1.captureHold(0, 0, width, height);
      if (!raw) {
        say("Capture empty. Upload a still.");
        return;
      }
      say("Capture returned. If the plate is blank, upload a still.");
    } catch (err) {
      say("Capture failed. Upload a still.");
    }
  };

  paint();
})();
