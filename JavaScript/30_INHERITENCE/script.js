'use strict';

const Person = function(firstName,birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function() {
    console.log(2023-this.birthYear);
}

const Student = function(firstName,birthYear,course) {
        Person.call(this,firstName,birthYear);
        this.course = course;
}

// Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

Student.prototype.constructor =  Student;

const mike = new Student('Mike', 1997, 'Computer Science');

mike.introduce();

mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);