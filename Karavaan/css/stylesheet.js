'use strict';

var React = require('react-native');



const styles = React.StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingBottom : 10,
  },

  tripContainer: {
    borderBottomWidth : 1,
    margin : 2,
    
    
  },

  listContainer : {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems : 'center',
    backgroundColor: 'white',
    flexDirection : 'row',
    marginTop : 10,
    
  },

  transparentContainer : {
    backgroundColor : 'transparent',
  },

  subject : {
    color : '#ebb800',
    fontWeight : 'bold',
    fontSize : 20,
    margin : 10,
  },

  tripSubject : {
    color : '#ebb800',
    fontWeight : 'bold',
    fontSize : 30,
    margin : 5,
  },


  button : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    width : 200,
    marginBottom : 10,
    

    
  },

  tableButton : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
    
  },

  summaryButton : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    width : 300,
    marginBottom : 20,
  },

  addTripButton : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    width : 200,
    marginBottom : 10,
    borderWidth : 2,
  },

  buttonDisabled : {
    alignItems: 'center',
    backgroundColor: '#dee1e2',
    padding: 10,
    width : 200,
    marginBottom : 10,
    opacity : 0.5,
  },

  buttonText : {
    color : '#4d9280',
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

  backgroundImage : {
    
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : 'white',
    width: null,
    height: null,
    resizeMode: 'cover',
    

  },
  
  bottompadding: {
    minHeight: 75,
  },

  row: {
    height: 30,
    backgroundColor: 'rgb(255,255,255)'
},

table : {
  width : 400,
},

tableText : {
  textAlign : 'center',
  fontSize : 18,
},

tableTransactionText : {
  textAlign : 'center',
  fontSize : 14,
},

tableTotalText : {
  textAlign : 'center',
  fontSize : 18,
  fontWeight : 'bold',
},

tableHeadText : {
  textAlign : 'center',
  fontWeight : 'bold',
},



head: {
  height: 40,
  backgroundColor: '#f1f8ff',
  
},

headText : {
  fontSize: 18,
  fontWeight: 'bold'
},


text: {
marginLeft: 5,
fontSize : 20,
},



textInput : {
  width : 300,
  height : 50,
  

},

marginTop : {
  marginTop : 20,
},

marginBottom : {
  marginBottom : 20,
},

tableContainer: {
  flex: 1,
  padding: 5,
  paddingTop: 15
},

scrollView : {
  marginBottom : 100,
  backgroundColor : 'white',
  
},

currencyCodes : {
  width : 300,
},


});


  module.exports = styles;