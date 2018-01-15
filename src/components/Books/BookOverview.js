import React, { Component } from 'react';
import axios from "axios";

class BookOverview extends Component {
  constructor(props){
    super(props)
    this.props = props;
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(){
    console.log(this.props.id);
    axios.post("http://localhost:3001/api/books/" + this.props.id + "/cart",
    { bookId: this.props.id
    }).then(response =>{
      console.log(response)
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
            <span className="details__action">Buy now</span>
            <span className="details__action" onClick = {this.handleAddToCart}>Add to cart</span>
            <span className="details__action">Add to wishlist &#128154;</span>
          </div>

          <p className="details__description">{this.props.description}</p>
          <ul className="details__tags">
            {this.props.tag}
          </ul>
        </div>
      </div>
    );
  }
}

export default BookOverview;
