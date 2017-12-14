import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView } from 'react-native';
import { StackNavigator} from 'react-navigation';

import MainView from './MainView';
import AddTripView from './AddTripView';
import AddPersonView from './AddPersonView';
import TripOverview from './TripOverview';
import AddExpenseView from './AddExpenseView';
import ExpensePaidView from './ExpensePaidView';
import ExpenseOwedView from './ExpenseOwedView';
import SummaryView from './SummaryView';
import TableByExpense from './TableByExpense';
import TableByTrip from './TableByTrip';
import TableByCategory from './TableByCategory';
import TableByCategoryPerPerson from './TableByCategoryPerPerson';
import TableByPersonPerDay from './TableByPersonPerDay';

import {TripDB} from './TripDB';

export let tripdb = new TripDB();

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
        <Button title='Show trips' onPress={() => navigate('MainView')} />
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
  Home : {screen: Startup},
  MainView : {screen: MainView},
  TripProfileScreen : {screen: TripOverview},
  AddTripScreen : {screen: AddTripView},
  AddPersonScreen : {screen: AddPersonView},
  AddExpenseScreen : {screen: AddExpenseView},
  ExpensePaidScreen : {screen: ExpensePaidView},
  ExpenseOwedScreen : {screen: ExpenseOwedView},
  SummaryScreen : {screen: SummaryView},
  TableByExpenseScreen : {screen: TableByExpense},
  TableByTripScreen : {screen: TableByTrip},
  TableByCategoryScreen : {screen: TableByCategory},
  TableByCategoryPerPersonScreen : {screen: TableByCategoryPerPerson},
  TableByPersonPerDayScreen : {screen: TableByPersonPerDay},
});
