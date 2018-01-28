import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PurchaseItem from "./PurchaseItem";

class Purchase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookIds: {}, //TODO: throw it away since  it's totally redundant - books.book._id is the id.
			books: [], // [{book: book, qty: Num, price: Num}]
			totalPrice: 0,
			qty: 0,
			received: false
		};
		// by default cart has: 
		this.loadCartFromServer = this.loadCartFromServer.bind(this);
	}

	loadCartFromServer() { 
		axios.get("http://localhost:3001/api/orders/cart_get")
			.then(res => {
				this.setState({
					bookIds: res.data.bookIds,
					books: res.data.books,
					totalPrice: res.data.totalPrice,
					qty: res.data.totalQty,
					received: true
				});
			});
	}


	componentWillMount() {
		this.loadCartFromServer();
	}

	buyClick = () => {
		axios.post("http://localhost:3001/api/orders/create_order")
			.then(res => {
				alert(res.data.message);
				// TODO: dodaj przenoszenie do formularza z jakimiś danymi
			}).catch(err => {
				console.log(err);
				alert("Something went wrong!");
			})
	}



	render() {
		// TODO: display some message, that one must press sth (save bttn?) to save the changes made here

		let logged = localStorage.getItem('isLogged')

		if(!(logged === true)){
			return(<h3 className="cart-list__empty-text"> You must be logged in to view this page! </h3>);
		} //

		if(!this.state.received){
			return("")
		}

		if(this.state.qty === 0 && this.state.received) // received - don't show before receiving books
			return ( <h3 className="cart-list__empty-text"> Your cart is empty. </h3> ) //

		const itemList =  this.state.books.map((item, index) =>
			<li key={index} className="cart-list">
					<PurchaseItem
						id={item.book._id}
						title={item.book.title}
						cover={item.book.cover}
						price={item.book.price}
						totalPrice={item.price}
						qty={item.qty}
						/>
			</li>
		);

		return (
			<div>
				<div className="cart-list__actions">
					<div className="cart-list__buttons">
						<div className="cart-list__buy" onClick={ this.buyClick }> buy </div>
					</div>
					<div className="cart-list__info">
						<div className="cart-list__price">{ this.state.totalPrice }</div>
						<div className="cart-list__qty">{ this.state.qty }</div>
					</div>
				</div>
				<ul className="book-list__cards">
					{ itemList }
				</ul>
			</div>
		);
	}
}

export default Purchase;
