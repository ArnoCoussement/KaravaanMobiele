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
            trip : this.props.navigation.state.params.trip,
            sharedAmount: 0,
            key: this.props.navigation.state.params.key
        };
    }

    onChanged = (name, amount) => {
        this.state.expense.setOweAmount(name, amount);
    }

    render() {
        const {goBack} = this.props.navigation;
        
        nextEvent = () => {
            tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
            goBack(this.state.key);
            this.props.navigation.state.params.refresh();
        }
    
        peopleView = this.state.expense.expensePersons.map( p => {
            return (
                <View>
                    <Text key={p.name}>
                        {p.name}
                    </Text>
                    <TextInput 
                        keyboardType = 'numeric'
                        placeholder={this.state.expense.currency}
                        onChangeText = {(amount)=> this.onChanged(p.name, amount)}
                    />
                </View>
            )
        });

        return (
            <View>
                {peopleView}
                <SharedExpenses placeholder={this.state.expense.currency} splitMethod={this.state.expense.splitMethod.name}/>
                <Button title='NEXT' onPress={() => {
                    nextEvent()
                }}/>
            </View>
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
