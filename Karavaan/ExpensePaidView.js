import React from 'react';
import {SPLITMETHOD} from './SplitMethods';
import { View, TextInput, Text, Button } from 'react-native';

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
            tripdb: this.props.navigation.state.params.tripdb,
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
                this.state.tripdb.addExpenseToTrip(this.state.expense, this.state.trip);
                console.log(`****************************** ${this.state.expense.expensePersons[0].id}`)
                goBack(this.state.key);
            } else {
                navigate("ExpenseOwedScreen", {expense: this.state.expense, key: this.state.key});
            }
        }
    
        peopleView = this.state.persons.map( p => {
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
