// ====== ДАННЫЕ (твои вопросы) ======
const QUESTIONS_RAW = [
  {
    q: "Получается?",
    options: ["не получается", "не очень получается", "ну и бред...", "что за глупый вопрос, конечно получается"],
    correctLetter: "D"
  },
  {
    q: "Идеальный отдых для мамы — это…",
    options: ["Домовята", "Лежание", "Нежиться с Мурой", "лежать, нежиться с Мурой, играть в домовята"],
    correctLetter: "D"
  },
  {
    q: "У клиента 5 товаров в заказе, из которых у него оплачено 4, а 1 товар он не может оплатить. Что вы посоветуете?",
    options: [
      "Частично выдать оплаченный товар, а от неоплаченного отказаться.",
      "Провести частичную выдачу: неоплаченный товар снять с выдачи и оставить на хранении, чтобы клиент смог оплатить его в другой раз.",
      "Оставить полностью весь заказ и порекомендовать клиенту приходить, когда он сможет оплатить всё сразу, так как частично выдавать заказ нельзя.",
      "Опять глупый вопрос..."
    ],
    correctLetter: "A"
  },
  {
    q: "С кем мама любит кушать больше всего?",
    options: ["одна в шкафу", "с Машей (культурно)", "не кушать (диета)", "есть чипсы с тётей всю ночь"],
    correctLetter: "D"
  },
  {
    q: "Если у мамы отошёл кусочек обоев, что она сделает?",
    options: ["плюнет", "оторвёт и плюнет", "прикроет шкафом", "сделает ремонт всей квартиры"],
    correctLetter: "D"
  },
  {
    q: "Сколько товаров мама заказала на Ozon за всю жизнь?",
    options: ["1 заказ", "253 заказа", "564 заказа", "1805 заказов", "1403 заказа", "2142 заказов"],
    correctLetter: "D"
  },
  {
    q: "Сколько детей у мамы?",
    options: ["0", "1", "2", "3", "4", "5"],
    correctLetter: "D"
  },
  {
    q: "В какой комнате мама проходит квест в игре «Домовята» прямо сейчас?",
    options: ["Серверная", "Чародейная", "Горница", "Барная"],
    correctLetter: "D"
  },
  {
    q: "Любимый предмет в школьное время?",
    options: ["Математика", "Физкультура", "Химия", "Литература"],
    correctLetter: "D"
  },
  {
    q: "Где не работала мама?",
    options: ["Лента", "Зенден", "Бегемот", "Ozon", "Жар свежар", "Рябинка", "Севен", "Магнит"],
    correctLetter: "H"
  },
  {
    q: "Чего мама не боится?",
    options: ["плавать", "собак", "высоты", "отстоять своё мнение"],
    correctLetter: "D"
  },
  {
    q: "Что мама «забыла» вернуть тёте Вале?",
    options: ["сырок", "туфли", "ожерелье", "фен"],
    correctLetter: "D"
  },
  {
    q: "Одна из самых любимых серий книг мамы?",
    options: ["книги Дарьи Донцовой", "Гарри Поттер", "Игра Престолов", "Шерлок Холмс"],
    correctLetter: "D"
  },
  {
    q: "Какая любимая марка духов у мамы?",
    options: ["Christian Dior", "Одеколон «Саша»", "Little Black Dress", "Azzaro Mademoiselle"],
    correctLetter: "D"
  },
  {
    q: "Кем мама хотела стать в детстве?",
    options: ["космонавтом", "клоуном", "трактористом", "танцором", "президентом"],
    correctLetter: "D"
  }
];

// Категории победы — твои
function getEnding(percent) {
  if (percent <= 20) return { title: "0–20 %", text: "Поздравляю, вы «дурында»." };
  if (percent <= 40) return { title: "21–40 %", text: "«Такой ты лурик»." };
  if (percent <= 60) return { title: "41–60 %", text: "Поздравляю, вы «домовёнок»" };
  if (percent <= 80) return { title: "61–80 %", text: "Поздравляю, вы «Королева ОЗОНа»." };
  return { title: "81–100 %", text: "О боже, ты что, моя мама?" };
}

// ====== УТИЛИТЫ ======
function letterToIndex(letter) {
  // A=0, B=1, C=2...
  return letter.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
}

function shuffleInPlace(arr) {
  // Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ====== DOM ======
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

const showAnswersBtn = document.getElementById("showAnswers");
const answersBox = document.getElementById("answersBox");

// ====== СОСТОЯНИЕ ======
let QUESTIONS = []; // уже перемешанные и подготовленные
let state = {
  answered: [],
  answeredCount: 0,
  correctCount: 0
};

// ====== ПОДГОТОВКА (перемешать вопросы + ответы) ======
function prepareQuestions() {
  const raw = clone(QUESTIONS_RAW);

  // перемешиваем порядок вопросов
  shuffleInPlace(raw);

  // готовим каждый вопрос: ответы в виде объектов + перемешиваем ответы
  const prepared = raw.map((item) => {
    const correctIndexOriginal = letterToIndex(item.correctLetter);

    const answers = item.options.map((text, idx) => ({
      text,
      isCorrect: idx === correctIndexOriginal
    }));

    shuffleInPlace(answers);

    return {
      question: item.q,
      answers
    };
  });

  return prepared;
}

// ====== РЕНДЕР ======
function renderQuiz() {
  quizList.innerHTML = "";

  QUESTIONS.forEach((q, qi) => {
    const wrap = document.createElement("div");
    wrap.className = "quiz-q";
    wrap.dataset.qi = String(qi);

    wrap.innerHTML = `
      <div class="quiz-qhead">
        <div style="display:flex; gap:10px; align-items:flex-start;">
          <div class="quiz-num">${qi + 1}</div>
          <h3 class="quiz-qtitle">${q.question}</h3>
        </div>
      </div>
      <div class="quiz-options"></div>
    `;

    const optionsBox = wrap.querySelector(".quiz-options");

    q.answers.forEach((ans, ai) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opt";
      btn.dataset.ai = String(ai);

      btn.innerHTML = `<span class="quiz-ico" aria-hidden="true"></span><span>${ans.text}</span>`;
      btn.addEventListener("click", () => onAnswer(qi, ai, wrap));

      optionsBox.appendChild(btn);
    });

    quizList.appendChild(wrap);
  });
}

// ====== ЛОГИКА ОТВЕТА ======
function onAnswer(qIndex, aIndex, qWrap) {
  if (state.answered[qIndex]) return;

  state.answered[qIndex] = true;
  state.answeredCount += 1;

  const q = QUESTIONS[qIndex];
  const chosen = q.answers[aIndex];
  const isCorrect = !!chosen.isCorrect;
  if (isCorrect) state.correctCount += 1;

  // подсветка: правильный всегда зелёный; выбранный неверный — красный
  const buttons = Array.from(qWrap.querySelectorAll(".quiz-opt"));
  buttons.forEach((b, i) => {
    b.disabled = true;

    if (q.answers[i].isCorrect) b.classList.add("is-correct");
    if (i === aIndex && !isCorrect) b.classList.add("is-wrong");
  });

  answeredEl.textContent = String(state.answeredCount);
  hintEl.textContent = isCorrect ? "Верно ✅" : "Почти 🙂";

  if (state.answeredCount === QUESTIONS.length) {
    showResult();
  }
}

// ====== РЕЗУЛЬТАТЫ ======
function showResult() {
  const percent = Math.round((state.correctCount / QUESTIONS.length) * 100);
  const ending = getEnding(percent);

  percentEl.textContent = `${percent}%`;
  rankTitleEl.textContent = ending.text;     // крупная фраза
  rankTextEl.textContent = `Категория: ${ending.title}`;
  statsTextEl.textContent = `Правильных: ${state.correctCount} из ${QUESTIONS.length}.`;

  resultBox.hidden = false;
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ====== ПРАВИЛЬНЫЕ ОТВЕТЫ (кнопка) ======
function buildAnswersList() {
  answersBox.innerHTML = "";

  QUESTIONS.forEach((q, idx) => {
    const correct = q.answers.find(a => a.isCorrect);
    const item = document.createElement("div");
    item.className = "ans-item";

    item.innerHTML = `
      <p class="ans-q">${idx + 1}. ${q.question}</p>
      <p class="ans-a"><span class="ans-badge">✅ Правильный ответ</span> ${correct ? correct.text : "—"}</p>
    `;

    answersBox.appendChild(item);
  });
}

function toggleAnswers() {
  if (answersBox.hidden) {
    buildAnswersList();
    answersBox.hidden = false;
    showAnswersBtn.textContent = "Скрыть правильные ответы";
  } else {
    answersBox.hidden = true;
    showAnswersBtn.textContent = "Показать правильные ответы";
  }
}

// ====== СБРОС / НОВАЯ ИГРА ======
function resetAll() {
  QUESTIONS = prepareQuestions();
  state = {
    answered: new Array(QUESTIONS.length).fill(false),
    answeredCount: 0,
    correctCount: 0
  };

  totalEl.textContent = String(QUESTIONS.length);
  answeredEl.textContent = "0";
  hintEl.textContent = "Выбирай вариант — он подсветится (зелёный/красный).";

  resultBox.hidden = true;
  answersBox.hidden = true;
  showAnswersBtn.textContent = "Показать правильные ответы";

  renderQuiz();
}

// ====== ИНИЦИАЛИЗАЦИЯ ======
resetBtn?.addEventListener("click", resetAll);
playAgainBtn?.addEventListener("click", resetAll);
showAnswersBtn?.addEventListener("click", toggleAnswers);

resetAll();
