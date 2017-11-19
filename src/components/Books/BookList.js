import React, { Component } from 'react';
import axios from 'axios';
import Book from "./Book";

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
        console.log(this.state.data);
      })
  }
  componentDidMount() {
    this.loadBooksFromServer();
  }
  render() {
    const bookList = this.state.data.map((book, index) =>
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
        <h2 className="book-list__header">{this.props.name}</h2>
        <ul className="book-list__cards">
          {bookList}
        </ul>
      </div>
    );
  }
}

export default BookList;
