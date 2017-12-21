import React from 'react';
import {Person} from './Person';
import {Expense} from './Expense';
import {Transaction} from './Transaction';

export class Trip extends React.Component
{
    constructor(name, currencies = []) {
        super();
        this.name = name;
        this.currencies = [];
        this.persons = [];
        this.expenses = [];
        this.transactions = [];
        this.counter = 0;
        
        if (currencies.length != 0) {
            let defaultFound = false;
            for (i = 0; i < currencies.length; i++) {
                this.currencies.push(currencies[i].label);
                if (currencies[i].label == 'EUR')
                {
                    defaultFound = true;
                }
            }
            if (!defaultFound)
            {
                this.currencies.push('EUR');
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

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }
}


