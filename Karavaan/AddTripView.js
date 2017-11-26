import React from 'react';
import { View, TextInput, Text, Button } from 'react-native';


export default class AddTripView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add A NEW Trip`,
    });

    constructor(props)
    {
        super(props);
        this.state = { text: ''};
    }

    render()
    {
        return (
            <View>
                <Text>Enter a name for the trip:</Text>
                <TextInput placeholder='name' onChangeText={(text) => this.setState({text})}/>
                <Button title='Add Trip' onPress={() => {
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.updateData(this.state.text)
                }}/>
            </View>
        );
    }
}