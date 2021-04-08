class ChessGame {
  constructor(startTime, increment) {
    // Time format
    this.startTime = startTime;
    this.increment = increment;

    this.whiteRemainingTime = startTime;
    this.blackRemainingTime = startTime;

    // Initialize the board
    this.board = [];
    let backRank = ["R", "N", "B", "Q", "K", "B", "N", "R"];
    for (let row = 0; row < 8; row++) {
      let newRow = [];
      for (let col = 0; col < 8; col++) {
        if (row == 0) {
          newRow.push("w" + backRank[col]);
        } else if (row == 1) {
          newRow.push("wP");
        } else if (row == 6) {
          newRow.push("bP");
        } else if (row == 7) {
          newRow.push("b" + backRank[col]);
        } else {
          newRow.push("");
        }

        this.board.push(newRow);
      }
    }

    // Start with white's turn
    this.turn = "white";

    // Captures
    this.whiteCaptures = [];
    this.blackCaptures = [];

    // This will log the game's moves
    this.moveLog = [];
  }
}
