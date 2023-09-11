'use strict';

let passenger = 20

const secureBooking = function() {
    let passenger = 30;

    return function() {
        passenger++;
        console.log(passenger);
    }
}

const booker = secureBooking();

booker();
booker();
booker();


let f;

const g = function() {
    const a = 23;

    f = function() {
        console.log(a*2);
    }
}

g();

f();

console.dir(f);