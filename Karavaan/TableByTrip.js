import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row, Cell } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

export default class TableByTrip extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Table by expense`,
    });
      
    constructor(props) {
        super(props);
    }
  
    render() {
        const {navigate} = this.props.navigation;
        const tableHead = ['Date', 'Category', 'Currency', ''];
        const but = (value) => (
            <View style={styles.btn}>
                <Button  title='INFO' onPress={() => navigate('TableByExpenseScreen', {expense: value})} />
            </View>
        );

        expensesView = tripdb.getExpensesFromTrip('test').map( expense => {
            return(
                <Row
                    data={[expense.date, expense.category, expense.currency, but(expense)]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
        });

        return (
            <View style={styles.container}>
                <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {expensesView}
                </Table>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
