import React, { Component } from 'react';
import BookList from '../Books/BookList';
import books from '../../data-books.json';

class UserProfile extends Component {
  render() {
    const bookList = books.trending;

    return (
      <div className="user-profile">
        <header  className="user-profile__header">
          <canvas className="header__avatar"></canvas>
          <div>
            <h2 className="header__name">Alice Cooper</h2>
            <p className="header__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris pariatur.  anim id est laborum.</p>
          </div>
        </header>
        <BookList
              books={bookList}
              name="Most popular"/>
      </div>
    );
  }
}

export default UserProfile;
