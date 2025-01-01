const moveSound = new Audio('sounds/move.mp3');
const winSound = new Audio('sounds/win.mp3');
const drawSound = new Audio('sounds/draw.mp3');

const board = document.getElementById("game-board");
const cells = Array.from(document.querySelectorAll(".cell"));
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const overlay = document.getElementById("overlay");
const overlayStatus = document.getElementById("overlay-status");
const newGameBtn = document.getElementById("new-game-btn");

let currentPlayer = "X";
let gameBoard = Array(9).fill(null);
let gameActive = true;

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('clicked'); // Add the clicked class for animation

    moveSound.play(); // Play move sound

    if (checkWinner()) {
        gameActive = false;
        winSound.play(); // Play win sound
        overlayStatus.textContent = `${currentPlayer} wins!`;
        overlay.style.display = "flex";
        return;
    }

    if (gameBoard.every(cell => cell)) {
        gameActive = false;
        drawSound.play(); // Play draw sound
        overlayStatus.textContent = "It's a draw!";
        overlay.style.display = "flex";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    gameBoard = Array(9).fill(null);
    gameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = "");
    status.textContent = `${currentPlayer}'s turn`;
    overlay.style.display = "none";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

function aiMove() {
    const availableCells = gameBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    gameBoard[randomIndex] = "O";
    cells[randomIndex].textContent = "O";
    cells[randomIndex].classList.add('clicked'); // Add animation
    moveSound.play(); // Play move sound

    if (checkWinner()) {
        gameActive = false;
        winSound.play(); // Play win sound
        overlayStatus.textContent = `Player O wins!`;
        overlay.style.display = "flex";
    } else if (gameBoard.every(cell => cell)) {
        gameActive = false;
        drawSound.play(); // Play draw sound
        overlayStatus.textContent = "It's a draw!";
        overlay.style.display = "flex";
    } else {
        currentPlayer = "X";
        status.textContent = `${currentPlayer}'s turn`;
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] || !gameActive || currentPlayer === "O") return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('clicked'); // Add the clicked class for animation

    moveSound.play(); // Play move sound

    if (checkWinner()) {
        gameActive = false;
        winSound.play(); // Play win sound
        overlayStatus.textContent = `${currentPlayer} wins!`;
        overlay.style.display = "flex";
        return;
    }

    if (gameBoard.every(cell => cell)) {
        gameActive = false;
        drawSound.play(); // Play draw sound
        overlayStatus.textContent = "It's a draw!";
        overlay.style.display = "flex";
        return;
    }

    currentPlayer = "O";
    status.textContent = `${currentPlayer}'s turn`;
    setTimeout(aiMove, 500); // AI moves after a short delay
}
