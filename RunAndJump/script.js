document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

function jump() {
    const character = document.getElementById("character");
    if (!character.classList.contains("jump")) {
        character.classList.add("jump");
        setTimeout(function () {
            character.classList.remove("jump");
        }, 300);
    }
}
function gameover() {
    const obstacle = document.getElementById("obstacle");

}



// const character = document.getElementById("character");
// const obstacle = document.getElementById("obstacle");
// let isJumping = false;
// let gameSpeed = 10;
// let score = 0;

// document.addEventListener("keydown", function (event) {
//     if (event.code === "Space" && !isJumping) {
//         isJumping = true;
//         jump();
//     }
// });

// function jump() {
//     let jumpInterval = setInterval(function () {
//         let bottomPosition = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
//         if (bottomPosition >= 200) {
//             clearInterval(jumpInterval);
//             let fallInterval = setInterval(function () {
//                 bottomPosition -= 5;
//                 character.style.bottom = bottomPosition + "px";
//                 if (bottomPosition <= 0) {
//                     clearInterval(fallInterval);
//                     isJumping = false;
//                 }
//             }, 20);
//         } else {
//             bottomPosition += 5;
//             character.style.bottom = bottomPosition + "px";
//         }
//     }, 20);
// }

// function moveObstacle() {
//     let obstaclePosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
//     if (obstaclePosition <= -20) {
//         obstaclePosition = 100;
//         score++;
//     } else {
//         obstaclePosition -= gameSpeed;
//     }
//     obstacle.style.left = obstaclePosition + "px";
//     if (collisionCheck()) {
//         gameSpeed = 0;
//         document.body.innerHTML = "<h1>Game Over</h1><h2>Your score: " + score + "</h2>";
//     } else {
//         requestAnimationFrame(moveObstacle);
//     }
// }

// function collisionCheck() {
//     let dinosaurBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
//     let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
//     if (dinosaurBottom <= 20 && obstacleLeft >= 50 && obstacleLeft <= 70) {
//         return true;
//     }
//     return false;
// }

// moveObstacle();