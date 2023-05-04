class GameEngine {
  update (state){
    this.drawer(state);
    setTimeout(()=> {
        let input = prompt("Enter the input:" );
        if(input === "exit"){return;}
        console.log(input);
        let result = this.controller(state , input )
        console.log(result);
        if(result.valid){this.drawer(result.state);}
        else{console.log('not valid input');}
        },0)
  }
  constructor(state) {
    setInterval(this.update.bind(this , state) , 100);
  }
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




