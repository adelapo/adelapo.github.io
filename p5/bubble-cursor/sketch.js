var points;
var target;
var minPoint;
var totalClicks = 0;
var hits = 0;
var accuracy = "0%";

function setup() {
	createCanvas(800, 600);
	
	points = [];
	numPoints = 30;
	for (var i = 0; i < numPoints; i++) {
		points[i] = new Icon(random(40, width - 40), random(40, height - 40), random(10, 40));
		if (i > 0) {
			overlap = false;
			for (var j = 0; j < i; j++) {
				overlap = points[i].distanceTo(points[j]) <= points[i].rad + points[j].rad || overlap;
			}
			while (overlap) {
				overlap = false;
				points[i] = new Icon(random(40, width - 40), random(40, height - 40), random(10, 40));
				for (var j = 0; j < i; j++) {
					overlap = points[i].distanceTo(points[j]) <= points[i].rad + points[j].rad || overlap;
				}
			}
		}
	}
	
	target = random(points);
}

function draw() {
	background(255);
	
	minPoint = points[0];
	minDist = Math.sqrt((mouseX - minPoint.x) * (mouseX - minPoint.x) + (mouseY - minPoint.y) * (mouseY - minPoint.y));
	
	for (var point of points) {
		cursorDist = Math.sqrt((mouseX - point.x) * (mouseX - point.x) + (mouseY - point.y) * (mouseY - point.y));
		if (cursorDist < minDist) {
			minPoint = point;
			minDist = cursorDist;
		}
		
		point.draw();
	}
	
	ellipse(mouseX, mouseY, (minDist - minPoint.rad) * 2, (minDist - minPoint.rad) * 2);
	if (minPoint == target) {
		fill("green");
		ellipse(minPoint.x, minPoint.y, minPoint.rad * 2, minPoint.rad * 2);
		
	} else {
		fill("red");
		ellipse(minPoint.x, minPoint.y, minPoint.rad * 2, minPoint.rad * 2);
		fill("blue");
		ellipse(target.x, target.y, target.rad * 2, target.rad * 2);
	}
	
	fill("black");
	text("Hits: " + hits + "\nTotal Clicks: " + totalClicks + "\nAccuracy: " + accuracy, 5, 10);

	
}

function mouseClicked() {
	totalClicks += 1;
	if (minPoint == target) {
		target = random(points);
		hits += 1;
	}
	if (totalClicks == 0) {
		accuracy = "0%"
	} else {
		accuracy = round(100 * hits / totalClicks) + "%";
	}
}