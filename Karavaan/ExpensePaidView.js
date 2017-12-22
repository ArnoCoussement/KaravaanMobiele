import React from 'react';
import { View, TextInput, Text, Button,TouchableHighlight,Image } from 'react-native';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

const styles = require('./css/stylesheet.js')

export default class ExpensePaidView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who paid?`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });

    constructor(props)
    {
        super(props);
        this.state = {
            expense: this.props.navigation.state.params.expense,
            persons : this.props.navigation.state.params.expense.expensePersons,
            trip: this.props.navigation.state.params.trip,
            key: this.props.navigation.state.params.key
        };
    }

    validateAmounts = () => {
        var re = /^[0-9]+(\.[0-9]{1,2})?$/;
        var result = true;

        this.state.persons.forEach((p) => {
            if (!re.test(p.paid)) {
                p.paid = 0;
                result = false;
            }
        }, this);

        return result;
    }

    onChanged = (id, amount) => {
        this.state.expense.setPayAmount(id, amount);
        this.setState({persons : this.state.expense.expensePersons});
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;

        nextEvent = () => {
            if (this.validateAmounts()) {
                if (this.state.expense.splitMethod.name == SPLITMETHOD.DIVIDED_EVEN.name) {
                    this.state.expense.divideEvenly();
                    tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
                    goBack(this.state.key);
                    this.props.navigation.state.params.refresh()
                } else {
                    navigate("ExpenseOwedScreen", {expense: this.state.expense, trip: this.state.trip, key: this.state.key, refresh: this.props.navigation.state.params.refresh });
                }
            } else {
                alert("Please enter a valid number\nExample: 12.34");
            }
        }
    
        peopleView = this.state.persons.map( p => {
            return (
                <View>
                
                    <Text style={styles.text} key={p.name}>
                        {p.name}
                    </Text>
                    <TextInput style={styles.textInput}
                        keyboardType = 'numeric'
                        value={String(p.paid)}
                        placeholder={this.state.expense.currency}
                        onChangeText = {(amount) => this.onChanged(p.id, amount)}
                    />
                </View>
        )});
          
        return (
            <Image style={styles.backgroundImage} source={require('./images/background.png')}>
            
                {peopleView}
                <TouchableHighlight underlayColor='white' style={[styles.button,styles.marginTop]} onPress={() => {
                    nextEvent()
                }}>

                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableHighlight>
            </Image>
        );
    }
}
