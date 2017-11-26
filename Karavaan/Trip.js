import React from 'react';
import {Person} from './Person';
import {Expense} from './Expense';

export class Trip extends React.Component
{
    constructor(name)
    {
        super();
        this.name = name;
        this.currency = ["EUR"];

        this.persons = [];
        this.expenses = [];
    }

    addPerson(name)
    {
        var person = new Person(name);
        this.persons.push(person);
    }

    addExpense(category, date/*, currency*/) {
        var expense = new Expense(this.persons, category, date, this.currency);
        this.expenses.push(expense);
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }
}
