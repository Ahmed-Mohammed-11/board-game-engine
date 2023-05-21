class Checkers extends GameEngine{
    constructor(){
        let state = [
            ['','b','','b','','b','','b'],
            ['b','','b','','b','','b',''],
            ['','b','','b','','b','','b'],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['w','','w','','w','','w',''],
            ['','w','','w','','w','','w'],
            ['w','','w','','w','','w','']
        ];
        super (state);
    }
    
    checkInput(str) {
        if (str.length < 5) return false;
        let from1 = str.charAt(0)-1;
        let from2 = str.charAt(1)-1;
        let to1 = str.charAt(3)-1;
        let to2 = str.charAt(4)-1;
        return !isNaN(from1) && !isNaN(from2) && !isNaN(to1)&& !isNaN(to2)
        &&  from2 >= 0 && from2 <= 7 && from1 >= 0 && from1 <= 7
        &&  to2 >= 0 && to2 <= 7 && to1 >= 0 && to1 <= 7;
    }
    // if the position mentioned have piece which its turn
    checkfrom(f1 ,f2, myArray , turn){
        if (myArray[f1][f2] === turn){
            return true ;
        }
        console.log( turn);
        return false;
    }
    controller (state,input ){
        // if the input is invalid return the same array without change
        if (!this.checkInput(input)){
            alert('not valid Input')
            return state;
        }
        // the turns available 
        let turns = ['w', 'b'];
        let turn ; // the current turn
        if (state.turn ){
            turn= turns[0];
        }else{
            turn= turns[1];
        } 
        // don't forget after move change the turn
        // from checking
        let f1 = parseInt( input.charAt(0))-1
        let f2 = parseInt( input.charAt(1))-1
        console.log(f1);
        if (!this.checkfrom(f1 ,f2 ,state,turn)){
            alert('not true piece')
            return state;
        }
        // to checking
        let f3 = parseInt( input.charAt(3))-1
        let f4 = parseInt( input.charAt(4) )-1
    // the kill step 
    if (turn === 'w'){
        
        

    if ((f3 === f1-2) && (f4 === f2+2 )){
        if (state[f1-1][f2+1] === 'b' && state[f1-2][f2+2] === '' ){
            state[f1-1][f2+1] = '' 
            state[f1-2][f2+2] = 'w'
            state[f1][f2] = ''
            state.turn=!state.turn
            return state
            }
            } 
    else if ((f3 === f1-2) && (f4 === f2-2 )){
            if (state[f1-1][f2-1] === 'b' && state[f1-2][f2-2] === '' ){
            state[f1-1][f2-1] = '' 
            state[f1-2][f2-2] = 'w'
            state[f1][f2] = ''
            state.turn=!state.turn
            return state
            }
            }
            else{
                console.log(turn)
                console.log('f1 '+f1 )
                console.log('f2 '+f2 )

                console.log('f3 '+f3 )
                console.log('f4 '+f4 )
            } 
    }   
    if (turn === 'b'){
        if ((f3 === f1+2) && (f4 === f2+2 )){
            if (state[f1+1][f2+1] === 'w' && state[f1+2][f2+2] === '' ){
                state[f1+1][f2+1] = '' 
                state[f1+2][f2+2] = 'b'
                state[f1][f2] = ''
                state.turn=!state.turn
                return state
            }
            } 
    else if ((f3 === f1+2) && (f4 === f2-2 )){
            if (state[f1+1][f2-1] === 'w' && state[f1+2][f2-2] === '' ){
                state[f1+1][f2-1] = '' 
                state[f1+2][f2-2] = 'b'
                state[f1][f2] = ''
                state.turn=!state.turn
                return state
            }
            }
            else{
                console.log(turn)

                console.log('f1 '+f1 )
                console.log('f2 '+f2 )

                console.log('f3 '+f3 )
                console.log('f4 '+f4 )
            }  
    }  
    // one step
        if (turn ==='w'){
            if (!(f3 === f1-1)){
                alert('not valid destination')
                return state
            }
            if (!(f4 === f2-1 || f4 === f2+1)){
                alert('not valid destination')
                return state
            }
        }else if (turn ==='b'){
            if (!(f3 === f1+1)){
                alert('not valid destination')
                return state
            }
            if (!(f4 === f2-1 || f4 === f2+1)){
                alert('not valid destination')
                return state
            }
        }
        // we know thats he specify the piece and the destination is diagonally
        if (state[f3][f4] ==='' ){
            state[f1][f2] = '';
            state[f3][f4] = turn;
            // :) the turns are altered I don't know how this
            state.turn = !state.turn ;
            return state;
        }
        // we need kill step 
        return state ;
    }
    drawer(myArray){
    let myElement = document.getElementById('my-element');
    myElement.innerHTML = '';
    // create a table element
    let table = document.createElement('table');
    
    // iterate over the rows in the array
    for (let i = 0; i < myArray.length; i++) {
      // create a new row
    let row = document.createElement('tr');
    
      // iterate over the columns in the current row
    for (let j = 0; j < myArray[i].length; j++) {
    let cell
    // create a new cell
    if ( i%2===0&&j %2 ===0 ){
    cell = document.createElement('td');
    cell.className='W'
    }else if (i%2===1 && j %2 === 0){
    cell = document.createElement('td');
    cell.className='B'
    } else if (i%2===0 && j %2 === 1) {
        cell = document.createElement('td');
        cell.className='B'
    }else if (i%2===1 && j %2 === 1) {
        cell = document.createElement('td');
        cell.className='W'
    }  
    // set the cell's text content to the current element in the array
    
    cell.textContent = myArray[i][j];
    if (cell.textContent === 'b'){
        cell.textContent = '';
        let piece = document.createElement('img');
        piece.src = '../img/black.png';
        cell.appendChild(piece);
    }else if (cell.textContent === 'w'){
        cell.textContent = '';
        let piece = document.createElement('img');
        piece.src='../img/red.png'
        cell.appendChild(piece);
    }
    // append the cell to the row
    row.appendChild(cell);
    }
    // append the row to the table
    table.appendChild(row);   
    }
    // append the table to the page
    document.body.appendChild(table);
    };
}
