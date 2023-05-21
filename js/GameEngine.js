class GameEngine {
    update (state) {

        this.drawer(state);
        setTimeout(() => 
        {
                //get the input from the user
                let input = prompt("Enter the input:");
                //exit the game if the user enter exit
                if(input === "exit")
                {
                    return;
                }
                let result = this.controller(state, input);
                //if the input is valid the call the drawer function to draw the new state
                if (result.valid) 
                {
                    this.drawer(state);
                }
                else if(result.valid === false && input === "solve") 
                {
                    alert("Can't find a  solution");
                //if the input is not valid alert user that the input is not valid
                } 
                else
                {
                    alert("Invalid input");
                    console.log('not valid input');
                }
                //call update function again recursively
                this.update(state)
        }, 500);

  }
  constructor(state) 
  {
      //call update function
      this.update(state);
  }
  //just a definition for functions controller and drawer
  controller(state , input){}
  drawer(state){}
}


















//
//
// class Game extends GameEngine{
//   constructor(state){
//     super(state);
//   }
// // override
//   controller(state ,input) {
//     // if you made state as object use state.first = to get the matrix
//     // state.second = to get the boolean value denotes to valid input or not
//
//     if (input)
//     {console.log(`the ${input} is valid`);
//       state.value = state.value + input ;
//       console.log(state);}
//     else{
//       console.log('not valid input');
//     }
//
//     return state ;
//   }
// // override
//   drawer(state) {
//     const b = document.getElementById('2');
//     b.innerHTML = `Hello ${state.value}!`
//   }
//
// }
//
// let firstState = {
//   value: 0
// }
//
// const game = new Game(firstState);




