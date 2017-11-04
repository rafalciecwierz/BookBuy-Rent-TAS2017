import React, { Component } from 'react';

class BookOverview extends Component {
  render() {
      return (
      <div className="book-overview">
        <figure className="overview__thumbnails">
          <canvas className="thumb"></canvas>
        </figure>
        <div className="overview__details" >
          <h2 className="details__title">Cannibals in love</h2>
          <h3 className="details__author">Mike Roberts</h3>

          <div>
            <h5 className="details__price">10</h5>
            <span className="details__action">Buy now</span>
            <span className="details__action">Add to wishlist &#128154;</span>
          </div>

          <p className="details__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ul className="details__tags">
            <li>comedy</li>
            <li>action</li>
          </ul>
          <div className="details__comments">
            <div className="comment">
              <canvas className="comment__avatar"></canvas>
              <div>
                <div className="comment__header">
                  <h6 className="header__user">Mike R.</h6>
                  <span>&#128717;</span>
                  <span>&#128154;</span>
                  <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </div>
                <p className="comment__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                </p>
              </div>
            </div>
            <div className="comment">
              <canvas className="comment__avatar"></canvas>
              <div>
                <div className="comment__header">
                  <h6 className="header__user">Mike R.</h6>
                  <span>&#128717;</span>
                  <span>&#128154;</span>
                  <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </div>
                <p className="comment__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                </p>
              </div>
            </div>
            <div className="comment">
              <canvas className="comment__avatar"></canvas>
              <div>
                <div className="comment__header">
                  <h6 className="header__user">Mike R.</h6>
                  <span>&#128717;</span>
                  <span>&#128154;</span>
                  <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                </div>
                <p className="comment__content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
                </p>
              </div>
            </div>

          </div>
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
