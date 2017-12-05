import React from 'react';
import {Person} from './Person';
import {Expense} from './Expense';

export class Trip extends React.Component
{
    constructor(name, currencies = [])
    {
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
        var person = new Person(name);
        this.persons.push(person);
    }

    addExpense(category, date, currency) {
        var expense = new Expense(this.persons, category, date, currency);
        this.expenses.push(expense);
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }
}


