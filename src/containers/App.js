import React, { Component } from 'react';
import Main from '../views/Main.js';
import LogIn from '../views/LogIn.js';
import Nav from '../components/Nav';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <LogIn />
      </div>
    );
  }
}

export default App;
