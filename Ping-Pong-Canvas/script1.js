const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
const gameScore = document.querySelector("#gameScore") // was 'scoreText' in updateScore — fixed
const rest_btn = document.querySelector("#resetBtn")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

//color constants
const boardBackground = "snow";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";

//ball dimensions
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;

//paddle class
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};

let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

let player1Score = 0;
let player2Score = 0;

//event handler function
window.addEventListener("keydown", changeDirection)
rest_btn.addEventListener("click", resetGame)

gameStart()

//callback functions
function gameStart() {
    createBall();
    nextTick();
};

function nextTick() {
    intervalID = setTimeout(() => {
        clearBoard(),
        drawPaddles(),
        moveBall(),
        drawBall(ballX, ballY),
        checkCollision(),
        nextTick(); // <--- this was missing
    }, 10);
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight); //we are creating a a border so we use a rectangle with whole width and height
}

function drawPaddles() {
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = paddle1Color; //fillstyle <-> fillrect/fill arc are pairs where first one fills the color for the next cosecutive call of fill rect with dimensions
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function moveBall() {
    ballX += ballXDirection * ballSpeed; // <--- fixed: use += instead of =
    ballY += ballYDirection * ballSpeed; // <--- same here
}

function drawBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function createBall() {
    ballSpeed = 1; // <--- reset speed
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1;
    } else {
        ballXDirection = -1;
    }

    if (Math.round(Math.random()) == 1) {
        ballYDirection = Math.random() * 1; //more random directions
    } else {
        ballYDirection = Math.random() * -1; //more random directions
    }

    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

function checkCollision() {
    if (ballY <= 0 + ballRadius) {
        ballYDirection *= -1; //here by toggling the diection we not only create bouncing back movements but also V shaped bounces since we toggle both x and y coordinates here
    }

    if (ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1;
    }

    if (ballX <= 0) {
        player2Score += 1;
        updateScore();
        createBall(); //set the ball at middle and draw it before the next game
        return;
    }

    if (ballX >= gameWidth) {
        player1Score += 1;
        updateScore();
        createBall();
        return;
    }

    if (ballX <= (paddle1.x + paddle1.width + ballRadius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius; // here we keep the ball correct ly at the surface and we just reverse the direction and again note that movement is not just bounce back but a are shaped reflection
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }

    if (ballX >= (paddle2.x - ballRadius)) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius; // if ball gets stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
};

function changeDirection(event) {
    const keyPressed = event.keyCode;

    const paddle1Up = 87; //for W
    const paddle1Down = 83; //for A
    const paddle2Up = 38; //for S
    const paddle2Down = 40; //for D

    switch (keyPressed) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            break;

        case (paddle1Down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
            }
            break;

        case (paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            break;

        case (paddle2Down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed;
            }
            break;
    }
};

function updateScore() {
    gameScore.textContent = `${player1Score} : ${player2Score}`; // <--- fixed: should use gameScore not scoreText
};

function resetGame() {
    player1Score = 0;
    player2Score = 0;

    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };

    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };

    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;

    updateScore();
    clearInterval(intervalID); // <--- this works only if intervalID is from setInterval or a manually repeated setTimeout

    gameStart();
};
