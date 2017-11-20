import React, { Component } from 'react';
import BookList from '../components/Books/BookList';

import books from '../data-books.json';

class Home extends Component {
  render() {
    const bookList = books.trending;

    return (
      <BookList
        name="Most popular"
        url='http://localhost:3001/api/books'/>

    );
  }
}

export default Home;
