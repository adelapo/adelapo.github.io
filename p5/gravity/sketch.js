var block;
var gravity;

function setup() {
	createCanvas(800, 600);
	block = new Block(400, 300);
	gravity = createVector(0, 1);
	
	block.acc = gravity;
}

function draw() {
	background(51);
	block.update();
	block.display();
	
	if (keyIsDown(LEFT_ARROW)) {
		block.acc = createVector(-1, 0);
	}
	if (keyIsDown(RIGHT_ARROW)) {
		block.acc = createVector(1, 0);
	}
	if (keyIsDown(UP_ARROW)) {
		block.acc = createVector(0, -1);
	}
	if (keyIsDown(DOWN_ARROW)) {
		block.acc = createVector(0, 1);
	}
}