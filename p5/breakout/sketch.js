var ball;
var paddle;
var bricks;

var wallTop;
var wallBottom;
var wallLeft;
var wallRight;

var numBricksWide = 16;
var numBricksHigh = 6;

var BRICK_WIDTH = 50;
var BRICK_HEIGHT = 30;

var BALL_SIZE = 15;
var BALL_DEFAULT_Y = 400;
var BALL_DEFAULT_SPEED = 10;

var PADDLE_WIDTH = 130;
var PADDLE_HEIGHT = 20;

var ballInPlay = false;
var PADDLE_Y = 500;

var WALL_THICKNESS = 30;

var beepFreq = 196;

var ballTrail = [];
var maxTrailLength = 15;

function setup() {
	createCanvas(800, 600);
	
	bricks = new Group();
	
	var colors = ["red", color(255, 123, 0), "orange", "yellow", color(9, 226, 2), color(59, 56, 255)];
	
	for (var i = 0; i < numBricksHigh; i++) {
		for (var j = 0; j < numBricksWide; j++) {
			var brick = createSprite(j * BRICK_WIDTH + BRICK_WIDTH / 2, i * BRICK_HEIGHT + BRICK_HEIGHT / 2 + 80, BRICK_WIDTH, BRICK_HEIGHT);
			brick.shapeColor = colors[i];
			brick.immovable = true;
			bricks.add(brick);
		}
	}
	
	wallTop = createSprite(width/2, -WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
	wallTop.immovable = true;

	wallBottom = createSprite(width/2, height+WALL_THICKNESS/2, width+WALL_THICKNESS*2, WALL_THICKNESS);
	wallBottom.immovable = true;

	wallLeft = createSprite(-WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
	wallLeft.immovable = true;

	wallRight = createSprite(width+WALL_THICKNESS/2, height/2, WALL_THICKNESS, height);
	wallRight.immovable = true;
	
	ball = createSprite(mouseX, BALL_DEFAULT_Y, BALL_SIZE, BALL_SIZE);
	ball.shapeColor = "red";
	
	paddle = createSprite(mouseX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
	paddle.shapeColor = "red";
	paddle.immovable = true;
	
	noStroke();
	
	noCursor();
}

function draw() {
	background("black");
	
	paddle.position.x = constrain(mouseX, PADDLE_WIDTH / 2, width - PADDLE_WIDTH / 2);
	if (!ballInPlay) {
		ball.position.x = paddle.position.x;
	}
	
	ball.bounce(wallTop, ballHitWall);
	ball.bounce(wallLeft, ballHitWall);
	ball.bounce(wallRight, ballHitWall);
	ball.bounce(wallBottom, ballHitWall);
	
	ball.bounce(paddle, ballHitPaddle);
	ball.bounce(bricks, ballHitBrick);
	
	ballTrail.unshift([ball.position.x - BALL_SIZE / 2, ball.position.y - BALL_SIZE / 2]);
	if (ballTrail.length > maxTrailLength) {
		ballTrail.pop();
	}
	for (var i = 0; i < ballTrail.length; i++) {
		alpha = map(i, 0, ballTrail.length - 1, 255, 0);
		tempColor = color(255, 0, 0, alpha);
		fill(tempColor);
		rect(ballTrail[i][0], ballTrail[i][1], BALL_SIZE, BALL_SIZE);
	}
	
	drawSprites();
}

function beep(frequency, length) {
	tempOsc = new p5.Oscillator(frequency);
	tempOsc.setType("square");
	tempOsc.start();
	tempOsc.stop(length);
}

function mouseClicked() {
	if (!ballInPlay) {
		ball.velocity.y = BALL_DEFAULT_SPEED;
		ballInPlay = true;
	}
}

function ballHitBrick(ball, brick) {
	beep(beepFreq, 0.05);
	brick.remove();
}

function ballHitPaddle(ball, paddle) {
	angle = map(ball.position.x - paddle.position.x, -PADDLE_WIDTH / 2, PADDLE_WIDTH / 2, 270 - 45, 270 + 45);
	ball.setSpeed(BALL_DEFAULT_SPEED, angle);
	beep(beepFreq * 8, 0.05);
}

function ballHitWall(ball, wall) {
	if (wall == wallBottom) {
		ball.setSpeed(0, 0);
		ball.position.x = paddle.position.x;
		ball.position.y = BALL_DEFAULT_Y;
		ballInPlay = false;
		beep(beepFreq, 0.5);
	} else {
		beep(beepFreq * 4, 0.05);
	}
}