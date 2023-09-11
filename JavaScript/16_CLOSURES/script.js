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