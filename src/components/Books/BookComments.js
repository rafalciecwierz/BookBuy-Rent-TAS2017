import React, {Component} from 'react';

class BookComments extends Component {
  render() {
    return (
      <div className="comments">
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
    );
  }
}

export default BookComments;
