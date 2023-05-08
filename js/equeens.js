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
        let imageSrc = "../img/crown.png"
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
                let image = document.createElement("img");
                cell.classList.add("cell");
                if((i + j) % 2 === 0){
                    cell.classList.add("white");
                }
                else{
                    cell.classList.add("grey");
                }
                if(state[i][j] === 1){
                    image.src = imageSrc;
                    cell.appendChild(image);
                }
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        document.body.appendChild(board);
    }

    controller(state, input) {
        let valid = true;
        let row = parseInt(input.split(" ")[0]);
        let col = parseInt(input.split(" ")[1]);
        let toDelete = input.split(" ")[2];

        if(toDelete === "delete" || toDelete === "Delete" || toDelete === "DELETE" || toDelete === "d" || toDelete === "D"){
            state[row][col] = 0;
            return {
                state: state,
                valid: valid
            }
        }

        console.log("row -> " + row);
        console.log("col -> " + col);
        //check if there is a queen in the cell
        if(state[row][col] === 1){
            valid = false;
        }

        //check if there is a queen in the same row
        for(let i = 0 ; i < 8 ; i ++){
            if(state[row][i] === 1){
                valid =  false;
                break;
            }
        }

        //check if there is a queen in the same column
        for(let i = 0 ; i < 8 ; i ++){
            if(state[i][col] === 1){
                valid =  false;
                break;
            }
        }

        //check if there is a queen in the same diagonal
        let i = row;
        let j = col;
        while(i >= 0 && j >= 0){
            if(state[i][j] === 1){
                valid = false;
                break;
            }
            i--;
            j--;
        }

        i = row;
        j = col;
        while(i < 8 && j < 8){
            if(state[i][j] === 1){
                valid = false;
                break;
            }
            i++;
            j++;
        }

        i = row;
        j = col;
        while(i >= 0 && j < 8){
            if(state[i][j] === 1){
                valid = false;
                break;
            }
            i--;
            j++;
        }

        i = row;
        j = col;
        while(i < 8 && j >= 0){
            if(state[i][j] === 1){
                valid = false;
                break;
            }
            i++;
            j--;
        }


        if(valid){
            state[row][col] = 1;
        }

        return {
            state: state,
            valid: valid
        }
    }
}