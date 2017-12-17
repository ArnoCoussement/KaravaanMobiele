import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';

export default class TableByExpense extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Table by expense`,
    });
      
    constructor(props) {
        super(props);
        this.state = {
            expense: this.props.navigation.state.params.expense
        };
    }
  
    render() {
        const tableHead = ['Name', 'Paid', 'Owed', 'Receives/Still needs to pay'];

        personView = this.state.expense.expensePersons.map( p => {
            return(
                <Row
                    data={[p.name, p.paid, p.owed, p.owed-p.paid]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
        });

        return (
            <ScrollView style={styles.container}>
                <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    {personView}
                </Table>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingTop: 15
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
        height: 30
    }
});
