'use strict';

/*===========================================================================*/
/*================= INHERITENCE WITH CONSTRUCTOR FUNCTION ===================*/
/*===========================================================================*/

// const Person = function(firstName,birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
// }

// Person.prototype.calcAge = function() {
//     console.log(2023-this.birthYear);
// }

// const Student = function(firstName,birthYear,course) {
//         Person.call(this,firstName,birthYear);
//         this.course = course;
// }

// // Linking Prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function() {
//     console.log(`My name is ${this.firstName} and I study ${this.course}`);
// }

// Student.prototype.constructor =  Student;

// const mike = new Student('Mike', 1997, 'Computer Science');

// mike.introduce();

// mike.calcAge();

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);



/*===========================================================================*/
/*================= INHERITENCE WITH CLASSES ===================*/
/*===========================================================================*/


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

// class StudentCl extends PersonCl {
//     constructor(fullName,birthYear,course) {
//         super(fullName,birthYear);
//         this.course = course;
//     }

//     introduce() {
//         console.log(`I am ${this.fullName} and I study ${this.course}`);
//     }
// }

// // const martha = new StudentCl('Martha Jones',1997)
// const martha = new StudentCl('Martha Jones',1997,'Computer Science');

// console.log(martha);

// martha.introduce();



/*===========================================================================*/
/*================= INHERITENCE WITH OBJECT.create ===================*/
/*===========================================================================*/

// const PersonProto = {
//     calcAge() {
//         console.log(2023-this.birthYear);
//     },

//     init(firstName,birthYear) {
//         this.firstName = firstName;
//         this.birthYear = birthYear;
//     },
// }

// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function(firstName,birthYear,course) {
//     PersonProto.init.call(this,firstName,birthYear);
//     this.course = course;
// }

// StudentProto.intoduce = function() {
//     console.log(`Hey, I am ${this.firstName}`);
// }

// const jay = Object.create(StudentProto);

// jay.init('Jay',2000, 'computer science');

// console.log(jay);




/*===========================================================================*/
/*================= ANOTHER EXAMPLE OF CLASS ===============================*/
/*=========================================================================*/


// 1. Public Fileds
// 2. Private Fileds
// 3. Public Mathods
// 4. Private Mathods
// 5. There is also static version static version is not for the instances

class Account {
    // PUBLIC FIELDS for instances
    locale = navigator.language;

    // PRIVATE FILEDS
    #movements = [];
    #pin;

    constructor(owner,currency,pin) {
        this.owner = owner;
        this.currency = currency;
        //PROTECTED PROPERTY
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
    }

    

    // PUBLIC METHODS / INTERFACE
    getMovement() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }


    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
        }
    }

    // PRIVATE METHODS
    #approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Milan','RUPEE',1111);

acc1.deposit(500);
acc1.withdraw(300);

console.log(acc1);

console.log(acc1.getMovement());

// acc1.requestLoan(500);

// console.log(acc1);

// console.log(acc1.#movements);