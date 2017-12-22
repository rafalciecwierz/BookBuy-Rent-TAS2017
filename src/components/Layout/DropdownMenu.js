import React, { Component } from 'react';
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      style: "utils--visible"
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState((prev) => ({
      visible: !prev.visible
    }));
  }
  render() {
    let style = "";
    if (this.state.visible) {
      style = this.state.style
    }
    return (
      <menu className="dropdown">
        <i className="dropdown__icon"
          onClick={this.handleClick}></i>
        <div className={`dropdown__utils ${style}`}>
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
