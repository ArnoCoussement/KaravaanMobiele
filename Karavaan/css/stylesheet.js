'use strict';

var React = require('react-native');



const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },

 

  listContainer : {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems : 'center',
    backgroundColor: 'white',
    flexDirection : 'row',
    marginTop : 10,
  },

  subject : {
    color : '#5dbaa6',
    fontWeight : 'bold',
    fontSize : 20,
    margin : 10,
  },
  button : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    width : 200,
    

    
  },

  buttonText : {
    color : '#5dbaa6',
    fontWeight : 'bold',
    fontSize : 20,
  },

  listButton : {
    alignItems : 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    margin : 10,
    width : 120,
  },

  image : {
    marginBottom: 100
  },
  
  bottompadding: {
    minHeight: 75,
  },

  row: {
    height: 30
},

head: {
  height: 40,
  backgroundColor: '#f1f8ff'
},

text: {
marginLeft: 5
},

tableContainer: {
  flex: 1,
  padding: 5,
  paddingTop: 15
},


});


  module.exports = styles;