import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

export default class TableByCategoryPerPerson extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Person per Day`,
    });
      
    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            expenses : tripdb.getExpensesByPersonPerDay(this.props.navigation.state.params.tripName)
        };
    }

    expensesRow = (values) => {
        const rows = [];
        totalPaid = 0;
        totalOwed = 0;

        values.forEach( exp => {
            rows.push(
                <Row
                    data={[exp.category, exp.paid, exp.owed, exp.currency]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
            totalPaid += Number(exp.paid);
            totalOwed += Number(exp.owed);
        })

        rows.push(
            <Row
                data={['', totalPaid, totalOwed, '']}
                style={styles.row}
                textStyle={styles.textBold}
            />
        )

        return rows;
    }

    contentRow = (values) => {
        const rows = [];
        
        Object.keys(values.dates).forEach( date => {
            rows.push(
                <Row
                    data={[date]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
            rows.push(this.expensesRow(values.dates[date]))
        })

        return rows;
    }
  
    render() {
        const tableHead = ['Category', 'Paid', 'Owed', 'Currency'];

        personView = Object.keys(this.state.expenses).map( id => {
            return(
                <View style={styles.item}>
                    <Text style={styles.headText}>{this.state.expenses[id].name}</Text>
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {this.contentRow(this.state.expenses[id])}
                    </Table>
                </View>
            )
        });

        return (
            <ScrollView style={styles.container}>
                {personView}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    headText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    item: {
        paddingTop: 15
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        marginLeft: 5
    },
    textBold: {
        marginLeft: 5,
        fontWeight: 'bold'
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
