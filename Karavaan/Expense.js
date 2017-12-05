import React from 'react';
import {ExpensePerson} from './ExpensePerson';

export class Expense extends React.Component
{
    constructor(persons, category, date, currency, splitMethod)
    {
        super();
        this.expensePersons = [];
        this.category = category;
        this.date = date;
        this.currency = currency;
        this.splitMethod = splitMethod;

        for (i = 0; i < persons.length; i++) {
            this.addPerson(persons[i].name);
            console.log(`******************** ${this.expensePersons[i].name}: ${this.expensePersons[i].paid}: ${this.expensePersons[i].owed}`);
        }
    }

    addPerson(name) {
        var person = new ExpensePerson(name);
        this.expensePersons.push(person);
    }

    setPayAmount(name, amount) {
        this.expensePersons.forEach( (element) => {
            console.log(`******************** ${name} ?=? ${element.name}`);
            if (element.name == name) {
                console.log(`******************** ${amount}`);
                element.paid = amount;
                console.log(`°°°°°°°°°°°°°°°°° ${element.paid}`);
            }
        }, this);
    }

    getPayAmount(name) {
        this.expensePersons.forEach( (element) => {
            if (element.name == name) {
                return element.paid;
            }
        }, this);        
    }

    getTotalPaid() {
        var amount = 0;
        for (var x in this.expensePersons){
            amount += this.expensePersons[x].getPaid();
        }
        return amount;
    }
}
