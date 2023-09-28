'use strict';


class Car {
    constructor(brand,speed) {
        this.brand = brand;
        this.speed = speed;
    }

    acclerate() {
        this.speed += 20;
        return this;
    }

    break() {
        this.speed -= 10;
        return this;
    }
}

class EVCar extends Car {

    #charge;

    constructor(brand,speed,charge) {
        super(brand,speed);

        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }

    acclerate() {
        this.speed += 30;
        this.#charge--;
        console.log(`${this.brand} is going at ${this.speed} km/h, with a charge of ${this.#charge}`);
        return this;
    }
}


const rivian = new EVCar('Audi',120,23);

rivian.acclerate().acclerate().break().acclerate().break().chargeBattery(50);

console.log(rivian);