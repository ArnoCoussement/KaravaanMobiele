import React from 'react';
import {Expense} from './Expense';
import {SPLITMETHOD} from './SplitMethods';
import { Picker, View, TextInput, Text, Button } from 'react-native';

export default class AddExpenseView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add an expense`,
    });

    constructor(props)
    {
        super(props);
        this.state = {
            category: 'overnight_stay',
            date: '',
            currency: this.props.navigation.state.params.trip.currencies[0],
            splittingMethod: SPLITMETHOD.OWN_SHARE,
            tripdb: this.props.navigation.state.params.tripdb,
            trip: this.props.navigation.state.params.trip
        };
    }

    render()
    {
        const {navigate} = this.props.navigation;

        currencyPicker = this.props.navigation.state.params.trip.currencies.map( c => {
            return (
                <Picker.Item label={c} value={c}/>
        )});

        nextEvent = () => {
            if(this.state.date == '') {
                alert("Don't forget to fill in a date");
            } else {
                var expense = new Expense( this.props.navigation.state.params.trip.persons, this.state.category, this.state.date, this.state.currency, this.state.splittingMethod);
                navigate("ExpensePaidScreen", {expense: expense, tripdb: this.state.tripdb, trip: this.state.trip});
            }
        }
        
        return (
            <View>
                <Text>Choose a category: {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                    <Picker.Item label="Overnight Stay" value="overnight_stay"/>
                    <Picker.Item label="Transport"      value="transport"/>
                    <Picker.Item label="Activity"       value="activity"/>
                    <Picker.Item label="Food"           value="food"/>
                    <Picker.Item label="Miscellaneous"  value="miscellaneous"/>
                </Picker>
                <Text>Add a date: {this.props.bar}</Text>
                <TextInput placeholder='DD/MM/YYYY' onChangeText={(text) => this.setState({date: text})}/>
                <Text>Choose a currency: {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.currency}
                    onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                    {currencyPicker}
                </Picker>
                <Text>How to split the bill? {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.splittingMethod}
                    onValueChange={(itemValue, itemIndex) => this.setState({splittingMethod: itemValue})}>
                    <Picker.Item label={SPLITMETHOD.OWN_SHARE.name} value={SPLITMETHOD.OWN_SHARE}/>
                    <Picker.Item label={SPLITMETHOD.DIVIDED_EVEN.name} value={SPLITMETHOD.DIVIDED_EVEN}/>
                    <Picker.Item label={SPLITMETHOD.WAY_OF_BILL.name} value={SPLITMETHOD.WAY_OF_BILL}/>
                </Picker>
                <Button title='NEXT' onPress={() => {
                    nextEvent()
                }}/>
            </View>
        );
    }
}