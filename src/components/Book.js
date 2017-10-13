import React, { Component } from 'react';
import BookUtils from './BookUtils';
import './Book.css'

class Book extends Component {
  render() {
    return (
      <div className="book">
        <BookUtils />
        <div className="book_info">
          <div className="book_info--content">
            <h1>The littlest bird</h1>
            <h2>Annie F. Gilbert</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

      </div>
    );
  }
}

export default Book;
