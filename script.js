let computerSelection;
let userSelection;
let computerScore=0;
let userScore=0;
let isGameRunning=true;
const playButtons = document.querySelectorAll('.button');
const results = document.querySelector('.results');

let userResult = document.createElement('p');

let computerResult = document.createElement('p');

let miniGameResult = document.createElement('p');

let gameResult = document.createElement('p');
results.appendChild(gameResult); 


let score = document.querySelector('.score');
displayScore()

function displayScore() {
    score.textContent = `Player = ${userScore} - Computer ${computerScore}`;
}

function computerPlay(){
    results.appendChild(computerResult);   //crée le paragraphe des resultats de Computer
    computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    computerResult.textContent =`Computer chose ${computerSelection}`;
    return computerSelection;
}

function userPlay(){
    results.appendChild(userResult);   //crée le paragraphe des resultats de User
    userResult.textContent = (`Player chose ${userSelection}`);
        return userSelection;
}

function gameRound(computerPlay,userPlay) {
    userPlay()
    computerPlay();
    results.appendChild(miniGameResult);     //crée le paragraphe des resultats de chaque MiniGame

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
    playButton.addEventListener('mouseover', function (){
        let start = playButton.src;
        let hover = playButton.getAttribute('alt'); //specified in img tag.
        playButton.src = hover; 
        playButton.addEventListener('mouseout', function (){
        playButton.src = start;
    })
    })

    
    playButton.addEventListener('click', function game(){
        userSelection=this.getAttribute('id');

        if (isGameRunning){

        gameRound(computerPlay,userPlay);
        
        if (computerScore===5 || userScore===5){
            if (computerScore===userScore){
                document.querySelector('.score').textContent = "The game ended in a draw:no winner";
            } else if (computerScore>userScore) {
                document.querySelector('.score').textContent = "Computer wins the GAME!";
            } else { 
                document.querySelector('.score').textContent = "Player wins the GAME!";
            }

            isGameRunning=false;

            /* playButton.removeEventListener('click', game); */

            function playAgain(){
                const playAgainButton = document.createElement('button');
                document.querySelector('.scoreBoard').appendChild(playAgainButton);
                playAgainButton.textContent = "Another round? Just click!";
                playAgainButton.addEventListener('click', function() {
                    isGameRunning=true;
                    userScore=0;
                    computerScore=0;
                    displayScore();
                    results.removeChild(userResult);
                    results.removeChild(computerResult);
                    results.removeChild(miniGameResult);
                    playAgainButton.remove();

                    
                })
            }

            playAgain();
            
        }
    }
    })})

   /*  if (computerScore===5 || userScore===5){
        (computerScore===userScore)? gameResult.textContent = "The game ended in a draw:no winner":
        (computerScore>userScore)? gameResult.textContent ="Computer wins the GAME!" : gameResult.textContent ="Player wins the GAME!";
        userScore=0;
        computerScore=0; */