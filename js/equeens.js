
class Equeens extends GameEngine {

    constructor() {
        //initial state
        let state = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ]
        super(state);
    }

    solve(valid, callback) {
        let solution = "";
        if (valid) {
            let session = pl.create();
            session.consult(`
                solution([]).

                solution([X/Y | Others]) :-
                \tsolution(Others),
                \tmember(Y, [1, 2, 3, 4, 5, 6, 7, 8]),
                \tnoattack(X/Y, Others).


                noattack(_, []).

                noattack( X/Y,[X1/Y1 | Others]) :-
                \tY =\\= Y1,
                \tY1 - Y =\\= X1 - X,
                \tY1 - Y =\\= X - X1,
                \tnoattack(X/Y, Others).


                member(Item, [Item | Rest]).

                member(Item, [First | Rest]) :-
                \tmember(Item, Rest).

                template([1/Y1, 2/Y2, 3/Y3, 4/Y4, 5/Y5, 6/Y6, 7/Y7, 8/Y8]).
            ` , {
                success: function () { console.log("success"); },
                error: function (err) { console.log(err); }
            });


            session.query("solution([1/Y1, 2/Y2, 3/Y3, 4/Y4, 5/Y5, 6/Y6, 7/Y7, 8/Y8]).", {
                success: function (goal) { console.log(goal); },
                error: function (err) { console.log(err); }
            });

            session.answer({
                success: function (answer) {
                    solution = session.format_answer(answer);
                    solution = solution.replace(/Y/g, "").replace(/,/g, "|").replace(/=/g, ",").replace(/ /g, "");
                    callback(null, solution);
                },
                fail: function () { console.log("No."); },
                error: function (err) { console.log(err); },
                limit: function () { console.log("Limit exceeded"); }
            });
        } else {
            callback(null, "can't solve");
        }
    }

    drawer(state) {
        let startButton = document.querySelector(".startBtn");
        startButton.style.display = "none";
        let imageSrc = "../img/crown.png";
        let oldBoard = document.getElementById("board");
        if (oldBoard != null) {
            document.body.removeChild(oldBoard);
        }
        let valid = true;
        let board = document.createElement("div");
        board.id = "board";
        for (let i = 0; i < 8; i++) {
            let row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < 8; j++) {
                if (state[i][j] !== 0) {
                    valid = false;
                }
                let cell = document.createElement("div");
                let image = document.createElement("img");
                cell.classList.add("cell");
                if ((i + j) % 2 === 0) {
                    cell.classList.add("white");
                }
                else {
                    cell.classList.add("grey");
                }
                if (state[i][j] === 1) {
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

        if (input === "solve") {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (state[i][j] === 1) {
                        return {
                            state: state,
                            valid: false
                        }
                    }
                }
            }

            this.solve(valid, (err, solution) => {
                if (err) {
                    console.log(err);
                }
                else {
                    solution.split("|").forEach((item) => {
                        let row = parseInt(item.split(",")[0]);
                        let col = parseInt(item.split(",")[1]);
                        state[row - 1][col - 1] = 1;
                    });
                }
            });
            return {
                state: state,
                valid: valid
            }
        }



        let regex = /(solve)|(^[0-7]\s[0-7](\s(delete|Delete|DELETE|d|D))?$)/g;
        if (!input.match(regex)) {
            valid = false;
            return {
                state: state,
                valid: valid
            }
        }

        let row = parseInt(input.split(" ")[0]);
        let col = parseInt(input.split(" ")[1]);
        let toDelete = input.split(" ")[2];

        if (toDelete === "delete" || toDelete === "Delete" || toDelete === "DELETE" || toDelete === "d" || toDelete === "D") {
            if (state[row][col] === 0) {
                valid = false;
            }
            state[row][col] = 0;
            return {
                state: state,
                valid: valid
            }
        }

        //check if there is a queen in the cell
        if (state[row][col] === 1) {
            valid = false;
        }

        //check if there is a queen in the same row
        for (let i = 0; i < 8; i++) {
            if (state[row][i] === 1) {
                valid = false;
                break;
            }
        }

        //check if there is a queen in the same column
        for (let i = 0; i < 8; i++) {
            if (state[i][col] === 1) {
                valid = false;
                break;
            }
        }

        //check if there is a queen in the same diagonal
        let i = row;
        let j = col;
        while (i >= 0 && j >= 0) {
            if (state[i][j] === 1) {
                valid = false;
                break;
            }
            i--;
            j--;
        }

        i = row;
        j = col;
        while (i < 8 && j < 8) {
            if (state[i][j] === 1) {
                valid = false;
                break;
            }
            i++;
            j++;
        }

        i = row;
        j = col;
        while (i >= 0 && j < 8) {
            if (state[i][j] === 1) {
                valid = false;
                break;
            }
            i--;
            j++;
        }

        i = row;
        j = col;
        while (i < 8 && j >= 0) {
            if (state[i][j] === 1) {
                valid = false;
                break;
            }
            i++;
            j--;
        }


        if (valid) {
            state[row][col] = 1;
        }

        return {
            state: state,
            valid: valid
        }
    }
}