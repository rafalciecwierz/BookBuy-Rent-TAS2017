import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Book from "./Book";
import Wishlist from "./Wishlist";
import BookListItem from "./BookListItem";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadBooksFromServer = this.loadBooksFromServer.bind(this);
  }

  loadBooksFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
  }
  componentDidMount() {
    this.loadBooksFromServer();
  }
  render() {
    const bookList = this.state.data.map((book, index) =>
      <li key={index}>
        <Link to={{pathname: `/books/${book._id}`}}>
          <Book
            title={book.title}
            cover={book.cover}
            author={book.author.name}
            price={book.price}
            tag={book.tag[0].name}
            likes={book.likes}/>
        </Link>
      </li>
    );

    return (
      <div className="book-list">
        <h2 className="book-list__header">{this.props.name}</h2>
        <ul className="book-list__cards">
          {bookList}
        </ul>
      </div>
    );
  }
}

export default BookList;
