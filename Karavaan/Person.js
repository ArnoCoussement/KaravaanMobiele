import React from 'react';

export class Person extends React.Component
{
    constructor(id ,name)
    {
        super();
        this.id =id;
        this.name = name;
        this.totalOwed = 0;
        this.totalPaid = 0;
    }
}
