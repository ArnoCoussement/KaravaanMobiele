import React from 'react';
import {Currency} from './Currency.js';
//import {money} from 'money.js'


export class Currencies extends React.Component
{
    constructor() 
    {
        super();
        this.currencies = [];
        this.codes = [];
        
        
        this.getData();

        console.log(this.currencies)
        for (var item in this.currencies)
        {
            codes.push(item.code)
            
        }
        console.log(this.codes);
    }

    async getData(){
        let out = await fetch('https://api.fixer.io/latest')
        .then((resp) => console.log(resp.json()))
        .then((data) => out = data.rates)
        .then(() => console.log(out))

        this.addCurrenciesFromList(out)
        

    }

    addCurrenciesFromList(list)
    {
        console.log(list);
        let counter = 0;
        for (var element in list)
        {
            console.log(element);
            console.log(list[Object.keys(list)[counter]]);
            let amount = list[Object.keys(list)[counter]];
            counter++;
            let currency = new Currency(element, amount);
            this.currencies.push(currency);
        }
    }

    getCurrencies()
    {
        return this.currencies;
    }

    

}