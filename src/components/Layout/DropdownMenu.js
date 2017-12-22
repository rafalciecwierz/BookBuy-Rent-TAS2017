import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    const logged = false;

    return (
      <menu className="dropdown">
        <i className="dropdown__icon"
          onClick={this.handleClick}></i>
        <div className={`dropdown__utils ${style}`}>
          <SearchBox />
          { logged ? <NavUser /> : <NavUnknown />}
        </div>
      </menu>
    );
  }
}

function NavUser(props) {
  return (
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
  )
}

function NavUnknown(props) {
  return (
    <ul className="nav__links">
      <li>
        <Link to='/register'>
          <span className="link--simple link--attention">
            Sign up
          </span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <span className="link--simple">
            Log in
          </span>
        </Link>
      </li>
    </ul>
  )
}

export default DropdownMenu;
