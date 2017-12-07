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
                console.log(JSON.stringify(items))
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

    deleteTrip(name){
        let newTrips = [];
        for (let i = 0; i< this.trips.length; i++){
            if(this.trips[i].name != name){
                newTrips.push(trips[i])
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

    addExpenseToTrip(category, date, currency, trip) {
        trip.addExpense(category, date, currency);
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }

    addExpenseToTrip(expense, trip) {
        trip.addExpense(expense);
        AsyncStorage.setItem('trips', JSON.stringify(this.trips));
    }
}

function makeTripFromRawData(data) {
//    AsyncStorage.removeItem('trips');
    let trip = new Trip(data.name, data.currencies);
    let result = Object.assign(trip, data);
    return result;
}