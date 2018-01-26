import React, { Component } from 'react';
import axios from 'axios';

const AdminOrders = props => {
  return (
    <div className="admin-orders">
      <div className="admin__actions">
          <h2 className="form__header">Manage orders</h2>
          <ul>
            <li className="admin-card card--confirm">
              <h5 className="card__text">Order id: <span className="text--id">awesrdtfgvybhjnkm</span></h5>
              <button className="card__status">Finish order</button>
            </li>
            <li className="admin-card card--finished">
              <h5 className="card__text">Order id: <span className="text--id">awesrdtfgvybhjnkm</span></h5>
              <button className="card__status">Finished</button>
            </li>
          </ul>
      </div>
    </div>
  );
}

export default AdminOrders;
