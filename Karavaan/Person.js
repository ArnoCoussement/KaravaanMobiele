import React from 'react';

export class Person extends React.Component
{
    constructor(name)
    {
        super();
        
        this.name = name;
        this.totalOwed = 0;
        this.totalPaid = 0;
    }
}
