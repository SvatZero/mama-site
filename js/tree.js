(function () {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;

  const nameEl = modal.querySelector("[data-modal-name]");
  const roleEl = modal.querySelector("[data-modal-role]");
  const factsEl = modal.querySelector("[data-modal-facts]");
  const quoteEl = modal.querySelector("[data-modal-quote]");

  const closeEls = document.querySelectorAll("[data-modal-close]");

  const DATA = {
    maria: {
      name: "Мария",
      role: "бабушка и мама",
      facts: [
        "Личный телохранитель Маши.",
        "Семейный Архивариус”.",
        "Обожает готовить и кормить.",
        "Настоящий домовенок."
      ],
      quote: "“Еще будешь кушать?”"
    },
    natasha: {
      name: "Наташа",
      role: "Мама",
      facts: [
        "Любит своих деток: Пашу, Машу и Муру (мяу!).",
        "Глава родительского комитета и королева ОЗОНа.",
        "Ресторанный ревизор и дизайнер.",
        "Может сделать всё на свете.",
        "Любит клубничный меренговый рулет и кофе.",
        "Специалист по вязанию."
      ],
      quote: "“не вешать нос, гардемарины!”"
    },
    valya: {
      name: "Валя",
      role: "сестра и тетя",
      facts: [
        "Обожает дорамы и роллы.",
        "Любит Plants vs Zombies.",
        "Весёлая и жизнерадостная.",
        "Всегда за любой движ.",
        "Всегда покупает вкусняшки.",
        "Обожает сериал Кости за неделю.",
        "Основатель игры Ленин и охранник"
      ],
      quote: "“Ну конечно, поехали!”"
    },
    pasha: {
      name: "Паша",
      role: "сын • великан",
      facts: [
        "Великан. Иногда (всегда) похож на ворчащего деда.",
        "Любит петь глупые песни и танцевать.",
        "Играет в компьютер и настолки.",
        "Всю жизнь где-то учится.",
        "Успешный ресторатор."
      ],
      quote: "“Ну давай разберёмся…”"
    },
    masha: {
      name: "Маша",
      role: "дочка • рыжая комета",
      facts: [
        "Весёлая рыженькая малышка.",
        "Обожает читать книжки (особенно “Незнайку”).",
        "Профессиональная танцовщица с 3-х лет.",
        "Дизайнер семейных открыток и поздравлений.",
        "Сценарист-режиссёр мультфильмов.",
        "Модельер.",
        "Мечтает о поездке в Париж."
      ],
      quote: "“А давай сделаем по-другому!”"
    },
    mura: {
      name: "Мура",
      role: "дочка-кошка • полосатая сила",
      facts: [
        "Серая в полоску, любит лежать на ручках.",
        "Хулиганит по ночам.",
        "Любимая игрушка — пластиковая трубочка.",
        "Лучшая подружка Птички.",
        "Очень сильная: скорее искупает тебя, чем ты её.",
        "Грызёт всё, что видит.",
        "Пережила тяжёлое прошлое, но обрела дом и семью."
      ],
      quote: "“Мяу.” (но с характером)"
    },
    polina: {
      name: "Полина",
      role: "пара Паши • северная звезда",
      facts: [
        "Омичка с немецкими корнями.",
        "Работает в СМИТУП (школа подготовки к ЕГЭ).",
        "Любит кофе.",
        "Любит группу “Нервы”.",
        "Обожает вкусно покушать."
      ],
      quote: "“Сейчас всё будет по плану.”"
    },
    ptichka: {
      name: "Птичка",
      role: "кошка • бело-рыжая туманность",
      facts: [
        "Белая с рыжими пятнами и сердечком на спинке.",
        "Облако из меха.",
        "Нелегальный мигрант, вор в законе.",
        "Корм дороже человеческого.",
        "Обожает расчёску и лежать пузом вверх.",
        "Любит кушать Пашины ноги, пока он спит.",
        "Ветеран походов к ветеринару.",
        "Происходит из благородного огородного рода."
      ],
      quote: "“Погладь. Если достоин.”"
    },
    liva: {
      name: "Лива",
      role: "дочка Вали • мудрая кошка",
      facts: [
        "Долгожитель: 76 лет по человеческим меркам.",
        "Британский характер.",
        "Смокинг с белым воротничком и перчатками.",
        "Ей этот мир абсолютно понятен.",
        "Обожает своё любимое кресло.",
        "Пользуется вниманием уличных котов."
      ],
      quote: "“Я всё знаю.”"
    }
  };

  function open(personKey){
    const p = DATA[personKey];
    if (!p) return;

    nameEl.textContent = p.name;
    roleEl.textContent = p.role;

    factsEl.innerHTML = `<ul>${p.facts.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>`;
    quoteEl.textContent = p.quote;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function close(){
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-person]");
    if (btn){
      open(btn.getAttribute("data-person"));
      return;
    }
    if (e.target.closest("[data-modal-close]")){
      close();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  closeEls.forEach(el => el.addEventListener("click", close));
})();