import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {tripdb} from './App';
import {Currencies} from './Currencies'

const currencies = [ "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF" ];

//let currenciesDB = new Currencies();
//let currencies = currenciesDB.currencies;
//let codes = currenciesDB.codes;


export default class AddTripView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add A NEW Trip`,
    });

    constructor(props)
    {
        super(props);
        this.state = { text: '', selectedCurrencies: [] };
    }
    
    onSelectionsChange = (selection) => {
        this.setState({ selectedCurrencies: selection });
    }

    render() {
        return (
            <View>
                <Text>Enter a name for the trip:</Text>
                <TextInput placeholder='name' onChangeText={(text) => this.setState({text})}/>
                <Text>Choose the associated currencies (default: EUR):</Text>
                <SelectMultiple
                    items={currencies}
                    selectedItems={this.state.selectedCurrencies}
                    onSelectionsChange={this.onSelectionsChange}/>
                <Button title='Add Trip' onPress={() => {
                    tripdb.addTrip(this.state.text, this.state.selectedCurrencies)
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.refresh()
                }}/>
            </View>
        );
    }
}