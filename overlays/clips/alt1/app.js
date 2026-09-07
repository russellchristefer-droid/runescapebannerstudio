/**
 * Clip bench for Alt1 Toolkit.
 *
 * Add the app with overlays/clips/alt1/appconfig.json.
 * No pixel permission. Upload a clip you own, mark In / Out, Save WebM.
 * index.html ships the same logic inline for GitHub raw.
 */
(function () {
  const video = document.getElementById("vid");
  const status = document.getElementById("status");
  const span = document.getElementById("span");
  const fileEl = document.getElementById("file");

  let objectUrl = "";
  let inPoint = 0;
  let outPoint = 0;

  function say(line) {
    status.textContent = line;
  }

  function showSpan() {
    span.textContent = "In " + inPoint.toFixed(2) + " · Out " + outPoint.toFixed(2);
  }

  function take(file) {
    if (!file) {
      return;
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;
    video.onloadedmetadata = function () {
      inPoint = 0;
      outPoint = video.duration || 0;
      showSpan();
      say(file.name + " · " + (video.duration || 0).toFixed(2) + "s");
    };
    video.onerror = function () {
      say("Could not read that file.");
    };
  }

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
    if (inPoint > outPoint) {
      outPoint = video.duration || inPoint;
    }
    showSpan();
  };
  document.getElementById("markOut").onclick = function () {
    outPoint = video.currentTime || 0;
    if (outPoint < inPoint) {
      inPoint = 0;
    }
    showSpan();
  };

  document.getElementById("save").onclick = async function () {
    if (!video.src || !video.duration) {
      say("No clip.");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      say("This window cannot record.");
      return;
    }
    const stream = video.captureStream
      ? video.captureStream()
      : video.mozCaptureStream && video.mozCaptureStream();
    if (!stream) {
      say("This window cannot record.");
      return;
    }
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
      ? "video/webm;codecs=vp8"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType: mime });
    const chunks = [];
    recorder.ondataavailable = function (event) {
      if (event.data && event.data.size) {
        chunks.push(event.data);
      }
    };
    recorder.onstop = function () {
      const blob = new Blob(chunks, { type: recorder.mimeType || "video/webm" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "clip-" + Math.round(inPoint) + "-" + Math.round(outPoint) + ".webm";
      link.click();
      URL.revokeObjectURL(link.href);
      say("In the bag.");
    };
    video.currentTime = inPoint;
    await video.play().catch(function () {});
    recorder.start();
    function tick() {
      if (video.currentTime >= outPoint || video.ended) {
        video.pause();
        recorder.stop();
        video.removeEventListener("timeupdate", tick);
      }
    }
    video.addEventListener("timeupdate", tick);
  };
})();
