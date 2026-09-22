// Yazılardaki görseller tıklanınca büyüsün. Kitaplık ilk ihtiyaç anında çekilir.
const SOURCE = "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js";

export default function initImageZoom() {
  const images = document.querySelectorAll(".post-content img");
  if (!images.length) return;

  const script = document.createElement("script");
  script.src = SOURCE;
  script.defer = true;
  script.addEventListener("load", () => {
    window.mediumZoom(images, {
      margin: 24,
      background: "#000000cc",
      scrollOffset: 0,
    });
  });

  document.body.appendChild(script);
}
