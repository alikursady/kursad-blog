// "where am i" sayfasındaki tuval. Sayfa görüş alanına girdikçe uyanır,
// imleç pencereye yaklaştıkça arkadaki gölge kıpırdar.
export default function initWhereAmI() {
  const stage = document.querySelector("[data-canvas]");
  if (!stage) return;

  const win = stage.querySelector("[data-window]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // is-ready yalnızca betik çalıştığında eklenir. Betik yoksa her şey
  // olduğu gibi, gizlenmeden görünür.
  stage.classList.add("is-ready");
  if (win) win.classList.add("is-ready");

  const wake = (el) => el && el.classList.add("is-awake");

  if (!("IntersectionObserver" in window)) {
    wake(stage);
    wake(win);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          wake(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(stage);
    if (win) observer.observe(win);
  }

  const shadow = stage.querySelector("[data-silhouette]");
  const hoverable = window.matchMedia("(hover: hover)").matches;
  if (!win || !shadow || reduced || !hoverable) return;

  win.addEventListener("pointermove", (event) => {
    const box = win.getBoundingClientRect();
    const dx = (event.clientX - box.left) / box.width - 0.5;
    const dy = (event.clientY - box.top) / box.height - 0.5;
    shadow.style.setProperty("--shadow-shift-x", `${(dx * -14).toFixed(2)}px`);
    shadow.style.setProperty("--shadow-shift-y", `${(dy * -8).toFixed(2)}px`);
    win.classList.add("is-close");
  });

  win.addEventListener("pointerleave", () => {
    shadow.style.setProperty("--shadow-shift-x", "0px");
    shadow.style.setProperty("--shadow-shift-y", "0px");
    win.classList.remove("is-close");
  });
}
