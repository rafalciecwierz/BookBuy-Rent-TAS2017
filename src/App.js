import React, { Component } from 'react';
import Nav from './components/Layout/Nav';
import Main from './views/Main';
import axios from "axios";

class App extends Component {
  render() {
  	axios.defaults.withCredentials = true; // very important for session
    return (
      <div className="App">
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
