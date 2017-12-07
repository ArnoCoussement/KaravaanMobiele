import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import {TripDB} from './TripDB';
import {Trip} from './Trip';

export default class MainView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Trip list`,
  });

  constructor(props){
    super(props);
    this.state = {tripdb : this.props.navigation.state.params.tripdb};
  }

  render(){
    const {navigate} = this.props.navigation;

    tripsView = this.state.tripdb.trips.map( trip => {
      return(
        <View style={styles.item}>
          <Text key={trip.name}> {trip.name}</Text>
          <Button title='Show Trip' onPress={() => navigate('TripProfileScreen', {tripdb: this.state.tripdb, trip: trip})} />
          <Button title='Delete Trip' onPress={() => {
            this.state.tripdb.deleteTrip(trip);
            this.setState({trips : this.state.tripdb.trips});
          }}/>
        </View>
      )});
    
    return(
      <ScrollView>
        {tripsView}
        <Button title='Add New Trip' onPress={() => navigate('AddTripScreen', { updateData:this.updateData })} />
      </ScrollView>
    );
  };

  updateData = (tripName, currencies) => {
    this.state.tripdb.addTrip(tripName, currencies);
    this.setState({trips : this.state.tripdb.trips});
  };
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10
  },
});

