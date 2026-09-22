// Gece ve gündüz modu arasında geçiş. Seçim tarayıcıda saklanır.
export default function initThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;

    try {
      localStorage.setItem("pref-theme", next);
    } catch (error) {
      // Saklanamazsa seçim yalnızca bu sayfa için geçerli olur.
    }
  });
}
