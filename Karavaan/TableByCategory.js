import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,Image, TextInput,TouchableOpacity, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';


const styles = require('./css/stylesheet.js')

export default class TableByCategory extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Category`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
    });
      
    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            expenses : tripdb.getExpensesByCategory(this.props.navigation.state.params.tripName)
        };
    }

    getTotalPaid(expense) {
        var amount = Number(0);
        expense.expensePersons.forEach( (element) => {
            amount += Number(element.paid);
        }, this);        
        return amount;
    }

    contentRow = (category) => {
        const {navigate} = this.props.navigation;
        const rows = [];
        const butInfo = (value) => (
            <View style={styles.btn}>
                <TouchableOpacity  style={styles.tableButton} onPress={() => navigate('TableByExpenseScreen', {expense: value})} >
                <Text style={styles.buttonText}>INFO</Text>
                </TouchableOpacity>
            </View>
        );
            
        this.state.expenses[category].forEach((element) => {
            rows.push(
                <Row
                    data={[element.date, this.getTotalPaid(element).toFixed(2), element.currency, butInfo(element)]}
                    style={styles.row}
                    textStyle={styles.tableText}
                />
            )
        }, this);

        return rows;
    }
  
    render() {
        const tableHead = ['Date', 'Total paid', 'Currency', ''];

        categoryView = Object.keys(this.state.expenses).map( category => {
            return(
                <View style={styles.item}>
                    <Text style={styles.headText}>{category}</Text>
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {this.contentRow(category)}
                    </Table>
                </View>
            )
        });

        return (
            <Image style={styles.backgroundImage} source={require('./images/background2.png')}>
      
                <ScrollView style={styles.transparentContainer}>
                    {categoryView}
                </ScrollView>

            </Image>
        );
    }
}

