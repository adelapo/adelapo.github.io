function Laser(shipPosVector, shipVelVector, shipHeading) {
	this.pos = createVector(shipPosVector.x, shipPosVector.y);
	this.vel = p5.Vector.fromAngle(shipHeading);
	this.vel.mult(7);
	this.vel.add(shipVelVector);
	
	this.life = 100;
	
	this.update = function() {
		if (this.pos.x > width) {
			this.pos.x = -this.size;
		} else if (this.pos.x < 0) {
			this.pos.x = width;
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
		} else if (this.pos.y < 0) {
			this.pos.y = height;
		}
		
		this.pos.add(this.vel);
		this.life -= 1;
	}
	
	this.display = function() {
		push();
		stroke(255, 0, 0);
		strokeWeight(4);
		point(this.pos.x, this.pos.y);
		pop();
	}
	
	this.hits = function(asteroid) {
		var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		return d < asteroid.size;
	}
	
	this.isDead = function() {
		return this.life <= 0;
	}
}