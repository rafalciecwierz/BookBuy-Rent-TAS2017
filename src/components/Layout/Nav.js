import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Brand from './Brand';
import SearchBox from './SearchBox';
import NavLink from './NavLink';
import DropdownMenu from './DropdownMenu';

class Nav extends Component {
  constructor(props){
    super(props);
    console.log(props);
    const isLoggedSes = localStorage.getItem('isLogged');
    this.state = {isLogged: isLoggedSes == 'true'};
  }

  logout = () => { // to jest tu dlatego, żeby po przejściu na stronę logout przycisk był dobrze ustawiony
    localStorage.setItem('isLogged', false);
    this.setState({isLogged: false}); // maybe this is unnecessary
  }

  componentWillMount(){ // set state according to local storage
    const isLoggedSes = localStorage.getItem('isLogged');
    this.setState({isLogged: isLoggedSes == 'true'});
    console.log('Nav-willMount: logged state', isLoggedSes);
  }

  userNav = () => {
    if(this.state.isLogged){
      return (
        <Link to='/logout' onClick={ this.logout }>
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
