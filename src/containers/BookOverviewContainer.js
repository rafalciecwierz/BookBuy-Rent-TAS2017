import React, { Component } from 'react';
import axios from 'axios';
import BookOverview from '../components/Books/BookOverview';
import BookComments from '../components/Books/BookComments';

class BookOverviewContainer extends Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.state = {
      data: []
    };
    this.loadBookFromServer = this.loadBookFromServer.bind(this);
  }

  loadBookFromServer() {
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
	  if(this.state.data.book){
      console.log(this.state.data);
      const book = this.state.data.book;
      const commentList = this.state.data.comments.map((comment, index) =>
			<li key={index}>
				<BookComments
					user={comment.user.username}
					comment={comment.comment}
          mark={comment.mark}/>
			</li>
		);
		return (
		  <BookOverview
      id = {this.id}
		  title={book.title}
		  cover={book.cover}
		  author={book.author.name}
		  price={book.price}
		  tag={book.tag[0].name}
		  likes={book.likes}
		  description={book.description}
      commentList = {commentList}/>

		);
	  }
	  else {
		  return (
  		  <BookOverview />
  		);
	  }
  }
}

export default BookOverviewContainer;
