$(document).ready(() => {
  const virusModal = document.getElementById("virusModal");
  const modalInstance = new bootstrap.Modal(virusModal);

  function goFullScreen() {
    const element = document.documentElement; // Use the whole document for fullscreen

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      console.warn("Fullscreen API is not supported by this browser.");
    }
  }

  // Attach fullscreen to a button or user interaction
  $("#activateFullscreenButton").on("click", () => {
    goFullScreen();
    modalInstance.show(); // Show the modal
  });

  // Detect when fullscreen is exited and prompt user to re-enter
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      alert("You exited fullscreen mode. Please return to fullscreen.");
    }
  });

  // Prevent back navigation (if necessary, but this is intrusive)
  history.pushState(null, null, window.location.href);
  window.onpopstate = () => history.forward();

  // Prevent screen sleep with the Wake Lock API
  if ("wakeLock" in navigator) {
    navigator.wakeLock.request("screen").catch((err) => {
      console.error("Wake lock error:", err);
    });
  }
});
