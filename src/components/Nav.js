import React, { Component } from 'react';
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
            <a className="link--simple link--attention" href="#">Sign up</a>
            <a className="link--simple" href="#">Log in</a>
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
