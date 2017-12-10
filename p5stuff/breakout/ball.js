function Ball() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = p5.Vector.random2D();
	this.vel.mult(5);
	
	this.size = 20;
	
	this.update = function() {
		this.pos.add(this.vel);
	}
	
	this.display = function() {
		push();
		stroke(255, 0, 0);
		fill(255, 0, 0);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
		pop();
	}
	
	this.checkEdges = function() {
		
	}
}