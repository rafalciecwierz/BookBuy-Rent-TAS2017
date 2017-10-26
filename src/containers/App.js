import React, { Component } from 'react';
import Nav from '../components/Nav';
import BookList from '../components/BookList';
import books from '../data-books.json';
import './App.css';


class App extends Component {
  render() {
    const bookList = books.trending;

    return (
      <div className="App">
        <Nav />
        <BookList books={bookList}/>
      </div>
    );
  }
}

export default App;
