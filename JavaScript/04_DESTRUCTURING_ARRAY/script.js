'use strict';


const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    order : function(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex] , this.mainMenu[mainIndex]];
    }
  
    // openingHours: {
    //   thu: {
    //     open: 12,
    //     close: 22,
    //   },
    //   fri: {
    //     open: 11,
    //     close: 23,
    //   },
    //   sat: {
    //     open: 0, // Open 24 hours
    //     close: 24,
    //   },
    // },
  };

const arr = [1,2,3];

const [x,y,z] = arr;

// console.log(x,y,z);

// console.log(arr);

// const [first, second] = restaurant.categories;

// console.log(first, second);

// const [first,,third] = restaurant.categories;

// console.log(first, third);

// ++++++++++++++++++++++++++ SWITICHING VARIABLES ++++++++++++++++++

// let [main, secondary] = restaurant.categories;

// console.log(main,secondary);

// [main, secondary] = [secondary, main];

// console.log(main,secondary);


// const [starter, mainCourse] = restaurant.order(2,0);

// console.log(starter, mainCourse);

// const nested = [2,3,[8,9]];

// const [i,,j] = nested;


// console.log(i,j);

// const [i,,[j,k]] = nested;

// console.log(i,j,k);

// const [p = 1, q = 1, r = 1] = [8,9];

// console.log(p,q,r);

// const [p = 1, q = 1, r = 1] = [8,];

// console.log(p,q,r);

// const [p = 1, q = 1, r = 1] = [8,9,5];

// console.log(p,q,r);



