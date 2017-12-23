import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb, currenciesdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

const styles = require('./css/stylesheet.js');

export default class TableByTransactionPerPerson extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Overview of transactions per person`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });

    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            transactions : tripdb.getTransactionsByPerson(this.props.navigation.state.params.tripName)
        };
    }

    
    contentRow = (from) => {
        const rows = [];     
            
        this.state.transactions[from].transactions.forEach((element) => {
            rows.push(
                <Row
                    data={[element.from , element.to , element.date, Number(element.amount).toFixed(2), element.currency]}
                    style={styles.row}
                    textStyle={styles.tableTransactionText}
                />
            )
        }, this);

        return rows;
    }


    render() {
        const tableHead = ['From', 'To', 'Date', 'Amount', 'Currency'];

        transactionview = Object.keys(this.state.transactions).map( from => {
            return(
                <View style={styles.item}>
                    <Text style={styles.headText}>{from}</Text>
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {this.contentRow(from)}
                    </Table>
                </View>
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                    <ScrollView style={styles.transparentContainer}>
                        {transactionview}
                    </ScrollView>
            </Image>
        );
    }
};


