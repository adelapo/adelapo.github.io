var ship;
var asteroids = [];
var lasers = [];

function setup() {
	createCanvas(1200, 800);
	
	ship = new SpaceShip();
	
	for (var i = 0; i < 10; i++) {
		asteroids.push(new Asteroid());	
	}
}

function draw() {
	background(0);
	
	if (keyIsDown(LEFT_ARROW)) {
		ship.turn(-0.1);
	}
	
	if (keyIsDown(RIGHT_ARROW)) {
		ship.turn(0.1);
	}
	
	if (keyIsDown(UP_ARROW)) {
		ship.boost();
	}
	
	ship.update();
	ship.display();
	
	for (var asteroid of asteroids) {
		asteroid.display();
		asteroid.update();
	}
	
	for (var laser of lasers) {		
		if (laser.isDead()) {
			lasers.splice(lasers.indexOf(laser), 1);
		} else {
			laser.display();
			laser.update();
			for (var asteroid of asteroids) {
				if (laser.hits(asteroid)) {
					console.log(asteroid.size);
					if (asteroid.size >= 15) {
						asteroids.push(asteroid.getChildAsteroid());
						asteroids.push(asteroid.getChildAsteroid());
						lasers.splice(lasers.indexOf(laser), 1);
					}
					asteroids.splice(asteroids.indexOf(asteroid), 1);
				}
			}
		}		
	}
}

function keyPressed() {
	if (key == " ") {
		lasers.push(new Laser(ship.pos, ship.vel, ship.heading));
	}
}