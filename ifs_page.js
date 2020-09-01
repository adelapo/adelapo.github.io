var canvas;
var test;

var ifsCodeTable;
var numTransformationsEntry;
var useBiasCheckbox;
var csvFileInput;
var numItersEntry;
var numIters;

var drawingIfs;

var selectedGenerator;
var ifsGenerator;

var ifsImage;

var imageReady;

var xPan;
var yPan;

var imageWidth;
var imageHeight;

var zoomScale;

var initialMouseX;
var initialMouseY;

var points;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent("sketch-div");

  ifsCodeTable = document.getElementById("ifs-code-table");
  numTransformationsEntry = document.getElementById("num-transformations");

  numTransformationsEntry.setAttribute("value", 4);
  numTransformationsSelected();

  numItersEntry = document.getElementById("num-iterations");

  useBiasCheckbox = document.getElementById("use-bias");

  csvFileInput = document.getElementById("input-csv-file");
  csvFileInput.addEventListener("change", function() {
    let reader = new FileReader();

    reader.onload = function() {
      loadIfsFromCsvText(reader.result);
    }

    reader.readAsText(this.files[0]);
  });

  stroke(0, 0, 255);

  imageMode(CENTER);

  drawingIfs = false;

  imageReady = false;

  xPan = width/2;
  yPan = height/2;

  zoomScale = 1;
}

function draw() {
  if (!imageReady) {
    return;
  }

  background(0, 0, 0);
  image(ifsImage, xPan, yPan);
}

function mousePressed() {
  initialMouseX = mouseX;
  initialMouseY = mouseY;
}

function mouseDragged(event) {
  xPan += mouseX - initialMouseX;
  yPan += mouseY - initialMouseY;

  initialMouseX = mouseX;
  initialMouseY = mouseY;
}

function keyPressed(event) {
  if (keyCode == UP_ARROW) {
    zoomImage(1.5);
  } else if (keyCode == DOWN_ARROW) {
    zoomImage(2 / 3);
  }
}

function numTransformationsSelected() {
  let numTransformations = numTransformationsEntry.value;

  if (numTransformations > 36) {
    alert("At most 36 transformations are supported.");
    numTransformationsEntry.value = 36;
    return;
  }
  if (numTransformations < 2) {
    alert("Number of transformations must be at least 2, got " + numTransformations);
    numTransformationsEntry.value = 2;
    return;
  }

  let oldNumRows = ifsCodeTable.rows.length;

  for (let i = 1; i < oldNumRows; i++) {
    ifsCodeTable.deleteRow(-1);
  }

  let row, cell, entry;
  for (let i = 0; i < numTransformations; i++) {
    row = ifsCodeTable.insertRow(-1);

    cell = row.insertCell(-1);

    entry = document.createElement("input");
    entry.setAttribute("size", 5);
    entry.setAttribute("value", i);
    entry.setAttribute("disabled", true);

    cell.appendChild(entry);

    for (let j = 1; j < 9; j++) {
      cell = row.insertCell(-1);

      entry = document.createElement("input");
      entry.setAttribute("size", 5);

      if (j == 7) {
        cell.setAttribute("class", "probNumTd");
      }

      cell.appendChild(entry);
    }
  }
}

function loadIfsFromCsvText(text) {
  let lines = text.split("\n").filter(s => s.length > 0);
  let size = lines.length;

  let values;
  let row;

  numTransformationsEntry.value = size;

  numTransformationsSelected();

  for (let i = 0; i < size; i++) {
    values = lines[i].split(",");
    row = ifsCodeTable.rows[i + 1];

    for (let j = 0; j < 8; j++) {
      if (j < 6) {
        row.cells[j + 1].children[0].value = float(values[j]);
      } else {
        row.cells[j + 1].children[0].value = int(values[j]);
      }
    }
  }
}

function downloadString(text, fileType, fileName) {
  // taken from https://gist.github.com/danallison/3ec9d5314788b337b682
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

function exportIfsCode() {
  let text = "";
  let numRows = ifsCodeTable.rows.length;

  let tableRow;
  let rowCells;
  let cell;
  let value;
  let row;

  for (let i = 1; i < numRows; i++) {
    tableRow = ifsCodeTable.rows[i];
    rowCells = tableRow.cells;
    row = [];
    for (let j = 1; j < 9; j++) {
      cell = rowCells[j];
      if (j < 6) {
        value = float(cell.firstChild.value);
      } else {
        value = int(cell.firstChild.value);
      }
      row.push(value);
    }
    text += row.join(",") + "\n";
  }

  downloadString(text, "text/csv", "ifs_code.csv");
}

function exampleCodeSelected(exampleString) {
  let url = "https://raw.githubusercontent.com/adelapo/adelapo.github.io/master/example_ifs_codes/";
  url += exampleString.replace(" ", "\%20").trim();
  url += ".csv";

  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      let csvText = request.responseText;
      loadIfsFromCsvText(csvText);
    }
  }
  request.send(null);
}


function getIfs() {
  let rows = ifsCodeTable.rows;

  let a, b, c, d, e, f, r, s;
  let transformations = [];
  let probNumers = [];
  let probDenoms = [];
  let row;
  let cells;

  for (let i = 1; i < rows.length; i++) {
    row = rows[i];
    cells = row.cells;

    a = float(cells[1].firstChild.value);
    b = float(cells[2].firstChild.value);
    c = float(cells[3].firstChild.value);
    d = float(cells[4].firstChild.value);
    e = float(cells[5].firstChild.value);
    f = float(cells[6].firstChild.value);
    r = int(cells[7].firstChild.value);
    s = int(cells[8].firstChild.value);

    transformations.push(new AffineTransformation(a, b, c, d, e, f));

    probNumers.push(r);
    probDenoms.push(s);
  }

  return [new IteratedFunctionSystem(transformations), probNumers, probDenoms];
}

function runButtonClicked() {
  let selection = document.getElementById("selected-sequence").value;

  let userInput = getIfs();
  let ifs = userInput[0];
  let probNumers = userInput[1];
  let probDenoms = userInput[2];

  if (selection == "random") {
    let probs = [];
    if (!useBiasCheckbox.checked) {
      probNumers = [];
      probDenoms = [];
      for (let i = 0; i < ifs.size; i++) {
        probNumers.push(1);
        probDenoms.push(ifs.size);
      }
    }
    selectedGenerator = getRandomGenerator(probNumers, probDenoms);
  } else {
    let base;

    if (useBiasCheckbox.checked) {
      base = lcm(probDenoms);
    } else {
      base = ifs.size;
    }

    if (base > 36) {
      alert("The lowest common multiple of the probability denominators must be at most 36, but got " + base + ".");
      return;
    }

    if (selection == "champernowne") {
      selectedGenerator = getChampernowne(base);
    } else if (selection == "copeland-erdos") {
      selectedGenerator = getCopelandErdos(base);
    } else if (selection == "besicovitch") {
      selectedGenerator = getBesicovitch(base);
    }

    if (useBiasCheckbox.checked) {
      selectedGenerator = getBiased(selectedGenerator, probNumers, probDenoms);
    }
  }

  ifsGenerator = ifs.iterationAlg(selectedGenerator, new Coordinate(0, 0));
  numIters = int(numItersEntry.value);

  let pt;
  points = [];

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < numIters; i++) {
    pt = ifsGenerator.next().value

    points.push(new Coordinate(pt.x, pt.y));
  }

  updateImage();
  zoomToFit();
  zoomToFit();

  imageReady = true;
}

function updateImage() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let pt of points) {
    minX = min(pt.x, minX);
    minY = min(pt.y, minY);

    maxX = max(pt.x, maxX);
    maxY = max(pt.y, maxY);
  }

  let index;
  let x, y;

  imageWidth = int(maxX) - int(minX) + 1;
  imageHeight = int(maxY) - int(minY) + 1;

  ifsImage = createImage(imageWidth, imageHeight);
  ifsImage.loadPixels();

  for (pt of points) {
    x = int(pt.x);
    y = int(pt.y);

    index = ((int(maxY) - y) * imageWidth + (x - int(minX))) * 4;

    ifsImage.pixels[index] = 0;  // R
    ifsImage.pixels[index + 1] = 255;  // G
    ifsImage.pixels[index + 2] = 0;  // B
    ifsImage.pixels[index + 3] = 255;  // A
  }

  ifsImage.updatePixels();
}

function zoomImage(amount) {
  zoomScale *= amount;

  for (let pt of points) {
    pt.x *= amount;
    pt.y *= amount;
  }

  updateImage();
}

function zoomToFit() {
  let maxDim = max(imageWidth, imageHeight);
  zoomImage(0.95 * (width / maxDim));
}

function recenterImage() {
  xPan = width / 2;
  yPan = height / 2;
}

function saveImage() {
  ifsImage.save();
}
