import React, { Component } from 'react';
import Nav from './components/Layout/Nav';
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
    return (
      <div className="App">
        <Nav logged={this.state.logged}/>
        <Main />
      </div>
    );
  }
}

export default App;
