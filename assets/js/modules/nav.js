// Menü yatayda kayabiliyor. Sayfa değişince kullanıcının bıraktığı yerden
// devam etsin diye kaydırma konumu saklanıyor.
const STORAGE_KEY = "menu-scroll-position";

export default function initNav() {
  const menu = document.getElementById("menu");
  if (!menu) return;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) menu.scrollLeft = parseInt(saved, 10);
  } catch (error) {
    // Depolama kapalıysa menü başından başlar.
  }

  menu.addEventListener(
    "scroll",
    () => {
      try {
        localStorage.setItem(STORAGE_KEY, menu.scrollLeft);
      } catch (error) {
        // Yazılamıyorsa kaydırma yine de çalışır.
      }
    },
    { passive: true }
  );
}
