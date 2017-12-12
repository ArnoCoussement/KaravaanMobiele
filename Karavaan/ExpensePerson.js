import React from 'react';

export class ExpensePerson extends React.Component
{
    constructor(id, name, owed = 0, paid = 0)
    {
        super();
        this.id = id;
        this.name = name;
        this.owed = owed;
        this.paid = paid;
    }

    getOwed = () => {
        return String(this.owed);
    }
}
