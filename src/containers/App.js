import React, { Component } from 'react';
import Nav from '../components/Nav';
import BookList from '../components/BookList';
import BookOverview from '../components/BookOverview';
import Register from '../components/Register';
import Login from '../components/Login';
import UserProfile from '../components/UserProfile';
import books from '../data-books.json';


class App extends Component {
  render() {
    const bookList = books.trending;

    // return (
    //   <div className="App">
    //     <Nav />
    //     <Register />
    //   </div>
    // );
    return (
      <div className="App">
        <Nav />
        <BookList
          books={bookList}
          name="Most popular"/>

      </div>
    );
  }
}

export default App;
