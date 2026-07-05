document.addEventListener("DOMContentLoaded", function() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js";
  script.onload = function() {
    mediumZoom('img', {
      margin: 24,
      background: '#000000cc',
      scrollOffset: 0
    });
  };
  document.body.appendChild(script);
});
