let video = document.getElementById("video");
let recordedVideo = document.getElementById("recordedVideo");

let mediaStream;
let mediaRecorder;
let chunks = [];

// Start camera + mic
async function startMedia() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    video.srcObject = mediaStream;
    console.log("Camera & Mic started");

  } catch (err) {
    console.error("Permission denied:", err);
  }
}

// Start recording
function startRecording() {
  if (!mediaStream) {
    alert("Start camera first!");
    return;
  }

  chunks = [];
  mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.ondataavailable = e => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const videoURL = URL.createObjectURL(blob);
    recordedVideo.src = videoURL;
  };

  mediaRecorder.start();
  console.log("Recording started");
}

// Stop recording
function stopRecording() {
  mediaRecorder.stop();
  console.log("Recording stopped");
}
