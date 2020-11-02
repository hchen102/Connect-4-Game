// Import stylesheets
import './style.css';

// Write Javascript code!
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let topCount = 0


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// function makeBoard() {
//   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
//   const board = Array(HEIGHT).fill(Array(WIDTH))
//   console.log(board)
//   // const board = for (i=0; i<HEIGHT, i++){
//   //   let newrow =  
//   // }
// }

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')
  // adds event handler and creates the top row
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.classList.add('p1-hover');
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // make the content of the actual board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  const htmlBoard = document.querySelector('#board')

  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    console.log(!board[y][x])
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  // piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  document.querySelector('#turnCount').innerHTML ++
}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  console.log(evt.target)
  // get x from ID of clicked cell
  let x = +evt.target.id;


  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  } 

  // check for tie
  // check if all cells in board are filled; if so call, call endGame
  board[0].forEach(function(val){
    if (val !== undefined) {
      topCount += 1;
  }
  })

  if (topCount === WIDTH) {
    return endGame('We have a tie game')
  }
  topCount = 0

  // switch players
  // switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer +=1;
    document.querySelector('#column-top').classList.remove('p1-hover')
    document.querySelector('#column-top').classList.add('p2-hover')
  } else {
    currPlayer +=-1
    document.querySelector('#column-top').classList.remove('p2-hover')
    document.querySelector('#column-top').classList.add('p1-hover')
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) { // for vertical index 0, as long as vertical index is within HEIGHT, iterate
    for (var x = 0; x < WIDTH; x++) { // for horizontal index 0, as long as horizontal index is within WIDTH, iterate
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // creating the array of horizontal set of 4
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // creating the array for vertical set of 4
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // creating the array for diagonal downwards to the right
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // creating the array for diagonal downwards to the left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if win condition found in any of these sets is found
        return true; // win condition achieved
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
