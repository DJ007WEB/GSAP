'use strict';


// TO MUTATE ORIGINAL ARRAY ==> push, unshift, pop, shift, splice, reverse, sort, fill

// TO CREATE A NEW ARRAY ==> map, filter, slice, concat, flat, flatmap

// TO FIND/GET INDEX ==> indexOf , findIndex

// TO FIND/GET THE ELEMENT ==> find

// TO KNOW IF AN ELEMENT IS PRESENT IN THE ARRAY ==> include, some, every

// TO CREATE A NEW STRING FFROM AN ARRAY ==> join

// TO TRANSFORM VALUE ==> reduce

// TO LOOP ARRAY ==> forEach


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



  // EX --- 1

  const bankDepositSum = accounts.map((acc) => acc.movements).flat().filter((amo) => amo > 0).reduce((acc,amo) => acc + amo,0);


  console.log(bankDepositSum);

  // EX --- 2

  const numofdeposit1000 = accounts.flatMap((acc) => acc.movements).reduce((acc,cur) => (cur >= 1000 ? ++acc : acc), 0);


  console.log(numofdeposit1000);


  // EX --- 3

  const sums = accounts.flatMap((acc) => acc.movements).reduce((accu, curr) => {
    //    curr > 0 ? accu.deposits += curr : accu.withdrawals += Math.abs(curr);
    accu[curr > 0 ? 'deposits' : 'withdrawals'] += Math.abs(curr);
       return accu; 
}, {deposits:0,withdrawals:0});

console.log(sums);

