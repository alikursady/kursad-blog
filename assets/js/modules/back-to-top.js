// Bir ekran boyu aşağı inilince yukarı çıkma düğmesi görünür.
export default function initBackToTop() {
  const link = document.getElementById("top-link");
  if (!link) return;

  const toggle = () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    link.classList.toggle("hidden", scrolled <= window.innerHeight);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}
