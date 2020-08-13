var canvas;

var barnsleyFern;
var affTran0, affTran1, affTran2, affTran3;

var barnsleyFernGen1, barnsleyFernGen2, barnsleyFernGen3;
var point1, point2, point3;

var rotate90;

var scaleMag = 50;

var openSansFont;

var dotsPerFrame = 100;

function setup() {
  canvas = createCanvas(windowWidth * 0.55, 600);
  canvas.parent("sketch1-div");

  affTran0 = new AffineTransformation(0, 0, 0, 0.16, 0, 0);
  affTran1 = new AffineTransformation(0.85, 0.04, -0.04, 0.85, 0, 1.6);
  affTran2 = new AffineTransformation(0.2, -0.26, 0.23, 0.22, 0, 1.6);
  affTran3 = new AffineTransformation(-0.15, 0.28, 0.26, 0.24, 0, 0.44);

  barnsleyFern = new IteratedFunctionSystem([affTran0, affTran1, affTran2, affTran3]);

  let probNumers = [ 1, 3,  1,  1];
  let probDenoms = [20, 4, 10, 10];

  randomGen = getRandomGenerator(probNumers, probDenoms);

  let base = lcm(probDenoms);

  champernowneGen = getChampernowne(base);
  biasedChampernowneGen = getBiased(champernowneGen, probNumers, probDenoms);

  copelandErdosGen = getCopelandErdos(base);
  biasedCopelandErdosGen = getBiased(copelandErdosGen, probNumers, probDenoms);

  besicovitchGen = getBesicovitch(base);
  biasedBesicovitchGen = getBiased(besicovitchGen, probNumers, probDenoms);

  barnsleyFernGen1 = barnsleyFern.iterationAlg(randomGen, new Coordinate(0, 0));
  barnsleyFernGen2 = barnsleyFern.iterationAlg(biasedChampernowneGen, new Coordinate(0, 0));
  barnsleyFernGen3 = barnsleyFern.iterationAlg(biasedCopelandErdosGen, new Coordinate(0, 0));
  barnsleyFernGen4 = barnsleyFern.iterationAlg(biasedBesicovitchGen, new Coordinate(0, 0));

  rotate90 = new AffineTransformation(0, 1, -1, 0, 0, 0);

  noStroke();
  fill(0, 0, 0);

  // background(255, 255, 255);

  textSize(18);
  textFont("Open Sans", 18);

  text("Pseudo-Random Sequence", 10, 20);
  text("Biased Champernowne's Sequence", 510, 20);
  text("Biased Copeland-Erdos Sequence", 10, 320);
  text("Biased Besicovitch's Sequence", 510, 320);

  textAlign(RIGHT);
}

function draw() {
  stroke(0, 100, 0);

  for (let i = 0; i < dotsPerFrame; i++) {
    point1 = barnsleyFernGen1.next().value;
    point1 = rotate90.transform(point1);
    point(point1.x * scaleMag, point1.y * scaleMag + 150);

    point2 = barnsleyFernGen2.next().value;
    point2 = rotate90.transform(point2);
    point(point2.x * scaleMag + 500, point2.y * scaleMag + 150);

    point3 = barnsleyFernGen3.next().value;
    point3 = rotate90.transform(point3);
    point(point3.x * scaleMag, point3.y * scaleMag + 450);

    point4 = barnsleyFernGen4.next().value;
    point4 = rotate90.transform(point4);
    point(point4.x * scaleMag + 500, point4.y * scaleMag + 450);
  }

  noStroke();

  fill(0, 0, 0);
  rect(0, height - 20, width, height - 20);

  fill(171, 197, 219);
  text((frameCount * dotsPerFrame) + " dots", width - 4, height - 4);
}

class IteratedFunctionSystem {
  constructor(transformations) {
    this.transformations = transformations;
    this.size = transformations.length;
  }

  *iterationAlg(sequence, startingCoord) {
    let pt = new Coordinate(startingCoord.x, startingCoord.y);
    yield pt;

    let transformationIndex;
    let transformation;
    while (true) {
      transformationIndex = parseInt(sequence.next().value, this.size);
      transformation = this.transformations[transformationIndex];
      pt = transformation.transform(pt);

      yield pt;
    }
  }
}

class AffineTransformation {
  constructor(a, b, c, d, e, f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  transform(coord) {
    return new Coordinate(this.a * coord.x + this.b * coord.y + this.e, this.c * coord.x + this.d * coord.y + this.f);
  }
}

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function* concatGenerator(generator) {
  let s;
  while (true) {
    s = generator.next().value;
    for (let digit of s) {
      yield digit;
    }
  }
}

function getRandomGenerator(probNums, probDenoms) {
  let base = probNums.length;

  function* randomGenerator() {
    let num = 0;

    while (true) {
      let rand = random();
      let total = 0;
      let prob;

      for (let i = 0; i < probNums.length; i++) {
        prob = probNums[i] / probDenoms[i];
        total += prob;
        if (rand < total) {
          num = i;
          break;
        }
      }

      yield num.toString(base);
    }
  }

  return concatGenerator(randomGenerator());
}

function getChampernowne(base) {
  function* incrementGenerator() {
    let n = 0;
    while (true) {
      yield n.toString(base);
      n++;
    }
  }

  return concatGenerator(incrementGenerator());
}

function getBesicovitch(base) {
  function* squareGenerator() {
    let n = 0;
    while (true) {
      yield (n * n).toString(base);
      n++;
    }
  }

  return concatGenerator(squareGenerator());
}

function getCopelandErdos(base) {
  function* primeGenerator() {
    yield (2).toString(base);

    let dict = {};
    let q = 3;

    let p, x;

    while (true) {
      // p = dict.pop(q, 0);
      if (q in dict && dict[q] != 0) {
        p = dict[q];
        x = q + p;
        while (x in dict) {
          x += p;
        }
        dict[x] = p;
      } else {
        yield q.toString(base);
        dict[q * q] = 2 * q;
      }
      q += 2;
    }
  }

  return concatGenerator(primeGenerator());
}

function getBiased(sequence, biasNumerators, biasDenominators) {
  let n = biasDenominators.length;
  let d = lcm(biasDenominators);
  let g = "";

  for (let i = 0; i < n; i++) {
    let count = biasNumerators[i] * (d / biasDenominators[i]);
    let digit = i.toString(n);
    for (let j = 0; j < count; j++) {
      g += digit;
    }
  }

  function* biasedGenerator() {
    let nextSequenceValue;
    let nextIndex;
    while (true) {
      nextSequenceValue = sequence.next().value;
      nextIndex = parseInt(nextSequenceValue, d);
      yield g[nextIndex];
    }
  }

  return biasedGenerator();
}

function lcm(numbers) {
  let largest = max(numbers);
  let m = max(numbers);

  let found = false;

  while (!found) {
    found = true;
    for (let n of numbers) {
      found &= (m % n == 0);
    }

    if (found) {
      return m;
    } else {
      m += largest;
    }
  }
}
