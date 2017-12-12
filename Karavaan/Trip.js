import React from 'react';
import {Person} from './Person';
import {Expense} from './Expense';

export class Trip extends React.Component
{
    constructor(name, currencies = []) {
        super();
        this.name = name;
        this.currencies = [];
        this.persons = [];
        this.expenses = [];
        this.counter = 0;
        
        if (currencies.length != 0) {
            for (i = 0; i < currencies.length; i++) {
                this.currencies.push(currencies[i].label);
            }
        } else {
            this.currencies = ['EUR'];
        }
    }

    addPerson(name) {
        var person = new Person(this.counter, name);
        this.persons.push(person);
        this.counter++;
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }
}


