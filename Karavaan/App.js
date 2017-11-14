import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native';
import AddPersonView from './AddPersonView';
import {PersonDB} from './InMemoryDatabase';
var db = new PersonDB();
var persons = db.persons;

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

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = { refreshing: false, persons: []};
  }


  render() {
    peopleView = this.state.persons.map( p => {
      return <Text key={p.name} style={styles.item}>{p.name} : {p.amount}</Text>
    });

    return (
      <View style={styles.container}>
        {peopleView}
        
        <AddPersonView foo={(x) => this.onFoo(x)}/>
      </View>
    );
  }

  onFoo(person)
  {
    // alert("prrrrts");
    //this.setState({persons: this.state.persons.concat("extra" + this.state.persons.length)})
    db.addPerson(person);
    this.setState({persons: db.persons})
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
    height: 44,
    color: 'black'
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);