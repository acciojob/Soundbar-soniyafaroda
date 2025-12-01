//your JS code here. If required.
// List the sound files (place these files inside the "sounds" folder).
// Example filenames below — change these to match your actual files:
const sounds = [
  "beep.mp3",
  "drum.mp3",
  "snap.mp3",
  "chime.mp3"
];

// DOM references
const buttonsContainer = document.getElementById("buttons");
const stopBtn = document.querySelector(".stop");

let currentAudio = null;   // currently playing Audio object

// Utility: create a button element for each sound
function createSoundButton(filename) {
  const btn = document.createElement("button");
  btn.className = "btn";
  // display a nice label (remove extension)
  btn.textContent = filename.replace(/\.[^/.]+$/, "");
  btn.dataset.src = `sounds/${filename}`;

  btn.addEventListener("click", () => {
    playSound(btn.dataset.src);
  });

  return btn;
}

// Play the given sound path. Stops previous audio if any.
function playSound(src) {
  // Stop any currently playing audio
  stopCurrentAudio();

  // Create new Audio object and play
  const audio = new Audio(src);

  // Handle errors (file not found, etc.)
  audio.addEventListener("error", (e) => {
    console.error("Audio error for", src, e);
    alert(`Unable to play audio: ${src}\nMake sure the file exists in the sounds/ folder.`);
  });

  audio.play().catch(err => {
    console.error("Play prevented:", err);
  });

  currentAudio = audio;
}

// Stop and reset current audio
function stopCurrentAudio() {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  } catch (e) {
    console.warn("Error stopping audio:", e);
  }
  currentAudio = null;
}

// Build UI buttons dynamically
function setupButtons() {
  // If there are no sounds, show a helpful message
  if (!sounds.length) {
    const note = document.createElement("div");
    note.className = "note";
    note.textContent = "No sound files configured. Add audio files to the sounds/ folder and list them in script.js";
    buttonsContainer.appendChild(note);
    return;
  }

  sounds.forEach(s => {
    const btn = createSoundButton(s);
    buttonsContainer.appendChild(btn);
  });
}

// Stop button click
stopBtn.addEventListener("click", () => {
  stopCurrentAudio();
});

// Initialize
setupButtons();

