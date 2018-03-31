function Tank(radius, angle) {
	this.radius = radius;
	this.angle = angle;

	this.getX = function() {
		return this.radius * cos(this.angle);
	}
	
	this.getY = function() {
		return this.radius * sin(this.angle);
	}
	
	this.sprite = createSprite(this.getX(), this.getY(), 30, 30);
	this.sprite.shapeColor = "grey";
	
	this.moveCW = function(amount) {
		this.angle += amount;
		this.sprite.position.x = this.getX();
		this.sprite.position.y = this.getY();
		this.sprite.rotation = this.angle;
	}
	
}