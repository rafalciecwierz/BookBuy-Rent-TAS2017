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
			received: false,
			confirmed: false
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
		let userId = localStorage.getItem('userId');

		this.loadCartFromServer();
	}

	confirmClick = () => {
		axios.post("http://localhost:3001/api/orders/create_order")
			.then(res => {
				axios.post("http://localhost:3001/api/orders/cart/del")
					.catch( err => {
						console.log(err);
						alert("Womething went wrong!");
					});
				this.setState({confirmed: true});
				alert(res.data.message);
			}).catch(err => {
				console.log(err);
				alert("Something went wrong!");
			})
	}



	render() {
		// TODO: display some message, that one must press sth (save bttn?) to save the changes made here

		let logged = localStorage.getItem('isLogged')
		let username = localStorage.getItem('userName')
		let mail = localStorage.getItem('userMail')


		if(!(logged === 'true')){
			return(<h3 className="cart-list__empty-text"> You must be logged in to view this page! </h3>);
		} //

		if(!this.state.received){
			return("")
		}

		if(this.state.confirmed){
			return (
				<div className="purchase-form__text-container">
						<div className="purchase-form_instruction"> Please transfer ${this.state.totalPrice} to the account:  </div>
						<p className="purchase-form_account-number"> Account number: 11111111111 </p>
						<div className="purchase-form_instruction"> With details: Client: {username}. Mail: {mail}.</div>
						<div className="purchase-form_info"> As soon as we receive the payment we will send you your books and
							licences to the address: {mail}.</div>
					</div>
					);
		}

		if(this.state.qty === 0 && this.state.received) // received - don't show before receiving books
			return ( <h3 className="cart-list__empty-text"> You do not have anything to order. </h3> ) //

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
					<div className="purchase-form__order-details"> Order details </div>
					<div className="purchase-form__text-container">
						<div className="purchase-form_conf_msg"> Please check the details and press "confirm" to confirm the order. </div>
						<div className="purchase-form_instruction"> After confirmation, please transfer ${this.state.totalPrice} to the accont:  </div>
						<p className="purchase-form_account-number"> Account number: 11111111111 </p>
						<div className="purchase-form_instruction"> With details: Client: {username}. Mail: {mail}.</div>
						<div className="purchase-form_info"> As soon as we receive the payment we will send you your books and
							licences to the address: {mail}.</div>
					</div>
					<div className="purchase-form_confirm-button" onClick={this.confirmClick}>confirm</div>
				<ul className="book-list__cards">
					{ itemList }
				</ul>
			</div>
		);
	}
}

export default Purchase;
