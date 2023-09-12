"use strict";

let arr = ["a", "b", "c", "d", "e"];

// console.log(arr.slice(2));

// slice();
// splice(); ==> Mutate the original array

// reverse(); ==> Mutate the original array

// concat();

// join();

// at('index no');

// break and continue does not work on forEach loop

const currencies = new Map([
  ["USD", "United States Dollar"],
  ["EUR", "EURO"],
  ["GBP", "Pound streling"]
]);

currencies.forEach((values,key,map) => {
    console.log(`${key} : ${values}`);
})
