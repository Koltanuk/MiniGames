const rows = 8;
const cols = 8;
const minMines = 8;
const maxMines = 10;
let gameBoard = [];
let isFirstClick = true;

const generateBoard = () => {
    const board = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push({ value: 0, isOpen: false });
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
            if (gameBoard[r][c].value === 9) continue; // Пропустить клетки с минами
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
    if (gameBoard[row][col].isOpen) return;
    gameBoard[row][col].isOpen = true;

    if (gameBoard[row][col].value === 9) {
        gameBoard.forEach(row => {
            row.forEach(cell => {
                if (cell.value === 9) cell.isOpen = true;
            });
        });
        renderBoard();
        alert('Game Over!');
        return;
    } else if (gameBoard[row][col].value === 0) {
        for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
                openCell(i, j);
            }
        }
    }
    renderBoard();
};
const handleRightClick = (event, row, col) => {
    event.preventDefault(); // Предотвращаем стандартное поведение контекстного меню
    // Проверяем, что клетка не открыта
    if (!gameBoard[row][col].isOpen) {
        // Проверяем, есть ли уже флаг в клетке
        if (gameBoard[row][col].flag) {
            // Если флаг уже установлен, снимаем его
            gameBoard[row][col].flag = false;
        } else {
            // Иначе устанавливаем флаг в клетку
            gameBoard[row][col].flag = true;
        }
        // Перерисовываем доску
        renderBoard();
    }
};
const boardContainer = document.getElementById('game-board');
boardContainer.addEventListener('contextmenu', (event) => {
    // Получаем координаты клетки, на которую был совершен клик
    const cell = event.target;
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    // Вызываем функцию обработки правого клика
    handleRightClick(event, row, col);
});
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
                    cellElement.textContent = '*';
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

const initializeGame = () => {
    gameBoard = generateBoard();
    isFirstClick = true;
    renderBoard();
};

initializeGame();