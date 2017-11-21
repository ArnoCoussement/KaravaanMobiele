import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { TripDB } from './TripDB'


export default class AddTripView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { text: ''}
    }


    addOnClick()
    {
        this.props.addTrip(this.state.text);
    }

    render()
    {
        return (
            <View>
                <Text>Enter a name for the trip:</Text>
                <TextInput placeholder='name' onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                <Button title='Add Trip' onPress={() => this.addOnClick()}/>

            </View>
        );
    }
}