"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ time, mainIndex, address, starterIndex }) {
    console.log(
      `ORDER  RECEIVED! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd at ${address} at ${time}`
    );
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1} , ${ing2} and ${ing3}`);
  }
};


// SPREAD Because on the right side of '=' because spread will unpack the items

const arr = [1,2,...[3,4]];

console.log(arr);

// REST Because on the left side of '=' because rest will pack the items

const [a,b,...others] = [1,2,3,4,5,6,7,89];

// console.log(a);
// console.log(b);
// console.log(others);


const addNum = function(...numbers) {
    console.log(numbers);
}

addNum(2,3);
addNum(2,3,4,5,6);
addNum(2,3,4,5,6,7,8,9,10,15,13);