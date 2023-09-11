'use strict';

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');

    return [first.toUpperCase(), ...others].join(' ');
}


const transformer = function(str, fn) {
    console.log(`Original String: ${str}`);

    console.log(`Transformed String :${fn(str)}`);

    console.log(`Transformed By : ${fn.name}`);
}

transformer('Javascript is the best language', upperFirstWord);
transformer('Javascript is the best language', oneWord);



// const greet = function(greeting) {
//     return function(name) {
//         console.log(`${greeting} ${name}`);
//     }
// }


const greet = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`);
    }
}


const greetHey = greet('hey');

greetHey('milan');


const airIndia = {
    airline : 'Air India',
    code : 'AI',
    bookings : [],
    book(flightNum, name) {
        console.log(`${name} has booked a seat on ${this.airline} and the seat no is ${this.code}${flightNum}`);
        this.bookings.push(`{${this.code}${flightNum}, ${name}}`)
    },
}

airIndia.book(158, 'Milan');

console.log(airIndia.bookings);


const kingFisher = {
    airline : 'king Fisher',
    code : 'KF',
    bookings : []
}


const book = airIndia.book;

book.call(kingFisher, 456, 'jYo');
console.log(kingFisher);

