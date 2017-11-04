import React, { Component } from 'react';

class BookOverview extends Component {
  render() {
      return (
      <div className="book-overview">
        <figure className="overview__thumbnails">
          <canvas className="thumb"></canvas>
        </figure>
        <div className="overview__details" >
          <h2 className="details--title">Cannibals in love</h2>
          <h3 className="details--author">Mike Roberts</h3>
          <p className="details--description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ul className="details--tags">
            <li>comedy</li>
            <li>action</li>
          </ul>
          <div className="details--comments"></div>
        </div>
      </div>
    );
  }
}
/**
 * cover
 * title
 * author
 * desc
 * tags
 * likes
 * comments
 */
export default BookOverview;
