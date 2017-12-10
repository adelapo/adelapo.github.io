function Ball() {
	this.size = 20;
	this.currentSpeed = 5;
	
	this.pos = createVector(width / 2, height / 2);
	this.vel = p5.Vector.random2D();
	this.vel.mult(this.currentSpeed);
	
	this.update = function() {
		this.checkBounce();
		this.pos.add(this.vel);
	}
	
	this.display = function() {
		rect(this.pos.x, this.pos.y, this.size, this.size);
	}
	
	this.checkBounce = function() {
		if (this.pos.y < 0 || this.pos.y + this.size > height) {
			this.vel.y = -this.vel.y;
		}
	}
	
	this.checkCollidePlayer = function(paddle) {
		// Assumes player is on the left.
		
		if (this.pos.x < paddle.pos.x + paddle.width / 2 && this.pos.x + this.size > paddle.pos.x + paddle.width / 2) {
			if (this.pos.y + this.size > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
				var dist = this.pos.y - paddle.pos.y + paddle.height / 2;
				var newAngle = map(dist, 0, paddle.height, -radians(45), radians(45));
				this.vel = p5.Vector.fromAngle(newAngle);
				this.currentSpeed *= 1.1;
				this.vel.mult(this.currentSpeed);
				this.pos.x = paddle.pos.x + paddle.width / 2;
			}			
		}
	}
	
	this.checkCollideCpu = function(paddle) {
		// Assumes cpu is on the right.
		
		if (this.pos.x + this.size > paddle.pos.x - paddle.width / 2 && this.pos.x < paddle.pos.x - paddle.width / 2) {
			if (this.pos.y + this.size > paddle.pos.y - paddle.height / 2 && this.pos.y < paddle.pos.y + paddle.height / 2) {
				var dist = this.pos.y - paddle.pos.y + paddle.height / 2;
				var newAngle = map(dist, 0, paddle.height, radians(225), radians(135));
				this.vel = p5.Vector.fromAngle(newAngle);
				this.currentSpeed *= 1.1;
				this.vel.mult(this.currentSpeed);				
				this.pos.x = paddle.pos.x - paddle.width - this.size;
			}			
		}
	}
	
	this.behindPlayer = function() {
		return this.pos.x < -this.size;
	}
	
	this.behindCpu = function() {
		return this.pos.x > width;
	}
	
	this.respawn = function(direction) {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(3, 0);
		this.currentSpeed = 5;
		if (direction == "left") {
			this.vel.mult(-1);
		}
	}
}