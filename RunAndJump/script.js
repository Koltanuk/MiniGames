let score = 0;
let gameStarted = false;
let speed = 2.5;
let isGameOver = false;
let scoreInterval;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            gameStarted = true;
            moveObstacle();
            moveBackground();
            startScore();
        }
        if (!isGameOver) {
            jump();
        }
        else if (isGameOver) {
            resetGame();

        }
    }
});

function jump() {
    const character = document.getElementById("character");
    if (!character.classList.contains("jump")) {
        character.classList.add("jump");
        setTimeout(function () {
            character.classList.remove("jump");
        }, 500);
    }
}

function moveObstacle() {
    const gameContainer = document.getElementById('gameContainer');
    const obstacles = [
        document.getElementById('obstacle1'),
        document.getElementById('obstacle2'),
        document.getElementById('obstacle3'),
        document.getElementById('obstacle4'),
        document.getElementById('obstacle5')
    ];
    const character = document.getElementById("character");
    obstacles.forEach(obstacle => obstacle.style.display = 'none');

    const selectedObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];
    selectedObstacle.style.display = 'block';

    let position = gameContainer.offsetWidth + 400;
    selectedObstacle.style.left = position + 'px';

    const interval = setInterval(frame, 5);
    function frame() {
        if (isGameOver) {
            clearInterval(interval);
            return;
        }
        if (position <= -selectedObstacle.offsetWidth - 400) {
            clearInterval(interval);
            speed += 0.25;
            moveObstacle()
        }
        else {
            position -= speed;
            selectedObstacle.style.left = position + 'px';
        }

        const characterRect = character.getBoundingClientRect();
        const obstacleRect = selectedObstacle.getBoundingClientRect();
        if (
            characterRect.left < obstacleRect.left + obstacleRect.width &&
            characterRect.left + characterRect.width > obstacleRect.left &&
            characterRect.top < obstacleRect.top + obstacleRect.height &&
            characterRect.top + characterRect.height > obstacleRect.top
        ) {
            isGameOver = true;
            speed = 0;
            character.style.animation = 'none';
            selectedObstacle.style.animation = 'none';
            document.getElementById('gameOver').style.display = 'block';
        }
    }

}

function moveBackground() {
    const background = document.getElementById('background');
    let backgroundPosition = gameContainer.offsetWidth;
    const interval = setInterval(() => {
        if (isGameOver) {
            clearInterval(interval);
            return;
        }
        backgroundPosition -= speed * 2;
        background.style.backgroundPosition = `${backgroundPosition}px 0`;
    }, 20);
}

function resetGame() {
    document.getElementById('gameOver').style.display = 'none';
    isGameOver = false;
    speed = 2.5;
    score = 0;
    if (scoreInterval) {
        clearInterval(scoreInterval);
    }
    backgroundPosition = 0;
    document.getElementById('score').textContent = 'Score: 0';
    moveObstacle();
    moveBackground();
    startScore();
}

function startScore() {
    const scoreElement = document.getElementById('score');
    let startTime = Date.now();
    scoreInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(scoreInterval);
            return;
        }
        let elapsedTime = Date.now() - startTime;
        scoreElement.textContent = `Score: ${Math.floor(elapsedTime / 100)}`;
    }, 100);
}
document.getElementById('restart').addEventListener('click', function (event) {
    event.preventDefault();
    resetGame();
});

document.getElementById('restart').addEventListener('click', function (event) {
    event.preventDefault();
    resetGame();
});