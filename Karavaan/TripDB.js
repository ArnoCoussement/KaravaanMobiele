import React from 'react';
import {Trip} from './Trip';
import {Person} from './Person';
import {Expense} from './Expense';
import {ExpensePerson} from './ExpensePerson';
import {AsyncStorage} from 'react-native';

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

    addPersonToTrip(name, trip) {
        trip.addPerson(name);
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    addExpenseToTrip(expense, trip) {
        trip.addExpense(expense);

         expense.expensePersons.forEach( (p1) => {
            trip.persons.forEach( (p2) => {
                if(p1.id == p2.id) {
                    p2.totalPaid += Number(p1.paid);
                    p2.totalOwed += Number(p1.owed);
                }
            }, this);
        }, this);
 
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }
}

function makeTripFromRawData(data) {
//    AsyncStorage.removeItem('trips');
    let trip = new Trip(data.name, data.currencies);
    let result = Object.assign(trip, data);
    return result;
}