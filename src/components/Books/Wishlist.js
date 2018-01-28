import React, { Component } from 'react';
import BookUtils from './BookUtils';
import { Link } from "react-router-dom";

const Wishlist = props => {
  const coverUrl = require("../../assets/img/books/" + props.cover);
  const coverImg = {
    backgroundImage: 'url("' + coverUrl + '")'
  }

  // Wishlist
  return (
    <div className="book book-thumbnail">
    <Link to={{pathname: `/books/${props.id}`}}>
      <figure className="book__card">
        <canvas className="book__cover"
                style={coverImg}></canvas>
      </figure>
      </Link>
    </div>
  );
}

export default Wishlist;
