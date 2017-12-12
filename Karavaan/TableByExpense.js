import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row, Cell } from 'react-native-table-component';
import {tripdb} from './App';

export default class TableByExpense extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Table by expense`,
    });
      
    constructor(props) {
        super(props);
    }
  
    render() {
        const tableHead = ['Name', 'Paid', 'Owed', 'Receives/Still needs to pay'];

        return (
            <View style={styles.container}>
                <Table>

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
        height: 30
    }
});
