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

///////////////////////////////////////////////////////////////
/// FUNCTIONS THAT WILL BE NEEDED///////////////////////////////

// DISPLAYING MOVEMENTS FUNCTION
const displayMovments = (accs, sorted = false) => {
  const movs = sorted
    ? accs.movements.slice().sort((a, b) => a - b)
    : accs.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// CALCULATING AND DISPLAYING DEPOSITS, WITHDRAW AND INTEREST FUNCTION
const calcDisplaySummeries = (accs) => {
  // i) DEPOSITS

  const deposits = accs.movements
    .filter((mov) => mov > 0)
    .reduce((accu, depo) => accu + depo, 0);

  console.log(deposits);

  labelSumIn.textContent = `${deposits.toFixed(2)}€`;

  //   ii) INTERESTS

  const interests = accs.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * accs.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((accu, curr) => accu + curr, 0);

  labelSumInterest.textContent = `${interests.toFixed(2)}€`;

  // iii) WITHDRAWAL

  const withDrawal = accs.movements
    .filter((mov) => mov < 0)
    .reduce((accu, curr) => accu + curr, 0);

  labelSumOut.textContent = `${Math.abs(withDrawal).toFixed(2)}€`;

  //  iv) TOTAL BALANCE

  accs.totalBalance = accs.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${accs.totalBalance.toFixed(2)}€`;
};

// UPDATING UI

const updateUI = (accs) => {
  displayMovments(accs);

  // iv) DISPLAYING SUMMERIES
  calcDisplaySummeries(accs);
};
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// 01 CREATING USERNAME ///////////////////////////////////////////////////////////////////////////////

const createUserName = (accs) => {
  accs.forEach((acc, i) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((el) => el[0])
      .join("");
  });
};

createUserName(accounts);

// 02 IMPLEMENTING LOG IN ///////////////////////////////////////////////////////////////////////////

let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });

  if (currentAccount?.pin === +inputLoginPin.value) {
    // i) WELCOME MESSAGE
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}`;
    //  ii) PIN VALID THEN SHOWING UI
    containerApp.style.opacity = 100;

    // iii) DISPLAYING MOVEMENTS
    updateUI(currentAccount);
  }

  inputLoginUsername.value = inputLoginPin.value = "";

  inputLoginPin.blur();
});

// 03 ENABLING TRANSFERRING FACILITY

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();

  const transferringTo = accounts.find(
    (accs) => accs.username === inputTransferTo.value
  );

  const transferringAmount = Math.floor(+inputTransferAmount.value);

  if (
    transferringAmount > 0 &&
    transferringAmount <= currentAccount.totalBalance &&
    transferringTo &&
    transferringTo.value !== currentAccount.username
  ) {
    transferringTo.movements.push(transferringAmount);
    currentAccount.movements.push(-transferringAmount);

    updateUI(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = "";

    inputTransferAmount.blur();
  }
});

// 04 ENABLING LOAN FACILITY

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    +inputLoanAmount.value > 0 &&
    currentAccount.movements.some((mov) => mov > +inputLoanAmount.value * 0.1)
  ) {
    currentAccount.movements.push(Math.floor(+inputLoanAmount.value));

    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";

  inputLoanAmount.blur();
});

// 05 ENABLING ACCOUNT DELETE FACILITY

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const indexDelete = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    console.log(indexDelete);

    accounts.splice(indexDelete, 1);

    containerApp.style.opacity = 0;

    labelWelcome.textContent = `Log in to get started`;
  }

  inputCloseUsername.value = inputClosePin.value = "";

  inputClosePin.blur();
});

// 06 ENABLING THE SORTING FACILITY

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();

  displayMovments(currentAccount, !sorted);

  sorted = !sorted;
});
