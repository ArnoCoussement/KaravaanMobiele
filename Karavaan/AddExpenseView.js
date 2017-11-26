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
        this.state = { category: '', date: '', currency: ''};
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
                <Button title='ADD' onPress={() => {
                    this.props.navigation.goBack()
                    // this.props.navigation.state.params.updateData(this.state.text)
                }}/>
            </View>
        );
    }
}