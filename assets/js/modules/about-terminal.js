// About sayfasındaki terminal. Oturum bir kez akar, satırlar silinmez,
// yukarı kaydırıp okunabilir.
const SESSION = [
  { cmd: "whoami", out: ["operator, kursadyanik.com"] },
  { cmd: "cat ./description.txt", out: ["i have no idea what i'm doing"] },
  { cmd: "status --brief", out: ["site: online", "mode: quiet", "notes: public"] },
  { cmd: "contact --show", out: ["email: kursad@keemail.me", "response: async, eventually"] },
];

export default function initAboutTerminal() {
  const terminal = document.querySelector("[data-live-terminal]");
  if (!terminal) return;

  const commandEl = terminal.querySelector("[data-terminal-command]");
  const outputEl = terminal.querySelector("[data-terminal-output]");
  const clockEl = terminal.querySelector("[data-terminal-clock]");
  const pingEl = terminal.querySelector("[data-terminal-ping]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const locale = document.documentElement.lang || "tr-TR";

  const steps = SESSION.concat([
    { cmd: "date", out: [new Date().toLocaleString(locale)] },
  ]);

  function nearBottom() {
    return outputEl.scrollHeight - outputEl.scrollTop - outputEl.clientHeight < 40;
  }

  function append(line) {
    const stick = nearBottom();
    outputEl.appendChild(line);
    if (stick) outputEl.scrollTop = outputEl.scrollHeight;
  }

  function addLine(text, extraClass) {
    const line = document.createElement("div");
    line.className = extraClass ? `terminal-output-line ${extraClass}` : "terminal-output-line";
    line.textContent = text;
    append(line);
  }

  function addEcho(cmd) {
    const line = document.createElement("div");
    line.className = "terminal-output-line terminal-echo";

    const prompt = document.createElement("span");
    prompt.className = "terminal-echo-prompt";
    prompt.textContent = "operator@kursadyanik:~$ ";

    const command = document.createElement("span");
    command.className = "terminal-echo-cmd";
    command.textContent = cmd;

    line.append(prompt, command);
    append(line);
  }

  function typeText(text, done) {
    if (reduced) {
      commandEl.textContent = text;
      window.setTimeout(done, 250);
      return;
    }

    commandEl.textContent = "";
    let index = 0;
    const timer = window.setInterval(() => {
      commandEl.textContent += text.charAt(index);
      index += 1;
      if (index < text.length) return;
      window.clearInterval(timer);
      window.setTimeout(done, 300);
    }, 26 + Math.floor(Math.random() * 16));
  }

  function printLines(lines, index, done) {
    if (index >= lines.length) {
      done();
      return;
    }

    addLine(lines[index]);
    window.setTimeout(
      () => printLines(lines, index + 1, done),
      reduced ? 0 : 90 + Math.floor(Math.random() * 120)
    );
  }

  function runStep(index) {
    if (index >= steps.length) {
      commandEl.textContent = "";
      window.setTimeout(
        () => addLine("session idle, scroll up to read the log", "terminal-muted"),
        reduced ? 0 : 500
      );
      return;
    }

    const step = steps[index];
    typeText(step.cmd, () => {
      addEcho(step.cmd);
      commandEl.textContent = "";
      printLines(step.out, 0, () => {
        window.setTimeout(
          () => runStep(index + 1),
          reduced ? 120 : 650 + Math.floor(Math.random() * 500)
        );
      });
    });
  }

  function updateClock() {
    if (clockEl) clockEl.textContent = new Date().toLocaleTimeString(locale);
    if (pingEl) pingEl.textContent = `latency ${18 + Math.floor(Math.random() * 48)}ms`;
  }

  updateClock();
  window.setInterval(updateClock, 1000);
  addLine("booting about session...", "terminal-muted");
  window.setTimeout(() => runStep(0), reduced ? 200 : 800);
}
