import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native';
import AddPersonView from './AddPersonView';
import {PersonDB} from './InMemoryDatabase';
import {Trip} from './Trip';


function enterAmount(from, amount)
{
  if (amount > 0)
  {
    amountPerPerson = amount / persons.length;
    amountFrom = 0 - amount + amountPerPerson;
    for (var person in persons)
    {
      if (person.name == from)
      {
        person.amount += amountFrom;
      }
      else
      {
        person.amount += amountPerPerson;
      }
    }
  }
}
export default class PersonOverview extends Component {
    static navigationOptions = ({navigation}) => ({
      title: `Trip to ${navigation.state.params.tripje.name}`,
    });
    constructor(props)
    {
      super(props);
      this.state = { refreshing: false, persons: this.props.navigation.state.params.tripje.persons};
    }

    render() {
      const {navigate} = this.props.navigation;

      console.log(`-----------------------> this.props.navigation.state.params.tripjs = ${this.props.navigation.state.params.tripje}`)
      peopleView = this.state.persons.map( p => {
        return (
          <Text key={p.name} style={styles.item}>
            {p.name} : {p.amount}
          </Text>
      )});

      return (
        <View style={styles.container}>
          {peopleView}
          <Button title='Add A Fellow Traveller' onPress={() => navigate('AddPersonScreen', { updateData:this.updateData, })} />
        </View>
      );
    }
  
    updateData = (person) => {
      //this.setState({persons: this.state.persons.concat("extra" + this.state.persons.length)})
      this.props.navigation.state.params.tripje.addPerson(person)
      this.setState({persons: this.props.navigation.state.params.tripje.persons})
    }
  };

  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      color: 'black'
    },
  });

  