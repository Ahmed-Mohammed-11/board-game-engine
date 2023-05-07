class Equeens extends GameEngine{
    constructor() {
        let state = [
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
                [0, 0, 0 , 0, 0 , 0, 0, 0],
        ]
        super(state);
    }

    drawer(state){
        let startButton = document.querySelector(".startBtn");
        startButton.style.display = "none";
        let oldBoard = document.getElementById("board");
        if(oldBoard != null){
            document.body.removeChild(oldBoard);
        }

        let board = document.createElement("div");
        board.id = "board";
        for(let i = 0 ; i < 8 ; i++){
            let row = document.createElement("div");
            row.classList.add("row");
            for(let j = 0 ; j < 8 ; j++){
                let cell = document.createElement("div");
                cell.classList.add("cell");
                if((i + j) % 2 === 0){
                    cell.classList.add("white");
                }
                else{
                    cell.classList.add("grey");
                }
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        document.body.appendChild(board);
    }

    controller(state, input) {
        //logic of 8 queens game

    }
}