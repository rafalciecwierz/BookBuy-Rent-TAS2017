import React, { Component } from 'react';
import Nav from './components/Layout/Nav';
import Main from './views/Main';

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
        <Nav />
        <Main />
      </div>
    );
  }
}

export default App;
