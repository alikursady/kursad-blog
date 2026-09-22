import initNav from "./modules/nav.js";
import initSmoothAnchors from "./modules/smooth-anchors.js";
import initBackToTop from "./modules/back-to-top.js";
import initThemeToggle from "./modules/theme-toggle.js";
import initCodeCopy from "./modules/code-copy.js";
import initImageZoom from "./modules/image-zoom.js";
import initSystemStatus from "./modules/system-status.js";
import initAboutTerminal from "./modules/about-terminal.js";
import initWhereAmI from "./modules/where-am-i.js";

// Her modül kendi elemanını bulamazsa sessizce çıkar, bu yüzden tek paket
// bütün sayfalarda güvenle çalışır.
const modules = [
  initNav,
  initSmoothAnchors,
  initBackToTop,
  initThemeToggle,
  initCodeCopy,
  initImageZoom,
  initSystemStatus,
  initAboutTerminal,
  initWhereAmI,
];

modules.forEach((init) => {
  try {
    init();
  } catch (error) {
    // Bir modülün hatası diğerlerini durdurmasın.
    console.error(error);
  }
});
