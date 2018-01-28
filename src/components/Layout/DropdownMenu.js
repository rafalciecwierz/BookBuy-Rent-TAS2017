import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';

class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    const isLoggedSes = localStorage.getItem('isLogged');
    this.state = {
      visible: false,
      style: "utils--visible",
      logged: isLoggedSes === 'true'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  // ComponentWillMount(){
  //   const isLoggedSes = localStorage.getItem('isLogged');
  //   this.setState({logged: isLoggedSes === 'true'});
  // }

  logout = () => {
    localStorage.setItem('isLogged', false);
    this.setState({logged: false});
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
          { this.state.logged ? <NavUser logout={this.logout}/> : <NavUnknown />}
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
        <NavLink linkType="user"/>
        User Account
      </li>
      <li>
        <NavLink linkType="cart"/>
        Shopping Cart
      </li>
      <li onClick={props.logout}>
        <NavLink linkType="logout"/>
        Logout
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
      <li>
        <Link to="/cart">
          <span className="link--simple link--cart">
            Cart
          </span>
        </Link>
      </li>
    </ul>
  )
}

export default DropdownMenu;
