// Настройки базы и раунда
const BASE_SIZE = 20;        // в папке лежит img01..img20
const PAIRS_PER_GAME = 10;   // на раунд берём 10 случайных => 20 карточек

const IMG_DIR = "assets/memory/cards/";
const PLACEHOLDER = IMG_DIR + "placeholder.jpg";

const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const hintEl = document.getElementById("hint");

const restartBtn = document.getElementById("restart");
const winDlg = document.getElementById("win");
const winText = document.getElementById("winText");
const playAgain = document.getElementById("playAgain");

let deck = [];
let first = null;
let second = null;
let locked = false;
let moves = 0;
let matchedPairs = 0;

function pad2(n){ return String(n).padStart(2, "0"); }

function buildBase(){
  // img01.jpg .. img20.jpg
  return Array.from({ length: BASE_SIZE }, (_, i) => {
    const idx = i + 1;
    return {
      id: `img${idx}`,
      name: `Картинка ${idx}`,
      src: `${IMG_DIR}img${pad2(idx)}.jpg`,
    };
  });
}

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom(arr, count){
  const copy = [...arr];
  shuffle(copy);
  return copy.slice(0, count);
}

function makeDeck(){
  const base = buildBase();
  const chosen = pickRandom(base, PAIRS_PER_GAME); // 10 случайных из 20

  const doubled = chosen.flatMap(item => ([
    { ...item, key: item.id + "-a" },
    { ...item, key: item.id + "-b" },
  ]));

  return shuffle(doubled);
}

function resetState(){
  first = null;
  second = null;
  locked = false;
  moves = 0;
  matchedPairs = 0;
  movesEl.textContent = "0";
  hintEl.textContent = "Открой две карточки 🙂";
}

function render(){
  board.innerHTML = "";
  const frag = document.createDocumentFragment();

  deck.forEach(card => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "memory-card";
    btn.dataset.id = card.id;
    btn.dataset.key = card.key;

    btn.innerHTML = `
      <div class="memory-inner">
        <div class="memory-face memory-back">🦆</div>
        <div class="memory-face memory-front">
          <img alt="${card.name}" loading="lazy">
        </div>
      </div>
    `;

    const img = btn.querySelector("img");
    img.src = card.src;

    // Если реальных картинок ещё нет — используем заглушку
    img.onerror = () => { img.src = PLACEHOLDER; };

    btn.addEventListener("click", () => onFlip(btn, card));
    frag.appendChild(btn);
  });

  board.appendChild(frag);
}

function onFlip(node, card){
  if (locked) return;
  if (node.classList.contains("is-flipped")) return;
  if (node.classList.contains("is-matched")) return;

  node.classList.add("is-flipped");

  if (!first){
    first = node;
    hintEl.textContent = `Открыто: ${card.name}`;
    return;
  }

  second = node;
  locked = true;

  moves += 1;
  movesEl.textContent = String(moves);

  const same = first.dataset.id === second.dataset.id;

  if (same){
    // Пара найдена
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    first.classList.add("is-matched");
    second.classList.add("is-matched");

    matchedPairs += 1;
    hintEl.textContent = "Пара найдена ✅";

    setTimeout(() => {
      first = null;
      second = null;
      locked = false;

      if (matchedPairs === PAIRS_PER_GAME){
        winText.textContent = `Ходы: ${moves}.`;
        if (winDlg?.showModal) winDlg.showModal();
        else alert("Ураа, вы победили! 🎉");
      }
    }, 220);

  } else {
    // Не совпало — закрываем обратно с анимацией
    hintEl.textContent = "Не совпало 🙂";
    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
      first = null;
      second = null;
      locked = false;
    }, 750);
  }
}

function newGame(){
  resetState();
  deck = makeDeck();
  render();
}

restartBtn?.addEventListener("click", newGame);
playAgain?.addEventListener("click", () => {
  winDlg.close();
  newGame();
});

newGame();