import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView, Image } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import {PersonDB} from './InMemoryDatabase';
import {Trip} from './Trip';

import {TouchableOpacity,TouchableHighlight} from 'react-native';
const styles = require('./css/stylesheet.js');

export default class TripOverview extends Component {
    static navigationOptions = ({navigation}) => ({
      title: `Trip to ${navigation.state.params.trip.name}`,
      headerRight: (<View></View>),
      headerTitleStyle :styles.headerTitleStyle,
      headerStyle : styles.headerStyle,
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
        let result = Math.round((p.totalOwed-p.totalPaid) * 100) / 100;
        console.log('paid: ' + p.totalPaid + '  owed: ' + p.totalOwed + '  Receives/To pay: ' + result);
        return (
          <Row
            data={[p.name, p.totalPaid.toFixed(2), p.totalOwed.toFixed(2), result.toFixed(2)]}
            style={styles.row}
            textStyle={styles.tableText}
          />
      )});

      return (
      <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
        
        <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
            {peopleView}
          </Table>

        <ScrollView contentContainerStyle={styles.tableContainer}>
          
          <View style={[styles.marginBottom, styles.transparentContainer]}>
            <TouchableOpacity style={styles.button}
                onPress={() => navigate('AddPersonScreen', { trip: this.state.trip, refresh: this.refreshFunction })}>
              <Text style={styles.buttonText}>Add companion</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.marginBottom, styles.transparentContainer]}>
            <TouchableHighlight style={[styles.button,{opacity : this.state.trip.persons.length == 0? 0.5 : 1 } ]}  
                underlayColor = 'white'
                disabled={this.state.trip.persons.length == 0}
                onPress={() => navigate('AddExpenseScreen', { trip: this.state.trip, refresh: this.refreshFunction })}>
              <Text style={styles.buttonText} >Add Expense</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.marginBottom, styles.transparentContainer]}>
            <TouchableHighlight style={[styles.button,{opacity : this.state.trip.expenses.length == 0? 0.5 : 1 } ]}  
                underlayColor = 'white'
                disabled={this.state.trip.expenses.length == 0}
                onPress={() => navigate('AddTransferScreen', { trip: this.state.trip, refresh: this.refreshFunction })}>
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.marginBottom, styles.transparentContainer]}>
            <TouchableOpacity style={styles.button}
                onPress={() => navigate('SummaryScreen', { tripName: this.state.trip.name})}>
              <Text style={styles.buttonText}>View Summary</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Image>
      );
    }

    refreshFunction = () => {
      this.setState({trip: this.props.navigation.state.params.trip})
    }
  };



  