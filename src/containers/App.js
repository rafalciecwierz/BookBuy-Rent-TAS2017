import React, { Component } from 'react';
import Nav from '../components/Nav';
import books from '../data-books.json'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {JSON.stringify(books)}

      </div>
    );
  }
}

export default App;
