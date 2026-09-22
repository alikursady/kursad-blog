// Sayfa boyanmadan once calisir, tema secimi yuzunden ekran titremesin diye.
// Varsayilan karanlik; daha once aydinlik secmis ziyaretciler bir kereye mahsus
// karanliga alinir, sonraki secimleri saklanir.
(function () {
  var MIGRATION_KEY = "dark-default-2026";

  try {
    if (!localStorage.getItem(MIGRATION_KEY)) {
      localStorage.setItem(MIGRATION_KEY, "1");
      localStorage.removeItem("pref-theme");
      document.documentElement.dataset.theme = "dark";
      return;
    }

    var stored = localStorage.getItem("pref-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
    }
  } catch (error) {
    // Depolama kapaliysa varsayilan tema oldugu gibi kalir.
  }
})();
