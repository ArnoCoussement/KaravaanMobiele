import React from 'react';

export class ExpensePerson extends React.Component
{
    constructor(name, owed = 0, paid = 0)
    {
        super();

        this.name = name;
        this.owed = owed;
        this.paid = paid;
    }
}
