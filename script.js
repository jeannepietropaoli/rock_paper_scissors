let computerSelection;
let userSelection;
let computerScore=0;
let userScore=0;
let isGameRunning=true;
let nbMiniGame = 0;
const playButtons = document.querySelectorAll('.button');
const results = document.querySelector('.results');
const signScorePlayer = document.querySelector('.signScorePlayer');
const signScoreComputer = document.querySelector('.signScoreComputer');
const miniGameResult = document.querySelector('.results');
const gameReslut=document.querySelector('.gameResult');
const signScoreLogoPlayer = document.querySelector('.signScoreLogoPlayer');
const signScoreLogoComputer = document.querySelector('.signScoreLogoComputer');
gameReslut.textContent='Who will win the game?';
let winner;
const compteur = document.querySelector('.playAgain');
blackText();

function blackText(){
    compteur.textContent='fill';
    compteur.style.color='black';
}

displayScore();
higlightWinnerLogo();

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

function endHighlightC(){
    if (debug) {
        signScoreLogoComputer.setAttribute('src','pic/black.jpg');
    }
    else {
        signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black.png`);
    }
}

function highlightC(){
    if (winner==='computer'){
        signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black3.png`);
        signScoreLogoComputer.addEventListener('mouseout', endHighlightC)
    }
}

function endHighlightP(){
    if (debug) {
        signScoreLogoPlayer.setAttribute('src','pic/black.jpg');
    }
    else{    
        signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black.png`);
    }
}

function highlightP(){
    if (winner==='player'){
        signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black3.png`);
        signScoreLogoPlayer.addEventListener('mouseout', endHighlightP)
    }
}

function higlightWinnerLogo(){
    signScoreLogoComputer.addEventListener('mouseover', highlightC);
    signScoreLogoPlayer.addEventListener('mouseover', highlightP);
}
    
function gameRound(computerPlay,userPlay) {
    winner='';
    userPlay()
    computerPlay();

    if (computerSelection===userSelection){
        miniGameResult.textContent = "The game ended in a draw:no winner";
    }
    else if ((computerSelection==="rock" && userSelection==="scissors")  ||
                 (computerSelection==="paper" && userSelection==="rock") || 
                    (computerSelection==="scissors" && userSelection==="paper")) {
        winner='computer';
        miniGameResult.textContent = `Computer won: ${computerSelection} beats ${userSelection}!`;
        computerScore++;
    }else {
        winner='player';
        miniGameResult.textContent = `Player won: ${userSelection} beats ${computerSelection}!`;
        userScore++;
    }
    displayScore();
}

let debug=false;

function playAgain(){
    const playAgainButton = document.createElement('button');
    document.querySelector('.playAgain').appendChild(playAgainButton);
    playAgainButton.classList.add('neon');
    playAgainButton.textContent = "Another round? Just click!";
    playAgainButton.addEventListener('click', function() {

        debug=true;
       
        signScoreLogoComputer.removeEventListener('mouseover', highlightC);
        signScoreLogoPlayer.removeEventListener('mouseover', highlightP); 


        /* signScoreLogoPlayer.removeEventListener('mouseout', endHighlightC);

        signScoreLogoComputer.removeEventListener('mouseout', endHighlightP);   */

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
        nbMiniGame=0;
    }) 
    
}

function displayHoverInfo () {
    nbMiniGame++;
    console.log(nbMiniGame);
    if (nbMiniGame===1){
        compteur.textContent = 'Fun fact: hover over the scoreboard signs to see the winner\'s sign highlighted';
        compteur.style.color='white';
    }
    else if (nbMiniGame>1 && isGameRunning){
        blackText()
    }
}

playButtons.forEach ((playButton) => { 
    playButton.addEventListener('mouseover', function (){
        let start = playButton.src;
        let hover = playButton.getAttribute('alt'); //specified in img tag.
        playButton.src = hover; 
        playButton.addEventListener('mouseout', function (){
            playButton.src = start;
        })
    })
    
    playButton.addEventListener('click', function game(){
        debug=false;
        userSelection=this.getAttribute('id');
        displayHoverInfo();
        if (isGameRunning){
            gameRound(computerPlay,userPlay);
            higlightWinnerLogo(winner);
            
        
        if (computerScore===5 || userScore===5){
            if (computerScore===userScore){
                gameReslut = document.querySelector('.gameResult').textContent = "The game ended in a draw:no winner";
            } else if (computerScore>userScore) {
                gameReslut.textContent = "Computer wins the GAME!";
            } else { 
                gameReslut.textContent = "Player wins the GAME!";
            }
            playAgain();
            isGameRunning=false;
        }
    } 
    })
})
       

