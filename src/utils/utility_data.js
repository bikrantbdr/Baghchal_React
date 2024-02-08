const directions = [
  { row: -1, col: 0 }, // Up
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
  { row: 0, col: 1 }, // Right
];
const directionsWithDiagonal = [
  { row: -1, col: 0 }, // Up
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
  { row: 0, col: 1 }, // Right
  { row: -1, col: -1 }, //top left
  { row: -1, col: 1 }, //top right
  { row: 1, col: -1 }, //bottom left
  { row: 1, col: 1 }, //bottom right
];

const defaultBoard = {
  board: [
    [0, null, null, null, 0],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [0, null, null, null, 0],
  ],

  tigers: {
    trapped: [], //no of trapped tigers
    position: [
      [0, 0],
      [0, 4],
      [4, 0],
      [4, 4],
    ],
  },

  goats: {
    onHand: 20, //initially 20 Goats are in hand to place
    killed: 0, //initially 0 goats are killed
    spaceCaptured: [],
  },

  playerTurn: "goat", //initially its goat turn

  //Position of peice selected (find next valid move for this piece)
  //-1 means no selection needed (placing the goats on baord still left)
  selectedPosition: [],
  nextValidMoves: [], //valid move for selected peice
};

export { directions, directionsWithDiagonal, defaultBoard };
