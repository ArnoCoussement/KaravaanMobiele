import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import {tripdb} from './App';

export default class MainView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Trip list`,
  });

  constructor(props){
    super(props);
  }

  render(){
    const {navigate} = this.props.navigation;

    tripsView = tripdb.trips.map( trip => {
      return(
        <View style={styles.item}>
          <Text key={trip.name}> {trip.name}</Text>
          <Button title='Show Trip' onPress={() => navigate('TripProfileScreen', {trip: trip})} />
          <Button title='Delete Trip' onPress={() => {
            tripdb.deleteTrip(trip);
            this.refreshFunction();
          }}/>
        </View>
      )});
    
    return(
      <ScrollView>
        {tripsView}
        <Button title='Add New Trip' onPress={() => navigate('AddTripScreen', { refresh: this.refreshFunction })} />
      </ScrollView>
    );
  };

  refreshFunction = () => {
    this.setState({trips : tripdb.trips});
  }
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

