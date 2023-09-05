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

  orderDelivery : function ({time, mainIndex, address, starterIndex}) {
    console.log(`ORDER  RECEIVED! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd at ${address} at ${time}`);
}

};

// const {name, openingHours, categories} = restaurant;

// console.log(name);
// console.log(openingHours);
// console.log(categories);

const {name : RestName, openingHours : Time, categories : Tags} = restaurant;

// console.log(RestName);
// console.log(Time);
// console.log(Tags);


// const {menu = [] , starterMenu : starter = []} = restaurant;

// console.log(menu);

// console.log(starter);


// +++++ MUTATING VARIBALE ++++++

// let a = 111;

// let b = 333;

// const obj = {a: 23 , b: 34, c: 89};

// ({a,b} = obj);

// console.log(a , b);


// ++++++++++++++++++++++++++++ NESTED OBJECTS +++++++++++++++++++++++++++++++++++

// const {fri : {open : opening, close : closing}} = Time;

// console.log(opening , closing);


restaurant.orderDelivery({
    time : 22,
    address : 'jph',
    mainIndex : 2,
    starterIndex : 2,
})