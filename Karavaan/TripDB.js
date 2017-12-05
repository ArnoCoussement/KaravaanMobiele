import React from 'react';
import {Trip} from './Trip.js';
import {AsyncStorage} from 'react-native';

export class TripDB
{
    static async createDB() // : Promise<TripDB>
    {

    }

    constructor()
    {
        this.trips = []

        AsyncStorage.getItem('trips').then((x) => {
            
            if (x.length !== 0)
            {
                let items = JSON.parse(x)
                for (var i  =0; i < items.length; i++)
                {
                    console.log(items[i])
                    var trip = makeTripFromRawData(items[i])
                    this.trips.push(trip)
                }

            }
        });
        
    }

    addTrip(name, currencies){
        var trip = new Trip(name, currencies);
        this.trips.push(trip);

        AsyncStorage.setItem('trips', JSON.stringify(this.trips)).then(() => {});
    }

    deleteTrip(name){
        let newTrips = [];
        for (let i = 0; i< this.trips.length; i++){
            if(this.trips[i].name != name){
                newTrips.push(trips[i])
            }
        }
        this.trips = newTrips;
    }

    getTrip(name){
        for(let i =0 ; i < this.trips.length; i++){
            if(this.trips[i].name == name){
                return this.trips[i];
            }
        }
    }

}

function makeTripFromRawData(data)
{
    let trip = new Trip(data.name, data.currencies);
    let result = Object.assign(trip, data);
    return result;
}
