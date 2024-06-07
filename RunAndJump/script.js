
let gameSpeed = 10;
let score = 0;
let gameStarted = false;
let speed = 2;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!gameStarted) {
            gameStarted = true;
            const obstacle = document.getElementById('obstacle');
            obstacle.style.display = 'block';
            moveObstacle();
        }
        jump();
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
    const obstacle = document.getElementById('obstacle');
    let position = gameContainer.offsetWidth - obstacle.offsetWidth;
    obstacle.style.left = position + 'px';
    const interval = setInterval(frame, 5);
    function frame() {
        if (position <= -obstacle.offsetWidth - 150) {
            clearInterval(interval);
            speed += 0.5;
            setTimeout(moveObstacle, 1000);
        } else {
            position -= speed;
            obstacle.style.left = position + 'px';
        }
    }
}