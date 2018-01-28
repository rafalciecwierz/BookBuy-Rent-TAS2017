import React, { Component } from 'react';
import BookUtils from './BookUtils';

const Wishlist = props => {
  const coverUrl = require("../../assets/img/books/" + props.cover);
  const coverImg = {
    backgroundImage: 'url("' + coverUrl + '")'
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

export default Wishlist;
