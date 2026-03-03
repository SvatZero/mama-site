// Вопросы — ЗАГЛУШКИ. Потом просто меняешь текст/варианты/правильный индекс.
const QUESTIONS = [
  {
    q: "Какой чай мама чаще выбирает?",
    options: ["Чёрный", "Зелёный", "С травами", "Кофе (это не чай)"],
    correct: 0
  },
  {
    q: "Что мама предпочитает больше?",
    options: ["Сладкое", "Солёное", "Острое", "Кислое"],
    correct: 0
  },
  {
    q: "Какой цвет мама чаще любит в одежде/вещах?",
    options: ["Светлые/пастельные", "Чёрный", "Яркие цвета", "Всё по настроению"],
    correct: 3
  },
  {
    q: "Как мама чаще реагирует, если кто-то забывает поесть?",
    options: ["«Ешь нормально!»", "Молча кладёт еду", "Смеётся", "Не замечает"],
    correct: 0
  },
  {
    q: "Что мама чаще смотрит/любит?",
    options: ["Фильмы", "Сериалы", "Ютуб/видео", "Документалки"],
    correct: 2
  },
  {
    q: "Идеальный отдых для мамы — это…",
    options: ["Тишина дома", "Прогулка", "Поездка", "Встреча с близкими"],
    correct: 1
  },
  {
    q: "Что мама чаще говорит, когда всё получилось?",
    options: ["«Ну вот!»", "«Я же говорила»", "«Молодец!»", "«Слава богу»"],
    correct: 3
  },
  {
    q: "Любимый формат подарка для мамы чаще всего…",
    options: ["Практичный", "Эмоциональный", "Красивый", "Сюрпризный"],
    correct: 0
  },
  {
    q: "Если бы мама была супергероем, её сила — это…",
    options: ["Телепатия", "Успокоение людей", "Супер-память", "Супер-организация"],
    correct: 1
  },
  {
    q: "Главная «мамина суперфраза» в семье:",
    options: ["«Я устала»", "«Где мои очки?»", "«Сейчас я быстро»", "«Я вас люблю»"],
    correct: 2
  },
];

const quizList = document.getElementById("quizList");
const answeredEl = document.getElementById("answered");
const totalEl = document.getElementById("total");
const hintEl = document.getElementById("hint");

const resultBox = document.getElementById("result");
const percentEl = document.getElementById("percent");
const rankTitleEl = document.getElementById("rankTitle");
const rankTextEl = document.getElementById("rankText");
const statsTextEl = document.getElementById("statsText");

const resetBtn = document.getElementById("reset");
const playAgainBtn = document.getElementById("playAgain");

let state = {
  answered: new Array(QUESTIONS.length).fill(false),
  correctCount: 0,
  answeredCount: 0,
};

totalEl.textContent = String(QUESTIONS.length);
answeredEl.textContent = "0";

function getRank(percent){
  // Смешные временные названия — потом заменишь
  if (percent <= 20) return { title: "🧊 «Гость, который зашёл случайно»", text: "Срочно надо выпить чай с мамой и пройти заново 😄" };
  if (percent <= 40) return { title: "🧩 «Стажёр семейного отдела»", text: "Уже тепло, но мама всё ещё хитрее всех." };
  if (percent <= 60) return { title: "📎 «Домашний детектив»", text: "Серединка! Ты многое знаешь, но мама хранит секреты." };
  if (percent <= 80) return { title: "🏅 «Почётный мамовед»", text: "Очень достойно. Мама бы улыбнулась (и всё равно поправила)." };
  return { title: "👑 «Легендарный мамолог»", text: "Максимум! Ты читаешь маму как открытую книгу ❤️" };
}

function render(){
  quizList.innerHTML = "";

  QUESTIONS.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "quiz-q";
    wrap.dataset.qi = String(idx);

    wrap.innerHTML = `
      <div class="quiz-qhead">
        <div style="display:flex; gap:10px; align-items:flex-start;">
          <div class="quiz-num">${idx + 1}</div>
          <h3 class="quiz-qtitle">${item.q}</h3>
        </div>
      </div>
      <div class="quiz-options"></div>
    `;

    const optionsBox = wrap.querySelector(".quiz-options");

    item.options.forEach((optText, oi) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt";
      btn.dataset.oi = String(oi);

      btn.innerHTML = `<span class="quiz-ico" aria-hidden="true"></span><span>${optText}</span>`;

      btn.addEventListener("click", () => onAnswer(idx, oi, wrap));
      optionsBox.appendChild(btn);
    });

    quizList.appendChild(wrap);
  });
}

function onAnswer(qIndex, optionIndex, qWrap){
  if (state.answered[qIndex]) return;

  state.answered[qIndex] = true;
  state.answeredCount += 1;

  const isCorrect = optionIndex === QUESTIONS[qIndex].correct;
  if (isCorrect) state.correctCount += 1;

  // Подсветка: выбранный — красный если неверный.
  // Правильный — зелёный всегда (чтобы было понятно “как надо”).
  const buttons = Array.from(qWrap.querySelectorAll(".quiz-opt"));
  buttons.forEach((b, i) => {
    b.disabled = true;

    if (i === QUESTIONS[qIndex].correct) b.classList.add("is-correct");
    if (i === optionIndex && !isCorrect) b.classList.add("is-wrong");
  });

  answeredEl.textContent = String(state.answeredCount);
  hintEl.textContent = isCorrect ? "Верно ✅" : "Почти 🙂";

  // Если всё отвечено — показываем результат
  if (state.answeredCount === QUESTIONS.length){
    showResult();
  }
}

function showResult(){
  const percent = Math.round((state.correctCount / QUESTIONS.length) * 100);
  const rank = getRank(percent);

  percentEl.textContent = `${