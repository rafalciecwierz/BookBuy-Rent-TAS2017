import React from 'react';

const OrderItem = (props) => {

    return (
      <div className="order-item">
        <div className="order-item_id">OrderId: {props.id}</div>
        <div className="order-item_uid">UserId: {props.userId}</div>
        <div className="order-item_uid">User mail: {props.userMail}</div>
        <div className="order-item_uid">username: {props.username}</div>
        <div className="order-item_price">Price: {props.price}</div>
      </div>
    );
}

export default OrderItem;
