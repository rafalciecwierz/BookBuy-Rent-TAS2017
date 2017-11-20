import React, { Component } from 'react';
import BookUtils from './BookUtils';

class BookListItem extends Component {
  render() {
    const coverUrl = require("../../assets/img/books/"+this.props.cover+".jpg");
    const coverImg = {
      backgroundImage: 'url("'+coverUrl+'")'
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
                <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              </div>
              <div className="action__comment">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <form className="action__edit-form">
                <label for="comment">Review comment:</label>
                <textarea rows="5" className="edit-form__comment" id="comment"></textarea>
                <label for="stars">Stars: <span>&#9733;</span></label>
                <input className="edit-form__stars"id="stars" type="number"/>
              </form>
              <button className="action__edit-button">Edit Review</button>
            </div>
          </figcaption>
        </figure>
      </div>
    );

  }
}

export default BookListItem;
