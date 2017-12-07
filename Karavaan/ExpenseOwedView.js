import React from 'react';
import {SPLITMETHOD} from './SplitMethods';
import { View, TextInput, Text, Button } from 'react-native';

export default class ExpenseOwedView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who owes what?`,
        headerLeft: null,
    });

    constructor(props)
    {
        super(props);
        this.state = { expense: this.props.navigation.state.params.expense, sharedAmount: 0 };
    }

    onChanged = (name, amount) => {
        this.state.expense.setOweAmount(name, amount);
    }

    render() {
        const {navigate} = this.props.navigation;
        
        nextEvent = () => {
            // Add expense to trip, set trip person info and go back to tripProfileScreen
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
                        console.log(`]]]]]]]]]]]]]]]]] ${this.state.sharedAmount}`)
                    }}
                />
            </View>
        )
    } else {
        return null;
    }
};
