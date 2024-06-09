// let gameSpeed = 10;
let score = 0;
let gameStarted = false;
let speed = 2.5;
let isGameOver = false;
let backgroundPosition = 0;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            gameStarted = true;
            moveObstacle();
            moveBackground();
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
// function moveBackground() {
//     const background = document.getElementById('background');
//     const interval = setInterval(() => {
//         if (isGameOver) {
//             clearInterval(interval);
//             return;
//         }
//         backgroundPosition -= speed / 2;
//         background.style.transform = `translateX(${backgroundPosition}px)`;
//         if (backgroundPosition <= -window.innerWidth) {
//             backgroundPosition = 0;
//         }
//     }, 5);
// }

function moveBackground() {
    const background = document.getElementById('background');
    const interval = setInterval(() => {
        if (isGameOver) {
            clearInterval(interval);
            return;
        }
        backgroundPosition -= speed * 2; // Adjust speed if needed
        background.style.backgroundPosition = `${backgroundPosition}px 0`; // Move background horizontally
        if (backgroundPosition <= selectedObstacle.offsetWidth - 400) {
            backgroundPosition = 0; // Reset position for smooth loop
        }
    }, 20); // Adjust interval timing if needed
}