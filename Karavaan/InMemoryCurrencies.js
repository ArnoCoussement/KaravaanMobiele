import React from 'react';
import {Currency} from './Currency.js';

export class InMemoryCurencies
{
    constructor()
    {
       // [ "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF" ]
        let currencies = [];
        currencies.push(new Currency('EUR', 1.0));
        currencies.push(new Currency('USD', 1.1766));
        currencies.push(new Currency('JPY', 133.54));
        currencies.push(new Currency('GBP', 0.88068));
        currencies.push(new Currency('AUD', 1.5541));
        currencies.push(new Currency('CAD', 1.5098));
        currencies.push(new Currency('CHF', 1.1671));
    }
}
