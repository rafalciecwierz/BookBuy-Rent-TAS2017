import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav-list">
          <li>Log in</li>
          <li>Sign up</li>
        </ul>
        <h1>Booooks</h1>
        <ul className="nav-list">
          <li>Search</li>
          <li>Wish</li>
          <li>Buy</li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
