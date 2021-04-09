var canvas;
var pieceImages;
var boardImage;

var game;

function preload() {
  boardImage = loadImage("scripts/board/board.png");

  pieceImages = {};

  let pieceNames = ["R", "N", "B", "Q", "K", "P"];
  for (let pieceName of pieceNames) {
    pieceImages["w" + pieceName] = loadImage("scripts/board/" + "w" + pieceName + ".png");
    pieceImages["b" + pieceName] = loadImage("scripts/board/" + "b" + pieceName + ".png");
  }
}

function setup() {
  game = new ChessGame(3, 2);

  canvas = createCanvas(1600, 1200);

  imageMode(CENTER);
}

function draw() {
  image(boardImage, width/2, height/2);
}
