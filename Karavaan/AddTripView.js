import React from 'react';
import { View, TextInput, Text, Button, ScrollView, StyleSheet } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';
import {tripdb, currenciesdb} from './App';

import {TouchableOpacity} from 'react-native';
const styles = require('./css/stylesheet.js');

//const codes = [ "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF" ];

//let codes = currenciesdb.getCodes();


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

    selectCurrencyView = {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Enter a name for the trip:</Text>
                <TextInput maxLength={100} style={styles.textInput} placeholder='name' onChangeText={(text) => this.setState({text})}/>
                <Text style={styles.text}>Choose the associated currencies (default: EUR):</Text>
                <ScrollView style={styles.scrollView}>
                    <SelectMultiple
                        items={currenciesdb.getCodes()}
                        selectedItems={this.state.selectedCurrencies}
                        onSelectionsChange={this.onSelectionsChange}/>
                    
                    
                </ScrollView>
                <TouchableOpacity style={styles.button} disabled={this.state.text.trim().length == 0} onPress={() => {
                        tripdb.addTrip(this.state.text, this.state.selectedCurrencies)
                        this.props.navigation.goBack()
                        this.props.navigation.state.params.refresh()
                    }}>
                        <Text style={styles.buttonText}>Add Trip</Text>
                    </TouchableOpacity>
            </View>
        );
    }
}

