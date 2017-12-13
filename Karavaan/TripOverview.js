import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native';
import AddPersonView from './AddPersonView';
import {PersonDB} from './InMemoryDatabase';
import {Trip} from './Trip';

export default class TripOverview extends Component {
    static navigationOptions = ({navigation}) => ({
      title: `Trip to ${navigation.state.params.trip.name}`,
    });
    
    constructor(props)
    {
      super(props);
      this.state = { trip: this.props.navigation.state.params.trip };
    }

    render() {
      const {navigate} = this.props.navigation;

      peopleView = this.state.trip.persons.map( p => {
        return (
          <Text key={p.name} style={styles.item}>
            {p.name} : {p.totalPaid} ::: {p.totalOwed}
          </Text>
      )});

      return (
        <View style={styles.container}>
          {peopleView}
          <Button title='Add A Fellow Traveller' onPress={() => navigate('AddPersonScreen', { trip: this.state.trip, refresh: this.refreshFunction })} />
          <Button title='Add Expense' disabled={this.state.trip.persons.length == 0}
            onPress={() => navigate('AddExpenseScreen', { trip: this.state.trip, refresh: this.refreshFunction })} />
          <Button title='View Summary' onPress={() => navigate('SummaryScreen', { tripName: this.state.trip.name})} />
        </View>
      );
    }

    refreshFunction = () => {
      this.setState({trip: this.props.navigation.state.params.trip})
    }
  };

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
    },
  });

  