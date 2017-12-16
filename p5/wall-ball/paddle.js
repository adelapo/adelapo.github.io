function Paddle() {
	this.pos = createVector(width/2, height-100);
	this.width = 120;
	this.height = 20;
	
	this.display = function() {
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}