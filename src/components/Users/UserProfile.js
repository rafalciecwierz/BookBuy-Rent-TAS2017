import React, { Component } from 'react';
import BookList from '../Books/BookList';
import books from '../../data-books.json';
import axios from 'axios';

class UserProfile extends Component {

  loadOrders = () => {
    axios.get("http://localhost:3001/api/orders/user_orders")
      .then( res => {
        console.log(res);
        // alert("Last order: " + JSON.stringify(res.data.orders[res.data.orders.length - 1]));
      }).catch(err => {console.log(err)});
  }



  render() {
    const bookList = books.trending;
    this.loadOrders();
    return (
      <div className="user-profile">
        <header  className="user-profile__header">
          <canvas className="header__avatar"></canvas>
          <div>
            <h2 className="header__name">Alice Cooper</h2>
            <p className="header__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris pariatur.  anim id est laborum.</p>
          </div>
        </header>
        <BookList
              books={bookList}
              name="Most popular"/>
      </div>
    );
  }
}

export default UserProfile;
