import React from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Image } from 'react-native';
import {tripdb} from './App';


const styles = require('./css/stylesheet.js')

export default class AddPersonView extends React.Component
{
    static navigationOptions = ({navigation}) => ({
        title: `Add A Travel Companion`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });

    constructor(props) {
        super(props);
        this.state = { text: '', trip: this.props.navigation.state.params.trip }
    }

    render() {
        return (
            <Image style={styles.backgroundImage} source={require('./images/background.png')}>
            
                <Text style={styles.text}>Enter a name: {this.props.bar}</Text>
                <TextInput maxLength={40} style={styles.textInput} placeholder='name' onChangeText={(text) => this.setState({text})}/>
                <TouchableOpacity style={this.state.text.trim().length == 0? [styles.buttonDisabled,styles.marginTop] : [styles.marginTop,styles.button]} disabled={this.state.text.trim().length == 0} onPress={() => {
                    tripdb.addPersonToTrip(this.state.text, this.state.trip)
                    this.props.navigation.goBack()
                    this.props.navigation.state.params.refresh()
                }}>

                <Text style={styles.buttonText}>ADD</Text>

                </TouchableOpacity>
            </Image>
        );
    }
}