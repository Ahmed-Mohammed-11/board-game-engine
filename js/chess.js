class Chess extends GameEngine {
  constructor() {
    let state = [
      ['black rook', 'black knight', 'black bishop', 'black queen', 'black king', 'black bishop', 'black knight', 'black rook'],
      ['black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn', 'black pawn'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0'],
      ['white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn', 'white pawn'],
      ['white rook', 'white knight', 'white bishop', 'white queen', 'white king', 'white bishop', 'white knight', 'white rook'],
      [1]
    ];
    console.log('chess constructor');
    super(state);

  }

  drawer(state) {
    let startButton = document.getElementsByClassName('startBtn');
    startButton[0].style.display = 'none';
    let playerTurn = document.getElementsByClassName('player-turn');
    playerTurn[0].style.display = 'block';
    let oldBoard = document.getElementById('board');
    if (oldBoard !== null) {
      document.body.removeChild(oldBoard);
    }
    let pathToImage = '../img/pieces/';
    let newBoard = document.createElement('div');
    newBoard.id = 'board';
    for (let i = 0; i < 8; i++) {
      let row = document.createElement('div');
      row.className = 'row';
      for (let j = 0; j < 8; j++) {
        if (state[i][j] !== '0') {
          console.log(state[i][j]);
          let cell = document.createElement('div');
          cell.classList.add('square');
          let image = document.createElement('img');
          let dir = state[i][j].split(" ")[0];
          let piece = state[i][j].split(" ")[1];
          if ((i + j) % 2 === 0) {
            cell.classList.add('green');
          } else {
            cell.classList.add('white');
          }
          image.src = pathToImage + dir + '/' + piece + '.png';
          cell.appendChild(image);
          row.appendChild(cell);
        } else {
          let cell = document.createElement('th');
          cell.classList.add('square');
          if ((i + j) % 2 === 0) {
            cell.classList.add('green');
          } else {
            cell.classList.add('white');
          }
          row.appendChild(cell);
        }
      }
      newBoard.appendChild(row);
    }
    document.body.appendChild(newBoard);
  }

  controller(state, input) {
    //source to integer
    let sourceRow = parseInt(input.split(" ")[0].split("")[0]);
    let sourceColumn = parseInt(input.split(" ")[0].split("")[1]);
    let destinationRow = parseInt(input.split(" ")[1].split("")[0]);
    let destinationColumn = parseInt(input.split(" ")[1].split("")[1]);
    let currentPiece = state[sourceRow][sourceColumn];
    let playerTurn = document.querySelector('.player-turn');

    let destinationPiece = state[destinationRow][destinationColumn];
    let valid = false;
    if (currentPiece !== '0') {
      if (currentPiece.split(" ")[0] === "black" && state[8][0] === 1) {
        if (currentPiece.split(" ")[1] === "pawn") {
          if (destinationRow === sourceRow + 1 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn - 1) {
            if (destinationPiece.split(" ")[0] === "white") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          } else if (destinationRow === sourceRow + 1 && destinationColumn === sourceColumn || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn && sourceRow === 1) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "rook") {
          if (destinationRow === sourceRow) {
            let tmp = true;
            let colDir = destinationColumn - sourceColumn > 0 ? 1 : -1;
            let col = sourceColumn + colDir;
            while (col !== destinationColumn) {
              if (state[sourceRow][col] !== '0') {
                tmp = false;
                break;
              }
              col += colDir;
            }
            if (tmp) {
              if (destinationPiece === '0') {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              } else if (destinationPiece.split(" ")[0] === "white") {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              }
            }
          }else if (destinationColumn === sourceColumn){
            let tmp = true;
            let rowDir = destinationRow - sourceRow > 0 ? 1 : -1;
            let row = sourceRow + rowDir;
            while (row !== destinationRow) {
              if (state[row][sourceColumn] !== '0') {
                tmp = false;
                break;
              }
              row += rowDir;
            }
            if (tmp) {
              if (destinationPiece === '0') {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              } else if (destinationPiece.split(" ")[0] === "white") {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              }
            }
          }
        } else if (currentPiece.split(" ")[1] === "knight") {
          if (destinationRow === sourceRow + 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn - 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn - 2) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "white") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "queen") {
          if (destinationRow === sourceRow || destinationColumn === sourceColumn || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn - 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn - 2) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "white") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "king") {
          if (destinationRow === sourceRow + 1 && destinationColumn === sourceColumn || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn && sourceRow === 1) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "white") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "bishop") {
          if (Math.abs(destinationRow - sourceRow) === Math.abs(destinationColumn - sourceColumn)) {
            let rowDir = destinationRow - sourceRow > 0 ? 1 : -1;
            let colDir = destinationColumn - sourceColumn > 0 ? 1 : -1;
            let row = sourceRow + rowDir;
            let col = sourceColumn + colDir;
            let tmp = true
            while (row !== destinationRow && col !== destinationColumn) {
              if (state[row][col] !== '0') {
                tmp = false;
                break;
              }
              row += rowDir;
              col += colDir;
            }
            if (tmp) {
              if (destinationPiece === '0') {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';

              } else if (destinationPiece.split(" ")[0] === "white") {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              }
            }
          }
        }
      } else if (currentPiece.split(" ")[0] === "white" && state[8][0] === 2) {
        if (currentPiece.split(" ")[1] === "pawn") {
          if (destinationRow === sourceRow - 1 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn - 1) {
            if (destinationPiece.split(" ")[0] === "black") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          } else if (destinationRow === sourceRow - 1 && destinationColumn === sourceColumn || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn && sourceRow === 6) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "rook") {
            //if the move is vertical
            if (destinationRow === sourceRow) {
                let tmp = true;
                let colDir = destinationColumn - sourceColumn > 0 ? 1 : -1;
                let col = sourceColumn + colDir;
                while (col !== destinationColumn) {
                    if (state[sourceRow][col] !== '0') {
                    tmp = false;
                    break;
                    }
                    col += colDir;
                }
                if (tmp) {
                    if (destinationPiece === '0') {
                    valid = true;
                    state[destinationRow][destinationColumn] = currentPiece;
                    state[sourceRow][sourceColumn] = '0';
                    } else if (destinationPiece.split(" ")[0] === "black") {
                    valid = true;
                    state[destinationRow][destinationColumn] = currentPiece;
                    state[sourceRow][sourceColumn] = '0';
                    }
                }
            }else if (destinationColumn === sourceColumn){
                let tmp = true;
                let rowDir = destinationRow - sourceRow > 0 ? 1 : -1;
                let row = sourceRow + rowDir;
                while (row !== destinationRow) {
                    if (state[row][sourceColumn] !== '0') {
                    tmp = false;
                    break;
                    }
                    row += rowDir;
                }
                if (tmp) {
                    if (destinationPiece === '0') {
                    valid = true;
                    state[destinationRow][destinationColumn] = currentPiece;
                    state[sourceRow][sourceColumn] = '0';
                    } else if (destinationPiece.split(" ")[0] === "black") {
                    valid = true;
                    state[destinationRow][destinationColumn] = currentPiece;
                    state[sourceRow][sourceColumn] = '0';
                    }
                }
            }

        } else if (currentPiece.split(" ")[1] === "knight") {
          if (destinationRow === sourceRow + 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn - 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn - 2) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "black") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "queen") {
          if (destinationRow === sourceRow || destinationColumn === sourceColumn || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow + 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn + 1 || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn - 1 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow + 1 && destinationColumn === sourceColumn - 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn + 2 || destinationRow === sourceRow - 1 && destinationColumn === sourceColumn - 2) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "black") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "king") {
          if (destinationRow === sourceRow - 1 && destinationColumn === sourceColumn || destinationRow === sourceRow - 2 && destinationColumn === sourceColumn && sourceRow === 6) {
            if (destinationPiece === '0') {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            } else if (destinationPiece.split(" ")[0] === "black") {
              valid = true;
              state[destinationRow][destinationColumn] = currentPiece;
              state[sourceRow][sourceColumn] = '0';
            }
          }
        } else if (currentPiece.split(" ")[1] === "bishop") {
          if (Math.abs(destinationRow - sourceRow) === Math.abs(destinationColumn - sourceColumn)) {
            let rowDir = destinationRow - sourceRow > 0 ? 1 : -1;
            let colDir = destinationColumn - sourceColumn > 0 ? 1 : -1;
            let row = sourceRow + rowDir;
            let col = sourceColumn + colDir;
            let tmp = true
            while (row !== destinationRow && col !== destinationColumn) {
              if (state[row][col] !== '0') {
                tmp = false;
                break;
              }
              row += rowDir;
              col += colDir;
            }
            if (tmp) {
              if (destinationPiece === '0') {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';

              } else if (destinationPiece.split(" ")[0] === "black") {
                valid = true;
                state[destinationRow][destinationColumn] = currentPiece;
                state[sourceRow][sourceColumn] = '0';
              }
            }
          }
        }
      }
    }
    if(valid === true && state[8][0] === 1){
        state[8][0] = 2;
        playerTurn.innerHTML = "White's Turn";
    }else if(valid === true && state[8][0] === 2){
        state[8][0] = 1;
        playerTurn.innerHTML = "Black's Turn";
    }
    return {
        valid: valid,
        state: state
    };
  }
}

