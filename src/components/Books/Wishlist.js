import React, { Component } from 'react';
import BookUtils from './BookUtils';

class Wishlist extends Component {
  render() {
    const coverUrl = require("../../assets/img/books/"+this.props.cover+".jpg");
    const coverImg = {
      backgroundImage: 'url("'+coverUrl+'")'
    }

    // Wishlist
    return (
      <div className="book book-thumbnail">
        <figure className="book__card">
          <canvas className="book__cover"
                  style={coverImg}></canvas>
        </figure>
      </div>
    );




  }
}

export default Wishlist;
