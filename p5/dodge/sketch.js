var player;
var obstacles;

function setup() {
	createCanvas(800, 600);
	player = createSprite(200, 300, 50, 50);
	player.shapeColor = color(66, 134, 244);
	
	obstacles = new Group();
}

function draw() {
	background(51);
	
	if (keyIsDown(UP_ARROW)) {
		player.position.y -= 10;
	}
	if (keyIsDown(DOWN_ARROW)) {
		player.position.y += 10;
	}
	
	if (random() <= 0.03) {
		block = createSprite(900, random(0, height));
		block.shapeColor = "red";
		block.setVelocity(-10, 0);
		obstacles.add(block);
	}
	
	for (var block of obstacles) {
		if (block.position.x < -20) {
			block.remove();
		}
	}
	
	player.collide(obstacles);
	
	if (player.position.x >= 0) {
		drawSprites();
	} else {
		textSize(32);
		textAlign(CENTER, CENTER);
		text("GAME OVER", width/2, height/2);
	}
}