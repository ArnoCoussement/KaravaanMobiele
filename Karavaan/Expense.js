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
        }
    }

    addPerson(name) {
        var person = new ExpensePerson(name);
        this.expensePersons.push(person);
    }

    setPayAmount(name, amount) {
        this.expensePersons.forEach( (element) => {
            if (element.name == name) {
                element.setPaid(amount);                
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
