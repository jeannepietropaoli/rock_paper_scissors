let computerSelection;
let userSelection;
let computerScore=0;
let userScore=0;
let isGameRunning=true;
const playButtons = document.querySelectorAll('.button');
const results = document.querySelector('.results');
const signScorePlayer = document.querySelector('.signScorePlayer');
const signScoreComputer = document.querySelector('.signScoreComputer');
const miniGameResult = document.querySelector('.results');
const gameReslut=document.querySelector('.gameResult');
const signScoreLogoPlayer = document.querySelector('.signScoreLogoPlayer');
const signScoreLogoComputer = document.querySelector('.signScoreLogoComputer');
gameReslut.textContent='Who will win the game?';

displayScore()

function displayScore() {
    let scorePlayer = document.querySelector('.scorePlayer');
    let scoreComputer = document.querySelector('.scoreComputer');
    scorePlayer.textContent = `${userScore}`;
    scoreComputer.textContent = `${computerScore}`;
}

function computerPlay(){
    computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black.png`);
    return computerSelection;
}

function userPlay(){
    signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black.png`);
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
                gameReslut = document.querySelector('.gameResult').textContent = "The game ended in a draw:no winner";
            } else if (computerScore>userScore) {
                gameReslut.textContent = "Computer wins the GAME!";
            } else { 
                gameReslut.textContent = "Player wins the GAME!";
            }

            isGameRunning=false;

            function playAgain(){
                const playAgainButton = document.createElement('button');
                document.querySelector('.playAgain').appendChild(playAgainButton);
                playAgainButton.textContent = "Another round? Just click!";
                playAgainButton.addEventListener('click', function() {
                    isGameRunning=true;
                    userScore=0;
                    computerScore=0;
                    displayScore();
                    signScoreLogoPlayer.setAttribute('src', 'pic/black.jpg');
                    signScoreLogoComputer.setAttribute('src', 'pic/black.jpg');
                    miniGameResult.textContent = '';
                    gameReslut.textContent = '';
                    playAgainButton.remove();
                    gameReslut.textContent='Who will win the game?';
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