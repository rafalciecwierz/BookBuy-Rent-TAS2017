import React, { Component } from 'react';

class BookOverview extends Component {
  back() {
    window.history.back();
  }
  render() {
    let coverImg = {
      backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
    }
    try {
      const coverUrl = require("../../assets/img/books/"+this.props.cover+".jpg") || "../../assets/img/books/undefined.jpg";
      coverImg = {
        backgroundImage: 'url("'+coverUrl+'")'
      }
    } catch(err) {}
    return (
      <div className="book-overview"
            onDoubleClick={this.back}>
        <figure className="overview__thumbnails">
          <canvas className="thumb"
                  style={coverImg}></canvas>
        </figure>
        <div className="overview__details" >
          <h2 className="details__title">{this.props.title}</h2>
          <h3 className="details__author">{this.props.author}</h3>

          <div>
            <h5 className="details__price">{this.props.price}</h5>
            <span className="details__action">Buy now</span>
            <span className="details__action">Add to wishlist &#128154;</span>
          </div>

          <p className="details__description">{this.props.description}          </p>
          <ul className="details__tags">
            {this.props.tag}
          </ul>
        </div>
      </div>
    );
  }
}

export default BookOverview;
