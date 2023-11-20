"use strict";

//  Selecting   Elements

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const player0currScoreEl = document.getElementById("current--0");
const player1currScoreEl = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions

let playing;

let currScore;

let scores;

let activePlayer;

//  INIT

const init = function () {
  // Declaring Variables

  playing = true;
  currScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0currScoreEl.textContent = 0;
  player1currScoreEl.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  diceEl.classList.add("hidden");
};

init();
// Switching Player

const switchPlayer = function () {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling the Dice

btnRoll.addEventListener("click", function () {
  if (playing) {
    const diceNo = Math.floor(Math.random() * 6 + 1);

    diceEl.classList.remove("hidden");

    diceEl.src = `dice-${diceNo}.png`;

    if (diceNo != 1) {
      currScore += diceNo;

      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

//  HOLD BUTTON

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;

      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}]`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//  RESETTING THE GAME

btnNew.addEventListener("click", init);
