import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { PersonDB } from './InMemoryDatabase'


export default class AddPersonView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { text: ''}
    }


    addOnClick()
    {
        this.props.foo(this.state.text);
    }

    render()
    {
        return (
            <View>
                <Text>Enter a name: {this.props.bar}</Text>
                <TextInput placeholder='name' onChangeText={(text) => this.setState({text})}
                    value={this.state.text}/>
                <Button title='ADD' onPress={() => this.addOnClick()}/>

            </View>
        );
    }
}