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
        var Trip = new Trip(name);
        this.trips.push(Trip);
    }

}
