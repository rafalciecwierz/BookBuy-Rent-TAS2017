import React, { Component } from 'react';
import Book from "./Book"
class BookList extends Component {
  render() {
    const books = this.props.books;
    const bookList = books.map((book, index) =>
      <li key={index}>
        <Book
          title={book.title}
          cover={book.cover}
          author={book.author}
          price={book.price}
          tag={book.tag}
          likes={book.likes}/>
      </li>
    );
    return (
      <div className="book-list">
        <ul className="book-list__cards">
          {bookList}
        </ul>
      </div>
    );
  }
}

export default BookList;
