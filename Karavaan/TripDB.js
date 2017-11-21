import React from 'react';
import {Trip} from './Trip';

export class TripDB extends React.Component
{
    constructor()
    {
        super();

        this.trips = [];
    }

    addTrip(name){
        var trip = new Trip(name);
        this.trips.push(trip);
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
