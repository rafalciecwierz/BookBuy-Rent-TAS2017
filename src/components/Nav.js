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
        <div className="nav__links">
          <NavLink />
          <NavLink />
          <NavLink />
        </div>
      </nav>
    );
  }
}

export default Nav;
