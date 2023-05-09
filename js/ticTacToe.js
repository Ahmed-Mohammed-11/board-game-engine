class TicTacToe extends GameEngine{
    
    constructor(){
        let state  = [
            ['', '',''],
            ['', '',''],
            ['', '','']
        ];
        super(state);
    }

checkFirstTwoCharacters(input) {
    let firstChar = input.charAt(0);
    let secondChar = input.charAt(1);
    if (input.length > 2){
        return false;
    }
    if ((firstChar === '1' || firstChar === '2' || firstChar === '3') && (secondChar === '1' || secondChar === '2' || secondChar === '3')) {
        return true;
    } else {
        return false;
    }
}
controller (state,input ){
    
    const turns=['x','o']
    let turn;
    if (state.turn){
        turn=turns[0]
    }else{
        turn=turns[1]
    }
    
    
    // console.log(parseInt(input.charAt(0)));
    if (this.checkFirstTwoCharacters(input)){
        if (state[parseInt(input.charAt(0))-1][parseInt(input.charAt(1))-1]==='')
        {state[parseInt(input.charAt(0))-1][parseInt(input.charAt(1))-1]=turn;
        state.turn = !state.turn ;}else{
            alert('this position is not empty')
        }
    }else{
        alert('Not valid input!')
    }
    return state ;
}

drawer(myArray){
// create a table element
let myElement = document.getElementById('my-element');
myElement.innerHTML = '';
let table = document.createElement('table');


// iterate over the rows in the array
for (let i = 0; i < myArray.length; i++) {
  // create a new row
let row = document.createElement('tr');

  // iterate over the columns in the current row
for (let j = 0; j < myArray[i].length; j++) {
// create a new cell
let cell = document.createElement('td');

// set the cell's text content to the current element in the array

cell.textContent = myArray[i][j];
if (myArray[i][j] === 'x'){
    cell.className='x'
}else if (myArray[i][j] === 'o'){
    cell.className='o'
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