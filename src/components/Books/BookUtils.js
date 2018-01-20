import React, { Component } from 'react';

const BookUtils = props => {
  return (
    <div className="book-utils">
      <h6 className="book-utils__tag">{props.tag}</h6>
      <div className="book-utils__actions">
        <i className="book-utils__icon icon--wish-small"></i>
        <span className="book-utils__likes">{props.likes}</span>
        <i className="book-utils__icon icon--buy-small"></i>
      </div>
    </div>
  );
}

export default BookUtils;
