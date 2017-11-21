import React from 'react';

export class Trip extends React.Component
{
    constructor(name)
    {
        super();
        this.name = name;
        this.currency = "EUR";
        this.persons = [];
    }

}
