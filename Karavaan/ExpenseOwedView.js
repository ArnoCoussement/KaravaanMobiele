import React from 'react';
import {SPLITMETHOD} from './SplitMethods';
import { View, TextInput, Text, Button,TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import {tripdb} from './App';

const styles = require('./css/stylesheet.js')

export default class ExpenseOwedView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who owes what?`,
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
            trip : this.props.navigation.state.params.trip,
            sharedAmount: 0,
            key: this.props.navigation.state.params.key,
            toBeOwed:this.props.navigation.state.params.expense.getTotalPaid(),
            
        };
    }

    validateAmounts = () => {
        var re = /^[0-9]+(\.[0-9]{1,2})?$/;
        var result = true;

        this.state.persons.forEach((p) => {
            if (!re.test(p.owed)) {
                p.owed = 0;
                result = false;
            }
        }, this);

        if (!re.test(this.state.sharedAmount)) {
            this.setShared(0)
            result = false;
        }


        return result;
    }

    onChanged = (id, amount) => {
        // Set oweAmount to the given amount
        
        this.state.expense.setOweAmount(id, amount);

        // calculate what's been owed.
        var totalOwed = this.state.expense.getTotalPaid();
        this.state.expense.expensePersons.forEach((element) => {
            totalOwed -= Number(element.owed);
        }, this);
        totalOwed -= Number(this.state.expense.sharedAmount);

        // reset oweAmount to 0 if it's a wrong amount
        if (Number(totalOwed) < Number(0)) {
            this.state.expense.setOweAmount(id, 0);
            totalOwed += Number(amount);
            alert("Please enter a valid number");
        }
        this.setState({toBeOwed : totalOwed});
    }

    setShared = (amount) => {
        this.state.expense.sharedAmount = amount;

        // calculate what's been owed.
        var totalOwed = this.state.expense.getTotalPaid();
        this.state.expense.expensePersons.forEach((element) => {
            totalOwed -= Number(element.owed);
        }, this);
        totalOwed -= Number(amount);

        // reset oweAmount to 0 if it's a wrong amount
        if (Number(totalOwed) < Number(0)) {
            this.state.expense.sharedAmount = 0;
            totalOwed += Number(amount);
            alert("Please enter a valid number");
        }
        this.setState({sharedAmount:amount, toBeOwed : totalOwed});
    }

    render() {
        const {goBack} = this.props.navigation;
        
        addEvent = () => {
            if (this.validateAmounts()) {
                if (this.state.toBeOwed != Number(0)) {
                    alert("Not yet everything is divided among the travellers.");                
                } else {
                    this.state.expense.calculateOwed();
                    tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
                    goBack(this.state.key);
                    this.props.navigation.state.params.refresh();
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
                        value = {String(p.owed)}
                        placeholder = { this.state.expense.currency }
                        onChangeText = {(amount)=> 
                        this.onChanged(p.id, amount)
                        
                        }
                        
                    />
                </View>
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background.png')}>
                <Text style={[styles.text, styles.marginBottom]}>To be divided among travellers: {this.state.toBeOwed} {this.state.expense.currency}</Text>
                {peopleView}
                <SharedExpenses placeholder={this.state.expense.currency} splitMethod={this.state.expense.splitMethod.name} current={this.state.expense.sharedAmount} onChangeText={this.setShared}/>
                <TouchableOpacity underlayColor='white'
                style={[styles.button,styles.marginTop]}  onPress={() => {
                    addEvent()
                }}>

                    <Text style={styles.buttonText}>NEXT</Text>

                </TouchableOpacity>
            </Image>
        );
    }
}

function SharedExpenses(props) {
    if (props.splitMethod == SPLITMETHOD.WAY_OF_BILL.name) {
        return (
            <View>
                <Text>Shared Expenses</Text>
                <TextInput 
                    keyboardType = 'numeric'
                    placeholder={props.placeholder}
                    value={String(props.current)}
                    onChangeText = {(amount)=> {
                        props.onChangeText(amount);
                    }}
                />
            </View>
        )
    } else {
        return null;
    }
};
