import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput,Image, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb, currenciesdb} from './App';
import {SPLITMETHOD} from './SplitMethods';


const styles = require('./css/stylesheet.js')

export default class TableByCategoryPerPerson extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Person per Day`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
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
                    textStyle={styles.tableTransactionText}
                />
            )
            totalPaid += currenciesdb.convertToEURFrom(Number(exp.paid), exp.currency);
            totalOwed += currenciesdb.convertToEURFrom(Number(exp.owed), exp.currency);
        })

        rows.push(
            <Row
                data={['Total:', totalPaid.toFixed(2), totalOwed.toFixed(2), 'EUR']}
                style={styles.row}
                textStyle={styles.tableTotalText}
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
                    textStyle={styles.tableText}
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
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {this.contentRow(this.state.expenses[id])}
                    </Table>
                </View>
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                <ScrollView style={styles.transparentContainer}>
                {personView}
                </ScrollView>
            </Image>
        );
    }
}


