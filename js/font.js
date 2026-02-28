(function () {
  const key = "mama_font_size";
  const html = document.documentElement;

  const MIN = 16;
  const MAX = 30;
  const STEP = 2;

  function apply(size){
    html.style.setProperty("--font", size + "px");
    localStorage.setItem(key, size);
  }

  const saved = localStorage.getItem(key);
  if (saved){
    apply(parseInt(saved));
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-font-inc]")){
      const current = parseInt(getComputedStyle(html).getPropertyValue("--font"));
      apply(Math.min(MAX, current + STEP));
    }

    if (e.target.closest("[data-font-dec]")){
      const current = parseInt(getComputedStyle(html).getPropertyValue("--font"));
      apply(Math.max(MIN, current - STEP));
    }
  });
})();
