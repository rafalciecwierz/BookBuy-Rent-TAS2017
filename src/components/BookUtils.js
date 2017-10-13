import React, { Component } from 'react';
import './BookUtils.css';

class BookUtils extends Component {
  render() {
    return (
      <div className="book-utils">
        <i className="book-utils_icon"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-128.png"/></i>
        <i className="book-utils_icon"><img src="https://cdn3.iconfinder.com/data/icons/glypho-free/64/shopping-purse-512.png"/></i>
      </div>
    );
  }
}

export default BookUtils;
