import React, { Component } from 'react';
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';

class DropdownMenu extends Component {
  render() {
    return (
      <menu className="dropdown">
        <i className="dropdown__icon"></i>
        <div className="dropdown__utils">
          <SearchBox />
          <ul className="nav__links">
            <li>
              <NavLink linkType="wish"/>
              Wish List
            </li>
            <li>
              <NavLink linkType="cart"/>
              Shopping Cart
            </li>
            <li>
              <NavLink linkType="user"/>
              User Account
            </li>
          </ul>
        </div>
      </menu>
    );
  }
}

export default DropdownMenu;
