const rows = 8;
const cols = 8;
const minMines = 8;
const maxMines = 10;
let gameBoard = [];
let isFirstClick = true;
let gameOver = false;

const generateBoard = () => {
    const board = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push({ value: 0, isOpen: false, flag: false });
        }
        board.push(row);
    }
    return board;
};

const generateMines = (firstRow, firstCol) => {
    let minesCount = Math.floor(Math.random() * (maxMines - minMines + 1)) + minMines;
    while (minesCount > 0) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (row !== firstRow || col !== firstCol) {
            if (gameBoard[row][col].value !== 9) {
                gameBoard[row][col].value = 9;
                minesCount--;
            }
        }
    }
};

const setCellValues = () => {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (gameBoard[r][c].value === 9) continue;
            let minesCount = 0;
            for (let i = Math.max(0, r - 1); i <= Math.min(rows - 1, r + 1); i++) {
                for (let j = Math.max(0, c - 1); j <= Math.min(cols - 1, c + 1); j++) {
                    if (gameBoard[i][j].value === 9) minesCount++;
                }
            }
            gameBoard[r][c].value = minesCount;
        }
    }
};
const openCell = (row, col) => {
    if (gameBoard[row][col].isOpen || gameBoard[row][col].flag || gameOver) return;
    gameBoard[row][col].isOpen = true;

    if (gameBoard[row][col].value === 9) {
        gameOver = true;
        gameBoard.forEach(row => {
            row.forEach(cell => {
                if (cell.value === 9) cell.isOpen = true;
            });
        });
        renderBoard();
        document.getElementById('message').style.display = 'block';
        displayMessage('Game Over!');
        return;
    } else if (gameBoard[row][col].value === 0) {
        for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
                openCell(i, j);
            }
        }
    }
    renderBoard();
    checkWin();
};

const checkWin = () => {
    let win = true;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (gameBoard[r][c].value !== 9 && !gameBoard[r][c].isOpen) {
                win = false;
                break;
            }
        }
    }
    if (win) {
        gameOver = true;
        document.getElementById('message').style.display = 'block';
        displayMessage('You Win!');
        launchConfetti()
    }
};

const handleRightClick = (event, row, col) => {
    event.preventDefault();
    if (isFirstClick || gameBoard[row][col].isOpen || gameOver) return;
    if (!gameBoard[row][col].isOpen) {
        gameBoard[row][col].flag = !gameBoard[row][col].flag;
        renderBoard();
    }
};

const renderBoard = () => {
    const boardContainer = document.getElementById('game-board');
    boardContainer.innerHTML = '';
    gameBoard.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (cell.isOpen) {
                cellElement.classList.add('opened');
                if (cell.value === 9) {
                    cellElement.classList.add('bomb');
                } else if (cell.value !== 0) {
                    cellElement.textContent = cell.value;
                }
            } else if (cell.flag) {
                cellElement.classList.add('flag');
            }
            cellElement.setAttribute('data-row', rIdx);
            cellElement.setAttribute('data-col', cIdx);
            cellElement.addEventListener('click', () => {
                if (isFirstClick) {
                    generateMines(rIdx, cIdx);
                    setCellValues();
                    isFirstClick = false;
                }
                openCell(rIdx, cIdx);
            });
            boardContainer.appendChild(cellElement);
        });
    });
};

const displayMessage = (message) => {
    const messageContainer = document.getElementById('message');
    messageContainer.textContent = message;
};

const initializeGame = () => {
    gameBoard = generateBoard();
    isFirstClick = true;
    gameOver = false;
    document.getElementById('message').style.display = 'none';
    displayMessage('');
    renderBoard();
};

document.getElementById('game-board').addEventListener('contextmenu', (event) => {
    const cell = event.target;
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    handleRightClick(event, row, col);
});
function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

initializeGame();