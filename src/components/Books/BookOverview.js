import React, { Component } from 'react';

function BookOverview(props) {
  let coverImg = {
    backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
  }

  try {
    const coverUrl = require("../../assets/img/books/"+props.cover) || "../../assets/img/books/undefined.jpg";
    coverImg = {
      backgroundImage: 'url("'+coverUrl+'")'
    }
  } catch(err) {}

  const back = () => {window.history.back()}

  return (
    <div className="book-overview">
      <figure className="overview__thumbnails">
        <canvas className="thumb"
                style={coverImg}></canvas>
      </figure>
      <div className="overview__details" >
        <button className="button-back"
          onClick={back}><i></i></button>
        <h2 className="details__title">{props.title}</h2>
        <h3 className="details__author">{props.author}</h3>

        <div>
          <h5 className="details__price">{props.price}</h5>
          <span className="details__action">Buy now</span>
          <span className="details__action">Add to wishlist &#128154;</span>
        </div>

        <p className="details__description">{props.description}</p>
        <ul className="details__tags">
          {props.tag}
        </ul>
      </div>
    </div>
  );
}

export default BookOverview;
