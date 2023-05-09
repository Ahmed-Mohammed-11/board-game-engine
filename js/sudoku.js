function turningToString(grid){
    let myArray = [];
    for (let i = 0 ;i < 9 ;i++){
        myArray[i] = [];
        for (let j = 0 ;j < 9;j++){
            if (grid[i][j] === 0){
                myArray[i][j] = '';
            }else {
            myArray[i][j] = grid[i][j].toString();
            }
        }
    }
    return myArray;

}
function generateSudoku() {
    // Create an empty 9x9 grid
    let grid = [];
    for (let i = 0; i < 9; i++) {
        grid[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    
    // Fill the diagonal sub-grids with random numbers
    fillDiagonalSubGrids(grid);
    
    // Fill the remaining cells
    fillRemainingCells(grid, 0, 3);
    
    // Remove some numbers to create the puzzle
    removeNumbers(grid);
    
    let myArray =  turningToString(grid);
    
    
    return myArray;
    }
    
function fillDiagonalSubGrids(grid) {
    for (let i = 0; i < 9; i += 3) {
        this.fillSubGrid(grid, i, i);
    }
    }
    
function fillSubGrid(grid, row, col) {
    let nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        grid[row + i][col + j] = nums.pop();
        }
    }
    }
    
function shuffle(array) {
        for (let i = array.length -1; i >0 ;i--){
            let j = Math.floor(Math.random() * (i+1));
            [array[i],array[j]] = [array[j],array[i]];
        }
        return array;
    }
    
function fillRemainingCells(grid,row,col){
        if(col>=9 && row<8){
            row=row+1;
            col=0;
        }
        if(row>=9 && col>=9){
            return true;
        }
        if(row<3){
            if(col<3){
                col=3;
            }
        }else if(row<6){
            if(col===parseInt(row/3)*3){
                col+=3;
            }
        }else{
            if(col===6){
                row+=1;
                col=0;
                if(row>=9){
                    return true;
                }
            }
        }
        
        for(let num=1;num<=9;num++){
            if(this.isSafe(grid,row,col,num)){
                grid[row][col]=num;
                if(this.fillRemainingCells(grid,row,col+1)){
                    return true;
                }
                grid[row][col]=0;
            }
        }
        return false;
    }
    
function isSafe(grid,row,col,num){
        return !this.usedInRow(grid,row,num) && !this.usedInCol(grid,col,num) && !this.usedInBox(grid,row-row%3,col-col%3,num);
    }
    
function  usedInRow(grid,row,num){
        for(let col=0;col<9;col++){
            if(grid[row][col]===num){
                return true;
            }
        }
        return false;
    }
    
function usedInCol(grid,col,num){
        for(let row=0;row<9;row++){
            if(grid[row][col]===num){
                return true;
            }
        }
        return false;
    }
    
function usedInBox(grid,startRow,startCol,num){
        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                if(grid[row+startRow][col+startCol]===num){
                    return true;
                }
            }
        }
        return false;
    }
    
function removeNumbers(grid) {
        let count = Math.floor(Math.random() * (55 -45)) +45 ;
        while(count!=0){
            let cellId = Math.floor(Math.random()*81);
            let row = Math.floor(cellId/9);
            let col = cellId%9;
            while(grid[row][col]==0){
                cellId = Math.floor(Math.random()*81);
                row = Math.floor(cellId/9);
                col = cellId%9;
            }
            let backup = grid[row][col];
            grid[row][col]=0;
            count--;
        } 
}
class Sudoku extends GameEngine{
    //place your js code here
    constructor(){
        
        let arr0= generateSudoku();
        let arr1 = JSON.parse(JSON.stringify(arr0));
        let arr = [];
        arr[0] = arr0;
        arr[1] = arr1;
        super(arr)
    }
    
    
    
    // we need the code to generator to the initial state
    
    

    // rc n (rowcolumn number)or rc r (rowcolumn remove)
    checkRow_Col_box(myArray,input){
    
        let row = parseInt(input.charAt(0)) -1
        let col = parseInt(input.charAt(1)) -1
        let x = input.charAt(3);
        // col and row check
        for (let i = 0 ;i < 9 ;i++){
            if (myArray[row][i] === x ){
                alert('is found in row')
                return false;
            }
            if (myArray[i][col] === x ){
                alert('is found in col')
                return false;
            }
        }
        // box check detecting the box
        let boxr = Math.floor(row/3)*3
        let boxc = Math.floor(col/3)*3
        for (let i = boxr ;i < boxr+3 ; i++){
            for (let j = boxc ;j < boxc+3 ; j++){
                if (myArray[i][j] === x){
                    alert('is found in box')
                    return false;
                }
            }
        }
        return true ;
    }
    input_validity_removing(myArray,input , arr0){
        if(input.length !== 4){
            alert('the format should be of length 4 ')
            return myArray
        }
        let row = parseInt(input.charAt(0)) -1
        let col = parseInt(input.charAt(1)) -1
        console.log(row)
        console.log(col)
    
        let x = input.charAt(3);
        if ((row < 0 || row > 8 || col < 0 || col > 8)){
            alert('not valid input!');
            return myArray ;
        }
        // valid row and column
        if (x === 'r'){
            // the part for removing
            if (arr0[row][col] === ''){
                myArray[row][col] = ''
                console.log('correct remove')
                console.log(myArray);
                return myArray;
            }
            else{alert('the position can\'t be removed')
                console.log(arr0);
                return myArray ;
            }
        }else {
            let x_v = parseInt(x);
            console.log(x_v);
            if ((x_v < 0 || x_v > 9 )){
                alert('not avaliable value');
                return myArray ;
            }else{
                if (myArray[row][col] === ''){
                    if (this.checkRow_Col_box(myArray
                        ,input)){
                    myArray[row][col] = x
                }
                }
            }
        }
    return myArray ;
        
    }
    // after taking the input -- from it to make the index from 1 in the board
    controller(state , input){
        let myArray = state [0];
        let arr0 = state [1];
        this.input_validity_removing(myArray,input , arr0);
    
        return myArray;
    }
    
    // it is ok but we need to add the css
    drawer(state){
        let myArray = state[0];
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
        // create a new cell
        let cell = document.createElement('td');
        
        // set the cell's text content to the current element in the array
        
        cell.textContent = myArray[i][j];
        
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
