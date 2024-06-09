const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const winMessage = document.getElementById('win-message');

const colors = [
    'red', 'red',
    'blue', 'blue',
    'green', 'green',
    'yellow', 'yellow',
    'purple', 'purple',
    'orange', 'orange',
    'pink', 'pink',
    'brown', 'brown', 
    'magenta', 'magenta'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    winMessage.classList.add('hidden');
    shuffle(colors);
    colors.forEach(color => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    });
    resizeCards();
}

function handleCardClick(e) {
    if (lockBoard) return;
    const clickedCard = e.target;
    if (clickedCard === firstCard) return;

    clickedCard.style.backgroundColor = clickedCard.dataset.color;
    clickedCard.classList.add('open');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        disableCards();
        if (document.querySelectorAll('.card.match').length === 18) {
            showWinMessage();
        }
        resetBoard();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.style.backgroundColor = '#23804a';
        secondCard.style.backgroundColor = '#23804a';
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.style.backgroundColor = '#23804a';
        card.classList.remove('open', 'match');
    });
    shuffle(colors);
    cards.forEach((card, index) => {
        card.dataset.color = colors[index];
    });
    resetBoard();
});

window.addEventListener('resize', resizeCards);

function resizeCards() {
    const cardSize = Math.min(gameBoard.clientWidth / 6, gameBoard.clientHeight / 3) - 10;
    document.querySelectorAll('.card').forEach(card => {
        card.style.width = `${cardSize}px`;
        card.style.height = `${cardSize}px`;
    });
}

function showWinMessage() {
    winMessage.classList.remove('hidden');
    startFireworks();
}

function startFireworks() {
    const container = document.getElementById('fireworks-container');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFirework(container), i * 500);
    }
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${Math.random() * 100}%`;
    firework.style.top = `${Math.random() * 100}%`;
    container.appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1000);
}

createBoard();
