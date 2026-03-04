(function () {
  const modal = document.querySelector("[data-modal]");
  if (!modal) return;

  const nameEl = modal.querySelector("[data-modal-name]");
  const roleEl = modal.querySelector("[data-modal-role]");
  const factsEl = modal.querySelector("[data-modal-facts]");
  const quoteEl = modal.querySelector("[data-modal-quote]");
  const modalImg = modal.querySelector("[data-modal-img]"); // ✅ важно: ищем внутри модалки

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
    vladimir: {
      name: "Владимир",
      role: "дедушка, папа.",
      facts: [
        "Дедушка в нашей семейной истории.",
        "Обожал книги, огромная личная библиотека.",
        "Любил рассказывать сюжеты прочитанных книг своим дочкам.",
        "Годы жизни: 1 августа 1953 г. - 20 декабря 2000 г."
      ],
      quote: "🕊️"
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
      quote: "“Не вешать нос, гардемарины!”"
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
      quote: "“Опять на работу(”"
    },
    pasha: {
      name: "Паша",
      role: "сын, брат, племянник, внук, немного папа",
      facts: [
        "Великан. Иногда (всегда) похож на ворчащего деда.",
        "Любит петь глупые песни и танцевать.",
        "Играет в компьютер и настолки.",
        "Всю жизнь где-то учится",
        "Профессор наконечников стрел, депортации немцев, биографист Кузи из Универа",
        "Успешный ресторатор."
      ],
      quote: "“ага”"
    },
    masha: {
      name: "Маша",
      role: "дочка, сестренка, внучка и внезапно уже тетя",
      facts: [
        "Весёлая рыженькая малышка.",
        "Обожает читать книжки (особенно “Незнайку”).",
        "Профессиональная танцовщица с 3-х лет.",
        "Дизайнер семейных открыток и поздравлений.",
        "Сценарист-режиссёр мультфильмов.",
        "Модельер.",
        "Мечтает о поездке в Париж."
      ],
      quote: "“Ничего не понимаю!”"
    },
    mura: {
      name: "Мура",
      role: "дочка-кошка, сестренка, подруга",
      facts: [
        "Серая в полоску, любит лежать на ручках.",
        "Хулиганит по ночам.",
        "Любимая игрушка — пластиковая трубочка.",
        "Лучшая подружка Птички.",
        "Очень сильная: скорее искупает тебя, чем ты её.",
        "Грызёт всё, что видит.",
        "Пережила всякое, но обрела дом и семью."
      ],
      quote: "“Мяу.”"
    },
    polina: {
      name: "Полина",
      role: "девушка Паша",
      facts: [
        "Омичка с немецкими корнями.",
        "Прибыла из Асгарда",
        "Президент СМИТУП (онлайн-школы ЕГЭ).",
        "Любит кофе.",
        "Любит группу “Нервы”.",
        "Посмотрела все сериалы на планете",
        "Обожает вкусно покушать."
      ],
      quote: "“Вместе на новый уровень знаний!”"
    },
    ptichka: {
      name: "Птичка",
      role: "кошка, доча, подруга",
      facts: [
        "Белая с рыжими пятнами и сердечком на спинке.",
        "Облако из меха.",
        "Нелегегальный мигрант, вор в законе.",
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
      role: "дочка, хранитель мудрости",
      facts: [
        "Долгожитель: 76 лет по человеческим меркам.",
        "Британский характер.",
        "Носит смокинг с белым воротничком и перчатками.",
        "Ей этот мир абсолютно понятен.",
        "Обожает своё любимое кресло.",
        "Пользуется вниманием уличных котов."
      ],
      quote: "“Кто я?”"
    }
  };

  function setModalImage(personId, personName) {
    if (!modalImg) return;

    const candidates = [
      `assets/avatars/${personId}.jpg`,
      `assets/avatars/${personId}.png`,
      `assets/avatars/${personId}.webp`,
    ];

    let i = 0;
    modalImg.style.display = "block";
    modalImg.alt = personName || "";

    modalImg.onerror = () => {
      i += 1;
      if (i < candidates.length) {
        modalImg.src = candidates[i];
      } else {
        modalImg.removeAttribute("src");
        modalImg.style.display = "none";
      }
    };

    modalImg.src = candidates[0];
  }

  function open(personKey) {
    const p = DATA[personKey];
    if (!p) return;

    nameEl.textContent = p.name;
    roleEl.textContent = p.role;

    // ✅ ВОТ ЭТОГО НЕ ХВАТАЛО:
    setModalImage(personKey, p.name);

    factsEl.innerHTML = `<ul>${p.facts.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>`;
    quoteEl.textContent = p.quote;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function close() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-person]");
    if (btn) {
      open(btn.getAttribute("data-person"));
      return;
    }
    if (e.target.closest("[data-modal-close]")) {
      close();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  closeEls.forEach(el => el.addEventListener("click", close));
})();
