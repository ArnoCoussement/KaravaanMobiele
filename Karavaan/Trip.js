import React from 'react';
import {Person} from './Person';
import {Expense} from './Expense';

let counter = 0;
export class Trip extends React.Component
{
    constructor(name, currencies = []) {
        super();
        this.name = name;
        this.currencies = [];
        this.persons = [];
        this.expenses = [];
        
        if (currencies.length != 0) {
            for (i = 0; i < currencies.length; i++) {
                this.currencies.push(currencies[i].label);
            }
        } else {
            this.currencies = ['EUR'];
        }
    }

    addPerson(name) {
        var person = new Person(counter, name);
        this.persons.push(person);
        counter++;
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }
}


