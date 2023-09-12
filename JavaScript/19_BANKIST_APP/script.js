"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// ------------ STARTING THE APP CODING ----------------//////////////////////////////////////

// ----------------- DISPLAY MOVEMENTS

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}&euro;</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// -------------- CREATING USERNAMES

const createUserNames = function (acc) {
  acc.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((e) => e[0])
      .join("");
  });
};

createUserNames(accounts);

// --------------------- CALCULATING and DISPLAYING BALANCE

const displaybalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, e) => acc + e, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

// ------------------------ CALCULATING AND DISPLAYING DEPOSIT AMOUNT

const calDeposit = function (acc) {
  const deposit = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, e) => acc + e, 0);

  labelSumIn.textContent = `${deposit}€`;

  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, e) => acc + e, 0);

  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .reduce((acc, i) => acc + i, 0);

  labelSumInterest.textContent = `${interest}€`;
};


// ---------------------------- UPDATING UI

const updateUi = function(acc) {
  // displaying movements
  displayMovements(acc.movements);

  // displaying balance

  displaybalance(acc);

  // displaying summary or deposit in the bottom of the page

  calDeposit(acc);
}



// ------------------------ IMPLEMENTING LOG IN FEATURE

let currAcc;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currAcc = accounts.find((acc) => acc.username === inputLoginUsername.value);

  if (currAcc?.pin === Number(inputLoginPin.value)) {
    // console.log(`LOGIN`);

    // diplsaying message and ui
    labelWelcome.textContent = `Welcome Back, ${currAcc.owner
      .split(" ")
      .at(0)}`;

    containerApp.style.opacity = 100;

    inputLoginUsername.value = "";

    inputLoginPin.value = "";

    inputLoginPin.blur();

      updateUi(currAcc);
    
  }
});


// ----------------------- IMPLEMENTING MONEY TRANSFER

btnTransfer.addEventListener('click' , (e) => {
      e.preventDefault();

      const amount =  Number(inputTransferAmount.value);

      const receiAcc = accounts.find((acc) => acc.username === inputTransferTo.value);

      inputTransferAmount.value = inputTransferTo.value = '';

      if(amount > 0 && receiAcc && currAcc.balance > amount && receiAcc?.username !== currAcc.username) {
        console.log(`transfer done`);

        currAcc.movements.push(-amount);
        receiAcc.movements.push(amount);

        updateUi(currAcc);
      }
})


// ---------------------- IMPLEMENTING CLOSING AN ACCOUNT

btnClose.addEventListener('click' , (e) => {
    e.preventDefault();

    

    console.log('clicked');

    if(Number(inputClosePin.value) === currAcc.pin && inputCloseUsername.value === currAcc.username) {
        
      const index = accounts.findIndex((acc) => acc.username === currAcc.username);

      console.log(index);

      accounts.splice(index , 1);

      console.log(accounts);
      containerApp.style.opacity = 0;

    }

    inputClosePin.value = inputCloseUsername.value = '';
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// ------------ ENDING THE APP CODING ----------------//////////////////////////////////////



// USING MAP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurtoUSD = 1.1;

const movementsUSD = movements.map((mov) => {
  return Math.trunc(mov * eurtoUSD);
});

// console.log(movements);
// console.log(movementsUSD);

// console.log(account1);

/// REDUCE ++++++++++++++++++++++++++++++++++++++

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const bal = movements.reduce((acc, cur, i, arr) => {
  return acc + cur;
}, 0);

// console.log(bal);
