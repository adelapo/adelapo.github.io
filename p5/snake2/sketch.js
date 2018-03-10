var player;
var cpu;

var threshold = 3;
var SQUARE_SIZE = 20;

function setup() {
	createCanvas(800, 800);
	
	player = new Snake(color("green"), [[0, 0], [1, 0], [2, 0], [3, 0]], "right");
	cpu = new Snake(color("yellow"), [[36, 39], [37, 39], [38, 39], [39, 39]], "left");
	
	frameRate(10);
}

function draw() {
	background(51);
	
	for (var snake of [player, cpu]) {
		snake.move();
		snake.draw(SQUARE_SIZE);
	}
	
	if (player.body[0][0] - cpu.body[0][0] > threshold) {
		cpu.direction = "right";
		cpu.color = "red";
	} else if (player.body[0][0] - cpu.body[0][0] < -threshold) {
		cpu.direction = "left";
		cpu.color = "orange";
	} else if (player.body[0][1] - cpu.body[0][1] > threshold) {
		cpu.direction = "right";
		cpu.color = "yellow";
	} else if (player.body[0][1] - cpu.body[0][1] < -threshold) {
		cpu.direction = "left";
		cpu.color = "blue";
	}
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		player.direction = "left";
	} else if (keyCode === RIGHT_ARROW) {
		player.direction = "right";
	} else if (keyCode === UP_ARROW) {
		player.direction = "up";
	} else if (keyCode === DOWN_ARROW) {
		player.direction = "down";
	}
}