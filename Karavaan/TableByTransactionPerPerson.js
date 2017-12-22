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
        //console.log(`9999999999999 ${this.state.transactions[from].transactions[0].amount} 999999999999999999999999`)      
        this.state.transactions[from].transactions.forEach((element) => {
            rows.push(
                <Row
                    data={[element.from , element.to , element.date, element.amount, element.currency]}
                    style={styles.row}
                    textStyle={styles.tableText}
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
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
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

