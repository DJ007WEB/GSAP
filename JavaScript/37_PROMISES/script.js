"use strict";

const lotteryPromise = new Promise(function (resolve, reject) {
 
    console.log('Lottery Draw is going on');

    setTimeout(() => {
        if (Math.random() >= 0.5) {
            resolve("You Win");
          } else {
            reject(new Error('You Lost Money'));
          }
    },2000)
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));


  const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve,seconds*1000);
    })
}

wait(2).then(() => {
    console.log(`I waited for 2 sec`);
    return wait(1);
}).then(() => console.log(`I waited for 1 sec`))



const getPosition = function() {
    return new Promise(function(resolve,reject) {
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
}

getPosition().then((pos) => console.log(pos));