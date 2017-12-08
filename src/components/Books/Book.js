import React, { Component } from 'react';
import BookUtils from './BookUtils';

function Book(props) {
  let coverImg = {
      backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
    }
    try {
      const coverUrl = require("../../assets/img/books/" + props.cover) || "../../assets/img/books/undefined.jpg";
      coverImg = {
    		backgroundImage: 'url("' + coverUrl + '")'
      }
    } catch(err) {
      console.log(err);
    }

    return (
      <div className="book">
        <h5 className="book__price">{props.price}</h5>

        <figure className="book__card">
          <canvas className="book__cover"
                  style={coverImg}></canvas>
          <figcaption className="book__details">
            <p className="details--title">{props.title}</p>
            <p>by {props.author}</p>
          </figcaption>
        </figure>

        <BookUtils tag={props.tag}
                   likes={props.likes}/>
      </div>
    );
}

export default Book;
