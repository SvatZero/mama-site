(function () {
  // Включаем только на страницах, где стоит data-particles="on"
  const enabled = document.documentElement.getAttribute("data-particles") === "on";
  if (!enabled) return;

  const THEME_KEY = "mama_theme"; // у тебя уже используется в theme.js
  const theme = localStorage.getItem(THEME_KEY) || "spring"; // "spring" или "winter"

  const type = theme === "winter" ? "snow" : "petal";

  // Контейнер
  const container = document.createElement("div");
  container.className = "particles";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  const count = 14;
  const minDur = 9;
  const maxDur = 18;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = `particle ${type}`;

    const left = rand(0, 100);
    const delay = rand(0, 7);
    const dur = rand(minDur, maxDur);
    const size = type === "snow" ? rand(6, 12) : rand(10, 18);
    const drift = rand(-35, 35);

    s.style.left = left + "vw";
    s.style.animationDelay = delay + "s";
    s.style.animationDuration = dur + "s";
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.setProperty("--drift", drift + "px");

    container.appendChild(s);
  }
})();
