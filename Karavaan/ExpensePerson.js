import React from 'react';

export class ExpensePerson extends React.Component
{
    constructor(name)
    {
        super();

        this.name = name;
        this.owed = 0;
        this.paid = 0;
    }

    setOwed(owed) {
        this.owed = owed;
    }

    setPaid(paid) {
        this.paid = paid;
    }
}
