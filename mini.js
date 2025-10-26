(() => {
  const area = document.getElementById("mini-area");
  const startBtn = document.getElementById("start-mini");
  const result = document.getElementById("mini-result");
  const backBtn = document.getElementById("back-to-clicker");

  const urlParams = new URLSearchParams(window.location.search);
  const imported = urlParams.get("data");
  let state = imported ? JSON.parse(decodeURIComponent(imported)) : { score: 0 };

  function saveAndReturn() {
    const encoded = encodeURIComponent(JSON.stringify(state));
    window.location.href = `index.html?data=${encoded}`;
  }

  startBtn.addEventListener("click", () => {
    area.innerHTML = "";
    result.textContent = "Жди появления Леонида...";

    const delay = Math.random() * 2500 + 1500; // 1.5–4 сек
    setTimeout(() => {
      const leonid = document.createElement("img");
      leonid.src = "https://i.ibb.co/21jpy0VX/image.png";
      leonid.className = "mini-target";

      const x = Math.random() * (area.clientWidth - 120);
      const y = Math.random() * (area.clientHeight - 120);
      leonid.style.left = `${x}px`;
      leonid.style.top = `${y}px`;

      area.appendChild(leonid);
      const startTime = performance.now();
      let clicked = false;

      leonid.addEventListener("click", () => {
        clicked = true;
        const reaction = performance.now() - startTime;
        const bonus = Math.max(80 - Math.floor(reaction / 10), 10);

        state.score = (state.score || 0) + bonus;
        result.innerHTML = `⚡ Реакция: ${reaction.toFixed(0)} мс<br>Бонус: +${bonus} очков!`;

        setTimeout(saveAndReturn, 2000);
        leonid.remove();
      });

      setTimeout(() => {
        if (!clicked) {
          result.textContent = "😅 Не успел!";
          setTimeout(saveAndReturn, 2000);
          leonid.remove();
        }
      }, 1500);
    }, delay);
  });

  backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    saveAndReturn();
  });
})();

