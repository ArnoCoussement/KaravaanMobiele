import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native';
import { StackNavigator} from 'react-navigation';
import AddTripView from './AddTripView';
import AddPersonView from './AddPersonView';
import TripOverview from './TripOverview';
import AddExpenseView from './AddExpenseView';
import {TripDB} from './TripDB';
import {Trip} from './Trip';

let tripdb = new TripDB();
let trips = tripdb.trips;


//console.log(PersonOverview);

export class Apple extends Component {
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
          <Text key={trip.name}> {trip.name} : {trip.currency}</Text> 
          <Button title='Show Trip' onPress={() => navigate('TripProfileScreen' , {tripje: trip})} />
        </View>
      )});
    
    return(
      <View>
        {tripsView}
        <Button title='Add New Trip' onPress={() => navigate('AddTripScreen', { updateData:this.updateData, })} />
        <Button title='Add Expense' onPress={() => navigate('AddExpenseScreen')} />
      </View>
    );
  };

  updateData = (tripName) => {
    tripdb.addTrip(tripName);
    this.setState({trips : tripdb.trips})
  };
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    color: 'black'
  },
});

export default App = StackNavigator({
  Home : {screen: Apple},
  TripProfileScreen : {screen: TripOverview},
  AddTripScreen : {screen: AddTripView},
  AddPersonScreen : {screen: AddPersonView},
  AddExpenseScreen : {screen: AddExpenseView},
});