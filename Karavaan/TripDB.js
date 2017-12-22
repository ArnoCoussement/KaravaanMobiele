import React from 'react';
import {Trip} from './Trip';
import {Person} from './Person';
import {Expense} from './Expense';
import {ExpensePerson} from './ExpensePerson';
import {AsyncStorage} from 'react-native';
import {currenciesdb} from './App'

export class TripDB
{
    // : Promise<TripDB>
    static async createDB() {}

    constructor() {
        this.trips = []

        AsyncStorage.getItem('trips').then((x) => {
            
            if (x.length !== 0)
            {
                let items = JSON.parse(x)
                for (var i  =0; i < items.length; i++)
                {
                    var trip = makeTripFromRawData(items[i])
                    this.trips.push(trip)
                }

            }
        });
    }

    addTrip(name, currencies){
        var trip = new Trip(name, currencies);
        this.trips.push(trip);

        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    deleteTrip(trip) {
        let newTrips = [];
        for (let i = 0; i< this.trips.length; i++){
            if(this.trips[i] != trip){
                newTrips.push(this.trips[i])
            }
        }
        this.trips = newTrips;

        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    getTrip(name){
        for(let i =0 ; i < this.trips.length; i++){
            if(this.trips[i].name == name){
                return this.trips[i];
            }
        }
    }



    /******************************
     *          PERSONS           *
     ******************************/

    addPersonToTrip(name, trip) {
        trip.addPerson(name);
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    getPersonNameFromTripById(tripName, id) {
        var trip = this.getTrip(tripName);
        console.log(`------ ${tripName} ------ ${id} ------`);
        var result = trip.persons.find( (element) => element.id === id ).name;
        return result;
        
       // trip.persons.forEach((element) => {
       //     if (element.id == id) {
       //         console.log(`99999999 ${element.name} 99999`);
       //         return element.name;
       //     }
       // }, this);
    }



    /******************************
     *        TRANSACTIONS        *
     ******************************/

    addTransactionToTrip(transaction, trip) {
        trip.persons.forEach( (pers) => {
            if (pers.id == transaction.from) {
                let paid = Number(transaction.amount);
                paid = currenciesdb.convertToEURFrom(paid, transaction.currency);
                pers.totalPaid += paid;
            } else if (pers.id == transaction.to) {
                let owed = Number(transaction.amount);
                owed = currenciesdb.convertToEURFrom(owed, transaction.currency);
                pers.totalOwed += owed;
            }
        }, this);

        trip.addTransaction(transaction);
        
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    getTransactionsFromTrip(name) {
        for(let i =0 ; i < this.trips.length; i++){
            if(this.trips[i].name == name){
                var transactionsCopy = [];
                this.trips[i].transactions.forEach(trans => {
                    var name1 = this.getPersonNameFromTripById(name, trans.from);
                    var name2 = this.getPersonNameFromTripById(name, trans.to);

                    transactionsCopy.push({from: name1, to: name2, date: trans.date, amount: trans.amount, currency: trans.currency});
                }, this);

                transactionsCopy.sort(function(trans1, trans2) {
                    var date1 = trans1.date.split("/")[0];
                    var date2 = trans2.date.split("/")[0];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })
                transactionsCopy.sort(function(trans1, trans2) {
                    var date1 = trans1.date.split("/")[1];
                    var date2 = trans2.date.split("/")[1];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })
                transactionsCopy.sort(function(trans1, trans2) {
                    var date1 = trans1.date.split("/")[2];
                    var date2 = trans2.date.split("/")[2];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })

                return transactionsCopy;
            }
        }
    }

    getTransactionsByPerson(tripName) {
        var transByPers = {};
        //console.log(`------------------- ${tripName} ---------------`);
        var transactions = this.getTransactionsFromTrip(tripName);
        for( var i = 0; i < transactions.length; i++){
            //console.log(`------------- ${transactions[i].from} ---------------`);
        }
        transactions.forEach( (trans) => {
            if (!(trans.from in transByPers)) {
                transByPers[trans.from] = {transactions:[]};
            }

            transByPers[trans.from].transactions.push({from:trans.from, to:trans.to, date:trans.date, amount:trans.amount, currency:trans.currency});
        }, this);
       // console.log(`------------------- ${transByPers["Dries"]} -------------------`);
        return transByPers;
    }




    /******************************
     *          EXPENSES          *
     ******************************/

    addExpenseToTrip(expense, trip) {
        trip.addExpense(expense);

         expense.expensePersons.forEach( (p1) => {
            trip.persons.forEach( (p2) => {
                if(p1.id == p2.id) {
                    let paid = Number(p1.paid);
                    paid = currenciesdb.convertToEURFrom(paid, expense.currency);
                    p2.totalPaid += paid;
                    let owed = Number(p1.owed);
                    owed = currenciesdb.convertToEURFrom(owed, expense.currency);
                    p2.totalOwed += owed;
                }
            }, this);
        }, this);
 
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    getExpensesFromTrip(name) {
        for(let i =0 ; i < this.trips.length; i++){
            if(this.trips[i].name == name){
                var expensesCopy = this.trips[i].expenses;
                expensesCopy.sort(function(exp1, exp2) {
                    var date1 = exp1.date.split("/")[0];
                    var date2 = exp2.date.split("/")[0];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })
                expensesCopy.sort(function(exp1, exp2) {
                    var date1 = exp1.date.split("/")[1];
                    var date2 = exp2.date.split("/")[1];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })
                expensesCopy.sort(function(exp1, exp2) {
                    var date1 = exp1.date.split("/")[2];
                    var date2 = exp2.date.split("/")[2];
                    
                    return date1>date2?1:date1<date2?-1:0;
                })
                return expensesCopy;
            }
        }
    }

    getExpensesByCategory(tripName) {
        var expByCat = {};

        var expenses = this.getExpensesFromTrip(tripName);

        expenses.forEach( (exp) => {
            if (!(exp.category in expByCat)) {
                expByCat[exp.category] = [];
            }
            expByCat[exp.category].push(exp);
        }, this);

        return expByCat;
    }

    getExpensesByCategoryPerPerson(tripName) {
        var expByCat = {};

        var expenses = this.getExpensesFromTrip(tripName);
        
        expenses.forEach( (exp) => {
            exp.expensePersons.forEach((pers) => {
                if (!(exp.category in expByCat)) {
                    expByCat[exp.category] = {};
                }
                if (!(pers.id in expByCat[exp.category])) {
                    expByCat[exp.category][pers.id] = {name: pers.name, paid: 0, owed: 0};
                }
                expByCat[exp.category][pers.id].paid += currenciesdb.convertToEURFrom(Number(pers.paid), exp.currency);
                expByCat[exp.category][pers.id].owed += currenciesdb.convertToEURFrom(Number(pers.owed), exp.currency);
        }, this);
        }, this);

        return expByCat;
    }

    getExpensesByPersonPerDay(tripName) {
        var expByPers = {};

        var expenses = this.getExpensesFromTrip(tripName);
        
        expenses.forEach( (exp) => {
            exp.expensePersons.forEach((pers) => {
                if (!(pers.id in expByPers)) {
                    expByPers[pers.id] = {name:pers.name, dates:{}};
                }
                if (!(exp.date in expByPers[pers.id].dates)) {
                    expByPers[pers.id].dates[exp.date] = [];
                }
                expByPers[pers.id].dates[exp.date].push({category:exp.category, paid:pers.paid, owed:pers.owed, currency:exp.currency});
            }, this);
        }, this);

        return expByPers;
    }

/*     deleteExpenseFromTrip(expense, name) {
        let newExpenses = [];

        var trip = this.getTrip(name);
        for (let i=0; i < trip.expenses.length; i++) {
            if (trip.expenses[i] != expense) {
                newExpenses.push(trip.expenses[i]);
            }
        }
        expense.expensePersons.forEach( (p1) => {
            trip.persons.forEach( (p2) => {
                if(p1.id == p2.id) {
                    console.log(p1.paid);
                    p2.totalPaid -= Number(currenciesdb.convertToEURFrom(p1.paid, expense.currency));
                    p2.totalOwed -= Number(currenciesdb.convertToEURFrom(p1.owed, expense.currency));
                }
            }, this);
        }, this);
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));        
    }
*/
}

function makeTripFromRawData(data) {
    let trip = new Trip(data.name, data.currencies);
    let result = Object.assign(trip, data);
    return result;
}