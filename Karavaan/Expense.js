import React from 'react';
import {ExpensePerson} from './ExpensePerson';

export class Expense extends React.Component
{
    constructor(persons = [], category, date, currency, splitMethod, expensePersons = [])
    {
        super();
        this.expensePersons = [];
        this.category = category;
        this.date = date;
        this.currency = currency;
        this.splitMethod = splitMethod;

        if (persons.length == 0) {
            this.expensePersons = expensePersons;
        } else {
            for (i = 0; i < persons.length; i++) {
                this.addPerson(persons[i].name);
            }
        }
    }

    addPerson(name) {
        var person = new ExpensePerson(name);
        this.expensePersons.push(person);
    }

    setPayAmount(name, amount) {
        this.expensePersons.forEach( (element) => {
            if (element.name == name) {
                element.paid = amount;
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

    setOweAmount(name, amount) {
        this.expensePersons.forEach( (element) => {
            if (element.name == name) {
                element.owed = amount;
            }
        }, this);
    }

    getOweAmount(name) {
        this.expensePersons.forEach( (element) => {
            if (element.name == name) {
                return element.owed;
            }
        }, this);        
    }

    getTotalPaid() {
        var amount = Number(0);
        this.expensePersons.forEach( (element) => {
            amount += Number(element.paid);
        }, this);        
        return amount;
    }
}
