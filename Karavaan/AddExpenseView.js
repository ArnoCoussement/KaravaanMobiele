import React from 'react';
import { Picker, View, TextInput, Text, Button } from 'react-native';

var SPLITMETHOD = {
    OWN_SHARE    : { name: "Everyone pays his own share"},
    DIVIDED_EVEN : { name: "Divided evenly"},
    WAY_OF_BILL  : { name: "By way of a bill"}
}

export default class AddExpenseView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add an expense`,
    });

    constructor(props)
    {
        super(props);
        this.state = { category: '', date: '', currency: '', splittingMethod: ''};
    }

    render()
    {
        currencyPicker = this.props.navigation.state.params.trip.currencies.map( c => {
            return (
                <Picker.Item label={c} value={c}/>
        )});

        splitPicker = this.SPLITMETHOD.map( s => {
            return (
                <Picker.Item label={s.name} value={s}/>
        )});

        return (
            <View>
                <Text>Choose a category: {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.category}
                    onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                    <Picker.Item label="Overnight Stay" value="overnight_stay"/>
                    <Picker.Item label="Transport"      value="transport"/>
                    <Picker.Item label="Activity"       value="activity"/>
                    <Picker.Item label="Food"           value="food"/>
                    <Picker.Item label="Miscellaneous"  value="miscellaneous"/>
                </Picker>
                <Text>Add a date: {this.props.bar}</Text>
                <TextInput placeholder='DD/MM/YYYY' onChangeText={(text) => this.setState({date: text})}/>
                <Text>Choose a currency: {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.currency}
                    onValueChange={(itemValue, itemIndex) => this.setState({currency: itemValue})}>
                    {currencyPicker}
                </Picker>
                <Text>How to split the bill? {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.splittingMethod}
                    onValueChange={(itemValue, itemIndex) => this.setState({splittingMethod: itemValue})}>
                    {splitPicker}
                </Picker>
                <Button title='ADD' onPress={() => {
                    this.props.navigation.goBack()
                    // this.props.navigation.state.params.updateData(this.state.text)
                }}/>
            </View>
        );
    }
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