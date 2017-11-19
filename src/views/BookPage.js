import React, { Component } from 'react';
import BookOverview from '../components/Books/BookOverview';

import books from '../data-books.json';

class Home extends Component {
  render() {
    const bookList = books.trending;

    return (
      <BookOverview/>

    );
  }
}

export default Home;
