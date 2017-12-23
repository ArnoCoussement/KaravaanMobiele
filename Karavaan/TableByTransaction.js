import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb, currenciesdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

const styles = require('./css/stylesheet.js');

export default class TableByTransaction extends Component{
    static navigationOptions = ({navigation}) => ({
        title: `Overview of transactions`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });


    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            transactions : tripdb.getTransactionsFromTrip(this.props.navigation.state.params.tripName)
        };
    }
    render() {
        const tableHead = ['From', 'To', 'Date', 'Amount', 'Currency'];

        transactionview = this.state.transactions.map( trans => {
            return(
                <Row data={[trans.from, trans.to, trans.date, Number(trans.amount).toFixed(2), trans.currency]} style={styles.row} textStyle={styles.tableTransactionText}/>
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                    <ScrollView style={styles.transparentContainer}>
                        <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                            <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                            {transactionview}
                        </Table>
                    </ScrollView>
            </Image>
        );
    }
}


