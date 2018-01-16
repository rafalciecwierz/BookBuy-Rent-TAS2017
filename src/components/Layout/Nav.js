import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

class Nav extends Component {

  logout = () => { // to jest tu dlatego, żeby po przejściu na stronę logout przycisk był dobrze ustawiony
    sessionStorage.isLogged = false;
  }

  userNav = () => {
    const isLogged = sessionStorage.getItem('isLogged');
    if(isLogged && isLogged == 'true'){
      return (
        <Link to='/logout' onClick={ this.logout() }>
        <span className="link--simple">
          Log out
        </span>
        </Link>)
    } else {
      return (
        <Link to='/login'>
        <span className="link--simple">
          Log in
        </span>
        </Link>)
    }
  }

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
            { this.userNav() }
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
