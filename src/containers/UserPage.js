import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from '../components/Users/UserProfile';
import BookListItem from '../components/Books/BookListItem';
import Wishlist from '../components/Books/Wishlist';

class UserPage extends Component {
  constructor(props) {
    super(props);
   // this.id = props.match.params.id;
    this.state = {
      wishlist: [],
      bought: [],
      user: []
    };
    this.loadUser= this.loadUser.bind(this);
    this.loadWishlist= this.loadWishlist.bind(this);
    this.loadBought= this.loadBought.bind(this);
  }

  loadUser() {
    axios.get(`http://localhost:3001/api/users`)
    .then(res => {
      console.log('user');
      console.log(res.data);
      if(res.data){
      this.setState({
        user: res.data
      });
    }
    else { // if it couldn't be done for some reason, show message
    alert(res.data.message)
  }
    //}
    }).catch(error => {
      console.log(error);
    })
  }

  loadWishlist() {
    axios.get(`http://localhost:3001/api/users/wishlist`)
    .then(res => {
      console.log('wishlist');
      console.log(res.data);
      if(res.data){
      this.setState({
        wishlist: res.data
      });
    }
    else { // if it couldn't be done for some reason, show message
    alert(res.data.message)
    }
    }).catch(error => {
      console.log(error);
    })
  }

  loadBought() {
    axios.get(`http://localhost:3001/api/users/bought`)
    .then(res => {
      console.log('bought');
      console.log(res.data);
      if(res.data){
      this.setState({
        bought: res.data
      });
    }
    else { // if it couldn't be done for some reason, show message
    alert(res.data.message)
    }
    }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.loadUser();
    this.loadWishlist();
    this.loadBought();
  }

  render() {
    //this.loadUser();
    //this.loadWishlist();
    //this.loadBought();
    if(this.state.user.username){ 
      const user = this.state.user;
      console.log(this.state.user);
      let wishlistList = [];
      if(this.state.wishlist.length > 0 ){
        wishlistList = this.state.wishlist.map((book, index) =>
        <li key={index}>
          <Wishlist
            cover = {book.cover}/>
        </li>
        );
      }
      let boughtList = [];
      if(this.state.bought.length > 0 ){
      boughtList = this.state.bought.map((book, index) =>
			<li key={index}>
				<BookListItem
          id = {book._id}
          title={book.title}
          cover={book.cover}
          author={book.author.name}
          price={book.price}
          tag={book.tag[0].name}
          likes={book.likes}
          description={book.description}/>
			</li>
      );
    }
      return (
        <div className="UserPage">
          <UserProfile 
          user = {user}
          wishlist = {wishlistList}
          bought = {boughtList}/>
        </div>
      );
    }
    else {
      return (
  		  <div className="UserPage">
          <UserProfile 
          user = {[]}
          wishlist={[]}
          bought={[]}
          />
        </div>
  	);
    }
    
  }
}

export default UserPage;
