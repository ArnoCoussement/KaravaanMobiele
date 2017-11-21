import Realm from 'realm';

const Realm = require('realm');

const PersonSchema = {
    name: 'Person',
    properties: {
        name: 'string',
        amount: 'double'
    }
}

const TripShema = {
    name: 'Trip',
    properties: {
        name: 'string',
        persons: 'Person[]',
        currency: 'string',
        expenses: 'Expense'
    }
}

const ExpenseSchema = {
    name: 'Expense',
    properties: {
        reason: 'string',
        amount: 'double'
    }
}