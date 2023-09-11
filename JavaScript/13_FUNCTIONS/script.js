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

greetHey('milan')

