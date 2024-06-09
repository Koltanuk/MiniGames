const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');

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
    shuffle(colors);
    colors.forEach(color => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    });
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
        firstCard.style.backgroundColor = '#ccc';
        secondCard.style.backgroundColor = '#ccc';
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.style.backgroundColor = '#ccc';
        card.classList.remove('open', 'match');
    });
    shuffle(colors);
    cards.forEach((card, index) => {
        card.dataset.color = colors[index];
    });
    resetBoard();
});

createBoard();
