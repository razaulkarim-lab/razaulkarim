const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
    cell.innerHTML = "<span></span>";
    gameBoard.appendChild(cell);
  });
}

function handleCellClick(event) {
  const index = event.target.closest(".cell").getAttribute("data-index");
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  event.target.querySelector("span").textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}

resetBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();
