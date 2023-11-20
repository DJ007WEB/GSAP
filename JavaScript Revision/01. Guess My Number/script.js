"use strict";

let secretNumber = Math.floor(Math.random() * 20 + 1);

console.log(secretNumber);

// input number

let score = 20;

let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("🛑🛑🛑 No Number");
  } else if (guess === secretNumber) {
    displayMessage("💥💥💥 Correct Number");

    document.querySelector(".number").textContent = secretNumber;

    document.body.style.backgroundColor = "#60b347";

    if (score > highScore) {
      document.querySelector(".highscore").textContent = score;
    }
  } else {
    if (score >= 1) {
      displayMessage(guess > secretNumber ? "Too High" : "Too Low");

      score--;

      if (score == 0) {
        displayMessage("You Lost the Game");
      }

      document.querySelector(".score").textContent = score;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 20;

  secretNumber = Math.floor(Math.random() * 20 + 1);

  console.log(secretNumber);

  displayMessage("Start Guessing...");

  document.querySelector(".score").textContent = score;

  document.querySelector(".number").textContent = "?";

  document.querySelector(".guess").value = "";

  document.body.style.backgroundColor = "#222";
});
