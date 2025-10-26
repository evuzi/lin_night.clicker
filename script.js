(() => {
  const STORAGE_KEY = "lin_night_clicker_v2";

  const DEFAULTS = {
    score: 0,
    totalClicks: 0,
    clickValue: 1,
    autoClickers: 0,
    cps: 0,
    upgrades: {}
  };

  const UPGRADE_DEFS = [
    { id: 'auto', name: 'Автокликер', baseCost: 50, type: 'auto', amount: 1, desc: 'Кликает сам каждую секунду.' },
    { id: 'mult', name: 'Усилитель', baseCost: 100, type: 'mult', amount: 1, desc: 'Увеличивает очки за клик.' }
  ];

  const $ = (sel) => document.querySelector(sel);
  const scoreEl = $('#score');
  const cpsEl = $('#cps');
  const clickImg = $('#click-img');
  const upgradesEl = $('#upgrades');
  const btnReset = $('#btn-reset');
  const btnExport = $('#btn-export');
  const btnImport = $('#btn-import');
  const importJson = $('#import-json');
  const miniLink = $('#to-mini');
  const mini2Link = document.getElementById("to-mini2");
if (mini2Link) {
  mini2Link.addEventListener("click", (e) => {
    e.preventDefault();
    const data = encodeURIComponent(localStorage.getItem(STORAGE_KEY));
    window.location.href = `mini2.html?data=${data}`;
  });
}

  const anticheatEl = document.getElementById('anticheat');

  let state = { ...DEFAULTS };
  let clickTimes = [];

  // === Сохранение и загрузка ===
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...DEFAULTS, ...JSON.parse(raw) };
  }

  function render() {
    scoreEl.textContent = Math.floor(state.score);
    cpsEl.textContent = state.cps;
    renderUpgrades();
  }

  function renderUpgrades() {
    upgradesEl.innerHTML = '';
    UPGRADE_DEFS.forEach((def) => {
      const owned = state.upgrades[def.id] || 0;
      const cost = Math.floor(def.baseCost * Math.pow(1.15, owned));

      const card = document.createElement('div');
      card.className = 'upgrade';
      card.innerHTML = `
        <strong>${def.name}</strong> <small>x${owned}</small>
        <div>${def.desc}</div>
        <div style="margin:6px 0;">Цена: ${cost}</div>
      `;
      const btn = document.createElement('button');
      btn.textContent = state.score >= cost ? 'Купить' : 'Недостаточно';
      btn.disabled = state.score < cost;
      btn.addEventListener('click', () => buyUpgrade(def));
      card.appendChild(btn);
      upgradesEl.appendChild(card);
    });
  }

  function addScore(n = 1) {
    state.score += n;
    state.totalClicks++;
    updateImage();
    render();
  }

function updateImage() {
  let newSrc = "";

  if (state.totalClicks >= 1000) {
    newSrc = "https://i.ibb.co/PZp4LPSq/image.png"; // после 1000 кликов
  } else if (state.totalClicks >= 500) {
    newSrc = "https://i.ibb.co/sp4Fcg4Y/image.png"; // новая картинка после 500 кликов
  } else if (state.totalClicks >= 60) {
    newSrc = "https://i.ibb.co/LmngQBn/image.png"; // после 60 кликов
  } else if (state.totalClicks >= 10) {
    newSrc = "https://i.ibb.co/8gy0JgP9/image.png"; // после 10 кликов
  } else {
    newSrc = "https://i.ibb.co/mFDLTtxD/image.png"; // начальная картинка
  }

  // Меняем картинку только если она изменилась
  if (clickImg.src !== newSrc) {
    clickImg.src = newSrc;

    // Плавная анимация при смене картинки
    clickImg.classList.remove("clicker-animate");
    void clickImg.offsetWidth; // триггер перерендера
    clickImg.classList.add("clicker-animate");
  }
}




  // === АНТИЧИТ ПРОВЕРКА ===
  clickImg.addEventListener('click', () => {
    const now = Date.now();
    clickTimes.push(now);
    clickTimes = clickTimes.filter(t => now - t < 1000);

    if (clickTimes.length > 15) {
      triggerAnticheat();
      return;
    }

    addScore(state.clickValue);
  });

  function triggerAnticheat() {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...DEFAULTS };
    save();

    anticheatEl.classList.remove('hidden');

    const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
    alarm.volume = 1.0;
    alarm.play();

    setTimeout(() => {
      anticheatEl.classList.add('hidden');
      location.reload();
    }, 8000);
  }

  // === Покупки и автокликеры ===
  function buyUpgrade(def) {
    const owned = state.upgrades[def.id] || 0;
    const cost = Math.floor(def.baseCost * Math.pow(1.15, owned));
    if (state.score < cost) return;
    state.score -= cost;
    state.upgrades[def.id] = owned + 1;
    if (def.type === 'auto') state.autoClickers += def.amount;
    if (def.type === 'mult') state.clickValue += def.amount;
    render();
  }

  setInterval(() => {
    if (state.autoClickers > 0) addScore(state.autoClickers);
    state.cps = state.autoClickers;
    save();
    render();
  }, 1000);

  // === Ссылка на мини-игру ===
  miniLink.addEventListener('click', (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(JSON.stringify(state));
    window.location.href = `mini.html?data=${encoded}`;
  });


  // === Загрузка ===
  load();
  render();
})();
const mini2Link = document.getElementById("to-mini2");

mini2Link.addEventListener("click", (e) => {
  e.preventDefault();
  const encoded = encodeURIComponent(JSON.stringify(state));
  window.location.href = `mini2.html?data=${encoded}`;
});
// Глобальная переменная счёта (если ещё нет)
let count = parseInt(localStorage.getItem("count")) || 0;

// Обновление отображения
function updateDisplay() {
  document.getElementById("count").textContent = count;
}

// Функция добавления очков (используется и в мини-играх)
function addToMainScore(amount) {
  const prevCount = count;
  count += amount;
  if (count < 0) count = 0;
  localStorage.setItem("count", count);
  updateDisplay();

  // Проверка достижения 45000 впервые
  const achieved = localStorage.getItem("apartmentAchieved");
  if (!achieved && prevCount < 45000 && count >= 45000) {
    const popup = document.getElementById("achievement-popup");
    popup.style.display = "flex";
    localStorage.setItem("apartmentAchieved", "true");
  }
}

// Закрытие плашки
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("achievement-popup").style.display = "none";
});
// === Падающие хэллоуинские элементы ===
function spawnHalloweenItem() {
  const container = document.getElementById("halloween-container");
  if (!container) return;

  const img = document.createElement("img");
  img.src = "https://i.ibb.co/3c4k1xT/pumpkin.png"; // ссылка на маленькую тыкву
  img.classList.add("halloween-fall");
  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.animationDuration = 3 + Math.random() * 3 + "s";
  container.appendChild(img);

  // удаляем элемент после падения
  setTimeout(() => container.removeChild(img), 6000);
}

// Запуск каждые 0.5–1.5 секунд
setInterval(spawnHalloweenItem, 700);

// Добавляем хэллоуинский класс к body
document.body.classList.add("halloween");
const clickerImg = document.getElementById("clicker-img");
const ytButton = document.getElementById("yt-button");
const ytPopup = document.getElementById("yt-popup");
const ytClose = document.getElementById("yt-close");
const ytIframe = document.getElementById("yt-iframe");







