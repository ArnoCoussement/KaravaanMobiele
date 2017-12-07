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
        
        if (currencies.length != 0) {
            for (i = 0; i < currencies.length; i++) {
                this.currencies.push(currencies[i].label);
            }
        } else {
            this.currencies = ['EUR'];
        }
    }

/*     constructor(name, currencies = [], persons = [], expenses = []) {
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

        if (persons.length != 0) {
            for (i = 0; i < persons.length; i++) {
                this.persons.push(persons[i].label);
            }
        }

        if (expenses.length != 0) {
            for (i = 0; i < expenses.length; i++) {
                this.expenses.push(expenses[i].label);
            }
        }
    }
 */
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


