import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

export default class TableByCategory extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Category`,
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
                <Button  title='INFO' onPress={() => navigate('TableByExpenseScreen', {expense: value})} />
            </View>
        );
            
        this.state.expenses[category].forEach((element) => {
            rows.push(
                <Row
                    data={[element.date, this.getTotalPaid(element), element.currency, butInfo(element)]}
                    style={styles.row}
                    textStyle={styles.text}
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
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {this.contentRow(category)}
                    </Table>
                </View>
            )
        });

        return (
            <ScrollView style={styles.container}>
                {categoryView}
            </ScrollView>
        );
    }
}

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
        paddingTop: 10
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        marginLeft: 5
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
