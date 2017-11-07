var snake = [[15, 14], [14, 14], [13, 14], [12, 14]];
var direction = "right";
var score = 0;
var paused = false;
var growth = 0;
var apple = [0, 0];

var numSqs = 25;

var SQUARE_SIZE = 25;
var canvasDim = SQUARE_SIZE * numSqs + 1;

var gameOver = false;
var moveLoop;

function setup() {
	createCanvas(canvasDim, canvasDim + SQUARE_SIZE);
	spawnApple();
	moveLoop = setInterval(moveSnake, 80);
}

function draw() {
	background(52, 55, 61);
	// drawGrid();
	drawSnake();
	drawApple();
	drawScore();
	checkForApple();
	if (checkForCollision()) {
		// GAME OVER!
		clearInterval(moveLoop);
		gameOver = true;
	}
}

function showStartScreen() {
	
}

function startGame() {
	
}

function drawScore() {
	strokeWeight(1);
	stroke(0, 255, 0);
	fill(0, 255, 0);
	var scoreString = "Score: " + score;
	textSize(SQUARE_SIZE);
	textAlign(CENTER);
	text(scoreString, canvasDim / 2, canvasDim + 5);
	strokeWeight(4);
	stroke(0, 255, 0);
	line(0, canvasDim - SQUARE_SIZE, canvasDim, canvasDim - SQUARE_SIZE);
	noFill();
	rect(0, 0, canvasDim, canvasDim + SQUARE_SIZE);
}

function spawnApple() {
	apple = [Math.floor(random(numSqs)), Math.floor(random(numSqs - 1))];
}

function drawApple() {
	stroke(255, 0, 0);
	strokeWeight(4);
	noFill();
	rect(apple[0] * SQUARE_SIZE, apple[1] * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, 5);
}

function checkForCollision() {
	var head = snake[0];
	
	// Check boundary collision
	if (head[0] < 0 || head[0] > numSqs - 1 || head[1] < 0 || head[1] > numSqs - 2) {
		return true;
	}
	
	// Check self-collision
	for (var i = 1; i < snake.length; i++) {
		if (head[0] == snake[i][0] && head[1] == snake[i][1]) {
			return true;
		}
	}
	return false;
}

function checkForApple() {
	for (var coord of snake) {
		if (coord[0] == apple[0] && coord[1] == apple[1]) {
			growth = growth + 1;
			score = score + 1;
			spawnApple();
		}
	}	
}

function moveSnake() {
	if (paused) {
		return;
	}
	
	var dx = 0;
	var dy = 0;
	
	if (direction == "left") {
		dx = -1;
	} else if (direction == "right") {
		dx = 1;
	} else if (direction == "up") {
		dy = -1;
	} else if (direction == "down") {
		dy = 1;
	}
	
	var newSegment = [0, 0];
	
	newSegment[0] = snake[0][0] + dx;
	newSegment[1] = snake[0][1] + dy;
	
	snake.unshift(newSegment);
	if (growth > 0) {
		growth = growth - 1;
	} else {
		snake.pop();
	}
	checkForApple();
}

function keyPressed() {
	if (keyCode === 32) {
		paused = !paused;
	} else if (keyCode === LEFT_ARROW && direction != "right" && !paused) {
		direction = "left";
	} else if (keyCode === RIGHT_ARROW && direction != "left" && !paused) {
		direction = "right";
	} else if (keyCode === UP_ARROW && direction != "down" && !paused) {
		direction = "up";
	} else if (keyCode === DOWN_ARROW && direction != "up" && !paused) {
		direction = "down";
	} 
}

function drawSnake() {
	stroke(0, 255, 0);
	strokeWeight(4);
	for (var coord of snake) {
		noFill();
		rect(coord[0] * SQUARE_SIZE, coord[1] * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, 5);
	}
	stroke(0, 255, 255);
	rect(snake[0][0] * SQUARE_SIZE, snake[0][1] * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE, 5);
}

function drawGrid() {
	strokeWeight(1);
	for (var i = 0; i < numSqs; i++) {
		stroke(255);
		line(0, i * SQUARE_SIZE, canvasDim, i * SQUARE_SIZE);
		line(i * SQUARE_SIZE, 0, i * SQUARE_SIZE, canvasDim);
	}
}