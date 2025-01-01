let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameStatus = document.getElementById("status");
let gameResult = document.getElementById("gameResult");

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  if (board[index] === "" && !isGameOver()) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWinner()) {
      gameStatus.textContent = `${currentPlayer} wins!`;
      gameResult.style.display = "block";
    } else if (board.every(cell => cell !== "")) {
      gameStatus.textContent = "It's a tie!";
      gameResult.style.display = "block";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function isGameOver() {
  return checkWinner() || board.every(cell => cell !== "");
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameStatus.textContent = "";
  gameResult.style.display = "none";
  cells.forEach(cell => {
    cell.textContent = "";
  });
}

function startNewGame() {
  resetGame();
  gameResult.style.display = "none";
}
