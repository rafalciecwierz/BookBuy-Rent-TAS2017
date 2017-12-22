import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

function Nav(props) {
  return (
    <nav className="nav">
      <Brand />
      { props.logged ? <NavUser /> : <NavUnknown /> }
      <DropdownMenu logged={props.logged}/>
    </nav>
    );
}

function NavUnknown(props) {
  return (
    <div className="nav__utils">
      <SearchBox />
      <div className="nav__links">
        <Link to='/register'>
          <span className="link--simple link--attention">
            Sign up
          </span>
        </Link>
        <Link to='/login'>
          <span className="link--simple">
            Log in
          </span>
        </Link>
      </div>
    </div>
  )
}

function NavUser(props) {
  return (
    <div className="nav__utils">
      <SearchBox />
      <div className="nav__links">
        <NavLink linkType="wish"/>
        <NavLink linkType="cart"/>
        <NavLink linkType="user"/>
      </div>
    </div>
  )
}

export default Nav;
