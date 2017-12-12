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
        this.sharedAmount = 0;

        for (i = 0; i < persons.length; i++) {
            this.addPerson(persons[i].id, persons[i].name);
        }
    }

    addPerson(id, name) {
        var person = new ExpensePerson(id, name);
        this.expensePersons.push(person);
    }

    setPayAmount(id, amount) {
        this.expensePersons.forEach( (element) => {
            if (element.id == id) {
                element.paid = amount;
            }
        }, this);
    }

    getPayAmount(id) {
        this.expensePersons.forEach( (element) => {
            if (element.id == id) {
                return element.paid;
            }
        }, this);        
    }

    setOweAmount(id, amount) {
        this.expensePersons.forEach( (element) => {
            if (element.id == id) {
                element.owed = amount;
            }
        }, this);
    }

    getOweAmount(id) {
        this.expensePersons.forEach( (element) => {
            if (element.id == id) {
                return element.owed;
            }
        }, this);        
    }

    calculateOwed() {
        var amount = Number(this.sharedAmount);
        amount /= this.expensePersons.length;

        this.expensePersons.forEach( (element) => {
            var temp = Number(element.owed) + amount;
            element.owed = temp;
        })
    }

    divideEvenly() {
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
