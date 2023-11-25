"use strict";
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-01-18T21:31:17.178Z",
    "2023-02-23T07:42:02.383Z",
    "2023-03-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-06-27T17:01:17.194Z",
    "2023-10-01T23:36:17.929Z",
    "2023-10-04T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2023-01-01T13:15:33.035Z",
    "2023-02-30T09:48:16.867Z",
    "2023-03-25T06:04:23.907Z",
    "2023-04-25T14:18:46.235Z",
    "2023-05-05T16:33:06.386Z",
    "2023-06-10T14:43:26.374Z",
    "2023-10-01T18:49:59.371Z",
    "2023-10-04T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

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

// 2 GET THE DATE AND TIME

const getMovDateorDes = function (date, locale) {
  const calcDays = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  };

  const numOfDays = calcDays(date, new Date());

  if (numOfDays === 0) {
    return `Today`;
  }
  if (numOfDays === 1) {
    return `Yesterday`;
  }
  if (numOfDays <= 7) {
    return `${numOfDays} days ago`;
  }

  return new Intl.DateTimeFormat(locale).format(date);
};

// 3 FOTMATTED NUMBER

const fotmatNumbers = function (value, curr, locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: `${curr}`,
  }).format(value);
};

// 4 SETTING TIMER

const setLogOutTimer = function () {
  let time = 60;

  const tick = () => {
    let min = `${Math.floor(time / 60)}`.padStart(2,0);

    let sec = `${Math.floor(time % 60)}`.padStart(2,0);
    labelTimer.textContent = `${min}:${sec}`;

    if(time === 0) {
      clearInterval(timer);

      containerApp.style.opacity = 0;
      labelWelcome.innerHTML = `Log in to get started`;
    }

    time--;
  }

  tick();
  const timer = setInterval(tick, 1000);

  return timer;
 
};

// 5 UPDATE UI

const displayMoveBalSummary = function (acc, sorting = false) {
  containerMovements.innerHTML = "";

  // GETTING THE DATE OF THE LOG IN TIME

  const loginDate = new Date();

  labelDate.textContent = new Intl.DateTimeFormat(currAccount.locale, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(loginDate);

  // SORTING

  const sortedMov = sorting
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // const soertedDate = sorting ? acc.movementsDates.slice().sort((a,b) => a-b) : acc.movementsDates;

  // console.log(soertedDate, sorting);

  // DISPLAYING THE MOVEMENTS
  sortedMov.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // GETTING THE DETAILS OF CORRESPONDING DATES OF THE TRANSACTIONS
    const currDate = new Date(acc.movementsDates[i]);

    const displayDate = getMovDateorDes(currDate, currAccount.locale);

    const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${fotmatNumbers(
        mov,
        currAccount.currency,
        currAccount.locale
      )}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });

  // DISPLAYING THE TOTAL BALANCE
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.innerHTML = `${fotmatNumbers(
    acc.balance,
    currAccount.currency,
    currAccount.locale
  )}`;

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

  labelSumOut.innerHTML = `${Math.floor(withdrawal)}€`;

  // INTEREST
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((dep) => (dep * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumInterest.innerHTML = `${interest.toFixed(2)}€`;

};

// 6 IMPLEMENTING LOG IN

let currAccount, timer;

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

    // TIMER GOES HERE

    if(timer) clearInterval(timer);
    timer = setLogOutTimer();
  }
};

// 7 MONEY TRANSFER

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
    // PUSHING THE DATE AND TIME OF THE TRANSACTIONS
    currAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    displayMoveBalSummary(currAccount);

    // RESETING THE TIMER
    
    clearInterval(timer);
    timer = setLogOutTimer();

    inputTransferTo.value = inputTransferAmount.value = "";
  }
};

// 8 LOAN REQUEST

const loanReq = function (e) {
  e.preventDefault();

  const loanAmo = Number(inputLoanAmount.value);

  if (currAccount.movements.some((mov) => mov > loanAmo * 0.1)) {
    currAccount.movements.push(loanAmo);
    // PUSHING THE DATE AND TIME OF THE TRANSACTIONS
    currAccount.movementsDates.push(new Date().toISOString());
    displayMoveBalSummary(currAccount);

    // RESETING THE TIMER

    clearInterval(timer);
    timer = setLogOutTimer();

    inputLoanAmount.value = "";
  }
};

// 9 CLOSE ACCOUNT

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
