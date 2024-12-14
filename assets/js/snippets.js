<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <title>Fullscreen Example</title>
  <style>
    body, html {
      height: 100%;
      margin: 0;
      overflow: hidden;
    }
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .btn {
      padding: 10px 20px;
      font-size: 20px;
      background-color: red;
      color: white;
      border: none;
      cursor: pointer;
    }
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .modal.show {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-content {
      background: white;
      padding: 20px;
      text-align: center;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>Welcome to the Fullscreen Page</h1>
    <button class="btn" id="startBtn">Start</button>
  </div>

  <div class="modal" id="lockModal">
    <div class="modal-content">
      <h2>Device Locked</h2>
      <p>You can no longer scroll or exit this screen.</p>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const startBtn = document.getElementById('startBtn');
      const lockModal = document.getElementById('lockModal');

      // Function to hide the address bar and go fullscreen
      function hideAddressBarAndEnterFullscreen() {
        // Wait for the page to load and scroll slightly to hide the address bar
        window.scrollTo(0, 1);  // This hides the address bar on mobile Safari

        // Request fullscreen if available
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
        }

        // Show the modal to lock the user
        setTimeout(() => {
          lockModal.classList.add('show');
        }, 500); // Delay to ensure fullscreen and scrolling have happened
      }

      // Listen for the "Start" button click to initiate the fullscreen and locking behavior
      startBtn.addEventListener('click', () => {
        hideAddressBarAndEnterFullscreen();
      });

      // Listen for scroll events to trigger fullscreen after user scrolls
      window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
          hideAddressBarAndEnterFullscreen();
        }
      });

      // Prevent further scrolling and interactions by locking the modal in place
      window.addEventListener('scroll', (e) => {
        if (window.scrollY === 0) {
          e.preventDefault(); // Prevent scrolling
        }
      });

      // Prevent any touch interactions after locking
      window.addEventListener('touchmove', (e) => {
        e.preventDefault();
      });
    });
  </script>
</body>
</html>
