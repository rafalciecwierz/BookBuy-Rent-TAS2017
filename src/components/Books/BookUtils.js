import React, { Component } from 'react';
import axios from 'axios';

const BookUtils = props => {

  function handleAddToCart(){
      axios.post("http://localhost:3001/api/orders/" + props.id + "/cart/add", {
        bookId: props.id
      }).then(res => {
        console.log(res.data.message);
        if(res.data.totalQty){ // checks if it was okey
          alert(res.data.message +" You have added " + res.data.totalQty + " books, total price = " + res.data.totalPrice);
          // add something nicer than this alert
        } else { // if it couldn't be done for some reason, show message
          alert(res.data.message)
        }
      }).catch(error => {
        console.log(error);
      });
    }

  function  addToWishlist(){
      axios.post("http://localhost:3001/api/books/" + props.id + "/wishlist",
    { bookId: props.id
    }).then(res => {
        alert(res.data.message);
        window.location= "/"
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="book-utils">
      <h6 className="book-utils__tag">{props.tag}</h6>
      <div className="book-utils__actions">
        <i className="book-utils__icon icon--wish-small" onClick={addToWishlist}></i>
        <span className="book-utils__likes">{props.likes}</span>
        <i className="book-utils__icon icon--buy-small" onClick={handleAddToCart}></i>
      </div>
    </div>
  );
}

export default BookUtils;
