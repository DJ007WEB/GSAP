'use strict';



class Car {
    constructor(name,speed) {
        this.name = name;
        this.speed = speed;
    }

    get speedUs() {
        return this.speed/1.6;
    }

    set speedUs(sp) {
        this.speed = sp*1.6;
    }
}

const  bmw = new Car('BMW',130);

console.log(bmw);

bmw.speedUs = 50;

console.log(bmw);



