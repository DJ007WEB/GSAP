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

// 1 CREATE USERNAME

const userName = function (accs) {
  accs.forEach((accou) => {
    accou.userName = accou.owner
      .toLowerCase()
      .split(" ")
      .map((eac) => eac[0])
      .join("");
  });
};

userName(accounts);

// 2 UPDATE UI

const displayMoveBalSummary = function (acc, sorting = false) {
  containerMovements.innerHTML = "";

  // SORTING

  const sortedMov = sorting
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // DISPLAYING THE MOVEMENTS
  sortedMov.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });

  // DISPLAYING THE TOTAL BALANCE
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.innerHTML = `${acc.balance}€`;

  // DISPLAYING THE SUMMARY BALANCE
  // DEPOSITS
  const deposit = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.innerHTML = `${deposit}€`;

  // WITHDRAWAL
  const withdrawal = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.innerHTML = `${withdrawal}€`;

  // INTEREST
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.innerHTML = `${interest}€`;
};

// 3 IMPLEMENTING LOG IN

let currAccount;

const checkLogIn = function (e) {
  e.preventDefault();

  currAccount = accounts.find(
    (accou) => accou.userName === inputLoginUsername.value
  );

  if (currAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;

    labelWelcome.innerHTML = `Good Morning, ${currAccount.owner
      .split(" ")
      .at(0)}!`;

    inputLoginUsername.value = inputLoginPin.value = "";

    inputLoginPin.blur();

    displayMoveBalSummary(currAccount);
  }
};

// 4 MONEY TRANSFER

const transferMoney = function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  const transAmount = Number(inputTransferAmount.value);

  if (
    receiverAcc &&
    currAccount.userName !== receiverAcc?.userName &&
    transAmount > 0 &&
    transAmount <= currAccount.balance
  ) {
    currAccount.movements.push(-transAmount);
    receiverAcc.movements.push(transAmount);

    displayMoveBalSummary(currAccount);

    inputTransferTo.value = inputTransferAmount.value = "";
  }
};

// 5 LOAN REQUEST

const loanReq = function (e) {
  e.preventDefault();

  const loanAmo = Number(inputLoanAmount.value);

  if (currAccount.movements.some((mov) => mov > loanAmo * 0.1)) {
    currAccount.movements.push(loanAmo);
    displayMoveBalSummary(currAccount);

    inputLoanAmount.value = "";
  }
};

// 6 CLOSE ACCOUNT

const closeAcc = function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currAccount.userName &&
    Number(inputClosePin.value) === currAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currAccount.userName
    );

    inputCloseUsername.value = inputClosePin.value = "";

    accounts.splice(index, 1);

    labelWelcome.innerHTML = `Log in to get started`;

    containerApp.style.opacity = 0;
  }
};

//////////////////////////////////////////////////
///  ACTIONS
/////////////////////////////////////////////////

// LOG IN BUTTON
btnLogin.addEventListener("click", checkLogIn);

// TRANSFER MONEY BUTTON

btnTransfer.addEventListener("click", transferMoney);

// LOAN REQUEST BUTTON

btnLoan.addEventListener("click", loanReq);

// CLOSE ACCOUNT BUTTON

btnClose.addEventListener("click", closeAcc);

// SORTING BUTTON

let sortState = false;

btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMoveBalSummary(currAccount, !sortState);
  sortState = !sortState;
});
