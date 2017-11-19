import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

class Nav extends Component {
  render() {
    if(window.innerWidth <= 860) {
      console.log("obj");
    }
    return (
      <nav className="nav">
        <Brand />
        <div className="nav__utils">
          <SearchBox />
          <div className="nav__links">
            <span className="link--simple link--attention">
              <Link to='/register'>Sign up</Link>
            </span>
            <span className="link--simple">
              <Link to='/login'>Log in</Link>
            </span>
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
