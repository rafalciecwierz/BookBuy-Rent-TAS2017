import React from 'react';

const PurchaseItem = (props) => {
    if(props.qty === 0)
      return ("");


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
        <canvas className="book__cover" style={coverImg}></canvas>
        <figcaption className="book__details">
          <p className="cart-item-utils__title">{props.title}</p>
          <p className="cart-item-utils__qty">{props.qty}</p>
          <p className="cart-item-utils__total-price">{props.totalPrice}</p>
        </figcaption>
      </figure>
  </div>
      ); //
}

export default PurchaseItem;
