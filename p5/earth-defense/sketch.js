var primaryTank;
var tanks;
var missles;
var missleAmmo;

var rotateSpeed = 5;

var earth;

var EARTH_RADIUS = 75;

var MISSLE_SPEED = 5;

function setup() {
	createCanvas(800, 600);
	angleMode(DEGREES);
	
	earth = createSprite(0, 0, EARTH_RADIUS * 2, EARTH_RADIUS * 2);
	earth.setCollider("circle", 0, 0, EARTH_RADIUS * 2);
	
	earth.draw = function() {
		fill(0, 0, 128);
		ellipse(0, 0, EARTH_RADIUS * 2, EARTH_RADIUS * 2);
	}
	
	tanks = new Group();
	primaryTank = new Tank(EARTH_RADIUS, 0);
	tanks.push(primaryTank);
	
	missleAmmo = 5;
	missles = new Group();
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	fill(106, 162, 252);
	ellipse(0, 0, EARTH_RADIUS * 2, EARTH_RADIUS * 2);
	
	if (keyIsDown(LEFT_ARROW)) {
		for (var tank of tanks) {
			tank.moveCW(-rotateSpeed);
		}
	}
	if (keyIsDown(RIGHT_ARROW)) {
		for (var tank of tanks) {
			tank.moveCW(rotateSpeed);
		}
	}
	
	drawSprites();
}

function keyPressed() {
	if (keyCode === 32) {
		// Fire missle from each tank
		for (var tank of tanks) {			
			if (missleAmmo == 0) {
				break;
			}			
			missle = createSprite(tank.sprite.position.x, tank.sprite.position.y, 5, 5);
			missles.add(missle);
			missle.life = 100;
			missle.shapeColor = "white";
			missle.addSpeed(MISSLE_SPEED, tank.angle);
			missleAmmo -= 1;			
		}
	}
	
	if (keyCode === UP_ARROW) {
		buyNewTank();
	}
	
	if (keyCode === DOWN_ARROW) {
		asteroid = new Asteroid(random(0, 360), width + random(10, 20));
		
	}
}

function buyNewTank() {
	console.log("new tank");
	t = new Tank(EARTH_RADIUS, 0);
	tanks.push(t);
	counter = 0;
	for (var tank of tanks) {
		tankAngle = map(counter, 0, tanks.length, 0, 360) + primaryTank.angle;
		tank.angle = tankAngle;
		tank.sprite.rotation = tankAngle;
		tank.sprite.position.x = tank.getX();
		tank.sprite.position.y = tank.getY();
		counter += 1;
	}
}