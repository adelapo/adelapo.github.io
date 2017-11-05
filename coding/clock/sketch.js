function setup() {
	createCanvas(400, 400);
	angleMode(DEGREES);
}

function draw() {
	// Start by clearing the screen
	clear();
	
	// (200, 200) --> (0, 0)
	translate(200, 200);
	
	// Draw the circle.	
	noStroke();
	fill(0, 50, 98);
	strokeWeight(8);
	ellipse(0, 0, 400, 400);
	
	// Get the current time
	var hr = hour() % 12;
	var mn = minute();
	var sc = second();
	var mil = millis();
	
	// Set lengths of clock hands	
	var hourHandLen = 110;
	var minHandLen = 150;
	var secHandLen = 180;
	
	// Calculate angle of clock hands at current time	
	var hourAngle = map(hr, 0, 12, -90, 270);
	var minAngle = map(mn, 0, 60, -90, 270);
	var secAngle = map(sc, 0, 60, -90, 270);
	
	// Calculate X coordinate of clock hands at current time	
	var hourHandX = hourHandLen * cos(hourAngle);	
	var minHandX = minHandLen * cos(minAngle);
	var secHandX = secHandLen * cos(secAngle);
	
	// Calculate Y coordinate of clock hands at current time
	var hourHandY = hourHandLen * sin(hourAngle);
	var minHandY = minHandLen * sin(minAngle);
	var secHandY = secHandLen * sin(secAngle);
	
	// Draw hour hand	
	stroke(255);
	line(0, 0, hourHandX, hourHandY);
	
	// Draw minute hand
	stroke(255);
	line(0, 0, minHandX, minHandY);
	
	// Draw second hand	
	stroke(235, 185, 23);
	line(0, 0, secHandX, secHandY);
	
	// Draw a dot in the center
	stroke(0);	
	point(0, 0);
	
	
}