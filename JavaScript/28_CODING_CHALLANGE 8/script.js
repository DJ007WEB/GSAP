'use strict';

const Car = function(make,speed) {
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function() {
    console.log(this.speed+10);
}

Car.prototype.break = function() {
    console.log(this.speed-10);
}

const car1 = new Car('bmw', 120);


car1.accelerate();
car1.break()
