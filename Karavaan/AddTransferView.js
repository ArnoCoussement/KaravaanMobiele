import React from 'react';
import { Picker, View, TextInput, Text, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import {tripdb} from './App';
import {Transaction} from './Transaction';

const styles = require('./css/stylesheet.js');

export default class AddTransferView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add a Transaction`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });

    constructor(props)
    {
        super(props);
        this.state = {
            from: this.props.navigation.state.params.trip.persons[0].id,
            to: this.props.navigation.state.params.trip.persons[0].id,
            date: '',
            amount: 0,
            currency: this.props.navigation.state.params.trip.currencies[0],
            trip: this.props.navigation.state.params.trip,
        };
    }

    validFromToTo = () => {
        if (this.state.from == this.state.to) {
            alert("The same person can't receive and pay");
            return false;
        }
        if (this.getFromAmount() <= 0) {
            alert("'FROM' doesn't need to pay money");
            return false;
        }
        if (this.getToAmount() >= 0) {
            alert("'TO' doesn't need to receive money");
            return false;
        }

        return true;
    }

    validDateFormat = () => {
        var re = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{1,4}$/;
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

    getFromAmount() {
        let result = 0;

        for (let i=0; i < this.state.trip.persons.length; i++) {
            if (this.state.trip.persons[i].id == this.state.from) {
                return Number(this.state.trip.persons[i].totalOwed) - Number(this.state.trip.persons[i].totalPaid);
            }
        }
    }

    getToAmount() {
        for (let i=0; i < this.state.trip.persons.length; i++) {
            if (this.state.trip.persons[i].id == this.state.to) {
                return Number(this.state.trip.persons[i].totalOwed) - Number(this.state.trip.persons[i].totalPaid);
            }
        }
    }

    validateAmounts = () => {
        var re = /^[0-9]+(\.[0-9]{1,2})?$/;

        if (!re.test(this.state.amount) || this.state.amount <= 0) {
            this.setState({amount : 0});
            return false;
        }

        return true;
    }

    validFromAmount() {
        if (this.state.amount > Math.abs(this.getFromAmount())) {
            return false;
        }
        return true;
    }

    validToAmount() {
        if (this.state.amount > Math.abs(this.getToAmount())) {
            return false;
        }
        return true;
    }

    render() {
        const {navigate} = this.props.navigation;

        currencyPicker = this.props.navigation.state.params.trip.currencies.map( c => {
            return (
                <Picker.Item label={c} value={c}/>
            )
        });

        namePicker = this.state.trip.persons.map( pers => {
            return (
               <Picker.Item label={pers.name} value={pers.id}/> 
            )
        })

        nextEvent = () => {
            if (!this.validFromToTo()) {
                //alert("Invalid from and to");
            } else if (!this.validDateFormat()) {
                alert("The date hasn't got a valid format:\nDD/MM/YYYY");
            } else if (!this.validDate()) {
                alert("The date doesn't seems to exist.");
            } else if (!this.validateAmounts()) {
                alert("The amount must be bigger than zero");                
            } else if (!this.validFromAmount()) {
                alert(`FROM can't pay more than he has to, maximum: ${this.getFromAmount()}`);
            } else if (!this.validToAmount()) {
                alert(`TO can't receive more than he has to, maximum ${this.getToAmount()}`);
            } else {
                var trans = new Transaction(this.state.from,this.state.to,this.state.date,this.state.amount,this.state.currency);
                tripdb.addTransactionToTrip(trans, this.state.trip);
                this.props.navigation.goBack();
                this.props.navigation.state.params.refresh();
            }
        }

        return (
            <Image style={styles.backgroundImage} source={require('./images/background.png')}>
                <Text style={styles.text}>From: {this.props.bar}</Text>
                <Picker style={styles.textInput}
                    selectedValue={this.state.from}
                    onValueChange={(itemValue, itemIndex) => this.setState({from: itemValue})}>
                    {namePicker}
                </Picker>
                <Text style={styles.text}>To: {this.props.bar}</Text>
                <Picker style={styles.textInput}
                    selectedValue={this.state.to}
                    onValueChange={(itemValue, itemIndex) => this.setState({to: itemValue})}>
                    {namePicker}
                </Picker>
                <Text style={styles.text}>Date: {this.props.bar}</Text>
                <TextInput style={styles.textInput} placeholder='DD/MM/YYYY' onChangeText={(text) => this.setState({date: text})}/>
                <Text style={styles.text}>Amount: {this.props.bar}</Text>
                <TextInput style={styles.textInput} value={this.state.amount} keyboardType = 'numeric' onChangeText={(text) => this.setState({amount: text})}/>
                <Text style={styles.text}>Choose a currency: {this.props.bar}</Text>
                <Picker style={styles.textInput}
                    selectedValue={this.state.currency}
                    onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                    {currencyPicker}
                </Picker>
                <TouchableOpacity style={[styles.button, styles.marginTop]}
                    onPress={() => {nextEvent()}}>
                    <Text style={styles.buttonText}>Add Transaction</Text>
                </TouchableOpacity>
            </Image>
        );
    }
}