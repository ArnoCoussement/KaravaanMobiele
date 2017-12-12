import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import {tripdb} from './App';

export default class AddPersonView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add A Travel Companion`,
    });

    constructor(props) {
        super(props);
        this.state = { text: '', trip: this.props.navigation.state.params.trip }
    }

    render() {
        return (
            <View>
                <Text>Enter a name: {this.props.bar}</Text>
                <TextInput placeholder='name' onChangeText={(text) => this.setState({text})}/>
                <Button title='ADD' onPress={() => {
                    tripdb.addPersonToTrip(this.state.text, this.state.trip)
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.refresh()
                }}/>
            </View>
        );
    }
}