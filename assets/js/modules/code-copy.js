import params from "@params";

const COPY = params.copyLabel || "Kopyala";
const COPIED = params.copiedLabel || "Kopyalandı!";

function copyText(node) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(node.textContent);
  }

  // Pano izni olmayan eski tarayıcılarda metni seçip kopyalamak gerekiyor.
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    selection.removeRange(range);
  }
}

// Düğmenin tutunacağı kutu, kod bloğunun satır numaralı olup olmamasına göre değişir.
function containerFor(block) {
  const wrapper = block.parentNode.parentNode;
  if (wrapper.classList.contains("highlight")) return wrapper;

  const table = block.closest("table");
  if (table) return table;

  if (wrapper.parentNode.firstChild === wrapper) return null;
  return block.parentNode;
}

export default function initCodeCopy() {
  document.querySelectorAll("pre > code").forEach((block) => {
    const container = containerFor(block);
    if (!container) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = COPY;

    button.addEventListener("click", () => {
      copyText(block).then(
        () => {
          button.textContent = COPIED;
          window.setTimeout(() => {
            button.textContent = COPY;
          }, 2000);
        },
        () => {
          // Kopyalama engellendiyse düğme eski halinde kalır.
        }
      );
    });

    container.appendChild(button);
  });
}
