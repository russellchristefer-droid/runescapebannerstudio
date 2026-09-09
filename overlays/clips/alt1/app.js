/**
 * Clip bench for Alt1 Toolkit.
 *
 * Upload a clip you own. Pick a crop. Download that size as WebM.
 * Crops: 1920×1080, 1280×720, 1080×1920, 1080×1080, 1200×480, native.
 */
(function () {
  const video = document.getElementById("vid");
  const stage = document.getElementById("stage");
  const ctx = stage.getContext("2d");
  const status = document.getElementById("status");
  const span = document.getElementById("span");
  const fileEl = document.getElementById("file");

  const CROP = {
    "16:9-1080": { w: 1920, h: 1080 },
    "16:9-720": { w: 1280, h: 720 },
    "9:16": { w: 1080, h: 1920 },
    "1:1": { w: 1080, h: 1080 },
    banner: { w: 1200, h: 480 },
    native: { w: 0, h: 0 },
  };

  let objectUrl = "";
  let inPoint = 0;
  let outPoint = 0;
  let cropId = "16:9-720";
  let busy = false;

  function say(line) {
    status.textContent = line;
  }

  function showSpan() {
    span.textContent = "In " + inPoint.toFixed(2) + " · Out " + outPoint.toFixed(2);
  }

  function sizeFor(id) {
    if (id === "native") {
      return { w: video.videoWidth || 1280, h: video.videoHeight || 720 };
    }
    return CROP[id] || CROP["16:9-720"];
  }

  function coverDraw(w, h) {
    stage.width = w;
    stage.height = h;
    ctx.fillStyle = "#120e0a";
    ctx.fillRect(0, 0, w, h);
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    const scale = Math.max(w / vw, h / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  function downloadBlob(blob, fileName) {
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      link.remove();
      URL.revokeObjectURL(href);
    }, 2500);
  }

  function take(file) {
    if (!file) return;
    const ok = (file.type && file.type.indexOf("video") === 0) || /\.(mp4|webm|mov|m4v)$/i.test(file.name || "");
    if (!ok) {
      say("Could not read that file.");
      return;
    }
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    video.load();
    video.onloadedmetadata = function () {
      inPoint = 0;
      outPoint = video.duration || 0;
      showSpan();
      say(file.name + " · " + (video.duration || 0).toFixed(2) + "s · " + video.videoWidth + "×" + video.videoHeight);
    };
    video.onerror = function () {
      say("Could not read that file.");
    };
  }

  document.getElementById("upload").onclick = function () {
    fileEl.click();
  };
  fileEl.addEventListener("change", function () {
    const file = fileEl.files && fileEl.files[0];
    fileEl.value = "";
    take(file);
  });

  document.body.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  document.body.addEventListener("drop", function (event) {
    event.preventDefault();
    take(event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]);
  });

  document.getElementById("play").onclick = function () {
    video.play().catch(function () {
      say("Could not play that file.");
    });
  };
  document.getElementById("pause").onclick = function () {
    video.pause();
  };
  document.getElementById("markIn").onclick = function () {
    inPoint = video.currentTime || 0;
    if (inPoint > outPoint) outPoint = video.duration || inPoint;
    showSpan();
  };
  document.getElementById("markOut").onclick = function () {
    outPoint = video.currentTime || 0;
    if (outPoint < inPoint) inPoint = 0;
    showSpan();
  };

  document.querySelectorAll("[data-crop]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      cropId = btn.getAttribute("data-crop") || "16:9-720";
      document.querySelectorAll("[data-crop]").forEach(function (el) {
        el.classList.toggle("on", el === btn);
      });
      const box = sizeFor(cropId);
      say(cropId + " · " + box.w + "×" + box.h);
    });
  });

  function pickMime() {
    if (typeof MediaRecorder === "undefined") return "";
    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")) return "video/webm;codecs=vp8,opus";
    if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) return "video/webm;codecs=vp8";
    if (MediaRecorder.isTypeSupported("video/webm")) return "video/webm";
    return "";
  }

  async function saveCrop(id) {
    if (busy) return;
    if (!video.src || !video.duration) {
      say("Upload a clip first.");
      return;
    }
    const mime = pickMime();
    if (!mime) {
      say("This window cannot record.");
      return;
    }
    const box = sizeFor(id);
    const w = box.w;
    const h = box.h;
    busy = true;
    say("Making " + w + "×" + h + "…");
    coverDraw(w, h);
    const capture = stage.captureStream || stage.mozCaptureStream;
    if (!capture) {
      busy = false;
      say("This window cannot record.");
      return;
    }
    const stream = capture.call(stage, 30);
    let rec;
    try {
      rec = new MediaRecorder(stream, { mimeType: mime });
    } catch (err) {
      busy = false;
      say("This window cannot record.");
      return;
    }
    const chunks = [];
    rec.ondataavailable = function (event) {
      if (event.data && event.data.size) chunks.push(event.data);
    };
    rec.onstop = function () {
      busy = false;
      const blob = new Blob(chunks, { type: rec.mimeType || "video/webm" });
      if (blob.size < 64) {
        say("Export wrote an empty file.");
        return;
      }
      downloadBlob(blob, "clip-" + w + "x" + h + "-" + Math.round(inPoint) + "-" + Math.round(outPoint) + ".webm");
      say("In the bag · " + w + "×" + h);
    };
    video.currentTime = inPoint;
    await video.play().catch(function () {});
    rec.start(200);
    const guard = window.setTimeout(function () {
      if (rec.state !== "inactive") rec.stop();
    }, Math.min(120000, Math.max(800, (outPoint - inPoint) * 1000 + 2000)));
    function tick() {
      coverDraw(w, h);
      if (video.currentTime >= outPoint || video.ended) {
        video.pause();
        if (rec.state !== "inactive") rec.stop();
        video.removeEventListener("timeupdate", tick);
        window.clearTimeout(guard);
      }
    }
    video.addEventListener("timeupdate", tick);
  }

  document.querySelectorAll("[data-dl]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.getAttribute("data-dl") || "16:9-720";
      cropId = id;
      void saveCrop(id);
    });
  });
})();
