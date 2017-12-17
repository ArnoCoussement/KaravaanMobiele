import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

export default class TableByCategoryPerPerson extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Category per Person`,
    });
      
    constructor(props) {
        super(props);
        this.state = {
            tripName: this.props.navigation.state.params.tripName,
            expenses : tripdb.getExpensesByCategoryPerPerson(this.props.navigation.state.params.tripName)
        };
    }

    contentRow = (values) => {
        const rows = [];
        
        Object.keys(values).forEach( id => {
            rows.push(
                <Row
                    data={[
                        values[id].name,
                        values[id].paid,
                        values[id].owed,
                        values[id].owed - values[id].paid
                    ]}
                    style={styles.row}
                    textStyle={styles.text}
                />
            )
        })

        return rows;
    }
  
    render() {
        const tableHead = ['Name', 'Paid', 'Owed', 'Receives/Still needs to pay'];

        categoryView = Object.keys(this.state.expenses).map( category => {
            return(
                <View style={styles.item}>
                    <Text style={styles.headText}>{category}</Text>
                    <Table>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        {this.contentRow(this.state.expenses[category])}
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
        paddingTop: 15
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
