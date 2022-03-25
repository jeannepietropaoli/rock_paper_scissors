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
const compteur = document.querySelector('.playAgain');
const thPlayer = document.querySelector('.thPlayer');
const thComputer = document.querySelector('.thComputer');
let winner;
let stopGlow=false;

function blackText(){
    compteur.textContent='fill';
    compteur.style.color='black';
}

function displayScore() {
    let scorePlayer = document.querySelector('.scorePlayer');
    let scoreComputer = document.querySelector('.scoreComputer');
    scorePlayer.textContent = `${userScore}`;
    scoreComputer.textContent = `${computerScore}`;
}

function computerPlay(){
    let computerPick= Math.floor(Math.random() * 3);
    (computerPick===0)?computerSelection="rock":
        (computerPick===1)?computerSelection="paper":computerSelection="scissors";
    signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black.png`);
    return computerSelection;
}

function userPlay(){
    signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black.png`);
    return userSelection;
}

function highlightC(){
    if (winner==='computer'){
        signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black3.png`);
        signScoreLogoComputer.addEventListener('mouseout', endHighlightC)
    }
}

function endHighlightC(){
    if (stopGlow) {
        signScoreLogoComputer.setAttribute('src','pic/black.jpg');
    }
    else {
        signScoreLogoComputer.setAttribute('src',`pic/${computerSelection}_neon_black.png`);
    }
}

function highlightP(){
    if (winner==='player'){
        signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black3.png`);
        signScoreLogoPlayer.addEventListener('mouseout', endHighlightP)
    }
}

function endHighlightP(){
    if (stopGlow) {
        signScoreLogoPlayer.setAttribute('src','pic/black.jpg');
    }
    else{    
        signScoreLogoPlayer.setAttribute('src',`pic/${userSelection}_neon_black.png`);
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
        miniGameResult.textContent = "Tie game : no winner";
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

function playAgain(){
    const playAgainButton = document.createElement('span');
    document.querySelector('.playAgain').appendChild(playAgainButton);
    playAgainButton.classList.add('neon');
    playAgainButton.classList.add('playAgainHover');
    playAgainButton.textContent = "Another round? Just click!";
    playAgainButton.addEventListener('click', function() {
        stopGlow=true;

        (winner==='computer')? thComputer.classList.remove('addGlow'):
        thPlayer.classList.remove('addGlow'); 
       
        signScoreLogoComputer.removeEventListener('mouseover', highlightC);
        signScoreLogoPlayer.removeEventListener('mouseover', highlightP); 

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
        compteur.textContent = 'Psst! Hover over the scoreboard pictures to see the winner\'s choice highlighted';
        compteur.style.color='white';
    }
    else if (nbMiniGame>1 && isGameRunning){
        blackText()
    }
}

/* end of functions init */

blackText();
displayScore();
higlightWinnerLogo();

playButtons.forEach ((playButton) => { 
    playButton.addEventListener('mouseover', function highlightPlayButtons(){
        let start = playButton.src;
        let hover = playButton.getAttribute('alt'); //specified in img tag.
        playButton.src = hover; 
        playButton.addEventListener('mouseout', function stopHighlghtPlayButtons(){
            playButton.src = start;
        })
    })
    
    playButton.addEventListener('click', function game(){
        stopGlow=false;
        userSelection=this.getAttribute('id');
        displayHoverInfo();
        if (isGameRunning){
            gameRound(computerPlay,userPlay);
            higlightWinnerLogo(winner);
            
        
        if (computerScore===5 || userScore===5){
            if (computerScore>userScore) {
                thComputer.classList.add('addGlow');
                gameReslut.textContent = "Computer wins the GAME!";
                
            } else { 
                thPlayer.classList.add('addGlow');
                gameReslut.textContent = "Player wins the GAME!";
            }
            playAgain();
            isGameRunning=false;
        }
    }})
})