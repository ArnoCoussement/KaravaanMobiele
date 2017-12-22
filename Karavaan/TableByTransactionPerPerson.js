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

    
    contentRow = (transactions) => {
        const rows = [];            
        this.state.transactions.forEach((element) => {
            rows.push(
                <Row
                    data={[element.from, element.to, element.date, element.amount, element.currency]}
                    style={styles.row}
                    textStyle={styles.tableText}
                />
            )
        }, this);

        return rows;
    }


    render() {
        const tableHead = ['From', 'To', 'Date', 'Amount', 'Currency'];

        transactionview = Object.keys(this.state.transactions).map( trans => {

           // console.log(`9999999999999999 ${trans.from} 88888888888`)
            return(
                <View style={styles.item}>
                    <Text style={styles.headText}>{trans}</Text>
                    <Table style={styles.table}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {this.contentRow(trans)}
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


