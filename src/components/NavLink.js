import React, { Component } from 'react';

class NavLink extends Component {
  render() {
    const cssClass = this.props.linkType || ""  ;
    return (
      <a href="#" className="nav-link">
        <figure className={`nav-link__icon ${cssClass}`}></figure>
      </a>
    );
  }
}

export default NavLink;
