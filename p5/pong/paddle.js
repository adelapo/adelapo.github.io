function Paddle(x, y) {
	this.height = 150;
	this.width = 20;
	
	this.pos = createVector(x, y);
	
	this.display = function() {
		rect(this.pos.x - (this.width / 2), this.pos.y - (this.height / 2), this.width, this.height);
	}
}