import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';

var SPLITMETHOD = {
    OWN_SHARE    : { name: "Everyone pays his own share"},
    DIVIDED_EVEN : { name: "Divided evenly"},
    WAY_OF_BILL  : { name: "By way of a bill"}
}
export default class ExpenseOwedView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Who owes what?`,
        headerLeft: null,
    });

    constructor(props)
    {
        super(props);
        this.state = { };
    }

    render()
    {
        return (
            <View>
            </View>
        );
    }
}