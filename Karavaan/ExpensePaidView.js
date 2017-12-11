import React from 'react';
import {SPLITMETHOD} from './SplitMethods';
import { View, TextInput, Text, Button } from 'react-native';
import {tripdb} from './App';

export default class ExpensePaidView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who paid?`,
        headerLeft: null,
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

    onChanged = (name, amount) => {
        this.state.expense.setPayAmount(name, amount);
    }

    render() {
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;

        nextEvent = () => {
            if (this.state.expense.splitMethod.name == SPLITMETHOD.DIVIDED_EVEN.name) {
                this.state.expense.divideEvenly();
                tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
                goBack(this.state.key);
                this.props.navigation.state.params.refresh()
            } else {
                navigate("ExpenseOwedScreen", {expense: this.state.expense, trip: this.state.trip, key: this.state.key, refresh: this.props.navigation.state.params.refresh });
            }
        }
    
        peopleView = this.state.persons.map( p => {
            return (
                <View>
                    <Text key={p.name}>
                        {p.id} -> {p.name}
                    </Text>
                    <TextInput 
                        keyboardType = 'numeric'
                        placeholder={this.state.expense.currency}
                        onChangeText = {(amount)=> this.onChanged(p.name, amount)}
                    />
                </View>
        )});
          
        return (
            <View>
                {peopleView}
                <Button title='NEXT' onPress={() => {
                    nextEvent()
                }}/>
            </View>
        );
    }
}
