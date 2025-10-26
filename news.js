// === Новости сайта Lin_Night Clicker ===

const newsData = [
  {
    title: "⚡ Открытие!",
    text: "Мы наконец-то открылись!.",
    date: "26 октября 2025"
    title: "Хэллоуин🎃!",
    text: "В честь хэллоуина мы добавили режим "🎃Хэллоуин Леонида!.",
    date: "27 октября 2025"
  },
];

// === Функция преобразования даты ===
function parseDate(str) {
  const months = {
    "января": 0, "февраля": 1, "марта": 2, "апреля": 3, "мая": 4, "июня": 5,
    "июля": 6, "августа": 7, "сентября": 8, "октября": 9, "ноября": 10, "декабря": 11
  };
  const parts = str.split(" ");
  return new Date(Number(parts[2]), months[parts[1]], Number(parts[0]));
}

// === Генерация HTML новостей ===
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".news-container");
  if (!container) return;

  // Сортировка по дате (новые сверху)
  const sorted = [...newsData].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  sorted.forEach((news, index) => {
    const div = document.createElement("div");
    div.classList.add("news-item");
    div.style.animationDelay = `${index * 0.15}s`;

    div.innerHTML = `
      <h3>${news.title}</h3>
      <p>${news.text}</p>
      <span class="news-date">${news.date}</span>
    `;

    container.appendChild(div);
  });
});

