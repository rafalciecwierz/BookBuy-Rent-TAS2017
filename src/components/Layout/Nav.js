import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <Brand />
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
        <DropdownMenu />
      </nav>
    );
    // return (
    //   <nav className="nav">
    //     <Brand />
    //     <div className="nav__utils">
    //       <SearchBox />
    //       <div className="nav__links">
    //         <NavLink linkType="wish"/>
    //         <NavLink linkType="cart"/>
    //         <NavLink linkType="user"/>
    //       </div>
    //     </div>
    //     <DropdownMenu />
    //   </nav>
    // );
  }
}

export default Nav;
