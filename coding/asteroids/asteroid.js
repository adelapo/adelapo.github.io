function Asteroid() {
	this.pos = createVector(random(width), random(height));
	this.vel = p5.Vector.random2D();
	this.vel.mult(random(0.5, 1.5));
	this.size = random(30, 60);
	this.vertices = floor(random(5, 15));
	this.offsets = [];
	
	for (var i = 0; i < this.vertices; i++) {
		this.offsets[i] = random(-this.size / 4, this.size / 4);
	}
	
	this.display = function() {
		push();
		stroke(255);
		noFill();
		
		translate(this.pos.x, this.pos.y);
		
		beginShape();		
		for (var i = 0; i < this.vertices; i++) {
			var angle = map(i, 0, this.vertices, 0, TWO_PI);
			var x = (this.size + this.offsets[i]) * cos(angle);
			var y = (this.size + this.offsets[i]) * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		
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
		
		this.pos.add(this.vel);
	}
	
	this.getChildAsteroid = function() {
		var childAsteroid = new Asteroid();
		childAsteroid.pos = this.pos.copy();
		childAsteroid.size = this.size / 2;		
		return childAsteroid;
	}
	
	this.explode = function() {
		var asteroid1 = this.getChildAsteroid();
		var asteroid2 = this.getChildAsteroid();
		return [asteroid1, asteroid2];
	}
}