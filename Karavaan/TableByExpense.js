import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';


const styles = require('./css/stylesheet.js')

export default class TableByExpense extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Table by expense`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
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
            console.log('p.paid: ' + p.paid)
            return(
                <Row
                    data={[p.name, Number(p.paid).toFixed(2), Number(p.owed).toFixed(2), Number(p.owed-p.paid).toFixed(2)]}
                    style={styles.row}
                    textStyle={styles.tableText}
                />
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
            
                <ScrollView style={styles.transparentContainer}>
                    <Text style={styles.text}>Currency for this expense: {this.state.expense.currency}</Text>
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {personView}
                    </Table>
                </ScrollView>
            </Image>
        );
    }
}


