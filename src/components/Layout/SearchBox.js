import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <form className="search-box">
        <input type="text" placeholder="Search" className="search-box__input"></input>
        <input type="submit" value="&#x1F50D;" className="search-box__submit"></input>
      </form>
    );
  }
}

export default SearchBox;
