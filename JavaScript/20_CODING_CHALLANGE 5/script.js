'use strict';



const checkDogs = function(juliaDogs, kateDogs) {

    const juliaDogsCopy = juliaDogs.slice();

    const correctedJuliaDogs = juliaDogsCopy.slice(1,3);

    const dogs = correctedJuliaDogs.concat(kateDogs);

    dogs.forEach((d,i) => {
        if(d >= 3) {
            console.log(`Dog number ${i+1} is an adult, and is ${d} years old`);
        } else {
            console.log(`Dog number ${i+1} is still a puppy 🐶`);
        }
    })

};


checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);
