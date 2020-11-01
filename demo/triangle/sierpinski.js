function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent("demo-div");

  affTran0 = new AffineTransformation(0.5, 0, 0, 0.5, 0, 0);
  affTran1 = new AffineTransformation(0.5, 0, 0, 0.5, 0, 400);
  affTran2 = new AffineTransformation(0.5, 0, 0, 0.5, 400, 0);

  sierpinskiTriangle = new IteratedFunctionSystem([affTran0, affTran1, affTran2]);

  let probNumers = [1, 1, 1];
  let probDenoms = [3, 3, 3];

  randomGen = getRandomGenerator(probNumers, probDenoms);

  gen1 = sierpinskiTriangle.iterationAlg(randomGen, new Coordinate(0, 0));

  background(0, 0, 0);

  fill("white");
  stroke("white");
}

function draw() {
  pt = gen1.next().value;
  // point(pt.x, pt.y);
  ellipse(pt.x, pt.y, 5, 5);
}
