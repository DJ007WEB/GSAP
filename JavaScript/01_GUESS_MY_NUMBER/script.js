"use strict";

/*

document.querySelector('.message').textContent = 'Correct Number';


document.querySelector('.number').textContent = 19;

document.querySelector('.score').textContent = 15

document.querySelector('.guess').value = 23;

*/

let randNum = Math.trunc(Math.random() * 20 + 1);

// let highScore = document.querySelector('.highscore');

let highscore;

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

document.querySelector(".check").addEventListener("click", () => {
  // console.log(document.querySelector('.guess').value);

  let score = document.querySelector(".score").textContent;

  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    document.querySelector(".message").textContent = "No Number";
  } else if (guess === randNum) {
    // IF THE GUESS IS CORRECT THEN
    document.querySelector(".number").textContent = randNum;
    document.querySelector("body").style.backgroundColor = "#60b347";
    displayMessage("Correct Number");

    // IMPLEMENTING HIGSCORE
    if (!highscore) {
      highscore = score;
    } else if (score > highscore) {
      highscore = score;
    }
    document.querySelector(".highscore").textContent = highscore;
  } else {
    displayMessage(guess > randNum ? "Too High" : "Too Low");
    if (score > 1) {
      score--;
      document.querySelector(".score").textContent = score;
    } else {
        displayMessage("You Lost the Game");
      document.querySelector(".score").textContent = 0;
    }
  } //else {
  //     document.querySelector(".message").textContent = "Too Low";
  //     if (score > 1) {
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You Lost the Game";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   }
});

document.querySelector(".again").addEventListener("click", () => {
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = " ";
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = "20";
  document.querySelector("body").style.backgroundColor = "black";
  document.querySelector(".highscore").textContent = highscore;
  randNum = Math.trunc(Math.random() * 20 + 1);
});
