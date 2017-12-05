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
        this.state.expense.setPayAmount(name, amount);
    }

    nextEvent = () => {
        // navigate to 
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
