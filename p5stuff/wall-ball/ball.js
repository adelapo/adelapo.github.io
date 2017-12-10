function Ball() {
	this.size = 20;
	
	this.pos = createVector(width/2 - this.size/2, height/2 - this.size/2);
	this.vel = createVector(0, 3);
	this.baseSpeed = 5;
	
	this.bounces = 0;
	
	this.display = function() {
		rect(this.pos.x, this.pos.y, this.size, this.size);
	}
	
	this.update = function() {
		this.pos.add(this.vel);
	}
	
	this.checkBounce = function() {
		if (this.pos.y < 0) {
			this.vel.y = -this.vel.y;
			this.bounces += 1;
		}
		if (this.pos.x < 0 || this.pos.x + this.size > width) {
			this.vel.x = -this.vel.x;
		}
	}
	
	this.checkCollide = function(paddle) {
		if (this.pos.x + this.size > paddle.pos.x && this.pos.x < paddle.pos.x + paddle.width && this.pos.y + this.size > paddle.pos.y) {
			var dist = (this.pos.x + this.size/2) - (paddle.pos.x + paddle.width/2);
			console.log(dist);
			var newAngle = map(dist, 0, paddle.width, radians(90), 0);
			this.vel = p5.Vector.fromAngle(newAngle);
			this.vel.mult(this.baseSpeed);
			this.vel.y = -this.vel.y;
			// this.pos.y = paddle.pos.y - paddle.height - this.size;			
		}
	}
}