import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl, ScrollView  } from 'react-native';
import { StackNavigator} from 'react-navigation';

export default class SummaryView extends Component {
    static navigationOptions = ({navigation}) => ({
        title: `Summaries`,
    });
      
    constructor(props) {
        super(props);
        this.state = { tripName: this.props.navigation.state.params.tripName };
    }
  
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button  title='Expenses' onPress={() => navigate('TableByTripScreen', {tripName: this.state.tripName})} />
                </View>
                <View style={styles.button}>
                    <Button  title='Expenses by Category' onPress={() => navigate('TableByCategoryScreen', {tripName: this.state.tripName})} />
                </View>
                <View style={styles.button}>
                    <Button  title='Expenses by Category per Person' onPress={() => navigate('TableByCategoryPerPersonScreen', {tripName: this.state.tripName})} />
                </View>
                <View style={styles.button}>
                    <Button  title='Expenses per Person per Day' onPress={() => navigate('TableByPersonPerDayScreen', {tripName: this.state.tripName})} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    button: {
        padding: 10,
        paddingTop: 15
    },
});
