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

///////////////////////////////////////////////////////////////
/// FUNCTIONS THAT WILL BE NEEDED///////////////////////////////

// DISPLAYING MOVEMENTS FUNCTION
const displayMovments = (accs) => {
  accs.movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
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

  labelSumIn.textContent = `${deposits}€`;

  //   ii) INTERESTS

  const interests = accs.movements
    .filter((mov) => mov > 0)
    .map((depo) => (depo * accs.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((accu, curr) => accu + curr, 0);

  labelSumInterest.textContent = `${interests}€`;

  // iii) WITHDRAWAL

  const withDrawal = accs.movements
    .filter((mov) => mov < 0)
    .reduce((accu, curr) => accu + curr, 0);

  labelSumOut.textContent = `${Math.abs(withDrawal)}€`;

  //  iv) TOTAL BALANCE

  const totalBal = accs.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${totalBal}€`;
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

console.log(accounts);

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
    displayMovments(currentAccount);

    // iv) DISPLAYING SUMMERIES
    calcDisplaySummeries(currentAccount);
  }

  inputLoginUsername.value = inputLoginPin.value = "";

  inputLoginPin.blur();
});
