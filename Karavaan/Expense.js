import React from 'react';
import {ExpensePerson} from './ExpensePerson';

export class Expense extends React.Component
{
    constructor(persons = [], category, date, currency, splitMethod)
    {
        super();
        this.expensePersons = [];
        this.category = category;
        this.date = date;
        this.currency = currency;
        this.splitMethod = splitMethod;

        for (i = 0; i < persons.length; i++) {
            this.addPerson(persons[i].name);
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

    setDividedEven(amount) {
        var amount = Number(amount);
        amount /= this.expensePersons.length;

        this.expensePersons.forEach( (element) => {
            element.owed = amount;
        })
    }

    dividedEven() {
        var amount = this.getTotalPaid();
        amount /= this.expensePersons.length;

        this.expensePersons.forEach( (element) => {
            element.owed = amount;
        })
    }

    getTotalPaid() {
        var amount = Number(0);
        this.expensePersons.forEach( (element) => {
            amount += Number(element.paid);
        }, this);        
        return amount;
    }
}
