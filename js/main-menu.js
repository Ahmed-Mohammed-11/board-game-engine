
let checkers = document.getElementById('Checkers');
let chess = document.querySelector('#Chess');
let connect4 = document.getElementById('Connect-4');
let ticTacToe = document.getElementById('Tic-Tac-Toe');
let sudoku = document.getElementById('Sudoku');
let equeens = document.getElementById('8-Queens');
let audio = document.createElement('audio');
// audio.src = "../audio/one_beep-99630.mp3"
document.body.appendChild(audio);
checkers.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
checkers.onmouseout = function () {
  audio.pause();
}
chess.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
chess.onmouseout = function () {
  audio.pause();
}
connect4.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
connect4.onmouseout = function () {
  audio.pause();
}
ticTacToe.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
ticTacToe.onmouseout = function () {
  audio.pause();
}
sudoku.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
sudoku.onmouseout = function () {
  audio.pause();
}
equeens.onmouseover = function () {
  //play till end
  audio.currentTime = 0;
  audio.play();
}
equeens.onmouseout = function () {
  audio.pause();
}



