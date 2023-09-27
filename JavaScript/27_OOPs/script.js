'use strict';

// const Person = function(firstName,birthYear) {
//     // Instance Poperties
//     this.firstName =  firstName;
//     this.birthYear = birthYear;

//     // Never Do this
//     // this.calcAge = function() {
//     //     console.log(2023-this.birthYear);
//     // }
// }

// const milan = new Person('Milan',1997);

// console.log(milan);

// console.log(milan instanceof Person);

// console.log(Person.prototype);

// Person.prototype.calcAge = function() {
//     console.log(2023-this.birthYear);
// }

// Person.prototype.speices = 'Homo Sapience';

// milan.calcAge();

// console.dir(Person);

// console.log(milan.__proto__);
// console.log(Person.prototype);

// console.log(Object.prototype === Person.__proto__.__proto__);


/*************************************************/
/*  CLASSES   */
/*************************************************/

// class PersonCl {
//     constructor(firstName,birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     }

//     // Methods will be added to prototype propertie of this PersonCl

//     calcAge() {
//         console.log(2023 - this.birthYear);
//     }
// }

// const milan = new PersonCl('Milan',1997);

// console.log(milan);

// milan.calcAge();

// PersonCl.prototype.greet = function() {
//     alert('Hello');
    
// }

// milan.greet();



/*************************************************/
/*  SETTER AND GETTER   */
/*************************************************/

// const account = {
//     owner: 'Milan',
//     movements: [200,530,120,300],

//     get latest() {
//         return this.movements.slice(-1).pop();
//     },

//     set latest(mov) {
//         this.movements.push(mov);
//     }
// }

// // console.log(account.latest);

// account.latest = 50;

// // console.log(account.movements);


// class PersonCl {
//     constructor(fullName,birthYear) {
//         this.fullName = fullName;
//         this.birthYear = birthYear;
//     }

//     // Methods will be added to prototype propertie of this PersonCl

//     calcAge() {
//         console.log(2023 - this.birthYear);
//     }

//     get age() {
//         return 2023-this.birthYear;
//     }

//     // WHEN WE TRY TO SET A PROPERTY THAT ALREADY EXISTS

//     set fullName(name) {
//         if(name.includes(' ')) this._fullName =  name;
//         else alert('Given Name is not Full');
//     }

//     get fullName() {
//         return this._fullName;
//     }

//     // Static method .

//     static hey() {
//         console.log(`Hola horibol`);
//     }
// }

// const milan = new PersonCl('Milan Dutta',1997);

// PersonCl.hey();

// console.log(milan.fullName);



/*************************************************/
/*  Object.create()   */
/*************************************************/


const PersonProto = {
    calcAge() {
        console.log(2023-this.birthYear);
    },

    details(firstName,birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const milan = Object.create(PersonProto);

// milan.firstName = 'Milan';
// milan.birthYear = 1997;

milan.details('Milan',1997);

console.log(milan.__proto__);
milan.calcAge();