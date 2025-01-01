const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            return gameState[a];
        }
    }
    return gameState.includes('') ? null : 'Draw';
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell');
    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        resultScreen.style.display = 'block';
        resultMessage.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
    message.textContent = `Player X's Turn`;  // Reset turn message
    resultScreen.style.display = 'none'; // Hide result screen
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);

// Initialize the game with Player X's turn
message.textContent = `Player X's Turn`;
