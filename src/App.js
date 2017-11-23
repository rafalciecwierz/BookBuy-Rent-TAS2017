import React, { Component } from 'react';
import Nav from './components/Layout/Nav';
import Main from './views/Main';

class App extends Component {
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
