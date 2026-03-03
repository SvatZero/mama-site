(() => {
  const QUESTIONS = [
    { q: "Какой чай мама чаще выбирает?", options: ["Чёрный", "Зелёный", "С травами", "Кофе (это не чай)"], correct: 0 },
    { q: "Что мама предпочитает больше?", options: ["Сладкое", "Солёное", "Острое", "Кислое"], correct: 0 },
    { q: "Какой цвет мама чаще любит в одежде/вещах?", options: ["Светлые/пастельные", "Чёрный", "Яркие цвета", "Всё по настроению"], correct: 3 },
    { q: "Как мама чаще реагирует, если кто-то забывает поесть?", options: ["«Ешь нормально!»", "Молча кладёт еду", "Смеётся", "Не замечает"], correct: 0 },
    { q: "Что мама чаще смотрит/любит?", options: ["Фильмы", "Сериалы", "Ютуб/видео", "Документалки"], correct: 2 },
    { q: "Идеальный отдых для мамы — это…", options: ["Тишина дома", "Прогулка", "Поездка", "Встреча с близкими"], correct: 1 },
    { q: "Что мама чаще говорит, когда всё получилось?", options: ["«Ну вот!»", "«Я же говорила»", "«Молодец!»", "«Слава богу»"], correct: 3 },
    { q: "Любимый формат подарка для мамы чаще всего…", options: ["Практичный", "Эмоциональный", "Красивый", "Сюрпризный"], correct: 0 },
    { q: "Если бы мама была супергероем, её сила — это…", options: ["Телепатия", "Успокоение людей", "Супер-память", "Супер-организация"], correct: 1 },
    { q: "Главная «мамина суперфраза» в семье:", options: ["«Я устала»", "«Где мои очки?»", "«Сейчас я быстро»", "«Я вас люблю»"], correct: 2 },
  ];

  function getEl(id) {
    const el = document.getElementById(id);
    return el;
  }

  function showPageError(msg) {
    const hint = getEl("hint");
    if (hint) hint.textContent = "Ошибка викторины: " + msg;
  }

  window.addEventListener("DOMContentLoaded", () => {
    try {
      const quizList = getEl("quizList");
      const answeredEl = getEl("answered");
      const totalEl = getEl("total");
      const hintEl = getEl("hint");

      const resultBox = getEl("result");
      const percentEl = getEl("percent");
      const rankTitleEl = getEl("rankTitle");
      const rankTextEl = getEl("rankText");
      const statsTextEl = getEl("statsText");

      const resetBtn = getEl("reset");
      const playAgainBtn = getEl("playAgain");

      const required = [
        ["quizList", quizList], ["answered", answeredEl], ["total", totalEl], ["hint", hintEl],
        ["result", resultBox], ["percent", percentEl], ["rankTitle", rankTitleEl],
        ["rankText", rankTextEl], ["statsText", statsTextEl], ["reset", resetBtn]
      ];
      const missing = required.filter(([, v]) => !v).map(([k]) => k);
      if (missing.length) {
        showPageError(`не найдены элементы: ${missing.join(", ")} (проверь id в quiz.html)`);
        return;
      }

      let state = {
        answered: new Array(QUESTIONS.length).fill(false),
        correctCount: 0,
        answeredCount: 0,
      };

      totalEl.textContent = String(QUESTIONS.length);
      answeredEl.textContent = "0";
      hintEl.textContent = "Выбирай вариант — он подсветится (зелёный/красный).";

      function getRank(percent){
        if (percent <= 20) return { title: "🧊 «Гость, который зашёл случайно»", text: "Срочно чай с мамой и второй заход 😄" };
        if (percent <= 40) return { title: "🧩 «Стажёр семейного отдела»", text: "Теплее! Но мама всё ещё непредсказуема." };
        if (percent <= 60) return { title: "📎 «Домашний детектив»", text: "Серединка! Много знаешь, но не всё." };
        if (percent <= 80) return { title: "🏅 «Почётный мамовед»", text: "Очень хорошо. Мама бы одобрила (и поправила)." };
        return { title: "👑 «Легендарный мамолог»", text: "Максимум! Ты читаешь маму как открытую книгу ❤️" };
      }

      function render(){
        quizList.innerHTML = "";

        QUESTIONS.forEach((item, idx) => {
          const wrap = document.createElement("div");
          wrap.className = "quiz-q";

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

        const buttons = Array.from(qWrap.querySelectorAll(".quiz-opt"));
        buttons.forEach((b, i) => {
          b.disabled = true;
          if (i === QUESTIONS[qIndex].correct) b.classList.add("is-correct");
          if (i === optionIndex && !isCorrect) b.classList.add("is-wrong");
        });

        answeredEl.textContent = String(state.answeredCount);
        hintEl.textContent = isCorrect ? "Верно ✅" : "Почти 🙂";

        if (state.answeredCount === QUESTIONS.length){
          showResult();
        }
      }

      function showResult(){
        const percent = Math.round((state.correctCount / QUESTIONS.length) * 100);
        const rank = getRank(percent);

        percentEl.textContent = `${percent}%`;
        rankTitleEl.textContent = rank.title;
        rankTextEl.textContent = rank.text;
        statsTextEl.textContent = `Правильных: ${state.correctCount} из ${QUESTIONS.length}.`;

        resultBox.hidden = false;
        resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      function resetAll(){
        state = {
          answered: new Array(QUESTIONS.length).fill(false),
          correctCount: 0,
          answeredCount: 0,
        };
        answeredEl.textContent = "0";
        hintEl.textContent = "Выбирай вариант — он подсветится (зелёный/красный).";
        resultBox.hidden = true;
        render();
      }

      resetBtn.addEventListener("click", resetAll);
      if (playAgainBtn) playAgainBtn.addEventListener("click", resetAll);

      render();
    } catch (e) {
      showPageError(e?.message || "неизвестная ошибка в quiz.js");
    }
  });
})();