import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';


const styles = require('./css/stylesheet.js')

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
                    textStyle={styles.tableText}
                />
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                <ScrollView style={styles.transparentContainer}>
                    <Text style={styles.text}>Currency for this expense: {this.state.expense.currency}</Text>
                    <Table style={styles.table}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {personView}
                    </Table>
                </ScrollView>
            </Image>
        );
    }
}


