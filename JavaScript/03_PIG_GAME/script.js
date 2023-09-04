"use strict";

//



// GETTING THE PLAYER 1 AND PLAYER 2 SECTION
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// GETTING THE FINAL SCORE OF BOTH THE PLAYERS
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

score0.textContent = 0;
score1.textContent = 0;

// GETTING THE DICE TO BE SHOWN
const dice = document.querySelector(".dice");

// GETTING THE CURRENT SCORE OF THE PLAYERS
const player0CurrentScore = document.getElementById("current--0");
const player1CurrentScore = document.getElementById("current--1");

// HIDING THE DICE IN THE BEGINING OF THE GAME
dice.classList.add("hidden");

// GETTING THE BUTTONS THAT USER NEEDS TO PRESS
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


let finalScores , currentScore , activePlayer , gameIsOn


function startTheGame() {

    gameIsOn = true;

    activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;

  dice.classList.add("hidden");

  finalScores = [0, 0];

  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  player1CurrentScore.textContent = currentScore;

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

   

    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

startTheGame();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}



// STARTING THE GAME

btnRoll.addEventListener("click", () => {
  if (gameIsOn) {
    const diceNum = Math.trunc(Math.random() * 6 + 1);

    dice.classList.remove("hidden");

    dice.src = `./ASSETS/dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLDING THE VALUE TO FINAL SCORE ARRAY AND ALSO CHECKING WHO IS WINNER

btnHold.addEventListener("click", () => {
  if (gameIsOn) {
    finalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScores[activePlayer];

    if (finalScores[activePlayer] >= 20) {
        dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      gameIsOn = false;
    } else {
      switchPlayer();
    }
  }
});

// TO START A NEW GAME

btnNew.addEventListener("click", startTheGame);
