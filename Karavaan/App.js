import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native';
import { StackNavigator} from 'react-navigation';
import AddTripView from './AddTripView';
import AddPersonView from './AddPersonView';
import TripOverview from './TripOverview';
import AddExpenseView from './AddExpenseView';
import MainView from './MainView';
import {TripDB} from './TripDB';
import {Trip} from './Trip';

let tripdb = new TripDB();
let trips = tripdb.trips;


//console.log(PersonOverview);

export class Startup extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Let's get started!`,
  });
  constructor(props){
    super(props);
  }

  render(){
    const {navigate} = this.props.navigation;
    
    return(
      <View>
        <Button title='Show trips' onPress={() => navigate('MainView', { })} />
      </View>
    );
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

export default App = StackNavigator({
  Startup : {screen: Startup},
  MainView : {screen: MainView}
});
