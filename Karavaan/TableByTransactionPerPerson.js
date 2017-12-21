import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb, currenciesdb} from './App';
import {SPLITMETHOD} from './SplitMethods';


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
                    textStyle={styles.text}
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
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {this.contentRow(trans)}
                    </Table>
                </View>
            )
        });

        return (
            <ScrollView style={styles.container}>
                {transactionview}
            </ScrollView>
        );
    }
};


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