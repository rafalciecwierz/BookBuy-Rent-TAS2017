import React, { Component } from 'react';
import Book from "./Book"
class BookList extends Component {
  render() {
    const books = this.props.books;
    const bookList = books.map((book, index) =>
      <li>
        <Book
          key={index}
          title={book.title}
          cover={book.cover}
          author={book.author}
          price={book.price}
          tag={book.tag}
          likes={book.likes}/>
      </li>
    );
    return (
      <div>
        <ul>
          {bookList}
        </ul>
      </div>
    );
  }
}

export default BookList;
