import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image,TouchableOpacity, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

const styles = require('./css/stylesheet.js');


export default class TableByTrip extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `All Expenses of this Trip`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });
      
    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            expenses : tripdb.getExpensesFromTrip(this.props.navigation.state.params.tripName)
        };
    }
  
    render() {
        const {navigate} = this.props.navigation;
        const tableHead = ['Date', 'Category', 'Currency', ''];
        const butInfo = (value) => (
            
                <TouchableOpacity style={styles.tableButton}  onPress={() => navigate('TableByExpenseScreen', {expense: value})} >
                    <Text style={styles.buttonText}>INFO</Text>
                </TouchableOpacity>
            
        );

        const butDelete = (expense) => (
            <View style={styles.btn}>
                <TouchableOpacity style={styles.tableButton}  onPress={() => {
                    tripdb.deleteExpenseFromTrip(expense, this.state.tripName);
                    this.refreshFunction();
                }} >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );

        expensesView = this.state.expenses.map( expense => {
            return(
                <Row
                    data={[expense.date, expense.category, expense.currency, butInfo(expense)]}
                    style={styles.row}
                    textStyle={styles.tableTransactionText}
                />
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                <ScrollView style={styles.transparentContainer}>
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {expensesView}
                    </Table>
                </ScrollView>
            </Image>
        );
    }

    refreshFunction = () => {
        this.setState({expenses : tripdb.getExpensesFromTrip(this.state.tripName)});
    }
}

