function Icon(x, y, rad) {
	this.x = x;
	this.y = y;
	this.rad = rad;
	
	this.color = color(random(255));
	
	this.draw = function() {
		fill(this.color);
		ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
	}
	
	this.distanceTo = function(point) {
		return Math.sqrt((point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y));
	}
}