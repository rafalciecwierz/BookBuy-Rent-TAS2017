import React, { Component } from 'react';
import Book from '../components/Book';
import Nav from '../components/Nav';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Book />
      </div>
    );
  }
}

export default Main;
