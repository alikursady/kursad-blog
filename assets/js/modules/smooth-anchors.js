// Sayfa içi bağlantılar yumuşak kaysın. Hareketi azaltılmış modda anında gider.
export default function initSmoothAnchors() {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.querySelector(`[id="${decodeURIComponent(id)}"]`);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView(reduced ? undefined : { behavior: "smooth" });

      if (id === "top") {
        history.replaceState(null, "", " ");
      } else {
        history.pushState(null, "", `#${id}`);
      }
    });
  });
}
