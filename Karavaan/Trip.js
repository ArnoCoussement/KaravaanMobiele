import React from 'react';
import {Person} from './Person';

export class Trip extends React.Component
{
    constructor(name)
    {
        super();
        this.name = name;
        this.currency = "EUR";

        this.persons = [];
    }
    addPerson(name)
    {
        var person = new Person(name);
        this.persons.push(person);
    }
    

}
