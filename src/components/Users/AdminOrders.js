import React, { Component } from 'react';
import OrderItem from '../Actions/OrderItem';
import axios from 'axios';

class AdminOrders extends Component{
 constructor(props){
  super(props);
  this.state = {
    orders: [],
    order: {},
    details: []
  }
 }

 loadAcceptedOrders = () => {
  this.loadOrders('accepted');
 }

  loadAwaitingOrders = () => {
    this.loadOrders('awaiting payment')
 }

 loadFinishedOrders = () => {
  this.loadOrders('completed')
 }

  loadOrders = (status) => {
  axios.get("http://localhost:3001/api/orders/status", {
    params: {status: status}
  })
    .then( res => {
      console.log(res);
      this.setState({orders: res.data.orders, order: {}, details: []});
    }).catch(err => {console.log(err)});
 }

 selectOrder = (order, e) => {
  console.log(order._id)
  axios.get("http://localhost:3001/api/orders/details", {
    params: {orderId: order._id}
  }).then( res => {
    console.log(res)
    this.setState({order: res.data.order, details: res.data.details})
  }).catch(err => {console.log(err)})
 }

 accept = () => {
  if(!this.state.order)
    return
  if(this.state.order.status === "accepted"){
    alert("Order is allready accepted!")
    return
  }
  if(this.state.order.status === "finished"){
    alert("Order is allready finished!")
    return
  }
  axios.post("http://localhost:3001/api/orders/change_state", {
    id: this.state.order._id,
    status: "accepted"
  }).then(res => {
    this.loadAcceptedOrders();
  }).catch(err => {
    console.log(err)
    alert("Something went wrong!")
  })
 }

  finish = () => {
    if(!this.state.order)
      return
    if(this.state.order.status === "awaiting payment"){
      alert("Order must be accepted first!")
      return
    }
    if(this.state.order.status === "finished"){
      alert("Order is allready finished!")
      return
    }
    axios.post("http://localhost:3001/api/orders/change_state", {
      id: this.state.order._id,
      status: "completed"
    }).then(res => {
      axios.post("http://localhost:3001/api/users/add_bought", {
        id: this.state.order.user._id,
        bookIds: this.state.order.book.map(book => book._id)
      }).then(res => {}).catch(err => { console.log(err) })
      this.loadFinishedOrders()
    }).catch(err => {
      console.log(err)
      alert("Something went wrong!");
    })
 }

 remove = () => {
  if(!this.state.order)
    return
  axios.post("http://localhost:3001/api/orders/remove", {
    id: this.state.order._id
  }).then(res => {
    this.setState({order: {}, orders: []})
    this.loadAwaitingOrders()
  }).catch(err => {
      console.log(err)
      alert("Something went wrong!")
  })
 }
  
  
  render() {
    let logged = localStorage.getItem('isLogged')

    if(!(logged === 'true')){
      return(<h3 className="cart-list__empty-text"> You do not have the rights to view this page! </h3>);
    } //


    const orderList =  this.state.orders.map((order, index) =>
      <div key={index} className="admin-orders__scrollbar-item" onClick={this.selectOrder.bind(null, order)}>
          <OrderItem
            id={order._id}
            userId={order.user._id}
            userMail={order.user.email}
            username={order.user.username}
            status={order.status}
            price={order.value}
            />
      </div> 
    ); //

    const orderDetails = this.state.details.map((detail, index) =>
          <div key={index} className="admin-orders__scrollbar-item">
          <div className="order-details">
            <div>BookId: {detail.book._id}</div>
            <div>Title: {detail.book.title}</div>
            <div>Quantity: {detail.qty}</div>
          </div>
      </div> 
      );


    return(
      <div className="admin__actions admin-orders">
          <h2 className="form__header">Manage orders</h2>
          <div className="admin-orders__order-selection">
            <div className="admin-orders__orders-waiting" onClick={this.loadAwaitingOrders}> waiting </div>
            <div className="admin-orders__orders-accepted" onClick={this.loadAcceptedOrders}> accepted </div>
            <div className="admin-orders__orders-finished" onClick={this.loadFinishedOrders}> finished </div>
          </div>
          <div className="admin-orders__orders-scrollbar">
            {orderList}
          </div>
          <div className="admin-orders__orders-scrollbar">
            {orderDetails}
          </div>
          <div>
          <ul className="admin-orders_action">
            <li className="admin-card card--confirm">
              <button className="card__status" onClick={this.accept}>Accept</button>
              <span className="text--id">{this.state.order._id}</span>
            </li>
            <li className="admin-card card--finished">
              <button className="card__status" onClick={this.finish}>Finish</button>
              <span className="text--id">{this.state.order._id}</span>
            </li>
            <li className="admin-card card--delete">
              <button className="card__status" onClick={this.remove}>Delete</button>
              <h5>{this.state.order._id}</h5>
            </li>
          </ul>
          </div>
      </div>);
  }
}

export default AdminOrders;
