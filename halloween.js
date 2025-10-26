const pumpkins = document.querySelectorAll('.pumpkin');
const startBtn = document.getElementById('startBtn');
const statusText = document.getElementById('status');

let sequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;

function flash(pumpkin) {
  pumpkin.classList.add('active');
  setTimeout(() => pumpkin.classList.remove('active'), 500);
}

function playSequence() {
  canClick = false;
  let i = 0;
  const interval = setInterval(() => {
    flash(pumpkins[sequence[i]]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      canClick = true;
    }
  }, 800);
}

function nextLevel() {
  level++;
  statusText.textContent = `Уровень ${level}`;
  const next = Math.floor(Math.random() * 4);
  sequence.push(next);
  playerSequence = [];
  setTimeout(playSequence, 1000);
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  statusText.textContent = "Проиграл 💀 Попробуй снова!";
  startBtn.disabled = false;
}

pumpkins.forEach((p, i) => {
  p.addEventListener('click', () => {
    if (!canClick) return;
    flash(p);
    playerSequence.push(i);
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
      resetGame();
      return;
    }
    if (playerSequence.length === sequence.length) {
      setTimeout(nextLevel, 1000);
      canClick = false;
    }
  });
});

startBtn.addEventListener('click', () => {
  sequence = [];
  playerSequence = [];
  level = 0;
  nextLevel();
  startBtn.disabled = true;
  statusText.textContent = "Запоминай...";
});
