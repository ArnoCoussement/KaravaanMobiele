import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView } from 'react-native';
import { StackNavigator} from 'react-navigation';
import {tripdb} from './App';

import {TouchableOpacity} from 'react-native';
const styles = require('./css/stylesheet.js')

export default class MainView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Trip list`,
  });

  constructor(props){
    super(props);
    this.state = {
      trips : tripdb.trips
    };
  }

  render(){
    const {navigate} = this.props.navigation;

    tripsView = this.state.trips.map( trip => {
      return(
        <View style={styles.listContainer}>
          <Text style={styles.subject} key={trip.name}> {trip.name}</Text>
          <TouchableOpacity style={styles.listButton} onPress={() => navigate('TripProfileScreen', {trip: trip})} >

            <Text style={styles.buttonText}>Show Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listButton} onPress={() => {
            tripdb.deleteTrip(trip);
            this.refreshFunction();
          }}>
            <Text style={styles.buttonText}>Delete Trip</Text>
          </TouchableOpacity>
        </View>
    )});
    
    return(
      <ScrollView contentContainerStyle={styles.container}>
        {tripsView}
        <TouchableOpacity style={styles.button}  
        onPress={() => navigate('AddTripScreen', { refresh: this.refreshFunction })} 
        >
        <Text style={styles.buttonText}>Add New Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  refreshFunction = () => {
    this.setState({trips : tripdb.trips});
  }
};



