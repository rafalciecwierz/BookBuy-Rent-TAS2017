import React, { Component } from 'react';
import axios from "axios";

class BookOverview extends Component {
  constructor(props){
    super(props)
    this.props = props;
  }

  handleAddToCart = () => {
    console.log(this.props.id);
    axios.post("http://localhost:3001/api/orders/" + this.props.id + "/cart/add", {
      bookId: this.props.id
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

  handleBuyNowClick = () => {
    // tutaj jeszcze nie wymagamy bycia zalogowanym.
    axios.post("http://localhost:3001/api/orders/" + this.props.id + "/cart/add",
    {
      bookId: this.props.id
    }).then(res => {
      if(res.data.totalQty){
        window.location = '/cart';
      }
      else {
        alert(res.data.message);
      }
    }).catch(err => {console.log(err);})
  }

  addToWishlist = () => {
    axios.post("http://localhost:3001/api/books/" + this.props.id + "/wishlist",
  { bookId: this.props.id
  }).then(res => {
      alert(res.data.message);
  }).catch(function (error) {
    console.log(error);
  });
}

  render() {

      let coverImg = {
      backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
    }

    try {
      const coverUrl = require("../../assets/img/books/"+this.props.cover) || "../../assets/img/books/undefined.jpg";
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
          <h2 className="details__title">{this.props.title}</h2>
          <h3 className="details__author">{this.props.author}</h3>
          <div>
            <h5 className="details__price">{this.props.price}</h5>
            <span className="details__action" onClick={ this.handleBuyNowClick }>Buy now</span>
            <span className="details__action" onClick = {this.handleAddToCart}>Add to cart</span>
            <span className="details__action" onClick = {this.addToWishlist}>Add to wishlist &#128154;</span>
          </div>

          <p className="details__description">{this.props.description}</p>
          <ul className="details__tags">
            {this.props.tag}
          </ul>
          <div className="comments">
					{this.props.commentList}
		    </div>
        </div>
      </div>
    );
  }
}

export default BookOverview;
