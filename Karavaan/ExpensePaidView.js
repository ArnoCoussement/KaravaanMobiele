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
        this.state = { expense: this.props.navigation.state.params.expense, persons : this.props.navigation.state.params.expense.expensePersons };
        console.log(`ùùùùùùùùùùùùùùùù ${SPLITMETHOD.DIVIDED_EVEN.name}`)
    }

    onChanged = (name, amount) => {
        this.state.expense.setPayAmount(name, amount);
    }

    render() {
        const {navigate} = this.props.navigation;

        nextEvent = () => {
            if (this.state.expense.splitMethod.name == SPLITMETHOD.DIVIDED_EVEN.name) {
                this.state.expense.dividedEven();
            } else {
                navigate("ExpenseOwedScreen", {expense: this.state.expense});
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
