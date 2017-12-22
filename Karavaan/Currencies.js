import React from 'react';
import {Currency} from './Currency.js';
//import {money} from 'money.js'


export class Currencies
{
    constructor() 
    {
        this.currencies = [];
        this.codes = [];
        
        this.currencies.push(new Currency('EUR', 1.0));
        //this.currencies.push(new Currency('AAA', 2.0));
        this.codes.push('EUR');
        //this.codes.push('AAA');
        fetch('https://api.fixer.io/latest')
        .then((resp) => resp.json())
        .then((data) => this.addCurrenciesFromList(data.rates))

    }

    addCurrenciesFromList(list)
    {
        //console.log('list: ' + list);
        let counter = 0;
        for (var element in list)
        {
            //console.log('key: ' + element);
            //console.log('value: ' + list[Object.keys(list)[counter]]);
            let amount = list[Object.keys(list)[counter]];
            counter++;
            let currency = new Currency(element, amount);
            this.currencies.push(currency);
            this.codes.push(element);
        }
        //console.log('currencies: ' + this.currencies)
        //console.log('codes: ' + this.codes)
    }

    getCurrencies()
    {
        return this.currencies;
    }

    getCodes()
    {
        return this.codes;
    }

    getRate(code)
    {
        //console.log('code: ' + code)
        for (var i = 0; i < this.currencies.length; ++i)
        {
            //console.log('currency: ' + this.currencies[i])
            if (this.currencies[i].code == code)
            {
                return this.currencies[i].rate;
            }
        }
    }

    convertFromEURTo(amount, code)
    {
        let rate = this.getRate(code);
        return Math.round((amount * rate) * 100) / 100;
    }

    convertToEURFrom(amount, code)
    {
        let rate = this.getRate(code);
        //console.log('rate: ' + rate);
        return Math.round((amount / rate) * 100) / 100;
    }

}