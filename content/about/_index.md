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

    var commands = [
      {
        text: "cat ./description.txt",
        output: function () {
          return ["i have no idea what i'm doing"];
        }
      },
      {
        text: "status --brief",
        output: function () {
          return ["site: online", "mode: quiet", "notes: public"];
        }
      },
      {
        text: "contact --show",
        output: function () {
          return ["email: kursad@keemail.me", "response: async, eventually"];
        }
      },
      {
        text: "date",
        output: function () {
          return [new Date().toLocaleString(document.documentElement.lang || "tr-TR")];
        }
      },
      {
        text: "tail -f ./signal.log",
        output: function () {
          var stamp = new Date().toLocaleTimeString(document.documentElement.lang || "tr-TR");
          return ["[" + stamp + "] waiting for input", "[" + stamp + "] no biography loaded"];
        }
      }
    ];

    var commandIndex = 0;

    function updateClock() {
      var now = new Date();
      clockEl.textContent = now.toLocaleTimeString(document.documentElement.lang || "tr-TR");
      pingEl.textContent = "latency " + (18 + Math.floor(Math.random() * 48)) + "ms";
    }

    function addLine(text, className) {
      var line = document.createElement("div");
      line.className = "terminal-output-line" + (className ? " " + className : "");
      line.textContent = text;
      outputEl.appendChild(line);
      while (outputEl.children.length > 10) {
        outputEl.removeChild(outputEl.firstElementChild);
      }
      outputEl.scrollTop = outputEl.scrollHeight;
    }

    function typeText(text, done) {
      if (reducedMotion) {
        commandEl.textContent = text;
        done();
        return;
      }

      commandEl.textContent = "";
      var i = 0;
      var timer = window.setInterval(function () {
        commandEl.textContent += text.charAt(i);
        i += 1;
        if (i >= text.length) {
          window.clearInterval(timer);
          window.setTimeout(done, 350);
        }
      }, 28 + Math.floor(Math.random() * 18));
    }

    function runNextCommand() {
      var item = commands[commandIndex % commands.length];
      commandIndex += 1;

      typeText(item.text, function () {
        addLine("operator@kursadyanik:~$ " + item.text, "terminal-echo");
        item.output().forEach(function (line) {
          addLine(line);
        });
        commandEl.textContent = "";
        window.setTimeout(runNextCommand, reducedMotion ? 2500 : 1800 + Math.floor(Math.random() * 1200));
      });
    }

    updateClock();
    window.setInterval(updateClock, 1000);
    addLine("booting about session...", "terminal-muted");
    window.setTimeout(runNextCommand, reducedMotion ? 400 : 700);
  })();
</script>
