let computerSelection;
let userSelection;
let computerScore=0;
let userScore=0;
const playButtons = document.querySelectorAll('button');
const results = document.querySelector('.results');

let userResult = document.createElement('p');
results.appendChild(userResult);   //crée le paragraphe des resultats de User

let computerResult = document.createElement('p');
results.appendChild(computerResult);   //crée le paragraphe des resultats de Computer

let miniGameResult = document.createElement('p');
results.appendChild(miniGameResult);     //crée le paragraphe des resultats de chaque MiniGame

let gameResult = document.createElement('p');
results.appendChild(gameResult); 

let score = document.querySelector('.score');
displayScore()

function displayScore() {
    score.textContent = `Player = ${userScore} - Computer ${computerScore}`;
}

function computerPlay(){
    computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    computerResult.textContent =`Computer chose ${computerSelection}`;
    return computerSelection;
}

function userPlay(){
    userResult.textContent = (`Player chose ${userSelection}`);
        return userSelection;
}

function gameRound(computerPlay,userPlay) {
    userPlay()
    computerPlay();

    if (computerSelection===userSelection){
        miniGameResult.textContent = "The game ended in a draw:no winner";
    }
    else if ((computerSelection==="rock" && userSelection==="scissors")  ||
                 (computerSelection==="paper" && userSelection==="rock") || 
                    (computerSelection==="scissors" && userSelection==="paper")) {
        miniGameResult.textContent = `Computer won: ${computerSelection} beats ${userSelection}!`;
        computerScore++;
    }
    else {
        miniGameResult.textContent = `Player won: ${userSelection} beats ${computerSelection}!`;
        userScore++;
    }
    displayScore();
}

playButtons.forEach((playButton) => { 
    playButton.addEventListener('click', function game(){
        userSelection=this.textContent.toLowerCase();
        gameRound(computerPlay,userPlay);
        gameResult.textContent = '';

        if (computerScore===5 || userScore===5){
            (computerScore===userScore)? gameResult.textContent = "The game ended in a draw:no winner":
            (computerScore>userScore)? gameResult.textContent ="Computer wins the GAME!" : gameResult.textContent ="Player wins the GAME!";
            userScore=0;
            computerScore=0;
        }
    })})
