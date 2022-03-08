let computerSelection;
let userSelection;

function computerPlay(){
    computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    console.log(computerSelection);
    return computerSelection;
}

function userPlay(){
    userSelection=(prompt("Choose Rock, Paper or Scissors!")).toLowerCase();  //userSelection is case insensitive
    console.log(userSelection);
    return userSelection;
}

function gameRound(computerPlay,userPlay) {
    computerPlay();
    userPlay();
    if (computerSelection===userSelection){
        console.log("The game ended in a draw:no winner")
    }

    else if ((computerSelection==="rock" && userSelection==="scissors")  || (computerSelection==="paper" && userSelection==="rock") || (computerSelection==="scissors" && userSelection==="paper")) {
        console.log(`Computer won: ${computerSelection} beats ${userSelection}!`)
    }

    else {
        console.log(`Player won: ${userSelection} beats ${computerSelection}!`)
    }
}

gameRound(computerPlay,userPlay);