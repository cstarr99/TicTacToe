const resetBtn = document.querySelector(".reset-game-btn");
const tileContainer = document.querySelector(".tile-container");
const personsTurn = document.querySelector(".person-turn");
const tileItems = Array.from(document.querySelectorAll(".tile"));

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.matches(".tile")) return;
  const currentItem = e.target;
  const letter = personsTurn.children[0].innerText;
  createItem(currentItem, letter);
  setTurn(letter);
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetItems();
});

function createItem(currentItem, letter) {
  const newLetter = document.createElement("h2");
  newLetter.innerText = letter;
  newLetter.classList.add(letter);
  currentItem.appendChild(newLetter);
}

function resetItems() {
  tileItems.forEach((tile) => {
    tile.innerHTML = "";
  });
  personsTurn.children[0].innerText = "X";
  personsTurn.children[0].classList.add("x-turn");
  personsTurn.children[0].classList.remove("o-turn");
}

function setTurn(letter) {
  if (letter === "X" || letter === "x") {
    personsTurn.children[0].innerText = "O";
    personsTurn.children[0].classList.add("o-turn");
    personsTurn.children[0].classList.remove("x-turn");
  }
  if (letter === "O" || letter === "o") {
    personsTurn.children[0].innerText = "X";
    personsTurn.children[0].classList.add("x-turn");
    personsTurn.children[0].classList.remove("o-turn");
  }
}
