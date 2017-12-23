import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text,TouchableOpacity, Image, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Table, Row } from 'react-native-table-component';
import {tripdb} from './App';
import {SPLITMETHOD} from './SplitMethods';

const styles = require('./css/stylesheet.js')

export default class TableByCategoryPerPerson extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Expense per Category per Person`,
        headerRight: (<View></View>),
        headerTitleStyle :styles.headerTitleStyle,
        headerStyle : styles.headerStyle,
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
                        values[id].paid.toFixed(2),
                        values[id].owed.toFixed(2),
                        (values[id].owed - values[id].paid).toFixed(2)
                    ]}
                    style={styles.row}
                    textStyle={styles.tableText}
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
                    <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#4d9280'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeadText}/>
                        {this.contentRow(this.state.expenses[category])}
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

