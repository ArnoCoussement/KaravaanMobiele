import React from 'react';
import {SPLITMETHOD} from './SplitMethods';
import { View, TextInput, Text, Button } from 'react-native';
import {tripdb} from './App';

export default class ExpenseOwedView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who owes what?`,
        headerLeft: null,
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
            toBeOwed:this.props.navigation.state.params.expense.getTotalPaid()
        };
    }

    onChanged = (id, amount) => {
        // Set oweAmount to the given amount
        this.state.expense.setOweAmount(id, amount);

        // calculate what's been owed.
        var totalOwed = this.state.expense.getTotalPaid();
        this.state.expense.expensePersons.forEach((element) => {
            totalOwed -= Number(element.owed);
        }, this);
        totalOwed -= Number(this.state.sharedAmount);

        // reset oweAmount to 0 if it's a wrong amount
        if (Number(totalOwed) < Number(0)) {
            this.state.expense.setOweAmount(id, 0);
            totalOwed += Number(amount);
            alert("You ninconpoop, couldn't you give something that works? I will reset what you've done just to keep it working.");
        }
        this.setState({toBeOwed : totalOwed});
    }

    render() {
        const {goBack} = this.props.navigation;
        
        nextEvent = () => {
            tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
            goBack(this.state.key);
            this.props.navigation.state.params.refresh();
        }
    
        peopleView = this.state.persons.map( p => {
            return (
                <View>
                    <Text key={p.name}>
                        {p.name}
                    </Text>
                    <TextInput 
                        keyboardType = 'numeric'
                        value = {String(p.owed)}
                        placeholder = { this.state.expense.currency }
                        onChangeText = {(amount)=> this.onChanged(p.id, amount)}
                        
                    />
                </View>
            )
        });

        return (
            <View>
                <Text>To be divided among travellers: {this.state.toBeOwed} {this.state.expense.currency}</Text>
                {peopleView}
                <SharedExpenses placeholder={this.state.expense.currency} splitMethod={this.state.expense.splitMethod.name}/>
                <Button title='NEXT' onPress={() => {
                    nextEvent()
                }}/>
            </View>
        );
    }

    refreshFunction = () => {
        this.setState({persons : this.state.expense.expensePersons});
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
                    onChangeText = {(amount)=> {
                        this.setState(sharedAmount=amount);
                    }}
                />
            </View>
        )
    } else {
        return null;
    }
};
