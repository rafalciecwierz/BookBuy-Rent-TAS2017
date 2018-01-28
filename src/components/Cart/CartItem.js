import React, { Component } from 'react';

class CartItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      price: props.price,
      totalPrice: props.totalPrice,
      qty: props.qty,
      add: props.add,
      remove: props.remove
    };
  }

  remove = () => {
    this.setState({
      qty: this.state.qty - 1,
      totalPrice: this.state.totalPrice - this.state.price
    });
    this.state.remove(this.state.id, this.state.price);
  }

  add = () => {
    this.setState({
      qty: this.state.qty + 1,
      totalPrice: this.state.totalPrice + this.state.price
    });
    this.state.add(this.state.id, this.state.price);
  } 

  
  render() {


      if(this.state.qty === 0)
        return ("");


      let coverImg = {
          backgroundImage: 'url("../../assets/img/books/undefined.jpg")'
        }
      try {
        const coverUrl = require("../../assets/img/books/" + this.props.cover) || "../../assets/img/books/undefined.jpg";
        coverImg = {
          backgroundImage: 'url("' + coverUrl + '")'
        }
      } catch(err) {
        console.log(err);
      }


      return (
      <div className="book">
        <h5 className="book__price">{this.state.price}</h5>
        <figure className="book__card">
          <canvas className="book__cover" style={coverImg}></canvas>
          <figcaption className="book__details">
            <p className="cart-item-utils__title">{this.state.title}</p>
            <p className="cart-item-utils__qty">{this.state.qty}</p>
            <p className="cart-item-utils__total-price">{this.state.totalPrice}</p>
          </figcaption>
        </figure>
    <div className="cart-item-utils">
        <i className="cart-item__icon icon--remove-small" onClick={this.remove}></i>
        <i className="cart-item__icon icon--add-small" onClick={this.add}></i>
    </div>
    </div>
        );


    // return (

    //   <div className="cart-item">
    //     <div className="cart-item__brick_left">
    //       <figure className="book__card">
    //         <canvas className="book__cover"
    //               style={coverImg}></canvas>
    //       </figure>
    //     </div>

    //     <div className="cart-item__brick_mid">
    //       <div className="book_details">
    //         <p className="title"> { this.state.title }</p> <br />
    //         {/* <p className="author"> { this.state.author } </p> */} <br /><br /> 
    //         <p className="price"> { this.state.price } </p>
    //       </div>
    //     </div>

    //     <div className="cart-item__brick_right">
    //       <div className="details">
    //         <span className="qty">
    //              Quantity: { this.state.qty }
    //         </span>
    //         <div className="action_container">
    //             <p className="action_add" onClick = { this.add }> + </p>
    //             <p className="action_subtract" onClick={ this.remove }> - </p>
    //         </div>
    //         <p className="total_price">{ this.state.totalPrice }</p>
    //       </div>
    //     </div>

    //   </div>
    // );
  }
}

export default CartItem;
