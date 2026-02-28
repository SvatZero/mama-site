(function () {
  const key = "mama_theme";
  const link = document.getElementById("theme-style");
  if (!link) return;

  const btn = document.querySelector("[data-theme-toggle]");
  const label = document.querySelector("[data-theme-label]");

  function applyTheme(name){
    const file = name === "winter"
      ? "css/theme-winter.css"
      : "css/theme-spring.css";

    link.setAttribute("href", file);
    localStorage.setItem(key, name);

    if (label){
      label.textContent = name === "winter"
        ? "Зима ❄️"
        : "Весна 🌷";
    }

    // лепестки только весной
    if (name === "winter"){
      document.documentElement.removeAttribute("data-petals");
    } else {
      document.documentElement.setAttribute("data-petals", "on");
    }
  }

  const saved = localStorage.getItem(key) || "spring";
  applyTheme(saved);

  if (btn){
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = localStorage.getItem(key) || "spring";
      applyTheme(current === "spring" ? "winter" : "spring");
      location.reload(); // перезагрузка для обновления лепестков
    });
  }
})();
