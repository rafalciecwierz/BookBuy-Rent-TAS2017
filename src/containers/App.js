import React, { Component } from 'react';
import './App.css';
import Book from '../components/Book';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Book/>
      </div>
    );
  }
}

export default App;
