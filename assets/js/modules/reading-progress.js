// Yazı sayfasının en üstündeki ince okuma çubuğu. Yazının ne kadarının
// okunduğunu gösterir; çubuk yoksa hiçbir şey yapmaz.
export default function initReadingProgress() {
  const bar = document.querySelector("[data-okuma-cubugu] i");
  const article = document.querySelector(".post-single");
  if (!bar || !article) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const ratio = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
  update();
}
