// Get all buttons
const soundButtons = document.querySelectorAll(".btn");
const stopButton = document.querySelector(".stop");

let audio = null;

// Play sound on button click
soundButtons.forEach(button => {
    button.addEventListener("click", () => {
        const soundFile = button.getAttribute("data-sound");

        // Stop previous audio if any
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        audio = new Audio(`sounds/${soundFile}`);
        audio.play();
    });
});

// Stop button
stopButton.addEventListener("click", () => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
});
