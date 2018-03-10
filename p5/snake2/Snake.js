function Snake(c, startBody, startDirection) {
	this.color = c;
	this.body = startBody;
	this.direction = startDirection;
	this.growth = 0;
	
	this.move = function() {
		var dx = 0;
		var dy = 0;
		
		if (this.direction == "left") {
			dx = -1;
		} else if (this.direction == "right") {
			dx = 1;
		} else if (this.direction == "up") {
			dy = -1;
		} else if (this.direction == "down") {
			dy = 1;
		}
		
		var newSegment = [0, 0];
		
		newSegment[0] = this.body[0][0] + dx;
		newSegment[1] = this.body[0][1] + dy;
		
		this.body.unshift(newSegment);
		if (this.growth > 0) {
			this.growth -= 1;
		} else {
			this.body.pop();
		}
	}
	
	this.contains = function(thing) {
		for (var segment of this.body) {
			if (segment[0] == thing[0] && segment[1] == thing[1]) {
				return true;
			}
		}
		return false;
	}
	
	this.addSegment = function() {
		this.growth += 1;
	}
	
	this.draw = function(squareSize) {
		for (var segment of this.body) {
			fill(this.color);
			noStroke();
			rect(segment[0] * squareSize, segment[1] * squareSize, squareSize, squareSize);
		}
	}
}