import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';


const currencies = [ "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF" ];

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
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.updateData(this.state.text, this.state.selectedCurrencies)
                }}/>
            </View>
        );
    }
}