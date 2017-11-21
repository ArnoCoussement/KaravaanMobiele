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
        for (let i = 0; i< trips.length; i++){
            if(trips[i].name != name){
                newTrips.push(trips[i])
            }
        }
        this.trips = newTrips;
    }

}
