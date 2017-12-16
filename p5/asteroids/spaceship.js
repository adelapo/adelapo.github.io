function SpaceShip() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	
	this.heading = 0;
	this.size = 15;
	
	this.display = function() {
		push();
		noFill();
		stroke(0, 255, 255);

		translate(this.pos.x, this.pos.y);
		rotate(this.heading);
		
		quad(this.size, 0, -this.size, this.size, -this.size / 2, 0, -this.size, -this.size);
		pop();
	}
	
	this.update = function() {
		
		if (this.pos.x > width + this.size) {
			this.pos.x = -this.size;
		} else if (this.pos.x < -this.size) {
			this.pos.x = width + this.size;
		}
		
		if (this.pos.y > height + this.size) {
			this.pos.y = -this.size;
		} else if (this.pos.y < -this.size) {
			this.pos.y = height + this.size;
		}
		
		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
		
		this.vel.mult(0.97);
	}
	
	this.turn = function(angle) {
		this.heading += angle;
	}
	
	this.boost = function() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.5);
		this.acc.set(force);
	}
}