import React, { Component } from 'react';
import BookUtils from './BookUtils';

class Book extends Component {

  render() {
    let coverImg = {
      backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
    }
    try {
      const coverUrl = require("../../assets/img/books/" + this.props.cover) || "../../assets/img/books/undefined.jpg";
      coverImg = {
    		backgroundImage: 'url("' + coverUrl + '")'
      }
    } catch(err) {
      console.log(err);
    }

    return (
      <div className="book">
        <h5 className="book__price">{this.props.price}</h5>

        <figure className="book__card">
          <canvas className="book__cover"
                  style={coverImg}></canvas>
          <figcaption className="book__details">
            <p className="details--title">{this.props.title}</p>
            <p>by {this.props.author}</p>
          </figcaption>
        </figure>

        <BookUtils tag={this.props.tag}
                   likes={this.props.likes}/>
      </div>

    );
  }
}

export default Book;
