import React, { Component } from 'react';
import BookUtils from './BookUtils';

class Book extends Component {
  render() {
    return (
      <div className="book">
        <h5 className="book__price">{this.props.price}</h5>
        <figure className="book__card">
          <canvas className="book__cover"
                  cover={this.props.cover}></canvas>
          <figcaption className="book__details">
            <p>{this.props.title}</p>
            <p>by {this.props.author}</p>
          </figcaption>
        </figure>
        <BookUtils tag={this.props.tag} likes={this.props.likes}/>
      </div>
    );
  }
}

export default Book;
