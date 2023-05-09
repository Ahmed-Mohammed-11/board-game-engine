class Connect4 extends GameEngine{
    constructor() {
        let state = [
            [0, 0, 0 , 0, 0 , 0, 0],
            [0, 0, 0 , 0, 0 , 0, 0],
            [0, 0, 0 , 0, 0 , 0, 0],
            [0, 0, 0 , 0, 0 , 0, 0],
            [0, 0, 0 , 0, 0 , 0, 0],
            [0, 0, 0 , 0, 0 , 0, 0],
            [1]
        ];
        super(state);
    }

    drawer(state){
        let startButton = document.querySelector(".startBtn");
        startButton.style.display = "none";
        let playerTurn = document.querySelector(".player-turn");
        playerTurn.style.display = "block";
        let oldBoard = document.getElementById("board");
        if(oldBoard != null){
            document.body.removeChild(oldBoard);
        }

        let board = document.createElement("div");
        board.id = "board";
        for(let i = 0 ; i < 6 ; i++){
            let row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0 ; j < 7 ; j++){
                let cell = document.createElement("div");
                cell.classList.add("cell");
                let innerPlace = document.createElement("div");
                innerPlace.classList.add("innerPlace");
                cell.appendChild(innerPlace);
                if(state[i][j] === 1){
                    innerPlace.style.backgroundColor = "#F45050";
                }else if(state[i][j] === 2){
                    innerPlace.style.backgroundColor = "#FFDD83";
                }
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        document.body.appendChild(board);
    }


    controller(state, input) {
        let valid = false;
        let row = parseInt(input.split(" ")[0]);
        let column = parseInt(input.split(" ")[1]);
        let playerTurn = document.querySelector("#who");
        if(state[row][column] === 0) {
            if (row === 5 || state[row + 1][column] !== 0) {
                if(state[6][0] === 1){
                    state[row][column] = 1;
                    playerTurn.innerHTML = "&nbsp;2&nbsp;";
                    playerTurn.style.color = "#ffdd83";
                }else{
                    state[row][column] = 2;
                    playerTurn.innerHTML = "&nbsp;1&nbsp;";
                    playerTurn.style.color = "#f45050";
                }
                valid = true;
                state[6][0] = 3 - state[6][0];
            }
        }

        return {
            state: state,
            valid: valid,
        }
    }
}