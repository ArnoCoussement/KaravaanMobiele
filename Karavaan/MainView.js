import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView, Image } from 'react-native';
import { StackNavigator} from 'react-navigation';
import {tripdb} from './App';

import {TouchableOpacity} from 'react-native';
const styles = require('./css/stylesheet.js')

export default class MainView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Trip list`,
     
    headerRight: (<View></View>),
    headerTitleStyle :styles.headerTitleStyle,
    headerStyle : styles.headerStyle,
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
        <View style={[styles.container, styles.tripContainer, styles.transparentContainer]}>
          <Text style={styles.tripSubject} key={trip.name}> {trip.name}</Text>

          <View style={[styles.listContainer,styles.transparentContainer]}>
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
        </View>
    )});
    
    return(

    <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
      
      <ScrollView style={styles.transparentContainer}>
        {tripsView}
        <View style={[styles.container,styles.transparentContainer]}>
          <TouchableOpacity style={[styles.addTripButton, styles.marginTop]}  
          onPress={() => navigate('AddTripScreen', { refresh: this.refreshFunction })} 
          >
          
          <Text style={styles.buttonText}>Add New Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Image>
    );
  };

  refreshFunction = () => {
    this.setState({trips : tripdb.trips});
  }
};



