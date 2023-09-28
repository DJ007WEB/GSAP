'use strict';

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
        return this;
    }

    withdraw(val) {
        this.deposit(-val);
        return this;
    }


    requestLoan(val) {
        if(this.#approveLoan(val)) {
            this.deposit(val);
            return this;
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

acc1.deposit(800).deposit(400).requestLoan(10000).withdraw(4000).withdraw(5000);

console.log(acc1.getMovement());

