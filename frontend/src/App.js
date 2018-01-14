import React, { Component } from 'react';
import './App.css';
import ListaSalvari from './ListaSalvari'
import ListaFeedback from './ListaFeedback'

class App extends Component {
 
  
  render() {
    return (
      <div className="App">
       
       <ListaSalvari  />
       <ListaFeedback />
       
      </div>
    );
  }
}

export default App;
