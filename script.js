const resetBtn = document.querySelector(".reset-game-btn");
const tileContainer = document.querySelector(".tile-container");
const personsTurn = document.querySelector(".person-turn");
const tileItems = Array.from(document.querySelectorAll(".tile"));
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const gameForm = document.querySelector("#game-form");
let gameOver = false;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("click", (e) => {
  e.preventDefault();
  console.clear();
  if (!e.target.matches(".tile")) return;
  if (gameOver) return;
  const currentItem = e.target;
  const letter = personsTurn.children[1].innerText;
  if (currentItem.children.length != 0) return;
  createItem(currentItem, letter);
  setTurn(letter);
  checkWin();
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetItems();
});

//creates tile.
function createItem(currentItem, letter) {
  const newLetter = document.createElement("h2");
  newLetter.innerText = letter;
  newLetter.classList.add(letter);
  currentItem.appendChild(newLetter);
}

//resets game back to beginning.
function resetItems() {
  tileItems.forEach((tile) => {
    tile.innerHTML = "";
    tile.classList.remove("won");
  });
  personsTurn.children[1].innerText = "X";
  personsTurn.children[1].classList.add("X-turn");
  personsTurn.children[1].classList.remove("O-turn");
  personsTurn.children[2].innerText = "'s Turn";
  gameOver = false;
}

//shows who's turn it is.
function setTurn(letter) {
  if (letter === "X" || letter === "x") {
    personsTurn.children[1].innerText = "O";
    personsTurn.children[1].classList.add("O-turn");
    personsTurn.children[1].classList.remove("X-turn");
  }
  if (letter === "O" || letter === "o") {
    personsTurn.children[1].innerText = "X";
    personsTurn.children[1].classList.add("X-turn");
    personsTurn.children[1].classList.remove("O-turn");
  }
}

//checks to see if either team won, and is so displays the win.
function checkWin() {
  //collect the indexes from both x and o's.
  const xIndices = [];
  tileItems.filter((tile, index) => {
    if (tile.children[0] != undefined) {
      if (tile.children[0].innerText === "X") {
        xIndices.push(index);
      }
    }
  });
  if (showWinner(xIndices) == "won") {
    addWinningText("X");
    gameOver = true;
  }

  const oIndices = [];
  tileItems.filter((tile, index) => {
    if (tile.children[0] != undefined) {
      if (tile.children[0].innerText === "O") {
        oIndices.push(index);
      }
    }
  });
  if (showWinner(oIndices) == "won") {
    addWinningText("O");
    gameOver = true;
  }
}

//check is a team won and returns "won" if they have.
function showWinner(letterArray) {
  const winningSet = winningConditions.find((set) =>
    set.every((number) => letterArray.includes(number))
  );
  if (winningSet) {
    for (let i = 0; i < winningSet.length; i++) {
      tileContainer.children[winningSet[i]].classList.add("won");
    }
    return "won";
  }
}

//changes above text to winning text.
function addWinningText(letter) {
  personsTurn.innerHTML = "";

  const beforeSpan = document.createElement("span");
  const span = document.createElement("span");
  const afterSpan = document.createElement("span");

  beforeSpan.innerText = "Player ";
  span.innerText = letter;
  afterSpan.innerText = " Wins!";

  span.classList.add(letter + "-turn");

  personsTurn.appendChild(beforeSpan);
  personsTurn.appendChild(span);
  personsTurn.appendChild(afterSpan);
}
