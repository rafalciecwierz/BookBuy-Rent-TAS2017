import React, { Component } from 'react';
import BookUtils from './BookUtils'

class Book extends Component {
  render() {
    return (
      <div className="book">
        <BookUtils />
        <div className="book_info">
          <h1>The littlest bird</h1>
          <h2>Annie F. Gilbert</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <img className="book_cover"
          src="https://marketplace.canva.com/MACBT56QCxE/1/0/thumbnail_large/canva-yellow-brown-bird-illustration-little-childrens-book-cover-MACBT56QCxE.jpg"/>
      </div>
    );
  }
}

export default Book;
