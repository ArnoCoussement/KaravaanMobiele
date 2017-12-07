import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import {TripDB} from './TripDB';
import {Trip} from './Trip';

let tripdb = new TripDB();
let trips = tripdb.trips;


//console.log(PersonOverview);

export default class MainView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Trip list`,
  });

  constructor(props){
    super(props);
    this.state = {trips : tripdb.trips};
    console.log(`-----------------------> this.props.navigation = ${this.props.navigation}`)
  }

  render(){
    console.log(`-----------------------> this.props.navigation = ${this.props.navigation}`)
    const {navigate} = this.props.navigation;

    tripsView = this.state.trips.map( trip => {
      return(
        <View style={styles.item}>
          <Text key={trip.name}> {trip.name}</Text>
          <Button title='Show Trip' onPress={() => navigate('TripProfileScreen', {tripdb: tripdb, trip: trip})} />
        </View>
      )});
    
    return(
      <ScrollView>
        {tripsView}
        <Button title='Add New Trip' onPress={() => navigate('AddTripScreen', { updateData:this.updateData, })} />
      </ScrollView>
    );
  };

  updateData = (tripName, currencies) => {
    tripdb.addTrip(tripName, currencies);
    this.setState({trips : tripdb.trips});
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

