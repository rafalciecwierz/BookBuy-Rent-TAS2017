import React, { Component } from 'react';
import Nav from './components/Layout/Nav';
import axios from "axios";
import Main from './containers/Main';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      user: {}
    }
  }
  render() {
  	axios.defaults.withCredentials = true; // very important for session
    return (
      <div className="App">
        <Nav logged={this.state.logged}/>
        <Main />
      </div>
    );
  }
}

export default App;
