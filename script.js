const board = document.getElementById("board");
let opened = [];

// הכנת זוגות אקראיים
const values = [];
for (let i = 1; i <= 18; i++) {
  values.push(i);
  values.push(i);
}

// ערבוב של הקלפים
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(values);

// בניית הקלפים
values.forEach((val) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = val;
  card.textContent = val;
  board.appendChild(card);
});

// לוגיקת פתיחה
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("open") || opened.length === 2) return;

    card.classList.add("open");
    opened.push(card);

    if (opened.length === 2) {
      setTimeout(() => {
        const [a, b] = opened;
        if (a.dataset.value !== b.dataset.value) {
          a.classList.remove("open");
          b.classList.remove("open");
        }
        opened = [];
      }, 800);
    }
  });
});

// Fake commits
function loadCommits() {
  const sampleCommits = [
    "fix: fixed duplicate card bug",
    "feat: added 8x8 board",
    "refactor: shuffled values logic",
    "style: improved grid display",
    "chore: updated commit viewer",
  ];

  const list = document.getElementById("commitList");
  list.innerHTML = "";

  sampleCommits.slice(0, 4).forEach((commit) => {
    const li = document.createElement("li");
    li.textContent = commit;
    list.appendChild(li);
  });
}

loadCommits();
setInterval(loadCommits, 10000);
