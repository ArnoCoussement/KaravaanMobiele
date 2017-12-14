import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

export default class TableByTrip extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `All Expenses of this Trip`,
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
            <View style={styles.btn}>
                <Button  title='INFO' onPress={() => navigate('TableByExpenseScreen', {expense: value})} />
            </View>
        );

        const butDelete = (expense) => (
            <View style={styles.btn}>
                <Button  title='Delete' onPress={() => {
                    tripdb.deleteExpenseFromTrip(expense, this.state.tripName);
                    this.refreshFunction();
                }} />
            </View>
        );

        expensesView = this.state.expenses.map( expense => {
            return(
                <Row
                    data={[expense.date, expense.category, expense.currency, butInfo(expense)]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
        });

        return (
            <ScrollView style={styles.container}>
                <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {expensesView}
                </Table>
            </ScrollView>
        );
    }

    refreshFunction = () => {
        this.setState({expenses : tripdb.getExpensesFromTrip(this.state.tripName)});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        marginLeft: 5
    },
    row: {
        height: 40
    },
    btn: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5
    },    
});
