
let checkers = document.getElementById('Checkers');
let chess = document.getElementById('Chess');
let connect4 = document.getElementById('Connect-4');
let ticTacToe = document.getElementById('Tic-Tac-Toe');
let sudoku = document.getElementById('Sudoku');
let equeens = document.getElementById('8-Queens');
let audio = document.createElement('audio');

audio.src = "../audio/click-button-140881.mp3"
document.body.appendChild(audio);


chess.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}

checkers.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}

connect4.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}

equeens.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}

ticTacToe.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}

sudoku.onclick = function () {
  audio.currentTime = 0;
  audio.play();
}




