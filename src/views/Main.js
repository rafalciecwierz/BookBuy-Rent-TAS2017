import React, { Component } from 'react';
import Book from '../components/Book';
import Nav from '../components/Nav';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Nav />
        <Book />
      </div>
    );
  }
}

export default Main;
