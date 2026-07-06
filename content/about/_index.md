---
title: "About"
date: 2025-11-07T16:00:00+03:00
draft: false
description: "i have no idea what i'm doing"
hideMeta: true
disableAnchoredHeadings: true
---

<div class="about-hero">
  <p class="about-hero-kicker">// whoami</p>
  <h2 class="about-hero-title">kursadyanik</h2>
  <p class="about-hero-tagline">Information Security &amp; Research</p>
  <div class="about-chips">
    <a class="about-chip about-chip-mail" href="mailto:kursad@keemail.me" rel="nofollow">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
      kursad@keemail.me
    </a>
    <span class="about-chip about-chip-status"><span class="about-chip-dot" aria-hidden="true"></span> signal: open</span>
  </div>
</div>

<div class="about-terminal live-terminal" data-live-terminal role="group" aria-label="Live terminal session">
  <div class="about-terminal-bar" aria-hidden="true">
    <span class="terminal-dot terminal-dot-red"></span>
    <span class="terminal-dot terminal-dot-amber"></span>
    <span class="terminal-dot terminal-dot-green"></span>
    <span class="terminal-title">session:/about</span>
    <span class="terminal-clock" data-terminal-clock>--:--:--</span>
  </div>
  <div class="terminal-screen">
    <div class="terminal-status-strip">
      <span><span class="terminal-live-dot" aria-hidden="true"></span> live</span>
      <span data-terminal-ping>latency --ms</span>
      <span>tty0</span>
    </div>
    <div class="terminal-output" data-terminal-output aria-live="polite"></div>
    <div class="about-terminal-line">
      <span class="about-terminal-prompt">operator@kursadyanik:~$</span>
      <span class="about-terminal-command" data-terminal-command></span>
      <span class="about-terminal-cursor" aria-hidden="true"></span>
    </div>
  </div>
</div>

<noscript>
  <div class="about-terminal-output">i have no idea what i'm doing<br>email: <a href="mailto:kursad@keemail.me">kursad@keemail.me</a></div>
</noscript>

<script>
  (function () {
    var terminal = document.querySelector("[data-live-terminal]");
    if (!terminal) return;

    var commandEl = terminal.querySelector("[data-terminal-command]");
    var outputEl = terminal.querySelector("[data-terminal-output]");
    var clockEl = terminal.querySelector("[data-terminal-clock]");
    var pingEl = terminal.querySelector("[data-terminal-ping]");
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Oturum bir kez akar; satırlar silinmez, yukarı kaydırıp okunabilir.
    var session = [
      { cmd: "whoami", out: ["operator — information security & research"] },
      { cmd: "uname -a", out: ["KursadOS 1.0 quiet-mode #1 SMP (curiosity-driven build)"] },
      { cmd: "cat ./description.txt", out: ["i have no idea what i'm doing"] },
      { cmd: "status --brief", out: ["site: online", "mode: quiet", "notes: public"] },
      { cmd: "contact --show", out: ["email: kursad@keemail.me", "response: async, eventually"] },
      { cmd: "date", out: [new Date().toLocaleString(document.documentElement.lang || "tr-TR")] }
    ];

    function updateClock() {
      var now = new Date();
      clockEl.textContent = now.toLocaleTimeString(document.documentElement.lang || "tr-TR");
      pingEl.textContent = "latency " + (18 + Math.floor(Math.random() * 48)) + "ms";
    }

    function nearBottom() {
      return outputEl.scrollHeight - outputEl.scrollTop - outputEl.clientHeight < 40;
    }

    function addLine(text, className) {
      var stick = nearBottom();
      var line = document.createElement("div");
      line.className = "terminal-output-line" + (className ? " " + className : "");
      line.textContent = text;
      outputEl.appendChild(line);
      if (stick) outputEl.scrollTop = outputEl.scrollHeight;
    }

    function addEcho(cmd) {
      var stick = nearBottom();
      var line = document.createElement("div");
      line.className = "terminal-output-line terminal-echo";
      var prompt = document.createElement("span");
      prompt.className = "terminal-echo-prompt";
      prompt.textContent = "operator@kursadyanik:~$ ";
      var c = document.createElement("span");
      c.className = "terminal-echo-cmd";
      c.textContent = cmd;
      line.appendChild(prompt);
      line.appendChild(c);
      outputEl.appendChild(line);
      if (stick) outputEl.scrollTop = outputEl.scrollHeight;
    }

    function typeText(text, done) {
      if (reducedMotion) {
        commandEl.textContent = text;
        window.setTimeout(done, 250);
        return;
      }

      commandEl.textContent = "";
      var i = 0;
      var timer = window.setInterval(function () {
        commandEl.textContent += text.charAt(i);
        i += 1;
        if (i >= text.length) {
          window.clearInterval(timer);
          window.setTimeout(done, 300);
        }
      }, 26 + Math.floor(Math.random() * 16));
    }

    function printLines(lines, index, done) {
      if (index >= lines.length) { done(); return; }
      addLine(lines[index]);
      window.setTimeout(function () {
        printLines(lines, index + 1, done);
      }, reducedMotion ? 0 : 90 + Math.floor(Math.random() * 120));
    }

    function runStep(index) {
      if (index >= session.length) {
        commandEl.textContent = "";
        window.setTimeout(function () {
          addLine("session idle — scroll up to read the log", "terminal-muted");
        }, reducedMotion ? 0 : 500);
        return;
      }
      var step = session[index];
      typeText(step.cmd, function () {
        addEcho(step.cmd);
        commandEl.textContent = "";
        printLines(step.out, 0, function () {
          window.setTimeout(function () {
            runStep(index + 1);
          }, reducedMotion ? 120 : 650 + Math.floor(Math.random() * 500));
        });
      });
    }

    updateClock();
    window.setInterval(updateClock, 1000);
    addLine("booting about session...", "terminal-muted");
    window.setTimeout(function () { runStep(0); }, reducedMotion ? 200 : 800);
  })();
</script>
