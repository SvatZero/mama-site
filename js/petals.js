(function () {
  // Включаем лепестки только если на странице есть data-petals="on"
  const enabled = document.documentElement.getAttribute("data-petals") === "on";
  if (!enabled) return;

  const count = 12;          // сколько лепестков
  const minDur = 8;          // минимальная длительность падения
  const maxDur = 16;         // максимальная
  const container = document.createElement("div");
  container.className = "petals";
  container.setAttribute("aria-hidden", "true");
  document.body.appendChild(container);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";

    const left = rand(0, 100);            // позиция по ширине
    const delay = rand(0, 6);             // задержка старта
    const dur = rand(minDur, maxDur);     // скорость
    const size = rand(10, 18);            // размер
    const drift = rand(-30, 30);          // увод по X

    p.style.left = left + "vw";
    p.style.animationDelay = delay + "s";
    p.style.animationDuration = dur + "s";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.setProperty("--drift", drift + "px");
    container.appendChild(p);
  }
})();
