import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView } from 'react-native';
import { StackNavigator} from 'react-navigation';
import MainView from './MainView';
import AddTripView from './AddTripView';
import AddPersonView from './AddPersonView';
import TripOverview from './TripOverview';
import AddExpenseView from './AddExpenseView';
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
    console.disableYellowBox = true;
  }

  render(){
    const {navigate} = this.props.navigation;
    
    return(
      <View>
        <Button title='Show trips' onPress={() => navigate('MainView', {  })} />
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
<<<<<<< HEAD
  Startup : {screen: Startup},
  MainView : {screen: MainView},
  AddTripScreen : {screen: AddTripView},
=======
  Home : {screen: Startup},
  MainView : {screen: MainView},
  TripProfileScreen : {screen: TripOverview},
  AddTripScreen : {screen: AddTripView},
  AddPersonScreen : {screen: AddPersonView},
  AddExpenseScreen : {screen: AddExpenseView},
>>>>>>> ec8b7ec7954d89f63e9b930e47e0f1143d004bd5
});
