'use strict';


const Car = function(brand,currSpeed) {
    this.brand = brand;
    this.currSpeed = currSpeed;
}

Car.prototype.accelerate = function() {
    this.currSpeed += 10;
}

Car.prototype.break = function() {
    this.currSpeed -= 10;
    console.log(`${this.brand} is going at ${this.currSpeed}`);
}

const EVcar = function(brand,currSpeed,charge) {
        Car.call(this,brand,currSpeed);
        this.charge = charge;
}

EVcar.prototype = Object.create(Car.prototype);

EVcar.prototype.chargeBattery = function(chargeTo) {
    this.charge =  chargeTo;
}

EVcar.prototype.accelerate = function() {
    this.currSpeed += 20;
    this.charge--;
    console.log(`${this.brand} is going at ${this.currSpeed} with a charge of ${this.charge}`);
}

const tesla = new EVcar('Tesla',140,25);

tesla.chargeBattery(50);

tesla.accelerate()