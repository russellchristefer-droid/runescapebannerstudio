/**
 * Still compositor for Alt1 Toolkit.
 *
 * Add the app with overlays/desk/alt1/appconfig.json.
 * Pixel permission is only for an optional client grab.
 * This file is the readable copy. index.html ships the same logic inline
 * so GitHub raw does not have to serve JS as a module.
 */
(function () {
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
      const scale = Math.max(box.w / still.width, box.h / still.height);
      const dw = still.width * scale;
      const dh = still.height * scale;
      ctx.drawImage(still, (box.w - dw) / 2, (box.h - dh) / 2, dw, dh);
    }

    const name = (nameEl.value || "").trim().slice(0, 12);
    if (!name) {
      return;
    }
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
    img.onload = function () {
      still = img;
      say("Still on the plate.");
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
    if (file) {
      loadBlob(file);
    }
  });

  document.body.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  document.body.addEventListener("drop", function (event) {
    event.preventDefault();
    const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      loadBlob(file);
    }
  });

  document.getElementById("twitch").onclick = function () {
    box = { w: 1200, h: 480 };
    paint();
  };
  document.getElementById("yt").onclick = function () {
    box = { w: 1280, h: 720 };
    paint();
  };
  nameEl.addEventListener("input", paint);

  document.getElementById("save").onclick = function () {
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
        say("In the bag.");
      },
      "image/jpeg",
      0.92,
    );
  };

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
