import React from 'react';
import {Person} from './Person';

export class PersonDB extends React.Component
{
    constructor()
    {
        super();
        this.persons = [];
    }

    addPerson(name)
    {
        var person = new Person(name);
        this.persons.push(person);
    }

}
