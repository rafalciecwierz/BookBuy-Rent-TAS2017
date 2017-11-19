import React, { Component } from 'react';
import BookList from '../components/Books/BookList';

import books from '../data-books.json';

class Home extends Component {
  render() {
    const bookList = books.trending;

    return (
      <BookList
        books={bookList}
        name="Most popular"/>

    );
  }
}

export default Home;
