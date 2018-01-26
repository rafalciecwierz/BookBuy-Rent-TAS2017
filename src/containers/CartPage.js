import React, { Component } from 'react';
import CartList from "../components/Cart/CartList"

class CartPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			items: []
		}
	}

	// loadCart = () => {
	// 	return;
	// }

	// componentDidMount() {
	// 	// loadCart();
	// }

  render() {
    return (
        <CartList />
    );
  }
}

export default CartPage;
