let computerSelection;
let userSelection;
let computerScore=0;
let userScore=0;

function computerPlay(){
    computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    console.log(`Computer chose ${computerSelection}`);
    return computerSelection;
}

function userPlay(){
    userSelection=(prompt("Choose Rock, Paper or Scissors!")).toLowerCase();  //userSelection is case insensitive
    console.log(`Player chose ${userSelection}`);
    return userSelection;
}

function gameRound(computerPlay,userPlay) {
    userPlay();
    computerPlay();
    if (computerSelection===userSelection){
        console.log("The game ended in a draw:no winner")
    }

    else if ((computerSelection==="rock" && userSelection==="scissors")  || (computerSelection==="paper" && userSelection==="rock") || (computerSelection==="scissors" && userSelection==="paper")) {
        console.log(`Computer won: ${computerSelection} beats ${userSelection}!`);
        computerScore+=1;
    }

    else {
        console.log(`Player won: ${userSelection} beats ${computerSelection}!`);
        userScore+=1;
    }
}

function game(){
    for (let i=1; i<=5 ; i++) {
        console.log(`game ${i}`)
        gameRound(computerPlay,userPlay);
    }
    (computerScore===userScore)? console.log("The game ended in a draw:no winner"):
        (computerScore>userScore)? console.log("Computer wins the GAME!"):console.log("Player wins the GAME!")
}

game();