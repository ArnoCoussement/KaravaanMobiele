import React from 'react';
import { Picker, View, TextInput, Text, Button } from 'react-native';

export default class AddExpenseView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add an expanse`,
    });

    constructor(props)
    {
        super(props);
        this.state = { category: '', date: '', currency: '', splittingMethod: ''};
    }

    render()
    {
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
                <Text>How to split the bill? {this.props.bar}</Text>
                <Picker
                    selectedValue={this.state.splittingMethod}
                    onValueChange={(itemValue, itemIndex) => this.setState({splittingMethod: itemValue})}>
                    <Picker.Item label="Everyone pays his own share" value="own_share"/>
                    <Picker.Item label="Divided evenly"              value="divided_even"/>
                    <Picker.Item label="By way of a bill"            value="way_of_bill"/>
                </Picker>
                <Button title='ADD' onPress={() => {
                    this.props.navigation.goBack()
                    // this.props.navigation.state.params.updateData(this.state.text)
                }}/>
            </View>
        );
    }
}