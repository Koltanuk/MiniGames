
let gameSpeed = 10;
let score = 0;
let gameStarted = false;
let speed = 2.5;
let isGameOver = false;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            gameStarted = true;
            moveObstacle();
        }
        if (!isGameOver) {
            jump();
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
        document.getElementById('obstacle3')
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
            alert('Game Over');
        }
    }
}