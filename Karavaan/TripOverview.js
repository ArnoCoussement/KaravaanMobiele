import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
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
      const tableHead = ['Name', 'Paid', 'Owed', 'Receives/Still needs to pay'];
      const {navigate} = this.props.navigation;

      peopleView = this.state.trip.persons.map( p => {
        return (
          <Row
            data={[p.name, p.totalPaid, p.totalOwed, p.totalOwed-p.totalPaid]}
            style={styles.row}
            textStyle={styles.text}
          />
      )});

      return (
        <ScrollView style={styles.container}>
          <Table>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            {peopleView}
          </Table>
          <View style={styles.button}>
            <Button title='Add A Fellow Traveller' onPress={() => navigate('AddPersonScreen', { trip: this.state.trip, refresh: this.refreshFunction })}/>
          </View>
          <View style={styles.button}>
            <Button title='Add Expense' disabled={this.state.trip.persons.length == 0}
              onPress={() => navigate('AddExpenseScreen', { trip: this.state.trip, refresh: this.refreshFunction })}/>
          </View>
          <View style={styles.button}>
            <Button title='View Summary' onPress={() => navigate('SummaryScreen', { tripName: this.state.trip.name})}/>
          </View>
        </ScrollView>
      );
    }

    refreshFunction = () => {
      this.setState({trip: this.props.navigation.state.params.trip})
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      paddingTop: 15
    },
    button: {
        padding: 5,
        paddingTop: 10
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        marginLeft: 5
    },
    row: {
        height: 30
    }
  });

  