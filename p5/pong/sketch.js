var player;
var cpu;
var ball;

var cpuSpeed = 3;

var playerScore = 0;
var cpuScore = 0;

function setup() {
	createCanvas(800, 600);
	
	noCursor();
	
	player = new Paddle(30, height / 2);
	cpu = new Paddle(width - 30, height / 2);
	ball = new Ball();
}

function draw() {
	background(0);
	
	player.display();	
	
	player.pos.y = constrain(mouseY, player.height / 2, height - player.height / 2);
	
	if (ball.vel.x > 0) {
		if (ball.pos.y < cpu.pos.y) {
		cpu.pos.y = cpu.pos.y - cpuSpeed;
		} else if (ball.pos.y > cpu.pos.y) {
			cpu.pos.y = cpu.pos.y + cpuSpeed;
		}
	}
	
	if (ball.behindPlayer()) {
		cpuScore += 1;
		ball.respawn("left");
	}
	
	if (ball.behindCpu()) {
		playerScore += 1;
		ball.respawn("right");
	}
	
	cpu.pos.y = constrain(cpu.pos.y, cpu.height / 2, height - cpu.height / 2);
	
	cpu.display();
	
	ball.checkCollidePlayer(player);
	ball.checkCollideCpu(cpu);	
	ball.display();
	ball.update();
	
	drawScore();
	
	drawDottedLine(); // Do this last for maximum retro.
}

function drawScore() {
	var fontsize = 72;
	textFont("Courier New", fontsize);
	textAlign(CENTER, CENTER);
	textStyle(BOLD);
	text(playerScore, width / 2 - fontsize, fontsize);
	text(cpuScore, width / 2 + fontsize, fontsize);
}

function drawDottedLine() {
	for (var i = 10; i < height; i = i + 50) {
		rect(width/2 - 10, i, 15, 30);
	}
	
	fill(0);

	for (var i = 0; i < height; i = i + 5) {
		rect(0, i, width, 2);
	}
	fill(255);
}