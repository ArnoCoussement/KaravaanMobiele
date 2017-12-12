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
            trip: this.props.navigation.state.params.trip,
            key: this.props.navigation.state.key
        };
    }

    validDateFormat = () => {
        var re = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
        console.log(`€€€€€€€€€€€€€€€€€€€€ ${re.test(this.state.date)}`)
        if (!re.test(this.state.date)) {
            return false;
        }
        return true;
    }

    validDate = () => {
        var res = this.state.date.split("/");
        
        var day = Number(res[0]);
        var month = Number(res[1]);
        var year = Number(res[2]);

        switch (month) {
            case 2:
                if (day > 29 || day < 1) {
                    return false;
                } else if (day == 29) {
                    if (res[2] % 4 == 0) {
                        if (res[2] % 100 == 0) {
                            if (res[2] % 400 != 0) {
                                return false;
                            }
                        }
                    } else {
                        return false;
                    }
                }
                break;
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                if (day > 31 || day < 1) {
                    return false;
                }
                break;
            case 4: case 6: case 9: case 11:
                if (day > 30 || day < 1) {
                    return false;
                }
                break;
            default:
                return false;
                break;
        }
        return true;
    }

    render()
    {
        const {navigate} = this.props.navigation;

        currencyPicker = this.props.navigation.state.params.trip.currencies.map( c => {
            return (
                <Picker.Item label={c} value={c}/>
        )});

        nextEvent = () => {
            if (!this.validDateFormat()) {
                alert("The date hasn't got a valid format:\nDD/MM/YYYY");
            } else if (!this.validDate()) {
                alert("The date doesn't seems to exist.")
            } else {
                var expense = new Expense( this.props.navigation.state.params.trip.persons, this.state.category, this.state.date, this.state.currency, this.state.splittingMethod);
                navigate("ExpensePaidScreen", {expense: expense, trip: this.state.trip, key: this.state.key, refresh: this.props.navigation.state.params.refresh });
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