import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

var SPLITMETHOD = {
    OWN_SHARE    : { name: "Everyone pays his own share"},
    DIVIDED_EVEN : { name: "Divided evenly"},
    WAY_OF_BILL  : { name: "By way of a bill"}
}

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
    }

    onChanged = (name, amount) => {
        console.log(`/\/\/\/\/\/\/\/\/\/\/\/\ ${this.state.expense.expensePersons[0].paid}`);
        this.state.expense.setPayAmount(name, amount);
        console.log(`/\/\/\/\/\/\/\/\/\/\/\/\ ${this.state.expense.expensePersons[0].paid}`);
        //        alert(this.state.expense.getPayAmount(name));
    }

    nextEvent = () => {
        this.state.expense.expensePersons.forEach(function(element) {
            console.log(`/\/\/\/\/\/\/\/\/\/\/\/\ ${element.name}: ${element.paid}`)
        }, this);
    }

    render()
    {
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
                    this.nextEvent()
                }}/>
            </View>
        );
    }
}
