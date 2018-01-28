import React, {Component} from 'react';

const BookComments = props => {
  console.log(props);
  let mark = null;
  if(props.mark  == 1)
    mark = <span>&#9733;</span>;
  else if(props.mark == 2)
    mark = <span>&#9733;&#9733;</span>;
  else if(props.mark == 3)
    mark = <span>&#9733;&#9733;&#9733;</span>;
  else if(props.mark == 4)
    mark = <span>&#9733;&#9733;&#9733;&#9733;</span>;
  else if(props.mark == 5)
    mark = <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>;
  return (
      <div className="comment">
        <canvas className="comment__avatar"></canvas>
        <div>
          <div className="comment__header">
            <h6 className="header__user">{props.user}</h6>
            {mark}
          </div>
          <p className="comment__content">
          {props.comment}
          </p>
        </div>
      </div>
  );
}

export default BookComments;
