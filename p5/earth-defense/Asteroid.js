function Asteroid(angle, dist) {
	
	ASTEROID_RADIUS = 20;
	
	this.sprite = createSprite(dist * cos(angle), dist * sin(angle), ASTEROID_RADIUS, ASTEROID_RADIUS);
	this.sprite.setCollider("circle", 0, 0, ASTEROID_RADIUS);
	
	this.sprite.draw = function() {
		// Custom sprite draw function
		fill("red");
		ellipse(0, 0, ASTEROID_RADIUS, ASTEROID_RADIUS);
	}
	
	this.sprite.setSpeed(3, angle + 180);
	
}