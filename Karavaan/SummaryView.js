import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity,Image, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';

const styles = require('./css/stylesheet.js')

export default class SummaryView extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Summaries`,
    });
      
    constructor(props) {
        super(props);
        this.state = { tripName: this.props.navigation.state.params.tripName };
    }
  
    render() {
        const {navigate} = this.props.navigation;

        return (
            <Image style={styles.backgroundImage} source={require('./images/background.png')}>
            
                
                    <TouchableOpacity style={[styles.button]} onPress={() => navigate('TableByTripScreen', {tripName: this.state.tripName})}>
                        <Text style={styles.buttonText}>Expenses</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={[styles.button]} onPress={() => navigate('TableByCategoryScreen', {tripName: this.state.tripName})} >

                        <Text style={styles.buttonText}>Expenses by Category</Text>
                    </TouchableOpacity>
             
                    <TouchableOpacity style={[styles.button]} onPress={() => navigate('TableByCategoryPerPersonScreen', {tripName: this.state.tripName})} >

                    <Text style={styles.buttonText}>Expenses by Category per Person</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button]} onPress={() => navigate('TableByPersonPerDayScreen', {tripName: this.state.tripName})} >

                    <Text style={styles.buttonText}>Expenses per Person per Day</Text>
                    </TouchableOpacity>
            </Image>
        );
    }
}

