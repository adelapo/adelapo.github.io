var ship;
var playerLasers;
var enemyLasers;
var enemies;
var score = 0;
var multiplier = 1;

var lives = 3;

var PLAYER_SPEED = 10;

var SHIP_HEIGHT = 550;

var playerImage;
var enemyImage;

var enemyMoveCounter = 15;
var enemySpeed = 10;

var enemyMoveLoop;
var respawnDelay;
var dead = false;

function preload() {
	playerImage = loadImage("assets/ship.png");
	enemyImage = loadImage("assets/alien.png");
}

function setup() {
	createCanvas(800, 600);
	
	player = createSprite(width / 2, SHIP_HEIGHT, playerImage.width, playerImage.height);
	player.addImage(playerImage);
	
	fill("white");
	stroke("white");
	textFont("monospace");
	textAlign(CENTER, CENTER);
	textSize(24);
	
	playerLasers = new Group();
	enemyLasers = new Group();
	
	enemies = new Group();
	
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 11; j++) {
			enemy = createSprite(j * 60 + 100, i * 35 + 100, enemyImage.width, enemyImage.height);
			enemy.addImage(enemyImage);
			enemies.add(enemy);
		}
	}
	
	enemyMoveLoop = setInterval(moveEnemies, 1000);
}

function moveEnemies() {
	
	dx = 0;
	dy = 0;
	
	if (enemyMoveCounter % 10 == 0) {
		dy = 10;
	} else if (enemyMoveCounter > 10) {
		dx = enemySpeed;
	} else {
		dx = -enemySpeed;
	}
	
	for (var enemy of enemies) {
		enemy.position.x += dx;
		enemy.position.y += dy;
		if (random() < 0.01) {
			enemyLaser = createSprite(enemy.position.x, enemy.position.y, 5, 5);
			enemyLaser.shapeColor = "red";
			enemyLaser.velocity.y = 5;
			enemyLasers.add(enemyLaser);
		}
	}
	
	enemyMoveCounter = (enemyMoveCounter + 1) % 20;
}

function draw() {
	background(0);
	
	if (keyIsDown(LEFT_ARROW)) {
		player.velocity.x = -PLAYER_SPEED;		
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.velocity.x = PLAYER_SPEED;
	} else {
		player.velocity.x = 0;
	}
	
	player.position.x = constrain(player.position.x, player.width / 2, width - player.width / 2);
	
	for (var laser of playerLasers) {
		if (laser.position.x < 0) {
			laser.remove();
		}
	}
	
	for (var laser of enemyLasers) {
		if (laser.position.x > height) {
			laser.remove();
			multiplier = 1;
		}
	}
	
	playerLasers.collide(enemies, killAlien);
	enemyLasers.collide(player, playerHitByLaser);
	
	for (var i = 0; i < lives; i++) {
		image(playerImage, i * 30 + 10, 10, playerImage.width / 2, playerImage.height / 2);
	}
	
	
	text("Score: " + getScoreString(6), width - 200, 30);
	
	drawSprites();	
}

function keyPressed() {
	if (keyCode == 32 && !dead) {
		laser = createSprite(player.position.x, player.position.y, 5, 5);
		laser.shapeColor = "white";
		laser.velocity.y = -5;
		playerLasers.add(laser);
	}
}

function playerHitByLaser(laser, player) {
	dead = true;
	player.remove();
	laser.remove();
	clearInterval(enemyMoveLoop);
	if (lives >= 1) {
		respawnDelay = setTimeout(respawnPlayer, 2000);
	}
}

function respawnPlayer() {
	dead = false;
	lives = lives - 1;
	player = createSprite(width / 2, SHIP_HEIGHT, 60, 60);
	player.addImage(playerImage);
	enemyMoveLoop = setInterval(moveEnemies, 1000);
}

function killAlien(laser, alien) {
	alien.remove();
	laser.remove();
	text(100 * multiplier, alien.position.x, alien.position.y);
	score += 100 * multiplier;
	multiplier += 1;
}

function getScoreString(length) {
	score_str = "" + score;
	while (score_str.length < 6) {
		score_str = "0" + score_str;
	}
	return score_str;
}