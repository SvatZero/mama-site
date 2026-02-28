(function () {
  const key = "mama_font_size";
  const html = document.documentElement;

  // базовый размер из CSS: 20px, будем двигать в пределах
  const MIN = 18;
  const MAX = 28;

  function apply(size) {
    html.style.fontSize = size + "px";
    localStorage.setItem(key, String(size));
  }

  function current() {
    const saved = Number(localStorage.getItem(key));
    if (!Number.isFinite(saved) || saved === 0) return null;
    return saved;
  }

  // применяем сохранённое значение при загрузке
  const saved = current();
  if (saved) apply(saved);

  // обработчики кнопок
  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-font-inc]");
    const dec = e.target.closest("[data-font-dec]");
    if (!inc && !dec) return;

    const now = parseInt(getComputedStyle(html).fontSize, 10) || 20;
    if (inc) apply(Math.min(MAX, now + 2));
    if (dec) apply(Math.max(MIN, now - 2));
  });
})();
