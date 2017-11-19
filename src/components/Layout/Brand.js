import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import brand from '../../assets/img/brand-logo.png';

class Brand extends Component {
  render() {
    return (
      <div className="brand">
          <img src={brand} className="brand__logo" alt="Ebooking logo"/>
          <span className="brand__divider"></span>
          <Link to="/">
            <h1 className="brand__header">ebooking</h1>
          </Link>
      </div>
    );
  }
}

export default Brand;
