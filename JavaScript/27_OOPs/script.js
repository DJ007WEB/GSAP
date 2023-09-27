'use strict';

const Person = function(firstName,birthYear) {
    // Instance Poperties
    this.firstName =  firstName;
    this.birthYear = birthYear;

    // Never Do this
    // this.calcAge = function() {
    //     console.log(2023-this.birthYear);
    // }
}

const milan = new Person('Milan',1997);

// console.log(milan);

// console.log(milan instanceof Person);

// console.log(Person.prototype);

Person.prototype.calcAge = function() {
    console.log(2023-this.birthYear);
}

Person.prototype.speices = 'Homo Sapience';

milan.calcAge();

console.log(Person.prototype);

console.log(milan.__proto__);
// console.log(Person.prototype);

console.log(Object.prototype);
