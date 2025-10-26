const container = document.getElementById("reaction-game-container");
const scoreDisplay = document.getElementById("reaction-score");
const timerDisplay = document.getElementById("reaction-timer");
const backButton = document.getElementById("reaction-back");

let score = 0;
let time = 30;
const otchimImg = "https://i.ibb.co/bMpFdG9C/image.png";

const otchim = document.createElement("img");
otchim.src = otchimImg;
otchim.classList.add("otchim");
container.appendChild(otchim);

// Функция случайного перемещения
function moveOtchim() {
  const maxX = container.offsetWidth - 80;
  const maxY = container.offsetHeight - 80;
  otchim.style.left = Math.random() * maxX + "px";
  otchim.style.top = Math.random() * maxY + "px";
}

// Клик по Отчиму
otchim.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveOtchim();
});

// Таймер
const interval = setInterval(() => {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  } else {
    clearInterval(interval);
    clearInterval(moveInterval);
    alert("Время закончилось! Ваш счёт: " + score);
    otchim.remove();
  }
}, 1000);

// Авто-перемещение каждые 0.7 сек
const moveInterval = setInterval(() => {
  if (time > 0) moveOtchim();
}, 700);

// Кнопка возврата
backButton.addEventListener("click", () => {
  window.location.href = "index.html"; // путь к кликеру
});


