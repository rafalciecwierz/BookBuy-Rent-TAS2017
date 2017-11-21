import React, { Component } from 'react';
import axios from 'axios';

import BookOverview from '../components/Books/BookOverview';


class BookPage extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      data: []
    };
    this.loadBookFromServer = this.loadBookFromServer.bind(this);
  }
  loadBookFromServer() {
	  console.log(this.id);
    axios.get(`http://localhost:3001/api/books/${this.id}`)
    .then(res => {
      this.setState({
        data: res.data
      });
    })
  }
  componentDidMount() {
    this.loadBookFromServer();
  }
  render() {
    const book = this.state.data;
    return (
      <BookOverview
      title={book.title}
      cover={book.cover}
      author={book.author}
      price={book.price}
      tag={book.tag}
      likes={book.likes}
      description={book.description}/>

    );
  }
}

export default BookPage;
