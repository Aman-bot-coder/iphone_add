$(document).ready(() => {
  // Function to request fullscreen
  function requestFullScreen() {
    const element = document.documentElement; // Use the whole document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // For Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      console.log("Fullscreen API is not supported on this browser.");
    }
  }

  // Function to play audio with user interaction
  function playAudio() {
    const audioPlayer = $("#audioPlayer")[0];
    if (audioPlayer) {
      audioPlayer.play().catch((err) => {
        console.log("Audio playback failed:", err.message);
      });
    }
  }

  // Combined function to handle fullscreen and audio
  function goFullScreenWithAudio() {
    playAudio();
    requestFullScreen();
    navigator.vibrate([200, 100, 200]); // Optional: vibration feedback
  }

  // Add event listener for user interaction
  const userInteractionHandler = () => {
    goFullScreenWithAudio();
    window.removeEventListener("touchstart", userInteractionHandler);
    window.removeEventListener("click", userInteractionHandler);
  };

  window.addEventListener("touchstart", userInteractionHandler, { once: true });
  window.addEventListener("click", userInteractionHandler, { once: true });

  // Ensure fullscreen request is allowed via user interaction
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      console.log("User exited fullscreen.");
    }
  });

  // Prevent Safari navigation (address bar, back button, etc.)
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();
});
