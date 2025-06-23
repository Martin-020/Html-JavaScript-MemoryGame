const emojis = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍑", "🥝"];
let cards = [];
let flippedCards = [];
let matched = 0;
let steps = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  const board = document.getElementById("gameBoard");
  board.classList.add("fade");

  setTimeout(() => {
    board.innerHTML = "";
    cards = shuffle([...emojis, ...emojis]);
    flippedCards = [];
    matched = 0;
    steps = 0;
    document.getElementById("score").textContent = "Langkah: 0";

    cards.forEach((emoji, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.emoji = emoji;
      card.dataset.index = index;
      card.addEventListener("click", flipCard);
      board.appendChild(card);
    });

    board.classList.remove("fade");
  }, 300);
}

function flipCard() {
  if (this.classList.contains("flipped") || this.classList.contains("matched") || flippedCards.length === 2) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    steps++;
    document.getElementById("score").textContent = `Langkah: ${steps}`;

    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matched += 2;
      flippedCards = [];

      if (matched === cards.length) {
        setTimeout(() => alert(`🎉 Selesai dalam ${steps} langkah!`), 300);
      }
    } else {
      setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

startGame();
