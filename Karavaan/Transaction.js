import React from 'react';

export class Transaction extends React.Component
{
    constructor(from, to, date, amount, currency)
    {
        super();
        this.from = from;
        this.to = to;
        this.date = date;
        this.amount = amount;
        this.currency = currency;
    }
}
