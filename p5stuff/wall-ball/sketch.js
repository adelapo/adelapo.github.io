var paddle;
var ball;

function setup() {
	createCanvas(800, 600);
	noCursor();
	paddle = new Paddle();
	ball = new Ball();
}

function draw() {
	background(51);
	
	paddle.pos.x = mouseX + paddle.width / 2;
	paddle.pos.x = constrain(paddle.pos.x, 0, width - paddle.width);
	
	paddle.display();
	ball.checkBounce();
	ball.checkCollide(paddle);
	
	ball.baseSpeed = 5 + ball.bounces / 2;
	
	ball.update();
	ball.display();
	
}