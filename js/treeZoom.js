(function () {
  const viewport = document.querySelector(".tree-viewport");
  const grid = document.querySelector(".tree-grid");
  if (!viewport || !grid) return;

  const btnIn = document.querySelector("[data-zoom-in]");
  const btnOut = document.querySelector("[data-zoom-out]");
  const btnReset = document.querySelector("[data-zoom-reset]");

  const Z_MIN = 0.75;
  const Z_MAX = 1.6;
  const Z_STEP = 0.1;

  function getZoom(){
    const v = parseFloat(getComputedStyle(grid).getPropertyValue("--treeZoom"));
    return Number.isFinite(v) ? v : 1;
  }

  function setZoom(z){
    z = Math.max(Z_MIN, Math.min(Z_MAX, z));
    grid.style.setProperty("--treeZoom", String(z));
  }

  // Стартовый масштаб на телефоне — чуть меньше, чтобы влезало больше
  if (window.matchMedia("(max-width: 650px)").matches){
    setZoom(0.9);
  } else {
    setZoom(1);
  }

  btnIn && btnIn.addEventListener("click", () => setZoom(getZoom() + Z_STEP));
  btnOut && btnOut.addEventListener("click", () => setZoom(getZoom() - Z_STEP));
  btnReset && btnReset.addEventListener("click", () => setZoom(1));
})();