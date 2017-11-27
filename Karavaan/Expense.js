import React from 'react';
import {ExpensePerson} from './ExpensePerson';

export class Expense extends React.Component
{
    constructor(persons, category, date, currency)
    {
        super();
        this.expensePersons = [];
        this.category = category;
        this.date = date;
        this.currency = currency;

        for (i = 0; i < persons.length; i++) {
            this.addPerson(persons[i].name);
        }
    }

    addPerson(name)
    {
        var person = new ExpensePerson(name);
        this.expensePersons[name] = person;
    }

    addPayAmount(name, amount) {
        this.expensePersons[name].setPaid(amount);
    }

    getTotalPaid() {
        amount = 0;
        for (var x in this.expensePersons){
            amount += this.expensePersons[x].getPaid();
        }
        return amount;
    }
}
