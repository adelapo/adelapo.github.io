var canvasDim = 800;

function setup() {
	// noCanvas();
}

function startChaos() {
	createCanvas(canvasDim, canvasDim);
	var user_n = document.getElementById("verts").value;
	var user_factor = parseFloat(document.getElementById("factor").value);
	var user_points = document.getElementById("points").value;
	chaos(user_n, user_factor, user_points);
}

function chaos(n, r, dots) {
	console.log("Running Chaos Game...");
	clear();
	translate(canvasDim / 2, canvasDim / 2);
	
	var vertices = polygon(0, 0, canvasDim / 2 - 10, n);
	for (var i of vertices) {
		ellipse(i[0], i[1], 10, 10);
	}
	
	stroke("white");
	
	var x = randint(0, canvasDim);
	var y = randint(0, canvasDim);
	
	for (var i = 0; i < dots; i++) {
		var vertex = randint(0, n - 1);
		var v_x = vertices[vertex][0];
		var v_y = vertices[vertex][1];
		
		x = varMid(v_x, x, r);
		y = varMid(v_y, y, r);
		
		point(x, y);
	}
	console.log("Done!");
}

function polygon(x, y, radius, npoints) {
	var offset = HALF_PI + (PI / npoints);
	
  	var angle = TWO_PI / npoints;
	var coords = [];
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a + offset) * radius;
		var sy = y + sin(a + offset) * radius;
		coords.push([sx, sy]);
	}
	return coords;
}

function randint(a, b) {
	// Random integer between a and b inclusive
	return floor(random(a, b + 1));
}

function varMid(a, b, factor) {
	return a + (factor * (b - a));
}