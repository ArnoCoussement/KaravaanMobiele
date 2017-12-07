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
      this.state = { refreshing: false, persons: this.props.navigation.state.params.trip.persons};
    }

    render() {
      const {navigate} = this.props.navigation;

      peopleView = this.state.persons.map( p => {
        return (
          <Text key={p.name} style={styles.item}>
            {p.name} : {p.totalPaid}
          </Text>
      )});

      return (
        <View style={styles.container}>
          {peopleView}
          <Button title='Add A Fellow Traveller' onPress={() => navigate('AddPersonScreen', { updateData:this.updateData, })} />
          <Button title='Add Expense' disabled={this.state.persons.length == 0}
            onPress={() => navigate('AddExpenseScreen',{trip:this.props.navigation.state.params.trip})} />
        </View>
      );
    }
  
    updateData = (name) => {
      this.props.navigation.state.params.tripdb.addPersonToTrip(name, this.props.navigation.state.params.trip)
      this.setState({persons: this.props.navigation.state.params.trip.persons})
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

  