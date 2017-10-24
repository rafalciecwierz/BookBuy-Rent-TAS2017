import React, { Component } from 'react';
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <Brand />
        <SearchBox />
        <NavLink />
        <NavLink />
        <NavLink />
      </nav>
    );
  }
}

export default Nav;
