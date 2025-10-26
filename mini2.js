const startBtn = document.getElementById("start-mini2");
const backBtn = document.getElementById("back-btn");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score-display");

let score = 0;
let gameActive = false;
let spawnInterval = null;

function startGame() {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  scoreDisplay.textContent = "Счёт: " + score;
  startBtn.style.display = "none";

  spawnInterval = setInterval(() => {
    if (!gameActive) return;
    spawnTarget();
  }, 1200);
}

function stopGame() {
  gameActive = false;
  clearInterval(spawnInterval);
  const allTargets = document.querySelectorAll(".target");
  allTargets.forEach(t => t.remove());
  startBtn.style.display = "inline-block";
}

function spawnTarget() {
  const target = document.createElement("div");
  target.classList.add("target");

  const size = 60;
  const posX = Math.random() * (gameArea.offsetWidth - size);
  target.style.left = posX + "px";
  target.style.top = "-60px"; // начинает за экраном

  gameArea.appendChild(target);

  let posY = -60;
  const fallSpeed = 3 + Math.random() * 2; // случайная скорость
  const fallInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(fallInterval);
      target.remove();
      return;
    }
    posY += fallSpeed;
    target.style.top = posY + "px";

    if (posY > gameArea.offsetHeight) {
      clearInterval(fallInterval);
      target.remove();
    }
  }, 16);

  target.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = "Счёт: " + score;
    target.classList.add("explode");
    setTimeout(() => target.remove(), 200);
    clearInterval(fallInterval);
  });
}

startBtn.addEventListener("click", startGame);

backBtn.addEventListener("click", () => {
  stopGame();
  window.location.href = "index.html";
});


