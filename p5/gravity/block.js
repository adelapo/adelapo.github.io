function Block(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	
	this.size = 30;
	
	this.display = function() {
		push();
		fill(0, 255, 255);
		ellipse(this.pos.x, this.pos.y, this.size);
		pop();
	}
	
	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.vel.mult(0.95);
		if (this.pos.x - this.size / 2 < 0) {
			this.pos.x = this.size / 2;
			this.vel.x = 0;
			this.acc = createVector(0, 0);
		} else if (this.pos.x + this.size / 2 > width) {
			this.pos.x = width - this.size / 2;
			this.vel.x = 0;
			this.acc = createVector(0, 0);
		} else if (this.pos.y - this.size / 2 < 0) {
			this.pos.y = this.size / 2;
			this.vel.y = 0;
			this.acc = createVector(0, 0);
		} else if (this.pos.y + this.size / 2 > height) {
			this.pos.y = height - this.size / 2;
			this.vel.y = 0;
			this.acc = createVector(0, 0);
		}
	}
}