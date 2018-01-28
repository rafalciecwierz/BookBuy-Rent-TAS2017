import React, { Component } from 'react';
import BookList from '../Books/BookList';
import books from '../../data-books.json';
import axios from 'axios';

class UserProfile extends Component {
  constructor(props){
    super(props)
    this.props = props;
  }

  loadOrders = () => {
    axios.get("http://localhost:3001/api/orders/user_orders")
      .then( res => {
        console.log(res.data);
        // alert("Last order: " + JSON.stringify(res.data.orders[res.data.orders.length - 1]));
      }).catch(err => {console.log(err)});
  }



  render() {
    //const bookList = books.trending;
    this.loadOrders();
    console.log(this.props);
    return (
      <div className="user-profile">
        <header  className="user-profile__header">
          <canvas className="header__avatar"></canvas>
          <div>
            <h2 className="header__name">{this.props.user.username}</h2>
            <p className="header__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris pariatur.  anim id est laborum.</p>
          </div>
        </header>
        <div className="book-list">
				<h2 className="book-list__header">Bought</h2>
				<ul className="book-list__cards">
					{this.props.bought}
				</ul>
			</div>
        <div className="book-list">
				<h2 className="book-list__header">Wishlist</h2>
				<ul className="book-list__cards">
					{this.props.wishlist}
				</ul>
			</div>
     </div> 
    );
  }
}

export default UserProfile;
