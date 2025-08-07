const resetBtn = document.querySelector(".reset-game-btn");
const tileContainer = document.querySelector(".tile-container");
const personsTurn = document.querySelector(".person-turn");
const tileItems = Array.from(document.querySelectorAll(".tile"));
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
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
  const currentItem = e.target;
  const letter = personsTurn.children[0].innerText;
  createItem(currentItem, letter);
  setTurn(letter);
  checkWin();
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
    tile.classList.remove("won");
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
    personsTurn.innerText = `Player X Won!`;
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
    personsTurn.innerText = "Player O Won!";
  }
}

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

//fix winning screen
//after game won it wont reset
//click same card twice
