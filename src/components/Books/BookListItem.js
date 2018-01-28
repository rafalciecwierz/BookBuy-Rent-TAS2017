import React, { Component } from 'react';
import BookUtils from './BookUtils';
import axios from 'axios';

class BookListItem extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      data: {
        comment: '',
        mark: '',
        bookId: '',
        userId: ''
      },
      edit:false,
      commentId:'',
    };
    this.getComment = this.getComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleSubmit(event){
    event.preventDefault();
    if(this.state.data.comment && this.state.data.mark){
      const method = this.state.edit ? 'put' : 'post';
      const urlPost = 'http://localhost:3001/api/books/'+this.props.id + '/comments';
      const urlPut = 'http://localhost:3001/api/comments/'+this.state.commentId;
      const url = this.state.edit ? urlPut : urlPost;
      console.log(url);
      console.log(this.state.data);
      axios({
        method: method,
        url: url,
        data: this.state.data,
      })
      .then(function (response) {
        alert('Comment sent!')
       // window.location= "/"
       })
       .catch(function (error) {
         console.log(error);
       });
     } else {
       alert('error in form')
     }
   }

  handleChange(event) {
    let data = this.state.data;
    let name = event.target.name
    data[name] = event.target.value;
    this.setState({data: data});
  }

  getComment() {
    axios.get("http://localhost:3001/api/users/" + this.props.id + "/comment")
      .then(res => {
        if(res.data.comment){
        this.setState({
          data: {
            comment: res.data.comment,
            mark: res.data.mark,
            bookId: res.data.book,
            userId: res.data.user
          },
          edit: true,
          commentId: res.data._id
        });
      }
      else { // if it couldn't be done for some reason, show message
        console.log(res.data.message)
      }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getComment();
  }
  
  render() {
  const coverUrl = require("../../assets/img/books/" + this.props.cover);
  const coverImg = {
    backgroundImage: 'url("' + coverUrl + '")'
  }
  return (
    <div className="book book-list-view">
      <figure className="book__card">
        <canvas className="book__cover"
                style={coverImg}></canvas>
        <figcaption className="book__details">
          <p className="details--title">{this.props.title}</p>
          <p>by {this.props.author}</p>
          <div className="details__actions">
            <div className="action__rate">
            </div>
            <div className="action__comment">
              <p>{this.props.description}</p>
            </div>
            <form className="action__edit-form">
              <label for="comment">Your comment:</label>
              <textarea rows="5" className="edit-form__comment" id="comment"
              value={this.state.data.comment}
              name="comment"
              onChange={this.handleChange}
              ></textarea>
              <label for="stars">Stars: <span>&#9733;</span></label>
              <input className="edit-form__stars"id="stars" type="number" min="0" max="5"
              value = {this.state.data.mark}
              name="mark"
              onChange={this.handleChange}
              />
            </form>
            <button className="action__edit-button" onClick={this.handleSubmit}>Done</button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
}

export default BookListItem;