// Alt bilgideki canlı durum ışığı. Sitenin kendi köküne HEAD isteği atıp
// yanıtın durumuna göre yeşil, sarı veya kırmızı yanar.
const PROBE_INTERVAL = 30000;
const PROBE_TIMEOUT = 4000;

function formatTime(date, locale) {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  } catch (error) {
    return date.toLocaleTimeString();
  }
}

export default function initSystemStatus() {
  const root = document.querySelector("[data-system-status]");
  const value = document.querySelector("[data-system-status-value]");
  if (!root || !value) return;

  const clock = document.querySelector("[data-system-clock]");
  const locale = document.documentElement.lang || "tr-TR";
  const canProbe =
    (window.location.protocol === "http:" || window.location.protocol === "https:") &&
    typeof fetch !== "undefined" &&
    typeof AbortController !== "undefined";

  let label = "Checking";
  let state = "checking";
  let lastChecked = new Date();

  function render() {
    root.dataset.state = state;
    value.textContent = label;
    root.setAttribute(
      "aria-label",
      `System status: ${label}. Last check ${formatTime(lastChecked, locale)}`
    );
  }

  function setStatus(nextState, nextLabel) {
    state = nextState;
    label = nextLabel;
    lastChecked = new Date();
    render();
  }

  // Saat sayfa yenilenmeyi beklemeden saniyesi saniyesine akar.
  function startClock() {
    if (!clock) return;

    const tick = () => {
      clock.textContent = formatTime(new Date(), locale);
    };

    tick();
    // İlk vuruşu tam saniye başına hizala, sonrası saniyede bir.
    window.setTimeout(() => {
      tick();
      window.setInterval(tick, 1000);
    }, 1000 - (Date.now() % 1000));
  }

  async function probe() {
    if (navigator.onLine === false) {
      setStatus("offline", "Offline");
      return;
    }

    if (!canProbe) {
      setStatus("live", "Live");
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), PROBE_TIMEOUT);

    try {
      const response = await fetch(`${window.location.origin}/`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });
      const healthy = response.status < 500;
      setStatus(healthy ? "live" : "limited", healthy ? "Live" : "Degraded");
    } catch (error) {
      setStatus("offline", "Offline");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  window.addEventListener("online", probe);
  window.addEventListener("offline", () => setStatus("offline", "Offline"));

  render();
  startClock();
  probe();
  window.setInterval(probe, PROBE_INTERVAL);
}
